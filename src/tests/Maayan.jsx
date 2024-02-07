import React from 'react'
import Popover from '../components/Popover'
import '../Index.css'
export default function Maayan() {
  let list = [
    { text: "התנתק", icon: '💢', onClick: () => alert("maayam ha-tambal") },
    { text: "לשנות פרופיל", icon: '💨' },
    { text: "למחוק", icon: '🗑' },
    { text: "התנתק", icon: '💢' },
    { text: "לשנות פרופיל", icon: '💨' },
    { text: "למחוק", icon: '🗑' },
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
