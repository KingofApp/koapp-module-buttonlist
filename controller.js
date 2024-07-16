angular
.controller('ButtonListController', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', 'storageService', '$location', '$rootScope'];

function loadFunction($scope, structureService, storageService, $location, $rootScope) {
//Register upper level modules
structureService.registerModule($location, $scope, 'buttonlist');

$scope.buttonlist.modulescope.newsections = [];
$rootScope.currentIndex = -1;

 function getMenu() {
  var menu = [];
  //var trExp = /[\/\s]+/gi;

  angular.forEach($scope.buttonlist.modulescope.menuItems, function (value, key) {
      
    let use_module_name = $scope.buttonlist.modulescope.usemodulename;

    if( $location.path() === value.path ){
      $rootScope.currentIndex = key;
    }
    structureService.getModule(value.path).then(function (module) {
      menu.push({
        name: use_module_name? module.name : value.name,
        icon: module.icon,
        url: "#" + value.path
      });

    });
  });
  return menu;
}

$scope.buttonlist.modulescope.newsections = getMenu();   
}
