import { ContactBookApp } from './main.js';

describe('ContactBookApp Create', () => {
  let app;
  beforeEach(function() {
    document.body.innerHTML = __html__["index.html"];
    app = new ContactBookApp();
  });
  it('Should create listener for Add contact button', () => {
    expect(app.addContactButton).not.to.be.null;
  });
  it('Should create listener for Search input', () => {
    expect(app.seatchInput).not.to.be.null;
  });
});

describe('Work with localStorage', () => {
  let app,
      allContacts;
  beforeEach(function() {
    localStorage.clear();
    let newContact = [
      { name: 'John Doe', phone: '555-55-55', email: 'john@mail.com', skype: 'john.doe', facebook: 'fb.com/john.doe' },
      { name: 'Jack Doe', phone: '333-33-33', email: 'jack@mail.com', skype: 'jack', facebook: 'fb.com/jack' },
      { name: 'Kyle Broflovski', phone: '444-44-44', email: 'kyle@mail.com', skype: 'kyle', facebook: 'fb.com/kyle' },
      { name: 'Eric Cartman', phone: '111-11-11', email: 'eric@mail.com', skype: 'eric', facebook: 'fb.com/eric' },
    ];
    for (let i = 0; i < newContact.length; i++) {
      let key = Date.now().toString() + i;
      localStorage.setItem(key, JSON.stringify(newContact[i]));
    }

    document.body.innerHTML = __html__["index.html"];
    app = new ContactBookApp();
    allContacts = document.querySelectorAll('.contact-item');
  });
  it('Should be 4 contacts in the DOM', () => {
    expect(allContacts.length).to.equal(4);
  });
  it('Contact should have a name form localStorage', () => {
    let contactName = document.querySelector('.contact-name');
    expect(contactName.innerHTML).to.equal('John Doe');
  });
  it('Contact should have a phone form localStorage', () => {
    let contactPhone = document.querySelector('.contact-phone');
    expect(contactPhone.innerHTML).to.equal('555-55-55');
  });
  it('Should be 3 hidden contacts after search', () => {
    let e = { target: { value: 'Kyle' } };
    app.findContactsByName (e);
    let filteredContacts = document.querySelectorAll('.contact-item');
    let hiddenContacts = 0;
    for (let i = 0; i < filteredContacts.length; i++) {
      if (filteredContacts[i].style.display === 'none') {
        hiddenContacts++;
      }
    }
    expect(hiddenContacts).to.equal(3);
  });
  it('Should be no hidden contacts after search', () => {
    let e = { target: { value: '' } };
    app.findContactsByName (e);
    let filteredContacts = document.querySelectorAll('.contact-item');
    let hiddenContacts = 0;
    for (let i = 0; i < filteredContacts.length; i++) {
      if (filteredContacts[i].style.display === 'none') {
        hiddenContacts++;
      }
    }
    expect(hiddenContacts).to.equal(0);
  });
  it('Modal box shoul exist after click on Add button', () => {
    app.addContactButton.click();
    let modalBox = document.querySelector('.modal-box');
    expect(modalBox).not.to.be.null;
  });
  it('Should add new contact', () => {
    app.addContactButton.click();
    let modalBox = document.querySelector('.modal-box');
    modalBox.querySelector('input[name="name"]').value = 'Bob';
    modalBox.querySelector('input[name="phone"]').value = '888-88-88';
    modalBox.querySelector('input[name="email"]').value = 'bob@mail.com';
    modalBox.querySelector('input[name="skype"]').value = 'bob';
    modalBox.querySelector('input[name="facebook"]').value = 'fb.com/bob';

    let saveBtn = document.querySelector('.save-contact');
    saveBtn.click();

    expect(localStorage.length).to.equal(5);
  });

  it('Modal box shoul exist after click on contact item', () => {
    let contactItem = document.querySelector('.contact-item');
    contactItem.click();

    let modalBox = document.querySelector('.modal-box');
    expect(modalBox).not.to.be.null;
  });

});
