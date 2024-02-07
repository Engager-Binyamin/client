import React, { useContext, useState } from 'react'
import { useCampaign } from '../../pages/CampaignPage';
import HeadLine from '../HeadLine';
import TabSwitcher from '../TabSwitcher';
import LeadList from '../LeadList';
import SearchBar from '../SearchBar';
import styles from './style.module.css'
import Popover from '../Popover';
import Icon from '../Icon';



export default function LeadsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('date');


  const { campaign } =useCampaign();
  if (!Object.keys(campaign).length) return <></>
  if (!Object.keys(campaign).length) return <></>
  return (
    <div className={styles.leadsTab}>
      <HeadLine
        title={campaign.title}
        subtitle={`${campaign.leads.length} נרשמים, ${campaign.msg.length} הודעות`}
        icon={<Popover fnName={"onClick"} list={[
          {
            text: "עריכת רשימה",
            icon: <Icon nameIcon={"writing"} />
          },
          {
            text: "הוספת ידנית",
            icon: <Icon nameIcon={"userWithPlus"} />
          },
          {
            text: "ייבוא רשימה",
            icon: <Icon nameIcon={"writing"} />
          },
          {
            text: "מחיקת רשימה",
            icon: <Icon nameIcon={"writing"} />
          },
        ]} >
          <Icon nameIcon={"menu"} />
        </Popover>} />
      <TabSwitcher rout={[
        { tab: `campaign/${campaign._id}/leads`, text: `נרשמים(${campaign.leads.length})` },
        { tab: `campaign/${campaign._id}/messages`, text: "הודעות" }
      ]} />

      <SearchBar sortType={sortType} setSortType={setSortType} searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortButton={true} />
      <div className={styles.LeadListHolder}>
        <LeadList sortType={sortType} searchTerm={searchTerm} />
      </div>
    </div>
  )
}
