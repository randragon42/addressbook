//Services

app.factory('AddressBookUpdater', function($http){

    var localAddressBook = {};

    var getEntries = function(){
        return $http.get('/data.json').then(function(response){
            return localAddressBook = response.data;
        });
    };

    var addNewEntry = function(entry){

        localAddressBook = localAddressBook.concat(entry);
        $http.post('/data', localAddressBook);

        //ToDo: Check for duplicates
    };

    var deleteEntry = function(entryToDelete){

        for(var i = 0; i < localAddressBook.length; i++){
            if(localAddressBook[i].name == entryToDelete.name && localAddressBook[i].address == entryToDelete.address){
                localAddressBook.splice(i, 1);
            }
        }

        $http.post('/data', localAddressBook);
    };

    var updateEntry = function(entryToUpdate){
        console.log("Update " + entryToUpdate.name);

        for(var i = 0; i < localAddressBook.length; i++){
            if(localAddressBook[i].name == entryToUpdate.name){
                localAddressBook[i] = entryToUpdate;
            }
        }

        $http.post('/data', localAddressBook);
    };

    //Is this even needed?
    var saveAddressBook = function(){
        $http.post('/data', addressBook);
    };

    return{
        addNewEntry: addNewEntry,
        getEntries: getEntries,
        deleteEntry: deleteEntry,
        updateEntry: updateEntry,
        saveAddressBook: saveAddressBook,
        localAddressBook: localAddressBook
    };
});

app.factory('GoogleMapsService', function($http) {

    var requestGeocode = function(address){
        var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;
        return $http.get(requestUrl).then(function(response){
            //console.log(response.data);
            return response.data;
        });
    };

    return{
        requestGeocode: requestGeocode
    };

});

app.factory('ExportService', function(AddressBookUpdater){

    var contacts = [];
    AddressBookUpdater.getEntries().then(function(response){contacts = response;});

    var exportToFile = function() {
        alasql('SELECT * INTO XLSX("Contacts.xlsx",{headers:true}) FROM ?', [contacts]);
    };

    return{
      exportToFile: exportToFile
    };
});