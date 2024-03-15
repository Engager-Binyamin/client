import React, { useContext, useEffect } from 'react'
import styles from './style.module.css'
import { Outlet, Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import { ManageContext } from '../context/ManageContext';
import Test from '../tests/A_MainTest';
import PopUp from '../components/PopUp';
import ForgetPassword from '../components/ForgetPassword';
import Register from '../components/Register';
import DashboardLayout from './DashboardLayout';
import CampaignPage from '../pages/CampaignPage';
import QRCodeComponent from '../components/Setting';
import PaymentPage from '../pages/PaymentPage';
import LeadsTab from '../components/LeadsTab';
import LeadInfoPage from '../pages/LeadInfoPage';
import MsgTab from '../components/MsgTab';
import MessagePage from '../components/MessagePage';
import WebHook from '../components/WebHook';
import WebHookTab from '../components/WebHookTab';
import WebHookPage from '../components/WebHookPage';
import CompleteDetails from '../pages/CompleteDetails/CompleteDetails';
import RedirectGoogle from '../pages/RedirectGoogle/RedirectGoogle';
import ActivateAccount from '../pages/ActivateAccount';
import MyLeads from '../components/MyLeads';
import AllLeads from '../components/AllLeads';
import AllActiveLeads from '../components/AllActiveLeads';
import AllInactiveLeads from '../components/AllInactiveLeads';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import FeedBack from '../components/FeedBack';
import GoogleRegisterRedirectPage from '../pages/GoogleRegisterRedirectPage';
import Dashboard from '../pages/Dashboard';

export default function Layout() {


  return (
    <div className={styles.layout}>
      <ManageContext>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='changePassword/:passwordToken' element={<ChangePasswordPage/>} />
          <Route path='register' element={<Register />} />

          <Route path='forgetPassword' element={<ForgetPassword/>} />

          <Route path='completeDetails/:email' element={<CompleteDetails />} />
          <Route path='redircetGoogle/:token' element={<RedirectGoogle />} />
          <Route path='user-doesnt-exists' element={<GoogleRegisterRedirectPage />} />
          <Route path='activate-user/:userToken' element={<ActivateAccount />} />

          <Route element={<DashboardLayout />} >
            {/* <Route path='plans' element={<Plans />} /> */}
            <Route index element={<Dashboard/>} />
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
              <Route path="webhook" element={<><WebHookTab /><WebHookPage /></>} />
            </Route>
            <Route path='settings' element={<QRCodeComponent />} />
            <Route path='feedback' element={<FeedBack />} />
            <Route path='payment' element={<PaymentPage />} />
          </Route>
        </Routes>
        <Test />
        <PopUp />
      </ManageContext>
    </div>
  )
}
