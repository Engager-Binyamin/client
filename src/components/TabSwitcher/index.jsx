import { NavLink, Outlet } from 'react-router-dom'
import styles from './style.module.css'

// Description : ניתוב של 2 הקטגוריות ע"י navlink
// Props : ____________ , _________
// Creator : gila
export default function TabSwitcher() {
  const classHeader = ({ isActive }) => isActive ? styles.active : ""

  return (
    <div className={styles.allcom}>
      <div className={styles.TabSwitcher}>
        <Outlet />
        <NavLink to="/gila1" className={styles.active}>הודעות</NavLink>
        <NavLink to="/gila2" className={styles.active}>נרשמים</NavLink>
      </div>
        <div className={styles.line}></div>
    </div>
  )
}
