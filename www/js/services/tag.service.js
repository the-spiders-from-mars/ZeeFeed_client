/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.tag', [])

  .factory('Tags', function($q,$http,Login) {

    var tags;

    function raw2Tags(raw){
      raw.sort(function(a,b){
        return(a.name.localeCompare(b.name));
      });
      raw.push({tagName:"$$$",tagCounter:0});
      tags=[];
      var i,lasti=0,lastfl=raw[0].tagName.charAt(0).toUpperCase();
      for (i=1;i<raw.length;i++){
        var fl=raw[i].tagName.charAt(0).toUpperCase();
        if (fl!=lastfl){
          tags.push({headLetter:lastfl,tagList:[]});
          var j;
          for (j=lasti;j<i;j++){
            tags[tags.length-1].tagList.push(raw[j]);
          }
          lasti=i;
          lastfl=fl;
        }
      }
    }

    return{
      all: function(){
        var deferred=$q.defer();
        if (tags!=undefined) {
          deferred.resolve(tags);
          return deferred.promise;
        }
        var tagUrl=Urls.tag(Login.getUser().userName);
        $http({method:"GET",url:tagUrl}).then(function(ret){
          raw2Tags(ret.data);
          deferred.resolve(tags);
        },function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    }
  });
