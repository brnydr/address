// Business Logic
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


let addressBook = new AddressBook();

// UI logic

//removed bug from line 56 - originally id was set to contact.id, but was changed to key to match the key in the forEach loop.
function listContacts(addressBookToDisplay) {
    let contactsDiv = document.querySelector("div#contacts");
    contactsDiv.innerText =  null;
    const ul = document.createElement("ul");
    Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
      const contact = addressBookToDisplay.findContact(key);
      const li = document.createElement("li");
      li.append(contact.fullName());
      li.setAttribute("id", key);
      ul.append(li);
    });
    contactsDiv.append(ul);
  }


  function displayContactDetails(event) {
    const contact = addressBook.findContact(event.target.id);
    document.querySelector("#first-name").innerText = contact.firstName;
    document.querySelector("#last-name").innerText = contact.lastName;
    document.querySelector("#phone-number").innerText = contact.phoneNumber;
    document.querySelector("button.delete").setAttribute("id", contact.id);
    document.querySelector("div#contact-details").classList.remove("hidden");
  }

  function handleDelete(e) {
    e.preventDefault();
    addressBook.deleteContact(e.target.id);
    document.querySelector("button.delete").removeAttribute("id");
    document.querySelector("div#contact-details").setAttribute("class", "hidden");
    listContacts(addressBook);
  };

  function handleFormSubmission(e) {
    e.preventDefault();
    const inputtedFirstName = document.querySelector("input#new-first-name").value;
    const inputtedLastName = document.querySelector("input#new-last-name").value;
    const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    listContacts(addressBook);
    document.querySelector("input#new-first-name").value = null;
    document.querySelector("input#new-last-name").value = null;
    document.querySelector("input#new-phone-number").value = null;
  }

  window.addEventListener("load", function (){
    document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
    document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
    document.querySelector("button.delete").addEventListener("click", handleDelete);
  });
