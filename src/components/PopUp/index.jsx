import React, { useContext, useState } from 'react';
import styles from './style.module.css';
import Icon from '../Icon'
import DataContext from '../../context/DataContext';

export default function PopUp() {
  //the function needs to recive children and need to recive isOpen and setIsOpen in the props and render them
  // const [isOpen, setIsOpen] = useState9(false);
  const { setIsOpen, isOpen } = useContext(DataContext)
  return (
    <div className={styles.allpopup}>
      {isOpen && (
        <div className={styles.container} onClick={() => setIsOpen(false)}>
          <div dir='rtl' className={styles.popup} onClick={(e) => { e.stopPropagation() }}>
            <div className={styles.top}>
              <span className={styles.close} onClick={() => setIsOpen(false)}>
                <Icon nameIcon={'x'} nameColor={''} />
              </span>
            </div>
            {isOpen}
          </div>
        </div>
      )}
    </div>
  );
}
