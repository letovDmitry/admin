"use client"
import Cookies from "js-cookie";
import styles from "../sidebar/sidebar.module.css";
import {
  MdLogout,
} from "react-icons/md";

const LogoutButton = () => {
  const handleLogout = async () => {
    await Cookies.remove("access_token_admin", { path: '/admin' });
    await Cookies.remove("isBooster", { path: '/admin' });

    window.location.reload()
  }
  return (
    <button onClick={handleLogout} className={styles.logout}>
      <MdLogout />
      Выйти
    </button>
  )
}

export default LogoutButton;
