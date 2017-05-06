# ZeeFeed_client
智能博客订阅系统客户端

## 服务器通信接口定义

1. login
```
接口： /login/{userName}/{userPassword}
方法： GET
参数： (url解析参数)userName:string
       (url解析参数)userPassword:string
返回： true | false :boolean
```
2. register
```
接口： /register
方法： POST
参数： userName:string
       userPassword:string
返回： true | false :boolean
```
3. tag
```
接口： /tag
方法： GET
参数： userName:string
返回： [oneJson,oneJson,...,oneJson]
       oneJson={
        tagName:string,
        tagCounter:int,
       }
```

## service 数据定义

1. Tags

   name: Tags

   functions:

   1. all()

      return promise

      [

      ​	[

       		headLetter: string

      ​		 tagList: [

      ​			{
      ​			"tagName" : "",//string
      ​			"tagCounter" 0,//int
         			}

      ​			]

      ​	]

      ]

2. Blogs

   name: Blogs

   functions:

   1. all(tagName:string)

      return promise

      [

      ​	{

      ​		id: ID

      ​		logo: url(string)

      ​		title: string

      ​		image: url(string)

      ​		summary: string

      ​	}

      ]

   2. getBlog(id:ID)

      return promise

      {

      ​	title: string

      ​	author: string

      ​	date: Date(string)

      ​	content: string

      }
