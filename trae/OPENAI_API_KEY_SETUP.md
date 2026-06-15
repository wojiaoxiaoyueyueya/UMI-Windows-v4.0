# Trae 中配置 OpenAI API Key

不要把真实 API Key 写到源码、README、Git 提交或聊天记录里。

## 推荐方式：使用环境变量

在 `linux_ubuntu2204_port` 目录下执行：

```bash
cp .env.example .env
nano .env
```

填写：

```text
OPENAI_API_KEY=在这里填写你的真实 API Key
OPENAI_BASE_URL=https://api.openai.com/v1
```

然后在终端加载：

```bash
set -alinux怎么配置codex
source .env
set +a
```

再启动 Trae，或者在 Trae 的终端里执行上面的命令。

## 验证 Key 是否生效

```bash
python3 - <<'PY'
import os
key = os.getenv("OPENAI_API_KEY")
print("OPENAI_API_KEY loaded:", bool(key))
print("prefix:", key[:7] + "..." if key else "missing")
PY
```

只检查是否加载，不要打印完整 Key。

## 安全提醒

- `.env` 不要提交到 Git。
- 如果 Key 泄露，马上到 OpenAI 控制台撤销并重新生成。
- 如果需要把项目发给别人，只发 `.env.example`，不要发 `.env`。
