import { Route, Router, Routes } from 'react-router-dom'
import styles from './style.module.css'
import Setting from '../../components/Setting'
import CampaignPage from '../../pages/CampaignPage'
import PaymentPage from '../../pages/PaymentPage'
import Icon from '../../components/Icon'


export default function Content() {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path='/campaign/:campId/*' element={<CampaignPage />} />
        <Route path='/settings' element={<Setting />} />
        <Route path='/payment' element={<PaymentPage />} />
      </Routes>
      <div className={styles.IconMsg}>
        <Icon nameIcon={"message"} nameColor={""} />
      </div>
    </div>
  )
}
