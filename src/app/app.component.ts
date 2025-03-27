import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('myPieChart', { static: false }) canvas!: ElementRef;

  checkBtnText = 'Check';
  lyrics: string = '';
  isCheckBtnDisabled: boolean = true;
  chart: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onValueChange(event: Event): void {
    const value = (event.target as any).value;
    this.lyrics = value;

    if (this.lyrics.length > 1) {
      this.isCheckBtnDisabled = false;
    }
  }

  checkBtnAction() {
    if (this.lyrics.length > 1) {
      this.checkBtnText = 'Loading...';
      this.clearChart();
      let payload = {
        lyrics: this.lyrics,
      };

      this.dataService.predict(payload).subscribe((res) => {
        let labels = Object.keys(res);
        let values = this.formatNumberValues(Object.values(res));
        this.createPieChart(labels, values);
        this.checkBtnText = 'Check';
      });
    }
  }

  formatNumberValues(arr: any[]) {
    let result: number[] = [];
    arr.forEach((el: number) => {
      result.push(el * 100);
    });
    return result;
  }

  createPieChart(labels: string[], values: number[]) {
    if (this.canvas) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.canvas.nativeElement, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Lyrics Analysis',
              data: values,
              backgroundColor: [
                '#A2DFF7',
                '#A8E6A3',
                '#F7A8B8',
                '#FFF8B7',
                '#D1A7E2',
                '#FFD89B',
                '#FFB3D9',
                '#C4F7D3',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    } else {
      console.error('Canvas element not found!');
    }
  }

  clearChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
