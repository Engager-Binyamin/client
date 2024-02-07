import React, { useContext } from 'react'
import { useState } from 'react';
// import PopUp from '../components/PopUp'
import Accordion from '../components/Accordion'
import MsgTab from '../components/MsgTab';
// import Accordion from '../components/Accordion';
import DataContext from '../context/DataContext'
// import MsgListHolder from '../components/MsgListHolder';
import { toast } from 'react-toastify';
import MsgListHolder from '../components/MsgListHolder';
import CampaignPage from '../pages/CampaignPage';
import TabSwitcher from '../components/TabSwitcher';
import NewCampaigenForm from '../components/NewCampaignForm';

export default function Shaked() {
  const { user, setUser } = useContext(DataContext);

  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>

      {/* <Accordion title={'הודעה חדשה'}>
       { ['hello', 'i', 'am', 'shaked', 'ben', 'hamo', 'guikh', 'gyhjbvh']}
      </Accordion>  */}
      {/* <CampaignPage/> */}
      {/* <TabSwitcher /> */}

      {/* <MsgTab/>  */}
      {/* <PopUp isOpen={isOpen} setIsOpen={setIsOpen}> 
      vnjzks
      </PopUp> */}
      {/* <MsgListHolder/> */}
      {/* <div><NewCampaigenForm/></div> */}

    </div>
  )
}
