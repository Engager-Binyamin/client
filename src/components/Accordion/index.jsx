import React, { useState } from 'react';
import styles from './style.module.css';
import Icon from '../Icon'
import LeadItem from '../LeadItem';
import formatDate from '../../functions/DateFormat';

export default function Accordion({ title, children, campaignId }) {
  const [isOpenAcord, setIsOpenAcord] = useState(false);

  const toggleAccordion = () => {
    setIsOpenAcord(prevState => !prevState); // Toggle the state
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header} onClick={toggleAccordion}>

          <div>
            {isOpenAcord ? <Icon nameIcon={'x'} nameColor={''} /> : <div className={styles.open}><Icon className={styles.icon} nameIcon={'enlarge'} nameColor={''} />{'הצג הכל'}</div>}
          </div>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={`${styles.content} ${!isOpenAcord ? styles.hide : ''}`}>
          {children.map((lead, index) => (
            <div className={styles.single} key={index}>
              <LeadItem
                campaignId={campaignId}
                name={"lead.name"}
                email={lead.email}
                date={formatDate(lead.receptionDate)}
                id={lead._id} />
              {console.log(lead.name)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
