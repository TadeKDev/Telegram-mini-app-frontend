import { ReactNode, useEffect, useState, createContext } from "react";
import axiosInstance from '../api';
import {Agent, User, Task} from './types';
// import { useInitData } from "@telegram-apps/sdk-react";

export type MiniAppContextProviderProps = {
  children?: ReactNode;
};

// type MiniAppContextType = [
//   number,
//   React.Dispatch<React.SetStateAction<number>>,
//   Agent[],
//   React.Dispatch<React.SetStateAction<Agent[]>>,
//   number,
//   React.Dispatch<React.SetStateAction<number>>,
//   number,
//   React.Dispatch<React.SetStateAction<number>>,
//   number,
//   React.Dispatch<React.SetStateAction<number>>,
//   User,
//   React.Dispatch<React.SetStateAction<User>>,
//   string,
//   React.Dispatch<React.SetStateAction<string>>,
//   number,
//   React.Dispatch<React.SetStateAction<number>>,
//   number,
//   React.Dispatch<React.SetStateAction<number>>,
//   number,
//   React.Dispatch<React.SetStateAction<number>>
// ];

export const MiniAppContext = createContext<any>(null);
export const MiniAppContextProvider = ({
  children,
}: MiniAppContextProviderProps) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(0);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [passiveIncome, setPassiveIncome] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(1000);
  const [power, setPower] = useState<number>(0);
  const [globalRank, setGlobalRank] = useState(42);
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
  const [currentTask,setCurrentTask] = useState<Task>({
    category: "Social Task",
    description: "Follow our official FB account for updates",
    detail: { images: [], labels: [] },
    logo: "/images/facebook.png",
    reward:[0,0],
    title: "Subscribe us on Facebook",
    type: "data_labeling",
    _id: ""
  });
  const [currentTaskResult,setCurrentTaskResult] = useState<number[]>();

  // const initData = useInitData();

  const getInfo = ()=>{
    axiosInstance.get('').then(response => {
      if (response.status === 200){
        const data = response.data;
        setCurrentUser({userId: data.userId,
          userName: data.userName,
          avatar: data.avatar,
          coins: data.coins,
          energy: data.energy,
          power: data.power,
          data: data.data,
          gpus: data.gpus,
          passiveIncome: data.passiveIncome,
          level:data.level,
          levelRate: data.levelRate,
          // referrals: data.referral,
          referralCode: data.referralCode
        });
        setCoins(data.coins);
        setGpus(data.gpus);
        setData(data.data);
        setEnergy(data.energy);
        setPower(data.power);
        setPassiveIncome(data.passiveIncome);
        setLevel(data.level);
        setLevelRate(data.levelRate);
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
          console.log(response.status)
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
    console.log("update passive Income")
    const updateCointimer = setInterval(() => {
      setCoins((prevCoins) => prevCoins + passiveIncome);
    },1000);
    return () => clearInterval(updateCointimer);
  }, [passiveIncome]);
  
  useEffect(()=>{
    if(!flag) return
    console.log("update coins")
    axiosInstance.post('/updatecoins',{coins: coins - currentUser.coins,levelRate}).then(
      response => {
        if (response.status === 200) {
          setCoins((prevCoins) => prevCoins + response.data.referralIncome);
          setCurrentUser({...currentUser,coins:coins+response.data.referralIncome, levelRate});
        } else{
          console.log(response.data.message);
          setCoins((prevCoins) => prevCoins - 3*passiveIncome);
        }
      }
    ).catch(
      function (error) {
        console.log(error);
      }
    );
  },[Math.floor(coins / (3*passiveIncome))]);

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
        currentTask,
        setCurrentTask,
        currentTaskResult,
        setCurrentTaskResult,
        isToggled,
        setToggle
      }}
    >
      {children}
    </MiniAppContext.Provider>
  );
};
