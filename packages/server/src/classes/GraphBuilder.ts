import DriverRemoteConnection from 'gremlin/lib/driver/driver-remote-connection';
import { Graph } from 'gremlin/lib/structure/graph';

export class GraphBuilder {
    static stack = [];

    static enabled = false;

    static logInfo = process.env.GRAPH_LOG_INFO === 'true';

    static g: any;

    static enable(): void {
        const graph = new Graph()
        GraphBuilder.g = graph.traversal().withRemote(new DriverRemoteConnection('ws://localhost:8182/gremlin'));

        GraphBuilder.enabled = true;
    }

    static addV(label: string, properties: Record<string, any> = {}): void {
        if (GraphBuilder.enabled) {
            const actionInfo = `Adding Vertex. Label=${label}, properties=${JSON.stringify(properties)}`;
            
            let v = GraphBuilder.g.addV(label);

            if (GraphBuilder.logInfo) {
                console.info(actionInfo);
            }

            Object.entries(properties).forEach(([propertyKey, propertyValue]) => {
                v = v.property(propertyKey, propertyValue);
            });
    
            GraphBuilder.stack.push([actionInfo, v.next()]);
        }
    }

    static addE(label: string, fromVLabel: string, toVLabel: string): void {
        if (GraphBuilder.enabled) {
            const actionInfo = `Adding Edge. Label=${label}, fromLabel=${fromVLabel}, toLabel=${toVLabel}`;

            if (GraphBuilder.logInfo) {
                console.info(actionInfo);
            }
    
            GraphBuilder.stack.push([actionInfo, GraphBuilder.g.V().hasLabel(fromVLabel).addE(label).to(GraphBuilder.g.V().hasLabel(toVLabel)).next()]);
        }
    }

    static async clearGraph(): Promise<void> {
        if (GraphBuilder.enabled) {
            await GraphBuilder.g.V().drop().iterate();
            await GraphBuilder.g.E().drop().iterate();
        }
    }

    static async commit(): Promise<void> {
        if (GraphBuilder.enabled) {
            for (const [actionInfo, stackItem] of GraphBuilder.stack) {
                try {
                    await stackItem;
                }
                catch(e){
                    console.error(actionInfo, e);
                }
            }

            GraphBuilder.stack = [];
        }
    }
}