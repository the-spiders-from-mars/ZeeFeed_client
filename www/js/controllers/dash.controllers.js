/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.dash', [])

  .controller('DashCtrl', function($scope, $ionicModal, Tags, Login) {
    $scope.tags = [];
    Tags.all().then(function (tags) {
      $scope.tags = tags;
    },function (error) {
      alert(error)
    });

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/account/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.loginModal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.loginModal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/account/account.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.infoModal = modal;
    });

    $scope.closeInfo = function () {
      $scope.infoModal.hide();
    };

    $scope.showInfo = function () {
      // if (Login.getUser() === undefined)
      //   $scope.login();
      // else
        $scope.infoModal.show();
    };
  });
