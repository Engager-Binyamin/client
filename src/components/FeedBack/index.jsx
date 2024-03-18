import styles from "./style.module.css";
import InputWrapper from "../InputWrapper";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/index";
import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useParams } from 'react-router'
import { useNavigate } from "react-router";
import api from "../../functions/api";

export default function FeedBack() {
  const { user } = useParams()
  const [content, setContent] = useState("");
  const nav = useNavigate()

  const handelSubmitNewFeedBack = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/feedback/${user}`, content,
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
              <InputText name={'title'} required={true} onChange={(e) => setContent(e.target.value)} className={styles.input} />
            </InputWrapper>
          </div>

          <div >
            <InputWrapper label={"תוכן ההודעה"} className={styles.nameinput}>
              <InputTextArea name={"content"} onChange={(e) => setContent(e.target.value)} className={styles.inputaria} rows="5"
              />
            </InputWrapper>
          </div>
          <button className={styles.button} type='submit' >שליחה</button>
        </form>
        <div className={styles.notlogin}>
          <div onClick={tohome} className={styles.notlogin2}> חזור לדף הראשי</div>
        </div>
      </div>
    </div>
  );
}
