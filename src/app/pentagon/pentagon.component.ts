import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pentagon',
  templateUrl: './pentagon.component.html',
  styleUrls: ['./pentagon.component.css']
})
export class PentagonComponent implements AfterViewInit {
  @Input() playerStats: number[] = [10, 7, 8, 10, 10]; 

  @ViewChild('pentagonChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  ngAfterViewInit() {
    this.createRadarChart();
  }

  createRadarChart() {
    if (!this.chartRef) return;

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Físico', 'Técnica', 'Fuerza mental', 'Resistencia', 'Habilidades Especiales'],
        datasets: [
          {
            label: 'Estadísticas',
            data: this.playerStats,
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            borderColor: '#FF9809',
            borderWidth: 2,
            pointBackgroundColor: 'orange',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2,
              color: '#000',
            },
            grid: {
              color: '#000',
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
