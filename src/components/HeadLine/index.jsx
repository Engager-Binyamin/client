import React, { useContext, useState } from 'react'
import styles from './style.module.css'


//קומפוננטה שצריכה לקבל כותרת וכותרת משנה כ פרופס וכן אייקון


export default function HeadLine({ title, subtitle, icon="", iconOnClick=()=>{} }) {
  return (
    <div className={styles.headLine} >
      <div >
        <p className={styles.title} >{title}</p>
        { subtitle ? <p className={styles.subtitle} >{subtitle}</p> : "" }
      </div >
      <div onClick={iconOnClick}>{icon}</div>
    </div>
  )
}
