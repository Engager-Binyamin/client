import styles from "./style.module.css"
import Icon from '../Icon';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";





function CustomInput({ value, onClick }) {
  return (
    <button type='button' onClick={onClick} className={styles.timePicker}>
      {value || "בחירת שעה"}
      <Icon nameIcon={'clock'} />
    </button>
  );
}


export default function TimePicker({ handleTimeChange, selectedTime, selectedDate }) {
  const [minTime, setMinTime] = useState(new Date())
  useEffect(() => {
    if (selectedDate) {
      const today = new Date()
      const isToday = selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
      if (isToday) {
        setMinTime(new Date())
      } else {
        setMinTime(new Date().setHours(0, 0, 0, 0))
      }
    }


  }, [selectedDate])





  return (
    <div className={styles.timePickerWrapper}>
      <ReactDatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption='Time'
        dateFormat="HH:mm"
        minTime={minTime}
        maxTime={new Date().setHours(23, 59, 0, 0)}
        customInput={<CustomInput />}

      />

    </div>

  );
}

