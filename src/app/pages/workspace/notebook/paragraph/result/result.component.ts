import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ParagraphConfigResult, ParagraphIResultsMsgItem } from 'zeppelin-sdk';
import { AreaChartVisualization } from '../../../../../visualization/area-chart/area-chart-visualization';
import { BarChartVisualization } from '../../../../../visualization/bar-chart/bar-chart-visualization';
import { LineChartVisualization } from '../../../../../visualization/line-chart/line-chart-visualization';
import { PieChartVisualization } from '../../../../../visualization/pie-chart/pie-chart-visualization';
import { ScatterChartVisualization } from '../../../../../visualization/scatter-chart/scatter-chart-visualization';
import { Visualization } from '../../../../../visualization/visualization';

interface Visualizations {
  lineChart: {
    Class: typeof LineChartVisualization;
    instance: LineChartVisualization;
  };

  multiBarChart: {
    Class: typeof BarChartVisualization;
    instance: BarChartVisualization;
  };

  stackedAreaChart: {
    Class: typeof AreaChartVisualization;
    instance: AreaChartVisualization;
  };

  pieChart: {
    Class: typeof PieChartVisualization;
    instance: PieChartVisualization;
  };
  scatterChart: {
    Class: typeof ScatterChartVisualization;
    instance: ScatterChartVisualization;
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
  visualizations: Visualizations = {
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

  constructor() {}

  ngOnInit() {}

  renderGraph() {
    let instance: Visualization;
    if (!this.visualizations[this.config.graph.mode]) {
      return;
    }
    if (!this.visualizations[this.config.graph.mode].instance) {
      instance = new this.visualizations[this.config.graph.mode].Class(this.config.graph, this.graphEle.nativeElement);
      this.visualizations[this.config.graph.mode].instance = instance;
    }
    const transformation = instance.getTransformation();
    const transformed = transformation.transform(this.result.data);
    instance.render(transformed);
  }

  ngAfterViewInit(): void {
    if (this.config && this.config.graph) {
      this.renderGraph();
    }
  }
}
