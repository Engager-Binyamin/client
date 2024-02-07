import React from 'react'
import MessagePage from '../components/MessagePage'
import CampaignItem from '../components/CampaignItem'
import Accordion from '../components/Accordion'
import Login from '../components/Login/Login'
import Register from '../components/Register'
import TabSwitcher from '../components/TabSwitcher'
import HeadLine from '../components/HeadLine'
import formatDate from '../functions/DateFormat'

export default function Gila() {
  const message = "בלה בלה בלה"
  const title = "הודעת ראשונה - ההרשמה נפתחה"
  const icon = "ooo"
  const dateSend = "14.10.2024"
  const timeSend = "12:34"
  const dateCreate = "31.7.2023"

  return (
    <div>
      {/* <TabSwitcher/> */}
      {/* <Outlet/> */}
      {/* <CampaignItem/> */}
<Login/>
    </div>
  )
}
