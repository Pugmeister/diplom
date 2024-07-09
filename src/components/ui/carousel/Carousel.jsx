import React, { useState } from 'react';
import styles from './Carousel.module.scss';

const Carousel = () => {
  const items = [
    { src: '/images/carousel1.jpg', alt: '1' },
    { src: '/images/carousel2.jpg', alt: '2' },
    { src: '/images/carousel3.jpg', alt: '3' },
    { src: '/images/carousel4.jpg', alt: '4' },
    { src: '/images/carousel5.jpg', alt: '5' },
  ];

  const [activeItem, setActiveItem] = useState(0);
  const handleNavigation = (direction) => {
    setActiveItem((activeItem + direction + items.length) % items.length);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Вас ждут незабываемые ощущения</h2>
      <div className={styles['carousel-wrapper']} data-carousel="static">
        <div className={styles['carousel-container']}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles['carousel-item']} ${index === activeItem ? styles.active : ''}`}
              data-carousel-item={index === activeItem ? 'active' : ''}
            >
              <img
                src={item.src}
                className={styles['carousel-image']}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`${styles['carousel-navigation']} ${styles['carousel-prev']}`}
          data-carousel-prev
          onClick={() => handleNavigation(-1)}
        >
          <img src="/images/left-arrow.svg" alt="Previous" className={styles['arrow-icon']} />
          <span className={styles['sr-only']}>Previous</span>
        </button>
        <button
          type="button"
          className={`${styles['carousel-navigation']} ${styles['carousel-next']}`}
          data-carousel-next
          onClick={() => handleNavigation(1)}
        >
          <img src="/images/right-arrow.svg" alt="Next" className={styles['arrow-icon']} />
          <span className={styles['sr-only']}>Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
