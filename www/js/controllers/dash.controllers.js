/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.dash', [])

  .controller('DashCtrl', function($scope, $ionicModal, $timeout, $interval, $state, Tags, Login) {

    $scope.tags = [];
    Tags.all().then(function (tags) {
      $scope.tags = tags;
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

    $scope.tags= [
      {
        headLetter: "A",
        tagList: [
          {
            tagName: "Adobe",
            tagCounter: 243
          }
        ]
      },
      {
        headLetter: "C",
        tagList: [
          {
            tagName: "Code",
            tagCounter: 2433
          }
        ]
      }
    ];

    var maxCounter=function(){
      var maxCounter=0;
      for(var i = 0; i < $scope.tags.length; i++) {
        for (var j = 0; j < $scope.tags[i].tagList.length; j++)
        if (maxCounter<$scope.tags[i].tagList[j].tagCounter){
          maxCounter=$scope.tags[i].tagList[j].tagCounter;
        }
      }
      return maxCounter;
    }();
    createChart();
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
      return function(){
        var c=0;
        for(var i = 0; i < $scope.tags.length; i++) {
          for (var j = 0; j < $scope.tags[i].tagList.length; j++)
            $scope.data[c++]=([{
              x: randomScalingFactor(),
              y: randomScalingFactor(),
              r: generateRadius($scope.tags[i].tagList[j].tagCounter)
            }]);
        }
      }
    }

    function randomScalingFactor () {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }

    function generateRadius (counter) {
      return counter/maxCounter*(Math.random() * 10 + 20);
    }

    //Buuble Chart END
    
  });
