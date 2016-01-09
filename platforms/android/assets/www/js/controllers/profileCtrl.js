tic_tac_toe.controller('profileCtrl', function ($scope,$q, $http, $state,$cordovaCamera, localStorageService) {


  $scope.user = {};

  var access_token = localStorageService.get('access_token');


  $scope.getProfile = function () {

    var dfd = $q.defer();

    var data = [];
    setTimeout(function () {
      $http({
        url: 'http://52.25.164.84:8000/profile',
        method: "GET",
        params: {access_token: access_token}
      }).success(function (result) {

        data.push(result);

        if (parseInt(data[0].status) === 200) {

          //console.log("data in edit profile",data[0].data[0].image);

          //localStorageService.set('access_token', result.data[0].access_token);

          $scope.user.name = data[0].data[0].full_name;

          $scope.user.user_name = data[0].data[0].user_name;

          $scope.imgURI = data[0].data[0].image;

          $scope.user.password = '....';


          if (result.data[0].gender == 0) {
            $scope.user.gender = 'Female';
          }
          else {
            $scope.user.gender = 'Male';

          }

        } else if (parseInt(data[0].status) === 400) {
          alert(result.message);
        }

        dfd.resolve(data);
      }).error(function (error) {
        alert("There is something wrong happen !!!!");
        console.log("error", error);
      });
    })
    return dfd.promise;
  }

  $scope.getProfile();

  $scope.takePicture = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };



    $cordovaCamera.getPicture(options).then(function(imageData) {

      $scope.imgURI = "data:image/jpeg;base64," + imageData;

      //$scope.images.push(imgURI);

    }, function(err) {
      // An error occured. Show a message to the user
    });


  }

  $scope.editProfile = function () {

    var user = {};

    user.access_token = access_token;

    user.name = $scope.user.name;

    user.base64ImageData = $scope.imgURI;

    var dfd = $q.defer();

    var data = [];

    setTimeout(function () {

    $http({
      url: 'http://192.168.1.250:8000/edit_profile',
      method: 'POST',
      data: user,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).success(function (result) {
      data.push(result);
      console.log("result for edit api", data[0]);
      dfd.resolve(data);
    }).error(function (error) {
      alert("There is something wrong happen !!!!");
      console.log("error", error);
    });
    })
    return dfd.promise;
  }

});


