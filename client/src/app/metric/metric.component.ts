import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit {
  @Input() metric;

  constructor() { }

  ngOnInit() {
  }

}
