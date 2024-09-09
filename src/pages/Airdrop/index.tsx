import { useState } from "react";
// import { useContext } from "react";
// import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import GlobeIcon from "../../components/icons/globe_icon";
import FriendIcon from "../../components/icons/friend_icon";
// import { Coins } from "lucide-react";
// import { Button } from "./ui/button";

const Airdrop = () => {
  const [currentTab, setCurrentTab] = useState("friends");
  return (
    <main>
      <div className="flex flex-col items-center min-h-screen p-4 bg-[#5200FF64]">
        <nav className="fixed top-0 left-0 right-0">
          <div className="flex justify-between items-center bg-gradient-to-b px-6 from-[#130122] to-[#0F1F3D] rounded-b-2xl">
            <div
              className="relative p-3 flex justify-center items-center w-36"
              onClick={() => {
                setCurrentTab("friends");
              }}
            >
              <div
                className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${
                  currentTab === "friends" ? "block" : "hidden"
                }`}
              ></div>
              <FriendIcon selected={currentTab === "friends" ? true : false} />
              <div
                className="ml-2 text-lg text-white font-semibold"
                style={{ opacity: currentTab === "friends" ? 1 : 0.6 }}
              >
                Friends
              </div>
            </div>
            <div
              className="relative py-5 flex justify-center w-36 items-center"
              onClick={() => {
                setCurrentTab("global");
              }}
            >
              <div
                className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${
                  currentTab === "global" ? "block" : "hidden"
                }`}
              ></div>
              <GlobeIcon selected={currentTab === "global" ? true : false} />
              <div
                className="ml-2 text-lg text-white font-semibold"
                style={{ opacity: currentTab === "global" ? 1 : 0.6 }}
              >
                Global
              </div>
            </div>
          </div>
          <div className="[filter:url('#flt_tag')]">
            <div className="w-[200px] h-[200px] mx-auto [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] bg-[url('/images/tmp.png')] bg-cover"></div>
            <svg
              className="hidden absolute w-0 h-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </nav>
      </div>
    </main>
    
  );
};

export default Airdrop;
