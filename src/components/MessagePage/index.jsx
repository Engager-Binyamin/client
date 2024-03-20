import React, { useContext, useState } from 'react'
import HeadLine from '../HeadLine'
import styles from './style.module.css'
import Accordion from '../Accordion'
import { useCampaign } from '../../pages/CampaignPage';
import { useParams } from 'react-router';
import formatDate from '../../functions/DateFormat';
import campaignHelper from '../../functions/campaignHelper'
import DataContext from '../../context/DataContext';
import MessageEdit from '../MessageEdit';
import Button from '../Button';
import axios from 'axios';
import api from '../../functions/api';
import PopUp from '../PopUp';
import ScheduleInput from '../ScheduleInput';
import InputWrapper from '../InputWrapper';
export default function MessagePage() {

    // TODO: לחבר את שליחת ההודעה לווטסאפ
    // TODO: "להסיר את כפתור השלח במידה ואין אנשים שלא קיבלו את ההודעה או להפוך אותו ל"שלח מחדש

    const { PopUp, setPopUp, user } = useContext(DataContext)



    const [date, setDate] = useState(null)

    const formatDateSchedule = (date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const formatTimeSchedule = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const { messageId } = useParams();
    const { campaign } = useCampaign() || {};
    const message = campaign?.msg?.find(msg => msg._id == messageId) || {};

    const { creationDate, subject, content } = message;
    let msgSent = campaignHelper.msgSentDetails(campaign, message._id);

    let dateSend = formatDateSchedule(date || new Date())
    let timeSend = formatTimeSchedule(date || new Date())


    const schedulingButton = async (date, userId) => {
        try {
            const miliSecondsDate = new Date(date).getTime()
            console.log(miliSecondsDate);
            setPopUp(false)
            const response = await api.put(`campaign/${campaign._id}/msg/${messageId}/update-queue`, miliSecondsDate)
            if (response.success === true) {
                const res = await axios.post(`http://localhost:3000/whatsupserver/update/jobs`, { userId })
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.MessagePage}>
            <HeadLine
                title={subject}
                subtitle={`נוצר ב - ${formatDate(creationDate)}`}
                iconName={'writing'}
                iconOnClick={() => setPopUp({
                    title: "עריכת הודעה",
                    component: <MessageEdit isOpen={isOpen} setPopUp={setPopUp} />
                }

                )}
            />
            <div className={styles.message}>
                <div className={styles.messageitem}>
                    {content}
                </div>
                {dateSend && timeSend ?
                    <div className={styles.messageDate}>
                        יישלח ב- {dateSend} | {timeSend}
                    </div> :
                    //ToDo: רינדור מותנה לתזמן הודעה, צריך לחבר לאון קליק את הפןנקציה של תזמון הודעה
                    <div className={styles.messageitem}><button onClick={() => alert('תזמן')}>תזמן הודעה</button></div>
                }
            </div>
            <div className={styles.send}>
                <Button
                    content='שלח'
                    onClick={async () => {
                        try {
                            const res = await api.get(`/campaign/whatsapp/camp/${campaign._id}/msg/${messageId}/leads`)
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    }}
                />


                <Button
                    content='תזמן הודעה'
                    onClick={() => setPopUp({
                        title: "תזמון הודעה", component:

                            <form className={styles.schedulePopUp} onSubmit={(e) => e.preventDefault()}><ScheduleInput setDate={setDate} />
                                <Button
                                    content='בחר זמן'
                                    onClick={() => schedulingButton(date, user._id)}
                                />
                            </form>

                    })} />


            </div>

            <Accordion
                title={`נשלח ל-${msgSent.sent?.length || 0} אנשים`}
                campaignId={campaign._id}
                leadList={msgSent.sent} />
            <Accordion
                title={`לא נשלח ל-${msgSent.notSent?.length || 0} אנשים`}
                campaignId={campaign._id}
                leadList={msgSent.notSent} />
        </div>
    )
}