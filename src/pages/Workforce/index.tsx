import { useState, useContext } from "react";
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import { TaskModal, AgentModal } from "./modal";
import { Agent, Job } from "../../routes/types";
import TimeProgressBar from './TimeProgressBar';

const Workforce = () => {
    const [currentTab, setCurrentTab] = useState("Agents");
    const { coins,setCoins, gpus, setGpus, data, setData, energy, passiveIncome,isToggled, setToggle,agents,jobs} = useContext(MiniAppContext);
    const [jobFlag,setJobFlag] = useState(false);
    const [currentJob,setCurrentJob] = useState("");
    const [agentFlag,setAgentFlag] = useState(false);
    const [currentAgent,setCurrentAgent] = useState("");

  return (
    <main className="relative pt-14 pb-24 w-full min-h-full bg-[url('/images/background/workforce_tab_color.png')] bg-cover bg-top bg-no-repeat bg-[#5200FF64] mx-auto">
        <nav className="fixed top-0 left-0 right-0 z-10">
            <div className="flex justify-between items-center p-3 rounded-b-2xl bg-[url('/images/background/topnav_we.png')] bg-cover bg-center bg-no-repeat h-[70px]">
                <div className="relative p-3 flex justify-center w-24" onClick={() => {setCurrentTab("Agents");}} >
                    <div className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${ currentTab === "Agents" ? "block" : "hidden"}`}></div>
                    <div className="text-lg text-white font-semibold" style={{ opacity: currentTab === "Agents" ? 1 : 0.6 }}> Agents </div>
                </div>
                <div className="relative py-5 flex justify-center w-24" onClick={() => { setCurrentTab("Jobs"); }} >
                    <div className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${ currentTab === "Jobs" ? "block" : "hidden" }`} ></div>
                    <div className="text-lg text-white font-semibold" style={{ opacity: currentTab === "Jobs" ? 1 : 0.6 }} > Job Board </div>
                </div>
                <div className="relative p-3 flex justify-center w-24" onClick={() => { setCurrentTab("Upgrades"); }}>
                    <div className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${ currentTab === "Upgrades" ? "block" : "hidden" }`} ></div>
                    <div className="text-lg text-white font-semibold" style={{ opacity: currentTab === "Upgrades" ? 1 : 0.6 }} > Upgrades </div>
                </div>
            </div>
        </nav>
        <div className="flex flex-col justify-center items-center mt-8">
            <div className="font-bold text-[26px] font-gilroy text-white">{currentTab==="Agents" ? "Workforce Management" :(currentTab==="Jobs" ? "Task Directory":("Buy Boosters"))}</div>
            <div className="flex justify-center gap-3 text-white text-[14px] items-center">
                <div className="flex justify-center gap-1 items-center">
                    <div className="w-[14px] h-[14px] bg-[url('/images/coin_2.png')] bg-center bg-no-repeat bg-cover"></div>
                    <div>{ coins > 1e6 ? `${(coins/1e6).toFixed(2)}M` : coins >1e3 ? `${(coins/1e3).toFixed(2)}k`:coins}</div>
                </div>
                <div className="flex justify-center gap-1 items-center">
                    <div className="w-[14px] h-[14px] bg-[url('/images/energy.png')] bg-center bg-no-repeat bg-cover"></div>
                    <div>{energy}</div>
                </div>
                <div className="flex justify-center gap-1 items-center">
                    <div className="w-[14px] h-[14px] bg-[url('/images/gpu.png')] bg-center bg-no-repeat bg-cover"></div>
                    <div>{gpus}</div>
                </div>
                <div className="flex justify-center gap-1 items-center">
                    <div  className="w-[14px] h-[14px] bg-[url('/images/data.png')] bg-center bg-no-repeat bg-cover"></div>
                    <div>{data}</div>
                </div>
            </div>
            <div className="flex justify-center items-center text-[#ffffffc0]  gap-1">
                <div className="flex justify-center items-center">Passive Income: </div>
                <div className="flex justify-center items-center  gap-1">
                    <div className="text-[16px] font-bold text-white">{passiveIncome}</div>
                    <div className="bg-[url('/images/coin_1.png')] bg-cover w-4 h-4 rounded-full"></div>
                    <div>/sec</div>
                </div>
            </div>
            { currentTab==="Agents" ?
                agents?.map((item:Agent,idx:number)=>(
                    <div className="flex justify-between mx-auto mt-4 px-4 bg-gradient-to-b from-[#0f1f3d] to-[#000424] w-[85vw] rounded-xl" key={idx}>
                        <div className={`w-[94px] h-[128px] bg-no-repeat bg-top mt-2`} style={{backgroundImage:`url('${item.agentImage}')`}}></div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-white">
                                <div className="flex justify-center rounded-full font-inter font-bold text-[10px] w-[36px] h-[15px]" style={{background:`linear-gradient(to bottom,${item.level < 7 ? "rgb(216, 100, 247)" : item.level < 14 ? "rgb(247,205,100)" : "rgb(247,100,100)"} , ${item.level < 7 ? "rgb(186, 67, 246)" : item.level < 14 ? "rgb(246,130,67)" : "rgb(246,67,67)"} `}}>lvl:{item.level}</div>
                                <div className="flex justify-center font-roboto font-bold text-[16px]">{item.name}</div>
                            </div>
                            {item.assignTo && item.assignTo !=="" ? (
                                <div className="flex flex-col justify-center">
                                    <div  className="flex gap-2">
                                        <div className="font-roboto font-medium text-[12px] text-[#ffffff8d]">Task:</div>
                                        <div className="font-roboto text-[12px] text-white">{item.task}</div>
                                    </div>
                                    {/* <div className="flex gap-2">
                                        <div className="font-roboto font-medium text-[12px] text-[#ffffff8d]">Remaining Time:</div>
                                        
                                        <div className="flex">
                                            <div className="font-roboto text-[12px] text-white">14</div>
                                            <div className="font-roboto font-medium text-[12px] text-[#ffffff8d]">m</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-roboto text-[12px] text-white">35</div>
                                            <div className="font-roboto font-medium text-[12px] text-[#ffffff8d]">s</div>
                                        </div>
                                    </div>
                                    <div className="flex border-[1px] border-[#FFFFFF40] rounded-full mt-2 p-[2px] w-[45vw] h-[20px] bg-[#111111b3]">
                                        <div
                                        className="bg-[url('/images/stripes.png')] bg-cover rounded-full flex flex-row-reverse p-[2px]"
                                        style={{ width: `${100*(item.startTime - Math.floor( Date.now()/1000))/jobs.filter((job:Job)=>job._id === item.assignTo && job.assignTo === item.agentId)[0]*3600}%` }}
                                        >
                                        </div>
                                    </div> */}
                                    <TimeProgressBar startTime={1726274562137} endTime={1726274562137 + 2000000} />

                                    <div className="flex justify-center text-white text-[10px] font-bold items-center mt-2 gap-1 text-[#ffffffb3]">
                                        <div>{item.passiveIncome}</div>
                                        <div className="bg-[url('/images/coin_1.png')] bg-cover w-4 h-4 rounded-full"></div>
                                        <div>/sec</div>
                                    </div>
                                </div>
                            ):(
                            <div className="flex flex-col justify-center items-center gap-2 text-[#FFFFFF40] font-roboto">
                                <div  className="flex w-44">
                                Assign a task so that he doesn't chill out...
                                </div>
                                <div className="flex bg-gradient-to-r from-[#03cea4] to-[#8e37fe] text-white font-bold rounded-xl w-44 h-9 justify-center items-center" onClick={()=>{setJobFlag(true); setToggle(true); setCurrentAgent(item.agentId);}}>Select Task</div>
                            </div>
                            )}
                        </div>
                    </div>
                ))
                :(
                currentTab === "Jobs" ?
                jobs?.map((item:Job,idx:number)=>(
                    <div className="flex justify-center mx-auto mt-4 p-4 bg-gradient-to-b from-[#0f1f3d] to-[#000424] w-[85vw] rounded-xl relative" key={idx}>
                        <div className="absolute top-2 right-3 flex justify-center items-center  text-white text-[10px] gap-2">
                            <div className="flex justify-center items-center gap-1">
                                <div className="bg-[url('/images/level.png')] bg-cover bg-no-repeat w-3 h-3 rounded-full"></div>
                                <div>lvl:{item.requiredLevel}</div>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="bg-[url('/images/energy.png')] bg-cover bg-no-repeat w-3 h-3 rounded-full"></div>
                                <div>{item.requiredEnergy}</div>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="bg-[url('/images/coin_2.png')] bg-cover bg-no-repeat w-3 h-3 rounded-full"></div>
                                <div>{item.passiveIncome}/sec</div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <div className={`flex justify-center items-top w-[36px] h-[36px] bg-center bg-no-repeat pt-2`}  style={{backgroundImage:`url('${item.logo}')`}}></div>
                            <div className="flex flex-col justify-center text-white w-[65vw]">
                                <div className="font-roboto font-bold text-[14px]">{item.title}</div>
                                <div className="font-roboto text-[10px]">Employer: {item.employer}</div>
                                <div className="font-roboto text-[14px] gap-y-[1px]">{item.description}</div>
                                {item.assignTo !=="" && item.assignTo ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex justify-center items-center bg-[#ffffff09] border-[1px] border-[#ffffff29] text-white rounded-xl w-[65vw] h-[36px] mt-2">
                                            {agents.filter((agent:Agent)=>agent.agentId === item.assignTo).map((item:Agent,idx:number)=> (
                                                <div className="flex justify-center items-center gap-2" key={idx}>
                                                    <div className="flex justify-center rounded-full font-inter font-bold text-[10px] w-[36px] h-[15px]" style={{background:`linear-gradient(to bottom,${item.level < 7 ? "rgb(216, 100, 247)" : item.level < 14 ? "rgb(247,205,100)" : "rgb(247,100,100)"} , ${item.level < 7 ? "rgb(186, 67, 246)" : item.level < 14 ? "rgb(246,130,67)" : "rgb(246,67,67)"} `}}>lvl:{item.level}</div>
                                                    <div className="flex justify-center font-roboto font-bold text-[16px]">{item.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-center items-center translate-y-1">
                                            <div className="bg-[url('/images/progress.png')] w-[14px] h-[14px]"></div>
                                            <div>work in process...</div>
                                        </div>
                                    </div>
                                ):(
                                    <div className="flex justify-center items-center bg-gradient-to-r from-[#03cea4] to-[#8e37fe] text-white rounded-xl w-[65vw] h-[36px] mt-2" onClick={()=>{setAgentFlag(true); setToggle(true); setCurrentJob(item._id); }}>Assign Agent</div>
                                )}
                            </div>
                        </div>
                    </div>
                )):
                (<div>
                    <div className="relative flex justify-between mx-auto bg-gradient-to-b from-[#0f1f3d] to-[#000424] w-[85vw] p-4 mt-4 rounded-xl">
                        <div className={`flex justify-center items-top w-[36px] h-[36px] bg-center bg-cover bg-no-repeat bg-[url('/images/gpu.png')]`}></div>
                        <div className="flex flex-col  w-[65vw]">
                            <div className="font-roboto font-bold text-[16px] text-white">GPU</div>
                            <div className="font-roboto font-semibold text-[10px] text-[#ffffff39]">You have: {gpus}</div>
                            <div className="font-roboto text-[14px] text-[#ffffffb9]">More GPUs allow agents to perform more tasks simultaneously</div>
                            {
                                coins >= 1000 ? (
                                <div className="flex justify-center items-center gap-1 bg-gradient-to-r from-[#03cea4] to-[#8e37fe] text-white font-bold rounded-xl w-[65vw] h-[36px] mt-2" onClick={()=>{setCoins(coins-1000);setGpus(gpus+1);}}>
                                    1000
                                    <div className="bg-[url('/images/coin_1.png')] bg-cover w-4 h-4 rounded-full"></div>
                                </div>
                                ):(
                                    <div className="flex justify-center items-center bg-[#ffffff39] font-bold rounded-xl w-[65vw] h-[36px] text-red-400 mt-2">Not Enough Coins</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="relative flex justify-between mx-auto bg-gradient-to-b from-[#0f1f3d] to-[#000424] w-[85vw] p-4 mt-4 rounded-xl">
                        <div className={`flex w-[36px] h-[36px] bg-center bg-no-repeat bg-[url('/images/data.png')]`}></div>
                        <div className="flex flex-col  w-[65vw]">
                            <div className="font-roboto font-bold text-[16px] text-white">Data</div>
                            <div className="font-roboto font-semibold text-[10px] text-[#ffffff39]">You have: {data}</div>
                            <div className="font-roboto text-[14px] text-[#ffffffb9]">More data improves the starting level of new agents</div>
                            {coins >= 1000 ? (
                                <div className="flex justify-center items-center gap-1 bg-gradient-to-r from-[#03cea4] to-[#8e37fe] text-white font-bold rounded-xl w-[65vw] h-[36px] mt-2" onClick={()=>{setCoins(coins-1000);setData(data+1);}}>
                                    1000
                                    <div className="bg-[url('/images/coin_1.png')] bg-cover w-4 h-4 rounded-full"></div>
                                </div>
                            ):(
                                <div className="flex justify-center items-center bg-[#ffffff39] font-bold rounded-xl w-[65vw] h-[36px] text-red-400 mt-2">Not Enough Coins</div>
                            )}
                        </div>
                    </div>
                </div>))
            }
        </div>
        {currentAgent !=="" ? <TaskModal isOpen={jobFlag && isToggled} onClose={()=>{setJobFlag(false); setToggle(false); }} agentId={currentAgent}/>: <div></div>}
        {currentJob !=="" ? <AgentModal isOpen={agentFlag && isToggled} onClose={()=>{setAgentFlag(false); setToggle(false); }} jobId={currentJob}/> : <div></div>}
    </main>
  );
};

export default Workforce;