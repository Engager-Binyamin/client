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

  // TODO: לגרום לכך שמתי שלוחצים על החיפוש האינפוט ישר יהיה בפוקוס ומוכן להקלדה
  // TODO: לשים את האינפוט על שורת החיפוש ולא מתחתיו
  // TODO: ?"בלחיצה על התנתקות לשים פופאפ "האם אתה בטוח שברצונך להתנתק

  const [displaySearchBar, setDisplaySearchBar] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [campaign, setCampaign] = useState([])
  const [campaignByDate, setCampaignByDate] = useState([])
  const { isOpen, setIsOpen } = useContext(DataContext);
  const nav = useNavigate()

  const getCamp = () => {
    api.get(`/campaign`)
      .then(res => {
        // nav(`campaign/${res[0]._id}`)
        setCampaign(res)
      })
      .then()
  }
  useEffect(() => {
    getCamp()
  }, [])

  const sortCamps = (camps) => {
    return camps.slice().sort((a, b) => {
      const latestMsgA = getLatestMessageDate(a);
      const latestMsgB = getLatestMessageDate(b);
      return latestMsgB - latestMsgA;
    });
  };

  const getLatestMessageDate = (campaign) => {
    if (!campaign.msg || campaign.msg.length === 0) {
      return new Date(0); // Return a default date if no messages are present
    }

    return campaign.msg.reduce((latest, msg) => {
      const msgDate = new Date(msg.creationDate);
      return msgDate > latest ? msgDate : latest;
    }, new Date(0));
  };

  const deleteLS = () => {
    delete localStorage.token
  }


  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebartop}>
        <h1>אנגייג׳ר</h1>
        <ul>
          <li>
          <NavLink to="/myLeads">
              כל הלידים שלי
              <Icon nameIcon={'importList'} nameColor={''} />
            </NavLink>
          </li>
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
        </div>


      </div>
      <div className={styles.user} >

      </div>
    </div>
  )
}

