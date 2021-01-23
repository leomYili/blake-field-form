# BlackLake 对 rc-field-form 组件的封装

## 安装

```()
npm install blake-field-form --save-dev
```

## 使用

基本与antd v4保持一致,只是去除了其他无关的组件,可以在 v3中使用,兼容老版本项目

去除 `requiredMark` 相关api,会对已存在的语言翻译产生影响

### extra api

#### validateFieldsAndScroll

重构一下validateFieldsAndScroll,变为promise,

```()

// scrollOptions:Type: 'auto' | 'smooth' | Function; Default: 'auto'
validateFieldsAndScroll(nameList?: NamePath[], options?: ScrollOptions) => Promise
```

## 当前版本

与ant-design保持一致, v4.10.3

## 补充说明

新版的结构与之前的不符,包里面调整过样式属性名称.

测试请使用 `yarn dev` 或 `npm run dev`
