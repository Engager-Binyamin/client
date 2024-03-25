import { useRef } from 'react'
import styles from './style.module.css'
import { forwardRef } from 'react';
// Description : generic input text area 
// Props : value, onChange, placeholder, rows
// Creator : yehoshua preiser

export default function InputTextArea({ style = {},name={}, fRef, ...props }) {
  
 
  return (
    <textarea className={styles.textarea} ref={fRef}  name={name} id={name} style={style} {...props}  />
    
  )
}
