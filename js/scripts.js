let addressBook = new AddressBook();

// Business Logic for AddressBook ---------
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


  // Business Logic for Contacts ---------
  //addresses is an array of address objects
function Contact(firstName, lastName, phoneNumber, email, addresses) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.addresses = addresses;
    this.currentId = 0;
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}   

Contact.prototype.fullAddress = function(index) {
  return "Type: " + this.addresses[index].type + " | " + this.addresses[index].street + ", " + this.addresses[index].city + ", " + this.addresses[index].state + ", " + this.addresses[index].zip;
}


// Business Logic for Addresses ---------
function Address(street, city, state, zip, type) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.type = type;

}

let addressCounter = 2;

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
    const addresses = contact.addresses;
    const nameSpan = document.querySelector("#first-name");
    //if (nameSpan.innerText === "") {
      for(i = 0; i < addresses.length; i++) {
        let address = contact.fullAddress(i);
        let addressList = document.querySelector("#addressList");
        let addressLi = document.createElement("li");
        addressLi.classList.add("delete");
        addressLi.innerText = address;
        addressList.append(addressLi);
     }
  //  }
    document.querySelector("#first-name").innerText = contact.firstName;
    document.querySelector("#last-name").innerText = contact.lastName;
    document.querySelector("#phone-number").innerText = contact.phoneNumber;
    document.querySelector("#email").innerText = contact.email;
    document.querySelector("button.delete").setAttribute("id", contact.id);
    document.querySelector("div#contact-details").classList.remove("hidden"); 
  }

  //need to handle the li elements in the ul - they persist when you click on a new contact
  //there also needs to be a hide details function
  //also this function doesn't work.
  function handleDelete(e) {
    e.preventDefault();
    let listItems = document.querySelectorAll("li.delete");
    listItems.forEach(function(item) {
      item.remove();
   });
    addressBook.deleteContact(e.target.id);
    // document.querySelector("button.delete").removeAttribute("id");
    document.querySelector("div#contact-details").setAttribute("class", "hidden");
    listContacts(addressBook);
  };


  function handleFormSubmission(e) {
    e.preventDefault();
    let inputtedFirstName = document.querySelector("#new-first-name").value;
    let inputtedLastName = document.querySelector("#new-last-name").value;
    let inputtedPhoneNumber = document.querySelector("#new-phone-number").value;
    let inputtedEmail = document.querySelector("#new-email").value;
  
    let addressArray = [];
    for(i = 1; i < addressCounter; i++) {
      let inputtedType = document.querySelector(`#type${i}`).value;
      let inputtedStreet = document.querySelector(`#new-street${i}`).value;
      let inputtedCity = document.querySelector(`#new-city${i}`).value;
      let inputtedState = document.querySelector(`#new-state${i}`).value;
      let inputtedZip = document.querySelector(`#new-zip${i}`).value;
      let newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedZip, inputtedType);
      addressArray.push(newAddress);
    }
    
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, addressArray);
    addressBook.addContact(newContact);
    listContacts(addressBook);

    let allInputs = document.querySelectorAll("input.delete");
    let inputArray = Array.from(allInputs);
    
    inputArray.forEach(function(input) {
      input.value = null;
    });

    let newAddressDivs = document.querySelectorAll("div.remove");
    let newAddressArray = Array.from(newAddressDivs);
    newAddressArray.forEach(function(div) {
      div.remove();
  });

  addressCounter = 2;
}

  function addAddress(e) {  
    e.preventDefault();
    let typeSelect = document.createElement("select");
    let typeLabel = document.createElement("label");
    let typeOptionHome = document.createElement("option");
    let typeOptionWork = document.createElement("option");
    let typeOptionOther = document.createElement("option");
    let streetInput = document.createElement("input");
    let streetLabel = document.createElement("label");
    let cityInput = document.createElement("input");
    let cityLabel = document.createElement("label");
    let stateInput = document.createElement("input");
    let stateLabel = document.createElement("label");
    let zipInput = document.createElement("input");
    let zipLabel = document.createElement("label");
    let h4 = document.createElement("h4");
    const addressDiv = document.querySelector("#addressDiv");
    let newAddressDiv = document.createElement("div");
  
    //maybe the section below can be handled with a loop?
  
    h4.innerText = "Address " + addressCounter + ": ";
    typeSelect.required = true;
    typeSelect.id = "type" + addressCounter;
    typeSelect.name = "type"
    typeSelect.classList.add("delete");
    typeOptionHome.innerText = "Home";
    typeOptionHome.value = "Home";
    typeOptionWork.innerText = "Work";
    typeOptionWork.value = "Work";
    typeOptionOther.innerText = "Other";
    typeOptionOther.value = "Other";
    streetInput.required = true;
    streetInput.type = "text"
    streetInput.id = "new-street" + addressCounter;
    streetInput.name = "new-street" 
    streetInput.classList.add("delete");
    streetInput.for = "new-street" 
    streetLabel.innerText = "Number and Street Name:"
    streetLabel.for = "new-street"
    cityInput.required = true;
    cityInput.type = "text"
    cityInput.id = "new-city" + addressCounter;
    cityInput.name = "new-city"
    cityInput.classList.add("delete");
    cityInput.for = "new-city"
    cityLabel.innerText = "City:"
    cityLabel.for = "new-city"
    stateInput.required = true;
    stateInput.type = "text"
    stateInput.id = "new-state" + addressCounter;
    stateInput.name = "new-state"
    stateInput.classList.add("delete");
    stateInput.for = "new-state"
    stateLabel.innerText = "State:"
    stateLabel.for = "new-state" 
    zipInput.required = true;
    zipInput.type = "text"
    zipInput.id = "new-zip" + addressCounter;
    zipInput.name = "new-zip"
    zipInput.classList.add("delete");
    zipInput.for = "new-zip"
    zipLabel.innerText = "Zip Code:"
    typeSelect.append(typeOptionHome);
    typeSelect.append(typeOptionWork);
    typeSelect.append(typeOptionOther);
    newAddressDiv.append(typeLabel);
    newAddressDiv.append(typeSelect);
    newAddressDiv.append(streetLabel);
    newAddressDiv.append(streetInput);
    newAddressDiv.append(cityLabel);
    newAddressDiv.append(cityInput);
    newAddressDiv.append(stateLabel);
    newAddressDiv.append(stateInput);
    newAddressDiv.append(zipLabel);
    newAddressDiv.append(zipInput);
    newAddressDiv.prepend(h4);
    newAddressDiv.id = "addressDiv" + addressCounter;
    newAddressDiv.classList.add("addressDiv");
    newAddressDiv.classList.add("remove");
  
    addressDiv.after(newAddressDiv);
    addressCounter ++;
  }



  window.addEventListener("load", function () {
    document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
    document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
    document.querySelector("button.delete").addEventListener("click", handleDelete);
    document.querySelector("button.add-address").addEventListener("click", addAddress);
  });
