import { useEffect, useState } from 'react';
import styles from './style.module.css'
import messagesByDate from '../../functions/messagesByDate';
import MessageItem from '../MessageItem';
import { useCampaign } from '../../pages/CampaignPage';
import formatTime from '../../functions/timeFormat';
import formatDate from '../../functions/DateFormat';

// Description : gets a message array from context, maps it to MessageItem component seperated by date, with filter by seach
// Props : searchTerm from usestate of seachbar
// Creator : yehoshua preiser
export default function MessageList({ searchTerm }) {

  const { campaign } = useCampaign();
  const [organizedMessages, setOrganizedMessages] = useState({});

  useEffect(() => {
    const messages = messagesByDate(campaign.msg, "creationDate");
    setOrganizedMessages(messages);
  }, [campaign.msg]);

  return (
    <div className={styles.messageList}>
      {Object.entries(organizedMessages).map(([date, messages], index) => (
        <div key={index} className={styles.messages}>
          {/* <div className={styles.date}>{date}</div> */}
          <ul className={styles.unorderedList}>
            {searchTerm.trim() !== "" ?
              messages.filter((message) =>
                message.subject?.toLowerCase().includes(searchTerm.trim()?.toLowerCase())
              ).map((message, messageIndex) => (
                <li key={messageIndex}>
                  <div className={styles.date}>{date}</div>
                  <MessageItem
                    campaignId={campaign._id}
                    msgId={message._id}
                    title={message.subject}
                    date={formatDate(message.creationDate)}
                    time={formatTime(message.creationDate)}
                  />
                </li>
              ))
              : messages.map((message, messageIndex) => (
                <li key={messageIndex}>
                  <div className={styles.date}>{date}</div>
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
      ))}
    </div>
  );
}