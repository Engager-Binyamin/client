import React, { useState } from 'react'
import HeadLine from '../HeadLine'
import styles from './style.module.css'
import Accordion from '../Accordion'
import { useCampaign } from '../../pages/CampaignPage';
import { useParams } from 'react-router';
import formatDate from '../../functions/DateFormat';

export default function MessagePage() {

    const { messageId } = useParams();
    const campaign = useCampaign();
    const msgs = campaign.msg;
    const message = msgs.find(msg => msg._id == messageId);

    const { creationDate, subject, content } = message;

    return (
        <div className={styles.MessagePage}>
            <HeadLine dateCreate={formatDate(creationDate)} title={subject} icon={""} />
            <div className={styles.message}>
                <div className={styles.messageitem}>
                    {content}
                </div>
                <div className={styles.messageDate}>
                    ישלח ב {"dateSend"} | {"timeSend"}
                </div>
            </div>
            <Accordion title={'הודעה חדשה'}>
                {['hello', 'i', 'am', 'shaked', 'ben', 'hamo', 'guikh', 'gyhjbvh']}
            </Accordion>
        </div>
    )
}