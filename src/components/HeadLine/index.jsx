import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import Icon from '../Icon'
import PopUp from '../PopUp'
import MessagesTab from '../MsgTab'
import NewMassageForm from '../NewMessageForm'
import MessageEdit from '../MessageEdit'
import DataContext from '../../context/DataContext'

//קומפוננטה שצריכה לקבל כותרת וכותרת משנה כ פרופס וכן אייקון

export default function HeadLine({ title, iconName, subtitle, iconOnClick }) {


  return (
    <div className={styles.headLine} >
      <div >
        <p className={styles.title} >{title}</p>
        <p className={styles.subtitle} > {subtitle}</p>
      </div >
      <div onClick={iconOnClick}><Icon className={styles.button} nameIcon={iconName} nameColor={''} /></div>

    </div>
  )
}
