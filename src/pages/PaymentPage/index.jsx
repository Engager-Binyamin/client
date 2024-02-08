import styles from './style.module.css'
import Iframe from 'react-iframe'
import SslImage from '../../assets/credit-ssl.jpg'

export default function PaymentPage() {
  return (
    <div
    className={styles.payment}
    >
      <Iframe url="https://secure.cardcom.solutions/External/lowProfileClearing/151048.aspx?LowProfileCode=5a8d403e-d9f8-4d3c-8907-d7ce13119593"
        width="1100px"
        height="700"
        id=""
        className="paymentifrmae"
        display="block"
        position="relative"/>
<div className={styles.icones} >
<img src={SslImage} alt="" />
</div>
    </div>
  )
}
