import React from 'react'
import CampaignItem from '../CampaignItem'
import styles from './style.module.css'

export default function CampaignList({ campaignList, searchTerm }) {
    return (
        <div className={styles.campaignList}>
                {campaignList
                    .filter(c =>
                        c.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(c => <CampaignItem key={c.id} id={c._id} title={c.title} />)}
            </div>
    )
}
