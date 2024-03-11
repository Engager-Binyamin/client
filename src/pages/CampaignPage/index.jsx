import React, { useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes, useParams } from "react-router";
import { createContext } from "react";
import api from "../../functions/api.js";
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
console.log(campId);
  const [campaign, setCampaign] = useState({});

  const getCamp = () => {
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

    <>
      <CampaignContext.Provider value={{ campaign, getCamp, setCampaign }}>
        <Outlet />
      </CampaignContext.Provider>
    </>

  );
}
