/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.dash', [])

  .controller('DashCtrl', function($scope, $ionicModal, $timeout, $interval, $state, Tags, Login) {

    $scope.tags = [];
    $scope.raw = [];

    Tags.all().then(function (tags) {
      $scope.tags = tags;
      $scope.raw = Tags.raw();
      $scope.maxCounter=function(){
        var maxCounter=1;
        for (var i=0;i<$scope.raw.length;i++) {
            if (maxCounter<$scope.raw[i].tagCounter){
              maxCounter=$scope.raw[i].tagCounter;
            }
        }
        return maxCounter;
      }();
      createChart();
      $interval(createChart ,10000);
    },function (error) {
      alert(error)
    });

    $scope.doRefresh = function () {
      $timeout(function() {
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

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

    //createChart();
    //$interval(createChart ,10000);

    function createChart () {
      $scope.data = [];
      var i;
      for (i=0;i<$scope.raw.length&&i<10;i++) {
        $scope.data.push([{
          x: randomScalingFactor(),
          y: randomScalingFactor(),
          r: generateRadius($scope.raw[i].tagCounter)
        }]);
        while (true) {
          var flag=true;
          for (var j = 0; j < i; j++) {
            var x1=$scope.data[i][0].x;
            var x2=$scope.data[j][0].x;
            var y1=$scope.data[i][0].y;
            var y2=$scope.data[j][0].y;
            var r1=$scope.data[i][0].r;
            var r2=$scope.data[j][0].r;
            var dis=(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
            dis=Math.sqrt(dis);
            if (dis < r1 + r2 - 5) {
              flag=false;
              break;
            }
          }
          if (flag)
            break;
          $scope.data[i]=[{
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: generateRadius($scope.raw[i].tagCounter)
          }]
        }
      }
    }

    function randomScalingFactor () {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 90);
    }

    function generateRadius (counter) {
      return Math.round(counter/$scope.maxCounter*(Math.random() * 10 + 30));
    }

    //Buuble Chart END

  });
