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
    * [Props](#props)
    * [Binder.render](#binderrender)
    * [Binder.createClass](#bindercreateclass)

### Binder

Binder组件通过bind属性来自动监测store数据变化，并通过render方法来更新页面。

#### Props

* __bind__ *(Array<Store>)* - bind是一个包含需监听Store的数组。
* __render__ *(()=>React.Element)* - render是一个function，返回React Element。

```javascript
//当testStore的值发生改变的时，Text组件中的内容将会自动更新。
<Binder bind = {[testStore] render = {()=><Text>{testStore.value}</Text>}}/>
```
#### Binder.render

render方法返回React Element;

```javascript
//api
Binder.render(ReactComponent:Class<React.Component<*,*,*>>, bind: Array<Object>, getProps?: Function): React.Element<*>;
```

```javascript
//demo
class A extends Component {
    render:()=>{
        return <Text>name:{this.props.name},value:{store.value}</Text>
    }
}

class B extends Component {
    render:() => {
        return Binder.render(A,[store],getProps(){
            return {name:store.name}
        });
    }
}
```



#### Binder.createClass

createClass方法将一个普通的Component变成一个Binder Component。

```javascript
Binder.createClass(ReactComponent:Class<React.Component<*,*,*>>):Class<*>
```

```javascript
let BinderA = Binder.createClass(A);

<BinderA binder = {[store]} getProps = {()=>{
    name:store.name
}} />
```
