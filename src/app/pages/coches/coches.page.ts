import { Component, OnInit } from '@angular/core';
import { CochesService } from '../../servicios/coches.service';
import { Coche } from '../../modelos/Coche';
import { AlertController, ModalController } from '@ionic/angular';
import { CocheModalComponent } from './coche-modal/coche-modal.component';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.page.html',
  styleUrls: ['./coches.page.scss'],
})
export class CochesPage implements OnInit {

  coches: Coche[] = [];

  textoBuscar = '';

  constructor(private cochesService: CochesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getAllCoches();
  }

  buscarCoche(event) {
    const valor = event.target.value;
    this.textoBuscar = valor;
  }

  getAllCoches() {
    this.cochesService.getAllCoches()
      .subscribe(res => {
        this.coches = res;
        console.log(this.coches);
    });
  }

  createCoche() {
    // open modal
    this.modalCtrl.create({
      component: CocheModalComponent
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then((res) => {
      const data = JSON.parse(res['data'])
      if(res['role'] == 'created') {
        this.coches.push(data);
      }
    })
  }

  deleteCoche(idCoche: number | string): void{
    this.alertCtrl.create({
      header: 'Borrar',
      message: 'Estas seguro?',
      buttons: [{
          text: 'Si',
          handler: () => {
            this.cochesService.deleteCoche(idCoche).subscribe(res => {
                if(res['resultado'] == 'OK') { 
                  this.getAllCoches();
                }
            });
          }
        }, { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }

  updateCoche(coche: Coche){
    this.modalCtrl.create({
      component: CocheModalComponent,
      componentProps: { coche } 
    })
    .then(modal => {
      modal.present();
    })
  }
}
