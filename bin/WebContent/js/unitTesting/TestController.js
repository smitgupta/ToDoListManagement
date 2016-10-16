describe('CTRL_Home', function() {
  beforeEach(angular.mock.module('ToDo_App'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('ctrl.refreshCompletedItems', function() {
    it('refreshes the list of \'Completed\' items to display separately', function() {
      var $scope = {};
      var controller = $controller('CTRL_Home', { $scope: $scope });
      controller.toDoGridConfig.data = [
             {"itemName":"Pick up Groceries from the store","itemStatus":"Pending","isTaskCompleted":true},
             {"itemName":"Shopping from market","itemStatus":"Pending","isTaskCompleted":false}];
      controller.refreshCompletedItems();
      expect(controller.toDoCompletedGridConfig.data).toEqual(1);
    });
  });
});