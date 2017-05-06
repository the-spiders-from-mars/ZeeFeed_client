/**
 * Created by duocai on 2017/5/6.
 */

angular.module('service.blog', [])

.factory('Blogs', function($q) {

  var blogs = [
    {
      id: 1,
      logo: "https://lh3.googleusercontent.com/LoTS1ea8vxrUKhHNQ7Qeruu2jjjlgNzv8nTtg8rI9ReEmI26_5BJSKtuYdJWvl23bw7NqQqI6B_2=w2400-h1350-rw-no",
      title: "大新闻",
      image: "http://www.haomou.net/images/ionic.png",
      summary: "另外官网的JS API介绍文档有问题，国内访问不能跳转，请参考我的另一篇ionic中文javascript API."
    },
    {
      id: 1,
      logo: "https://lh3.googleusercontent.com/LoTS1ea8vxrUKhHNQ7Qeruu2jjjlgNzv8nTtg8rI9ReEmI26_5BJSKtuYdJWvl23bw7NqQqI6B_2=w2400-h1350-rw-no",
      title: "大新闻2",
      image: "http://www.haomou.net/images/ionic.png",
      summary: "另外官网的JS API介绍文档有问题，国内访问不能跳转，请参考我的另一篇ionic中文javascript API."
    }
  ];

  var blog = {
    id: 1,
    url: "http://m.blog.csdn.net/article/details?id=70224422",
    title: "最大辛文",
    author: "N4A",
    date: "2017-05-06",
    content: "本来不想写这个的，因为毕竟官网已经列的很详细了css component,国内的网络由于种种原因，有时候右边并不会显示一个手机框用于展示效果。我这里将一些相关组件的介绍合在一起，给出综合例子和显示效果，方便自己查阅。另外官网的JS API介绍文档有问题，国内访问不能跳转，请参考我的另一篇ionic中文javascript API."
  };
  return {
    getBlogs: function (tagName) {
      var deferred = $q.defer();
      deferred.resolve(blogs);
      return deferred.promise;
    },
    getBlog: function (id) {
      var deferred = $q.defer();
      deferred.resolve(blog);
      return deferred.promise;
    }
  }
});
