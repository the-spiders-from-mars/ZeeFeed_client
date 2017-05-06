# ZeeFeed_client
智能博客订阅系统客户端

## 接口定义
1. login

   接口： /login
   方法： GET
   参数： 

   ​	userName:string

   ​	userPassword:string

   返回： 

   ​	true | false:boolean

2. register
   接口： /register
   方法： POST
   参数：

   ​	 userName:string
   ​	 userPassword:string
   返回： 

   ​	true | false:boolean

3. tag
   接口： /tag
   方法： GET
   参数： 

   ​	userName:string
   返回： 

   ​	[oneJson,oneJson,...,oneJson]
      	oneJson={
   ​		"tagName" : "",//string
   ​		"tagCounter" 0,//int
      	}

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