import styles from './style.module.css'

export default function MsgQueueItem({ campaignName, userName, time }) {
  return (
    <div className={styles.itemsg}>
      <div className={styles.msg}>
        קמפיין: {<span className={styles.allmsg}>
          <span className={styles.item}>{campaignName}</span>, בשליחה אל <span className={styles.item}>{userName}</span>
            <span className={styles.point}>.</span>
            <span className={styles.point}>.</span>
            <span className={styles.point}>.</span>
         </span>}
      </div>
      {/* <div className={styles.time}>{time}</div> */}
    </div>
  )
}
