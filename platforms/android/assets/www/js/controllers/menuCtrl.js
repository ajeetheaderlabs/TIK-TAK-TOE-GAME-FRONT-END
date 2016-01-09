tic_tac_toe.controller('menuCtrl', function($scope,$state,$http,localStorageService) {

  $scope.logOut = function(){

    var access_token =  localStorageService.get('access_token');

    var user = {};

    user.access_token = access_token;

    console.log("token",access_token);

    if(access_token) {

      $http({
        url: 'http://192.168.1.250:8000/logOut',
        method: 'POST',
        data: user,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).success(function (result) {
        localStorageService.set('access_token', "");

        $state.go("tabs.home");
        //alert("SignOut successfully.");

      }).error(function (error) {
        alert("There is something wrong happen !!!!");
        console.log("error", error);
      });
    }
    else{
      alert("Please login.");
    }
  }

})
