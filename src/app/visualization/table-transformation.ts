import { TableData } from './dataset/table-data';
import { Setting, Transformation } from './transformation';

// tslint:disable-next-line:no-any
export class TableTransformation extends Transformation {
  constructor(config) {
    super(config);
  }

  getSetting(): Setting {
    return undefined;
  }

  // tslint:disable-next-line:no-any
  transform(tableData: TableData): any {
    return tableData;
  }
}
