//Controllers

app.controller('addressBookCtrl', function($scope, $rootScope, AddressBookUpdater, GoogleMapsService, ModalService) {
    $scope.addressSortOrder = "+name";
    $scope.addressBook = AddressBookUpdater.getEntries();//.then(function(response){$scope.addressBook = response;});

    $rootScope.$on('refreshAddressBook', function(){
        $scope.addressBook = AddressBookUpdater.getEntries();/*.then(function(response){
            $scope.addressBook = response;
        });*/
    });

    //Add Google Maps integration
    window.initMap = function() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 44.540, lng: -78.546},
            zoom: 8
        });
    };

    $scope.updateMap = function(entry){
        var address = entry.address + " " + entry.city + ", " + entry.state;
        //convert spaces to '+'
        address = address.split(' ').join('+');
        $scope.location = {};
        GoogleMapsService.requestGeocode(address).then(function(response)
            {
                $scope.location = response.results[0].geometry.location;
                var mapDiv = document.getElementById('map');
                var map = new google.maps.Map(mapDiv, {
                    center: $scope.location,
                    zoom: 14
                });
                var marker = new google.maps.Marker({
                    position: $scope.location,
                    map:map,
                    title: entry.name
                });
            });
    };

    $scope.showEditContactModal = function(entry) {
        ModalService.showModal({
            templateUrl: 'templates/editContactModal.html',
            controller: "EditContactModalController",
            animation: false,
            inputs: {entry : entry}
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(result){
                    $rootScope.$emit('refreshAddressBook');
                }
            });
        });
    };

});

app.controller('EditContactModalController', function($scope, AddressBookUpdater, close, entry){
    var refresh = true;
    $scope.entryToUpdate = entry;
    $scope.addressBook = AddressBookUpdater.getEntries();//.then(function(response){$scope.addressBook = response;});

    $scope.deleteEntry = function(){
        AddressBookUpdater.deleteEntry($scope.entryToUpdate);
        close(refresh, 500);
    };

    $scope.updateEntry = function(){
        AddressBookUpdater.updateEntry($scope.entryToUpdate);
        close(refresh, 500);
    };


    $scope.close = function(result) {
        close(!refresh, 500); // close, but give 500ms for bootstrap to animate
    };

});

app.controller('headerCtrl', function($scope, $rootScope, ModalService, ExportService) {

    $scope.showAddNewContact = function() {
        ModalService.showModal({
            templateUrl: 'templates/newContactModal.html',
            controller: "AddNewContactModalController",
            animation: false
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(result){
                    $rootScope.$emit('refreshAddressBook');
                }
            });
        });
    };

    $scope.exportToFile = function() {
        ExportService.exportToFile();
    };

});

app.controller('AddNewContactModalController', function($scope, close, AddressBookUpdater) {

    var refresh = true;

    $scope.reset = function(){
        $scope.entry = {};
    };

    $scope.entry = {};

    //ToDo: Make search for duplicates dynamic rather than on button press. Display message in popup rather than alerting

    $scope.submitNewEntry = function(){
        var addressBook = AddressBookUpdater.getEntries();//.then(function(response){
            //addressBook = response;
        for(var i = 0; i < addressBook.length; i++){
            if(addressBook[i].name === ($scope.entry.name)){
                alert($scope.entry.name + " already exists in your address book. Please use a different name.");
                return;
            }
        }
        AddressBookUpdater.addNewEntry($scope.entry);
        close(refresh, 500);
    };


    $scope.close = function(refresh) {
        close(!refresh, 500); // close, but give 500ms for bootstrap to animate
    };

});