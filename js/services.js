//Services

app.factory('AddressBookUpdater', function ($http, $localStorage, ADDRESSES) {

    var localAddressBook = ADDRESSES;

    var getEntries = function () {
        var addressBookLocalStorage = $localStorage.addressBook;
        //console.log(addressBookLocalStorage);
        if(addressBookLocalStorage != null){
            localAddressBook = addressBookLocalStorage;
        }
        saveAddressBook();
        return localAddressBook;
        /*return $http.get('/data.json').then(function(response){
         return localAddressBook = response.data;
         });*/
    };

    var addNewEntry = function (entry) {

        localAddressBook = localAddressBook.concat(entry);
        saveAddressBook();
        //$http.post('/data', localAddressBook);

        //ToDo: Check for duplicates
    };

    var deleteEntry = function (entryToDelete) {

        for (var i = 0; i < localAddressBook.length; i++) {
            if (localAddressBook[i].name == entryToDelete.name && localAddressBook[i].address == entryToDelete.address) {
                localAddressBook.splice(i, 1);
            }
        }
        saveAddressBook();
        //$http.post('/data', localAddressBook);
    };

    var updateEntry = function (entryToUpdate) {
        //$http.post('/data', localAddressBook);
        for (var i = 0; i < localAddressBook.length; i++) {
            if (localAddressBook[i].name == entryToUpdate.name) {
                localAddressBook[i] = entryToUpdate;
            }
        }
        saveAddressBook();
    };

    //Is this even needed?
    var saveAddressBook = function () {
        $localStorage.addressBook = localAddressBook;
    };

    return {
        addNewEntry: addNewEntry,
        getEntries: getEntries,
        deleteEntry: deleteEntry,
        updateEntry: updateEntry,
        saveAddressBook: saveAddressBook,
        localAddressBook: localAddressBook
    };
});

app.factory('GoogleMapsService', function ($http) {

    var requestGeocode = function (address) {
        var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;
        return $http.get(requestUrl).then(function (response) {
            //console.log(response.data);
            return response.data;
        });
    };

    return {
        requestGeocode: requestGeocode
    };

});

app.factory('ExportService', function (AddressBookUpdater) {

    var contacts = AddressBookUpdater.getEntries();//.then(function(response){contacts = response;});

    var exportToFile = function () {
        alasql('SELECT * INTO XLSX("Contacts.xlsx",{headers:true}) FROM ?', [contacts]);
    };

    return {
        exportToFile: exportToFile
    };
});