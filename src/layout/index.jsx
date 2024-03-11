import React from 'react'
import styles from './style.module.css'
import { Outlet, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import { ManageContext } from '../context/ManageContext';
import Test from '../tests/A_MainTest';
import PopUp from '../components/PopUp';
import Register from '../components/Register';
import DashboardLayout from './DashboardLayout';
import CampaignPage from '../pages/CampaignPage';
import QRCodeComponent from '../components/Setting';
import PaymentPage from '../pages/PaymentPage';
import LeadsTab from '../components/LeadsTab';
import LeadInfoPage from '../pages/LeadInfoPage';
import MsgTab from '../components/MsgTab';
import MessagePage from '../components/MessagePage';
import MyLeads from '../components/MyLeads';
import AllLeads from '../components/AllLeads';
import AllActiveLeads from '../components/AllActiveLeads';
import AllInactiveLeads from '../components/AllInactiveLeads';


export default function Layout() {
  return (
    <div className={styles.layout}>
      <ManageContext>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<Register />} />
          <Route element={<DashboardLayout />} >
            <Route index element={<>DashboardLayout</>} />
            <Route path='myLeads' element={<MyLeads />} >
              <Route path="all" element={<AllLeads />} />
              <Route path="active" element={<AllActiveLeads />} />
              <Route path="inactive" element={<AllInactiveLeads />} />
            </Route>
            <Route path='campaign/:campId' element={<CampaignPage />}>
              <Route path="leads" element={<><LeadsTab /><Outlet /></>}>
                <Route index element={<>{/* TODO: להוסיף מסך פתיחה בכניסה ללידים כשאין ראוט לליד ספציפי */}</>} />
                <Route path=":leadId" element={<LeadInfoPage />} />
              </Route>
              <Route path="messages" element={<><MsgTab /><Outlet /></>}>
                <Route index element={<>{/* TODO: להוסיף מסך פתיחה בכניסה להודעות כשאין ראוט להודעה ספציפית */}</>} />
                <Route path=":messageId" element={<MessagePage />} />
              </Route>
            </Route>
            <Route path='settings' element={<QRCodeComponent />} />
            <Route path='payment' element={<PaymentPage />} />
          </Route>
        </Routes>
        <Test />
        <PopUp />
      </ManageContext>
    </div>
  )
}
