import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { Route, Routes, useParams } from "react-router";
import { createContext } from "react";
import LeadsTab from "../../components/LeadsTab/index.jsx";
import MsgTab from "../../components/MsgTab/index.jsx";
import MessagePage from "../../components/MessagePage/index.jsx";
import LeadInfoPage from "../LeadInfoPage/index.jsx";

import CampaignInfo from "../../components/CampInfo/index.jsx";
import api from "../../functions/api.js";
import axios from "axios";
import { toast } from "react-toastify";

// Description :
// Props : ____________ , _________
// Creator : ________

// יצירת קונטקסט לקמפיין
const CampaignContext = createContext();

export const useCampaign = () => {
  return useContext(CampaignContext);
};

// ככה אמורים להשתמש בזה
// const { campaign } =useCampaign();

// ---------------------------------------------
export default function CampaignPage() {
  const { campId } = useParams();

  const [campaign, setCampaign] = useState({});

  const getCamp=()=>{
    api.get("/campaign/" + campId).then(setCampaign)
        .catch((error) => {
          toast.error(error?.response?.data?.msg || "somthing want worng");
        });
  }

  useEffect(() => {
    if (campId) {
      
      getCamp()
    }
  }, [campId]);


  return (
    <div className={styles.campaignPage}>
      <CampaignContext.Provider value={{campaign , getCamp} }>
        <Routes>
          <Route path="/campaign/:campId" element={<CampaignInfo campId={campId}/>}/>
        
          <Route path="/leads" element={<LeadsTab />} />
          <Route path="/messages" element={<MsgTab />} />
          <Route
            path="/leads/:leadId"
            element={
              <div className={styles.tabs}>
                <LeadsTab />
                <span className={styles.infoTab}>
                  <LeadInfoPage />
                </span>
              </div>
            }
          />
          <Route
            path="/messages/:messageId"
            element={
              <div className={styles.tabs}>
                <MsgTab />
                <span className={styles.infoTab}>
                  <MessagePage />
                </span>
              </div>
            }
          />
        </Routes>
      </CampaignContext.Provider>
    </div>
  );
}
