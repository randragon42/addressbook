//Tests for AddNewContactModalController

describe('EditContactModalController', function (){
    var $controllerConstructor, scope, AddressBookUpdaterMock, closeMock, entryMock;

    beforeEach(module("app"));

    beforeEach(inject(function($controller, $rootScope, $q) {
        var deferred = $q.defer();
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        AddressBookUpdaterMock = jasmine.createSpyObj('AddressBookUpdater spy', ['addNewEntry', 'getEntries', 'deleteEntry', 'updateEntry', 'saveAddressBook', 'localAddressBook'])
        //AddressBookUpdaterMock.getEntries = function(){};
        //spyOn(AddressBookUpdaterMock, 'getEntries').and.returnValue(deferred.promise);
        closeMock = jasmine.createSpy('close spy');
        entryMock = {"id":"1","name":"John Smith","address":"2153 Goodrich Avenue","city":"St. Paul","state":"MN","phone":"651-555-1234"};
    }));

    /*it('Should call getEntries', inject(function(AddressBookUpdater){
        var ctrl = $controllerConstructor("EditContactModalController", {'$scope':scope, 'close': closeMock, 'entry':entryMock});
        var spy = spyOn(AddressBookUpdater, 'getEntries').and.callFake(function(){
            return null;
        });
        expect(spy).toHaveBeenCalled();
    }));*/

    it('Should call deleteEntry', inject(function(AddressBookUpdater){
        var ctrl = $controllerConstructor("EditContactModalController", {'$scope':scope, 'close': closeMock, 'entry':entryMock});
        // var spy1 = spyOn(AddressBookUpdater, 'getEntries').and.callFake(function(){
        //     return null;
        // });
        var deleteEntrySpy = spyOn(AddressBookUpdater, 'deleteEntry').and.callFake(function(){
            return null;
        });
        scope.deleteEntry(entryMock);

        expect(deleteEntrySpy).toHaveBeenCalledWith(entryMock);
    }));

    it('Should call updateEntry', inject(function(AddressBookUpdater) {
        var ctrl = $controllerConstructor("EditContactModalController", {'$scope':scope, 'close': closeMock, 'entry':entryMock});
        var updateEntrySpy = spyOn(AddressBookUpdater, 'updateEntry').and.callFake(function(){
           return null;
        });
        scope.updateEntry(entryMock);

        expect(updateEntrySpy).toHaveBeenCalledWith(entryMock);
    }));

});