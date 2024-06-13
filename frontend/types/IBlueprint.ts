import ICriteria from "./ICriteria";

interface IBlueprint {
    id: string;
    title: string;
    progress: number;
    deadline: string; 
    description: string;
    criterias: ICriteria[];
    privacy: 'public' | 'private'; 
    creatorId: string;
    isFinished: boolean;
    users: string[];
    createdAt: string;
    finishedAt?: string;
}

export default IBlueprint