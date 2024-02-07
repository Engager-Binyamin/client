import styles from "./style.module.css";
import axios, { Axios } from "axios";
import InputWrapper from "../InputWrapper";
import Button from "../Button";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/index";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function NewCampaigenForm({
  setIsOpen,
  _id = "65ba97e536d6af41e9beb0d1",
}) {
  const [user, setUser] = useState("");
  const [campName, setCampName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handelSubmitNewCampaigen = async (e) => {
    e.preventDefault();
    const SubmmitNewCampaigen = {
      user: _id,
      campName,
    };

    setIsOpen(false);
    try {
      const response = await axios.post(
        "http://localhost:2500/campaign",

        SubmmitNewCampaigen,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success(response && "נשלח בהצלחה!");
      console.log(user, campName);
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
