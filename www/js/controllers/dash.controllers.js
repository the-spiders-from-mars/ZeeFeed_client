/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.dash', [])

  .controller('DashCtrl', function($scope, $ionicModal, $timeout, $interval, $state, Tags, Login) {

    $scope.tags = [];
    Tags.all().then(function (tags) {
      $scope.tags = tags;
      $scope.maxCounter=function(){
        var maxCounter=1;
        for(var i = 0; i < $scope.tags.length; i++) {
          for (var j = 0; j < $scope.tags[i].tagList.length; j++)
            if (maxCounter<$scope.tags[i].tagList[j].tagCounter){
              maxCounter=$scope.tags[i].tagList[j].tagCounter;
            }
        }
        return maxCounter;
      }();
    },function (error) {
      alert(error)
    });

    $scope.doRefresh = function () {
      $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

    // Form data for the login modal
    $scope.loginData = {
      username: "",
      password: ""
    };

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

      Login.doLogin($scope.loginData.username, $scope.loginData.password).then(
        function (ret) {
          if (ret.connection) {
            $scope.closeLogin();
          }
        },
        function () {
          alert("用户名或密码或者网络错误");
        }
      )
    };
    $scope.logout = function () {
      console.log("Logout:",localStorage.user);
      localStorage.user = undefined;
      $scope.closeInfo();
      $state.go('dash', {}, { reload: true })
    };

    $scope.registerData = {
      username: "",
      password1: "",
      password2: ""
    };
    // Create the register modal that we will use later
    $ionicModal.fromTemplateUrl('templates/account/register.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.registerModal = modal;
    });

    // Triggered in the register modal to close it
    $scope.closeRegister = function() {
      $scope.registerModal.hide();
    };

    // Open the register modal
    $scope.register = function() {
      $scope.registerModal.show();
    };

    // Perform the register action when the user submits the login form
    $scope.doRegister = function() {
      if ($scope.registerData.password2 !== $scope.registerData.password1) {
        alert("密码不一致");
      }
      else if ($scope.registerData.username === "" || $scope.registerData.password1 === ""){

      }
      else {
        console.log('Doing register', $scope.registerData);
        Login.doRegister($scope.loginData.username, $scope.loginData.password1).then(
          function (ret) {
            if (ret.connection) {
              $scope.closeLogin();
              $scope.closeRegister();
            }
          },
          function () {
            alert("用户名重复或网络错误");
          }
        );
      }
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/account/account.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.infoModal = modal;
      $scope.user = Login.getUser();
      console.log($scope.user);
    });

    $scope.closeInfo = function () {
      $scope.infoModal.hide();
    };

    $scope.showInfo = function () {
      console.log(JSON.stringify(Login.getUser()),"\"undefined\"");
      if (JSON.stringify(Login.getUser()) === "\"undefined\"")
         $scope.login();
      else
        $scope.infoModal.show();
    };

    $scope.goSettings = function () {
      $state.go('settings');
    };
    //Buuble Chart BEGIN

    $scope.options = {
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }]
      }
    };


    // createChart();
    $interval(createChart ,2000);

    function createChart () {
      $scope.data = [];
      for(var i = 0; i < $scope.tags.length; i++) {
        for (var j = 0; j < $scope.tags[i].tagList.length; j++)
          $scope.data.push([{
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: generateRadius($scope.tags[i].tagList[j].tagCounter)
          }]);
      }
    }

    function randomScalingFactor () {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }

    function generateRadius (counter) {
      return counter/$scope.maxCounter*(Math.random() * 10 + 20);
    }

    //Buuble Chart END

  });
