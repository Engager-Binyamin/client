import React from 'react'
import SideBar from '../SideBar'
import { Outlet } from 'react-router'
import styles from './style.module.css'

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      {/* TODO: להוסיף מסך פתיחה בכניסה לאפליקציה כשאין ראוט ספציפי */}
      <Outlet />
    </div>
  )
}
