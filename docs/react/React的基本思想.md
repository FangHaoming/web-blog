---
{
  "title": "React的基本思想",
}
---

## React使用的基本思想

**状态+模板=页面**

**不可变性**（pure component) —— 不直接在数据上修改,方便确定不可变数据是否发生改变，从而确定何时重新渲染组件

- 组件

  - 复杂问题转化成简单问题的集合（分治）
  - 复用（用抽象避免重复）

- 状态

  - 找变化。

  - State——组件内部。维持组件内部的变化。

  - Props——组件外部。组件外部传进来的值，便于组件复用。

  - 题外话：用路由的好处是，能够通过解析URL恢复状态。

  - ```js
    function Component(props:{}){
    	//1.props——外部传递进来（复用组件）
    	
    	//2.state——维持内部状态
    	const [state,setState]=useState();
    	
    	//3.props/state ——转换/类比Vue computed
    	const finalState=func(state);
    	
    	// 生命周期（props/state）发生变化
    	useEffect(()=>{
    		//load 数据
    	},[]);
    	
    	// 事件处理函数
    	const handleClick=()=>{
    		console.log('clicked');
    	};
    	
    	//4.模板——描述页面长什么样子
    	return (
        	<div onClick={handleClick}></div>
    	)
    }
    ```

