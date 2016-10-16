ToDoApp.controllers.controller('CTRL_Home',['$scope','uiGridConstants','$http',
                                            function($scope,uiGridConstants,$http){
	ctrl = this;
	
	//Grid Config to display list of all the items available
	ctrl.toDoGridConfig = {
			enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
			enableFiltering : true, rowHeight: 50,
			onRegisterApi: function(grid){
				$scope.toDoGrid = grid;
			},
			columnDefs:[
			         {
			        	 displayName: 'Item name', enableColumnMenu: false,headerCellClass: 'centerAlign',
			        	 field: 'itemName'
			         },
			         {
			        	 displayName: 'Item Status', enableColumnMenu: false, headerCellClass: 'centerAlign',
			        	 cellTemplate: '<div class="ui-grid-cell-contents centerAlign"><input type="checkbox" ng-model="row.entity.isTaskCompleted" ng-click="grid.appScope.homeCtrl.addTask(row)"/> Completed</div>',
			        	 field: 'isTaskCompleted', enableCellEdit: false,
			        	 filter: {
			        		 //Custom Filter condition
			                 condition: function(searchTerm, cellValue, row) {
			                   if('completed'.indexOf(searchTerm)!=-1 && row.entity.isTaskCompleted)
			                	   return true;
			                   else if('completed'.indexOf(searchTerm)==-1 && row.entity.isTaskCompleted==false)
			                	   return true;
			                   else   
			                	   return false;
			                 }
			              }
			         },
			         {
			        	 displayName: 'Action', enableColumnMenu: false, enableFiltering : false, headerCellClass: 'centerAlign',
			        	 cellTemplate: '<div class="ui-grid-cell-contents centerAlign"><button class="btn btn-primary" ng-click="grid.appScope.homeCtrl.removeTask(row.entity)">Remove</button></div>',
			        	 field: ' ', enableCellEdit:false
			         }
			 ]
	};
	
	//Grid Config to display list of Items with status as 'Completed'.
	ctrl.toDoCompletedGridConfig = {
			enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
			enableFiltering : true, rowHeight: 50,
			onRegisterApi: function(grid){
				$scope.toDoCompletedGrid = grid;
			},
			columnDefs:[
			         {
			        	 displayName: 'Item name', enableColumnMenu: false,headerCellClass: 'centerAlign',
			        	 field: 'itemName'
			         }
			 ]
	};
	ctrl.toDoCompletedGridConfig.data = [];
	
	//Fetching list from server (here, it is reading hard-coded JSON).
	$http.get('data/To_Do_List.json')
    .success(function(data) {
    	ctrl.toDoGridConfig.data = data;
    });
	
	//This method refreshes the list of all items which have Item Status as 'Completed'.
	ctrl.refreshCompletedItems = function(){
		var checkVal = false;
		angular.forEach(ctrl.toDoGridConfig.data,function(item){
			if(item.isTaskCompleted){
				//This loop checks if the current Item already exists in the list. This keeps check on addition of any item twice.
				//If the Item is not present, then, the item is added in to the list.
				angular.forEach(ctrl.toDoCompletedGridConfig.data,function(compItem){
					if(compItem.itemName==item.itemName)
						checkVal = true;
				});
				if(!checkVal){
					ctrl.toDoCompletedGridConfig.data.push(item);
				}
			}
		});
		if(ctrl.toDoCompletedGridConfig.data.length==0){
			$('#AlertModal').modal('show');
		}
	};
	
	//This method is invoked when any item is marked as checked or unchecked.
	//Accordingly, the item is added or removed from the list of 'Completed' Items.
	ctrl.addTask = function(row){
		var checkVal = false;
		if(row.entity.isTaskCompleted){
			angular.forEach(ctrl.toDoCompletedGridConfig.data,function(value){
				if(value.itemName==row.entity.itemName)
					checkVal = true;
			});
			if(!checkVal){
				ctrl.toDoCompletedGridConfig.data.push(row.entity);
			}
		}else{
			ctrl.toDoCompletedGridConfig.data.splice(ctrl.toDoCompletedGridConfig.data.indexOf(row.entity),1);
		}
	};
	
	var tempVal = "";
	//This method is invoked when a task is removed through 'Remove' button.
	ctrl.removeTask = function(itemName){
		//This is a check when any uncompleted item is removed. In such a case, a confirmation modal appears asking user confirmation 
		//to remove the task.
		if(itemName.isTaskCompleted==false){
			$('#ConfirmationModal').modal('show');
			tempVal = itemName;
		}else{
			ctrl.toDoGridConfig.data.splice(ctrl.toDoGridConfig.data.indexOf(itemName),1);
		}
	};
	
	//When User chooses 'Yes' on confirmation modal.
	ctrl.removeTaskYes = function(itemName){
		ctrl.toDoGridConfig.data.splice(ctrl.toDoGridConfig.data.indexOf(tempVal),1);
	}
	//When User chooses 'No' on confirmation modal.
	ctrl.removeTaskNo = function(itemName){
		$('#ConfirmationModal').modal('hide');
	}
	
	//This method is for adding a new Task.
	ctrl.addNewtask = function(){
		ctrl.toDoGridConfig.data.push({
			itemName:'',
			isTaskCompleted: false
		});
	};
	
}]);