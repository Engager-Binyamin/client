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

export default function MessagePage() {
    const { isOpen, setIsOpen } = useContext(DataContext)

    const { messageId } = useParams();
    const { campaign } =useCampaign() || {};
    const msgs = campaign.msg || [];
    const message = msgs.find(msg => msg._id == messageId) || {}

    const { creationDate, subject, content } = message;

    let msgSent = campaignHelper.msgSentDetails(campaign, message._id)
    console.log(msgSent);
    
    let dateSend = '04/05/2025'
    let timeSend = '12:24'
    
    return (
        <div className={styles.MessagePage}>
            <HeadLine
                title={subject}
                subtitle={`נוצר ב - ${formatDate(creationDate)}`}
                iconName={'writing'}
                iconOnClick={() => setIsOpen(<MessageEdit isOpen={isOpen} setIsOpen={setIsOpen} />)}
            />
            <div className={styles.message}>
                <div className={styles.messageitem}>
                    {content}
                </div>
                    {dateSend && timeSend ?
                <div className={styles.messageDate}>
                    יישלח ב- {dateSend} | {timeSend}
                </div>: 
                //ToDo: רינדור מותנה לתזמן הודעה, צריך לחבר לאון קליק את הפןנקציה של תזמון הודעה
                <div className={styles.messageitem}><button onClick={()=>alert('תזמן')}>תזמן הודעה</button></div>
                }
            </div>
            <div className={styles.send}>
                <Button
                    content='שלח'
                    onClick={async () => {
                        try {
                            const res = await api.get(`/campaign/whatsapp/camp/${campaign._id}/msg/${messageId}/leads`)
                            console.log(res, 'accepted');

                        } catch (error) {
                            console.error("Error:", error);
                        }
                    }}
                />

            </div>

            <Accordion
                title={`נשלח ל-${msgSent.sent?.length} אנשים`}
                campaignId={campaign._id}
                leadList = {msgSent.sent}/>
            <Accordion
                title={`לא נשלח ל-${campaign.leads?.length - msgSent.sent?.length} אנשים`}
                campaignId={campaign._id}
                leadList = {msgSent.notSent} />
        </div>
    )
}