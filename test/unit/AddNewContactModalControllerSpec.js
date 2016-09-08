//Tests for AddNewContactModalController

describe('AddNewContactModalController', function (){
    var $controllerConstructor, scope, mockAddressBookUpdater, mockLocalAddressBook, mockClose;

    beforeEach(module("app"));

    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        mockAddressBookUpdater = jasmine.createSpyObj('$AddressBookUpdater spy', ['addNewEntry']);
        mockClose = jasmine.createSpy('close() spy');

        /*mockAddressBookUpdater = sinon.stub({
            addNewEntry: function(){},
            getEntries: function(){},
            deleteEntry: function(){},
            updateEntry: function(){},
            saveAddressBook: function(){},
            localAddressBook: mockLocalAddressBook})*/

    }));

    it('Should reset $scope.entry fields to null', function(){
        var ctrl = $controllerConstructor("AddNewContactModalController", {'$scope':scope, 'close': mockClose, 'AddressBookUpdater': mockAddressBookUpdater});
        scope.entry = {"id":"1","name":"John Smith","address":"2153 Goodrich Avenue","city":"St. Paul","state":"MN","phone":"651-555-1234"};
        scope.reset();
        var expected = {};

        expect(scope.entry).toEqual(expected);
    });


    it('Should submit a new entry', function(){
        var ctrl = $controllerConstructor("AddNewContactModalController", {'$scope':scope, 'close':mockClose, 'AddressBookUpdater':mockAddressBookUpdater});
        scope.entry = {"id":"1","name":"John Smith","address":"2153 Goodrich Avenue","city":"St. Paul","state":"MN","phone":"651-555-1234"};
        scope.submitNewEntry(scope.entry);

        expect(mockAddressBookUpdater.addNewEntry).toHaveBeenCalledWith(scope.entry);
        expect(mockClose).toHaveBeenCalled();
    });


    it('Should close the modal', function(){
        var ctrl = $controllerConstructor("AddNewContactModalController", {'$scope':scope, 'close':mockClose, 'AddressBookUpdater':mockAddressBookUpdater});
        scope.close();

        expect(mockClose).toHaveBeenCalled();
    });
});