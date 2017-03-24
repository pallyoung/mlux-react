# react-mlux-binder

基于[mlux](https://github.com/pallyoung/mlux)，用于实现在react或者react-native框架下组件自动监听store变化并更新。

* [features](#features)
* [demo](#demo)
* [usage](#usage)
* [API Reference](#api-reference)

## Features

* 在监听的store数据发生变化时动态更新视图。
* 提供多种方法方便创建Binder组件。

## Demo

请移步[Lottery](https://github.com/pallyoung/lottery)项目;

## Usage

 在项目根目录下执行 
 ```
 npm install react-mlux-binder --save
 ```      
 在项目文件中引入 
 ```javascript
 import Binder from 'react-mlux-binder';
 ```
## API Reference

* [Binder](#binder)
    * [Binder.createClass](#bindercreateclass)



```javascript
//当testStore的值发生改变的时，Text组件中的内容将会自动更新。
<Binder bind = {[testStore]} render = {()=><Text>{testStore.value}</Text>}}/>
```


#### Binder.createClass

createClass方法将一个普通的Component变成一个Binder Component。

```javascript
Binder.createClass(ReactComponent:Class<React.Component<*,*,*>>):Class<*>
```

```javascript
let BinderA = Binder.createClass(A);

<BinderA bind = {[store]} propsUpdater = {()=>{
    name:store.name
}} />
```
