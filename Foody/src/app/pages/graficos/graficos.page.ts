import { Component, OnInit} from '@angular/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
  GridComponent
} from 'echarts/components';

import { BarChart, BarSeriesOption, PieChart, PieSeriesOption, LineChart} from 'echarts/charts';
import * as echarts from 'echarts/core';
import { DataService } from 'src/app/services/data.service';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout } from 'echarts/features';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Router } from '@angular/router';

echarts.use([
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  LabelLayout,
  PieChart,  
  BarChart,
  LineChart,
  GridComponent
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption | BarSeriesOption
>;

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {

  public chartBarDom : HTMLElement | any;
  public myBarChart : any;
  public optionBar: any;

  public chartPieDom : HTMLElement | any;
  public myPieChart : any;
  public optionPie: any;

  public chartLineDom : HTMLElement | any;
  public myLineChart : any;
  public optionLine: any;



  constructor(private firestore: DataService,
              public auth: AutheticationService,
              private router: Router) { }

  ngOnInit() {
  }

  async ngAfterViewInit() 
  {
    let data = await this.firestore.getVotosComida();
    this.chartBarDom = document.getElementById('bar');
    this.myBarChart = echarts.init(this.chartBarDom);
    this.optionBar = {
      xAxis: {
        type: 'category',
        data: ["1","2","3","4","5"],
        name: "Puntaje elegido",
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 15,
          lineHeight: 40
        }
      },
      yAxis: {
        type: 'value',        
        minInterval: 1
      },
      series: [
        {
          data: data,
          type: 'bar',
          itemStyle: {
            color: '#B84141', // Puedes cambiar este valor al color que desees
            emphasis: {
              color: '#703039' // Color cuando se enfatiza (por ejemplo, al pasar el mouse)
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    this.optionBar && this.myBarChart.setOption(this.optionBar);
    window.addEventListener('resize', this.myBarChart.resize);

    let data2 = await this.firestore.getVotosAtencion();
    const colorPalette = ['#FFBC42', '#EE9E42', '#DC7F42', '#CA6042', '#B84141'];

    this.chartPieDom = document.getElementById('pie');
    this.myPieChart = echarts.init(this.chartPieDom);
    this.optionPie = {
      tooltip: {
        trigger: 'item'
      },      
      color: colorPalette,  // Utiliza la gama de colores definida
      series: [
        {
          name: 'Cantidad de votos',
          type: 'pie',
          radius: '50%',
          data: data2,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.optionPie && this.myPieChart.setOption(this.optionPie);
    window.addEventListener('resize', this.myPieChart.resize);

    let data3 = await this.firestore.getVotosGeneral();    

    this.chartLineDom = document.getElementById('line');
    this.myLineChart = echarts.init(this.chartLineDom);
    this.optionLine = {
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5'],
        name: "Puntaje elegido",
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 15,
          lineHeight: 40
        }
      },
      yAxis: {
        type: 'value',        
        minInterval: 1
      },
      series: [
        {
          data: data3,
          type: 'line',
          itemStyle: {
            color: '#B84141', // Puedes cambiar este valor al color que desees            
          },
        }
      ]
    };

    this.optionLine && this.myLineChart.setOption(this.optionLine);
    window.addEventListener('resize', this.myLineChart.resize);

  }

  onClick()
  {
    this.router.navigateByUrl("/encuesta")
  }
}
