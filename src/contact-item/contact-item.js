import { contactItemTemplate } from './contact-item-template.js';
import { addContactTemplate } from '../add-contact-modal.js';
import './contact-item.css';

'use strict';

// This is a Sticky Note custom element.
/** Class represents a single contact item.
  * @extends HTMLElement - interface represents any HTML element
  */
export class ContactItem extends HTMLElement {

  /** Fires when an instance of the element is created. */
  createdCallback() {
    this.innerHTML = contactItemTemplate;
    this.contactName = this.querySelector('.contact-name');
    this.contactPhone = this.querySelector('.contact-phone');
    this.addEventListener('click', this.openContact);
  }

  /** Sets the contact name and phone to the contact item element.
   * @param {Object} contact - object with all contact data
   */
  setContact (contact) {
    this.contactData = contact;
    this.contactName.textContent = contact.name;
    this.contactName.innerHTML = this.contactName.innerHTML;

    this.contactPhone.textContent = contact.phone;
    this.contactPhone.innerHTML = this.contactPhone.innerHTML;
  }

  /** Opens modal window with all contact data */
  openContact () {
    let div = document.createElement('div');
    div.innerHTML = addContactTemplate;
    // Set all inputs with contact data
    div.querySelector('input[name="name"]').value = this.contactData.name;
    div.querySelector('input[name="phone"]').value = this.contactData.phone;
    div.querySelector('input[name="email"]').value = this.contactData.email;
    div.querySelector('input[name="skype"]').value = this.contactData.skype;
    div.querySelector('input[name="facebook"]').value = this.contactData.facebook;
    document.body.appendChild(div);
    // Set delete contact event
    let deleteBtn = div.querySelector('.delete-contact');
    deleteBtn.addEventListener('click', () => this.deleteContact());
    // Set close modal event
    let closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', this.closeWindow);
    // Set save contact event
    let saveBtn = document.querySelector('.save-contact');
    saveBtn.addEventListener('click', e => this.saveContact(e));
  }

  /** Saves a new contact on localStorage.
   * @param {Object} e - event object from the click on save button event.
   */
  saveContact (e) {
    e.preventDefault();
    // Get data from inputs
    let contact = {
      name: e.target.form.querySelector('input[name="name"]').value,
      phone: e.target.form.querySelector('input[name="phone"]').value,
      email: e.target.form.querySelector('input[name="email"]').value,
      skype: e.target.form.querySelector('input[name="skype"]').value,
      facebook: e.target.form.querySelector('input[name="facebook"]').value
    };
    // Update contact in the localStorage
    let contactStr = JSON.stringify(contact);
    localStorage.setItem(this.id, contactStr);
    // Close modal window.
    this.fireCloseWindowEvent();
    this.setContact(contact);
  }

  /** Deletes the contact by removing the element from the DOM and the data from localStorage. */
  deleteContact () {
    this.removeEventListener('click', this.openContact);
    localStorage.removeItem(this.id);
    this.parentNode.removeChild(this);
    this.fireCloseWindowEvent();
  }

  /** Automatically closes modal box */
  fireCloseWindowEvent () {
    let closeBtn = document.querySelector('.close-modal');
    closeBtn.click();
  }

  /**
   * Close modal window.
   */
  closeWindow () {
    let modal = this.parentNode.parentElement.parentElement.parentElement;
    this.removeEventListener('click', this.closeWindow);
    modal.remove();
  }
}
