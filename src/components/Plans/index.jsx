import React from 'react';
import styles from './style.module.css';
import api from '../../functions/api';
import { useState, useEffect } from 'react';


export default function Plans() {
    const [plansData, setPlansData] = useState([]);

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



    return (
        <div className={styles.container}>
            {plansData?.map((plan, index) => (
                <div key={index} >
                    <ul className={`${styles.card} `}>
                        {plan.name === "basic" ? (
                            <li className={`${styles.header} ${styles.grey}`}>{plan.name} </li>,
                            <li className={styles.ribbon}>הכי נמכר</li>
                        ) : null}
                        <li className={`${styles.header} ${styles.grey}`}>{plan.name} </li>
                        <li>מחיר: {plan.price}</li>

                        <li>מספר לידים ברשימה: {plan.num_leads_in_list}</li>
                        <li>הודעת פתיחה ללידים חדשים: {plan.opening_msg_to_new_lids} תווים</li>
                        <li>מספר הודעות: {plan.msg_number}</li>
                        <li>העברת נתונים ל-CRM: {getIcon(plan.data_transfer_crm)}</li>
                        {/* <li className={styles.lastLi}> */}
                        <button className={styles.button}>לרכישה</button>
                        {/* </li> */}
                    </ul>
                </div>
            ))}
        </div>
    );
}


{/* <li>מספר מקסימלי של לידים: {plan.max_num_leads}</li> */ }
{/* <li>לידים מ-Webhook: {getIcon(plan.leads_from_webhook)}</li> */ }
{/* <li>ממשק לניהול קשר: {getIcon(plan.contact_management_interface)}</li> */ }
{/* <li>פיצול טרמינלים: {getIcon(plan.split_terminals)}</li> */ }
{/* <li>התראה על ליד חדש: {getIcon(plan.notification_new_lead)}</li> */ }
{/* <li>הודעת כתיבה: {getIcon(plan.copywriting_msg)}</li> */ }
{/* <li>חיבור ל-WhatsApp: {getIcon(plan.connection_to_whatsApp)}</li> */ }
{/* <li>מסע הלקוח: {getIcon(plan.customer_journey)}</li> */ }
{/* <li>תמיכה טכנית: {getIcon(plan.technical_support)}</li> */ }
{/* <li>גרסה מעודכנת: {getIcon(plan.update_version)}</li> */ }
{/* <li>העלאת רשימת קבצים: {getIcon(plan.uploading_file_list)}</li> */ }