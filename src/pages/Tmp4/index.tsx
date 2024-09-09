import { useContext, useEffect, useState} from "react";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import {useNavigate} from 'react-router-dom';

const Tmp4 = () => {
  const {currentLanguage, setCurrentLanguage} = useContext(MiniAppContext);
  const navigate = useNavigate();
  const [language,setLanguage] = useState("English (US)");

  const languageItems = [
    {label: "English (US)", imagePath: "/images/country_US.png"},
    {label: "English (UK)", imagePath: "/images/country_UK.png"},
    {label: "Polski", imagePath: "/images/country_PL.png"},
    {label: "Deutsch", imagePath: "/images/country_DE.png"},
    {label: "Español", imagePath: "/images/country_ES.png"},
    {label: "Français", imagePath: "/images/country_FR.png"},
  ];

  useEffect(()=>{
    setLanguage(currentLanguage);
  },[])

  const handleExecuteButton = ()=>{
    setCurrentLanguage(language);
    navigate("/settings");
  }

  return (
    <main className="relative w-full min-h-full bg-[url('/images/background/setting_tab_color.png')] bg-cover bg-[#5200FF64]">
      <nav className="fixed top-0 left-0 right-0">
        <div className='flex flex-col'>
          <div className="flex justify-between items-center bg-gradient-to-b from-[#130122] to-[#0F1F3D] px-6 py-3 rounded-b-2xl border-[1px] border-[#ffffff2f]">
            <div className="bg-[url('/images/_close.png')] bg-cover w-8 h-8" onClick={()=>{navigate('/settings')}}></div>
            <div className="font-gilroy text-[20px] font-bold text-white">Change Language</div>
            <div className="bg-[url('/images/Check.png')] bg-cover w-8 h-8" onClick={handleExecuteButton}></div>
          </div>
          <div className="-translate-y-1 mx-auto translate-x-[2px]">
            <svg height="4" width="30" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0 L0 4 L30 4 Z" fill="#A5F9FF" />
            </svg>
          </div>
        </div>
      </nav>
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col mt-24">
          <div className="flex font-gilroy font-semibold text-[16px] ml-6 text-white">Languages</div>
          {languageItems.map((item, idx) => {
            console.log(item);
            return(
              <div className="flex justify-between items-center bg-gradient-to-t from-[#000000] to-[#0f1f3d] mx-3 mt-2 rounded-xl px-4 py-4" key={idx}>
                <div className="flex items-center gap-4">
                  <div className='w-[32px] h-[32px] rounded-full bg-center' style={{ backgroundImage: `url(${item.imagePath})` }} ></div>
                  <div className="text-white font-semibold text-[16px]">{item.label}</div>
                </div>
                <div className='bg-cover w-[24px] h-[24px]' style ={{backgroundImage: `${language === item.label ? 'url(/images/done__.png)':'url(/images/__done.png)'}`}} onClick={()=>{setLanguage(item.label)}}></div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
};

export default Tmp4;
