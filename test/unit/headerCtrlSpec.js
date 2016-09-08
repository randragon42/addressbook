//Tests for AddNewContactModalController

describe('headerCtrl', function (){
    var $controllerConstructor, scope, ModalServiceMock, ExportServiceMock;

    beforeEach(module("app"));

    beforeEach(inject(function($controller, $rootScope, ModalService) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        //ModalServiceMock = jasmine.createSpyObj('ModalService spy', ['showModal']);
        ModalServiceMock = {showModal:function(){}};

        ExportServiceMock = jasmine.createSpyObj('Export Service spy', ['exportToFile']);
    }));

    /*it('HOW DO I TEST THIS?!', function(){
        var ctrl = $controllerConstructor("headerCtrl", {'$scope':scope, 'ModalService':ModalServiceMock, 'ExportService': ExportServiceMock});
        var args = {templateUrl: 'templates/newContactModal.html', controller: "AddNewContactModalController", animation: false};
        spyOn(ModalServiceMock, "showModal").and.callThrough();
        scope.showAddNewContact();

        expect(ModalServiceMock.showModal).toHaveBeenCalledWith(args);
    });*/

    it('Should call ExportService.exportToFile', function(){
        var ctrl = $controllerConstructor("headerCtrl", {'$scope':scope, 'ModalService':ModalServiceMock, 'ExportService': ExportServiceMock});
        scope.exportToFile();

        expect(ExportServiceMock.exportToFile).toHaveBeenCalled();
    });

});