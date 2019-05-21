import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import { GraphConfig, ParagraphConfigResult, ParagraphIResultsMsgItem } from 'zeppelin-sdk';
import { AreaChartVisualization } from '../../../../../visualization/area-chart/area-chart-visualization';
import { BarChartVisualization } from '../../../../../visualization/bar-chart/bar-chart-visualization';
import { TableData } from '../../../../../visualization/dataset/table-data';
import { LineChartVisualization } from '../../../../../visualization/line-chart/line-chart-visualization';
import { PieChartVisualization } from '../../../../../visualization/pie-chart/pie-chart-visualization';
import { ScatterChartVisualization } from '../../../../../visualization/scatter-chart/scatter-chart-visualization';
import { TableVisualization } from '../../../../../visualization/table/table-visualization';
import { Visualization } from '../../../../../visualization/visualization';
import { CdkPortalOutlet } from '@angular/cdk/portal';

interface Visualizations {
  table: {
    Class: typeof TableVisualization;
    instance: Visualization;
  };

  lineChart: {
    Class: typeof LineChartVisualization;
    instance: Visualization;
  };

  multiBarChart: {
    Class: typeof BarChartVisualization;
    instance: Visualization;
  };

  stackedAreaChart: {
    Class: typeof AreaChartVisualization;
    instance: Visualization;
  };

  pieChart: {
    Class: typeof PieChartVisualization;
    instance: Visualization;
  };
  scatterChart: {
    Class: typeof ScatterChartVisualization;
    instance: Visualization;
  };
}

@Component({
  selector: 'zeppelin-notebook-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookResultComponent implements OnInit, AfterViewInit {
  @Input() result: ParagraphIResultsMsgItem;
  @Input() config: ParagraphConfigResult;
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  tableData = new TableData();
  visualizations: Visualizations = {
    table: {
      Class: TableVisualization,
      instance: undefined
    },
    lineChart: {
      Class: LineChartVisualization,
      instance: undefined
    },
    multiBarChart: {
      Class: BarChartVisualization,
      instance: undefined
    },
    stackedAreaChart: {
      Class: AreaChartVisualization,
      instance: undefined
    },
    pieChart: {
      Class: PieChartVisualization,
      instance: undefined
    },
    scatterChart: {
      Class: ScatterChartVisualization,
      instance: undefined
    }
  };

  constructor(private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  renderGraph() {
    let instance: Visualization;
    if (!this.visualizations[this.config.graph.mode]) {
      return;
    }
    if (!this.visualizations[this.config.graph.mode].instance) {
      if (this.config.graph.mode === 'table') {
        instance = new this.visualizations[this.config.graph.mode].Class(
          this.config.graph,
          this.portalOutlet,
          this.viewContainerRef
        );
      } else {
        instance = new this.visualizations[this.config.graph.mode].Class(
          this.config.graph,
          this.graphEle.nativeElement
        );
      }
      this.visualizations[this.config.graph.mode].instance = instance;
    } else {
      instance = this.visualizations[this.config.graph.mode].instance;
    }
    this.tableData.loadParagraphResult(this.result);
    const transformation = instance.getTransformation();
    const transformed = transformation.transform(this.tableData);
    instance.render(transformed);
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    if (this.config && this.config.graph) {
      this.renderGraph();
    }
  }
}
