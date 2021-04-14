import { Component, OnInit } from '@angular/core';
import {ContactsService} from './contacts.service';
import {Contact} from './contact.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  suggestions: Array<{ group: string; children: Array<Contact>}> = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.initContacts();
  }

  filterSuggestions($event: any) {
    console.log($event.target.value);
    this.contactsService.filterContacts($event.target.value);
  }

  private async initContacts() {
    this.contactsService.$contacts.subscribe(contacts => {
      this.suggestions = this.formatContacts(contacts);
    });
    await this.contactsService.loadContactsData().toPromise();
    console.log(this.suggestions);
  }

  private formatContacts(contacts: Array<Contact>): Array<{ group: string; children: Array<Contact>}> {
    const data = contacts.reduce((r, e) => {
      const group = e.name[0];
      if (!r[group]) {
        r[group] = { group, children: [e] };
      } else {
        r[group].children.push(e);
      }
      return r;
    }, {});
    return Object.values(data);
  }

}
