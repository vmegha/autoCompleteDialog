musicApp.controller('mainCtrl', function($scope, musicFactory, $window){
	$scope.load = true;
	$scope.myLimit = 2;
	musicFactory.getMusic().then(function(data){
		$scope.companyList = data.companies;
		$scope.load = false;
	},function(error){
		$scope.error =  "Oops Something wrong happend please try again later";
		$scope.load = false;
	});
	$scope.columnNames = [
	{
		name: "col1",
		check: false,
	},
	{
		name: "col2",
		check: false
	},
	{
		name: "col3",
		check: false
	}
	]

	$scope.scrollRight = function(event){
        event.stopImmediatePropagation()
		var tableId = document.getElementById("searchTable");
        tableId.scrollLeft += 100;
        //tableId.scrollTo(100, 0);
	}

    $scope.scrollLeft = function(event){
        event.stopImmediatePropagation();
        var tableId = document.getElementById("searchTable");
        //tableId.scrollTo(-100, 0);
        tableId.scrollLeft -= 100;
    }

	$scope.loadMore = function(){
		if($scope.myLimit < $scope.companyList.length){
			$scope.load = true;
			$scope.myLimit = $scope.myLimit + 2 ;
			$scope.load = false;
		}
	}
	$scope.showCheckboxes = function(event){
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
	}


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

