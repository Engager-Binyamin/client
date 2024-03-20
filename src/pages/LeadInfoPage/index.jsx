import { useEffect, useState, useContext } from 'react'
import Icon from '../../components/Icon'
import InfoMessageList from '../../components/InfoMessageList'
import styles from './style.module.css'
import UpdateAndAddLead from '../../components/UpdateAndAddLead'
import { useCampaign } from '../CampaignPage'
import { useParams } from 'react-router'
import formatDate from '../../functions/DateFormat'
import DataContext from "../../context/DataContext";

import Button from '../../components/Button'
// Description: This component serves as a user profile page. It is designed to display user information, including first fullName, last fullName, email, phone number, registration date, and active status indicator.
//Use of this component should pass real user data from the DB as props.
// Props:
//   - firstName (string): The first name of the user.
//   - lastName (string): The last name of the user.
//   - phoneNumber (string): The phone number of the user.
//   - email (string): The email address of the user.
//   - notes (string): Additional notes or comments about the user.
//   - joinDate (string): The date of user registration.
//   - isActive (boolean): A flag indicating whether the user is active.
//    If isActive is true, it will display "פעיל"; if false, it will display a red dot and "לא פעיל"
// Creator: Refael

export default function LeadInfoPage() {
  // TODO: לרווח בין פרטי הליד להודעות שלנשלחו אליו
  // TODO: לדאוג שהחלון עריכה יהיה במרכז הקומפוננטה
  // TODO: לדאוג לרנדר מחדש את הקומפוננטה כל פעם שפרטי הליד משתנים אחרי שעורכים אותם

  const { leadId } = useParams();
  const { campaign,getCamp } = useCampaign();
  const { setPopUp } = useContext(DataContext);

  const [lead, setLead] = useState({})

  useEffect(() => {
    if (Object.keys(campaign).length) {
      setLead(campaign.leads.find(obj => obj._id == leadId));
    }
  }, [campaign.leads, leadId])
  // useEffect(() => {
  //   if (Object.keys(campaign).length) {
  //     setLead(campaign.leads.find(obj => obj._id == leadId));
  //   }
  // }, [])

  const { fullName, phone, email, notes, _id, extra={}, joinDate, isActive } = lead || {};
  const signUpDate = formatDate(joinDate)
  const [isEdit, setIsEdite] = useState(false)

  const handleEditClick = () => {
    setIsEdite(true)
  }
  return (
    <div className={styles.layout}>
      <div className={styles.info}>
        <div className={styles.container}>
          <div className={styles.details}>
            {name}
            <div className={styles.isActive}>
              <div className={isActive ? styles.greenDot : styles.redDot}></div>
              <span>{isActive ? 'פעיל/ה' : 'לא פעיל/ה'}</span>
            </div>
          </div>
          <div onClick={
            () =>
              setPopUp({
                title: "עריכת פרטי נרשמים",
                component: (
                  <UpdateAndAddLead
                    setPopUp={setPopUp}
                    campaign={campaign}
                    details={{ fullName, email, phone, notes, leadId: _id, extra}}
                    isEdit={true}
                    getCamp={getCamp}
                  />
                )
              })
          }
            className={styles.edit}><Icon nameIcon={'writing'}
              nameColor={''} />  </div>
        </div>
        <div className={styles.detailsFrame}>
          <div className={styles.allFields}>
            <div className={styles.detailsFrame}>
              <div className={styles.infoCol}>
                <div className={styles.infoBlock}>
                  <div className={styles.miniTitle}>שם</div>
                  <div className={styles.content}>{fullName}</div>
                </div>
                <div className={styles.infoBlock}>
                  <div className={styles.miniTitle}>טלפון</div>
                  <div className={styles.content}>{phone}</div>
                </div>
              </div>
              <div className={styles.infoCol}>
                <div className={styles.infoBlock}>
                  <div className={styles.miniTitle}>אימייל</div>
                  <div className={styles.content}>{email}</div>
                </div>
              </div>
              <div  className={styles.detailsFrame}>
              {Object.keys(extra).map((item, index) => {
                return <div key={index} className={styles.infoBlock}>
                    <div className={styles.miniTitle}>{extra[item].he}</div>
                    <div className={styles.content}>{extra[item].value}</div>
                  </div>
              })}
              </div>
              <div className={styles.infoFullCol}>
                <div>
                  <div colSpan="2" className={styles.miniTitle}>הערות</div>
                  <div colSpan="2" >{notes}</div>
                </div>
              </div>
            </div>
            <div className={styles.signUpDate}>
              תאריך ההצטרפות: {signUpDate}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sentMessagesContainer}>
        <div className={styles.sentTitle}>הודעות שנשלחו</div>
        {/* ***TODO: make it only sent messages*** */}
        <div className={styles.messages}><InfoMessageList leadId={leadId} /></div>
      </div>
    </div>
  )
}


