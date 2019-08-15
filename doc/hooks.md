> hooks 每次 Render 都有自己的 Props 与 State, 拥有自己固定不变的 Props 与 State
> useState的第0个数据只是作为当前render的一个常量存在于内部 

> useEffect 是每次render之后执行的一个方法, 拿到的state是当前render内的state
> useEffect 可以返回一个function, function会在组件销毁的时候调用, 适合取消监听事件等

> 要获取最新的状态 通过useRef获取 const lastState = useRef(state)
> hooks 必须放在根作用域, 不可以放在条件判断声明中

#### hooks list
```javascript
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeMethods,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from './ReactHooks';
```