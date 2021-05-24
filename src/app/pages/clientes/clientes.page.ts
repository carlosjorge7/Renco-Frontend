import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { Cliente } from '../../modelos/Cliente';
import { AlertController, ModalController } from '@ionic/angular';
import { ClienteModalComponent } from './cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];

  textoBuscar = '';

  constructor(private clientesService: ClientesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getAllClientes();
  }

  buscarCliente(event) {
    const valor = event.target.value;
    this.textoBuscar = valor;
  }

  getAllClientes() {
    this.clientesService.getAllClientes()
      .subscribe(res => {
        this.clientes = res;
        console.log(this.clientes);
    });
  }

  createCliente() {
    // open modal
    this.modalCtrl.create({
      component: ClienteModalComponent
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then((res) => {
      const data = JSON.parse(res['data'])
      if(res['role'] == 'created') {
        this.clientes.push(data);
      }
    })
  }

  deleteCliente(idCliente: number | string): void{
    this.alertCtrl.create({
      header: 'Borrar',
      message: 'Estas seguro?',
      buttons: [{
          text: 'Si',
          handler: () => {
            this.clientesService.deleteCliente(idCliente).subscribe(res => {
                if(res['resultado'] == 'OK') { 
                  this.getAllClientes();
                }
            });
          }
        }, { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }

  updateCliente(cliente: Cliente){
    this.modalCtrl.create({
      component: ClienteModalComponent,
      componentProps: { cliente } // aqui pasamos el objeto al componente modal
    })
    .then(modal => {
      modal.present();
    })
  }

}
