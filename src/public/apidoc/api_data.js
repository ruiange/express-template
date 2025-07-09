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
    "group": "C:\\Users\\bombi\\WebstormProjects\\express-template\\src\\public\\apidoc\\main.js",
    "groupTitle": "C:\\Users\\bombi\\WebstormProjects\\express-template\\src\\public\\apidoc\\main.js",
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
    "type": "get",
    "url": "/admin/user/users",
    "title": "获取用户列表",
    "name": "GetUserList",
    "group": "后台管理",
    "version": "1.0.0",
    "description": "<p>管理员获取用户列表，支持分页和搜索功能</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码，从1开始</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>每页数量，最大100</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>搜索关键词，支持用户名、昵称、邮箱模糊搜索</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码，2000表示成功</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.users",
            "description": "<p>用户列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.users.id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.avatar",
            "description": "<p>头像URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.role",
            "description": "<p>用户角色（user/admin）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.users.updatedAt",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.users.createTime",
            "description": "<p>创建时间戳</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.currentPage",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.pageSize",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.totalPages",
            "description": "<p>总页数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"message\": \"获取用户列表成功\",\n  \"data\": {\n    \"users\": [\n      {\n        \"id\": 1,\n        \"username\": \"testuser\",\n        \"email\": \"test@example.com\",\n        \"nickname\": \"测试用户\",\n        \"avatar\": \"https://example.com/avatar.jpg\",\n        \"role\": \"user\",\n        \"createdAt\": \"2024-01-01T00:00:00.000Z\",\n        \"updatedAt\": \"2024-01-01T00:00:00.000Z\",\n        \"createTime\": 1704067200\n      }\n    ],\n    \"pagination\": {\n      \"currentPage\": 1,\n      \"pageSize\": 10,\n      \"total\": 1,\n      \"totalPages\": 1\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>未授权访问</p>"
          },
          {
            "group": "Error 401",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，4001</p>"
          },
          {
            "group": "Error 401",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>权限不足</p>"
          },
          {
            "group": "Error 403",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，4003</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>服务器内部错误</p>"
          },
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，5000</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>详细错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 4001,\n  \"message\": \"未经身份验证的用户\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response-403:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"code\": 4003,\n  \"message\": \"权限不足，需要管理员权限\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response-500:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 5000,\n  \"message\": \"服务器内部错误\",\n  \"error\": \"Database connection failed\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/admin/admin.user.route.js",
    "groupTitle": "后台管理"
  },
  {
    "type": "get",
    "url": "/admin/user/test-db",
    "title": "测试数据库连接",
    "name": "TestDatabaseConnection",
    "group": "后台管理",
    "version": "1.0.0",
    "description": "<p>测试数据库连接和用户表查询</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "filename": "src/routes/admin/admin.user.route.js",
    "groupTitle": "后台管理"
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
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户"
  },
  {
    "type": "put",
    "url": "/user/",
    "title": "修改个人资料",
    "name": "updateProfile",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户"
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "查看个人资料",
    "name": "viewProfile",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
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
