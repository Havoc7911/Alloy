// Port type definitions for node inputs/outputs

export type PortDataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'file' | 'user' | 'any'

export interface Port {
  name: string
  type: PortDataType
  required?: boolean
  description?: string
  defaultValue?: any
  multiple?: boolean
}

export interface InputPorts {
  [key: string]: Port
}

export interface OutputPorts {
  [key: string]: Port
}

export interface PortConnection {
  nodeId: string
  portName: string
  portType: 'input' | 'output'
  dataType: PortDataType
}

export const PORT_DATA_TYPES: Record<PortDataType, string> = {
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
  object: 'Object',
  array: 'Array',
  file: 'File',
  user: 'User',
  any: 'Any',
}

export const isCompatibleType = (source: PortDataType, target: PortDataType): boolean => {
  if (source === 'any' || target === 'any') return true
  return source === target
}
