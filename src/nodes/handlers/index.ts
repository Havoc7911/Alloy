/**
 * Node Handler System - Main Exports
 * Central registration and initialization of all node handlers
 */

// Core handler infrastructure
export { NodeHandler } from './NodeHandler';
export type { NodeInputs, NodeOutput, ExecutionContext } from './NodeHandler';
export { NodeHandlerRegistry, nodeHandlerRegistry } from './NodeHandlerRegistry';

// Collect category handlers
export { FileInputHandler } from './collect/FileInputHandler';

// Initialize all handlers
import { nodeHandlerRegistry } from './NodeHandlerRegistry';
import { FileInputHandler } from './collect/FileInputHandler';

/**
 * Register all node handlers on module load
 */
export function initializeHandlers(): void {
  // Collect category
  nodeHandlerRegistry.register(new FileInputHandler());
  
  // Add more handlers as they are implemented
  // nodeHandlerRegistry.register(new ApiInputHandler());
  // nodeHandlerRegistry.register(new DatabaseInputHandler());
  // ... etc
  
  console.log(`Initialized ${nodeHandlerRegistry.getHandlerCount()} node handlers`);
}

// Auto-initialize on import
initializeHandlers();
