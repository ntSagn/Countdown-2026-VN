import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="flex justify-center space-x-2 md:space-x-4 my-6">
      <CountdownBox value={timeLeft.days} label="Ngày" />
      <CountdownBox value={formatTime(timeLeft.hours)} label="Giờ" />
      <CountdownBox value={formatTime(timeLeft.minutes)} label="Phút" />
      <CountdownBox value={formatTime(timeLeft.seconds)} label="Giây" />
    </div>
  );
};

const CountdownBox = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-red-600 text-4xl md:text-6xl font-bold p-4 rounded-md w-24 md:w-32 text-center">
        {value}
      </div>
      <div className="bg-gray-900 text-white text-lg md:text-xl font-medium p-2 rounded-b-md w-24 md:w-32 text-center">
        {label}
      </div>
    </div>
  );
};

export default CountdownTimer;