import React, { useContext, useState } from 'react'
import { useCampaign } from '../../pages/CampaignPage';
import HeadLine from '../HeadLine';
import TabSwitcher from '../TabSwitcher';
import LeadList from '../LeadList';
import SearchBar from '../SearchBar';
import styles from './style.module.css'



export default function LeadsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('date');


  const campaign = useCampaign();
  if (!Object.keys(campaign).length) return <></>
  if (!Object.keys(campaign).length) return <></>
  return (
    <div className={styles.leadsTab}>
      <HeadLine
        title={campaign.title}
        subtitle={`${campaign.leads.length} נרשמים, ${campaign.msg.length} הודעות נשלחו`}
        icon={"menu"} />
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
