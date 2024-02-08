import React, { useContext, useState } from 'react'
import { useCampaign } from '../../pages/CampaignPage';
import HeadLine from '../HeadLine';
import TabSwitcher from '../TabSwitcher';
import LeadList from '../LeadList';
import SearchBar from '../SearchBar';
import styles from './style.module.css'
import Popover from '../Popover';
import Icon from '../Icon';
import PopUp from '../PopUp';
import UpdateAndAddLead from '../UpdateAndAddLead';
import DataContext from '../../context/DataContext'
import CampaignInfo from '../CampInfo';
import { useNavigate } from 'react-router-dom';



export default function LeadsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('date');
  const { isOpen, setIsOpen } = useContext(DataContext);

  const nav = useNavigate()

  const { campaign } = useCampaign();
  if (!Object.keys(campaign).length) return <></>
  if (!Object.keys(campaign).length) return <></>
  return (
    <div className={styles.leadsTab}>
      <HeadLine
        title={campaign.title}
        subtitle={`${campaign.leads.length} נרשמים, ${campaign.msg.length} הודעות`}
        icon={<Popover fnName={"onClick"}  list={[
          {
            text: "עריכת רשימה",
            icon: <Icon nameIcon={"writing"} />,
            onClick: () => { nav(`/campaign/${campaign._id}`) },
            
          },
          {
            text: "הוספת ידנית",
            icon: <Icon nameIcon={"userWithPlus"} />,
            onClick: () => setIsOpen(<UpdateAndAddLead setIsOpen={setIsOpen} campaign={campaign._id} />)
          },
          {
            text: "ייבוא רשימה",
            icon: <Icon nameIcon={"importList"} />
          },
          {
            text: "מחיקת רשימה",
            icon: <Icon nameIcon={"trash"} />,
            color: "red"
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
