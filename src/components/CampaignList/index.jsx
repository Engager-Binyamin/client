import React from 'react'
import CampaignItem from '../CampaignItem'
import styles from './style.module.css'

export default function CampaignList({ campaignList, searchTerm }) {
    return (
        <div className={styles.campaignList}>
                {campaignList
                    .filter(c =>
                        c.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(camp => <CampaignItem key={camp._id} id={camp._id} title={camp.title} />)}
            </div>
    )
}
