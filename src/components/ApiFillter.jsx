import { useContext } from "react";
import styles from "./apifillter.module.css"; 
import { AppContext } from "../context/AppContext";

const ApiFillter = () => {
  const {
    activeMenu,
    setActiveMenu
   
  } = useContext(AppContext);


  return (
    <div className={styles.apiFillter_container}>
      
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${activeMenu === 'params' ? styles.active : ''}`}
          onClick={() => setActiveMenu('params')}
        >
          Params
        </li>
        <li
          className={`${styles.menuItem} ${activeMenu === 'headers' ? styles.active : ''}`}
          onClick={() => setActiveMenu('headers')}
        >
          Headers
        </li>
        <li
          className={`${styles.menuItem} ${activeMenu === 'body' ? styles.active : ''}`}
          onClick={() => setActiveMenu('body')}
        >
          Body
        </li>
      </ul>
    </div>
  );
}

export default ApiFillter;