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
    Idle ,
    Runing,
    Finish,
    Fail,
    
}

export interface Task{

    title: string
    startTask: Date,
    endTask:Date,
    totalTime:number,
    relaxTime:number,
    status:TaskStatus,
    uid?:string,

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
