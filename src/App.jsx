import {useState, useEffect} from 'react';
import CountdownTimer from './components/CountdownTimer';
import DateDisplay from './components/DateDisplay';

function App() {
  // Tet 2026 date: February 17, 2026 (Gregorian) - January 1, 2026 (Lunar)
  const tetDate = new Date('2026-02-17T00:00:00');
  const [monthsAndDays, setMonthsAndDays] = useState({ months: 0, days: 0 });
  
  // Calculate remaining months and days
  const calculateMonthsAndDays = () => {
    const today = new Date();
    
    // Clone dates to avoid modifying the original
    let startDate = new Date(today);
    let endDate = new Date(tetDate);
    
    // Reset hours to avoid time differences
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
    // Calculate difference in months
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                (endDate.getMonth() - startDate.getMonth());
    
    // Adjust start date to calculate remaining days
    let tempDate = new Date(startDate);
    tempDate.setMonth(tempDate.getMonth() + months);
    
    // If we went too far, back up one month
    if (tempDate > endDate) {
      months--;
      tempDate = new Date(startDate);
      tempDate.setMonth(tempDate.getMonth() + months);
    }
    
    // Calculate remaining days
    const secondsPerDay = 24 * 60 * 60;
    const days = Math.round((endDate - tempDate) / secondsPerDay/1000);
    
    return { months, days };
  };
  
  useEffect(() => {
    // Initial calculation
    setMonthsAndDays(calculateMonthsAndDays());
    
    // Update calculation daily
    const timer = setInterval(() => {
      setMonthsAndDays(calculateMonthsAndDays());
    }, 86400000); // 24 hours
    
    return () => clearInterval(timer);
  }, []); // Empty dependency array to run only once on mount
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: 'url(https://lichduongam.com/images/count_days/2024/01/04/original/red-white--gold-modern-happy-lunar-new-year-facebook-fundraiser-cover-photo-4_1704426089.jpg)' }}>
      <div className="w-full p-4">
        <div className="text-center">
          <p className='text-2xl font-bold text-yellow-300'>Cùng Sang đếm ngược ngày tới Tết Nguyên Đán 2026 Nhé 🎉🎉</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white p-3 rounded-lg inline-flex items-center">
            <span className="clock-icon mr-2">⏱️</span>
            TẾT NGUYÊN ĐÁN 2026 BÍNH NGỌ 🐎 CHỈ CÒN
          </h1>
        </div>
        
        <CountdownTimer targetDate={tetDate} />
        
        <div className="text-center mt-6 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 p-2 rounded-lg inline-block">
            {monthsAndDays.months} THÁNG {monthsAndDays.days} NGÀY
          </h2>
        </div>
        
        <DateDisplay targetDate={tetDate} />
      </div>
    </div>
  );
}

export default App;