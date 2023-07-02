function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
    this.currentId = this.assignId();
    this.contacts[this.currentId] = contact;
}

AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
    if (this.contacts[id] !== undefined) {
      return this.contacts[id];
    }
    return false;
  };

  AddressBook.prototype.deleteContact = function(id) {
    if (this.contacts[id] === undefined) {
      return false;
    }
    delete this.contacts[id];
    return true;
  };

function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}   

// handleFormSubmission will be called when the form is submitted, and will call
// the other functions to create a new contact, add it to the list, and display it
// using UI functions.
function handleFormSubmission () {

}

function handleLoadEvent() {

}



window.addEventListener('load',  {handleLoadEvent});