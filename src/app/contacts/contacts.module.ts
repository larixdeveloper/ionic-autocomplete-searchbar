import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactsPageRoutingModule } from './contacts-routing.module';
import { ContactsPage } from './contacts.page';
import {HttpClientModule} from '@angular/common/http';
import {ContactsService} from './contacts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ContactsPageRoutingModule
  ],
  declarations: [ContactsPage],
  providers: [ContactsService]
})
export class ContactsPageModule {}
