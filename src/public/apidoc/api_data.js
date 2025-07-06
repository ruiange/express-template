define({ "api": [
  {
    "type": "post",
    "url": "/ai/name",
    "title": "起名宝",
    "name": "起名宝",
    "group": "AI对话",
    "version": "1.0.0",
    "filename": "src/routes/modules/ai.route.js",
    "groupTitle": "AI对话"
  },
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
    "group": "C:\\Users\\bombi\\Documents\\GitHub\\express-template\\src\\public\\apidoc\\main.js",
    "groupTitle": "C:\\Users\\bombi\\Documents\\GitHub\\express-template\\src\\public\\apidoc\\main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/upload",
    "title": "上传文件",
    "name": "UploadFile",
    "group": "上传",
    "description": "<p>Upload a file to the server</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>The file to upload</p>"
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
            "field": "message",
            "description": "<p>Success message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Uploaded file name</p>"
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
            "field": "BadRequest",
            "description": "<p>Invalid file format</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/upload.route.js",
    "groupTitle": "上传"
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
    "type": "put",
    "url": "/admin/audit/config",
    "title": "修改审核配置",
    "name": "修改审核配置",
    "group": "后台管理",
    "version": "1.0.0",
    "filename": "src/routes/admin/admin.audit.route.js",
    "groupTitle": "后台管理"
  },
  {
    "type": "get",
    "url": "/admin/audit/config",
    "title": "获取审核配置",
    "name": "获取审核配置",
    "group": "后台管理",
    "version": "1.0.0",
    "filename": "src/routes/admin/admin.audit.route.js",
    "groupTitle": "后台管理"
  },
  {
    "type": "get",
    "url": "/wallpaper",
    "title": "获取壁纸",
    "name": "getWallpaper",
    "group": "壁纸",
    "description": "<p>获取壁纸</p>",
    "version": "1.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸"
  },
  {
    "type": "get",
    "url": "/mini/v",
    "title": "获取小程序版本信息",
    "name": "GetMiniVersion",
    "group": "小程序",
    "description": "<p>获取小程序版本信息</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>小程序版本号</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>获取小程序版本信息失败</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/mini.route.js",
    "groupTitle": "小程序"
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
    "url": "/user/register",
    "title": "用户注册",
    "name": "RegisterUser",
    "group": "用户",
    "description": "<p>新用户注册接口</p>",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>用户名</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>密码</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>电子邮箱</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>注册成功提示</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"用户注册成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"用户名或邮箱已被使用\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/admin.user.route.js",
    "groupTitle": "用户"
  },
  {
    "type": "put",
    "url": "/user/",
    "title": "修改个人资料",
    "name": "updateProfile",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/admin.user.route.js",
    "groupTitle": "用户"
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "查看个人资料",
    "name": "viewProfile",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/admin.user.route.js",
    "groupTitle": "用户"
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
