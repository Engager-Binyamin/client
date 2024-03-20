import React, { useContext, useEffect, useState, createContext } from 'react'
import TabSwitcher from '../TabSwitcher'
import { Outlet, useNavigate } from 'react-router-dom'
import DataContext from '../../context/DataContext';
import styles from "./style.module.css"
import api from '../../functions/api';
import { toast } from 'react-toastify';



export default function MyUsers() {

    const nav = useNavigate();
    const [activeNum, setActiveNum] = useState(0);

    const { usersObj, setUsersObj, user } = useContext(DataContext);

    useEffect(() => {
        if (!user._id) return;
        api.get(`/user/forTable`)
            .then(setUsersObj)
            .catch((error) => {
                toast.error(error?.response?.data?.msg || "somthing want worng");
            });

    }, [user._id]);

    useEffect(() => {
        if (location.pathname === '/myUsers') {
            nav('/myUsers/all');
        }
    }, [location.pathname]);

    useEffect(() => {
        if (usersObj.users) {
            const actives = usersObj.users.filter(user => user.isOnline).length;
            setActiveNum(actives);
        }
    }, [usersObj])

    return (
        <div className={styles.myLeads}>
            <h2 className={styles.title}>המשתמשים שלי</h2>
            <p className={styles.info}>{usersObj.users?.length} משתמשים, {activeNum} פעילים</p>
            <div className={styles.tabSwitcher}>
                {/* <TabSwitcher rout={[
                    { tab: `myUsers/active`, text: `פעילים` },
                    { tab: `myUsers/inactive`, text: "לא פעילים" },
                    { tab: `myUsers/all`, text: "כל המשתמשים" }
                ]} /> */}
            </div>
            <Outlet />
        </div>
    )
}
