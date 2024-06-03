import IComment from "./IComment";

interface ICriteria{
    id: string;
    title: string;
    description: string;
    teacherID: string;
    value: number;
    comments: IComment[];
    isFinished:boolean;
}

export default ICriteria