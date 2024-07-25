import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeatmapService } from '../heatmap.service';
import { Subscription } from 'rxjs';

interface commitData {
  timestamp: Date;
  intensity: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  eventData = [{} as commitData];
  opacityValues: number[] = [0.25, 0.5, 0.75, 1];
  private sub$ = new Subscription();
  constructor(private heatmapService: HeatmapService) {}

  ngOnInit(): void {
    const heatmapsub$ = this.heatmapService.eventData$.subscribe({
      next: (data) => {
        this.eventData = data;
      },
    });

    this.sub$.add(heatmapsub$);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  setOpacity(opacity: number): string {
    return `rgba(156,36,124, ${opacity})`;
  }
}
