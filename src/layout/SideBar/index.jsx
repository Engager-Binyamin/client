import styles from "./style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import CampaignList from "../../components/CampaignList";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import NewCampaigenForm from "../../components/NewCampaignForm";
import UserProfile from "../../components/UserProfile";

export default function SideBar() {

  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { setPopUp, allCamps, getAllCamps } = useContext(DataContext);

  const nav = useNavigate();

  useEffect(() => {
    getAllCamps();
  }, []);

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


  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebartop}>
        <h1 onClick={() => nav('/')} className={styles.eng}>אנגייג׳ר</h1>
        <ul>
          <li>
            <NavLink to="/myLeads">
              כל הלידים שלי
              <Icon nameIcon={"leads"} nameColor={""} />
            </NavLink>
          </li>
          <li>
            <NavLink to="myUsers">
              כל הלקוחות שלי
              <Icon nameIcon={"leads"} nameColor={""} />
            </NavLink>
          </li>
          <li>
            <NavLink to="msgqueue">
              תור עבודה
              <Icon nameIcon={"message"} nameColor={""} />
            </NavLink>
          </li>
          {!displaySearchBar && (
            <li onClick={() => setDisplaySearchBar(!displaySearchBar)}>
              <span>
                חיפוש
                <Icon nameIcon={"search"} nameColor={""} />
              </span>
            </li>
          )}
          {displaySearchBar && (
            <li>
              <SearchBar
                className={styles.searchbar}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autoFocus
                onBlur={() => {
                  if (searchTerm.trim() === "") {
                    setDisplaySearchBar(false);
                  }
                }}
              />
            </li>
          )}
          <li>
            <NavLink to="/settings">
              הגדרות
              <Icon nameIcon={"setting"} nameColor={""} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback">
              שליחת פידבק
              <Icon nameIcon={'thumbsup'} nameColor={''} />
            </NavLink>
          </li>
          {/* <li onClick={() =>
            setPopUp(
              {
                title: 'התנתקות',
                component: <ConfirmLogOut setPopUp={setPopUp} title={'התנתקות'} />
              }
            )}>
            <NavLink>
              התנתקות
              <Icon nameIcon={"logout"} nameColor={""} />
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/myUsers">
              כל הלקוחות שלי
              <Icon nameIcon={"leads"} nameColor={""} />
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className={styles.lists}>
        <div className={styles.liststitle}>רשימות</div>
        <div className={styles.newlist}>
          <CampaignList searchTerm={searchTerm} campaignList={allCamps} />
        </div>
        <div className={styles.item}
          onClick={() =>
            setPopUp(
              {
                title: "קמפיין חדש",
                component: <NewCampaigenForm setPopUp={setPopUp} getCamp={getAllCamps} />
              }
            )
          }>
          <Icon nameIcon={"pluscircle"} nameColor={"create"} />
          <Button className="create" content="רשימה חדשה" />
        </div>
      </div>
      <div className={styles.userContainer}>
        <UserProfile />
      </div>
    </div>
  );
}
