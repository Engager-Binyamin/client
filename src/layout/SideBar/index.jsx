import styles from './style.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon'
import CampaignList from '../../components/CampaignList'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import { useContext, useEffect, useState } from 'react'
import DataContext from '../../context/DataContext'
import NewCampaigenForm from '../../components/NewCampaignForm'
import api from '../../functions/api'
import FeedBack from '../../components/FeedBack'

export default function SideBar() {
  const [displaySearchBar, setDisplaySearchBar] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [campaign, setCampaign] = useState([])
  const { isOpen, setIsOpen } = useContext(DataContext);
  const nav = useNavigate()

  const getCamp = () => {
    api.get("/campaign")
      .then(res => {
        console.log("campaign:", res)
        nav(`campaign/${res[0]._id}`)
        setCampaign(res)
      })
      .then()
  }
  useEffect(() => {
    getCamp()
  }, [])

const deleteLS=()=>{
 delete localStorage.token
}

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebartop}>
        <h1>אנגייג׳ר</h1>
        <ul>
          <li onClick={() => setDisplaySearchBar(!displaySearchBar)}>
            <span>
              חיפוש
              <Icon nameIcon={'search'} nameColor={''} />
            </span>
          </li>
          {displaySearchBar &&
            <li>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </li>
          }
          <li>
            <NavLink to="/settings">
              הגדרות
              <Icon nameIcon={'setting'} nameColor={''} />
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/feedback">
              שליחת פידבק
              <Icon nameIcon={'thumbsup'} nameColor={''} />
            </NavLink>
          </li> */}
          <li onClick={deleteLS}>
            <NavLink to="/login">
              התנתקות    
              <Icon nameIcon={'logout'} nameColor={''} />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.lists} >
        <div className={styles.liststitle}>רשימות</div>
        <div className={styles.newlist} >
          <CampaignList searchTerm={searchTerm} campaignList={campaign} />
          <div className={styles.item} onClick={() => setIsOpen(<NewCampaigenForm setIsOpen={setIsOpen} getCamp={getCamp} />)}>
            <Icon nameIcon={'pluscircle'} nameColor={'create'} />
            <Button className="create"
              content="רשימה חדשה"
            />
          </div>
          <button onClick={getCamp}>getCamp</button>
        </div>


      </div>
      <div className={styles.user} >

      </div>
    </div>
  )
}

//   {
//     id: "65c0939a5aa397278552a5b5",
//     title: "קורס תפירה 2023_3"
//   },
//   {
//     id: "2",
//     title: "כפר נוער - גיוס תלמידים"
//   },
//   {
//     id: "3",
//     title: "מנויי חדר כושר גבעת שמואל הנביר"
//   },
//   {
//     id: "4",
//     title: "מנויי חדר כושר גבעת שמואל הנביר"
//   }
// ]
