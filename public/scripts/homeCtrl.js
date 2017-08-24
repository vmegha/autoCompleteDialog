musicApp.controller('mainCtrl', function($scope, musicFactory, $window){
    $scope.load = true;
    $scope.myLimit = 2;
	/*musicFactory.getMusic().then(function(data){
	 $scope.companyList = data.companies;
	 $scope.load = false;
	 },function(error){
	 $scope.error =  "Oops Something wrong happend please try again later";
	 $scope.load = false;
	 });*/
	$scope.employeeData = {};
    $scope.data = [
        {team: 'Engineering', employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']},
        {team: 'Executive', employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']},
        {team: 'Finance', employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']},
        {team: 'Sales', employees: ['Ankit Jain', 'Anjali Maulingkar']}
    ]




    $scope.showItemList = function(listId){
        event.stopImmediatePropagation();
        delete $scope.teamError;
        delete $scope.validationError;
        var checkboxes = document.getElementById(listId);
        if (!$scope.expanded) {
            checkboxes.style.display = "block";
            $scope.expanded = true;
        } else {
            checkboxes.style.display = "none";
            $scope.expanded = false;
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
                if($scope.listEmployees[nameKey].toLowerCase() === $scope.employeeData.selectedEmployee){
                    var matchedName = true;
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
    }
    //$scope.selectedTeam = $scope.searchTeam
	/*$scope.showCheckboxes = function(event){
	 event.stopImmediatePropagation()
	 var checkboxes = document.getElementById("checkboxes");
	 if (!$scope.expanded) {
	 checkboxes.style.display = "block";
	 $scope.expanded = true;
	 } else {
	 checkboxes.style.display = "none";
	 $scope.expanded = false;
	 }
	 }
	 $scope.addOrRemoveCol = function( col){
	 if(col.check){
	 var columns = document.getElementById("heading");
	 var th = document.createElement("th");
	 th.innerHTML = col.name
	 columns.append(th);
	 //document.getElementsByClassName("example");
	 var rows = document.getElementById("tableBody");
	 angular.forEach(rows.children, function(rowValue, key){
	 var tdElem = document.createElement("td");
	 tdElem.innerHTML = "test data";
	 rowValue.append(tdElem);
	 })

	 }
	 }

	 $scope.onclick = function(){
	 $scope.expanded = false;
	 checkboxes.style.display = "none";
	 }*/


});

musicApp.directive('onOuterClick', function ($document) {
    return {
        restrict: 'EA',

        link: function (scope, elem, attr) {
            elem.bind('click', function (e) {
                e.stopPropagation();
            });
            $document.bind('click', function () {
                //scope.$applyAsync(attr.onOuterClick);
                scope.$apply(attr.onclick)
            });


        }
    };
});

musicApp.factory('musicFactory', function($q, $http){
    return{
        getMusic : function(){
            var productionUrl = "https://vmegha.github.io/companyInfo/";
            var deferred = $q.defer();
            $http.get(productionUrl + 'companies.json', {
                cache: true
            })
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }

});

musicApp.filter("sortByTeam", function(){
    return function(list, searchText ) {
        if (!searchText) {
            return list;
        }
        var result = [];
        angular.forEach(list, function (item, key) {
            const regex = new RegExp(searchText, 'i');
            var finalItem = item.team;
            var searchItems1 = [];
            var searchItems2 = [];
            var searchItems3 = [];
            if (regex.test(finalItem.substring(0, searchText.length))) {
                searchItems1.push(item);
            } else if (regex.test(finalItem.substring(searchText.length))) {
                searchItems2.push(item);
            } else if (finalItem.indexOf(searchText) > -1) {
                searchItems3.push(item);
            }
			if(searchItems1.length){
                result = result.concat(searchItems1)
			}
            if(searchItems2.length){
				result = result.concat(searchItems2);
			}
            if(searchItems3.length) {
                result = result.concat(searchItems2);
            }
        });
        console.log(result);

        return result;

    }
});

musicApp.filter("sortByEmployees", function(){
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
        console.log(result);

        return result;

    }
});

