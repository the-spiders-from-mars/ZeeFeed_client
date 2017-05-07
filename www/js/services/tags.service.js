/**
 * Created by duocai on 2017/5/6.
 */

angular.module('service.tag', [])

  .factory('Tags', function($q) {
    var tags = [
        {
          headLetter: "A",
          tagList: [
            {
              tagName: "Adobe",
              tagCounter: 15
            }
          ]
        },
        {
          headLetter: "C",
          tagList: [
            {
              tagName: "Code",
              tagCounter: 15
            }
          ]
        }
    ];

    var rawTags=[];
    for (var i=0; i < 50; i++) {
      var temp={
        tagName: "Cdobe"+i,
        tagCounter: Math.round(Math.random()*10+10)
      };
      tags[1].tagList.push(temp);
      rawTags.push(temp);
    }

    rawTags.sort(function(a,b){
      return(b.tagCounter-a.tagCounter);
    });

    return {
      all: function () {
        var deferred =  $q.defer();
        deferred.resolve(tags);
        return deferred.promise;
      },
      raw: function(){
        return rawTags;
      }
    }
  });
