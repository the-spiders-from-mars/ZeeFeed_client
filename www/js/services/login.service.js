/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.login', [])

  .factory('Login', function($q,$http,Urls) {

    var flag;

    return {
      doLogin: function(userName,userPassword){
        var deferred=$q.defer();
        localStorage.userName=userName;
        localStorage.userPassword=userPassword;
        flag={flag:true,connection:true};
        deferred.resolve({flag:true,connection:true});
        return deferred.promise;
      },
      doRegister: function(userName,userPassword){
        var deferred=$q.defer();
        localStorage.userName=userName;
        localStorage.userPassword=userPassword;
        flag={flag:true,connection:true};
        deferred.resolve({flag:true,connection:true});
        return deferred.promise;
      },
      getFlag: function(){
        return flag;
      },
      getUser: function(){
        if (localStorage.userName !== ""){
          return {userName:localStorage.userName,userPassword:localStorage.userPassword};
        }else{
          return undefined;
        }
      }
    }
  });
