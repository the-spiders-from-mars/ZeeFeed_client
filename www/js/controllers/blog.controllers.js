/**
 * Created by duocai on 2017/5/6.
 */

/**
 * Created by duocai on 2017/5/6.
 */

angular.module('ctrl.blog', [])

  .controller('TagCtrl', function($scope, $stateParams, $state, Blogs) {
    $scope.blogs = [];
    $scope.tagName = $stateParams.tagName;
    Blogs.getBlogs($scope.tagName).then(function (blogs) {
      $scope.blogs = blogs;
      $scope.showsSign = [true];
    },function (error) {
      alert(error);
    });
    $scope.toggleShowsSign = function (index) {
      $scope.showsSign[index] = !$scope.showsSign[index];
    };
    $scope.showBlog = function (id) {
      $state.go('blogDetail',{blogId: id});
    };
  })
  .controller('BlogCtrl', function($scope, $stateParams, Blogs) {
    var id = $stateParams.blogId;
    Blogs.getBlog(id).then(function (blog) {
      $scope.blog = blog;
    },function (error) {
      alert(error)
    });
  });
