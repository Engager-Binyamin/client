import React, { useContext } from 'react'
import styles from './style.module.css'
import InputText from '../InputText/InputText'
import Button from '../Button'
import InputWrapper from '../InputWrapper'
import { useState } from 'react'
import axios from 'axios'
import api from '../../functions/api'
import DataContext from '../../context/DataContext'
import { useNavigate } from 'react-router'

import CheckBox from '../CheckBox'


// login page.
// <button /> gets props of content. needs to get ruot to DB to check that user fits password

export default function Login() {

    const [formState, setFormState] = useState({})
    const { user, setUser } = useContext(DataContext)
    const nav = useNavigate()
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const { token, user } = await api.post("/login", formState);
            setUser(user)
            localStorage.token = token
            nav("/")
            // console.log("localStorage", localStorage)
        } catch (err) {
            console.error({ err })
        }
    }
    // console.log(formState)
    // console.log(localStorage.token)


    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState(old => {
            const newData = { ...old, [name]: value }
            localStorage.user = JSON.stringify({ ...newData, password: '' })
            if ((newData.passwordConfirm) != (newData.password)) {
                // console.log(newData);
            }
            return newData
        })
    }

const toregister=()=>{
    nav('/register')
}

    return (
        <form onSubmit={handleSubmit} className={styles.inputSpace}>
            <div className={styles.title}>אנגייג'ר</div>
            <div className={styles.title2}>התחברות</div>
            <div>
                <InputWrapper label={"טלפון"} >
                    <InputText name={'phone'} required={true} onChange={handleChange} value={formState.name} className={styles.input} />
                </InputWrapper>
            </div>

            <div >
                <InputWrapper label={"סיסמה"} className={styles.nameinput}>
                    <InputText name={'password'} required={true} onChange={handleChange} value={formState.name} className={styles.input} />
                </InputWrapper>
            </div>

            <div className={styles.forget}>שכחתי סיסמא</div>
            <button className={styles.button} type='submit' >התחברות</button>
            <button className={styles.buttongoogle} type='submit' > <img src="google.png" alt="" /> התחברות באמצעות גוגל</button>
            <div className={styles.notlogin}>
                <div className={styles.notlogin1}>עדיין לא רשומים?</div>
                <div onClick={toregister} className={styles.notlogin2}>הרשמה זה ממש כאן</div>
            </div>
        </form>
    )
}
