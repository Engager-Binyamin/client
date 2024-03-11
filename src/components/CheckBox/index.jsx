import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

export default function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.CheckBoxFunction}>
      <div onClick={handleCheckBoxChange} className={styles.svg}>
        <svg
        className={styles.vi}
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          {isChecked ?          
           <path 
           d="M10.8002 1.40002L3.64068 8.60002L1.2002 6.14574"
            stroke="#6B6B6B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          : " "
        }
        </svg>
    
      </div>

      <div className={styles.text}>
        קראתי ואני מסכים ל <Link>תקנון האתר</Link> ולכל האמור בו
      </div>
    </div>
  );
}
