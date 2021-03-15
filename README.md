# my-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 技术介绍


项目基于uni-app开发，uni-app是一个使用Vue.js开发所有前端应用的框架，
项目采用混合开发模式，项目集成一个基于weex改进的原生渲染引擎，提供原生渲染能力，在App中遇到vue页面性能不佳的情况可采用NVUE作为强化补充，
同时内置HTM5+引擎，让js可以直接调用原生。


### 开发规范
为了实现多端兼容，综合考虑编译速度、运行性能等因素， 约定了如下开发规范：
	 页面文件遵循Vue单文件组件（SFC）规范
	 组件标签靠近小程序规范
	 数据绑定及事件处理同VUE.JS规范，同时补充了APP及页面的生命周期
	 统一采用flex布局进行开发
	 数据统一采用vuex进行管理

### 目录结构
project  
│   README.md  
│   package.json       
│   public  
└───src  
    ├─api 接口调用  
    ├─common 公用方法类  
    ├─dict  字典表  
    ├─comonponents 符合vue组件规范的uni-app组件目录  
    ├─directive 自定义全局指令  
    ├─myComponents 符合vue组件规范的自定义组件  
    ├─store vuex状态管理  
    │
    ├─pages                 业务页面文件存放的目录  
    │  ├─index  
    │  │  └─index.vue     index页面  
    │  └─list  
    │     └─list.vue      list页面  
    ├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此  
    ├─wxcomponents          存放小程序组件的目录，  
    ├─main.js               Vue初始化入口文件  
    ├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期  
    ├─manifest.json         配置应用名称、appid、logo、版本等打包信息  
    └─pages.json            配置页面路由、导航条、选项卡等页面类信息  

