import React from 'react'
import SideBar from './SideBar/index'
import Content from './Content/index'
import styles from './style.module.css'
import { Route, Routes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import { ManageContext } from '../context/ManageContext';
import Test from '../tests/A_MainTest';
import PopUp from '../components/PopUp';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <ManageContext>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={
            <>
              <SideBar />
              <Content />
            </>} />
        </Routes>

        <Test />




        <PopUp />

      </ManageContext>
    </div>


  )
}
