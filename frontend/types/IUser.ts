interface IUser{
    id: string
    name: string;
    email: string;
    password?: string;
    githubID?: string;
    image?: string;
    createdAt: string;
}

export default IUser