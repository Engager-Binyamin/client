import React from 'react'
import styles from './style.module.css'
import Icon from '../Icon'
import ThreeDots from '../ThreeDotsMenu'
import Popover from '../Popover'
import Login from '../Login/Login'
import { useNavigate } from 'react-router-dom'




export default function UserLogoutEdit({ user = { name: "user", avatar: undefined } }) {
    const navigate = useNavigate()


    

    let list = [{
        text: "עריכה",
        icon: (<Icon nameIcon={'writing'} nameColor={''} />),
    }, {
        text: "התנתקות",
        icon: (<Icon nameIcon={'x'} nameColor={''} />),
        onClick: () => {
            navigate(`/login`,{relative:'path'})
        }
    }]
    return (
        <>
            <button className={styles.userInfo}  >
                <div> <img src={user.avatar} className={styles.pictuare} /> </div>
                <div className={styles.user}> {user.name} </div>
                <Popover list={list} fnName={"onClick"}>
                    <div className={styles.icon} > <Icon nameIcon={'chevronDown'} nameColor={''} /></div>
                </Popover>
            </button>
        </>
    )
}
