/**
 * Created by Shijian on 2017/5/7.
 */

angular.module('service.offline', [])

.factory('Offline', function(OfflineData) {

  var offlineData=OfflineData.raw();

  return {
    raw:function(){
      return offlineData;
    },
    login:function(){
      return true;
    },
    register:function(){
      return true;
    },
    tag:function(){
      var i,j,k,tagMap=[],tags=[];
      for (i=0;i<offlineData.length;i++){
        for (j=0;j<offlineData[i].articles.length;j++){
          //var artName=offlineData[i].articles[j].title;
          for (k=0;k<offlineData[i].articles[j].tags.length;k++){
            var tagName=offlineData[i].articles[j].tags[k];
            if (tagMap[tagName]!=undefined){
              tagMap[tagName]++;
            }else{
              tagMap[tagName]=1;
              tags[tags.length]=tagName;
            }
          }
        }
      }
      for (i=1;i<=tags.length-1;i++)
        for (j=1;j<=tags.length-i;j++){
          if (tagMap[tags[j-1]]<tagMap[tags[j]]){
            var temp=tags[j-1];
            tags[j-1]=tags[j];
            tags[j]=temp;
          }
        }
      var retTags=[];
      for (i=0;i<tags.length&&i<10;i++){
        retTags.push({
          tagName: tags[i],
          tagCounter: tagMap[tags[i]]
        });
      }
      return retTags;
    },
    blog:function(tagName){
      var i,j,k,blogs=[];
      for (i=0;i<offlineData.length;i++) {
        for (j = 0; j < offlineData[i].articles.length; j++) {
          var art=offlineData[i].articles[j];
          var found=false;
          for (k = 0; k < offlineData[i].articles[j].tags.length; k++) {
            if (offlineData[i].articles[j].tags[k]==tagName){
              found=true;
              break;
            }
          }
          if (found){
            blogs[blogs.length]=art;
          }
        }
      }
      return(blogs);
    }
  }
});
