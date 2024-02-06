import styles from "./style.module.css";
import React, { useState } from "react";

// Description : labal input
// Props : label,h2,to
// Creator : yakov moshel

// דוגמא לקריאה לפונקציה 
// <InputWrapper label="שם:" to=""  h2=" " children={} type="text" setIsVisible={true/false}/>

export default function InputWrapper({label,  subLabel, to = "",children ,setIsVisible }){ 


  return (
    <div className={styles.InputWrapper}>
      <label className={styles.h2} htmlFor={to}>
        {label}
         {setIsVisible && <div className={styles.asterisk}> * </div>}
      </label>
      <label className={styles.label} htmlFor={to}>
        {subLabel}
      </label>
      {children}
    </div>
  );
}