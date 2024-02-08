import styles from './style.module.css'
import Login from '../../components/Login/Login'
import Register from '../../components/Register'
import { useState } from 'react'
import TabSwitcher from '../../components/TabSwitcher'




export default function RegisterPage() {

    // const [choose,setChoose] =useState('login')
   
    // const handleChoose = (value) => {
    //     setChoose(value);
    //   };
    const arr =[{tab:"register",text:"הרשמה"},{tab:"login",text:"התחברות"}]

  return (
    < div >
     <Register  />
    </div>
    )
      
    
}
