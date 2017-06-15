import './app.css';
import { addContactTemplate } from './add-contact-modal.js';
import { ContactItem } from './contact-item/contact-item.js';

'use strict';

/** Class represents whole contact-book-app. */
export class ContactBookApp {
  /** Initializes the contact-book-app. */
  constructor () {
    this.allContacts = null;
    // Get shortcuts to DOM Elements.
    this.addContactButton = document.getElementById('btn-add');
    this.seatchInput = document.getElementById('search');
    // Initializes event listeners.
    this.addContactButton.addEventListener('click', () => this.openAddContactModal());
    this.seatchInput.addEventListener('search', e => this.findContactsByName(e));
    // Loads all the contacts.
    for (let key in localStorage) {
      this.showContact(key, localStorage[key]);
    }
  }

  /** Saves a new contact on localStorage.
    *  @param {Object} e - event object from the click on save button event.
    */
  saveContact (e) {
    e.preventDefault();
    let newContact = {
      name: e.target.form.querySelector('input[name="name"]').value,
      phone: e.target.form.querySelector('input[name="phone"]').value,
      email: e.target.form.querySelector('input[name="email"]').value,
      skype: e.target.form.querySelector('input[name="skype"]').value,
      facebook: e.target.form.querySelector('input[name="facebook"]').value
    };

    let key = Date.now().toString();
    let contactStr = JSON.stringify(newContact);
    localStorage.setItem(key, contactStr);

    let closeBtn = document.querySelector('.close-modal');
    closeBtn.click();

    this.showContact(key, contactStr);
  }

  /**
   * Close modal window.
   */
  closeWindow() {
    let modal = this.parentNode.parentElement.parentElement.parentElement;
    this.removeEventListener('click', this.closeWindow);
    modal.remove();
  }

  /** Opens modal window to enter a new contact. */
  openAddContactModal () {
    let div = document.createElement('div');
    div.innerHTML = addContactTemplate;
    let deleteBtn = div.querySelector('.delete-contact');
    deleteBtn.remove();
    document.body.appendChild(div);

    let closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', this.closeWindow);

    let saveBtn = document.querySelector('.save-contact');
    saveBtn.addEventListener('click', e => this.saveContact(e));
  }

  /** Shows a single contact panel
   * @param {string} key - key value, that represents unique contact item
   * @param {string} contact - string in JSON format, that have all contacts data
   */
  showContact (key, contact) {
    let contactItem = document.getElementById(key);

    if (!contactItem) {
      contactItem = document.createElement('contact-item');
      contactItem.classList.add('contact-item');
      contactItem.id = key;
      let contactsContainer = document.querySelector('.contacts-container');
      contactsContainer.appendChild(contactItem);
    }
    contactItem.setContact(JSON.parse(contact));
  }

  /** Searches contacts by name.
   * * @param {Object} e - event object from the search event.
   */
  findContactsByName (e) {
    if (!this.allContacts) {
      this.allContacts = document.querySelectorAll('.contact-item');
    }
    if (e.target.value) {
      let searchStr = e.target.value.toLowerCase();
      for (let i = 0; i < this.allContacts.length; i++) {
        if (this.allContacts[i].contactName.textContent.toLowerCase().search(searchStr)) {
          this.allContacts[i].style.display = 'none';
        } else {
          this.allContacts[i].style.display = 'flex';
        }
      }
    } else {
      // Display all contacts when search input is empty
      for (let i = 0; i < this.allContacts.length; i++) {
        this.allContacts[i].style.display = 'flex';
      }
    }
  }
}

/** Startes the app on page load.
 * @event load
 */
window.addEventListener('load', () => new ContactBookApp());

document.registerElement('contact-item', ContactItem);
