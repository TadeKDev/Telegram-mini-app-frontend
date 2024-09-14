import React from "react";
import { useContext } from "react";
import TopNavBar from "../../components/TopNavBar";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import { Agent } from "../../routes/types";

const AgentPage = () => {
  const {coins, setCoins, agents, setAgents, passiveIncome, setPassiveIncome} = useContext(MiniAppContext);

  const generateAgent = () => {
    if (coins >= 100 && agents.length < 12) {
      const newAgent: Agent = {
        agentId: Date.now().toString(),
        level: 1,
        name:"New Agent",
        task:"",
        agentImage: "/images/agent_l1.png",
        passiveIncome: 1,
        assignTo:"",
        startTime: 0
      };
      setAgents([...agents, newAgent]);
      setCoins(coins - 100);
      setPassiveIncome((prevIncome: number) => prevIncome + 1);
    }
  };

  const onDragStart = (e: React.DragEvent, agentId: string) => {
    e.dataTransfer.setData("text/plain", agentId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedAgentId = e.dataTransfer.getData("text");
    const draggedAgent = agents.find((a: Agent) => a.agentId === draggedAgentId);
    const targetAgent = agents.find((a: Agent) => a.agentId === targetId);

    if (
      draggedAgent &&
      targetAgent &&
      draggedAgent.agentId !== targetAgent.agentId &&
      draggedAgent.level === targetAgent.level
    ) {
      const newAgents = agents.filter(
        (a: Agent) => a.agentId !== draggedAgent.agentId && a.agentId !== targetAgent.agentId
      );
      const mergedAgent: Agent = {
        agentId: Date.now().toString(),
        name:"new Agent",
        level: draggedAgent.level + 1,
        task:"",
        agentImage: `/images/agent_l${Math.floor((draggedAgent.level + 1)/7) + 1}.png`,
        passiveIncome: draggedAgent.passiveIncome * 2,
        assignTo:"",
        startTime: 0
      };
      newAgents.push(mergedAgent);
      setAgents(newAgents);
      setPassiveIncome(
        (prevIncome: number) =>{ return prevIncome - draggedAgent.passiveIncome - targetAgent.passiveIncome + mergedAgent.passiveIncome}
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pb-24 bg-[url('/images/background/setting_tab_color.png')] bg-no-repeat bg-top bg-cover">
      <TopNavBar />
      <h1 className="text-3xl font-bold mb-2 text-white mt-20 font-gilroy text-[26px]">Your Agents</h1>
      <div className="flex justify-center items-center mb-4 text-[#ffffffc0] gap-1">
        <div className="flex justify-center items-center">Passive Income: </div>
        <div className="flex justify-center items-center">
        <div className="flex justify-center items-center gap-1">
            <div className="text-[16px] font-bold text-white">{passiveIncome}</div>
            <div className="bg-[url('/images/coin_1.png')] bg-cover w-4 h-4 rounded-full"></div>
        </div>
        <div>/sec</div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#130122] to-[#0F1F3D] px-[10px] pt-[10px] rounded-2xl shadow-md mb-4 w-[360px] h-[430px] border-[1px] border-[#ffffff40] " >
        <div className="rounded-lg grid grid-cols-3 gap-x-[10px] gap-y-[10px] justify-center items-center overflow-auto w-[340px] h-[420px]"  style={{scrollbarWidth:"none"}}>
          {agents.map((agent: Agent) => (
            <div
              key={agent.agentId}
              draggable
              onDragStart={(e) => onDragStart(e, agent.agentId)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, agent.agentId)}
              className="w-[108px] h-[108px] rounded-lg flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <img src={`/images/agents/robot${Math.floor(agent.level/7) + 1}.png`}
                  alt={`Level ${agent.level} Agent`}
                  className="w-full h-full object-cover rounded-md"
                />
                <span className="absolute top-0 right-0 text-white rounded-bl-md rounded-tr-md px-[8px] py-[2px] text-[10px] font-semibold" style={{background:`linear-gradient(to bottom,${agent.level < 7 ? "rgb(216, 100, 247)" : agent.level < 14 ? "rgb(247,205,100)" : "rgb(247,100,100)"} , ${agent.level < 7 ? "rgb(186, 67, 246)" : agent.level < 14 ? "rgb(246,130,67)" : "rgb(246,67,67)"} `}}>
                  {agent.level}
                </span>
              </div>
            </div>
          ))}
          {[...Array(12 - agents.length)].map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-[108px] h-[108px] rounded-lg"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, `empty-${index}`)}
            >
              <img
                  src="/images/agents/robot_e.png"
                  className="w-full h-full object-cover rounded-md"
                />
            </div>
          ))}
        </div>
      </div>

      <button onClick={generateAgent} disabled={coins < 100 || agents.length >= 20} className="flex flex-col bg-gradient-to-r from-[#03cea4] to-[#8e37fe] text-white font-bold font-roboto text-[14px] rounded-xl w-40 h-11 justify-center items-center mt-2">
        <div className="flex justify-center items-center">Generate Agent</div>
        <div className="flex justify-center gap-1 items-center">
          <div>100</div>
          <div className="bg-[url('/images/coin_1.png')] bg-cover w-3 h-3 rounded-full"></div>
        </div>
      </button>
    </div>
  );
};

export default AgentPage;