/**
 * Created by duocai on 2017/5/6.
 */

angular.module('starter.routers', ['routers.account'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('dash', {
      url: '/dash',
      controller: 'DashCtrl',
      templateUrl: 'templates/dash/dash.html'
    })
    .state('tagDetail', {
      url: '/tag/:tagName',
      controller: 'TagCtrl',
      templateUrl: 'templates/blog/detail.tag.html'
    })
    .state('blogDetail', {
      url: '/blog/:blogId',
      controller: 'BlogCtrl',
      templateUrl: 'templates/blog/detail.blog.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash');

});
