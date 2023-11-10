# SMS-Tree

![](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
[![](https://img.shields.io/badge/Vue.js-35495E?style=flat-square&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![](https://img.shields.io/badge/Element%20Plus-409EFF?style=flat-square)](https://element-plus.org/)
[![](https://img.shields.io/badge/Pinia-f7d336?style=flat-square)](https://pinia.vuejs.org/)
[![](https://img.shields.io/badge/TRPC-398ccb?style=flat-square&logo=trpc&logoColor=white)](https://trpc.io/)
[![](https://img.shields.io/badge/Fuse.js-a684c6?style=flat-square)](https://www.fusejs.io/)
[![](https://img.shields.io/badge/VueUse-44bd87?style=flat-square)](https://vueuse.org/)

## 开发环境配置

1. 克隆整个仓库到本地计算机。

2. 命令行工作目录切到*仓库根文件夹*，使用 `pnpm` 安装前端仓库的相关依赖：
    ```shell
    pnpm i
    ```

## 获取后端 submodule

```shell
git submodule init
git submodule update --remote
```

更新 submodule:
```shell
git submodule update --remote
```

> [!NOTE]
> 为了防止编辑器 typescript language server 无法解析后端类型，推荐为后端安装依赖
>
> ```shell
> cd SMS-Tree-BE
> pnpm i
> ```
> 
> 如果出现 `RouterOutput` 类型错误（如：全是 `never`），请更新前端/后端 `trpc` 版本，使之互相匹配！

## 测试与本地部署

```shell
pnpm dev
```

在局域网内打开：
```shell
pnpm dev:local
```

## 所有可用命令
所有命令都应以 pnpm 开头，示例：pnpm dev。

1. `dev`：启动开发服务器
1. `dev:local`：在局域网内启动开发服务器
2. `build`：编译生产环境
3. `lint`：校验代码规范
4. `lint:fix`：校验代码规范并自动修复可修复错误
