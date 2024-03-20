import React, { useState, useEffect, useContext } from "react"
import QRCode from "react-qr-code"
import io from "socket.io-client"
import InputWrapper from "../InputWrapper/index"
import styles from "./style.module.css"
import Loading from "../Loading"
import DataContext from "../../context/DataContext"
import api from "../../functions/api"

export default function QRCodeComponent() {
  const [code, setCode] = useState("")
  const [isReady, setIsReady] = useState(false)

  const { user } = useContext(DataContext)

  const { socket } = useContext(DataContext)
  useEffect(() => {
    if (socket) {
      socket.on(`qr`, (qr) => {
        setCode(qr)
      })

      socket.on("ready", () => {
        setIsReady(true)
        setCode(qr);
      });
      socket.on('ready', () => {
        setIsReady(true);
      })
    }
  },[socket])
  
  return (
    <div className={styles.QrContainer}>
      <>
        {/* // <div className={styles.container}> */}
        {code.length < 2 ? <Loading className={styles.loading} /> : ""}
        {!isReady && code.length > 2 ? (
          <QRCode value={code} className={styles.qrCode} />
        ) : (
          ""
        )}
        <InputWrapper
          subLabel={"נא לא לרענן את העמוד"}
          className={styles.inputWrapper}
        />
        <div className={styles.text}>כיצד להשתמש ב-WhatsApp באינגייג'ר:</div>
        <div className={styles.text2}>
          1. פותחים את WhatsApp בטלפון.
          <br />
          2. מקישים על תפריט ב-Android או על הגדרות ב-iPhone.
          <br />
          3. להקיש על מכשירים מקושרים ואז על קישור מכשיר
          <br />
          4. מפנים את הטלפון לכיוון המסך וסורקים את קוד ה-QR.
        </div>
        {/* </div> */}
      </>
    </div>
  )
}
