import React from 'react';

const DateDisplay = ({ targetDate }) => {
  const formattedTargetDate = formatDate(targetDate);
  const today = formatDate(new Date());
  
  function formatDate(date) {
    return {
      gregorian: new Intl.DateTimeFormat('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }).format(date),
      lunar: date === targetDate ? "01/01/2026" : "05/02/2025" // Simplified, would need actual lunar calendar conversion
    };
  }
  
  return (
    <div className="text-white text-center space-y-4">
      <div className="p-3 rounded-lg ">
        <p className="text-lg font-semibold md:text-xl">
          Diễn ra vào {formattedTargetDate.gregorian.toLowerCase()} (dương lịch) - {formattedTargetDate.lunar} (âm lịch)
        </p>
      </div>
      
      <div className="justify-center text-center text-xl font-bold text-yellow-300 p-3 rounded-lg flex items-center">
        <p className="text-2xl font-bold">
          <span></span>Hôm nay {today.gregorian} tức ngày {today.lunar} (âm lịch)
        </p>
      </div>
    </div>
  );
};

export default DateDisplay;