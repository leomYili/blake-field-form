# BlackLake 对 rc-field-form 组件的封装

## 安装

```()
npm install blake-field-form --save-dev
```

## 使用

基本与 antd v4 保持一致,只是去除了其他无关的组件,可以在 v3 中使用,兼容老版本项目

去除 `requiredMark` 相关 api,会对已存在的语言翻译产生影响

### extra api

#### validateFieldsAndScroll

重构一下 validateFieldsAndScroll,变为 promise,

```()

// scrollOptions:Type: 'auto' | 'smooth' | Function; Default: 'auto'
validateFieldsAndScroll(nameList?: NamePath[], options?: ScrollOptions) => Promise
```

## 当前版本

与 ant-design 保持一致, v4.10.3

- 增加`Form.ErrorList`
- `Form.List params[children :(fields: Field[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode]`,增加meta,其中`errors`配合`Form.ErrorList使用`
- `Form.item` 增加 `tooltip`以及`messageVariables`

### 迭代版本

#### 4.7.3

初始版本,使用4.7.4并进行修改

## 补充说明

新版的结构与之前的不符,包里面调整过样式属性名称.

测试请使用 `yarn start` 或 `npm run start`
