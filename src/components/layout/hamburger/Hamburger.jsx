import styles from './Hamburger.module.scss'
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import Menu from "./Menu.jsx";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside.js";

const Hamburger = () => {
    const { isShow, ref, setIsShow } = useOnClickOutside(false)

    return (
        <div className={styles.wrapper} ref={ref}>
            <button onClick={() => setIsShow(!isShow)}>
                {isShow ? <IoCloseOutline /> : <IoMenuOutline />}
            </button>
            <Menu isShow={isShow} setIsShow={setIsShow} />
        </div>
    );
}

export default Hamburger
