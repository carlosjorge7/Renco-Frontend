import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../servicios/registros.service';
import { Registro } from '../../modelos/Registro';
import { AlertController, ModalController } from '@ionic/angular';
import { ContratoModalComponent } from './contrato-modal/contrato-modal.component';

import jsPDF from 'jspdf';

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


  exportPdf(registro: Registro) {
    console.log(registro)
    const esp = '                                                                      ';
    const line = '__________________________________________________________________________________________________________________________';
    const Y = 30;
    const doc = new jsPDF()
    doc.addImage('assets/logo.png', 'PNG', 160, 10, 27, 7);
    doc.setFontSize(16)
    doc.text(`Contrato #${registro.idRegistro}`, 10, Y+40);
    doc.setFontSize(13)
    doc.text(`Cliente: ${registro.nombre} ${esp} Dni/NIE: ${registro.dni}`, 10, Y+50)
    doc.text(`Coche: ${registro.marca} ${esp} Matrícula: ${registro.matricula}`, 10, Y+60)
    doc.text(`Fecha Inicio: ${registro.fechaInicio}`, 10, Y+70)
    doc.text(`Fecha Fin ${registro.fechaFin}`, 10, Y+80)
    doc.text(`Compra: ${registro.compra} ${esp} Dcto: ${registro.descuento}%`, 10, Y+90)
    doc.text(`${esp.substring(0, esp.length/2)}${esp} Total: ${registro.precio}€`, 10, Y+110);
    doc.setFontSize(8);
    doc.text(line, 10, Y+150);
    doc.text('Gracias por depositar tu confianza en nosotros para gestionar los contratos de renting de tus clientes. Juntos, por el cambio y la innovación', 10, Y+160)
    doc.save(`Contrato_${registro.idRegistro}_${registro.nombre}.pdf`)
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
