tic_tac_toe.controller('DashboardCtrl', function ($scope,$q, $http, localStorageService) {

  $scope.dashBoardData = "";

  var access_token = localStorageService.get('access_token');

  //$http({
  //  url: 'http://192.168.1.250:8000/dashboard',
  //  method: "GET",
  //  params: {access_token: access_token}
  //}).success(function (result) {
  //  data.push(result);
  //  alert("data result");
  //  $scope.dashBoardData = data[0].data;
  //  console.log(data[0].message);
  //}).error(function (error) {
  //  alert("Comes from error");
  //});

  $scope.getDashboard = function () {
    var dfd = $q.defer();
    var data = [];
    setTimeout(function () {
      $http({
        url: 'http://192.168.1.250:8000/dashboard',
        method: "GET",
        params: {access_token: access_token}
      }).success(function (result) {
        data.push(result);
        console.log("data result",data[0]);

        $scope.dashBoardData = data[0].data;
        console.log(data[0].message);
        dfd.resolve(data);
      }).error(function (error) {
        alert("Comes from error");
      });
    })
    return dfd.promise;
  };

  $scope.getDashboard();

  $scope.initiateGame = function(url) {
    window.open(url,'_blank', 'location=yes')
  };

});

