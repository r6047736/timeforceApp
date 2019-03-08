export interface User {
    uid: string;
    roles?:any;
    createTime?: any;
    login_time: any;
    displayName?: any;
    create_time?:any;
    photoURL:string;
    
}

export enum TaskStatus {
    Idle = 0,
    Runing,
    Finish,
    Fail,
    End,

    
}

export interface Task{
    id:string,
    title: string,
    titlePublic?:boolean,
    startTask: number,
    endTask:number,
    totalTime:number,
    relaxTime:number,
    status:TaskStatus,
    uid?:string,
    room?:string,
    location?:string,
    memo?:string,
    createAt: number,
    hardcore:boolean,
    type:string // tomato , checkin, 
}

export class Task{
    

}

export interface Motivation{
    quote:string,
    shortTermGoal:string,
    longTermGoal:string,
    toSelfWeek:string,
    toSelfMonth:string,
    toSelfYear:string,
    roleModel: string,
    roleModelImage:string,

 }
