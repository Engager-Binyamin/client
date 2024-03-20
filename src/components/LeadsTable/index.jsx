import React, { useState } from 'react'
import styles from "./style.module.css"
import translet from '../../functions/translate';
import formatDate from '../../functions/DateFormat';
import formatDateTime from '../../functions/timeDateFormat';
import Icon from '../Icon';
import Select from 'react-select';


// הפונקציה הזאת מקבלת מערך של אובייקטים של משתמשים וממציגה את הפרטים שלהם על פי מערך נוסף
// שצריך להעביר לה שצריך לכלול כותרת, סוג הסינון, וערכים אם מדובר בסינון על פי רשימה
// ראו דוגמה בערכי הברירת מחדל שהפונקציה מקבלת

export default function LeadsTable({ filterdLeads = [], heads = []
    // filterdLeads = [
    //     {
    //         name: "John Doe",
    //         email: "john.doe@example.com",
    //         phone: "123-456-7890",
    //         notes: "This is a note about John Doe",
    //         msgs: [
    //             {
    //                 msg: "5fecb27803f455001f95391a",
    //                 creationDate: "2024-02-01T12:00:00Z"
    //             }
    //         ]
    //     },
    //     {
    //         name: "Alice Smith",
    //         email: "alice.smith@example.com",
    //         phone: "987-654-3210",
    //         notes: "A note about Alice Smith",
    //         msgs: [
    //             {
    //                 msg: "5fecb27803f455001f95391b",
    //                 creationDate: "2024-02-01T13:30:00Z"
    //             }
    //         ]
    //     }
    // ], 
    // heads = [
    //     { title: 'name', input: 'text' },
    //     { title: 'email', input: 'text' },
    //     { title: 'phone', input: 'number' },
    //     { title: 'joinDate', input: 'date' },
    //     { title: 'campaign', input: 'select', inputValues: ["קורס תפירה", "חדר כושר", "בריכה עירונית"] },
    //     { title: 'isOnline', input: '' },
    // ]
}) {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };

        if (value === '') {
            delete newFilters[key];
        }

        setFilters(newFilters);
    };

    // פונקציית הסינון
    const filteredData = filterdLeads.filter(lead => {
        for (let key in filters) {
            if (key === 'joinDate' && filters[key]) {
                const filterDate = new Date(filters[key]);
                const leadDate = new Date(lead[key]);
                if (!isNaN(filterDate.getTime()) && !isNaN(leadDate.getTime()) && filterDate.getTime() !== leadDate.getTime()) {
                    return false;
                }
            } else if (filters[key] && lead[key] && !lead[key]?.toString().toLowerCase().includes(filters[key]?.toLowerCase())) {
                return false;
            }
        }
        return true;
    });

    // עיצוב הרשימה
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: 200, // Set a fixed width for the Select component
            borderColor: state.isFocused ? '#0E9D85' : 'rgba(222, 226, 233, 1)',
            boxShadow: state.isFocused ? '0 0 0 0.2rem #0e9d8546' : provided.boxShadow,
            '&:hover': {
                borderColor: state.isFocused ? '#0E9D85' : provided.borderColor
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#0e9d8565' : 'white',
            '&:hover': {
                backgroundColor: '#0e9d8546',
            },
        }),
        menu: (provided) => ({
            ...provided,
            width: 200,
        }),
    };

    return (
        <table className={styles.leadsTable}>
            <thead>
                <tr id={styles.heads}>
                    {heads.map(h => <th key={h.title}>{translet(h.title)}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr id={styles.filters}>
                    {heads.map(h => (
                        <td key={h.title} className={h.input === 'select' ? styles.selectInput : ''}>
                            {h.input === 'select' && (
                                <Select
                                    options={h.inputValues.map((option, index) => ({ value: option, label: option }))}
                                    value={filters[h.title] ? { value: filters[h.title], label: filters[h.title] } : ''}
                                    onChange={(selectedOption) => handleFilterChange(h.title, selectedOption ? selectedOption.value : '')}
                                    isClearable
                                    placeholder={translet('בחירה')}
                                    styles={customStyles}
                                />
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
                    {/* כפתור מחיקת כל הפילטרים */}
                    {Object.values(filters).some(value => value !== '') && (
                        <td className={styles.clear}>
                            <button onClick={() => setFilters({})}>
                                {/* <Icon nameIcon={"clearFilter"}/> */}
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.88px" height="110.668px" viewBox="0 0 122.88 110.668" enable-background="new 0 0 122.88 110.668" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M91.124,15.645c12.928,0,23.406,10.479,23.406,23.406 c0,12.927-10.479,23.406-23.406,23.406c-12.927,0-23.406-10.479-23.406-23.406C67.718,26.125,78.197,15.645,91.124,15.645 L91.124,15.645z M2.756,0h117.322c1.548,0,2.802,1.254,2.802,2.802c0,0.848-0.368,1.622-0.996,2.139l-10.667,13.556 c-1.405-1.375-2.95-2.607-4.614-3.672l6.628-9.22H9.43l37.975,46.171c0.59,0.516,0.958,1.254,0.958,2.102v49.148l21.056-9.623 V57.896c1.651,1.9,3.548,3.582,5.642,4.996v32.133c0,1.105-0.627,2.064-1.586,2.506l-26.476,12.758 c-1.327,0.773-3.023,0.332-3.798-1.033c-0.258-0.441-0.368-0.92-0.368-1.4V55.02L0.803,4.756c-1.07-1.106-1.07-2.839,0-3.945 C1.355,0.258,2.056,0,2.756,0L2.756,0z M96.93,28.282c1.328-1.349,3.489-1.355,4.825-0.013c1.335,1.342,1.341,3.524,0.013,4.872 l-5.829,5.914l5.836,5.919c1.317,1.338,1.299,3.506-0.04,4.843c-1.34,1.336-3.493,1.333-4.81-0.006l-5.797-5.878l-5.807,5.889 c-1.329,1.349-3.489,1.355-4.826,0.013c-1.335-1.342-1.341-3.523-0.013-4.872l5.83-5.913l-5.836-5.919 c-1.317-1.338-1.3-3.507,0.04-4.843c1.339-1.336,3.492-1.333,4.81,0.006l5.796,5.878L96.93,28.282L96.93,28.282z" /></g></svg>
                            </button>
                        </td>
                    )}
                </tr>
                {filteredData.map(lead => (
                    <tr key={lead._id}>
                        {heads.map(h => (
                            h.title === 'isOnline' ? (
                                <td key={h.title} className={lead[h.title] ? styles.online : styles.offline}>
                                    {lead[h.title] ? "פעיל" : "לא פעיל"}
                                </td>
                            ) : h.title === 'joinDate' ? (
                                <td key={h.title}>{formatDateTime(lead[h.title])[0]}</td>
                            ) :
                                h.title === "avatar" ? (<td className={styles.avatarTd} key={h.title}><img className={styles.avatar} src={lead[h.title]} /></td>
                                ) : (
                                    <td id={styles.regularTd} key={h.title}>{lead[h.title]}</td>
                                )
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
