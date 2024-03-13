import styles from "./style.module.css";
import axios, { Axios } from "axios";
import InputWrapper from "../InputWrapper";
import Button from "../Button";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/index";
import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function FeedBack({ setIsOpen, _id = "65ba97e536d6af41e9beb0d1" }) {

  const [user, setUser] = useState("");
  const [campName, setCampName] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate()

  const handelSubmitNewFeedBack = async (e) => {
    e.preventDefault();
    const SubmmitNewFeedBack = {
      user: _id,
      campName
    };

    setIsOpen(false);
    try {
      const response = await axios.post(
        // "http://localhost:2500/campaign",

        SubmmitNewFeedBack,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response && "נשלח בהצלחה!");

    } catch (Error) {
      console.error("Error:", Error);
      toast.error(Error?.response?.data?.msg || "somthing want worng");

    }
  };

  const tohome = () => {
    nav('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.allin}>
        <div className={styles.circle}></div>
        <form onSubmit={handelSubmitNewFeedBack} className={styles.inputSpace}>
          <div className={styles.title}>דברו איתנו</div>
          <div>
            <InputWrapper label={"כותרת"} >
              <InputText name={'title'} required={true} onChange={(e) => setMessage(e.target.value)} className={styles.input} />
            </InputWrapper>
          </div>

          <div >
            <InputWrapper label={"תוכן ההודעה"} className={styles.nameinput}>
              <InputTextArea name={"תוכן ההודעה"} onChange={(e) => setCampName(e.target.value)} className={styles.inputaria} rows="5"
              />
              {/* <InputText name={'password'} required={true} onChange={(e) => setMessage(e.target.value)} className={styles.input} /> */}
            </InputWrapper>
          </div>
          <button className={styles.button} type='submit' >שליחה</button>
        </form>
        <div className={styles.notlogin}>
          <div onClick={tohome} className={styles.notlogin2}> חזור לדף הראשי</div>
        </div>
      </div>
    </div>
    // <div className={styles.InputWrapper}>
    //   <form onSubmit={handelSubmitNewFeedBack}>
    //     <div><h1>שלח משוב</h1></div>
    //     <main>
    //       <InputWrapper
    //         label={(<span className={styles.asterisk}>'*'</span>, "שם רשימה")}
    //         subLabel={"שם פנימי שלא יהיה חשוף למצטרפים לרשימה"}
    //         to={"campaignMsg"}
    //         children={
    //           <InputText
    //             name="campaignMsg"
    //             onChange={(e) => setUser(e.target.value)}
    //           />
    //         }
    //         type="text"
    //       />


    //       <InputWrapper
    //         label={"הודעת אפס"}
    //         subLabel={"זוהי ההודעה שתשלח אוטומטית לכל מצטרף חדש לרשימה"}
    //         to={"campaignTextArea"}
    //         children={
    //           <InputTextArea
    //             name={"campaignTextArea"}
    //             onChange={(e) => setCampName(e.target.value)}
    //           />
    //         }
    //         type="text"
    //       />
    //       {/* onClick={ setIsOpen(false)}  */}
    //       <div className={styles.actions}>
    //         <Button className={"cancel"} content={"ביטול"} />
    //         <Button className={"save"} content={"שמירה"} />
    //       </div>
    //     </main>
    //   </form>
    // </div>
  );
}
