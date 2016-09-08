//Services

app.factory('AddressBookUpdater', function($http, ADDRESSES){

    var localAddressBook = [{"id":"1","name":"John Smith","address":"2153 Goodrich Avenue","city":"St. Paul","state":"MN","phone":"651-555-1234"},
        {"id":"3","name":"Felecity Schmidt","address":"1309 West Dayton Street","city":"Madison","state":"WI","phone":"888-555-1234"},
        {"id":"5","name":"Linus Torvald","address":"35 Silicon Valley Way","city":"Mountainview","state":"CA","phone":"608-555-1234"},
        {"id":"6","name":"Marie Curie","address":"Tour Eiffel","city":"Paris","state":"France","phone":"323-555-1234"},
        {"name":"Leonardo DiCaprio","address":"17 Hollywood Boulevard","city":"Beverly Hills","state":"CA","phone":"312-555-8974"},
        {"name":"David Fuller","address":"67 Fife Avenue","city":"New York","state":"NY","phone":"777-777-7777"},
        {"name":"John Cena","address":"77 Hemlock Lane","city":"Pacedena","state":"CA","phone":"888-888-8888"},
        {"name":"Edgar A. Poe","address":"13 Crazy Street","city":"Boston","state":"MA","phone":"131-313-1313"},
        {"name":"Barack Obama","address":"1600 Pennsylvania Avenue","city":"Washington","state":"DC","phone":"123-456-7890"},
        {"name":"Albert Johnson","address":"1600 Utica Avenue","city":"St. Louis Park","state":"MN","phone":"888-867-5309"},
        {"name":"Barney Fife","address":"18 Main Street","city":"Mayberry","state":"IN","phone":"555-555-8789"}];

    var getEntries = function(){
        return localAddressBook;
        /*return $http.get('/data.json').then(function(response){
            return localAddressBook = response.data;
        });*/
    };

    var addNewEntry = function(entry){

        localAddressBook = localAddressBook.concat(entry);
        //$http.post('/data', localAddressBook);

        //ToDo: Check for duplicates
    };

    var deleteEntry = function(entryToDelete){

        for(var i = 0; i < localAddressBook.length; i++){
            if(localAddressBook[i].name == entryToDelete.name && localAddressBook[i].address == entryToDelete.address){
                localAddressBook.splice(i, 1);
            }
        }
        //$http.post('/data', localAddressBook);
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

    var contacts = AddressBookUpdater.getEntries();//.then(function(response){contacts = response;});

    var exportToFile = function() {
        alasql('SELECT * INTO XLSX("Contacts.xlsx",{headers:true}) FROM ?', [contacts]);
    };

    return{
      exportToFile: exportToFile
    };
});