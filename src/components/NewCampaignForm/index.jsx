import styles from "./style.module.css";
import axios, { Axios } from "axios";
import InputWrapper from "../InputWrapper";
import Button from "../Button";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/index";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import api from '../../functions/api'
import DataContext from "../../context/DataContext";
import CampaignItem from "../CampaignItem";

export default function NewCampaigenForm({ setIsOpen, getCamp }) {
  // const [user, setUser] = useState(userid);
  const { user, setUser } = useContext(DataContext)
  console.log("user", user)
  const [campName, setCampName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handelSubmitNewCampaigen = async (e) => {
    e.preventDefault();
    const body = {
      // "user": user,
      "title": campName,
      "starterMsg": starterMsg
    };

    setIsOpen(false);
    try {
      const response = await api.post("/campaign",
        body
      );
      console.log(user, campName, starterMsg);
      toast.success(response && "נשלח בהצלחה!");
      getCamp()
    } catch (Error) {
      console.error("Error:", Error);
      toast.error(Error?.response?.data?.msg || "somthing want worng");
    }
    console.log(user, campName);
  };

  return (
    <div className={styles.InputWrapper}>
      <form onSubmit={handelSubmitNewCampaigen}>
        <div>
          <h1>רשימה חדשה</h1>
        </div>
        <main>
          <InputWrapper
            label={"שם רשימה"}
            subLabel={"שם פנימי שלא יהיה חשוף למצטרפים לרשימה"}
            to={"campaignMsg"}
            setIsVisible={true}
            children={
              <InputText
                name="campaignMsg"
                onChange={(e) => setUser(e.target.value)}
              />
            }
            type="text"
          />
          <br />
          <br />
          <InputWrapper
            label={"הודעת אפס"}
            subLabel={"זוהי ההודעה שתשלח אוטומטית לכל מצטרף חדש לרשימה"}
            to={"campaignTextArea"}
            children={
              <InputTextArea
                name={"campaignTextArea"}
                onChange={(e) => setCampName(e.target.value)}
              />
            }
            type="text"
          />
          <div className={styles.actions}>
            <Button type={"submit"} className={"save"} content={"שמירה"} />
            <Button className={"cancel"} content={"ביטול"} onClick={()=>setIsOpen(false)}/>
          </div>
        </main>
      </form>
    </div>
  );
}
