import { Node } from 'reactflow';
import { NodeHandler, NodeInputs, NodeOutput, ExecutionContext } from '../NodeHandler';

/**
 * Handler for Filter nodes
 * Filters arrays or data based on conditions
 */
export class FilterHandler extends NodeHandler {
  readonly type = 'filter';
  readonly category = 'transform';

  async execute(
    node: Node,
    inputs: NodeInputs,
    context: ExecutionContext
  ): Promise<NodeOutput> {
    const startTime = Date.now();
    const { condition, property } = node.data || {};
    
    try {
      const inputData = inputs.input || inputs.data;
      
      if (!Array.isArray(inputData)) {
        throw new Error('Filter node requires array input');
      }
      
      // Simple filter implementation
      let filtered = inputData;
      
      if (condition && property) {
        filtered = inputData.filter(item => {
          // Simple equality check for demonstration
          return item[property] === condition;
        });
      }
      
      return {
        data: filtered,
        metadata: {
          executionTime: Date.now() - startTime,
          timestamp: Date.now(),
          originalCount: inputData.length,
          filteredCount: filtered.length
        }
      };
    } catch (error) {
      throw new Error(`Filter execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getDefaultConfig() {
    return {
      property: '',
      condition: ''
    };
  }
}
