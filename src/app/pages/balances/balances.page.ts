import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { RegistrosService } from '../../servicios/registros.service';
import { Balance} from '../../modelos/Balance';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.page.html',
  styleUrls: ['./balances.page.scss'],
})
export class BalancesPage implements OnInit  {

  balances: Balance[] = [];

  totalesPrecios: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cont: number = 0;

  constructor(private registrosService: RegistrosService){}
  
  ngOnInit(): void{
    this.registrosService.getBalancesPorMes()
      .subscribe((res) => {
        this.balances = res;
        console.log(this.balances);
        for(let i = 0; i < this.balances.length; i++) {
          let mes = parseFloat(this.balances[i]['Mes']);
          let total = parseFloat(this.balances[i]['Total']);
          this.totalesPrecios[mes-1] = total;
        }
    });
  }
  

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  ionViewDidEnter() {
    this.createBarChart();
  }

  private createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Precio / mes',
          data: this.totalesPrecios,
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  
}
