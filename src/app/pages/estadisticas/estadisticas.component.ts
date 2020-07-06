import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { Label } from 'ng2-charts';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  pais:string;
  ciudad:string;
  fecha:Date;
  usuario:Usuario;
  grafico = [];
  grafico1 = [];
  label = [];
  contador=0;
  contador1=0;
  date:number;
  public barChartOptions: ChartOptions = {
    responsive: true,
};
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];
  constructor(private usuarioService:UsuariosService) { }

  ngOnInit(): void {
    this.getDatosPais();
  }

  getDatosPais(){
    this.usuarioService.getUsuarios$().subscribe(data=>{
      
      data.forEach((res,i)=>{
        if(res.pais == 'Mexico'){
          this.contador += 1;
          console.log( this.contador)
          //fecha
          this.fecha = res.fechanacimiento;
            let fech = new Date(this.fecha);
            this.date = fech.getFullYear();
            //pais  
            this.pais = res.pais;
            //ciudad
            this.ciudad = res.ciudad;

        }
        if(res.pais === 'Colombia'){
          //contador
          this.contador1 += 1;
          console.log( this.contador1)
          //fecha
          this.fecha = res.fechanacimiento;
            let fech = new Date(this.fecha);
            this.date = fech.getFullYear();
            //pais
            this.pais = res.pais;
            //ciudad
            this.ciudad = res.ciudad;         
        }
      })
        //grafico
         this.grafico = this.barChartData = [
           {
            label:this.pais,
          data:[ this.contador],
          },
        ]
        this.label = this.barChartLabels = [`${this.date}`]
    })
  }
}
