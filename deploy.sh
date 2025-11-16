#!/bin/bash
set -e

# ========== 调试信息 ==========
echo "【调试】CI_COMMIT_REF_NAME='$CI_COMMIT_REF_NAME'"

# ========== 必填环境变量校验 ==========
: "${ACR_PASSWORD?错误：未设置 ACR 密码（ACR_PASSWORD）}"
: "${CI_COMMIT_REF_NAME?错误：未获取到分支或标签名称（CI_COMMIT_REF_NAME）}"

# ========== 配置区 ==========

ACR_REGISTRY="crpi-2i4ri1x643e1fba7.cn-hongkong.personal.cr.aliyuncs.com"
IMAGE_REPO="${ACR_REGISTRY}/${ACR_NAMESPACES}/${CI_SOURCE_NAME}"


# 容器配置
APP_PORT=$PORT # 如果未设置 PORT，默认 3000
HOST_PORT=$PORT      # 映射到宿主机相同端口
CONTAINER_NAME=$CI_SOURCE_NAME #可按需动态化，如加分支名
FULL_IMAGE="${IMAGE_REPO}:latest"

echo "[$(date)] 🚀 开始部署应用"
echo "镜像地址：$FULL_IMAGE"
echo "容器名称：$CONTAINER_NAME"
echo "应用端口：$APP_PORT，宿主机端口：$HOST_PORT"

# ========== 1. 登录 ACR ==========
echo "🔑 正在使用账号 $ACR_USERNAME 登录阿里云容器镜像服务（ACR）..."
echo "$ACR_PASSWORD" | docker login --username "$ACR_USERNAME" --password-stdin "$ACR_REGISTRY"

# ========== 2. 拉取镜像 ==========
echo "📥 正在拉取镜像：$FULL_IMAGE"
docker pull "$FULL_IMAGE"

# ========== 3. 清理旧容器 ==========
if docker ps -q --filter "name=^/${CONTAINER_NAME}$" | grep -q .; then
  echo "🛑 停止旧容器..."
  docker stop "$CONTAINER_NAME"
fi

if docker ps -aq --filter "name=^/${CONTAINER_NAME}$" | grep -q .; then
  echo "🗑️  删除旧容器..."
  docker rm "$CONTAINER_NAME"
fi

# ========== 4. 构建环境变量注入参数 ==========
# 自动从当前 Shell 环境中提取所有变量，构造 -e KEY=value 参数
DOCKER_ENV_ARGS=""

# 遍历所有环境变量
for var in $(compgen -e); do
  value=$(printenv "$var")

  # 排除敏感或与容器运行无关的变量（按需调整）
  if [[ "$var" != "ACR_PASSWORD" && \
        "$var" != "PATH" && \
        "$var" != "HOME" && \
        "$var" != "_" && \
        "$var" != "CI_COMMIT_REF_NAME" && \
        "$var" != "FULL_IMAGE" && \
        "$var" != "IMAGE_REPO" && \
        "$var" != "ACR_REGISTRY" && \
        "$var" != "ACR_USERNAME" ]]; then

    echo "【调试】注入变量: $var=$value"  # ✅ 注意这里不再有双引号包裹

    DOCKER_ENV_ARGS+=" -e $var=$value"   # ✅ 推荐：不手动加双引号
  fi
done

# 【调试信息】输出即将注入的环境变量（生产环境可删）
echo "【调试】自动注入的环境变量参数：$DOCKER_ENV_ARGS"

# ========== 5. 启动新容器（带环境变量注入） ==========
echo "▶️  启动新容器（带环境变量注入）..."
docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$HOST_PORT:$APP_PORT" \
  --restart=unless-stopped \
  $DOCKER_ENV_ARGS \
  "$FULL_IMAGE"

# ========== 6. 输出结果 ==========
echo "✅ 部署成功！"
echo "应用访问地址：http://$HOST:$HOST_PORT"
echo "容器内部 IP：$(docker inspect --format='{{.NetworkSettings.IPAddress}}' "$CONTAINER_NAME" 2>/dev/null || echo '暂无法获取')"