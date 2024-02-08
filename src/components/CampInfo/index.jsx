import React, { useEffect, useState } from "react";
import CampaignItem from "../CampaignItem";
import api from "../../functions/api";
import InputWrapper from "../InputWrapper";
import InputText from "../InputText/InputText";
import Button from "../Button";


export default function CampaignInfo({ campId, title }) {
    const [onecampId, setoneCampId] = useState("");
    const [newTitle, setnewTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEdit = (e) => {
      setnewTitle(e.target.value);
    };
  
    const handleSave = async () => {
      // נעדכן את ה-title בשרת כאן
      // לדוגמה:
      console.log("nem:",newTitle);
      console.log("nem22:",campId);
    //   campId/msg/:msgId

    let nameMessage = { "title": newTitle }

      await api.put(`/campaign/${campId}`,nameMessage).then(() => {
        console.log('Title updated successfully');
      }).catch((error) => {
        console.error('Error updating title:', error);
      });
      console.log(newTitle);
      setIsEditing(false);
    };
  
    const handleCancel = () => {
      setnewTitle(title);
      setIsEditing(false);
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
        {isEditing ? (
          <>
            <InputWrapper
              label={"ערוך שם רשימה"}
              setIsVisible={true}
              to="campaignName"
              children={
                <InputText
                  name="campaignName"
                  onChange={handleEdit}
                  value={newTitle}
                />
              }
            />
            <Button
              onClick={handleSave}
              className={"save"}
              content={"שמירה"}
            />
            <Button
              onClick={handleCancel}
              className={"cancel"}
              content={"ביטול"}
            />
          </>
        ) : (
          <>
            <div>{newTitle}</div>
            <Button onClick={() => setIsEditing(true)} content={"עריכה"} />
          </>
        )}
      </div>
    );
  }
