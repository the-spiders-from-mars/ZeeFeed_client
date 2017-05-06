# ZeeFeed_client
智能博客订阅系统客户端

```
接口： /login
方法： GET
参数： userName//string
       userPassword//string
返回： true 或者 false//boolean
```

```
接口： /register
方法： POST
参数： userName//string
       userPassword//string
返回： true 或者 false//boolean
```

```
接口： /tag
方法： GET
参数： userName//string
返回： [oneJson,oneJson,...,oneJson]
      oneJson={
        "tagName" : "",//string
        "tagCounter" 0,//int
      }
```
