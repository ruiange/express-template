define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/public/apidoc/main.js",
    "group": "C:\\Users\\bombi\\WebstormProjects\\express-template\\src\\public\\apidoc\\main.js",
    "groupTitle": "C:\\Users\\bombi\\WebstormProjects\\express-template\\src\\public\\apidoc\\main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/9yin/scan/news",
    "title": "获取九阴新闻列表",
    "name": "GetNineYinNews",
    "group": "九阴",
    "version": "1.0.0",
    "description": "<p>从九阴官网爬取最新的新闻列表信息</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码 (2000: 成功)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>响应消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>新闻列表数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.newsId",
            "description": "<p>新闻ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>新闻标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.url",
            "description": "<p>新闻链接</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.time",
            "description": "<p>发布时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功响应示例:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"msg\": \"success\",\n  \"data\": [{\n    \"newsId\": \"123456\",\n    \"title\": \"九阴真经重要更新公告\",\n    \"url\": \"https://9yin.woniu.com/news/123456.html\",\n    \"time\": \"2024-01-20\"\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/modules/nineYin.route.js",
    "groupTitle": "九阴"
  },
  {
    "type": "post",
    "url": "/mini/login",
    "title": "小程序登录",
    "name": "MiniLogin",
    "group": "小程序",
    "description": "<p>小程序登录接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>小程序登录时获取的临时登录凭证</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户登录令牌</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>用户ID</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "InvalidCode",
            "description": "<p>提供的code无效</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>服务器内部错误</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/mini.route.js",
    "groupTitle": "小程序"
  },
  {
    "type": "get",
    "url": "/douyin/save",
    "title": "保存视频数据接口",
    "name": "保存视频数据接口",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音"
  },
  {
    "type": "post",
    "url": "/douyin",
    "title": "混合解析单一视频接口",
    "name": "混合解析单一视频接口",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音"
  },
  {
    "type": "get",
    "url": "/douyin/get",
    "title": "获取视频数据接口",
    "name": "获取视频数据接口",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音"
  },
  {
    "type": "get",
    "url": "/douyin/dataList",
    "title": "获取视频数据列表接口",
    "name": "获取视频数据请求列表",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音"
  },
  {
    "type": "post",
    "url": "/wealth/muyu",
    "title": "敲木鱼增加财富",
    "name": "WealthMuyu",
    "group": "财富",
    "description": "<p>敲木鱼增加财富</p>",
    "version": "0.0.0",
    "filename": "src/routes/modules/wealth.route.js",
    "groupTitle": "财富"
  }
] });
