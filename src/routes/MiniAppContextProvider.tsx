import { ReactNode, useEffect, useState, createContext } from "react";
import axiosInstance from '../api';
import {Agent, User, Task, Job} from './types';
// import { useInitData } from "@telegram-apps/sdk-react";

export type MiniAppContextProviderProps = {
  children?: ReactNode;
};

export const MiniAppContext = createContext<any>(null);
export const MiniAppContextProvider = ({
  children,
}: MiniAppContextProviderProps) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(0);
  const [passiveIncome, setPassiveIncome] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(1000);
  const [power, setPower] = useState<number>(0);
  const [globalRank, setGlobalRank] = useState(0);
  const [gpus, setGpus] = useState<number>(0);
  const [data, setData] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const[isToggled, setToggle] = useState(false);
  const [referralCode, setReferralCode] = useState("PLAYER123");
  const [currentLanguage, setCurrentLanguage] = useState("English (US)");
  const [clickCount, setClickCount] = useState(0);
  const [levelRate, setLevelRate] = useState(0);
  const [currentUser, setCurrentUser] = useState<User>({
    userId: 0,
    userName:"",
    avatar: "",
    coins: 0,
    energy: 0,
    power: 0,
    data: 0,
    gpus: 0,
    passiveIncome: 0,
    level:1,
    levelRate: 0,
    // referrals: 5,
    referralCode: "PLAYER123",
  });
  const [tasks,setTasks] = useState<Task[]>([]);
  const [jobs,setJobs] = useState<Job[]>([]);
  const [agents,setAgents] = useState<Agent[]>([]);

  // const initData = useInitData();

  const getInfo = ()=>{
    axiosInstance.get('').then(response => {
      if (response.status === 200){
        const { user, agents, tasks, jobs} = response.data;
        setCurrentUser({userId: user.userId,
          userName: user.userName,
          avatar: user.avatar,
          coins: user.coins,
          energy: user.energy,
          power: user.power,
          data: user.data,
          gpus: user.gpus,
          passiveIncome: user.passiveIncome,
          level:user.level,
          levelRate: user.levelRate,
          // referrals: referral,
          referralCode: user.referralCode
        });
        setCoins(user.coins);
        setGpus(user.gpus);
        setData(user.data);
        setEnergy(user.energy);
        setPower(user.power);
        setPassiveIncome(user.passiveIncome);
        setLevel(user.level);
        setLevelRate(user.levelRate);
        setTasks(tasks);
        setJobs(jobs);
        setAgents(agents);
        setFlag(!flag);
      }
    })  
    .catch(error => {  
        console.error('Error fetching data:', error);  
    });
  } 

  useEffect(()=>{
    console.log("update user information")
    // if (initData && initData.user){
      const user = {id:7376656100, username:"tangled_puzzle"};
      axiosInstance.post('/auth/signin',{userId: user.id}).then(response =>{
        if (response.status === 200){
          localStorage.setItem('token',response.data.token);
          console.log("SignIn Success")
          getInfo();
        }}
      ).catch(error => {  
          if(error.status === 401){
            axiosInstance.post('/auth/signup',{userId: user.id, userName: user.username}).then(response => {
              if(response.status === 200){
                localStorage.setItem('token',response.data.token);
                getInfo();
                console.log("SignUp Success")
              }
              else{
                console.log(response.status);
              }
            })
            .catch(error => {  
              console.error('Error fetching data:', error);  
            });
          } 
        }
      );
    // }
  }, []);
  
  useEffect(() => {
    if(!flag) return
    const updateCointimer = setInterval(() => {
      console.log("update passive Income")
      setCoins((prevCoins) => prevCoins + passiveIncome);
    },1000);
    return () => clearInterval(updateCointimer);
  }, [flag]);
  
  useEffect(()=>{
    if(!flag) return
    console.log("update coins");
    axiosInstance.post('/updatecoins',{coins,levelRate,gpus,data,energy,power,passiveIncome,level, agents}).then(
      response => {
        if (response.status === 200) {
          // setCoins((prevCoins) => prevCoins + response.data.referralIncome);
          setCurrentUser({...currentUser,coins, levelRate, gpus, data,energy,power,passiveIncome,level});
        } else{
          console.log(response.data.message);
          setCoins((prevCoins) => prevCoins - 6*passiveIncome);
        }
      }
    ).catch(
      function (error) {
        console.log(error);
      }
    );
  },[Math.floor(coins / (6*passiveIncome))]);

  return (
    <MiniAppContext.Provider
      value={{
        coins,
        setCoins,
        agents,
        setAgents,
        energy,
        setEnergy,
        power,
        setPower,
        jobs,
        setJobs,
        tasks,
        setTasks,
        globalRank,
        setGlobalRank,
        level,
        setLevel,
        currentUser,
        setCurrentUser,
        referralCode,
        setReferralCode,
        gpus,
        setGpus,
        data,
        setData,
        passiveIncome,
        setPassiveIncome,
        currentLanguage,
        setCurrentLanguage,
        clickCount,
        setClickCount,
        levelRate,
        setLevelRate,
        isToggled,
        setToggle
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
};