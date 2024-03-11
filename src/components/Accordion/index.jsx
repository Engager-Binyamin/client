// import React, { useState } from 'react';
// import styles from './style.module.css';
// import Icon from '../Icon'
// import LeadItem from '../LeadItem';
// import formatDate from '../../functions/DateFormat';

// export default function Accordion({ title, children, campaignId }) {
//   const [isOpenAcord, setIsOpenAcord] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpenAcord(prevState => !prevState); // Toggle the state
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <div className={styles.header} onClick={toggleAccordion}>

//           <div>
//             {isOpenAcord ? <Icon nameIcon={'x'} nameColor={''} /> : <div className={styles.open}><Icon className={styles.icon} nameIcon={'enlarge'} nameColor={''} />{'הצג הכל'}</div>}
//           </div>
//           <span className={styles.title}>{title}</span>
//         </div>


//         <div>
//           {isOpenAcord && {
//  {children.map((lead, index) => (
//             <div className={styles.single} key={index}>
//               <LeadItem
//                 campaignId={campaignId}
//                 name={"lead.name"}
//                 email={lead.email}
//                 date={formatDate(lead.receptionDate)}
//                 id={lead._id} />
//               {console.log(lead.name)}
//             </div>
//           ))}
//           }}
//         </div>
//         {/* <div className={`${styles.content} ${!isOpenAcord ? styles.hide : ''}`}> */}

//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import styles from './style.module.css';
import Icon from '../Icon';
import LeadItem from '../LeadItem';
import formatDate from '../../functions/DateFormat';

export default function Accordion({ title,  leadList, campaignId }) {

  // TODO: לדאוג לכך שאם יש באקורדיון פחות מ3 אנשים/הודעות שיתפתח לרוחב הנדרש ולא יותר ממה שיש

  const [isOpenAcord, setIsOpenAcord] = useState(false);
  const toggleAccordion = () => {
    setIsOpenAcord(prevState => !prevState); // Toggle the state
  };

  return (
    <div className={isOpenAcord ? styles.wrapper : styles.closeWrapper}>
      <div className={styles.container}>
        <div className={styles.header} onClick={toggleAccordion}>
          <span className={styles.title}>{title}</span>
              <div className={styles.iconContainer}>
                {isOpenAcord ? <Icon nameIcon={'x'} nameColor={''} /> : <div className={styles.open}><Icon className={styles.icon} nameIcon={'enlarge'} nameColor={''} />{'הצג הכל'}</div>}
              </div>
        </div>
        <div className={styles.content}>
          {leadList?.map((lead, index) => (
            <div className={styles.single} key={index}>
              <LeadItem
                campaignId={campaignId}
                name={lead.fullName}
                email={lead.email}
                date={formatDate(lead.receptionDate)}
                id={lead._id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
