import styles from './style.module.css'
import Login from '../../components/Login/Login'
import Register from '../../components/Register'
import { useState } from 'react'
import TabSwitcher from '../../components/TabSwitcher'
import { useNavigate } from 'react-router-dom'


// Details : the componneta render Login/Regisrer by state thet change onClick
// Creator: shir

export default function LoginPage() {


  const navigate = useNavigate()
  const arr = [{ tab: "register", text: "הרשמה" }, { tab: "login", text: "התחברות" }]

  // const login = () => {
  //   navigate(`/login`, { relative: 'path' })
  // }
  
  return (
    < div >
<TabSwitcher rout={arr}/>
     
      <Login/>
    </div>

  )


}
