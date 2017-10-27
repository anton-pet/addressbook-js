function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var PhoneBook = function() {
    // constructor code
    this.contacts = [];
} 
 
PhoneBook.prototype = {
    add: function(contactInfo) {
        if (contactInfo.name.length > 100) {
            console.log('Name length is larger than 100');
            return null;
        }

        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!contactInfo.phone.match(phoneno)) {
            console.log('Invalid phone number');
            return null;
        }

        if (!validateEmail(contactInfo.email)) {
            console.log('Invalid email address');
            return null;
        }
        this.contacts.push(contactInfo);
        return contactInfo;
    },
    remove: function(index) {
        if (this.contacts.length > 1) {
            this.contacts.splice(index, 1);
        } else {
            this.contacts = [];
        }
    },
    search: function(query) {
        var result = [];
        result = this.contacts.filter(function(contact){
            if (contact.name.indexOf(query) >= 0 || contact.phone.indexOf(query) >= 0 || contact.email.indexOf(query) >= 0) {
                return true;
            }
            return false;
        });

        return result;
    },
    list: function(contactsPerPage, page) {
        var result = [];
        this.contacts = this.contacts.sort(function(a, b){
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        var startIndex = Math.max(0, contactsPerPage*page);
        var endIndex = Math.min(contactsPerPage*page + contactsPerPage, this.contacts.length);
        result = this.contacts.slice(startIndex, endIndex);
        return result;
    },
};

// Example: 
var myPhoneBook = new PhoneBook(); 
myPhoneBook.add({
    name: 'John Smith',
    phone: '02-234-9182',
    email: 'j.smith@mail.com'
}); 
myPhoneBook.list();