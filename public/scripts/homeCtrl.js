autoSuggestApp.controller('mainCtrl', function($scope, $window){


	$scope.employeeData = {};
    $scope.data = [
        {team: 'Engineering', employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']},
        {team: 'Executive', employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']},
        {team: 'Finance', employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']},
        {team: 'Sales', employees: ['Ankit Jain', 'Anjali Maulingkar']}
    ];




    $scope.showItemList = function(listId){
        event.stopImmediatePropagation();
        delete $scope.teamError;
        delete $scope.validationError;
        var checkboxes = document.getElementById(listId);
        if(checkboxes){
            if (!$scope.expanded) {
                checkboxes.style.display = "block";
                $scope.expanded = true;
            } else {
                checkboxes.style.display = "none";
                $scope.expanded = false;
            }
		}
    }

    $scope.selectEmployee = function() {
    	delete $scope.teamError;
    	delete $scope.validationError;
        if(!$scope.employeeData.selectedTeam) {
			$scope.teamError = "Please select a valid team";
			return;
        }
        angular.forEach($scope.data, function (item, value) {
            if ((item.team).toLowerCase() == ($scope.employeeData.selectedTeam).toLowerCase()) {
                $scope.listEmployees = item.employees;
            }
        })
    }

    $scope.validateDialogBox = function(){
        delete $scope.teamError;
        delete $scope.validationError;
    	var matchedName = false;
        if($scope.listEmployees && $scope.listEmployees.length){
            for(var nameKey=0; nameKey< $scope.listEmployees.length; nameKey++){
                if($scope.listEmployees[nameKey].toLowerCase() === $scope.employeeData.selectedEmployee.toLowerCase()){
                    var matchedName = true;
                    $scope.successfulSubmission = true;
                    break;
                }
            }
		}
        if(!matchedName){
			$scope.validationError = "employee name typed does not match an employee in the data";
		}
	}

    $scope.changeBackgroundColor = function(objId){
    	var element = document.getElementById(objId)
        element.style.backgroundColor="#00bef2";
        element.style.color= "white";
	}

    $scope.retainBackgroundColor = function(objId){
        var element = document.getElementById(objId)
        element.style.backgroundColor="#9e9e9e61";
        element.style.color= "black";
    }

    $scope.cancelDialogBox = function(){
    	if($scope.employeeData.selectedTeam || $scope.employeeData.selectedEmployee){
    		$scope.openConfirmationBox = true;
    		$scope.confirmationMsg = "All the edits will be removed. Do you want to continue?"
		}
		else{
    		$scope.successfulSubmission = true;
		}
	}

	$scope.cancelConfirmBox = function(){
    	delete $scope.openConfirmationBox;
        delete $scope.confirmationMsg;
	}

	$scope.doneConfirmBox = function(){
         delete $scope.employeeData.selectedTeam;
         delete $scope.employeeData.selectedEmployee;
		 delete $scope.openConfirmationBox;
		 delete $scope.confirmationMsg;
	}


});


autoSuggestApp.filter("sortByTeam", function(){
    return function(list, searchText ) {
        if (!searchText) {
            return list;
        }
        var result = [];
        var searchItems1 = [];
        var searchItems2 = [];
        var searchItems3 = [];
        angular.forEach(list, function (item, key) {
            const regex = new RegExp(searchText, 'i');
            var finalItem = item.team;
            if (regex.test(finalItem.substring(0, searchText.length))) {
                searchItems1.push(item);
            } else if (regex.test(finalItem.substring(searchText.length))) {
                searchItems2.push(item);
            } else if (finalItem.indexOf(searchText) > -1) {
                searchItems3.push(item);
            }
        });
        if(searchItems1.length){
            result = result.concat(searchItems1)
        }
        if(searchItems2.length){
            result = result.concat(searchItems2);
        }
        if(searchItems3.length) {
            result = result.concat(searchItems2);
        }
        return result;

    }
});

autoSuggestApp.filter("sortByEmployees", function(){
    return function(list, searchText ) {
        if (!searchText) {
            return list;
        }
        var result = [];
        var searchItems1 = [];
        var searchItems2 = [];
        var searchItems3 = [];
        angular.forEach(list, function (item, key) {
            const regex = new RegExp(searchText, 'i');
            var finalItem = item;
            if (regex.test(finalItem.substring(0, searchText.length))) {
                searchItems1.push(item);
            } else if (regex.test(finalItem.substring(searchText.length))) {
                searchItems2.push(item);
            } else if (finalItem.indexOf(searchText) > -1) {
                searchItems3.push(item);
            }

        });
        if(searchItems1.length){
            result = result.concat(searchItems1)
        }
        if(searchItems2.length){
            result = result.concat(searchItems2);
        }
        if(searchItems3.length) {
            result = result.concat(searchItems2);
        }
        return result;

    }
});

