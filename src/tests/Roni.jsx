import SideBar from '../layout/SideBar';
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format, addMonths, subMonths } from 'date-fns'; // ייבוא הפונקציה subMonths מתוך חבילת date-fns
import 'chart.js/auto';
import api from '../functions/api';
import styles from './style.module.css';
import DataContext from '../context/DataContext';

export default function Roni() {
  const [data, setData] = useState({
    broadcastMessages: {},
  });

  const { user } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignRes = await api.get('/campaign');
        const userRes = await api.get('/user');
        if (!campaignRes || !userRes) {
          throw new Error('Failed to fetch data');
        }
        const campaignData = campaignRes || [];
        const broadcastMessages = {};

        campaignData.forEach((item) => {
          if (item && item.msg && Array.isArray(item.msg)) {
            item.msg.forEach(msg => {
              const messageDate = new Date(msg.creationDate);
              const messageYearMonth = format(messageDate, 'yyyy-MM');
              if (broadcastMessages[messageYearMonth]) {
                broadcastMessages[messageYearMonth]++;
              } else {
                broadcastMessages[messageYearMonth] = 1;
              }
            });
          }
        });

        setData({ broadcastMessages });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  const createLineData = (data, title) => {
    // הוספת חישוב לקבוע את התווים לציר ה-X מ-6 חודשים לפני היום
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 6);
    const labels = Array.from({ length: 7 }, (_, i) => format(addMonths(sixMonthsAgo, i), 'MMM yyyy'));

    return {
      labels: labels,
      datasets: [
        {
          label: title,
          data: labels.map(month => data[format(new Date(month), 'yyyy-MM')] || 0),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
        }
      ],
    };
  };

  return (
    <div className={styles.main_container}>
      <SideBar />
      <Line data={createLineData(data.broadcastMessages, 'Broadcast Messages Sent')} />
    </div>
  );
}
