import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Contact} from './contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private originalContactsSubject: BehaviorSubject<Array<Contact>> = new BehaviorSubject<Array<Contact>>([]);
  private contactsSubject: BehaviorSubject<Array<Contact>> = new BehaviorSubject<Array<Contact>>([]);
  $contacts = this.contactsSubject.asObservable();

  constructor(public http: HttpClient) { }

  filterContacts(name: string) {
    const filtered = this.originalContactsSubject.value.filter(e => e.name.includes(name));
    this.contactsSubject.next(filtered);
  }

  loadContactsData(): Observable<Array<Contact>> {
    return this.http.get('assets/contacts/contacts.json')
      .pipe(
        map(result=> result['contacts']),
        map(contacts => this.sortContacts(contacts)),
        tap(e => this.originalContactsSubject.next(e)),
        tap(e => this.contactsSubject.next(e)),
      );
  }

  private sortContacts(contacts: Array<Contact>) {
    return contacts.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    }
}
