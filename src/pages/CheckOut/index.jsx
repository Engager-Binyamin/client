import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from './style.module.css';
import './style.css';
import addCommas from '../../functions/addCommas'

export default function CheckOut() {

    const nav = useNavigate();

    function getIcon(value) {
        return value ? '✓' : '✗';
    }

    let { plan, iFrameLink } = useLocation().state || {};

    // זמני
    // plan = {
    //     _id: {
    //         $oid: '65edcdf022a62790e4b5caf8',
    //     },
    //     name: 'preimum',
    //     monthPrice: 280,
    //     yearPrice: 2800,
    //     max_num_leads: 0,
    //     leads_from_webhook: true,
    //     contact_management_interface: true,
    //     num_leads_in_list: 0,
    //     opening_msg_to_new_lids: 1000,
    //     msg_number: 15000,
    //     uploading_file_list: true,
    //     data_transfer_crm: true,
    //     split_terminals: false,
    //     notification_new_lead: false,
    //     copywriting_msg: false,
    //     connection_to_whatsApp: false,
    //     customer_journey: false,
    //     technical_support: true,
    //     update_version: true,
    //     __v: 0,
    // };
    // iFrameLink = 'https://secure.cardcom.solutions/EA/LPC6/151048/4b95dc4d-5155-4512-b207-e24117d544f9';

    return (
        <div className={styles.container}>
            {/* העיגול ברקע */}
            <div className={styles.circle}></div>

            <div className={styles.plan}>
                <button className="cta" onClick={() => nav('/settings/plans')}>
                    <span className="hover-underline-animation"> לחזרה לתוכניות </span>
                    <svg
                        id="arrow-horizontal"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="10"
                        viewBox="0 0 46 16"
                    >
                        <path
                            id="Path_10"
                            data-name="Path 10"
                            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                            transform="translate(30)"
                        ></path>
                    </svg>
                </button>
                <h3>הרשמה לתוכנית {plan?.name}</h3>
                <ul className={styles.list}>
                    <li className={styles.details}>
                        <h4 className={styles.price}>₪{addCommas(plan?.monthPrice)}</h4>
                        <span>לחודש</span>
                    </li>
                    <li className={styles.msgAmount}>
                        <h4>{addCommas(plan?.msg_number)} הודעות</h4>
                        <span>לחודש</span>
                    </li>
                    {plan?.num_leads_in_list > 0 ?
                        <li className={styles.exstraDetails}>
                            עד {plan?.num_leads_in_list} רשימות לידים
                            <span>לחודש</span>
                        </li>
                        :
                        <li className={styles.exstraDetails}>
                            ללא הגבלת רשימות לידים
                        </li>}
                    {plan?.opening_msg_to_new_lids > 0 ?
                        <li className={styles.exstraDetails}>
                            עד {addCommas(plan?.opening_msg_to_new_lids)} תווים להודעת פתיחה
                        </li> :
                        <li className={styles.exstraDetails}>
                            ללא הגבלת תווים להודעת פתיחה
                        </li>}
                    {plan?.data_transfer_crm &&
                        <li className={styles.exstraDetails}>
                            כולל העברת נתונים ל-CRM {getIcon(plan?.data_transfer_crm)}
                        </li>
                    }
                </ul>
            </div>
            <iframe className={styles.payment} src={iFrameLink} frameborder="0"></iframe>
        </div>
    );
}
