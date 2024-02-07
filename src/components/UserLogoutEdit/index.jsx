import React from 'react'
import styles from './style.module.css'
import Icon from '../Icon'
import ThreeDots from '../ThreeDotsMenu'
import Popover from '../Popover'
import Login from '../Login/Login'
import { useNavigate } from 'react-router-dom'
//מקבלת פרטי יוזר כאוביקט משתמשת בשם והתמונה אם אין תמונה אז יש דיפולט אייקון יוזר
//בלחיצה על החץ נפתחת רשימה עם שתי אפשריות
//1 יציאה-מעביר לדף לוגאין ומוחק מלוקאל סטורג את הטוקן
//2 עריכה-כרגע לא פעיל



export default function UserLogoutEdit({ user = { name: "user", avatar: undefined } }) {
    const navigate = useNavigate()

    let list = [{
        text: "עריכה",
        icon: (<Icon nameIcon={'writing'} nameColor={''} />),
    }, {
        text: "התנתקות",
        icon: (<Icon nameIcon={'x'} nameColor={''} />),
        onClick: () => {
            delete localStorage.token;
            navigate(`/login`,{relative:'path'})
        }
    }]
    return (
        <>
            <button className={styles.userInfo}  >
                <div> 
                  {user.avatar ? <img src={user.avatar} className={styles.pictuare} /> :
                  <Icon nameIcon={'user'} nameColor={''} />}
                    </div>
                <div className={styles.user}> {user.name} </div>
                <Popover list={list} fnName={"onClick"}>
                    <div className={styles.icon} > <Icon nameIcon={'chevronDown'} nameColor={''} /></div>
                </Popover>
            </button>
        </>
    )
}
