import { useEffect, useState } from 'react';
import styles from './style.module.css'
import demo from "../../data/msgs.data.json"
import messagesByDate from '../../functions/messagesByDate';
import MessageItem from '../MessageItem';
import { useCampaign } from '../../pages/CampaignPage';
import formatTime from '../../functions/timeFormat';
import formatDate from '../../functions/DateFormat';

// Description : gets a message array from context, maps it to MessageItem component seperated by date, with filter by seach
// Props : searchTerm from usestate of seachbar
// Creator : yehoshua preiser
export default function MessageList({ searchTerm }) {

  const { campaign } =useCampaign();
  // console.log(campaign);
  const [organizedMessages, setOrganizedMessages] = useState({});

  useEffect(() => {
    const messages = messagesByDate(campaign.msg);
    setOrganizedMessages(messages);
    // console.log(messages);
  }, [campaign.msg]);

  // console.log({ organizedMessages });

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
                  date={formatDate(message.creationDate)}
                  time={formatTime(message.creationDate)}
                />
              </li>
            ))}

          </ul>
        </div>
      ))
      }
    </div >
  );
}