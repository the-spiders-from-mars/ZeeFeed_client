/**
 * Created by Shijian on 2017/5/6.
 */

angular.module('service.url', [])

  .factory('Urls', function() {

    var urls= {
      hp: "http://zippyserver-nonreprehensible-hardboard.mybluemix.net/api",
      login: "login",
      register: "register",
      tag: "tag",
      blog: "blog",
      source: "source"
    };

    return{
      hp: function(){
        return urls.hp;
      },
      login: function(userName,userPassword){
        return urls.hp+"/"+urls.login+"?userName="+userName+"&userPassword="+userPassword;
      },
      register: function(){
        return urls.hp+"/"+urls.register;
      },
      tag: function(userName){
        return urls.hp+"/"+urls.tag+"?userName="+userName;
      },
      blog: function(userName,tagName){
        return urls.hp+"/"+urls.blog+"?userName="+userName+"&tagName="+tagName;
      },
      source: function(){
        return urls.hp+"/"+urls.source;
      }
    }
  });
