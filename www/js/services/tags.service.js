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
              tagCounter: 2433
            }
          ]
        }
    ];


    return {
      all: function () {
        var deferred =  $q.defer();
        deferred.resolve(tags);
        return deferred.promise;
      }
    }
  });
