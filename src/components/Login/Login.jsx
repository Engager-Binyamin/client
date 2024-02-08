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


// login page.
// <button /> gets props of content. needs to get ruot to DB to check that user fits password

export default function Login() {

    const [formState, setFormState] = useState({})
    const { user, setUser } = useContext(DataContext)
const nav =useNavigate()
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const { token, user } = await api.post("/login", formState);
            setUser(user)
            console.log(user)
            localStorage.token = token
            nav("/")
            // console.log("localStorage", localStorage)
        } catch (err) {
            console.log({ err })
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



    return (
        <form onSubmit={handleSubmit} className={styles.loginDiv}>

            <div >
                <InputWrapper label={"טלפון"} >
                    <div className={styles.inputSpace}>
                    <InputText name={'phone'} required={true} onChange={handleChange} value={formState.name} />
                    </div>
                </InputWrapper>
            </div>

            <div >
                <InputWrapper label={"סיסמה"}>
                    <InputText name={'password'} required={true} onChange={handleChange} value={formState.name} />
                </InputWrapper>
            </div>

            <div className={styles.button} >

                <Button type='submit' content={'התחבר'} />
            </div>

        </form>
    )
}
