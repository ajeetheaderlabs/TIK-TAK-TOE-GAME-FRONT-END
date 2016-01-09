tic_tac_toe.controller('loginCtrl', function ($scope, $state,$http,$q,localStorageService) {

  var token = localStorageService.get('access_token');


  console.log("token value in login connn",token);


  $scope.checkAuth = function(){

    if(token){

      $state.go('menu.dashboard');
    }
    else{
      $state.go('tabs.home');
    }

  }
  $scope.checkAuth();


  $scope.user = {};

  $scope.getGameId = function(access_token1){

    var user = {};

    var access_token = access_token1;

    user.access_token = access_token;

    var dfd = $q.defer();

    var data = [];
    setTimeout(function () {
      $http({
        url: 'http://192.168.1.250:8000/initialize_game',
        method: 'POST',
        data: user,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).success(function (result) {


        data.push(result);
        console.log("result for game api", data[0]);
        dfd.resolve(data);
      }).error(function (error) {
        console.log("error", error);
      });

    })
    return dfd.promise;
  }



    $scope.login = function () {

      var token = localStorageService.get('access_token');

      var dfd = $q.defer();

      var value = [];

      setTimeout(function () {
        $http({
          url: 'http://192.168.1.250:8000/login',
          method: "GET",
          params: {user_name: $scope.user.username, password: $scope.user.password}
        }).success(function (result) {
          value.push(result);
          if (parseInt(value[0].status) === 200) {

            localStorageService.set('access_token', value[0].data[0].access_token);

            var access_token = localStorageService.get('access_token');

            $scope.getGameId(access_token);

            alert(value[0].message);

            $state.go('menu.dashboard');

            $scope.user.username = "";
            $scope.user.password = "";

          } else if (parseInt(value[0].status) === 400) {
            alert(value[0].message);
          }

          dfd.resolve(value);
        }).error(function (error) {
          alert("There is something wrong happen !!!!");
          console.log("error", error);
        });

      })
      return dfd.promise;
    }

});


