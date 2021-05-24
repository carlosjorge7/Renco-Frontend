import { Component, OnInit, Input } from '@angular/core';
import { RegistrosService } from '../../../servicios/registros.service';
import { ClientesService } from '../../../servicios/clientes.service';
import { CochesService } from '../../../servicios/coches.service';
import { NgForm } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Coche } from 'src/app/modelos/Coche';
import { Cliente } from 'src/app/modelos/Cliente';
import { Registro } from 'src/app/modelos/Registro';
import * as moment from 'moment';

@Component({
  selector: 'app-contrato-modal',
  templateUrl: './contrato-modal.component.html',
  styleUrls: ['./contrato-modal.component.scss'],
})
export class ContratoModalComponent implements OnInit {

  // si edito, recibo la data 
  @Input() registro: Registro;
  isUpdate = false; // Check if the modal is used for update or not
  // Data to be updated
  data: Registro = {
    idRegistro: 0,
    fechaInicio: new Date(moment().format('DD-MM-YYYY')),
    fechaFin: '',
    precio: 0,
    descuento: 0,
    compra: '',
    idCoche: 0,
    matricula: '',
    marca: '',
    idCliente: 0,
    dni: '',
    nombre: ''
  };

  constructor(private registrosService: RegistrosService,
              private clientesService: ClientesService,
              private cochesService: CochesService,
              private modalCtrl: ModalController) { }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed')
  }

  coches: Coche[] = [];
  clientes: Cliente[] = [];

  ngOnInit() {
    if(this.registro) {
      this.isUpdate = true;
      this.data = this.registro;
      console.log(this.data)
    }
    this.cochesService.getAllCoches()
      .subscribe((res: Coche[]) => {
        this.coches = res;
    });
    this.clientesService.getAllClientes()
      .subscribe((res: Cliente[]) => {
        this.clientes = res;
    });
  }

  selectCoche(ev){
    let e = ev.target.value;
    this.data.idCoche = e;
    console.log(this.data.idCoche);
  }

  selectCliente(ev){
    let e = ev.target.value;
    this.data.idCliente = e;
    console.log(this.data.idCliente);
  }

  // añadir o editar
  onSubmit(form: NgForm) {
    var registro: Registro = form.value;
    if(this.isUpdate) {
      this.registrosService.updateRegistro(this.registro)
        .subscribe(res => {
          this.modalCtrl.dismiss(res, 'updated')
      });
    }
    else{
      this.registrosService.createRegistro(registro)
        .subscribe(res => {
          this.modalCtrl.dismiss(res, 'created')
      });
    }
  }
}
