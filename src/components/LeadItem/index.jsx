import { NavLink } from 'react-router-dom';
import styles from './style.module.css'

import { LuUserCircle2 } from "react-icons/lu";

// Description: This component displays a Lead item based on the provided properties.
// Props: name, email, date
// Creator: Refael

export default function LeadItem({ campaignId, name, email, date, id }) {

  return (
    <NavLink to={`/campaign/${campaignId}/leads/${id}`}
      className={({ isActive }) => isActive ? styles.leadActive : styles.lead}>
      <div className={styles.square}>
        <LuUserCircle2 className={styles.activeIcon} />
      </div>
      <div className={styles.nameAndDetails}>
        <div className={styles.name}>{name}</div>
        <div className={styles.DateAndEmail}>
          {/* TODO: להוסיף 3 נקודות לאימיילים ארוכים מידי וליישר את התאריך לצד שמאל של הקומפוננטה */}
          <div className={styles.email}>{email}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
    </NavLink>
  )
}