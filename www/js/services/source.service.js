/**
 * Created by Shijian on 2017/5/7.
 */

angular.module('service.source', [])

  .factory('Sources', function($q,$http,Login,Urls) {

    var sources;

    return {
      getSources: function () {
        var deferred=$q.defer();
        if (sources!=undefined) {
          deferred.resolve(sources);
          return deferred.promise;
        }
        var sourceUrl=Urls.source()+"?userName="+Login.getUser().userName;
        $http({method:"GET",url:sourceUrl}).then(function(ret){
          sources=ret.data;
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
      updateSource: function(){
        $http.post(Urls.source(),sources);
      }
    }
  });
