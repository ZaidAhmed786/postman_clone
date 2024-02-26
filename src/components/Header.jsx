import styles from "./header.module.css"; 
import logo from './imgs/logoverge.jpg'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
        <img src={logo} alt="logo"/>
        <h2>QUICK API</h2>
    </div>

  )
}

export default Header