import { useState } from "react";
import MsgQueueItem from "../MsgQueueItem";
import styles from './style.module.css'
import Icon from "../Icon";

export default function MsgQueue({ arr }) {
  const [isOpenButton, setIsOpenButton] = useState(false)
  const [isOpenList, setIsOpenList] = useState(false)
  const onclickButton = () => { setIsOpenButton(true) }
  const onclickList = () => { isOpenList ? setIsOpenList(false) : setIsOpenList(true) }
  const onclickX = () => { setIsOpenButton(false); setIsOpenList(false) }

  return (
    <div className={styles.allpage}>
      {isOpenButton ?
        <div>
          <div className={styles.Icon} onClick={onclickX}>
            <Icon nameIcon={"x"} nameColor={""} />
          </div>
          <span className={styles.popup1}>ההודעה נשלחת כעת ל-   {<span className={styles.msg}>{arr.length}</span>} לקוחות</span>
          {!isOpenList ?
            <div className={styles.Icon2} onClick={onclickList}>
              <Icon nameIcon={"arrowUp"} nameColor={""} />
            </div>
            :
            <div className={styles.Icon2} onClick={onclickList}>
              <Icon nameIcon={"arrowDown"} nameColor={""} />
            </div>
          }
        </div>
        :
        <div className={styles.IconMsg} onClick={onclickButton}>
          <Icon nameIcon={"message"} nameColor={""} />
        </div>}
      {isOpenList ?
        <div className={styles.all}>
          <div className={styles.MsgQueue}>
            <div className={styles.title}>מצב ההודעות שלך</div>
            {arr.map(arr => <MsgQueueItem campaignName={arr.campaignName} userName={arr.userName} time={arr.time} />)}
          </div>
        </div>
        :
        <div></div>
      }
    </div>
  )
}
