import { EditorCompletionKey, EditorLanguage, EditorMode } from './message-common.interface';

export interface ParagraphEditorSetting {
  language: EditorLanguage;
  editOnDblClick: boolean;
  completionKey: EditorCompletionKey;
  completionSupport: boolean;
  // TODO
  // tslint:disable-next-line no-any
  params: any;
}

// TODO
export interface ParagraphParams {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export interface ParagraphConfigResults {
  [index: string]: ParagraphConfigResult;
}

export interface ParagraphConfigResult {
  graph: GraphConfig;
}
export interface ParagraphConfig {
  editorSetting?: ParagraphEditorSetting;
  colWidth?: number;
  editorMode?: EditorMode;
  fontSize?: number;
  results?: ParagraphConfigResults;
  enabled?: boolean;
  tableHide?: boolean;
  editorHide?: boolean;
  title?: boolean;
  runOnSelectionChange?: boolean;
  isZeppelinNotebookCronEnable?: boolean;
}

export interface ParagraphResults {
  code?: string;
  msg?: ParagraphIResultsMsgItem[];

  [index: number]: {};
}

export interface ParagraphIResultsMsgItem {
  type: string;
  data: string;
}

export interface ParagraphItem {
  text: string;
  user: string;
  dateUpdated: string;
  config: ParagraphConfig;
  settings: ParagraphEditorSetting;
  results?: ParagraphResults;
  // tslint:disable-next-line no-any
  apps: any[];
  progressUpdateIntervalMs: number;
  jobName: string;
  id: string;
  dateCreated: string;
  dateStarted?: string;
  dateFinished?: string;
  status: string;
  title?: string;
  focus?: boolean;
}

export interface SendParagraph {
  id: string;
  title?: string;
  paragraph: string;
  config: ParagraphConfig;
  params: ParagraphParams;
}

export interface CopyParagraph {
  index: number;
  title?: string;
  paragraph: string;
  config: ParagraphConfig;
  params: ParagraphParams;
}

export interface RunParagraph extends SendParagraph {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export interface CommitParagraph extends SendParagraph {
  noteId: string;
}

export interface RunAllParagraphs {
  noteId: string;
  paragraphs: string;
}

export interface InsertParagraph {
  index: number;
}

export interface MoveParagraph {
  id: string;
  index: number;
}

export interface AngularObjectUpdated {
  noteId: string;
  paragraphId: string;
  name: string;
  value: string;
  interpreterGroupId: string;
}

export interface AngularObjectClientBind {
  noteId: string;
  name: string;
  value: string;
  paragraphId: string;
}

export interface AngularObjectClientUnbind {
  noteId: string;
  name: string;
  paragraphId: string;
}

export interface CancelParagraph {
  id: string;
}

export interface ParagraphRemove {
  id: string;
}

export interface ParagraphClearOutput {
  id: string;
}

export interface ParagraphClearAllOutput {
  id: string;
}

export interface Completion {
  id: string;
  buf: string;
  cursor: number;
}

export interface PatchParagraph {
  id: string;
  noteId: string;
  patch: string;
}

export interface GraphConfig {
  mode: 'table' | 'lineChart' | 'stackedAreaChart' | 'multiBarChart' | 'scatterChart' | 'pieChart';
  height: number;
  optionOpen: boolean;
  setting: GraphConfigSetting;
  keys: GraphConfigKeysItem[];
  groups: GraphConfigGroupsItem[];
  values: GraphConfigValuesItem[];
  commonSetting: GraphConfigCommonSetting;
}
interface GraphConfigSetting {
  table: VisualizationTable;
  lineChart: VisualizationLineChart;
  stackedAreaChart: VisualizationStackedAreaChart;
  multiBarChart: VisualizationMultiBarChart;
  scatterChart: VisualizationScatterChart;
}
interface VisualizationTable {
  tableGridState: TableGridState;
  tableColumnTypeState: TableColumnTypeState;
  updated: boolean;
  initialized: boolean;
  tableOptionSpecHash: string;
  tableOptionValue: TableOptionValue;
}
interface TableGridState {
  columns: ColumnsItem[];
  scrollFocus: ScrollFocus;
  // tslint:disable-next-line
  selection: any[];
  grouping: Grouping;
  treeView: TreeView;
  pagination: Pagination;
}
interface ColumnsItem {
  name: string;
  visible: boolean;
  width: string;
  sort: Sort;
  filters: FiltersItem[];
  pinned: string;
}
interface Sort {
  // tslint:disable-next-line
  [key: string]: any;
}
interface FiltersItem {
  // tslint:disable-next-line
  [key: string]: any;
}
interface ScrollFocus {
  // tslint:disable-next-line
  [key: string]: any;
}
interface Grouping {
  // tslint:disable-next-line
  grouping: any[];
  // tslint:disable-next-line
  aggregations: any[];
  rowExpandedStates: RowExpandedStates;
}
interface RowExpandedStates {
  // tslint:disable-next-line
  [key: string]: any;
}
interface TreeView {
  // tslint:disable-next-line
  [key: string]: any;
}
interface Pagination {
  paginationCurrentPage: number;
  paginationPageSize: number;
}
interface TableColumnTypeState {
  updated: boolean;
  names: Names;
}
interface Names {
  index: string;
  value: string;
  random: string;
  count: string;
}
interface TableOptionValue {
  useFilter: boolean;
  showPagination: boolean;
  showAggregationFooter: boolean;
}
interface VisualizationLineChart {
  rotate: Rotate;
  xLabelStatus: string;
  forceY: boolean;
  lineWithFocus: boolean;
  isDateFormat: boolean;
}
interface Rotate {
  degree: string;
}
interface VisualizationStackedAreaChart {
  rotate: Rotate;
  xLabelStatus: string;
  style: 'stream' | 'expand' | 'stack';
}
interface VisualizationMultiBarChart {
  rotate: Rotate;
  stacked?: boolean;
  xLabelStatus: string;
}
interface VisualizationScatterChart {
  xAxis: XAxis;
  yAxis: YAxis;
  group: Group;
  size: Size;
}
interface XAxis {
  name: string;
  index: number;
  aggr: string;
}
interface YAxis {
  name: string;
  index: number;
  aggr: string;
}
interface Group {
  name: string;
  index: number;
  aggr: string;
}
interface Size {
  name: string;
  index: number;
  aggr: string;
}
interface GraphConfigKeysItem {
  name: string;
  index: number;
  aggr: string;
}
interface GraphConfigGroupsItem {
  name: string;
  index: number;
  aggr: string;
}
interface GraphConfigValuesItem {
  name: string;
  index: number;
  aggr: string;
}
interface GraphConfigCommonSetting {
  // tslint:disable-next-line
  [key: string]: any;
}
