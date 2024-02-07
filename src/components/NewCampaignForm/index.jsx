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

export default function NewCampaigenForm({ setIsOpen, getCamp, }) {
  // const [user, setUser] = useState(userid);
  const { user, setUser } = useContext(DataContext)
  console.log("user", user)
  const [campName, setCampName] = useState("");
  const [starterMsg, setStarterMsg] = useState("");
  //***TODO: Starter Message*******/
  //***TODO: Get User Id*******/

  const handelSubmitNewCampaigen = async (e) => {
    e.preventDefault();
    const SubmmitNewCampaigen = {
      // "user": user,
      "campName": campName,
      "campaignTextArea": starterMsg
    };

    setIsOpen(false);
    try {
      const response = await api.post("/campaign",
        SubmmitNewCampaigen
      );
      toast.success(response && "נשלח בהצלחה!");
      console.log(user, campName);
      getCamp()
    } catch (Error) {
      console.error("Error:", Error);
      toast.error(Error?.response?.data?.msg || "something went wrong");
    }
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
                onChange={(e) => setCampName(e.target.value)}
              />
            }
            type="text"
          />

          <InputWrapper
            label={"הודעת אפס"}
            subLabel={"זוהי ההודעה שתשלח אוטומטית לכל מצטרף חדש לרשימה"}
            to={"campaignTextArea"}
            children={
              <InputTextArea
                name={"campaignTextArea"}
                onChange={(e) => setStarterMsg(e.target.value)}
              />
            }
            type="text"
          />
          {/* onClick={ setIsOpen(false)}  */}
          <div className={styles.actions}>
            <Button className={"save"} content={"שמירה"} />
            <Button className={"cancel"} content={"ביטול"} />
          </div>
        </main>
      </form>
    </div>
  );
}
