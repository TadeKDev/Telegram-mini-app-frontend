import React, { useContext } from "react";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import {useNavigate} from "react-router-dom";

const TopNavBar: React.FC = () => {
  // const location = useLocation();
  const {coins,power} = useContext(MiniAppContext);
  const navigate = useNavigate();
  const handleSettingClick = ()=>{
    navigate('/settings');
  }

 

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="flex flex-col bg-gradient-to-b from-[#130122]">
        <div className="flex justify-between items-center p-3 rounded-b-2xl bg-[url('/images/background/topnav_color.png')] bg-cover bg-center bg-no-repeat h-[70px]">
          <div className="bg-[url('/images/setting.png')] bg-cover w-7 h-7" onClick={handleSettingClick}></div>
          <div className="bg-[url('/images/coin.png')] bg-center bg-no-repeat w-24 h-9 pr-3 flex flex-row-reverse items-center text-white text-sm font-semibold">
            { coins > 1e6 ? `${(coins/1e6).toFixed(2)}M` : coins >1e3 ? `${(coins/1e3).toFixed(2)}k`:coins}
          </div>
          <div className="bg-[url('/images/logo.png')] bg-cover bg-no-repeat w-9 h-10"></div>
          <div className="bg-[url('/images/power.png')] bg-center bg-no-repeat w-24 h-9 pl-4 flex items-center text-white  text-sm font-semibold">{power}</div>
          <div className="bg-[url('/images/user_icon.png')] bg-cover w-8 h-8"></div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
