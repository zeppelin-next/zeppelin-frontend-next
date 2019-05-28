import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatasetType, GraphConfig, ParagraphConfigResult, ParagraphIResultsMsgItem } from 'zeppelin-sdk';
import { MessageService } from 'zeppelin-services';
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
  selector: 'zeppelin-notebook-paragraph-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookParagraphResultComponent implements OnInit, AfterViewInit {
  @Input() result: ParagraphIResultsMsgItem;
  @Input() config: ParagraphConfigResult;
  @Output() configChange = new EventEmitter<ParagraphConfigResult>();
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  innerHTML: string | SafeHtml = '';
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

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.config && this.config.graph) {
      this.renderDefaultDisplay();
      this.cdr.markForCheck();
    }
  }

  renderDefaultDisplay() {
    switch (this.result.type) {
      case DatasetType.TABLE:
        this.renderGraph();
        break;
      case DatasetType.TEXT:
        this.renderText();
        break;
      case DatasetType.HTML:
        this.renderHTML();
    }
  }

  renderHTML(): void {
    this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(this.result.data);
    console.log(this.result.data);
  }

  renderText(): void {}

  renderGraph() {
    let instance: Visualization;
    if (!this.visualizations[this.config.graph.mode]) {
      return;
    }
    if (!this.visualizations[this.config.graph.mode].instance) {
      instance = new this.visualizations[this.config.graph.mode].Class(
        this.config.graph,
        this.portalOutlet,
        this.viewContainerRef
      );
      this.visualizations[this.config.graph.mode].instance = instance;
    } else {
      instance = this.visualizations[this.config.graph.mode].instance;
    }
    this.tableData.loadParagraphResult(this.result);
    const transformation = instance.getTransformation();
    transformation.setTableData(this.tableData);
    const transformed = transformation.transform(this.tableData);
    instance.render(transformed);
    instance.configChanged().subscribe(config =>
      this.configChange.emit({
        graph: config
      })
    );
  }

  ngAfterViewInit(): void {}
}
