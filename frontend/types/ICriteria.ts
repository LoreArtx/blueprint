import IComment from "./IComment";

interface ICriteria{
    id: string;
    title: string;
    description: string;
    teacherID: string;
    value: number;
    comments: IComment[];
}

export default ICriteria