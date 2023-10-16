## 安装`AntV X6`
`package.json`、`package-lock.json` 和 `yarn.lock` 是在 Node.js 项目中用于管理依赖的文件。

1. **package.json**:
   - `package.json` 是一个用于描述项目信息、配置以及依赖关系的 JSON 文件。
   - 它包含了项目的名称、版本、作者、许可证信息等基本信息，还列出了项目所依赖的各种包及其版本范围。
   - 使用命令 `npm init` 或者 `yarn init` 可以初始化一个新的 `package.json` 文件。

2. **package-lock.json**:
   - `package-lock.json` 是 npm 5 以后引入的一个文件，用于锁定项目依赖的确切版本。
   - 它确保了在不同环境或不同开发者之间安装的依赖版本保持一致，从而避免了版本不一致带来的问题。
   - 这个文件会自动生成或者在执行 `npm install` 时更新。

3. **yarn.lock**:
   - `yarn.lock` 是 Yarn 包管理器使用的锁定文件，类似于 `package-lock.json`，但专用于 Yarn。
   - 它确保了在不同环境或不同开发者之间安装的依赖版本保持一致。
   - 这个文件会在执行 `yarn install` 时自动生成或更新。

**注意：**
- 如果一个项目同时存在 `package-lock.json` 和 `yarn.lock` 文件，Yarn 会优先使用 `yarn.lock`。npm 会优先使用 `package-lock.json`。
- 如果你在项目中使用 npm，建议只保留 `package-lock.json`；如果你在项目中使用 Yarn，建议只保留 `yarn.lock`。混用可能会导致一些依赖管理的问题。

综上所述，这三个文件在 Node.js 项目中起着重要的作用，确保了项目的稳定性和可复制性。


`npm install`：安装和更新项目依赖，会修改`package-lock.json`，不建议使用
`npm ci`：根据`package-lock.json`安装项目依赖，需要`npm v6`及更高版本
`npm run <script>`：运行`package.json`里对应`scripts`中的`script`脚本