import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { Metrics } from './mock-metric';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor() { }

  getMetrics() : Observable<Metric[]>{
    return of(Metrics);
  }
}
