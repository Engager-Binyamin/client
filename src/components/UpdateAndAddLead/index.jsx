import React, { useEffect, useState, useContext } from 'react'
import InputWrapper from '../InputWrapper'
import InputText from '../InputText/InputText'
import styles from './style.module.css'
import InputTextArea from '../InputTextArea'
import Button from '../Button'
import axios from 'axios'
import api from '../../functions/api'
import LeadInfoPage from '../../pages/LeadInfoPage/index'
import DataContext from '../../context/DataContext'
import { toast } from 'react-toastify';
import { useCampaign } from '../../pages/CampaignPage'
// import  from './LeadInfoPage'


export default function UpdateAndAddLead({ details = {}, campaign, getCamp, isEdit }) {
    const [errorState, setErrorState] = useState()
    const { setPopUp } = useContext(DataContext);

    const [newData, setNewData] = useState({ ...details })
    //     fullName: details ? details.fullName : '',
    //     phone: details ? details.phone : '',
    //     email: details ? details.email : '',
    //     notes: details ? details.notes : ''
    // })

    console.log(newData.extra);
    const handleChange = (e, isPhone, extraKey) => {
        let { name, value } = e.target
        if (isPhone && value === details.phone) return;
        if (extraKey) {
            setNewData(prevData => ({
                ...prevData,
                extra: {
                    ...prevData.extra,
                    [extraKey]: { ...prevData.extra[extraKey], value }
                }
            }));
        } else {
            setNewData(prevData => ({ ...prevData, [name]: value }));
        }
    }


    function isValidIsraeliPhoneNumber(phoneNumber) {
        // Israeli phone number regex pattern
        const regexPattern = /^05\d([-]{0,1})\d{7}$/;
        // Check if the provided phone number matches the regex pattern
        return regexPattern.test(phoneNumber);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log({newData});
        if (!isValidIsraeliPhoneNumber(newData.phone)) {
            setErrorState('מספר הטלפון לא תקין ')
        } else {
            setErrorState()
            const thenF = _ => { toast.success("בוצע בהצלחה!"); getCamp() }
            const catchF = error => toast.error(error || "somthing want worng")
            if (!isEdit) {
                api.post(`/campaign/${campaign._id}/lead/`, { data: { ...newData } })
                    .then(thenF).catch(catchF)
            }
            else {
                api.put(`/campaign/${campaign._id}/lead/${details.leadId}`, newData)
                    .then(thenF).catch(catchF)
            }
            setPopUp(false)
        }
    }

    return <div className={styles.contanier} >
        <h1>{newData.fullName}</h1>
        <form onSubmit={handleOnSubmit} className={styles.form} >
            <div className={styles.formContent}>
                <InputWrapper label={'שם מלא'} children={<InputText name='fullName' value={newData.fullName} required={true} onChange={handleChange} />} />
                <InputWrapper label={'טלפון'} children={<InputText name='phone' value={newData.phone} required={true} onChange={(e) => handleChange(e, true)} />} />
                {errorState && <div className={styles.error}>{errorState}</div>}
                <InputWrapper label={'אמייל'} children={<InputText name='email' value={newData.email} onChange={handleChange} type={"email"} />} />
                {details?.extra &&
                    Object.entries(newData.extra).map((ex, i) =>
                        <InputWrapper
                            key={i}
                            label={ex[1].he}
                            children={<InputText
                                name={ex[0]}
                                value={newData.extra[ex[0]].value}
                                onChange={(e) => handleChange(e, false, ex[0])}
                                type={"text"}
                            />}
                        />
                    )
                }
                <InputWrapper label={'הערות'} children={<InputTextArea name='notes' style={{ width: "100%" }} value={newData.notes} onChange={handleChange} />} />

            </div>
            <div className={styles.buttons}>
                <Button type='submit' content='שמירה' />
                <Button content='ביטול' className='cancel' onClick={() => { setPopUp(false) }} />
            </div>
        </form>
    </div>
}
