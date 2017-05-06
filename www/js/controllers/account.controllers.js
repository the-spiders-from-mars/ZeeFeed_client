/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.account', [])


.controller('SettingCtrl', function($scope) {
  $scope.settings = [
    {
      name: "Providers",
      url: "#/provider"
    },
    {
      name: "Personal Info",
      url: "#"
    },
    {
      name: "Common",
      url: "#"
    },
    {
      name: "Reader",
      url: "#"
    },
    {
      name: "Security",
      url: "#"
    },
    {
      name: "About us",
      url: "#"
    }
  ]
})
.controller('ProviderCtrl', function($scope, $ionicModal) {
  $scope.providers = [
    {
      name: "CSDN",
      enable: true
    },
    {
      name: "天涯",
      enable: true
    },
    {
      name: "极客",
      enable: true
    },
    {
      name: "Github",
      enable: true
    },
    {
      name: "Science",
      enable: false
    }
  ];

  $scope.newProvider = {
    name: "",
    address: ""
  };

  $ionicModal.fromTemplateUrl('templates/account/providers.add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.providerModal = modal;
  });

  $scope.addProvider = function () {
    $scope.providerModal.show();
  };
  $scope.closeAddProvider = function () {
    $scope.providerModal.hide();
  };
  $scope.doAddProvider = function () {
    var provider = {
      name: $scope.newProvider.name,
      enable: true,
      address: $scope.newProvider.address
    };
    $scope.newProvider = {
      name: "",
      address: ""
    };
    $scope.providers.push(provider);
    $scope.closeAddProvider();
  };

});
