import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { ClienteModalComponent } from './pages/clientes/cliente-modal/cliente-modal.component';
import { CocheModalComponent } from './pages/coches/coche-modal/coche-modal.component';
import { ContratoModalComponent } from './pages/contratos/contrato-modal/contrato-modal.component';
@NgModule({
  declarations: [AppComponent, ClienteModalComponent, CocheModalComponent, ContratoModalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
