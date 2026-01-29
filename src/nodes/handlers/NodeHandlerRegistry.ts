import { NodeHandler } from './NodeHandler';
import { Node } from 'reactflow';

/**
 * Centralized registry for all node type handlers
 * Singleton pattern for global access
 */
class NodeHandlerRegistry {
  private static instance: NodeHandlerRegistry;
  private handlers: Map<string, NodeHandler> = new Map();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): NodeHandlerRegistry {
    if (!NodeHandlerRegistry.instance) {
      NodeHandlerRegistry.instance = new NodeHandlerRegistry();
    }
    return NodeHandlerRegistry.instance;
  }

  /**
   * Register a node handler
   */
  register(handler: NodeHandler): void {
    if (this.handlers.has(handler.type)) {
      console.warn(`Handler for type "${handler.type}" is already registered. Overwriting.`);
    }
    this.handlers.set(handler.type, handler);
  }

  /**
   * Register multiple handlers at once
   */
  registerAll(handlers: NodeHandler[]): void {
    handlers.forEach(handler => this.register(handler));
  }

  /**
   * Get handler for a specific node type
   */
  getHandler(type: string): NodeHandler | undefined {
    return this.handlers.get(type);
  }

  /**
   * Get handler for a node
   */
  getHandlerForNode(node: Node): NodeHandler | undefined {
    if (!node.type) return undefined;
    return this.handlers.get(node.type);
  }

  /**
   * Check if a handler is registered
   */
  hasHandler(type: string): boolean {
    return this.handlers.has(type);
  }

  /**
   * Get all registered handler types
   */
  getRegisteredTypes(): string[] {
    return Array.from(this.handlers.keys());
  }

  /**
   * Get handlers by category
   */
  getHandlersByCategory(category: string): NodeHandler[] {
    return Array.from(this.handlers.values())
      .filter(handler => handler.category === category);
  }

  /**
   * Unregister a handler
   */
  unregister(type: string): boolean {
    return this.handlers.delete(type);
  }

  /**
   * Clear all handlers
   */
  clear(): void {
    this.handlers.clear();
  }

  /**
   * Get count of registered handlers
   */
  getHandlerCount(): number {
    return this.handlers.size;
  }
}

// Export singleton instance
export const nodeHandlerRegistry = NodeHandlerRegistry.getInstance();
export { NodeHandlerRegistry };
