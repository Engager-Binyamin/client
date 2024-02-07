import React, { useState } from 'react'
import InputText from '../InputText/InputText'
import styles from './style.module.css'
import Button from '../Button'
import InputWrapper from '../InputWrapper'
import axios from 'axios'
import api from '../../functions/api'

// קומפוננטת הרשמת משתמש חדש לא ליד!! 


export default function Register() {
    const fromtemplet={name:'',phone:'',email:'',password:'',passwordConfirm:''}
    const [formState, setFormState] = useState(fromtemplet)
    const [errorForm, setErrorForm] = useState(fromtemplet)

    async function handleSubmit(e) {
        e.preventDefault();
        const data =formState
        api.post("/user", data).
            catch((res) => console.log("יצירת משתמש נכשלה:", res.data))

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
            localStorage.user = JSON.stringify({ ...newData, password: '' })
            checkInput(newData, [name])
            setFormState(newData)
            return newData
        })
    }


    return (
        <div className={styles.centerDiv}>
            <form className={styles.register} onSubmit={handleSubmit}>

                <div className={styles.inputSpace}>
                    <InputWrapper label={"שם"} setIsVisible={true} >
                        <InputText name={'name'} required={true} onChange={handleChange} value={formState.name} />
                    </InputWrapper>
                </div>

                <div className={styles.inputSpace}>
                    <InputWrapper label={"טלפון"} setIsVisible={true} >
                        <InputText name={'phone'} required={true} onChange={handleChange} value={formState.phone} />
                        {errorForm.phone &&
                            <div className={styles.error}>{errorForm.phone}</div>}
                    </InputWrapper>
                </div>

                <div className={styles.inputSpace}>
                    <InputWrapper label={"אמייל"} setIsVisible={true} >
                        <InputText type={'email'} name={'email'} required={true} onChange={handleChange} value={formState.email} />
                        {errorForm.email &&
                            <div className={styles.error}>{errorForm.email}</div>}
                    </InputWrapper>
                </div>

                <div className={styles.inputSpace}>
                    <InputWrapper label={"סיסמה"} setIsVisible={true} >
                        <InputText type={'password'} name={'password'} required={true} onChange={handleChange} value={formState.password} />
                        {errorForm.password &&
                            <div className={styles.error}>{errorForm.password}</div>}
                    </InputWrapper>
                </div>

                <div className={styles.inputSpace}>
                    <InputWrapper label={"אימות סיסמה"} setIsVisible={true} >
                        <InputText type={'password'} name={'passwordConfirm'} required={true} onChange={handleChange} value={formState.passwordConfirm} />
                    </InputWrapper>
                    {errorForm.passwordConfirm &&
                        <div className={styles.error}>{errorForm.passwordConfirm}</div>}
                </div>

                <div className={styles.button} >
                    <Button type='submit' content={'הרשם'} />
                    {/* <Button type='submit' content={'ביטול'} className={"cancel"} /> */}
                </div>
            </form>
        </div>
    )
}
