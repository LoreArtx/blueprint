"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import IBlueprint from '@/types/IBlueprint';

interface ProjectContextProps {
    project: IBlueprint;
    amICreator: boolean;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};

interface ProjectProviderProps {
    project: IBlueprint;
    amICreator: boolean;
    children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children, project, amICreator }) => (
    <ProjectContext.Provider value={{ project, amICreator }}>
        {children}
    </ProjectContext.Provider>
);
