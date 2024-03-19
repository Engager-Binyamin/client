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

  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedDateTime) {
      const updatedDateTime = new Date(date)
      updatedDateTime.setHours(selectedDateTime.getHours(), selectedDateTime.getMinutes())
      setSelectedDateTime(updatedDateTime)
      console.log(updatedDateTime);
    } else {
      setSelectedDateTime(date);
    }
  }

  const handleTimeChange = (time) => {
    if (!selectedDate) {
      console.log("please select a date first?");
      return
    }
    const updatedDateTime = new Date(selectedDate)
    updatedDateTime.setHours(time.getHours(), time.getMinutes())
    setSelectedDateTime(updatedDateTime)
    console.log(updatedDateTime);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const submmit = { subject, content };
    console.log(selectedDateTime.getTime());
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
          {/* <br />
          <br /> */}
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
        {/* <br /> */}


        <div className={styles.timing}>
          <InputWrapper label="תזמון"
            subLabel='הזמן הנכון לשלוח את הודעה זו...'
            to="pickers">
            <div className={styles.pickers}>
              <DatePicker handleDateChange={handleDateChange} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
              <TimePicker handleTimeChange={handleTimeChange} setSelectedTime={setSelectedDateTime} selectedTime={selectedDateTime} />
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
