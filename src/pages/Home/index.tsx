import { useContext, useState} from "react";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import TopNavBar from "../../components/TopNavBar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../api';

const Home = () => {
  
  const { coins, setCoins, gpus, data, energy, passiveIncome, level, setLevel, clickCount, setClickCount, levelRate, setLevelRate } = useContext(MiniAppContext);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [clickAnimations, setClickAnimations] = useState({ id: Date.now(), position:Array()});
  
  const handleCoins = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    if ('clientX' in e && 'clientY' in e){
      console.log('Mouse Event');
      setClickAnimations({ id: Date.now(), position:[[e.clientX - rect.left / 2, e.clientY - rect.top]]});
      setCoins(coins + 1);
      setClickCount(clickCount + 1);
      setLevelRate(levelRate + 1);
    } 
    else if ('touches' in e && e.touches.length > 0){
      console.log('Touch Event');
      setClickAnimations({ id: Date.now(), position: Array.from(e.touches).map(i=>[i.clientX - rect.left / 2, i.clientY - rect.top])});
      setCoins(coins + e.touches.length);
      setClickCount(clickCount + e.touches.length);
      setLevelRate(levelRate + e.touches.length);
    }
    
    /// Animation Part
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 20);

    /// Processing Coins, Level and Spin
    if (levelRate === level * (level + 1) * 5) {
      setLevel(level + 1);
      setLevelRate(1);
      axiosInstance.post('/updatelevel', {}).then(function (response) {
        if (response.status === 200) {
          console.log(response.data.message);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  return (
    <main className="relative pt-14 pb-20 w-full min-h-full bg-[url('/images/background/home_background_color.png')] bg-cover bg-top bg-no-repeat bg-[#5200FF64] mx-auto">
      <TopNavBar />
      <div className="fixed flex flex-row-reverse top-20 left-0 pr-1 py-1 items-center bg-[url('/images/background/task_notify_color.png')] bg-center rounded-r-full border-[1px] border-[#ffffff29] z-40">
        <div className="relative">
          <div className="ml-4 bg-[url('/images/task_button.png')] bg-cover bg-no-repeat w-12 h-12 border-[1px] border-[#81c2ef2d] rounded-full" onClick={() => { navigate('/earn'); }}></div>
          <div className="absolute top-0 right-0 bg-gradient-to-b from-[#ff5397] to-[#bf2964] rounded-full w-[18px] h-[18px] text-[10px] text-white text-center font-sfpro translate-x-1 -translate-y-1">3</div>
        </div>
      </div>

      <div className="fixed flex flex-row-reverse top-20 right-0 pl-1 py-1 items-center bg-[url('/images/background/spin_button_color.png')] bg-center rounded-l-full boder-[1px] border-[#ffffff29] z-40">
        <div className="relative">
          {clickCount < 100 ? (
            <div className="flex justify-center items-center mr-4 bg-[url('/images/spin_.png')] bg-cover bg-no-repeat w-12 h-12 border-[1px] border-[#81c2ef2d] rounded-full">
              <CircularProgressbar value={clickCount} styles={buildStyles({ pathColor: 'rgba(219,125,5)' })} />
              <div className="absolute top-3 text-white text-bold text-[16px] text-center font-sfpro">{clickCount}</div>
            </div>
          ) : (
            <div>
              <div className="mr-4 bg-[url('/images/spin.png')] bg-cover bg-no-repeat w-12 h-12 border-[1px] border-[#81c2ef2d] rounded-full">
              </div>
              <div className="absolute top-3 right-2 flex items-center justify-center bg-gradient-to-bl from-[#fedc31] from-27% via-[#ea9f00] via-52% to-[#fa2cd7,#33d0e0] to-82% rounded-[4px] w-[42px] h-[22px] text-[12px] text-white font-bold font-sfpro"><span>SPIN!</span></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="absolute top-16 bg-[url('/images/clickpad.png')] bg-cover bg-no-repeat w-[382px] h-[434px] mx-auto z-10 -translate-x-[2px] translate-y-[1px]">
          <div className="w-[278px] h-[321px] mx-auto mt-12" onClick={handleCoins} key={clickAnimations.id}>
          <AnimatePresence>
            {clickAnimations.position.length > 0 ?(
              clickAnimations.position.map((label,idx)=>(
              
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -50 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute text-[#8d8d39] font-extrabold text-[40px]"
                  style={{ left: label[0], top: label[1] }} key={clickAnimations.id.toString() + idx.toString()}
                >
                  +1
                </motion.div>
              
            ))
            )
            :(<div></div>)}
            </AnimatePresence>
            <div className={`bg-[url('/images/bot.png')] w-[278px] h-[321px] bg-cover bg-no-repeat ${isClicked ? 'scale-95' : ''}`}  ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col fixed bottom-20 left-0 right-0 z-40">
        <div className="flex justify-between px-4 pt-4">
          <div className="bg-[url('/images/coin_box.png')] bg-cover w-[84px] h-[60px] flex flex-col items-center justify-start pt-8 text-sm">
            <div className="text-[#FFDF79] font-semibold text-[12px] leading-none">
              {coins > 1e6 ? `${(coins / 1e6).toFixed(2)}M` : coins > 1e3 ? `${(coins / 1e3).toFixed(2)}k` : coins}
            </div>
            <div className="text-[#FFFFFF99] font-semibold text-[9px] leading-none mt-[2px]">
              +{passiveIncome > 1e6 ? `${(passiveIncome / 1e6).toFixed(2)}M` : passiveIncome > 1e3 ? `${(passiveIncome / 1e3).toFixed(2)}k` : passiveIncome}/s
            </div>
          </div>
          <div className="bg-[url('/images/power_box.png')] bg-cover w-[84px] h-[60px] flex flex-col items-center justify-center pt-7 text-sm">
            <div className="text-[#FDACCC] font-semibold text-[12px] leading-4"> {energy} </div>
          </div>
          <div className="bg-[url('/images/gpu_box.png')] bg-cover w-[84px] h-[60px] flex flex-col items-center justify-center pt-7 text-sm">
            <div className="text-[#9A95FF] font-semibold text-[12px] leading-4"> {gpus} </div>
          </div>
          <div className="bg-[url('/images/data_box.png')] bg-cover w-[84px] h-[60px] flex flex-col items-center justify-center pt-7 text-sm">
            <div className="text-[#7FFAF3] font-semibold text-[12px] leading-4"> {data} </div>
          </div>
        </div>
        <div className="flex flex-col mx-4 my-4 bg-gradient-to-b from-[#000000] to-[#0F1F3D] border-[1px] border-[#FFFFFF40] rounded-3xl py-2 px-4 z-30">
          <div className="flex justify-between">
            <div className="text-[14px] text-[#FFFFFF64] font-bold">Level {level}</div>
            <div className="text-[14px] text-[#FFFFFF64] font-bold">{levelRate}/{level * (level + 1) * 5} XP</div>
          </div>
          <div className="border-[1px] border-[#FFFFFF40] rounded-full mt-2 p-[2px]">
            <div
              className={`bg-[url('/images/stripes.png')] bg-cover rounded-full flex flex-row-reverse p-[2px]`}
              style={{ width: `${levelRate * 100 / (level * (level + 1) * 5)}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="text-[#FFFFFF64] flex justify-center text-[14px]">
            Mine Data & Coins for boost!
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Home;