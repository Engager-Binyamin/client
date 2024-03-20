import styles from "./style.module.css"
import Icon from '../Icon';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function CustomInput({ value, onClick }) {
  return (
    <button type='button' onClick={onClick} className={styles.datePicker}>
      {value || "בחירת תאריך"}
      <Icon nameIcon={'Calendar'} />
    </button>
  );
}


export default function DatePicker({ handleDateChange, selectedDate }) {




  const today = new Date()
  return (
    <div>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput />}
        minDate={today}
      />

    </div>

  );
}


