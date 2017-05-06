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
              tagCounter: 243
            }
          ]
        },
        {
          headLetter: "C",
          tagList: [
            {
              tagName: "Code",
              tagCounter: 243
            }
          ]
        }
    ];
    for (var i=0; i < 50; i++) {
      tags.push({
        headLetter: "A",
        tagList: [
          {
            tagName: "Adobe",
            tagCounter: Math.round(Math.random()*600)
          }
        ]
      })
    }


    return {
      all: function () {
        var deferred =  $q.defer();
        deferred.resolve(tags);
        return deferred.promise;
      }
    }
  });
