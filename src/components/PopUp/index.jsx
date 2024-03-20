import React, { useContext, useState } from 'react';
import styles from './style.module.css';
import Icon from '../Icon'
import DataContext from '../../context/DataContext';

export default function PopUp() {
  //the function needs to recive children and need to recive PopUp and setPopUp in the props and render them
  // const [PopUp, setPopUp] = useState9(false);
  const { setPopUp, PopUp } = useContext(DataContext)
  return (
    <div className={styles.allpopup}>
      {PopUp && (
        <div className={styles.container} onClick={() => setPopUp(false)}>
          <div
            dir="rtl"
            className={styles.popup}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >


            <div className={styles.top}>
              <div>
                <h1>{PopUp.title}</h1>
              </div>
              <div className={styles.close} onClick={() => setPopUp(false)}>
                <Icon nameIcon={"x"} nameColor={""} />
              </div>
            </div>


            {PopUp.component}
          </div>
        </div>
      )}
    </div>
  );
}
