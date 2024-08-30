"use client";

import React, { createContext, useState, useContext } from 'react';

export type WorkspaceContextType = {
    workspaceId: string;
    workspaceName: string;
    setWorkspaceId: React.Dispatch<React.SetStateAction<string>>;
    setWorkspaceName: React.Dispatch<React.SetStateAction<string>>;
}

const InitialValues: WorkspaceContextType = {
    workspaceId: '',
    workspaceName: '',
    setWorkspaceId: () => undefined,
    setWorkspaceName: () => undefined,
};

type WorkspaceProviderProps = {
    children: React.ReactNode;
};

const WorkspaceContext = createContext<WorkspaceContextType>(InitialValues);
const { Provider } = WorkspaceContext;

export const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {
    const [workspaceId, setWorkspaceId] = useState<string>(InitialValues.workspaceId);
    const [workspaceName, setWorkspaceName] = useState<string>(InitialValues.workspaceName);

    const values = {
        workspaceId,
        setWorkspaceId,
        workspaceName,
        setWorkspaceName,
    };

    return <Provider value={values}>{children}</Provider>;
};

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
};
