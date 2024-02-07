import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import Icon from '../Icon'
import PopUp from '../PopUp'
import MessagesTab from '../MsgTab'
import NewMassageForm from '../NewMessageForm'
import MessageEdit from '../MessageEdit'
import DataContext from '../../context/DataContext'
//קומפוננטה שצריכה לקבל כותרת וכותרת משנה כ פרופס וכן אייקון

export default function HeadLine({ title, icon, dateCreate, children }) {
  // const editMessage = () => <MessagesTab/> 
  const { isOpen, setIsOpen } = useContext(DataContext)

  const handleEditClick = () => {
    setIsOpen( <MessageEdit isOpen={isOpen} setIsOpen={setIsOpen} />);
  };

  const handleClosePopUp = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.headLine} >
      <div >
        <p className={styles.title} >{title}</p>
        <p className={styles.subtitle} >נוצר ב {dateCreate}</p>
      </div >
      <div onClick={handleEditClick}><Icon className={styles.button} nameIcon={"writing"} nameColor={''} /></div>
      
    </div>
  )
}
