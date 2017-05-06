/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.blog', [])

  .factory('Blogs', function($q,$http,Urls) {

    var blogs;

    return {
      getBlogs: function (tagName) {
        var deferred=$q.defer();
        if (blogs!=undefined) {
          deferred.resolve(blogs);
          return deferred.promise;
        }
        var blogUrl=Urls.blog()+"?tagName="+tagName;
        $http({method:"GET",url:blogUrl}).then(function(ret){
          blogs=ret.data;
          deferred.resolve(blogs);
        },function(){
          deferred.reject();
        });
        return deferred.promise;
      },
      getBlog: function (id) {
        var deferred=$q.defer();
        var blogUrl=Urls.blog()+"/"+id;
        $http({method:"GET",url:blogUrl}).then(function(ret){
          deferred.resolve(ret.data);
        },function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    }
  });
