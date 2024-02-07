import styles from "./style.module.css";
import axios, { Axios } from "axios";

import InputWrapper from "../InputWrapper";
import Button from "../Button";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/index";

import api from '../../functions/api';


import { FaTimes } from "react-icons/fa";
import { useState } from "react";

// Description :
// Props : ____________ , _________
// Creator : ________

export default function NewMassageForm({ setIsOpen }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submmit = { subject, content };

    setIsOpen(false);
    
    try {
      api.post("campaign" , submmit).then(res=>res);
      // const response = await axios.post(
      //   "http://localhost:2500/campaign/65c0939a5aa397278552a5b5/msg",
      //   submmit,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      console.log(response.data);
      toast.success(response && "נשלח בהצלחה!");
      console.log(subject, content);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(subject, content);
  };

  return (
    <div className={styles.InputWrapper}>
      
      <form onSubmit={handleSubmit}>
        <main className={styles.main}>
          <InputWrapper
            label="שם הודעה"
            subLabel="שם פנימי שיהיה חשוף רק לך"
            to={"msgName"}
            children={
              <InputText
                name={"msgName"}
                onChange={(e) => setSubject(e.target.value)}
              />
            }
            type="text"
          ></InputWrapper>
  <br />
  <br />
          <InputWrapper
            label="הודעה"
            subLabel="זוהי  ההודעה שתשלח בתזמון הנבחר"
            to={"msgContent"}
            children={
              <InputTextArea
                name={"msgContent"}
                onChange={(e) => setContent(e.target.value)}
              />
            }
            type="text"
          />
        </main>
        

        <div className={styles.actions}>
          <Button className={"save"} content={"שמירה"} />
          <Button className={"cancel"} content={"ביטול"} />
        </div>
      </form>
    </div>
  );
}
