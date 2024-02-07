import { useState } from 'react'
import Icon from '../../components/Icon'
import InfoMessageList from '../../components/InfoMessageList'
import styles from './style.module.css'
import UpdateAndAddLead from '../../components/UpdateAndAddLead'


// Description: This component serves as a user profile page. It is designed to display user information, including first name, last name, email, phone number, registration date, and active status indicator.
//Use of this component should pass real user data from the DB as props.
// Props:
//   - firstName (string): The first name of the user.
//   - lastName (string): The last name of the user.
//   - phoneNumber (string): The phone number of the user.
//   - email (string): The email address of the user.
//   - notes (string): Additional notes or comments about the user.
//   - signUpDate (string): The date of user registration.
//   - isActive (boolean): A flag indicating whether the user is active.
//    If isActive is true, it will display "פעיל"; if false, it will display a red dot and "לא פעיל"
// Creator: Refael

export default function LeadInfoPage({ name = "יעקב הנוכל", phoneNumber = "054-8104093", email = "email@gmail.com", notes = "Maiores itaque recusandae repellat provident ea praesentium officiis dignissimos atque ad vero architecto, fuga laborum sintprae sentium officiis dignissimos atque ad vero architecto, fuga laborum sint", signUpDate = "12/03/22", isActive = true, campaignId, id  }) {




  //****************************************************************************

  //TODO: replace the default props values with this object:
  // const {name, phoneNumber, email, notes, signUpDate, isActive = true} = userDetils

  //*************************************************************************************************************

  const [isEdit, setIsEdite] = useState(false)

  const handleEditClick = () => {
    setIsEdite(true)

  }

  return (
    <>
      {isEdit ? (
        <>
          {/* ***TODO: Add edit component*** */}
          <UpdateAndAddLead details = {{name:name, email:email, phone:phoneNumber, notes:notes, leadId:id}} setIsEdite={setIsEdite} />
          <div className={styles.editPage}></div></>)
        : (<>
          <div className={styles.info}>
            <div className={styles.container}>
              <div className={styles.details}>
                {name}
                <div className={styles.isActive}>
                  {isActive ? (
                    <>
                      <div className={styles.greenDot}></div>
                      <span>פעיל/ה</span>
                    </>
                  ) : (
                    <>
                      <div className={styles.redDot}></div>
                      <span>לא פעיל/ה</span>
                    </>
                  )}
                </div>
              </div>
              <div onClick={handleEditClick} className={styles.edit}><Icon nameIcon={'writing'}
                nameColor={''} />  </div>
            </div>
            <div className={styles.detailsFrame}>
              
              
              <div className={styles.name}>
                <div>שם</div>
                <div>{name}</div>
              </div>


              <div className={styles.telAndEmail}>
                <div>
                  <div>טלפון</div>
                  <div>{phoneNumber}</div>
                </div>


                <div>
                  <div>אימייל</div>
                  <div>{email}</div>
                </div>
            <div className={styles.allFields}>
              <div className={styles.detailsFrame}>
                <div className={styles.infoCol}>
                  <div className={styles.infoBlock}>
                    <div className={styles.miniTitle}>שם</div>
                    <div className={styles.content}>{name}</div>
                  </div>
                  <div className={styles.infoBlock}>
                    <div className={styles.miniTitle}>טלפון</div>
                    <div className={styles.content}>{phoneNumber}</div>
                  </div>
                </div>
                <div className={styles.infoCol}>
                  <div className={styles.infoBlock}>
                    <div className={styles.miniTitle}>אימייל</div>
                    <div className={styles.content}>{email}</div>
                  </div>
                </div>
                <div className={styles.infoFullCol}>
                  <div>
                    <div colSpan="2" className={styles.miniTitle}>הערות</div>
                    <div colSpan="2" >{notes}</div>
                  </div>
                </div>
              </div>
                <div>
                  <div colSpan="2">הערות</div>
                  <div colSpan="2" >{notes}</div>
                </div>



              <div className={styles.signUpDate}>
                תאריך ההצטרפות: {signUpDate}

              </div>
            </div>
          </div>
          <div className={styles.signUpDate}>
            תאריך ההצטרפות: {signUpDate}
          </div>
            </div>
          </div>

          <div className={styles.sentMessagesContainer}>
            <div className={styles.sentTitle}>הודעות שנשלחו</div>
            {/* ***TODO: make it only sent messages*** */}
            <div className={styles.messages}><InfoMessageList /></div>
          </div>
        </>
        )}
    </>
  )
}
