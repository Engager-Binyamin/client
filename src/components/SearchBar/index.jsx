import { FaSearch, FaSortAlphaDown } from 'react-icons/fa';
import styles from './style.module.css';
import Popover from '../Popover/index';
import { useState, useEffect } from 'react';
// import Icon from '../../components/Icon'



// Creator : Yehoshua Preiser


// Description: This component is a search bar interface with optional sorting.
// The search functionality updates dynamically,
// sorting button switches between sorting options based on user interaction.

// Props:
// searchTerm and setSearchTerm for managing search queries,
// setSortType for toggling between sorting by name and date,
// sortButton to display or hide the sorting button.
export default function SearchBar({ searchTerm, setSearchTerm, setSortType, sortType, sortButton = false }) {
  // TODO: לסדר את התפריט סינון מבחינת אייקונים ולעשות שיסגר כשלוחצים מחוצה לו, בנוסף להוסיף אותו גם להודעות
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const [list, setList] = useState([
    { text: "תאריך הצטרפות", icon: '✅', onClick: () => handleSort() },
    { text: " שם (א'-ת)", onClick: () => handleSort() }
  ])

  const handleSort = (type) => {
    setSortType(type);
  };

  useEffect(() => {
    if (sortType === 'date') {
      setList([
        { text: "תאריך הצטרפות", icon: '✅', onClick: () => handleSort('date') },
        { text: " שם (א'-ת)", onClick: () => handleSort('name') }
      ]);
    } else if (sortType === 'name') {
      setList([
        { text: "תאריך הצטרפות", onClick: () => handleSort('date') },
        { text: " שם (א'-ת)", icon: '✅', onClick: () => handleSort('name') }
      ]);
    }
  }, [sortType])





  return (
    <div className={styles.SearchBar} >
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.Input}
      />
      {/* <Icon nameIcon={'search'} nameColor={''} className={styles.SearchIcon}/> */}
      <FaSearch className={styles.SearchIcon} onClick={() => { }} />

      {sortButton &&
        <span className={styles.SortIcon} >
          <Popover list={list} fnName='onClick' >
            <FaSortAlphaDown className={styles.SortIcon} />
          </Popover >
        </span>
      }
    </div >
  );
};

