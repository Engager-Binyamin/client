import React from 'react'
import styles from '../components/ThreeDotsMenu/style.module.css'
import Menu from '../components/OpenMenu'

// מקבלים מערך של אובייקטים 
// let list = [{
//   text: "עריכה",
//   icon: "🖊️",
//   func: () => { console.log("כפתור עריכה") },
//   redColor: false
// }, {
//   text: "השהייה",
//   icon: "❌",
//   func: () => { console.log("כפתור השהייה") },
//   redColor: false
// }, {
//   text: "מחיקה",
//   icon: "🗑️",
//   func: () => { console.log("כפתור מחיקה") },
//   redColor: true
// }]

export default function ThreeDots({list = [{
  text: "עריכה",
  icon: "🖊️",
  func: () => { console.log("כפתור עריכה") },
  redColor: false
}, {
  text: "השהייה",
  icon: "❌",
  func: () => { console.log("כפתור השהייה") },
  redColor: false
}, {
  text: "מחיקה",
  icon: "🗑️",
  func: () => { console.log("כפתור מחיקה") },
  redColor: true
}]
}) {
  return (
      <button className={styles.threeDots}>
          🚦
          <div><Menu list={list}/></div>
      </button>
  )
}
