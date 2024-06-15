// context/ProjectContext.tsx
"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import IBlueprint from '@/types/IBlueprint';

interface ProjectContextProps {
    project: IBlueprint;
    amICreator: boolean;
    // eslint-disable-next-line no-unused-vars
    updateProject: (updatedProject: IBlueprint) => void;
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

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children, project, amICreator }) => {
    const [currentProject, setCurrentProject] = useState(project);

    const updateProject = useCallback((updatedProject: IBlueprint) => {
        setCurrentProject(updatedProject);
    }, []);

    return (
        <ProjectContext.Provider value={{ project: currentProject, amICreator, updateProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
