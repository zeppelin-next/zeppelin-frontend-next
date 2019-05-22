import { DatasetType, ParagraphIResultsMsgItem } from 'zeppelin-sdk';
import { DataSet } from './data-set';
import { DataSet as AntvDataSet } from '@antv/data-set';

export class TableData extends DataSet {
  columns: string[] = [];
  // tslint:disable-next-line
  rows: any[] = [];

  loadParagraphResult(paragraphResult: ParagraphIResultsMsgItem): void {
    if (!paragraphResult || paragraphResult.type !== DatasetType.TABLE) {
      console.error('Can not load paragraph result');
      return;
    }
    const ds = new AntvDataSet();
    const dv = ds.createView().source(paragraphResult.data, {
      type: 'tsv'
    });
    this.columns = dv.origin && dv.origin.columns ? dv.origin.columns : [];
    this.rows = dv.rows || [];
  }
}
