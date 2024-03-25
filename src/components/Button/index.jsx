import styles from './style.module.css'

// Description : A generic button, changed according to content, classname and onClick function
// Props : content , className,  onClick, create
// Creator : Refael
export default function Button({ content = "תוכן ", className = "save", onClick = () => { }, onsubmit = () => { },...attr }) {
  return (
      <button  className={`${styles[className]} ${className}`} onClick={onClick} {...attr} >{content}</button>
  )
}
