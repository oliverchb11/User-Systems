import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
results: any[] = []
cargando:boolean;
view: any[] = [700, 200];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Paises';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Año';
  colorScheme = 'nightLights';
  constructor(private usuarioService:UsuariosService) {  }

  ngOnInit(): void {
    this.InsertarDatosGrafica();
  
  }
  onSelect(event) {
    console.log(event);
  }
  InsertarDatosGrafica(){
    this.usuarioService.getDatosParaGrafica().subscribe(datos=>{
      this.results = datos;
      this.cargando = true;
      console.log('componente',datos)
    });
  }

}
