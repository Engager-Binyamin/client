import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'
import LeadsTable from '../LeadsTable';

export default function AllUsers() {

  const { usersObj } = useContext(DataContext);
  console.log("format", usersObj.users, "heads", usersObj.heads);
  return (
    <LeadsTable filterdLeads={usersObj.users} heads={usersObj.heads} />
  )
}
