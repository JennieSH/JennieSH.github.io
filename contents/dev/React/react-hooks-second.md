---
title: "[Note] React Hooks 整理 (下)"
fileName: "react-hooks-second"
description: "內容為 useRef、useContext、useReducer 的整理。"
createdAt: 2021-12-08
updatedAt: 2021-12-08
tags:
  - React
  - React Hooks
---

###### tags: `React`、`React Hooks`

# [Note] React Hooks 整理 (下)

此篇是關於 `useRef`、`useContext`、`useReducer` 的介紹，其他 Hooks 可以參考上篇～

<br/>

| 文章                                                                             | Hooks                                                      |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [React Hooks 整理 (上)](https://jenniesh.github.io/dev/React/react-hooks-first)  | useState、useEffect、useLayoutEffect、useMemo、useCallback |
| [React Hooks 整理 (下)](https://jenniesh.github.io/dev/React/react-hooks-second) | useRef、useContext、useReducer                             |

## useRef

### 使用方法

```jsx=
// 語法： const refContainer = useRef(初始值);

const refCount = useRef(0);
```

### 重點

- 回傳一個 ref object，相當於 `{current: value}`，每次 render 時都會回傳**同一個的 ref object**，在 component 的生命週期將保持不變
- `.current` 值改變後，不會觸發重新 render
- 使用情境：
  - 取得 dom
  - 紀錄前一次 render 的資料

### 範例

#### 情境一：取得 dom element

```jsx=
// 點選按鈕後，input 框要 focus
const TextBlock = () => {
  // step 1: 宣告 inputEl 並使用 useRef
  const inputEl = useRef(null);

  const onButtonClick = () => {
    console.log(inputEl.current); // <input type="text">
    inputEl.current.focus();
  };

  return (
    <>
      // step 2: 使用 ref 綁在想取得的 dom
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};

```

<br/>

#### 情境二：紀錄前一次 render 的值 e.g. 想計算出總共 render 幾次

- 使用 useState 🚫

```jsx=
// 錯誤示範(導致無窮迴圈)： 使用 useState
const Name = () => {
  const [name, setName] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    // 在 useEffect 使用 setRenderCount 更新 renderCount
    // 會造成無窮回圈： update state => compoment rerender => update state again => compoment rerender again => ..... => infinite loop
    setRenderCount(prevCount => prevCount + 1);
  });

  return (
    <>
      <input value={name} type="text" onChange={e => setName(e.target.value)} />
      <span>{name}</span>
      <div>It has been rendered {renderCount} times</div>
    </>
  );
};
```

- 使用 useRef

  利用 `.current` 值改變後，**不會觸發重新 render**，這一個特點，使用 `.current` 值來記錄和更新

```jsx=
// 使用 useRef
const Name = () => {
  const [name, setName] = useState("");
  const renderCount = useRef(0);

  useEffect(() => {
    // update state => compoment rerender => update renderCount.current
    renderCount.current += 1;
  },[name]);

  return (
    <>
      <input value={name} type="text" onChange={e => setName(e.target.value)} />
      <span>{name}</span>
      <div>It has been rendered {renderCount.current} times</div>
    </>
  );
};
```

![useRef](https://i.imgur.com/0XnVYcJ.gif)

## useContext

### 使用方法

```jsx=
// 語法： const value = useContext( 自訂的 Context );

const value = useContext(MyContext);
```

### 重點

- 在 `MyContext` provider (`<MyContext.Provider value={value}>`)內的組件，都可以透過 `useContext` 取得 `MyContext` value 值
- 可以跨組件取值，解決需要用 props 一層層傳值下去的問題
  (組件 A :arrow_right: 組件 B :arrow_right: 組件 C，C 需要 A 傳入的 props，但 B 卻不需要 A 傳入的 props)
- 呼叫 `useContext` 的組件會在 context 值更新時重新渲染

### 範例

```jsx=
const initDarkThemeStatus = false;
// Step 1. 先 createContext
const ThemeContext = createContext(initDarkThemeStatus);



// Child Component
const Child = () => {
  // Step 3. 在子組件使用 useContext，取得 value
  const darkTheme = useContext(ThemeContext);
  const theme = {
    color: darkTheme ? "white" : "black",
    backgroundColor: darkTheme ? "black" : "white"
  };

  return <div style={theme}>Child Component</div>;
};



// Parent Component
const Parent = () => {
  const [darkTheme, setDarkTheme] = useState(initDarkThemeStatus);

  const toggleTheme = () => {
    setDarkTheme(prevDarkTheme => !prevDarkTheme);
  };

  return (
      // Step 2. 在父組件使用 Provider，並傳入 value
     <ThemeContext.Provider value={darkTheme}>
       <button onClick={toggleTheme}>Toggle Theme</button>
       <Child />
     </ThemeContext.Provider>
  );
};
```

## useReducer

### 使用方法

```jsx=
// 語法： const [state, dispatch] = useReducer(reducer, initialArg, init);

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

### 重點

- 進階版的 `useState` (p.s. [`useState`](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L336) 底層是用 `useReducer` 實現)
- `dispatch => reducer => state`，集中在 `reducer` 執行 state 修改，組件內不直接對 state 操作
- reducer 與組件間傳參數：

```jsx=
// 組件 - 傳 name
dispatch({ type: ACTION.ADD_TODO, payload: { name }});

// reducer - 接收 name
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return [...state, newTodo(action.payload.name)];
    ...,
    default:
      return state;
  }
};
```

- 可傳入[第三個參數(function)](https://zh-hant.reactjs.org/docs/hooks-reference.html#lazy-initialization)
  - 計算初始 state 的邏輯提取到 reducer 外
  - 方便重置 state
- 適用**複雜的 state 邏輯修改**情境 e.g. 計算機可以使用加減乘除修改原先的值、同列表排序(更新時間、創建時間、名字 etc.)

### 範例

```jsx=
// Todos.jsx
const ACTION = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE: "delete-todo"
};

const newTodo = name => {
  return { id: Date.now(), name: name, complete: false };
};

// Step 2. 撰寫 reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return [...state, newTodo(action.payload.name)];
    case ACTION.TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) return { ...todo, complete: !todo.complete };
        return todo;
      });
    case ACTION.DELETE:
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};


const Todos = () => {
  // Step 1. 使用 useReducer，並傳入初始值
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Step 3. dispatch action
    dispatch({ type: ACTION.ADD_TODO, payload: { name } });
    setName("");
  };

  const handleToggle = id => {
    dispatch({ type: ACTION.TOGGLE_TODO, payload: { id } });
    console.log(todos);
  };

  const handleDelete = id => {
    dispatch({ type: ACTION.DELETE, payload: { id } });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
      </form>

      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} />
      ))}
    </>
  );
};

```

```jsx=
// Todo.jsx
const Todo = ({ todo, handleToggle, handleDelete }) => {
  return (
    <div>
      <span style={{ color: todo.complete ? "green" : "red" }}>{todo.name}</span>
      <button onClick={() => handleToggle(todo.id)}>Toggle</button>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
};
```

## 參考資料

1. [React 官方文件](https://reactjs.org/docs/getting-started.html)
2. [Web Dev Simplified - React Hooks](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)
