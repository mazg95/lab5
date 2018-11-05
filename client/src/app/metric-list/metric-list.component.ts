import { Component, OnInit } from '@angular/core';
import { MetricService } from '../metric.service';
import { Metric } from '../metric'

@Component({
  selector: 'app-metric-list',
  templateUrl: './metric-list.component.html',
  styleUrls: ['./metric-list.component.css']
})
export class MetricListComponent implements OnInit {

  constructor(private metricService: MetricService) { }

  ngOnInit() {
    this.getMetrics();
  }

  metrics : Metric[];

  getMetrics():void{
    this.metricService.getMetrics()
      .subscribe(metrics => this.metrics = metrics);
  }
}
