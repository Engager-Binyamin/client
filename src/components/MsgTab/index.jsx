import React, { useContext } from 'react'
import { useCampaign } from '../../pages/CampaignPage';
import TabSwitcher from '../TabSwitcher';
import HeadLine from '../HeadLine';
import MsgListHolder from '../MsgListHolder';
import styles from './style.module.css'
import MessageEdit from '../MessageEdit';
import DataContext from '../../context/DataContext';

export default function MsgTab() {
  // const { isOpen, setIsOpen } = useContext(DataContext)
  const campaign = useCampaign();
  if (!Object.keys(campaign).length) return <></>

  return (
    <div className={styles.msgTab}>
      <HeadLine
        title={campaign.title}
        subtitle={`${campaign.leads.length} נרשמים, ${campaign.msg.length} הודעות נשלחו`}
        iconName={"menu"}
        iconOnClick={() => setIsOpen(<MessageEdit />)}
      />
      <TabSwitcher rout={[
        { tab: `campaign/${campaign._id}/leads`, text: `נרשמים(${campaign.leads.length})` },
        { tab: `campaign/${campaign._id}/messages`, text: "הודעות" }
      ]} />
      <MsgListHolder />
    </div>
  )
}
