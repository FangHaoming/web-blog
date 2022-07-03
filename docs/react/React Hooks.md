---
{
  "title": "React Hooks",
}
---

## React Hooks

> 使用 Hook 其中一个[目的](https://zh-hans.reactjs.org/docs/hooks-intro.html#complex-components-become-hard-to-understand)就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。

### useState

```js
const [state, setState] = useState(initialState) //函数组件中存储内部 state
//其中state是初始状态，setState是React内部更新state的函数
```

- React 是如何把对 Hook 的调用和组件联系起来的？

> 每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 `useState()` 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 `useState()` 调用会得到各自独立的本地 state 的原因。

- 惰性初始state

> 如果初始状态需要根据props计算得到，可以给useState()传入一个函数，该函数只在初始渲染时被调用

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

- setState函数式更新

> 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 `setState`

```js
setCount(prevCount => prevCount - 1)
```



### useEffect

> 它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API

```js
useEffect(() => {
	//这里相当于`componentDidMount`、`componentDidUpdate`，在组件更新(挂载)时执行
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
    //返回的清除effect函数相当于 `componentWillUnmount`，在组件销毁时执行
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

- 通过跳过 Effect 进行性能优化

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新，如果有清除函数再执行
```



### [useContext](https://zh-hans.reactjs.org/docs/context.html)

```js
const locale = useContext(localeContext);
//不使用组件嵌套就可以订阅 React 的 Context。
```

### useReducer

```js
const [todos, dispatch] = useReducer(todosReducer);
//通过 reducer 来管理组件本地的复杂 state。
```



