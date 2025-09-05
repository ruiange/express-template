define({ "api": [
  {
    "type": "post",
    "url": "/ai/name",
    "title": "起名宝",
    "name": "起名宝",
    "group": "AI对话",
    "version": "1.0.0",
    "filename": "src/routes/modules/ai.route.js",
    "groupTitle": "AI对话",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/ai/name"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/health",
    "title": "健康检查",
    "name": "GetHealth",
    "group": "Health",
    "description": "<p>获取服务健康状态</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>服务状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>当前时间戳</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "uptime",
            "description": "<p>服务运行时间（秒）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "environment",
            "description": "<p>运行环境</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"ok\",\n  \"timestamp\": \"2024-01-01T00:00:00.000Z\",\n  \"uptime\": 123.456,\n  \"environment\": \"development\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/health.route.js",
    "groupTitle": "Health",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/api/health"
      }
    ]
  },
  {
    "type": "post",
    "url": "/upload",
    "title": "上传文件",
    "name": "UploadFile",
    "group": "上传",
    "description": "<p>使用 multipart/form-data 类型的表单上传文件到服务器。</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>必须设置为 multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "file",
            "description": "<p>要上传的文件（通过 multipart/form-data 表单提交）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "path",
            "description": "<p>文件保存的路径（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "upType",
            "defaultValue": "vercel",
            "description": "<p>存储桶（可选）默认为vercel，可选vercel、qiniu、r2</p>"
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
            "field": "filename",
            "description": "<p>上传后的文件名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>文件访问 URL（如果可用）</p>"
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
            "description": "<p>无效的文件格式或未提供文件</p>"
          }
        ],
        "Error 413": [
          {
            "group": "Error 413",
            "optional": false,
            "field": "PayloadTooLarge",
            "description": "<p>文件大小超过限制</p>"
          }
        ],
        "Error 415": [
          {
            "group": "Error 415",
            "optional": false,
            "field": "UnsupportedMediaType",
            "description": "<p>不支持的媒体类型</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>服务器处理文件时出错</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/upload.route.js",
    "groupTitle": "上传",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/upload"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/special/:id/questions",
    "title": "添加题目到专题",
    "description": "<p>将题目添加到指定专题的题库中</p>",
    "name": "AddQuestionToSpecial",
    "group": "专题",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "questionId",
        "description": "<p>题目ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "sort",
        "defaultValue": "0",
        "description": "<p>排序值</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "special",
            "description": "<p>更新后的专题</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id/questions"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/special/create",
    "title": "创建专题",
    "description": "<p>创建新的专题</p>",
    "name": "CreateSpecial",
    "group": "专题",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>专题名称</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "icon",
        "description": "<p>专题图标URL</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>专题描述</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": true,
        "field": "isActive",
        "defaultValue": "true",
        "description": "<p>是否激活</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "special",
            "description": "<p>创建的专题</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/create"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/question/special/:id",
    "title": "删除专题",
    "description": "<p>删除指定ID的专题</p>",
    "name": "DeleteSpecial",
    "group": "专题",
    "version": "1.0.0",
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
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>删除成功</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/special/:id",
    "title": "获取专题详情",
    "description": "<p>根据ID获取专题的详细信息，包含题库信息</p>",
    "name": "GetSpecialDetail",
    "group": "专题",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "special",
            "description": "<p>专题详情</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "special.name",
            "description": "<p>专题名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "special.icon",
            "description": "<p>专题图标</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "special.description",
            "description": "<p>专题描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "special.questionBank",
            "description": "<p>题库信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "special.isActive",
            "description": "<p>是否激活</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "special.totalQuestions",
            "description": "<p>题目总数</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/special/list",
    "title": "获取专题列表",
    "description": "<p>获取专题列表，支持分页和筛选</p>",
    "name": "GetSpecialList",
    "group": "专题",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "10",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyword",
            "description": "<p>关键词搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isActive",
            "description": "<p>是否激活状态筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortBy",
            "defaultValue": "createdAt",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortOrder",
            "defaultValue": "desc",
            "description": "<p>排序方式，asc或desc</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>专题列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pagination",
            "description": "<p>分页信息</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/special/:id/questions",
    "title": "获取专题下的题目列表",
    "description": "<p>根据专题ID获取该专题下的题目列表，支持分页、筛选和排序</p>",
    "name": "GetSpecialQuestions",
    "group": "专题",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "10",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>分类筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "tags",
            "description": "<p>标签筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "difficulty",
            "description": "<p>难度筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyword",
            "description": "<p>关键词搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortBy",
            "defaultValue": "sort",
            "description": "<p>排序字段，可选值：sort(专题排序)、title、difficulty、createdAt等</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortOrder",
            "defaultValue": "asc",
            "description": "<p>排序方式，asc或desc</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>题目列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.title",
            "description": "<p>题目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.desc",
            "description": "<p>题目描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.difficulty",
            "description": "<p>难度级别</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.category",
            "description": "<p>题目分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.tags",
            "description": "<p>题目标签</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.specialSort",
            "description": "<p>专题中的排序值</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.total",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.current",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.pageSize",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.totalPages",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "specialInfo",
            "description": "<p>专题信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "specialInfo.id",
            "description": "<p>专题ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "specialInfo.name",
            "description": "<p>专题名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "specialInfo.description",
            "description": "<p>专题描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "specialInfo.totalQuestions",
            "description": "<p>专题题目总数</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id/questions"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/question/special/:id/questions/:questionId",
    "title": "从专题中移除题目",
    "description": "<p>从指定专题的题库中移除题目</p>",
    "name": "RemoveQuestionFromSpecial",
    "group": "专题",
    "version": "1.0.0",
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
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionId",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "special",
            "description": "<p>更新后的专题</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id/questions/:questionId"
      }
    ]
  },
  {
    "type": "patch",
    "url": "/question/special/:id/questions/:questionId/sort",
    "title": "更新题目排序",
    "description": "<p>更新专题中题目的排序</p>",
    "name": "UpdateQuestionSort",
    "group": "专题",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionId",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "sort",
        "description": "<p>新的排序值</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "special",
            "description": "<p>更新后的专题</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id/questions/:questionId/sort"
      }
    ]
  },
  {
    "type": "patch",
    "url": "/question/special/:id",
    "title": "更新专题",
    "description": "<p>更新现有专题的信息</p>",
    "name": "UpdateSpecial",
    "group": "专题",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>专题ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "name",
        "description": "<p>专题名称</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "icon",
        "description": "<p>专题图标URL</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>专题描述</p>"
      },
      {
        "group": "Body",
        "type": "Boolean",
        "optional": true,
        "field": "isActive",
        "description": "<p>是否激活</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "special",
            "description": "<p>更新后的专题</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "专题",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/special/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/9yin/scan/news",
    "title": "获取九阴新闻列表",
    "name": "GetNineYinNews",
    "group": "九阴",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>页码，默认为0</p>"
          }
        ]
      }
    },
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
    "groupTitle": "九阴",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/9yin/scan/news"
      }
    ]
  },
  {
    "type": "put",
    "url": "/admin/audit/config",
    "title": "修改审核配置",
    "name": "修改审核配置",
    "group": "后台管理",
    "version": "1.0.0",
    "filename": "src/routes/admin/admin.audit.route.js",
    "groupTitle": "后台管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/admin/audit/config"
      }
    ]
  },
  {
    "type": "get",
    "url": "/admin/audit/config",
    "title": "获取审核配置",
    "name": "获取审核配置",
    "group": "后台管理",
    "version": "1.0.0",
    "filename": "src/routes/admin/admin.audit.route.js",
    "groupTitle": "后台管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/admin/audit/config"
      }
    ]
  },
  {
    "type": "post",
    "url": "/wallpaper/batch-delete",
    "title": "批量删除壁纸",
    "name": "BatchDeleteWallpapers",
    "group": "壁纸",
    "description": "<p>批量删除多个壁纸</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ids",
            "description": "<p>壁纸ID数组</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码</p>"
          },
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
          "title": "参数错误:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 4000,\n  \"message\": \"无效的壁纸ID列表\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/batch-delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/wallpaper",
    "title": "创建壁纸",
    "name": "CreateWallpaper",
    "group": "壁纸",
    "description": "<p>创建新的壁纸</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>壁纸标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>壁纸描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>文件存储路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thumbnailPath",
            "description": "<p>缩略图路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileSize",
            "description": "<p>文件大小(字节)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>图片宽度(像素)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>图片高度(像素)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型(jpg, png等)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPublic",
            "description": "<p>是否公开</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>创建的壁纸数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/wallpaper/:id",
    "title": "删除壁纸",
    "name": "DeleteWallpaper",
    "group": "壁纸",
    "description": "<p>删除壁纸</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>壁纸ID</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/wallpaper/:id/download",
    "title": "下载壁纸",
    "name": "DownloadWallpaper",
    "group": "壁纸",
    "description": "<p>下载壁纸并增加下载次数</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>壁纸ID</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>下载链接</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/:id/download"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/daily",
    "title": "获取每日壁纸",
    "name": "GetDailyWallpaper",
    "group": "壁纸",
    "description": "<p>获取每日壁纸，每天返回固定的一张壁纸</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>日期 (YYYY-MM-DD格式)，可选，默认为今天</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>每日壁纸数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>壁纸ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>壁纸标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": "<p>壁纸描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.filePath",
            "description": "<p>文件路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.thumbnailPath",
            "description": "<p>缩略图路径</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.fileSize",
            "description": "<p>文件大小</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.width",
            "description": "<p>图片宽度</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.height",
            "description": "<p>图片高度</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fileType",
            "description": "<p>文件类型</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.categoryId",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.isPublic",
            "description": "<p>是否公开</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.viewCount",
            "description": "<p>浏览次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.downloadCount",
            "description": "<p>下载次数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.uploadDate",
            "description": "<p>上传日期</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.date",
            "description": "<p>对应的日期</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码</p>"
          },
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
          "title": "日期格式错误:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 4000,\n  \"message\": \"日期格式错误，请使用YYYY-MM-DD格式\"\n}",
          "type": "json"
        },
        {
          "title": "暂无壁纸:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 4004,\n  \"message\": \"暂无可用的每日壁纸\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/daily"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/latest",
    "title": "获取最新壁纸",
    "name": "GetLatestWallpapers",
    "group": "壁纸",
    "description": "<p>获取最新壁纸列表</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>返回数量，默认为10</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>最新壁纸列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/latest"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/popular",
    "title": "获取热门壁纸",
    "name": "GetPopularWallpapers",
    "group": "壁纸",
    "description": "<p>获取热门壁纸列表</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>返回数量，默认为10</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>热门壁纸列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/popular"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/:id",
    "title": "获取壁纸详情",
    "name": "GetWallpaper",
    "group": "壁纸",
    "description": "<p>根据ID获取壁纸详情</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>壁纸ID</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>壁纸数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/list",
    "title": "获取壁纸列表",
    "name": "GetWallpapers",
    "group": "壁纸",
    "description": "<p>获取壁纸列表，支持分页、搜索、分类筛选</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current",
            "description": "<p>当前页码，默认为1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页数量，默认为10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>搜索关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPublic",
            "description": "<p>是否公开，默认为true</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>排序字段(uploadDate, viewCount, downloadCount)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>排序方向(asc, desc)</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>壁纸列表和分页信息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/list"
      }
    ]
  },
  {
    "type": "put",
    "url": "/wallpaper/:id",
    "title": "更新壁纸",
    "name": "UpdateWallpaper",
    "group": "壁纸",
    "description": "<p>更新壁纸信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>壁纸ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>壁纸标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>壁纸描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>文件存储路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thumbnailPath",
            "description": "<p>缩略图路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileSize",
            "description": "<p>文件大小(字节)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>图片宽度(像素)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>图片高度(像素)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPublic",
            "description": "<p>是否公开</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>更新后的壁纸数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/wallpaper/category",
    "title": "创建分类",
    "name": "CreateCategory",
    "group": "壁纸分类",
    "description": "<p>创建新的壁纸分类</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>分类描述</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>创建的分类数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸分类",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/category"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/wallpaper/category/:id",
    "title": "删除分类",
    "name": "DeleteCategory",
    "group": "壁纸分类",
    "description": "<p>删除分类（只有当分类下没有壁纸时才能删除）</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分类ID</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息（当分类下还有壁纸时）</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸分类",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/category/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/category/list",
    "title": "获取所有分类",
    "name": "GetCategories",
    "group": "壁纸分类",
    "description": "<p>获取所有壁纸分类</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>分类列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸分类",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/category/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/wallpaper/category/:id",
    "title": "获取分类详情",
    "name": "GetCategory",
    "group": "壁纸分类",
    "description": "<p>根据ID获取分类详情</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分类ID</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>分类数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸分类",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/category/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/wallpaper/category/:id",
    "title": "更新分类",
    "name": "UpdateCategory",
    "group": "壁纸分类",
    "description": "<p>更新分类信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>分类描述</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>更新后的分类数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/wallpaper.route.js",
    "groupTitle": "壁纸分类",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wallpaper/category/:id"
      }
    ]
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
    "groupTitle": "小程序",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/mini/v"
      }
    ]
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
    "groupTitle": "小程序",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/mini/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/vote/mine/:questionId",
    "title": "查询我在某题目的投票",
    "name": "GetMyVote",
    "group": "投票",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionId",
            "description": "<p>题目ID</p>"
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
            "description": "<p>业务码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>投票记录（未投票时为空对象）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data._id",
            "description": "<p>记录ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.user",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.question",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "size": "0..1",
            "optional": true,
            "field": "data.value",
            "description": "<p>投票值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n  \"data\": { \"_id\": \"...\", \"user\": \"...\", \"question\": \"...\", \"value\": 0 },\n  \"message\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/vote.route.js",
    "groupTitle": "投票",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/vote/mine/:questionId"
      }
    ]
  },
  {
    "type": "get",
    "url": "/vote/stats/:questionId",
    "title": "查询题目投票统计（需登录）",
    "name": "GetVoteStats",
    "group": "投票",
    "description": "<p>必须登录，返回统计并附带当前用户是否投票及其投票值</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "questionId",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
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
            "description": "<p>业务码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>统计信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.yes",
            "description": "<p>“会”数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.no",
            "description": "<p>“不会”数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.total",
            "description": "<p>总投票数</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.myVoted",
            "description": "<p>是否已投票</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "size": "0..1",
            "optional": true,
            "field": "data.myValue",
            "description": "<p>我的投票值（未投票时为空）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n  \"data\": { \"yes\": 10, \"no\": 3, \"total\": 13, \"myVoted\": true, \"myValue\": 1 },\n  \"message\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/vote.route.js",
    "groupTitle": "投票",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/vote/stats/:questionId"
      }
    ]
  },
  {
    "type": "post",
    "url": "/vote",
    "title": "提交/更新投票",
    "name": "PostVote",
    "group": "投票",
    "description": "<p>用户对题目投 “会/不会”，重复提交将更新投票值</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "questionId",
        "description": "<p>题目ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "size": "0..1",
        "optional": false,
        "field": "value",
        "description": "<p>投票值，1=会，0=不会</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>投票记录</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>记录ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.question",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.value",
            "description": "<p>投票值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 0,\n  \"data\": { \"_id\": \"...\", \"user\": \"...\", \"question\": \"...\", \"value\": 1 },\n  \"message\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{ \"code\": 4000, \"message\": \"投票失败\" }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/vote.route.js",
    "groupTitle": "投票",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/vote"
      }
    ]
  },
  {
    "type": "get",
    "url": "/douyin/save",
    "title": "保存视频数据接口",
    "name": "保存视频数据接口",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/douyin/save"
      }
    ]
  },
  {
    "type": "post",
    "url": "/douyin",
    "title": "混合解析单一视频接口",
    "name": "混合解析单一视频接口",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/douyin"
      }
    ]
  },
  {
    "type": "get",
    "url": "/douyin/get",
    "title": "获取视频数据接口",
    "name": "获取视频数据接口",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/douyin/get"
      }
    ]
  },
  {
    "type": "get",
    "url": "/douyin/dataList",
    "title": "获取视频数据列表接口",
    "name": "获取视频数据请求列表",
    "group": "抖音",
    "version": "1.0.0",
    "filename": "src/routes/modules/douyin.route.js",
    "groupTitle": "抖音",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/douyin/dataList"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/user/login-qrcode/status",
    "title": "查询二维码状态",
    "name": "CheckQrcodeStatus",
    "group": "用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scene",
            "description": "<p>二维码场景值</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/api/user/login-qrcode/status"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/login-qrcode",
    "title": "生成登录二维码",
    "name": "GenerateLoginQrcode",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/api/user/login-qrcode"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/role",
    "title": "查询用户角色",
    "name": "GetUserRole",
    "group": "用户",
    "description": "<p>查询当前登录用户的角色信息</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
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
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.role",
            "description": "<p>用户角色</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.userId",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>成功信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"data\": {\n    \"role\": \"admin\",\n    \"userId\": \"64f1a2b3c4d5e6f7g8h9i0j1\"\n  },\n  \"message\": \"获取用户角色成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码</p>"
          },
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
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"用户不存在\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"未授权访问\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/user/role"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "用户注册",
    "name": "RegisterUser",
    "group": "用户",
    "description": "<p>新用户注册接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>电子邮箱</p>"
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
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/user/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/user/login-qrcode/scanning",
    "title": "扫描登录二维码",
    "name": "qrCodeScanning",
    "group": "用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scene",
            "description": "<p>二维码场景值</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/api/user/login-qrcode/scanning"
      }
    ]
  },
  {
    "type": "put",
    "url": "/user/",
    "title": "修改个人资料",
    "name": "updateProfile",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/user/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "查看个人资料",
    "name": "viewProfile",
    "group": "用户",
    "version": "0.0.0",
    "filename": "src/routes/modules/user.route.js",
    "groupTitle": "用户",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/user/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/admin/users/login-qrcode/confirm",
    "title": "确认二维码登录",
    "name": "ConfirmQrcodeLogin",
    "group": "用户管理",
    "description": "<p>管理员确认用户的二维码登录请求</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，用户登录后获取</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qrcodeId",
            "description": "<p>二维码ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "confirm",
            "description": "<p>是否确认登录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"qrcodeId\": \"qr_123456789\",\n  \"confirm\": true\n}",
          "type": "json"
        }
      ]
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"message\": \"二维码登录确认成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 4000,\n  \"message\": \"二维码已过期\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin/admin.user.route.js",
    "groupTitle": "用户管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/admin/users/login-qrcode/confirm"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/admin/users/delete",
    "title": "批量删除用户",
    "name": "DeleteUsers",
    "group": "用户管理",
    "description": "<p>管理员批量删除用户</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，用户登录后获取</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ids",
            "description": "<p>要删除的用户ID数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"ids\": [1, 2, 3]\n}",
          "type": "json"
        }
      ]
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
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>删除的记录数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"message\": \"删除成功\",\n  \"data\": 3\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 4000,\n  \"message\": \"请选择要删除的用户\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin/admin.user.route.js",
    "groupTitle": "用户管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/admin/users/delete"
      }
    ]
  },
  {
    "type": "get",
    "url": "/admin/users",
    "title": "获取用户列表",
    "name": "GetUserList",
    "group": "用户管理",
    "description": "<p>管理员获取用户列表，支持分页、搜索和筛选</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，用户登录后获取</p>"
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
            "field": "current",
            "defaultValue": "1",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "10",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>搜索关键词（用户名、昵称、邮箱）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "description": "<p>角色筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "membership",
            "description": "<p>会员等级筛选</p>"
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
            "field": "data.list",
            "description": "<p>用户列表</p>"
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
            "field": "data.pagination.current",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"message\": \"获取用户列表成功\",\n  \"data\": {\n    \"list\": [\n      {\n        \"id\": 1,\n        \"username\": \"testuser\",\n        \"nickname\": \"测试用户\",\n        \"email\": \"test@example.com\",\n        \"role\": \"user\",\n        \"membership\": 0\n      }\n    ],\n    \"pagination\": {\n      \"current\": 1,\n      \"pageSize\": 10,\n      \"total\": 1,\n      \"totalPages\": 1\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 4001,\n  \"message\": \"未授权访问\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin/admin.user.route.js",
    "groupTitle": "用户管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/admin/users"
      }
    ]
  },
  {
    "type": "put",
    "url": "/admin/users/:id",
    "title": "更新用户信息",
    "name": "UpdateUser",
    "group": "用户管理",
    "description": "<p>管理员更新指定用户的信息</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，用户登录后获取</p>"
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
            "optional": false,
            "field": "id",
            "description": "<p>用户ID（路径参数）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "description": "<p>角色</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "membership",
            "description": "<p>会员等级</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>头像URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>手机号</p>"
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
            "description": "<p>更新后的用户信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 2000,\n  \"message\": \"用户信息更新成功\",\n  \"data\": {\n    \"id\": 1,\n    \"username\": \"newusername\",\n    \"nickname\": \"新昵称\",\n    \"email\": \"newemail@example.com\",\n    \"role\": \"user\",\n    \"membership\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 4004,\n  \"message\": \"用户不存在\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin/admin.user.route.js",
    "groupTitle": "用户管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/admin/users/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/:id/comments",
    "title": "创建评论",
    "description": "<p>为指定题目创建评论</p>",
    "name": "CreateComment",
    "group": "评论",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要用户登录</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "content",
        "description": "<p>评论内容</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "parentId",
        "description": "<p>父评论ID（回复时使用）</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>创建的评论</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment._id",
            "description": "<p>评论ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.content",
            "description": "<p>评论内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comment.user",
            "description": "<p>用户信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "comment.createdAt",
            "description": "<p>创建时间</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/:id/comments"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/question/comments/:commentId",
    "title": "删除评论",
    "description": "<p>删除评论（评论作者或管理员可操作）</p>",
    "name": "DeleteComment",
    "group": "评论",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要用户登录</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>评论ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>删除成功</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/comments/:commentId"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/comments/:commentId/dislike",
    "title": "踩/取消踩评论",
    "description": "<p>对评论进行踩或取消踩操作</p>",
    "name": "DislikeComment",
    "group": "评论",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要用户登录</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>评论ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "disliked",
            "description": "<p>是否踩（true=踩，false=取消踩）</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dislikes",
            "description": "<p>当前踩数</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/comments/:commentId/dislike"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/:id/comments",
    "title": "获取题目评论列表",
    "description": "<p>获取指定题目的评论列表，支持分页和排序</p>",
    "name": "GetQuestionComments",
    "group": "评论",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "10",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortBy",
            "defaultValue": "createdAt",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortOrder",
            "defaultValue": "desc",
            "description": "<p>排序方式，asc或desc</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>评论列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list._id",
            "description": "<p>评论ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.content",
            "description": "<p>评论内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "list.user",
            "description": "<p>评论用户信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.user._id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.user.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.user.avatar",
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.likes",
            "description": "<p>点赞数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "list.dislikes",
            "description": "<p>踩数</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "list.isTop",
            "description": "<p>是否置顶</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list.replies",
            "description": "<p>回复列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pagination",
            "description": "<p>分页信息</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/:id/comments"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/comments/:commentId/like",
    "title": "点赞/取消点赞评论",
    "description": "<p>对评论进行点赞或取消点赞操作</p>",
    "name": "LikeComment",
    "group": "评论",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要用户登录</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>评论ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "liked",
            "description": "<p>是否点赞（true=点赞，false=取消点赞）</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likes",
            "description": "<p>当前点赞数</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/comments/:commentId/like"
      }
    ]
  },
  {
    "type": "patch",
    "url": "/question/comments/:commentId/top",
    "title": "置顶/取消置顶评论",
    "description": "<p>设置或取消评论置顶（管理员操作）</p>",
    "name": "TopComment",
    "group": "评论",
    "version": "1.0.0",
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
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>评论ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Boolean",
        "optional": false,
        "field": "isTop",
        "description": "<p>是否置顶</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>更新后的评论</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "comment.isTop",
            "description": "<p>是否置顶</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/comments/:commentId/top"
      }
    ]
  },
  {
    "type": "patch",
    "url": "/question/comments/:commentId",
    "title": "更新评论",
    "description": "<p>更新评论内容（仅评论作者可操作）</p>",
    "name": "UpdateComment",
    "group": "评论",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要用户登录</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>评论ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "content",
        "description": "<p>新的评论内容</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comment",
            "description": "<p>更新后的评论</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment._id",
            "description": "<p>评论ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.content",
            "description": "<p>评论内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "comment.updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "评论",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/comments/:commentId"
      }
    ]
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
    "groupTitle": "财富",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/wealth/muyu"
      }
    ]
  },
  {
    "type": "get",
    "url": "/file-cleanup/all",
    "title": "文件资源数据列表",
    "name": "GetAllFiles",
    "group": "资源管理",
    "description": "<p>分页获取所有文件资源数据，支持状态和存储提供商过滤</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current",
            "defaultValue": "1",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "20",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>文件状态过滤（pending/active/unused/deleted）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "storageProvider",
            "description": "<p>存储提供商过滤</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>文件资源列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.current",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.pageSize",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.totalCount",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.totalPages",
            "description": "<p>总页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "pagination.hasNext",
            "description": "<p>是否有下一页</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "pagination.hasPrev",
            "description": "<p>是否有上一页</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/fileResources.route.js",
    "groupTitle": "资源管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/file-cleanup/all"
      }
    ]
  },
  {
    "type": "get",
    "url": "/file-cleanup/list",
    "title": "获取待清理文件列表",
    "name": "GetCleanupList",
    "group": "资源管理",
    "description": "<p>分页获取待清理的文件列表</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current",
            "defaultValue": "1",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "20",
            "description": "<p>每页数量</p>"
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
            "description": "<p>响应状态码</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>文件列表</p>"
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
            "field": "data.pagination.current",
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
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/fileResources.route.js",
    "groupTitle": "资源管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/file-cleanup/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/file-cleanup/stats",
    "title": "获取文件资源统计信息",
    "name": "GetFileStats",
    "group": "资源管理",
    "description": "<p>获取文件资源的统计信息，包括各种状态的文件数量</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>统计数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.total",
            "description": "<p>文件总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pending",
            "description": "<p>待处理文件数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.active",
            "description": "<p>活跃文件数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.unused",
            "description": "<p>未使用文件数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.deleted",
            "description": "<p>已删除文件数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/fileResources.route.js",
    "groupTitle": "资源管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/file-cleanup/stats"
      }
    ]
  },
  {
    "type": "post",
    "url": "/file-cleanup/manual",
    "title": "手动执行文件清理",
    "name": "ManualCleanup",
    "group": "资源管理",
    "description": "<p>手动触发文件清理任务</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "batchSize",
            "defaultValue": "50",
            "description": "<p>批量清理数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"batchSize\": 50\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>清理结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.total",
            "description": "<p>总处理文件数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.success",
            "description": "<p>成功清理数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.failed",
            "description": "<p>清理失败数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/fileResources.route.js",
    "groupTitle": "资源管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/file-cleanup/manual"
      }
    ]
  },
  {
    "type": "post",
    "url": "/file-cleanup/mark-unused",
    "title": "标记文件为未使用",
    "name": "MarkFileAsUnused",
    "group": "资源管理",
    "description": "<p>将文件标记为未使用状态</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileUrl",
            "description": "<p>文件URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"fileUrl\": \"https://example.com/files/image.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/fileResources.route.js",
    "groupTitle": "资源管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/file-cleanup/mark-unused"
      }
    ]
  },
  {
    "type": "post",
    "url": "/file-cleanup/mark-used",
    "title": "标记文件为已使用",
    "name": "MarkFileAsUsed",
    "group": "资源管理",
    "description": "<p>将文件标记为已使用状态</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileUrl",
            "description": "<p>文件URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"fileUrl\": \"https://example.com/files/image.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>响应消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/modules/fileResources.route.js",
    "groupTitle": "资源管理",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/file-cleanup/mark-used"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/batch-delete",
    "title": "批量删除题目",
    "description": "<p>批量删除多个题目</p>",
    "name": "BatchDeleteQuestions",
    "group": "题库",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number[]",
        "optional": false,
        "field": "ids",
        "description": "<p>要删除的题目ID数组</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>删除成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "deletedCount",
            "description": "<p>成功删除的题目数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number[]",
            "optional": false,
            "field": "failedIds",
            "description": "<p>删除失败的题目ID数组</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/batch-delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/today-topic/cancel",
    "title": "取消今日题目",
    "description": "<p>取消当前的今日题目设置</p>",
    "name": "CancelTodayTopic",
    "group": "题库",
    "version": "1.0.0",
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
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>取消成功</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/today-topic/cancel"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/create",
    "title": "创建题目",
    "description": "<p>创建新的题目</p>",
    "name": "CreateQuestion",
    "group": "题库",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>题目标题</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "content",
        "description": "<p>题目内容</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "answer",
        "description": "<p>题目答案</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "difficulty",
        "defaultValue": "3",
        "description": "<p>难度级别</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "category",
        "description": "<p>题目分类</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "tags",
        "description": "<p>题目标签</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>创建的题目</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>题目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.content",
            "description": "<p>题目内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.answer",
            "description": "<p>题目答案</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.difficulty",
            "description": "<p>难度级别</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.category",
            "description": "<p>题目分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.tags",
            "description": "<p>题目标签</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/create"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/question/:id",
    "title": "删除题目",
    "description": "<p>删除指定ID的题目</p>",
    "name": "DeleteQuestion",
    "group": "题库",
    "version": "1.0.0",
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
            "optional": false,
            "field": "id",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>删除成功</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/:id",
    "title": "获取题目详情",
    "description": "<p>根据ID获取题目的详细信息</p>",
    "name": "GetQuestionDetail",
    "group": "题库",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>题目详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>题目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.content",
            "description": "<p>题目内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.answer",
            "description": "<p>题目答案</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.difficulty",
            "description": "<p>难度级别</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.category",
            "description": "<p>题目分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.tags",
            "description": "<p>题目标签</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/list",
    "title": "获取题库列表",
    "description": "<p>获取题库列表，支持分页、筛选和排序</p>",
    "name": "GetQuestionList",
    "group": "题库",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "defaultValue": "10",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>分类筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "tags",
            "description": "<p>标签筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "difficulty",
            "description": "<p>难度筛选</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keyword",
            "description": "<p>关键词搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortBy",
            "defaultValue": "createdAt",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sortOrder",
            "defaultValue": "desc",
            "description": "<p>排序方式，asc或desc</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>题目列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.total",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.current",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.pageSize",
            "description": "<p>每页数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagination.totalPages",
            "description": "<p>总页数</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/question/today-topic",
    "title": "获取今日题目",
    "description": "<p>获取当前设置的今日题目</p>",
    "name": "GetTodayTopic",
    "group": "题库",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>今日题目（如果没有设置则返回null）</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question._id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>题目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.desc",
            "description": "<p>题目描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.answer",
            "description": "<p>题目答案</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.analysis",
            "description": "<p>题目解析</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.difficulty",
            "description": "<p>难度级别</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.category",
            "description": "<p>题目分类</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "question.tags",
            "description": "<p>题目标签</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "question.isTodayTopic",
            "description": "<p>是否为今日题目</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/today-topic"
      }
    ]
  },
  {
    "type": "post",
    "url": "/question/today-topic/set",
    "title": "设置今日题目",
    "description": "<p>设置指定题目为今日题目，只能存在一个今日题目</p>",
    "name": "SetTodayTopic",
    "group": "题库",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "questionId",
        "description": "<p>题目ID</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>设置为今日题目的题目数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question._id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>题目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "question.isTodayTopic",
            "description": "<p>是否为今日题目（true）</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/today-topic/set"
      }
    ]
  },
  {
    "type": "patch",
    "url": "/question/:id",
    "title": "更新题目",
    "description": "<p>更新现有题目的信息</p>",
    "name": "UpdateQuestion",
    "group": "题库",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token，需要管理员权限</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
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
            "optional": false,
            "field": "id",
            "description": "<p>题目ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "title",
        "description": "<p>题目标题</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "content",
        "description": "<p>题目内容</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "answer",
        "description": "<p>题目答案</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "difficulty",
        "description": "<p>难度级别</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "category",
        "description": "<p>题目分类</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "tags",
        "description": "<p>题目标签</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>更新后的题目</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.id",
            "description": "<p>题目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>题目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.content",
            "description": "<p>题目内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.answer",
            "description": "<p>题目答案</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.difficulty",
            "description": "<p>难度级别</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.category",
            "description": "<p>题目分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.tags",
            "description": "<p>题目标签</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.createdAt",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "question.updatedAt",
            "description": "<p>更新时间</p>"
          }
        ]
      }
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
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误代码</p>"
          }
        ]
      }
    },
    "filename": "src/routes/modules/question.route.js",
    "groupTitle": "题库",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:3000/api/question/:id"
      }
    ]
  }
] });
