import React, { useContext, useState } from 'react'
import styles from './style.module.css'


//קומפוננטה שצריכה לקבל כותרת וכותרת משנה כ פרופס וכן אייקון


export default function HeadLine({ title, subtitle, icon = "" }) {
  return (
    <div className={styles.headLine} >
      <div className={styles.titles}>
        <p className={styles.title} >{title}</p>
        {subtitle ? <p className={styles.subtitle} >{subtitle}</p> : ""}
      </div >
      {/* <div >{icon}</div> */}
    </div>
  )
}
