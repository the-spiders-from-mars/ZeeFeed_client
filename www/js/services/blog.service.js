/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.blog', [])

  .factory('Blogs', function($q,$http,Login,Urls,Offline) {

    var blogs;

    return {
      getBlogs: function (tagName) {
        var deferred=$q.defer();
        if (blogs!=undefined) {
          deferred.resolve(blogs);
          return deferred.promise;
        }
        blogs=Offline.blog(tagName);
        for (var i=0;i<blogs.length;i++){
          blogs[i].id=i;
          if (blogs[i]["_id"]!=undefined)
            blogs[i].id=blogs[i]["_id"];
          blogs[i].url=blogs[i].link;
          blogs[i].image="img/10"+Math.round(Math.random()*5)+".png";
        }
        deferred.resolve(blogs);
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
