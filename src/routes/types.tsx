export interface Agent {
    agentId: string;
    level: number;
    agentImage: string;
    passiveIncome: number;
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

export interface Task{
    category: string;
    description: string;
    detail: LabelTaskDetail | AnnotationTaskDetail | CodingTaskDetail;
    logo: string;
    reward: number[];
    title: string;
    type: string;
    _id: string;
}