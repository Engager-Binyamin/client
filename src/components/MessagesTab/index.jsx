import styles from './style.module.css'
import MessageList from '../MessageList'
import Button from '../Button'
import SearchBar from '../SearchBar'
import PopUp from '../PopUp'
import { useState } from 'react'
import NewMessageForm from '../NewMessageForm'
// Description : 
// Props : ____________ , _________
// Creator : Yehoshua Preiser
export default function MessagesTab() {
  const [PopUp, setPopUp] = useState(false)
  return (<>
  <div>
      <PopUp isOpen={isOpen} setPopUp={setPopUp} title={"הודעה חדשה"}>
        <NewMessageForm campaign={campaign} setPopUp={setPopUp} />
      </PopUp>
  </div>
    <div className={styles.MessagesTab}>
      <SearchBar/>
      <MessageList/>
      <Button className='cancel' content='הודעה חדשה' onClick={()=>setPopUp(true)}/>
    </div>
  </>
  )
}
