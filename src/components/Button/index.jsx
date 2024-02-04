import styles from './style.module.css'

// Description : A generic button, changed according to content, classname and onClick function
// Props : content , className,  onClick
// Creator : Refael
export default function Button({ content="תוכן הכפתור",className="save",onClick=()=>{} }) {
  return (
<div>
          <button className={`${styles[className]} ${className}`} onClick={onClick}>{content}</button>

    </div>
  )
}
