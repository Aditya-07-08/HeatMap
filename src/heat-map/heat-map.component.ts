import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrl: './heat-map.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class HeatMapComponent implements OnInit {
  @Input() eventData: { timestamp: Date; intensity: number }[] = [];
  heatMapData: number[][] = [];
  weeksInYear = 52;
  daysInWeek = 7;
  maxIntensity = 100;

  ngOnInit() {
    this.prepareheatMapData();
  }

  prepareheatMapData() {

    this.heatMapData = Array(this.weeksInYear)
      .fill(0)
      .map(() => Array(this.daysInWeek).fill(0));

   
    this.eventData.forEach((event) => {
      const week = this.calculateWeek(event.timestamp);
      const day = event.timestamp.getDay();
      this.heatMapData[week][day] += event.intensity;
    });
  }

  calculateWeek(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / (oneDay * 7));
  }

  getCellColor(intensity: number): string {
    if (intensity === 0) {
      return '#f8e1de';
    }
    const opacity = intensity / this.maxIntensity;
    return `rgba(156,36,124, ${opacity})`;
  }
}
