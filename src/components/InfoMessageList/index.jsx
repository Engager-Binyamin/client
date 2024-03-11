import { useEffect, useState } from 'react';
import styles from './style.module.css'
import demo from "../../data/msgs.data.json"
import messagesByDate from '../../functions/messagesByDate';
import MessageItem from '../MessageItem';
import formatTime from '../../functions/timeFormat';
import formatDate from '../../functions/DateFormat';
import { useCampaign } from '../../pages/CampaignPage';

// Description : gets a message array from context, maps it to MessageItem component seperated by date, with filter by seach
// Props : searchTerm from usestate of seachbar
// Creator : yehoshua preiser

export default function MessageList({ searchTerm , leadId}) {
  const {campaign} = useCampaign();
  const [organizedMessages, setOrganizedMessages] = useState({});

  useEffect(() => {
    const messages = campaign.receivedMsgs?.filter(msg=> msg.leadId == leadId);
    const msgArr = campaign.msg;
    const fullArr = messages?.map(sentMsg=> {
      const originalMsg = msgArr.find(v=> v._id == sentMsg.msgId);
      const fullMsg =  {...sentMsg, subject:originalMsg.subject, content:originalMsg.content};
      return fullMsg
    })
    setOrganizedMessages(messagesByDate(fullArr));
  }, [leadId]);

  // console.log({ organizedMessages });
  // console.log('@@',Object.entries(organizedMessages));

  return (
    <div className={styles.MessageList}>
      {Object.entries(organizedMessages).map(([date, messages], index) => (
        <div key={index} className={styles.messageListDiv}>
          <div className={styles.date}>{date}</div>
          <ul className={styles.unorderedList}>
            {messages.map((message, messageIndex) => (
              < li key={messageIndex} >
                <MessageItem
                  campaignId={campaign._id}
                  msgId={message._id}
                  title={message.subject}
                  date={formatDate(message.sentDate)}
                  time={formatTime(message.sentDate)}
                />
              </li>
            ))}

          </ul>
        </div>
      ))}
    </div >
  );
}