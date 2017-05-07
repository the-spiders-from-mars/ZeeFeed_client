/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.dash', [])

  .controller('DashCtrl', function($scope, $sce, $ionicModal, $timeout, $interval, $state, Tags, Login) {

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
      //$interval(createChart ,10000);
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
        function (ret) {
          console.log(ret);
          alert("用户名或密码或者网络错误");
        }
      )
    };
    $scope.logout = function () {
      console.log("Logout:", Login.getUser());
      localStorage.userName = "";
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
            if (ret.flag) {
              $scope.closeLogin();
              $scope.closeRegister();
            }
          },
          function (ret) {
            console.log(ret);
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
      console.log("user info", $scope.user);
    });

    $scope.closeInfo = function () {
      $scope.infoModal.hide();
    };

    $scope.showInfo = function () {
      // console.log(JSON.stringify(Login.getUser()),undefined);
      // if (Login.getUser() === undefined)
      //    $scope.login();
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
      return counter/$scope.maxCounter*(Math.random() * 10 + 20);
    }

    //Buuble Chart END


    //Timeline start
    // FAKE CONTENT FOR THE DEMO
    $scope.timeline = $sce.trustAsResourceUrl("templates/account/timeline.html");
    // timeline end

  });
