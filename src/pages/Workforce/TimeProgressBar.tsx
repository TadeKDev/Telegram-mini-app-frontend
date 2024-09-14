import React, { useEffect, useState } from 'react';  
import ProgressBar from '@ramonak/react-progress-bar';  

const TimeProgressBar: React.FC<{ startTime: number; endTime: number }> = ({ startTime, endTime }) => {  
  const [progress, setProgress] = useState(Math.floor((Date.now() - startTime)*100/(endTime - startTime)));  
  const [remainingTime, setRemainingTime] = useState(0);  

  useEffect(() => {  
    const totalDuration = endTime - startTime;
    const interval = setInterval(() => {  
      const now = Date.now();  
      const elapsed = now - startTime;
      const newProgress = Math.min(Math.floor(elapsed * 100 / totalDuration) , 100);
      console.log('interval', now, elapsed, elapsed * 100 / totalDuration)
      
      setProgress(newProgress);
      const remaining = Math.max(endTime - now, 0);  
      setRemainingTime(remaining);  
      if (newProgress >= 100) {  
        clearInterval(interval);  
      }  
    }, 1000); 
    return () => clearInterval(interval);  
  }, [startTime, endTime]);

  const formatTime = (timeInMs: number) => {  
    const totalSeconds = Math.floor(timeInMs / 1000);  
    const hours = Math.floor(totalSeconds / 3600);  
    const minutes = Math.floor((totalSeconds % 3600) / 60);  
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;  
  };  
console.log(progress)
  return (  
    <div>
        <p className='text-white text-[12px]'>Remaining Time: {formatTime(remainingTime)}</p>
        <ProgressBar completed={progress} />
    </div>  
  );  
};  

export default TimeProgressBar;