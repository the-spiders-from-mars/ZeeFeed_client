/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.blog', [])

  .factory('Blogs', function($q,$http,Login,Urls) {

    var blogs;

    return {
      getBlogs: function (tagName) {
        var deferred=$q.defer();
        if (blogs!=undefined) {
          deferred.resolve(blogs);
          return deferred.promise;
        }
        var blogUrl=Urls.blog(tagName,Login.getUser().userName);
        $http({method:"GET",url:blogUrl}).then(function(ret){
          blogs=ret.data;
          for (var i=0;i<blogs.length;i++){
            blogs[i].id=blogs[i]["_id"];
            blogs[i].image="img/100.png";
          }
          deferred.resolve(blogs);
        },function(){
          deferred.reject();
        });
        return deferred.promise;
      },
      getBlog: function (id) {
        var blogChosen;
        for (var i=0;i<blogs.length;i++){
          if (blogs[i].id==id){
            blogChosen=blogs[i];
            break;
          }
        }
        var deferred=$q.defer();
        if (blogChosen!=undefined){
          deferred.resolve(blogChosen);
        }else{
          deferred.reject();
        }
        return deferred.promise;
      }
    }
  });
