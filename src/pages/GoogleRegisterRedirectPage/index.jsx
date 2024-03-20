import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
export default function GoogleRegisterRedirectPage() {
    const nav = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            nav('/register')
        }, 4000);
    }, [])


    return (
        <div className={styles.pageContainer}>
            <div className={styles.circle}></div>
            <div className={styles.mainMessageContainer}>
                <div>
                    <h1 className={styles.messageHeader}>
                        לא נמצאת במערכת שלנו
                    </h1>
                    <p className={styles.additionalMessage}>כבר מעבירים אותך לדף ההרשמה...</p>
                </div>
                <Loading />
            </div>
        </div>
    )
}
