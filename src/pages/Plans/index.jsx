import React from 'react';
import styles from './style.module.css';
import api from '../../functions/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Plans() {
    const [plansData, setPlansData] = useState([]);
    const nav = useNavigate();

    const star = <svg width={13} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>

    useEffect(() => {
        api.get('/plans')
            .then(res => { setPlansData(res) })
            .catch(error => {
                console.error('Error fetching plans:', error);
            });
    }, []);
    console.log(plansData);
    function getIcon(value) {
        return value ? '✓' : '✗';
    }

    const handlePlan = async (plan) => {
        try {
            api.get(`payment/${plan._id}`).then(res => {
                console.log(res);
                nav('/checkOut',
                    {
                        state: {
                            plan: res.plan,
                            iFrameLink: res.url
                        }
                    })
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className={styles.container}>
            <div className={styles.circle}></div>
            <div className={styles.texts}>
                <h1>בחר את התוכנית שלך</h1>
                <h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z" /></svg> שבועיים ראשונים חינם</h3>
                <h6>בחרו את התוכנית שהכי תתאים לעסק שלכם</h6>
            </div>
            <div className={styles.cont}>
                <div className={styles.cardsContainer}>
                    {plansData?.map((plan, index) => (
                        <div key={index} >
                            <div className={styles.card}>
                                {plan.name === "basic" ? (
                                    <h2 className={`${styles.header} ${styles.grey}`}>{plan.name} </h2>,
                                    <h2 className={styles.ribbon}>הכי נמכר</h2>
                                ) : null}
                                <h2 className={`${styles.header} ${styles.grey}`}>{plan.name} </h2>
                                <ul className={styles.details}>
                                    <li id={styles.price}>₪{plan.price}</li>
                                    {plan.num_leads_in_list > 0 ?
                                        <li>{star}&nbsp; עד {plan.num_leads_in_list} קמפיינים</li> :
                                        <li>{star}&nbsp; ללא הגבלת מספר קמפיינים</li>

                                    }
                                    {plan.opening_msg_to_new_lids < 0 ?
                                        <li>{star}&nbsp; עד {plan.opening_msg_to_new_lids} תווים להודעת פתיחה</li> :
                                        <li>{star}&nbsp; הודעת פתיחה ללא הגבלת תווים</li>

                                    }
                                    <li>{star}&nbsp; עד {plan.msg_number} הודעות</li>
                                    {plan.data_transfer_crm ?

                                        <li>{star}&nbsp; כולל העברת נתונים ל-CRM {getIcon(plan.data_transfer_crm)}</li> :
                                        <li>{star}&nbsp; ללא העברת נתונים ל-CRM {getIcon(plan.data_transfer_crm)}</li>
                                    }
                                </ul>
                                <button className={styles.buy} onClick={() => handlePlan(plan)}>לרכישה</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


{/* <li>{star}&nbsp; מספר מקסימלי של לידים: {plan.max_num_leads}</li> */ }
{/* <li>{star}&nbsp; לידים מ-Webhook: {getIcon(plan.leads_from_webhook)}</li> */ }
{/* <li>{star}&nbsp; ממשק לניהול קשר: {getIcon(plan.contact_management_interface)}</li> */ }
{/* <li>{star}&nbsp; פיצול טרמינלים: {getIcon(plan.split_terminals)}</li> */ }
{/* <li>{star}&nbsp; התראה על ליד חדש: {getIcon(plan.notification_new_lead)}</li> */ }
{/* <li>{star}&nbsp; הודעת כתיבה: {getIcon(plan.copywriting_msg)}</li> */ }
{/* <li>{star}&nbsp; חיבור ל-WhatsApp: {getIcon(plan.connection_to_whatsApp)}</li> */ }
{/* <li>{star}&nbsp; מסע הלקוח: {getIcon(plan.customer_journey)}</li> */ }
{/* <li>{star}&nbsp; תמיכה טכנית: {getIcon(plan.technical_support)}</li> */ }
{/* <li>{star}&nbsp; גרסה מעודכנת: {getIcon(plan.update_version)}</li> */ }
{/* <li>{star}&nbsp; העלאת רשימת קבצים: {getIcon(plan.uploading_file_list)}</li> */ }