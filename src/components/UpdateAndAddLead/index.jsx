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
// import  from './LeadInfoPage'


export default function UpdateAndAddLead({ details, campaign, setCampaign }) {
    // להעביר כזה אובייקט.. בקשה...
    // details = {fullName:"aryeh", email:"aryeh@gmil.com",phone:"052776",notes:"", leadId: "dfyui"}
    const [editOrAdd, setEditOrAdd] = useState()
    const [errorState, setErrorState] = useState()
    const { setPopUp } = useContext(DataContext);
    const { user, setUser } = useContext(DataContext)
    const [newData, setNewData] = useState({
        fullName: '',
        phone: '',
        email: '',
        notes: ''
    });

    useEffect(() => {
        if (details) {
            setEditOrAdd('edit');
            setNewData({
                fullName: details.fullName || '',
                phone: details.phone || '',
                email: details.email || '',
                notes: details.notes || ''
            });
        } else {
            setEditOrAdd('add');
            setNewData({
                fullName: '',
                phone: '',
                email: '',
                notes: ''
            });
        }
    }, [details]);
    const handleChange = (e) => {
        let { name, value } = e.target
        setNewData(old => ({ ...old, [name]: value }))

    }


    function isValidIsraeliPhoneNumber(phoneNumber) {
        // Israeli phone number regex pattern
        const regexPattern = /^05\d([-]{0,1})\d{7}$/;
        // Check if the provided phone number matches the regex pattern
        return regexPattern.test(phoneNumber);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!isValidIsraeliPhoneNumber(newData.phone)) {
            setErrorState('מספר הטלפון לא תקין');
        } else {
            setErrorState(null);
            try {
                if (editOrAdd === 'add') {
                    await api.post(`lead/${campaign}/lead/`, { userId: user._id, data: { ...newData } });
                } else {
                    await api.put(`lead/${campaign}/lead/${details.leadId}`, { ...newData });
                }
                toast.success("נשלח בהצלחה!");
                fetchCampaign();
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.msg || "שגיאה - משהו השתבש");
            }
        }
    }



    const fetchCampaign = async () => {
        try {
            await api.get(`/campaign/${campaign}/`)
            .then(setCampaign)
        } catch (error) {
            console.error('Error fetching campaign data:', error);
        }
    };


    return <div className={styles.contanier} >
        <form onSubmit={(e) => handleOnSubmit(e)} >
            <h1>{newData.fullName}</h1>
            <InputWrapper label={'שם מלא'} children={<InputText name='fullName' value={newData.fullName} required={true} onChange={(e) => handleChange(e)} />} />
            <InputWrapper label={'טלפון'} children={<InputText name='phone' value={newData.phone} required={true} onChange={(e) => handleChange(e)} />} />
            {(errorState)
                ?
                <div className={styles.error}>{errorState}</div>
                :
                null}
            <InputWrapper label={'אמייל'} children={<InputText name='email' value={newData.email} onChange={(e) => handleChange(e)} type={"email"} />} />
            <InputWrapper label={'הערות'} children={<InputTextArea name='notes' style={{ width: "100%" }} value={newData.notes} onChange={(e) => handleChange(e)} />} />
            <div className={styles.buttons}>
                <Button type='submit' content='שמירה' onClick={() => setPopUp(false)} />
                {/* <Button type='submit' content='שמירה'  /> */}
                <Button content='ביטול' className='cancel' onClick={() => setPopUp(false)} />
                {/* <Button content='ביטול' className='cancel' onClick={() => { (editOrAdd == "edit") ? setIsEdite(false) : setPopUp(false) }} /> */}

            </div>
        </form>

    </div>
}
