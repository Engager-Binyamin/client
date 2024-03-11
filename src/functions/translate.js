export default function translet(word) {
    let TransletWords = {
      name: 'שם',
      phone: 'טלפון',
      email: 'אימייל',
      campaign: 'קמפיין',
      username: 'שם משתמש',
      creation: 'יצירה',
      date: 'תאריך',
      id: 'מזהה',
      title: 'כותרת',
      details: 'פרטים',
      isActive: 'פעיל',
      isOnline: 'סטטוס',
      msg: 'הודעה',
      lead: 'מוביל',
      joinDate: 'תאריך הצטרפות',
      messagesSent: 'הודעות שנשלחו'
    };
  
    // מציאת התרגום המתאים לפי הפרופרטי שהועבר
    return  TransletWords[word] || '';
  }

  