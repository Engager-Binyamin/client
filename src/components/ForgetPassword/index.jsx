import React, { useState } from 'react'
import InputWrapper from '../InputWrapper'
import InputText from '../InputText/InputText'
import styles from './style.module.css'


export default function index() {
    const fromtemplet = { phone: '' }
    const [formState, setFormState] = useState(fromtemplet)
    const [errorForm, setErrorForm] = useState(fromtemplet)
    async function handleSubmit(e) {
        e.preventDefault();
        const data = formState
        api.post("/user", data).
            catch((res) => console.log("יצירת משתמש נכשלה:", res.data))
console.log("submit");
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
    const checkInput = (newData = '', name) => {
        const phone = newData.phone
        const phoneRegex = /^(?:0[5][2-9]\d(?:-?\d){6})$/;

        if ([name] == 'phone' && (!phoneRegex.test(phone))) {//עובד נפלא
            setErrorForm(old => ({ ...old, [name]: 'המספר אינו תואם ווצאפ' }))
        }
        else {
            setErrorForm(0)
        }
    }
    return (
        <div className={styles.container}>
             <div className={styles.allin}>
             <form className={styles.inputSpace} onSubmit={handleSubmit}>
            <div className={styles.inputSpace}>
            <div className={styles.title}>אנגייג'ר</div>
                <InputWrapper label={"טלפון"} setIsVisible={true} >
                    <InputText type={'phone'} name={'phone'} required={true} onChange={handleChange}
                     value={formState.phone} className={styles.input} />
                    {errorForm.phone &&
                        <div className={styles.error}>{errorForm.phone}</div>}
                </InputWrapper>
                <button className={styles.button} type='submit' >שלחו לי קישור לשינוי סיסמא</button>
            </div>

            </form>
            </div>
        </div>
    )
}
