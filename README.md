# diffOf

##### A tool that is used to perform diffs between any file to any file using a cli.

### Table of Contents

- [Supported Types](#supported-types)
- [Installation](#installation)
- [CLI](#cli)
- [Debugging](#debugging)

### Supported Types

JSON

### Installation

1. Clone this repo
2. `npm run bootstrap`
3. `npm run build`
4. `npm run start`

### CLI

1. Install this package globally: `npm i -g diffof`
2. `diffof file1.txt file2.txt`

### Debugging
#### VSCode
Debugging the server using VSCode is as simple as running `Debug server` configuration set in `.vscode/launch.json`. After that, set the breakpoints in the `.ts` files.

#### Graph
There's an option to view all relations visualized using a graph database.

![Graph Visualization Sample](./packages/server/debug/graph.png "Graph Visualization Sample")

Graph debugging is disabled by default and can be turned on using an ENV variable: `GRAPH_ENABLED=true`.
`DocumentDiffStrategy` adds vertexes and edges to the graph and changes will be committed after each diff iteration.

In order to use the graph debugging:
1. Run gremlin server: `./packages/server/debug/init-graph.sh`
2. Set ENV variable before running the server: `GRAPH_ENABLED=true`
3. Install and run Graph Notebook - Follow the installation instructions in https://github.com/aws/graph-notebook
4. View all graph items with their properties and connections - Execute the following command in jupyter (after initializing graph connection described in graph notebook's documentation):
```
%%gremlin -p v,oute,inv

g.V().outE().inV().path().by(valueMap('phrase').with(WithOptions.tokens))
```
5. Re-run the server, and execute the gremlin command in jupyter as needed.
