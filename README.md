- 尝试在create-react-app创建的工程中使用antd组件,并自定义webpack的配置
- 对create-react-app的默认配置进行自定义，使用react-app-rewired (引入此模块后修改package.json里的启动项配置)
- 创建config-overrides.js,用于修改默认配置
- babel-plugin-import是一个用于按需加载组件代码和样式的babel插件
- 引入customize-cra中提供的fixBabelImports来按需加载ant中的组件代码和样式
- 引入customize-cra中提供的less相关函数addLessLoader来帮助加载less样式
- 引入customize-cra中提供的addDecoratorsLegacy来扩展装饰器模式

###路由配置
- 一级路由配置