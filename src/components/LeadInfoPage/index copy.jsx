import styles from './style.module.css'
import { RiCheckDoubleFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";


// Description:
// Props:
// Creator: Refael

export default function LeadInfoPage({ firstName = "יעקב", lastName = "מושל", phoneNumber = "054-8104093", email = "email@gmail.com", notes = "-", signUpDate = "12/03/22", isActive = true }) {
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.details}>
          {firstName} {" "}{lastName}
          <div className={styles.isActive}>
            {isActive ? (
              <>
                <span>פעיל</span>
                <div className={styles.greenDot}></div>
              </>
            ) : (
              <>
                <span>לא פעיל</span>
                <div className={styles.redDot}></div>
              </>
            )}
          </div>
        </div>
        <div className={styles.detailsFrame}>
          <table>
            <tbody>
              <tr>
                <th>שם משפחה</th><th>שם פרטי</th>
              </tr>
              <tr>
                <td>{lastName}</td><td>{firstName}</td>
              </tr>
              <tr>
                <th>אימייל</th><th>טלפון</th>
              </tr>
              <tr>
                <td>{email}</td><td>{phoneNumber}</td>
              </tr>
              <tr>
                <th colSpan="2">הערות</th>
              </tr>
              <tr>
                <td colSpan="2" >{notes}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.signUpDate}>
            תאריך ההצטרפות: {signUpDate}

          </div>
        </div>
      </div>
      <div className={styles.sentMessages}>

      </div>
    </div>


  )
}