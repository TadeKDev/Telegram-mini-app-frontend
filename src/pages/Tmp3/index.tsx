import { useContext, useEffect, useState} from "react";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import {useNavigate} from 'react-router-dom';
import BottomNavBar from "../../components/BottomNavBar";

const Tmp3 = () => {
  const {globalRank, setGlobalRank,currentLanguage} = useContext(MiniAppContext);
  const [isSounedEnabled, setisSounedEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setGlobalRank(40);
    console.log(globalRank);
  }, []);

  const handleExitButton = ()=>{
    navigate("/");
  }
  const handleLanguageButton = ()=>{
    navigate("/settings/languages");
  }

  const handleToggle = () => {  
    setisSounedEnabled(!isSounedEnabled);
  };

  return (
    <main className="relative w-full min-h-full bg-[url('/images/background/setting_tab_color.png')] bg-cover bg-no-repeat bg-[#5200FF64]">
      <nav className="fixed top-0 left-0 right-0">
        <div className="flex justify-between items-center bg-gradient-to-b from-[#130122] to-[#0F1F3D] px-6 py-3 rounded-b-2xl border-[1px] border-[#ffffff9f]">
          <div className="bg-[url('/images/user_icon.png')] bg-cover w-8 h-8"></div>
          <div className="font-gilroy text-[20px] font-bold text-white">Settings</div>
          <div className="bg-[url('/images/_close.png')] bg-cover w-8 h-8" onClick={handleExitButton}></div>
        </div>
      </nav>
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col mt-24">
          <div className="flex font-gilroy font-semibold text-[16px] ml-6 text-white">Main settings</div>
          <div className="flex justify-between items-center bg-gradient-to-t from-[#000000] to-[#0f1f3d] mx-3 mt-2 rounded-xl px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-[url('/images/language.png')] w-[26px] h-[26px]"></div>
              <div className="flex flex-col justify-center gap-1">
                <div className="text-white font-semibold text-[16px]">Language</div>
                <div className="text-white text-[12px]">{currentLanguage}</div>
              </div>
            </div>
            <div className="bg-[url('/images/CaretRight.png')] w-3 h-3" onClick={handleLanguageButton}></div>
          </div>
          <div className="flex justify-between items-center bg-gradient-to-t from-[#000000] to-[#0f1f3d] mx-3 mt-2 rounded-xl px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-[url('/images/sound.png')] w-[32px] h-[32px]"></div>
              <div className="text-white font-semibold text-[16px]">Sound</div>
            </div>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">  
                  <input type="checkbox" className="sr-only" checked={isSounedEnabled} onChange={handleToggle} />  
                  <div className={`w-[51px] h-[31px] rounded-full shadow-inner ${isSounedEnabled ? "bg-gradient-to-b from-[#00e35833] to-[#00d05a33]" : "bg-[#ffffff5f]"}`}></div>  
                  <div className={`dot absolute w-[27px] h-[27px] rounded-full shadow transition transform duration-200 ease-in-out ${isSounedEnabled ? "translate-x-[22px] bg-gradient-to-b from-[#00e358] to-[#00d05a]" : "translate-x-[2px] bg-gradient-to-b from-[#130122] to-[#0f1f3d]"}`}></div>  
              </label>  
            </div>
          </div>
          <div className="flex justify-between items-center bg-gradient-to-t from-[#000000,#12121280] to-[#0f1f3d, #12121280] mx-3 mt-2 rounded-xl px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-[url('/images/notify.png')] w-[32px] h-[32px]"></div>
              <div className="flex flex-col justify-center gap-1">
                <div className="text-white font-semibold text-[16px]">Notifications</div>
                <div className="text-white text-[12px]">DISABLED</div>
              </div>
            </div>
            <div className="bg-[url('/images/CaretRight.png')] w-3 h-3">
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex font-gilroy font-semibold text-[16px] ml-4 text-white">Other</div>
          <div className="flex justify-between items-center bg-gradient-to-t from-[#000000] to-[#0f1f3d] mx-3 mt-2 rounded-xl px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-[url('/images/policy.png')] w-[26px] h-[24px]"></div>
              <div className="flex flex-col justify-center gap-1">
                <div className="text-white font-semibold text-[16px]">Privacy Policy</div>
                <div className="text-white text-[12px]">and other lebal information</div>
              </div>
            </div>
            <div className="bg-[url('/images/Share.png')] w-6 h-6"></div>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </main>
  );
};

export default Tmp3;
