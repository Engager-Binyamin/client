import React, { useContext } from 'react'
import styles from './style.module.css'
import InputText from '../../components/InputText/InputText'
import Button from '../../components/Button'
import InputWrapper from '../../components/InputWrapper'
import { useState } from 'react'
import axios from 'axios'
import api from '../../functions/api'
import DataContext from '../../context/DataContext'
import { useNavigate, useParams } from 'react-router'
import getGoogleOAuthURL from '../../functions/loginWithGoogle'
import Select from 'react-select';
import { toast } from 'react-toastify'


export default function CompleteDetails() {
    const [formState, setFormState] = useState({
        fullName: '', 
        phone: '',   
        occupation: '',
        amountOfEmployees: null, 
    });

    const [selectedOption, setSelectedOption] = useState(null);
    const [errorForm, setErrorForm] = useState({})
    const [render, setRender] = useState(false)
    // const { user, setUser } = useContext(DataContext)
    const nav = useNavigate()
    const { email } = useParams();

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

    const timeoutAndNavigate = () => {
        setTimeout(() => {
            nav('/login')

        }, 5000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.put(`/user/update/${email}`, formState);
            if (res) {
                setRender(true);
                // timeoutAndNavigate()
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
            } else {
                toast.error("An error occurred while processing your request.");
            }
        }
    }
    
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
        checkInput({ ...formState, [name]: value }, name)
    };

    const handleChangeOption = (selectedOption) => {
        setSelectedOption(selectedOption);
        setFormState(prevState => ({
            ...prevState,
            amountOfEmployees: selectedOption ? selectedOption.value : null
        }));
    };


    const options = [
        { value: '1', label: '1' },
        { value: '2-7', label: '2-7' },
        { value: '8-20', label: '8-20' },
        { value: '20-100', label: '20-100' }
    ];


    const toregister = () => {
        nav('/register')
    }

    return (
        <div className={styles.container}>
            <div className={styles.circle}></div>
            <div className={styles.allin}>
                <div>
                    {render ? (
                        <>
                            <h1> ההרשמה נקלטה בהצלחה, כבר תקבל הודעה להפעלת המשתמש שלך</h1>

                            <button className={styles.button}>לא קיבלת את ההודעה? לחץ כאן</button>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className={styles.inputSpace}>
                                <div className={styles.title}>אנגייג'ר</div>
                                <div className={styles.title2}>השלמת פרטים קטנה וסיימנו..</div>
                                <div>
                                    <InputWrapper label={"שם מלא"} >
                                        <InputText name={'fullName'} type='text' required={true} onChange={handleChange} value={formState.name} className={styles.input} />
                                    </InputWrapper>
                                </div>
                                <div>
                                    <InputWrapper label={"טלפון"} >
                                        <InputText name={'phone'} type='phone' required={true} onChange={handleChange} value={formState.phone} className={styles.input} />
                                        {errorForm.phone &&
                                            <div className={styles.error}>{errorForm.phone}</div>}
                                    </InputWrapper>
                                </div>
                                <div>
                                    <InputWrapper label={"תחום עיסוק"} >
                                        <InputText name={'occupation'} type='text' required={true} onChange={handleChange} value={formState.occupation} className={styles.input} />
                                    </InputWrapper>
                                </div>
                                <div>
                                    <InputWrapper label={"מספר עובדים בעסק"}>
                                        <Select
                                            name={'amountOfEmployees'}
                                            value={selectedOption}
                                            onChange={handleChangeOption}
                                            options={options}
                                            className={styles.select}
                                        />
                                    </InputWrapper>
                                </div>
                                <button className={styles.button} type='submit'>שליחה</button>
                            </form>

                            <div className={styles.notlogin}>
                                <div className={styles.notlogin1}>עדיין לא רשומים?</div>
                                <div onClick={toregister} className={styles.notlogin2}>הרשמה זה ממש כאן</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
