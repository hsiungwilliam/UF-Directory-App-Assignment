angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */

     $scope.showListingDetail = false;
    $scope.addListing = function(code, name, latitude, longitude, address) {
       $scope.temp = {
        "code": code,
        "name": name,
        "coordinates": {
          "latitude": latitude, 
          "longitude": longitude,
        }, 
        "address": address
       };
       $scope.listings.push($scope.temp);
    };
    $scope.deleteListing = function(index) {
      $scope.listings.splice(index,1);
    };
    $scope.showDetails = function(index) {
      $scope.showListingDetail = true;
      $scope.current = $scope.listings[index];
    };
  }
]);