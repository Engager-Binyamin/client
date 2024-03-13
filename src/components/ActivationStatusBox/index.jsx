import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';

export default function ActivationStatusBox({ successStatus }) {
    const nav = useNavigate()
    // 'Expired''AlreadyActive''Activated''ActivationFailed'
    const [delayedContent, setDelayedContent] = useState('');
    const [delayFinished, setDelayFinished] = useState(false);
    const [additionalMessage, setAdditionalMessage] = useState('')
    const [navHandler, setNavHandler] = useState()

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const { content, additional } = switchCase(successStatus);
            setDelayedContent(content);
            setAdditionalMessage(additional)
            setDelayFinished(true); // Update the state to indicate that the delay has finished
        }, 3000);

        return () => clearTimeout(delayTimer);
    }, [successStatus]);

    useEffect(() => {
        setTimeout(() => {
            nav(navHandler)
        }, 3000);
    }, [navHandler])

    const switchCase = (status) => {
        let content = ''
        let additional = ''

        switch (status) {

            case 'Activated':
                content = 'המשתמש הופעל בהצלחה :)'
                additional = 'מעולה, עכשיו אתה יכול להתחבר...'
                setNavHandler('/login')
                break;
            case 'Expired':
                content = 'הקישור פג תוקף, תכף תקבל קישור חדש'
                break;
            case 'AlreadyActive':
                content = 'נמצאת פעיל במערכת שלנו, ברוך הבא'
                additional = 'כבר תגיע אל דף הבית...'
                setNavHandler('/') // set nav to home and send user to homepage(add logic that logs him in automatically?)
                break;
            case 'ActivationFailed':
                content = 'ההפעלה נכשלה, יש לנסות להירשם שנית'
                additional = 'משהו קרה, ייתכן שזה אנחנו ולא אתה'
                setNavHandler('/register')
                break;
            default:
                break;
        }
        return { content, additional }
    }



    return (
        <div className={styles.mainMessageContainer}>
            <h1 className={styles.messageHeader}>
                {delayFinished ? delayedContent : 'מפעיל את המשתמש שלך, נא להמתין...'}
            </h1>

            {delayFinished && additionalMessage && <p className={styles.additionalMessage}>{additionalMessage}</p>}

        </div>
    )
}


