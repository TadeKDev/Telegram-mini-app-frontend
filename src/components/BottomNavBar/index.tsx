import React from "react";
import {useContext} from 'react';
import AgentIcon from "../icons/agent";
import AirdropIcon from "../icons/airdrop";
import HomeIcon from "../icons/home";
import EarnIcon from "../icons/earn";
import WorkspaceIcon from "../icons/workspace";
import { Link, useLocation } from "react-router-dom";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const {isToggled} = useContext(MiniAppContext);
  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: AgentIcon, label: "Agents", path: "/agents" },
    { icon: WorkspaceIcon, label: "Workforce", path: "/workforce" },
    { icon: EarnIcon, label: "Earn", path: "/earn" },
    { icon: AirdropIcon, label: "Airdrop", path: "/airdrop" },
  ];

  return (
    <nav className={`fixed bottom-4 left-4 right-4 bg-gradient-to-b from-[#000000] to-[#0F1F3D] border-[1px] border-[#FFFFFF40] rounded-3xl z-40 ${isToggled ? "hidden": "block"} `}>
      <div className="flex justify-around items-center p-3">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              className="relative flex items-center justify-center"
              key={idx}
            >
              <div
                className={`absolute -top-4 bg-[url('/images/light_effect_1.png')] bg-cover w-10 h-10 ${
                  location.pathname === item.path ? "block" : "hidden"
                }`}
              ></div>
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3`}
              >
                <Icon
                  selected={location.pathname === item.path ? true : false}
                />
                {/* <span className="text-xs mt-1">{item.label}</span> */}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
