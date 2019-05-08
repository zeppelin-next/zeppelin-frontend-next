export interface INodeList {
  root: RootNode;
  flatList: FlatListNodeItem[];
  flatFolderMap: FlatFolderNodeMap;
}

export interface RootNode {
  children: NodeItem[];
}

export interface NodeItem {
  id: string;
  name: string;
  hidden?: boolean;
  children?: NodeItem[];
  isTrash: boolean;
  path?: string;
}

interface FlatListNodeItem {
  id: string;
  path: string;
  isTrash: boolean;
}

interface FlatFolderNodeMap {
  [name: string]: NodeItem;
}
