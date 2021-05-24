import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../servicios/registros.service';
import { Registro } from '../../modelos/Registro';
import { AlertController, ModalController } from '@ionic/angular';
import { ContratoModalComponent } from './contrato-modal/contrato-modal.component';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.page.html',
  styleUrls: ['./contratos.page.scss'],
})
export class ContratosPage implements OnInit {

  total: string;

  registros: Registro[] = [];

  textoBuscar = '';

  constructor(private registrosService: RegistrosService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getAllRegistros();
  }

  buscarRegistro(event) {
    const valor = event.target.value;
    this.textoBuscar = valor;
  }

  getAllRegistros() {
    this.registrosService.getAllRegistros()
      .subscribe(res => {
        this.registros = res;
        console.log(this.registros);
        this.getTotalPrecios();
    });
  }

  public getTotalPrecios(){
    this.registrosService.getTotalPrecios()
      .subscribe(res => {
        this.total = res[0]['Total'];
    });
  }

  createRegistro() {
    // open modal
    this.modalCtrl.create({
      component: ContratoModalComponent
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then((res) => {
      const data = JSON.parse(res['data'])
      if(res['role'] == 'created') {
        this.registros.push(data);
      }
    })
  }

  deleteRegistro(idRegistro: number | string): void{
    this.alertCtrl.create({
      header: 'Borrar',
      message: 'Estas seguro?',
      buttons: [{
          text: 'Si',
          handler: () => {
            this.registrosService.deleteRegistro(idRegistro).subscribe(res => {
                if(res['resultado'] == 'OK') { 
                  this.getAllRegistros();
                }
            });
          }
        }, { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }

  updateRegistro(registro: Registro){
    //console.log(registro)
    this.modalCtrl.create({
      component: ContratoModalComponent,
      componentProps: { registro } 
    })
    .then(modal => {
      modal.present();
    })
  }

}
