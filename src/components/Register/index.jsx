import React, { useState } from 'react'
import InputText from '../InputText/InputText'
import styles from './style.module.css'
import Button from '../Button'
import InputWrapper from '../InputWrapper'
import axios from 'axios'
import api from '../../functions/api'
import TabSwitcher from '../../components/TabSwitcher'
import { useNavigate } from 'react-router-dom'
import CheckBox from '../CheckBox'


// קומפוננטת הרשמת משתמש חדש לא ליד!! 


export default function Register() {
    const [isChecked, setIsChecked] = useState(false);

    const fromtemplet = { name: '', phone: '', email: '', password: '', passwordConfirm: '' }
    const [formState, setFormState] = useState(fromtemplet)
    const [errorForm, setErrorForm] = useState(fromtemplet)
    const nav = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        const data = formState
        api.post("/user", data)
            .then(res => {console.log(res) ; nav('/login')})
            .catch((res) => console.log("יצירת משתמש נכשלה:", res.data))
        
    }

    const checkInput = (newData = '', name) => {
        const pas = newData.password
        const email = newData.email
        const phone = newData.phone
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        const phoneRegex = /^(?:0[5][2-9]\d(?:-?\d){6})$/;

        if ([name] == 'passwordConfirm' && (newData.passwordConfirm) != (pas)) {//עובד נפלא
            setErrorForm(old => ({ ...old, [name]: 'סיסמה לא תואמת' }))
        }
        else if ([name] == 'password' && (!passwordRegex.test(pas))) {//עובד נפלא
            setErrorForm(old => ({ ...old, [name]: ' סיסמה כוללת אות ומספר ו8 תווים לפחות' }))
        }
        else if ([name] == 'email' && (!email.includes("@") || !email.includes("."))) {//עובד נפלא
            setErrorForm(old => ({ ...old, [name]: 'אמייל לא תקין' }))
        }
        else if ([name] == 'phone' && (!phoneRegex.test(phone))) {//עובד נפלא
            setErrorForm(old => ({ ...old, [name]: 'המספר אינו תואם ווצאפ' }))
        }
        else {
            setErrorForm(0)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState(old => {
            const newData = { ...old, [name]: value }
            // localStorage.user = JSON.stringify({ ...newData, password: '' })
            checkInput(newData, [name])
            setFormState(newData)
            return newData
        })
    }
    const arr = [{ tab: "register", text: "הרשמה" }, { tab: "login", text: "התחברות" }]
    const tologin = () => {
        nav('/login')
    }
    return (
        <div className={styles.container}>
            <div className={styles.circle}></div>
            <div className={styles.allin}>
                {/* <div className={styles.tabSwitcher}>
                    <TabSwitcher rout={arr} />
                </div> */}
                <form className={styles.inputSpace} onSubmit={handleSubmit}>
                    <div className={styles.title}>אנגייג'ר</div>
                    <div className={styles.title2}>הרשמה</div>
                    <InputWrapper label={"שם"} setIsVisible={true} >
                        <InputText name={'name'} required={true} onChange={handleChange} value={formState.name} className={styles.input} />
                    </InputWrapper>

                    {/* <InputWrapper label={"טלפון"} setIsVisible={true} >
                        <InputText name={'phone'} required={true} onChange={handleChange} value={formState.phone} className={styles.input} />
                        {errorForm.phone &&
                            <div className={styles.error}>{errorForm.phone}</div>}
                    </InputWrapper> */}

                    <InputWrapper label={"אמייל"} setIsVisible={true} >
                        <InputText type={'email'} name={'email'} required={true} onChange={handleChange} value={formState.email} className={styles.input} />
                        {errorForm.email &&
                            <div className={styles.error}>{errorForm.email}</div>}
                    </InputWrapper>
{/* 
                    <InputWrapper label={"סיסמה"} setIsVisible={true} >
                        <InputText type={'password'} name={'password'} required={true} onChange={handleChange} value={formState.password} className={styles.input} />
                        {errorForm.password &&
                            <div className={styles.error}>{errorForm.password}</div>}
                    </InputWrapper>

                    <InputWrapper label={"אימות סיסמה"} setIsVisible={true} >
                        <InputText type={'password'} name={'passwordConfirm'} required={true} onChange={handleChange} value={formState.passwordConfirm} className={styles.input} />
                    </InputWrapper>
                    {errorForm.passwordConfirm &&
                        <div className={styles.error}>{errorForm.passwordConfirm}</div>}*/}
                    <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} /> 
                    {isChecked ?
                        <div>
                            <button className={styles.button} type='submit' >הרשמה</button>
                            <button className={styles.buttongoogle} type='submit' >
                                <img src="google.png" alt="" />
                                הרשמה באמצעות גוגל
                            </button>
                        </div>
                        :
                        <div>
                            <div className={styles.button1}>הרשמה</div>
                            <div className={styles.buttongoogle1}>
                                <img src="google.png" alt="" />
                                הרשמה באמצעות גוגל
                            </div>
                        </div>
                    }
                    <div className={styles.notlogin}>
                        <div className={styles.notlogin1}>כבר רשומים?</div>
                        <div onClick={tologin} className={styles.notlogin2}>התחברות זה ממש כאן</div>
                    </div>
                </form>
            </div>
        </div>
    )

}