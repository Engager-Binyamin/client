import React, { useEffect } from 'react'
import TabSwitcher from '../TabSwitcher'
import { Outlet, useNavigate } from 'react-router-dom'
import DataContext from '../../context/DataContext';
import styles from "./style.module.css"


export default function MyLeads({ leads = 0, activeLeads = 0 }) {

    const nav = useNavigate();

    useEffect(() => {
        nav('/myLeads/all')
    }, [])

    const users = [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            notes: "This is a note about John Doe",
            msgs: [
                {
                    msg: "5fecb27803f455001f95391a",
                    creationDate: "2024-02-01T12:00:00Z"
                }
            ]
        },
        {
            name: "Alice Smith",
            email: "alice.smith@example.com",
            phone: "987-654-3210",
            notes: "A note about Alice Smith",
            msgs: [
                {
                    msg: "5fecb27803f455001f95391b",
                    creationDate: "2024-02-01T13:30:00Z"
                }
            ]
        },
        {
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            phone: "555-123-4567",
            notes: "Bob's note",
            msgs: [
                {
                    msg: "5fecb27803f455001f95391c",
                    creationDate: "2024-02-01T14:45:00Z"
                }
            ]
        },
        {
            name: "Eva Miller",
            email: "eva.miller@example.com",
            phone: "777-888-9999",
            notes: "Eva's note",
            msgs: [
                {
                    msg: "5fecb27803f455001f95391d",
                    creationDate: "2024-02-01T16:15:00Z"
                }
            ]
        },
        {
            name: "Sam Brown",
            email: "sam.brown@example.com",
            phone: "444-555-6666",
            notes: "Sam's note",
            msgs: [
                {
                    msg: "5fecb27803f455001f95391e",
                    creationDate: "2024-02-01T17:45:00Z"
                }
            ]
        },
        {
            name: "New Lead 1",
            email: "new1@example.com",
            phone: "111-222-3333",
            notes: "A note about New Lead 1",
            msgs: [
                {
                    msg: "5fecb27803f455001f95391f",
                    creationDate: "2024-02-03T09:30:00Z"
                }
            ]
        },
        {
            name: "New Lead 2",
            email: "new2@example.com",
            phone: "222-333-4444",
            notes: "A note about New Lead 2",
            msgs: [
                {
                    msg: "5fecb27803f455001f953920",
                    creationDate: "2024-02-04T10:45:00Z"
                }
            ]
        },
        {
            name: "New Lead 3",
            email: "new10@example.com",
            phone: "999-888-7777",
            notes: "A note about New Lead 3",
            msgs: [
                {
                    msg: "5fecb27803f455001f953929",
                    creationDate: "2024-02-05T18:00:00Z"
                }
            ]
        }
    ]
    const formatedUsers = users.map((user) => ({
        name: user.name,
        email: user.email,
        phone: user.phone,
        joinDate: "2024-01-27T00:00:00.000Z",
        campaign: "קורס תפירה",
        isOnline: true
    }))

    const heads = [
        { title: 'name', input: 'text' },
        { title: 'email', input: 'text' },
        { title: 'phone', input: 'text' },
        { title: 'joinDate', input: 'date' },
        { title: 'campaign', input: 'select', inputValues: ["קורס תפירה", "חדר כושר", "בריכה עירונית"] },
        { title: 'isOnline', input: '' },
    ]

    return (
        <DataContext.Provider value={{ formatedUsers, heads }}>
            <div className={styles.myLeads}>
                <h2 className={styles.title}>הלידים שלי</h2>
                <p className={styles.info}>{leads} לידים, {activeLeads} פעילים</p>
                <div className={styles.tabSwitcher}>
                    <TabSwitcher rout={[
                        { tab: `myLeads/active`, text: `פעילים` },
                        { tab: `myLeads/inactive`, text: "לא פעילים" },
                        { tab: `myLeads/all`, text: "כל הלידים" }
                    ]} />
                </div>
                <Outlet />
            </div>
        </DataContext.Provider>
    )
}
