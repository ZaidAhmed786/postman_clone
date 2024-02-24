import styles from "./header.module.css"; 
import logo from './imgs/postman-logo.png'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
        <img src={logo} alt="logo"/>
        <h2>POSTMAN CLONE</h2>
    </div>

  )
}

export default Header