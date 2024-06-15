import ICriteria from "./ICriteria";

interface IBlueprint {
    id: string;
    title: string;
    deadline: string; 
    description: string;
    criterias: ICriteria[];
    privacy: 'public' | 'private'; 
    creatorEmail: string;
    isFinished: boolean;
    users: string[];
    createdAt: string;
    finishedAt?: string;
}

export default IBlueprint