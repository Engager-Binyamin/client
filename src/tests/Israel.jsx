import React from 'react'
import { useLocation } from 'react-router';
import styles from '../pages/CheckOut/style.module.css';

export default function CheckOut() {
  let { programDetails, iFrameLink } = useLocation().state || {};

  // זמני
  programDetails = {
    _id: {
      $oid: '65edcdf022a62790e4b5caf8',
    },
    name: 'preimum',
    monthPrice: 280,
    yearPrice: 2800,
    max_num_leads: 0,
    leads_from_webhook: true,
    contact_management_interface: true,
    num_leads_in_list: 0,
    opening_msg_to_new_lids: 1000,
    msg_number: 15000,
    uploading_file_list: true,
    data_transfer_crm: true,
    split_terminals: false,
    notification_new_lead: false,
    copywriting_msg: false,
    connection_to_whatsApp: false,
    customer_journey: false,
    technical_support: true,
    update_version: true,
    __v: 0,
  };
  iFrameLink =
    'https://secure.cardcom.solutions/EA/LPC6/151048/4b95dc4d-5155-4512-b207-e24117d544f9';

  return (
    <div className={styles.container}>
      <div className={styles.programDetails}>
        <div className={styles.detailsSection}>
          <h3>הרשמה לתוכנית הבאה:</h3>
          <h4>{programDetails.name}</h4>
        </div>
        <div className={styles.detailsSection}>
          <h4>מחיר:</h4>
          <div>
            <span>לשנה: {programDetails.yearPrice}₪</span>
            <span> | </span>
            <span>לחודש: {programDetails.monthPrice}₪</span>
          </div>
        </div>
        <div className={styles.detailsSection}>
          <h4>הודעות לחודש:</h4>
          <div>{programDetails.msg_number}</div>
        </div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.payment}>
        <iframe src={iFrameLink} frameborder="0"></iframe>
      </div>
    </div>
  );
}
