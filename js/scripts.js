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



  //addresses is an array of address objects
function Contact(firstName, lastName, phoneNumber, email, addresses) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.addresses = addresses;
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}   

function Address(street, city, state, zip) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
}

Address.prototype.fullAddress = function() { 
    return this.street + ", " + this.city + ", " + this.state + " " + this.zip;
};

let addressBook = new AddressBook();
let addressCounter = 0;


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
  
//I'll need to write a function that handles whether there are multiple addressses.
//It will need to iterate over the array of addresses and display them all.
//It will need to create new elements for each address and append them to the DOM.
  function displayContactDetails(event) {
    const contact = addressBook.findContact(event.target.id);
    document.querySelector("#first-name").innerText = contact.firstName;
    document.querySelector("#last-name").innerText = contact.lastName;
    document.querySelector("#phone-number").innerText = contact.phoneNumber;
    document.querySelector("#email").innerText = contact.email;
    document.querySelector("#address").innerText = contact.addresses;
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

//I'll need to write a function that handles whether there are multiple addressses. 
//I'll need to write branching logic that will check if there are multiple addresses, and if so, display them all.
//No matter what, addresses will need to be pushed into an array.
  function handleFormSubmission(e) {
    e.preventDefault();
    let inputtedFirstName = document.querySelector("input#new-first-name").value;
    let inputtedLastName = document.querySelector("input#new-last-name").value;
    let inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
    let inputtedEmail = document.querySelector("input#new-email").value;
    let street = document.querySelector("input#new-street").value;
    let city = document.querySelector("input#new-city").value;
    let state = document.querySelector("input#new-state").value;
    let zip = document.querySelector("input#new-zip").value;
    let newAddress = new Address(street, city, state, zip);
    let addressArray = [];
    addressArray.push(newAddress);
   // addresses.forEach(function(address) {
   //     addressArray.push(address.value);
 //   });
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, addressArray);
    addressBook.addContact(newContact);
    listContacts(addressBook);
    document.querySelector("input#new-first-name").value = null;
    document.querySelector("input#new-last-name").value = null;
    document.querySelector("input#new-phone-number").value = null;
    document.querySelector("input#new-email").value = null;
    document.querySelector("input#new-street").value = null;
    document.querySelector("input#new-city").value = null;
    document.querySelector("input#new-state").value = null;
    document.querySelector("input#new-zip").value = null;
    //I'll need to handle deleting the address fields after submission.
  
  }

  function addAddress(e) {  
    e.preventDefault();
    const newAddressInput = document.createElement("input");
    const newAddressLabel = document.createElement("label");
    const addressInput = document.querySelector("input#new-address");
    newAddressInput.type = "text";
    newAddressInput.id = "new-address" + addressCounter;
    newAddressInput.name = "new-address" + addressCounter;
    newAddressInput.classList.add("new-address");
    newAddressLabel.for = "new-address" + addressCounter;
    newAddressLabel.innerText = "Address ";
    addressInput.after(newAddressInput)
    addressInput.after(newAddressLabel);
    newAddressInput.after(document.createElement("br"));
    addressCounter ++;
    };
   


  window.addEventListener("load", function (){
    document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
    document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
    document.querySelector("button.delete").addEventListener("click", handleDelete);
    document.querySelector("button.add-address").addEventListener("click", addAddress);
  });
