import React, { useState } from 'react'
import styles from "./style.module.css"
import translet from '../../functions/translate';
import formatDate from '../../functions/DateFormat';
import formatDateTime from '../../functions/timeDateFormat';

// הפונקציה הזאת מקבלת מערך של אובייקטים של משתמשים וממציגה את הפרטים שלהם על פי מערך נוסף
// שצריך להעביר לה שצריך לכלול כותרת, סוג הסינון, וערכים אם מדובר בסינון על פי רשימה
// ראו דוגמה בערכי הברירת מחדל שהפונקציה מקבלת

export default function LeadsTable({
    filterdLeads = [
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
        }
    ], heads = [
        { title: 'name', input: 'text' },
        { title: 'email', input: 'text' },
        { title: 'phone', input: 'number' },
        { title: 'joinDate', input: 'date' },
        { title: 'campaign', input: 'select', inputValues: ["קורס תפירה", "חדר כושר", "בריכה עירונית"] },
        { title: 'isOnline', input: '' },
    ]
}) {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };

    const filteredData = filterdLeads.filter(lead => {
        for (let key in filters) {
            if (key === 'joinDate' && filters[key]) {
                const filterDate = new Date(filters[key]);
                const leadDate = new Date(lead[key]);
                if (!isNaN(filterDate.getTime()) && !isNaN(leadDate.getTime()) && filterDate.getTime() !== leadDate.getTime()) {
                    return false;
                }
            } else if (filters[key] && lead[key] && !lead[key].toString().toLowerCase().includes(filters[key].toLowerCase())) {
                return false;
            }
        }
        return true;
    });

    return (
        <table className={styles.leadsTable}>
            <thead>
                <tr id={styles.heads}>
                    {heads.map(h => <th key={h.title}>{translet(h.title)}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr id={styles.heads} className={styles.filters}>
                    {heads.map(h => (
                        <td key={h.title}>
                            {h.input === 'select' && (
                                <select
                                    value={filters[h.title] || ''}
                                    onChange={(e) => handleFilterChange(h.title, e.target.value)}
                                >
                                    <option value="">בחירה</option>
                                    {h.inputValues.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            )}
                            {h.input !== 'select' && h.input !== '' && (
                                <input
                                    type={h.input}
                                    value={filters[h.title] || ''}
                                    placeholder='סינון...'
                                    onChange={(e) => handleFilterChange(h.title, e.target.value)}
                                />
                            )}
                        </td>
                    ))}
                    {Object.keys(filters).length > 0 && (
                        <td><button onClick={() => setFilters({})}>X</button></td>
                    )}
                </tr>
                {filteredData.map(lead => (
                    <tr key={lead.email}>
                        {heads.map(h => (
                            h.title === 'isOnline' ? (
                                <td key={h.title} className={lead[h.title] ? styles.online : styles.offline}>
                                    {lead[h.title] ? "פעיל" : "לא פעיל"}
                                </td>
                            ) : h.title === 'joinDate' ? (
                                <td key={h.title}>{formatDateTime(lead[h.title])[0]}, {formatDateTime(lead[h.title])[1]}</td>
                            ) : (
                                <td key={h.title}>{lead[h.title]}</td>
                            )
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
