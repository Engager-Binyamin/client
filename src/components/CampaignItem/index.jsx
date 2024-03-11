import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import { useEffect } from 'react'

// Description : רשימת הitem של הקמפיין
// Props : ____________ , _________
// Creator : gila

export default function CampaignItem({ id, title }) {
  const campId = location.pathname.split('/')[2]
  const active = (campId == id);

  return (
    <div className={styles.item}>
      <NavLink to={"/campaign/" + id + "/leads"} className={active ? styles.active : ""}>
        <div className={styles.iconitem}>
          {/* אייקון לדוג */}
          <svg width="22" height="22" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.2505 12V6.3C17.2505 4.61984 17.2505 3.77976 16.9235 3.13803C16.6359 2.57354 16.1769 2.1146 15.6125 1.82698C14.9707 1.5 14.1306 1.5 12.4505 1.5H6.05049C4.37033 1.5 3.53025 1.5 2.88852 1.82698C2.32403 2.1146 1.86509 2.57354 1.57747 3.13803C1.25049 3.77976 1.25049 4.61984 1.25049 6.3V16.7C1.25049 18.3802 1.25049 19.2202 1.57747 19.862C1.86509 20.4265 2.32403 20.8854 2.88852 21.173C3.53025 21.5 4.37031 21.5 6.05042 21.5H9.25049M11.7505 18.5L13.7505 20.5L18.2505 16" stroke="#0E9D85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles.nameitem}>
          {title}
        </div>
      </NavLink>
    </div>
  )
}
