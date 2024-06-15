import IComment from "./IComment";

interface ICriteria{
    id: string;
    title: string;
    description: string;
    creatorEmail: string;
    studentEmail:string;
    value: number;
    comments: IComment[];
    isFinished:boolean;
}

export default ICriteria