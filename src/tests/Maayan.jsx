import React from 'react'
import Popover from '../components/Popover'
import '../Index.css'
export default function Maayan() {
  let list = [
    { text: "התנתק", icon: '💢', onClick: () => alert("maayam ha-tambal") },
    { text: "לשנות פרופיל", icon: '💨' },
    { text: "למחוק", icon: '🗑', color: 'red' },
    { text: "התנתק", icon: '💢', color: 'green' },
    { text: "לשנות פרופיל", icon: '💨', color: 'red' },
    { text: "למחוק", icon: '🗑', color: 'green' },
  ];

  return (

    <div className='mayanMain' >
      {/* <h1 >user pop</h1> */}
      <Popover list={list} fnName='onClick'  >
        click
      </Popover>

    </div>
  )
}
