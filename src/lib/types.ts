import { ConnectionProviderProps } from "../../providers/connections-provider"


export type ConnectionTypes = 'Google Drive' | 'Google Sheets' | 'Notion' | 'Slack' | 'Redmine' | 'Magento'

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
}

export type WorkflowEditorCanvasTypes = 
    | 'Email'
    | 'Condition'
    | 'AI'
    | 'Google Drive'
    | 'Notion'
    | 'Trigger'
    | 'Action'
    | 'Wait'

export type WorkflowEditorCanvasCardType = {
    title: string;
    description: string;
    completed: boolean;
    current: boolean;
    metadata: any;
    type: WorkflowEditorCanvasTypes;
}

export type WorkflowEditorNodeType = {
    id: string;
    type: WorkflowEditorCanvasCardType['type'];
    position: {
        x: number;
        y: number;
    };
    data: WorkflowEditorCanvasCardType;
};

export type EditorNode = WorkflowEditorNodeType;

export type WorkflowEditorActions = 
    | {
        type: "LOAD_DATA"
        payload: {
            elements: EditorNode[]
            edges: {
                id: string
                source: string
                target: string
            }[]
        }
    }
    | {
        type: "UPDATE_NODE"
        payload: {
            elements: EditorNode[]
        }
    }
    | { type: "REDO" }
    | { type: "UNDO" }
    | {
        type: "SELECTED_ELEMENT"
        payload: {
            element: EditorNode
        }
    }
