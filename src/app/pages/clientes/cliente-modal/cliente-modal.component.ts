import { Component, Input, OnInit } from '@angular/core';
import { ClientesService } from '../../../servicios/clientes.service';
import { NgForm } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/modelos/Cliente';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent implements OnInit {

  // si edito, recibo la data 
  @Input() cliente: Cliente
  isUpdate = false; // Check if the modal is used for update or not
  // Data to be updated
  data: Cliente = {
    idCliente: '',
    dni: '',
    nombre: '',
    edad: 0
  };

  constructor(private clienteService: ClientesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed')
  }

  ngOnInit() {
    if(this.cliente) {
      this.isUpdate = true;
      this.data = this.cliente
    }
  }

  // añadir o editar
  onSubmit(form: NgForm) {
    var cliente: Cliente = form.value;
    if(this.validaDNI(cliente.dni)){
      if(this.isUpdate) {
        this.clienteService.updateCliente(this.cliente)
          .subscribe(res => {
            this.modalCtrl.dismiss(res, 'updated')
        });
      }
      else{
          this.clienteService.createCliente(cliente)
            .subscribe(res => {
              this.modalCtrl.dismiss(res, 'created')
          });
      }
    }
    else{
      this.alertCtrl.create({
        header: 'Dni incorrecto',
        message: 'Revisa el campo, por favor',
      }).then(alertEl => alertEl.present());
    }
  }


  private validaDNI(dni): boolean {
    var numero;
    var letr;
    var letra;
    var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
   
    if(expresion_regular_dni.test (dni) == true){
      numero = dni.substr(0,dni.length-1);
      letr = dni.substr(dni.length-1,1);
      numero = numero % 23;
      letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero,numero+1);

      if (letra != letr.toUpperCase()) {
        return false;
      }
      else{
        return true;
       }
    }
    else{
      return false;
    }
  }
}
