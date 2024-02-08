import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Icon from '../Icon'
import api from '../../functions/api'
import axios from 'axios'
export default function WebHook({ campaign_id }) {
    const [link, setLink] = useState()
    useEffect(() => {
        // axios -לשלוח את התז של הקמפיין , ליצור טוקן, ןלהחזיר אותו לתוך המשתנה
        // api.post('/webhook' , campaign_id)
        axios.post('http://localhost:2500/webhook', { campaign_id })
            .then(res => setLink('https://www.engager.co.il/webhook/' + res.data))

    }, [])
    function copy() {
        navigator.clipboard.writeText(link)
    }
    return <div className={styles.container}>
        <p className={styles.titele}>Webhook</p>
        <p className={styles.pas}>זוהי הכתובת של המנגנון שמאפשר לנו לקבל את פרטי הנרשמים מהטופס שלך, ברגע שמתבצעת הרשמה</p>
        <div className={styles.link}>
            <p className={styles.pLink}>{link}</p>
            {console.log(link)}
            <div className={styles.icon} onClick={copy}>
                <Icon nameIcon={'copy'} />
            </div>
        </div>
    </div>
}

