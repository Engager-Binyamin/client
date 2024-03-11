import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import io from 'socket.io-client';
import InputWrapper from '../InputWrapper/index';
import styles from './style.module.css';
import Loading from '../Loading'

// const socket5 = io('http://localhost:3000');

export default function QRCodeComponent() {

  // TODO: לשפץ את דף ההגדרות ולדאוג שיופיע הקוד QR

  const [code, setCode] = useState('');

  // useEffect(() => {
  //   socket5.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   socket5.on('qr', (qr) => {
  //     console.log(qr)
  //     setCode(qr);
  //   });

  //   socket5.on('ready', () => {
  //     setCode(":-)");
  //   })
  // }, []);
  const text = `כיצד להשתמש ב-WhatsApp באינגג'ר

1. פותחים את WhatsApp בטלפון.

2. מקישים על תפריט ב-Android או על הגדרותב-iPhone.

3. להקיש על מכשירים מקושרים ואז על קישור מכשיר

4. מפנים את הטלפון לכיוון המסך וסורקים את קוד ה-QR.`
  return (
    <div className={styles.container}>
      {(code.length < 2) ? <Loading className={styles.loading} /> : ""}
      {(code.length > 3) ? <QRCode value={code} className={styles.qrCode} /> : ""}
      <InputWrapper subLabel={"נא לא לרענן את העמוד"} className={styles.inputWrapper} />
      <div className={styles.text}>
        כיצד להשתמש ב-WhatsApp באינגייג'ר:
      </div>
      <div className={styles.text2}>
        1. פותחים את WhatsApp בטלפון.
        <br />
        2. מקישים על תפריט ב-Android או על הגדרות ב-iPhone.
        <br />
        3. להקיש על מכשירים מקושרים ואז על קישור מכשיר
        <br />
        4. מפנים את הטלפון לכיוון המסך וסורקים את קוד ה-QR.
      </div>
    </div>
  );
}
