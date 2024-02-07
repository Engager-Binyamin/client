import { useRef, useState } from 'react';
import styles from "./style.module.css"
import Icon from '../Icon';
// Details : the componneta is input type time.
// Creator: shir

export default function TimePicker({style, ...props}) {
   const [mode,setMode] = useState("placeholder")
  // console.log("mode", mode)
  // console.log("condition", mode === "placeholder")
  return (
    <div className={styles.timePicker}>
              
        <label className={styles.text}
        style={{display:mode==="placeholder"?"block":"none"}} 
        onClick={()=>{
          setMode("edit")
        }}
        htmlFor='timePicker'
        >
          בחירת שעה
        </label>
        
        <input  type='time' className={styles.clock}
        style={{display:mode==="placeholder"?"none":"block ",...style}} id={'timePicker'}  
        onBlur={(e)=>{
          if (!e.currentTarget.value){
            setMode("placeholder")
          }
        }}
        name='time'  required={true}
        {...props}
        />
                    
        <span className={styles.icon} style={{display:mode==="placeholder"?"block":"block"}} 
        onClick={()=>{
          setMode("edit")
        }}
        htmlFor='timePicker' >
        <Icon nameIcon={'clock'} />
        </span>
       
      </div>
  );
}


