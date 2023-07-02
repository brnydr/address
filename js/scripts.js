function AddressBook() {
    this.contacts = {};
}

AddressBook.prototype.addContact = function(contact) {
    this.contacts[contact.firstName] = contact;
}

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