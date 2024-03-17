import React, { useContext, useEffect, useState } from "react";
import { useCampaign } from "../../pages/CampaignPage";
import HeadLine from "../HeadLine";
import TabSwitcher from "../TabSwitcher";
import LeadList from "../LeadList";
import SearchBar from "../SearchBar";
import styles from "./style.module.css";
import Popover from "../Popover";
import Icon from "../Icon";
import UpdateAndAddLead from "../UpdateAndAddLead";
import DataContext from "../../context/DataContext";
import CampaignInfo from "../CampInfo";
import { useNavigate } from "react-router-dom";
import DelCampaign from '../DelCampaign';

export default function LeadsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("date");
  const { setPopUp } = useContext(DataContext);

  const nav = useNavigate();

  const { campaign, setCampaign } = useCampaign();
  const [newCampaign, setNewCampaign] = useState({});
  const { setAllCamps } = useContext(DataContext)
  useEffect(() => {
    setCampaign(newCampaign);
  }, [newCampaign])

  useEffect(() => {
    setCampaign(campaign)
  }, [campaign])

  // debugger
  if (!Object?.keys(campaign).length) return <></>;
  return (
    <div className={styles.leadsTab}>

      <div className={styles.headerContainer}>

        <div className={styles.titlesContainer}>
          <HeadLine
            title={campaign.title}
            subtitle={`${campaign.leads.length} נרשמים, ${campaign.msg.length} הודעות`}
          />
        </div>
        <div className={styles.popOverContainer}>
        <Popover
          fnName={"onClick"}
          list={[
            {
              text: "עריכת רשימה",
              icon: <Icon nameIcon={"writing"} />,
              onClick: () =>
                setPopUp({
                  title: "עריכת רשימה",
                  component: (
                    <CampaignInfo
                      setPopUp={setPopUp}
                      title={campaign.title}
                      campId={campaign._id}
                      setNewCampaign={setNewCampaign}
                    />
                  ),
                }),
            },
            {
              text: "הוספה ידנית",
              icon: <Icon nameIcon={"userWithPlus"} />,
              onClick: () =>
                setPopUp({
                  title: "הוספת אדם לקמפיין",
                  component: (
                    <UpdateAndAddLead
                      setPopUp={setPopUp}
                      campaign={campaign._id}
                      setCampaign={setNewCampaign}
                    />
                  ),
                }),
            },
            {
              text: "ייבוא רשימה",
              icon: <Icon nameIcon={"importList"} />,
            },
            {
              text: "מחיקת רשימה",
              icon: <Icon nameIcon={"trash"} />,
              color: "red",
              onClick: () =>
                setPopUp({
                  title: "מחיקת רשימה",
                  component: (
                    <DelCampaign
                      setPopUp={setPopUp}
                      title={campaign.title}
                      campId={campaign._id}
                    />
                  ),
                }),
            },
          ]}
        >
          <Icon nameIcon={"menu"} />
        </Popover>
        </div>
        
      </div>
      <TabSwitcher rout={[
        { tab: `campaign/${campaign._id}/leads`, text: `נרשמים(${campaign.leads.length})` },
        { tab: `campaign/${campaign._id}/messages`, text: "הודעות" },
        { tab: `campaign/${campaign._id}/webhook`, text: "קישור" }
      ]} />

      <SearchBar
        sortType={sortType}
        setSortType={setSortType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortButton={true}
      />
      <div className={styles.LeadListHolder}>
        <LeadList sortType={sortType} searchTerm={searchTerm} />
      </div>
    </div >
  );
}
