import React from 'react'
import styles from "./style.module.css";
import { NavLink } from 'react-router-dom';


export default function SettingsTab() {
    return (
        <div className={styles.settingsTab}>
            <div className={styles.container}>
                    <NavLink to='QrCode'>
                <div className={styles.link}>
                        לברקוד
                </div>
                    </NavLink>
                    <NavLink to='plans'>
                <div  className={styles.link}>
                        לתוכניות
                </div>
                    </NavLink>
            </div>
        </div>
    )
}
