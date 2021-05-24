import { Component, Input, OnInit } from '@angular/core';
import { CochesService } from '../../../servicios/coches.service';
import { NgForm } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Coche } from 'src/app/modelos/Coche';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-coche-modal',
  templateUrl: './coche-modal.component.html',
  styleUrls: ['./coche-modal.component.scss'],
})
export class CocheModalComponent implements OnInit {

  // si edito, recibo la data 
  @Input() coche: Coche;
  isUpdate = false; // Check if the modal is used for update or not
  // Data to be updated
  data: Coche = {
    idCoche: '',
    matricula: '',
    marca: '',
    color: '',
    km: 0
  };

  constructor(private cocheService: CochesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed')
  }

  ngOnInit() {
    if(this.coche) {
      this.isUpdate = true;
      this.data = this.coche
    }
  }

  // añadir o editar
  onSubmit(form: NgForm) {
    var coche: Coche = form.value;
    if(this.validaMatricula(coche.matricula)){
      if(this.isUpdate) {
        this.cocheService.updateCoche(this.coche)
          .subscribe(res => {
            this.modalCtrl.dismiss(res, 'updated')
        });
      }
      else{
        this.cocheService.createCoche(coche)
          .subscribe(res => {
            this.modalCtrl.dismiss(res, 'created')
        });
      }
    }
    else{
      this.alertCtrl.create({
        header: 'Matrícula incorrecta',
        message: 'Recuerda que son 4 letras y 3 números, sin espacios',
      }).then(alertEl => alertEl.present());
    }
    
  }

  private validaMatricula(matricula: string) { 
    if(matricula.length == 7){
      if(typeof parseInt(matricula.substring(0, 4)) == 'number' && typeof matricula.substring(4, 7) == 'string'){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  } 
}
