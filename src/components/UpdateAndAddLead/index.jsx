import React, { useEffect, useState } from 'react'
import InputWrapper from '../InputWrapper'
import InputText from '../InputText/InputText'
import styles from './style.module.css'
import InputTextArea from '../InputTextArea'
import Button from '../Button'
import axios from 'axios'
import api from '../../functions/api'

export default function UpdateAndAddLead({ details, campaign }) {

// להעביר כזה אובייקט.. בקשה...
    // details = {name:"aryeh", email:"aryeh@gmil.com",phone:"052776",notes:"", leadId: "dfyui"}



    const [workOrFinally, setWorkOrFinally] = useState('work')
    const [editOrAdd, setEditOrAdd] = useState()
    const [erorrState, setErorrState] = useState()
    const [newData, setNewData] = useState({
        name: details ? details.name : '',
        phone: details ? details.phone : '',
        email: details ? details.email : '',
        notes: details ? details.notes : ''
    })

    useEffect(() => {
        setWorkOrFinally('work')
        if (details) {
            setEditOrAdd('edit')
        } else { setEditOrAdd('add') }
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target
        setNewData(old => ({ ...old, [name]: value }))

    }

    function handleCancel() {
        // setשהגיע בפרופס 
    }

    function isValidIsraeliPhoneNumber(phoneNumber) {
        // Israeli phone number regex pattern
        const regexPattern = /^(0(5[^67]|[23489]))([\d]{7})$/;
        // Check if the provided phone number matches the regex pattern
        return regexPattern.test(phoneNumber);
    }

 const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (!isValidIsraeliPhoneNumber(newData.phone)) {
            setErorrState('מספר הטלפון לא תקין ')
        } else {
            setErorrState()
            if (editOrAdd == 'add') {
                // axios.post('http://localhost:2500/lead/', { data: { ...newData, campaign: campaign } })
                api.post('/lead/', { data: { ...newData, campaign: campaign } })
                    .then(setWorkOrFinally('finally'))
            } else {
                if (Object.keys(newData).includes('phone')) {
                    if (newData.phone == details.phone) {
                        let result = newData
                        delete result.phone
                        setNewData(result)
                        console.log('😓😓😓😓');
                    }
                }
                // axios.put(`http://localhost:2500/lead/${details.leadId}`, newData)
                api.put('/lead/' + details.leadId, newData)
                    .then(res => {
                        console.log('🧸' + res.data)
                        setWorkOrFinally('finally')
                    })
                    .catch(e => {
                        console.log("🚛luliau", e.response.data);
                        if (e.response.data == "phoneExist") {
                            setErorrState('מספר הטלפון כבר קיים במערכת')
                        }
                    })
            }
        }
    }



    return <div className={styles.contanier} >
        {(workOrFinally == 'work')
            ?
            <form onSubmit={(e) => handleOnSubmit(e)} >
                <InputWrapper label={'שם מלא'} children={<InputText name='name' value={newData.name} required={true} onChange={(e) => handleChange(e)} />} />
                <InputWrapper label={'טלפון'} children={<InputText name='phone' value={newData.phone} required={true} onChange={(e) => handleChange(e)} />} />
                {(erorrState)
                    ?
                    <div className={styles.error}>{erorrState}</div>
                    :
                    null}
                <InputWrapper label={'אמייל'} children={<InputText name='email' value={newData.email} onChange={(e) => handleChange(e)} type={"email"} />} />
                <InputWrapper label={'הערות'} children={<InputTextArea name='notes' style={{ width: "100%" }} value={newData.notes} onChange={(e) => handleChange(e)} />} />
                <div className={styles.buttons}>
                    <Button content='שמירה' />
                    <Button content='ביטול' className='cancel' onClick={()=>{setIsEdite(false)}} />

                </div>
            </form>
            :
            <div>המשתמש נשמר בהצלחה</div>
        }

    </div>
}
