import { useState, useEffect } from 'react';
import { Fireworks } from 'fireworks-js';
import CountdownTimer from './components/CountdownTimer';
import DateDisplay from './components/DateDisplay';

function App() {
  // Tet 2026 date: February 17, 2026 (Gregorian) - January 1, 2026 (Lunar)
  const tetDate = new Date('2026-02-17T00:00:00');
  const [monthsAndDays, setMonthsAndDays] = useState({ months: 0, days: 0 });
  const [fireworksInstance, setFireworksInstance] = useState(null);
  const [fireworksRunning, setFireworksRunning] = useState(false);

  // Existing calculateMonthsAndDays function remains the same as in your original code
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
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.round((endDate - tempDate) / millisecondsPerDay);

    return { months, days };
  };
  
  useEffect(() => {
    // Initial calculation
    setMonthsAndDays(calculateMonthsAndDays());

    // Update calculation daily
    const timer = setInterval(() => {
      setMonthsAndDays(calculateMonthsAndDays());
    }, 86400000); // 24 hours

    // Fireworks initialization
    const container = document.querySelector('.fireworks-container');
    const fireworks = new Fireworks(container, {
      autoresize: true,
      opacity: 0.3,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 50,
      traceLength: 3,
      traceSpeed: 1,
      explosion: 3,
      intensity: 20,
      flickering: 50,
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 30,
        max: 60
      },
      rocketsPoint: {
        min: 50,
        max: 50
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 80,
        max: 100
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    });

    setFireworksInstance(fireworks);

    // Cleanup
    return () => {
      clearInterval(timer);
      fireworks.stop();
    };
  }, []); // Empty dependency array to run only once on mount

  const toggleFireworks = () => {
    if (fireworksRunning) {
      fireworksInstance.stop();
    } else {
      fireworksInstance.start();
    }
    setFireworksRunning(!fireworksRunning);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fireworks container */}
      <div 
        className="fireworks-container w-full h-full z-20"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 relative z-10"
        style={{ 
          backgroundImage: 'url(https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/9a5370be-ccd4-46a4-a8d0-f5892c38e2e6/original=true,quality=90/background.jpeg)',
          position: 'relative',
          
        }}
      >
        <div className="w-full">
          <div className="text-center">
            <p className='text-xl md:text-2xl font-bold text-yellow-300'>Cùng Sang đếm ngược ngày tới Tết Nguyên Đán 2026 Nhé 🎉🎉</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white p-3 rounded-lg inline-flex items-center">
              TẾT NGUYÊN ĐÁN 2026 BÍNH NGỌ 🐎 CHỈ CÒN
            </h1>
          </div>

          <CountdownTimer targetDate={tetDate} />

          <div className="text-center mt-6 mb-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-300 p-2 rounded-lg inline-block">
              {monthsAndDays.months} THÁNG {monthsAndDays.days} NGÀY
            </h2>
          </div>

          <DateDisplay targetDate={tetDate} />
        </div>
      </div>
      <button 
        onClick={toggleFireworks} 
        className="fixed bottom-4 right-4 bg-yellow-500 text-white font-semibold text-xs sm:text-lg p-2 rounded-full z-30"
      >
        {fireworksRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

export default App;