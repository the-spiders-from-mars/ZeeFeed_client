/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.login', [])

  .factory('Login', function($q,$http,Urls) {

    var flag;

    return {
      doLogin: function(userName,userPassword){
        var deferred=$q.defer();
        var loginUrl=Urls.login(userName,userPassword);
        $http({method:"GET",url:loginUrl}).then(function(ret){
          flag=ret.data;
          if (ret.data){
            localStorage.user={
              userName:userName,
              userPassword:userPassword
            };
            deferred.resolve({flag:true,connection:true});
          }else{
            deferred.reject({flag:false,connection:true});
          }
        },function(){
          deferred.reject({flag:false,connection:false});
        });
        return deferred.promise;
      },
      doRegister: function(userName,userPassword){
        var deferred=$q.defer();
        var registerUrl=Urls.register();
        $http({method:"POST",url:registerUrl},{userName:userName,userPassword:userPassword}).then(function(ret){
          if (ret.data){
            localStorage.user={
              userName:userName,
              userPassword:userPassword
            };
            deferred.resolve({flag:true,connection:true});
          }else{
            deferred.reject({flag:false,connection:true});
          }
        },function(){
          deferred.reject({flag:false,connection:false});
        });
        return deferred.promise;
      },
      getFlag: function(){
        return flag;
      },
      getUser: function(){
        if (localStorage.user!=undefined){
          return localStorage.user;
        }else{
          return {userName:"default",userPassword:"default"};
        }
      }
    }
  });
