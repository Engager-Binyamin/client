import React from 'react'
import CampaignList from '../components/CampaignList'
import Login from '../components/Login/Login'
import Register from '../components/Register'
import HeadLine from '../components/HeadLine'
import MessageEdit from '../components/MessageEdit'
import UserLogoutEdit from '../components/UserLogoutEdit'
// import { data } from '../data/campaign.data.json'
export default function Liel() {
  let user = {
      name: "ליאל",
      avatar: ""
    }
 
  return (
    <div>
      {/* <HeadLine title={"title"} subtitle={"subtitle"} />  */}
      {/* <CampaignList campaignList={data} /> */}
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <MessageEdit/> */}
      {/* <UserLogoutEdit user={user} /> */}
    </div>
  )
}
