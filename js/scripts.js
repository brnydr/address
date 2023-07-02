
function Contact(firstName, LastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}   


function handleFormSubmission () {

}

function handleLoadEvent() {

}



window.addEventListener('load',  {handleLoadEvent});