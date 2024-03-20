import React, { useEffect, useState } from 'react'
import InputWrapper from '../InputWrapper'
import DatePicker from '../DatePicker'
import TimePicker from '../TimePicker'
import styles from './style.module.css'
import Button from '../Button'
export default function ScheduleInput({ setDate, PopUp }) {
    const [selectedDateTime, setSelectedDateTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)

    useEffect(() => {
        setDate(selectedDateTime)


    }, [selectedDateTime])


    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (selectedDateTime) {
            const updatedDateTime = new Date(date)
            updatedDateTime.setHours(selectedDateTime.getHours(), selectedDateTime.getMinutes())
            setSelectedDateTime(updatedDateTime)
            // console.log(updatedDateTime);
        } else {
            setSelectedDateTime(date);
            console.log(date);
        }
    }

    const handleTimeChange = (time) => {
        // if (!selectedDate) {
        //     console.log("please select a date first?");
        //     return
        // }
        // console.log(time);
        const updatedDateTime = new Date(time)
        // console.log(updatedDateTime);
        // updatedDateTime.setHours(time.getHours(), time.getMinutes())
        setSelectedDateTime(updatedDateTime)
        // console.log(updatedDateTime);
        // console.log(selectedDateTime);
        // console.log(selectedDateTime);
        // console.log(updatedDateTime);
    }
    return (
        <div className={styles.pickers}>
            <DatePicker handleDateChange={handleDateChange} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
            <TimePicker handleTimeChange={handleTimeChange} selectedDate={selectedDate} selectedTime={selectedDateTime} />

        </div>
    )
}
