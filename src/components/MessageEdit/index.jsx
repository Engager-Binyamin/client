import styles from './style.module.css'
// import axios, { Axios } from 'axios';
import InputWrapper from '../InputWrapper';
import Button from '../Button';
import InputTextArea from '../InputTextArea/index';
import { useState } from 'react';

export default function MessageEdit({ isOpen, setIsOpen }) {
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // const submmit = { subject, content };

        // try {
        //     const response = await axios.post('http://localhost:2500/campaign/65c0939a5aa397278552a5b5/msg', submmit, {
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     });
        //     console.log(response.data);
        //     console.log(subject, content);
        // } catch (error) {
        //     console.error("Error:", error);
        // }
        // console.log(subject, content);
    };

    //עדכון הממשק?

    return (
        <div className={styles.InputWrapper}  >
            <hr />
            <form onSubmit={handleSubmit} >
                <main className={styles.main}>
                    <InputWrapper
                        label="עריכת הודעה"
                        to={"msgContent"}
                        children={<InputTextArea name={"msgContent"} onChange={(e) => setContent(e.target.value)} />}
                        type="text" />
                </main>
                <div className={styles.actions}  >
                    <Button className={"cancel"} content={"ביטול"} onClick={() => setIsOpen(false)} />
                    <Button className={"save"} content={"שמירה"} />
                </div>
            </form>
        </div>
    )

}