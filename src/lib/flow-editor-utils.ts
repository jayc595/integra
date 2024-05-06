import { WorkflowEditorCanvasCardType } from "./types"

export const onDragStart = (
    event: any,
    nodeType: WorkflowEditorCanvasCardType['type']
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }