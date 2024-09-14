export interface Agent {
    agentId: string;
    level: number;
    name: string;
    task: string;
    agentImage: string;
    assignTo:string;
    passiveIncome: number;
    startTime: number;
}

export interface User {
    userId: number;
    userName:string;
    avatar: string;
    coins: number;
    energy: number;
    power: number;
    data: number;
    gpus: number;
    passiveIncome: number;
    level: number;
    levelRate: number;
    // referrals: number;
    referralCode: string;
}

export type InnerElement = string | string[];
export type MiddleArray = InnerElement[];

export interface AnnotationTaskDetail{  
    prompt: string;
    response: string;
    code: string;  
    questions: MiddleArray[];
}

export interface  LabelTaskDetail{  
    images: string[];
    labels: string[];
}

export interface CodingTaskDetail {  
    problem: string[];
    answer: string[];
}

export interface OtherTaskDetail {

}

export interface Task{
    category: string;
    description: string;
    detail: LabelTaskDetail | AnnotationTaskDetail | CodingTaskDetail | OtherTaskDetail;
    logo: string;
    reward: number[];
    title: string;
    type: string;
    _id: string;
}

export interface Job{
    requiredLevel:number;
    requiredEnergy: number;
    passiveIncome: number;
    title: string;
    description:string;
    employer:string;
    assignTo:string;
    requireTime:number;
    logo:string;
    _id:string;
}