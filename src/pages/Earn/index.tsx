import { useState, useContext } from "react";
import {LabelTaskModal,AnnotationTaskModal, RewardModal} from '../Tasks';
import { MiniAppContext } from "../../routes/MiniAppContextProvider";
import { Task } from "../../routes/types";

const Earn = () => {
  const [currentTab, setCurrentTab] = useState("DeTask");
  const {isToggled, setToggle,coins,setCoins,power,setPower,currentUser,setCurrentUser, tasks} = useContext(MiniAppContext);
  const [isFinished,setFinished] = useState(true);
  const [index,setIndex] = useState("");
  const task = tasks.filter((task:Task)=> task._id === index)[0];
  const handleFinish = ()=>{
    setToggle(true);
    setFinished(true);
  }

  const handleGetReward = ()=>{
    if(task?.reward[0]>0){
      setCoins(coins + task.reward[0]);
      setCurrentUser({...currentUser, coins: currentUser.coins + task.reward[0]});
    }
    if(task?.reward[1]>0){
      setPower(power + task.reward[1]);
      setCurrentUser({...currentUser, power: currentUser.power + task.reward[1]});
    }
    setToggle(false);
  }

  return (
    <main className="relative pt-24 pb-24 w-full min-h-full bg-[url('/images/numbers.png')] bg-cover bg-[#5200FF64]">
      <nav className="fixed top-0 left-0 right-0">
        <div className="flex justify-between items-center bg-gradient-to-b px-6 from-[#130122] to-[#0F1F3D] rounded-b-2xl">
          <div className="relative p-3 flex justify-center w-24" onClick={() => {setCurrentTab("DeTask");}} >
            <div
              className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${
                currentTab === "DeTask" ? "block" : "hidden"
              }`}
            ></div>
            <div
              className="text-lg text-white font-semibold"
              style={{ opacity: currentTab === "DeTask" ? 1 : 0.6 }}
            >
              Detask
            </div>
          </div>
          <div
            className="relative py-5 flex justify-center w-24"
            onClick={() => {
              setCurrentTab("Social Task");
            }}
          >
            <div
              className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${
                currentTab === "Social Task" ? "block" : "hidden"
              }`}
            ></div>
            <div
              className="text-lg text-white font-semibold"
              style={{ opacity: currentTab === "Social Task" ? 1 : 0.6 }}
            >
              Social
            </div>
          </div>
          <div
            className="relative p-3 flex justify-center w-24"
            onClick={() => {
              setCurrentTab("Educational Task");
            }}
          >
            <div
              className={`absolute bottom-0 bg-[url('/images/light_effect_3.png')] bg-cover w-10 h-10 ${
                currentTab === "Educational Task" ? "block" : "hidden"
              }`}
            ></div>
            <div
              className="text-lg text-white font-semibold"
              style={{ opacity: currentTab === "Educational Task" ? 1 : 0.6 }}
            >
              Education
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col px-4">
        <div className="text-sm text-[#ffffffc0] font-semibold mt-4 ">
          {currentTab}
        </div>
        {tasks.filter((task: Task)=>task.category === currentTab).map((task:Task, idx: number) => (
          <div
            className="flex justify-between items-center mt-2 border-[1px] border-[#ffffff16] p-3 rounded-3xl bg-gradient-to-b from-[#000000] to-[#0f1f3d]"
            key={idx} onClick={()=>{
              setToggle(true);
              setFinished(false);
              setIndex(task._id);
            }}>
            <img className="w-14 h-14 object-contain" src={task.logo} />
            <div className="ml-2 w-60">
              <div className="text-white font-semibold text-sm">
                {task.title}
              </div>
              <div className="text-sm text-[#ffffffc0]">
                {task.description}
              </div>
            </div>
            <div className="w-20 h-20 flex justify-center items-center">
              <div className="bg-[url('/images/done.png')] w-[30px] h-[37px]"></div>
            </div>
          </div>
        ))}
      </div>

      {index !== "" && task?.type === "data_labeling" ? 
      (<LabelTaskModal isOpen={isToggled && !isFinished} onClose={()=>setToggle(false)} taskIndex={index} onFinish ={ handleFinish} />): 
      (index !== "" && task?.type === "Annotation" ? (<AnnotationTaskModal isOpen={isToggled && !isFinished} onClose={()=>setToggle(false)} taskIndex={index} onFinish={handleFinish}/>):(<div></div>))}
      <RewardModal isOpen={isToggled && isFinished} onClose={()=>setToggle(false)} taskIndex={index} onFinish={handleGetReward}/>
    </main>
  );
};

export default Earn;