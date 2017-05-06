# ZeeFeed_client
智能博客订阅系统客户端

## 服务器通信接口定义

1.login
```
接口： /login
方法： GET
参数： userName:string
       userPassword:string
返回： true | false :boolean
```
2.register
```
接口： /register
方法： POST
参数： userName:string
       userPassword:string
返回： true | false :boolean
```
3.tag (list)
```
接口： /tag
方法： GET
参数： userName:string
返回： [oneJson,oneJson,...,oneJson]
        oneJson={
          tagName:string,
          tagCounter:int
        }
```
4.blog (list)
```
接口： /blog
方法： GET
参数： tagName:string
返回： [oneJson,oneJson,...,oneJson] （时间由近而远）
        oneJson={
          id: string,
          logo: url(string),
          title: string,
          image: url(string)(optional代表性的图片),
          summary: string
        }
```
5.blog
```
接口： /blog/{blogId}
方法： GET
参数： 无
返回：   {
          id: string,
          title: string,
          author: string,
          date: Date(string),
          content: string
         }
```
## service 数据定义

1. Tags
```
name: Tags
functions:

  1. all()
    return promise
    [{
      headLetter: string
      tagList: [{
        tagName:string,
        tagCounter:int
      }]
    }]
```
2. Blogs
```
   name: Blogs
   functions:
   1. getBlogs(tagName:string)
      return promise
      [{
        id: ID
        logo: url(string)
        title: string
        image: url(string)
        summary: string
      }]

   2. getBlog(id:ID)
      return promise
      {
        id: ID
        title: string
        author: string
        date: Date(string)
        content: string
      }
```
