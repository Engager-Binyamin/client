import {useState } from 'react';
import styles from "./style.module.css"
import Icon from '../Icon';

// Details : the componneta is input type date.!need to limit the year!
// Creator: shir


export default function DatePicker({style, ...props}) {
   const [mode,setMode] = useState("placeholder")
   const today = new Date()
  //  .toISOString()
  //  .split('T')[O];
  // const today = new Date().toISOString().split('T')[0];
console.log(today);
   
  return (
    <div className={styles.datePicker}>
              
        <label className={styles.text}
        style={{display:mode==="placeholder"?"block":"none"}} 
        onClick={()=>{
          setMode("edit")
        }}
        htmlFor='datepicker'
        >
          בחירת תאריך
        </label>
        
        {/* {document.getElementById('datePicker').valueAsDate = new Date()} */}
        <input  type='date' className={styles.Calendar}
        style={{display:mode==="placeholder"?"none":"block ",...style}} id={'datePicker'}  
        onBlur={(e)=>{
          if (!e.currentTarget.value){
            setMode("placeholder")
          }
          // console.log(e.currentTarget.value)
        }}
        min={today} 
        max={'2025-01-01'}
        name='time'
        required={true}
        {...props}
        />          
        
        <span className={styles.icon} style={{display:mode==="placeholder"?"block":"block"}} 
        onClick={()=>{
          setMode("edit")
        }}
        htmlFor='datepicker' >
        <Icon nameIcon={'Calendar'} />
        </span>
       
      </div>
  );
}


