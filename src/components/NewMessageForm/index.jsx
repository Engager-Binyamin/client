import styles from "./style.module.css";
import axios, { Axios } from "axios";

import InputWrapper from "../InputWrapper";
import Button from "../Button";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/index";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";



import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import api from "../../functions/api";
import { useParams } from "react-router";
import { toast } from "react-toastify";

// Description :
// Props : ____________ , _________
// Creator : ________

export default function NewMassageForm({ setPopUp, campId, getCamp }) {

  // TODO: ליישר את הכפתורים של הביטול והשמירה לפס של האינפוט של התוכן של ההודעה
  // TODO: להגביל את אורך שם ההודעה עם מספר תווים מקסימלי
  // TODO: לעשות שהשימרה תתן התראה שההודעה נשמרה בהצלחה ולא נשלחה בהצלחה

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [time, setTime] = useState();
   const [date, setDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submmit = { subject, content };

    setPopUp(false);
    
    try {
      const response = await api.post(
        `/campaign/${campId}/msg`,
        submmit
      );
      toast.success(response && "נשלח בהצלחה!");
      getCamp()
    } catch (error) {
      console.error("Error:", error);
      toast.error(Error?.response?.data?.msg || "something went wrong");

    }
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
        <br />


        <div className={styles.timing}>
      <InputWrapper label="תזמון"  
      subLabel='הזמן הנכון לשלוח את ההודעה זו...' 
      to = "pickers">
        <div className={styles.pickers}>
         <DatePicker
         name={'date'}
         date={date}
         setDate={setDate}

            /> 
         <TimePicker 
          name={'time'}
          time={time}
          setTime={setTime}
           />
         </div>
      </InputWrapper>
         </div>
       
        


        <div className={styles.actions}>
          <Button className={"save"} content={"שמירה"} />
          <Button className={"cancel"} content={"ביטול"} onClick={() => setPopUp(false)} />
        </div>
      </form>
    </div>
  );
}
