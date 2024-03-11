import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'
import LeadsTable from '../LeadsTable';

export default function AllLeads() {
  const { formatedUsers, heads } = useContext(DataContext);
  return (
    <LeadsTable filterdLeads={formatedUsers} heads={heads} />
  )
}
