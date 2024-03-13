import React, { useContext, useEffect, useState } from "react";
import styles from './style.module.css'
import api from "../../functions/api";
import InputWrapper from "../InputWrapper";
import InputText from "../InputText/InputText";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";


export default function DelCampaign({ campId, title, setIsOpen }) {
  const [onecampId, setoneCampId] = useState("");
  const nav = useNavigate();
  const {user, setUser} = useContext(DataContext);


  const handleDelete = async () => {
    await api.del(`/campaign/${campId}`).catch((error) => {
      console.error('Error updating title:', error);
    });
    setIsOpen(false);
    console.log('user',user);
    setUser({...user, campaigns: user?.campaigns?.filter(camp => {
      camp._id != campId
    })});
    nav('../');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (campId) {
      api.get(`/campaign/${campId}`).then((res) => {
        setoneCampId(res.data);
      });
    }
  }, [campId]);

  return (
    <div>

      <span>האם אתה בטוח שתרצה למחוק את הקמפיין '{title}'?</span>
      <div className={styles.buttons}>
        <Button
          onClick={handleCancel}
          className={"cancel"}
          content={"ביטול"}
        />
        <Button
          onClick={handleDelete}
          className={"save"}
          content={"מחיקה"}
        />
      </div>
    </div>
  );
}
