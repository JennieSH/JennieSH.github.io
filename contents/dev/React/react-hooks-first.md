---
title: "[Note] React Hooks 整理"
fileName: "react-hooks-first"
description: "最近開始學習 React Hooks，趁這次機會整理常見的 Hooks，內容慢慢增加中！"
createdAt: 2021-12-08
updatedAt: 2021-12-08
tags:
  - React
  - React Hooks
---

###### tags: `React`、`React Hooks`

# [Note] React Hooks 整理

最近開始學習 React Hooks，趁這次機會整理常見的 Hooks，目前尚缺兩個額外 Hooks 整理 ([`useImperativeHandle`](https://zh-hant.reactjs.org/docs/hooks-reference.html#useimperativehandle) & [`useDebugValue`](https://zh-hant.reactjs.org/docs/hooks-reference.html#usedebugvalue))，內容慢慢增加中 :runner:

## Why Hook?

- 更方便在 component 之間共用 stateful 的邏輯
- 解決 lifecycle 方法常常將不相關的邏輯混合在一起 e.g. event listener 和抓取資料設置在同個 `componentDidMount`
- 降低初學者學習門檻，class 需要記得綁定和事先了解 `this` 在 JavaScript 中如何運作

## Hook 通用規則

- 只在 **React function componen**t 或**自定義的 Hook** 呼叫 Hook
- 只在**最上層**呼叫 Hook：不要在迴圈、判斷式、或是嵌套 function 中呼叫 Hook

```jsx=
// 🚫： 不能放入條件式裡面

const App = () => {
  if (true) {
    const [count, setCount] = useState(0);
  }

  return (
    <h1>React</h1>
  );
};
```

## useState

### 使用方法

```jsx=
// 語法： const [state, setState] = useState(初始值)

const [count, setCount] = useState(0);
```

### 重點

- 使用陣列解構賦值，回傳的第一個值 `count` 為當前的 state，第二個值 `setCount` 為可更新 state 的方法
- `setState` 可直接傳值，也可以傳入 function

```jsx=
// 兩種寫法都有相同效果，一樣都會 +1

// 寫法一：直接傳值
const increase = () => {
    setCount(count + 1);
 };

// 寫法二： function 可拿到 previous value
const increase = () => {
    setCount((prevCount)=> prevCount + 1);
};
```

:::spoiler 補充
:::info

**:bulb: `setState` 使用 function 時機：
如果是有使用到 `previous value` 來設置新的 `value` 或彼此間有依賴關係。**

雖然上面兩個寫法都可達到 **+1**，但在下面的例子就不適合直接傳值：

`increase` 內呼叫兩次 `setCount`，當 `increase` 被觸發後，我們預期 `count` 會等於 2，但實際得到 **1**。

因為 `setCount(count + 1)`，裡面的 `count` 都還是當前 render 值 **0**，所以等於執行兩次 `setCount(0 + 1)`。

```jsx=
const Count = () => {
  const [count, setCount] = useState(0);

  // 預期為 2，但實際得到 1
  const increase = () => {
    setCount(count + 1); // 此時 count 為 0，相當於 setCount(0 + 1)
    setCount(count + 1); // 此時 count 為 0，相當於 setCount(0 + 1)
  };

  return (
    <>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </>
  );
};

```

這時改用 function 寫法， 確保是使用 `count` 的 `previous value` 而不是當前 render 後的值，就會如預期得到 **2** :

```jsx=
const Count = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(prevCount => prevCount + 1); // 相當於 setCount(0 + 1)
    setCount(prevCount => prevCount + 1); // 相當於 setCount(1 + 1)
  };

  return (
    <>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </>
  );
};
```

:::

<br/>

- 初始值有兩種表示方式，可直接傳入值，也可以用 function

:::spoiler 補充
:::info
:bulb: **初始值使用 function 寫法的時機：**

因為每次 render 時候都會重新執行 `useSate`，如果**初始值是需要非常複雜計算時**，每次更新需要重新計算，就會降低效能，這時就需要傳入 function，**該 function 只會在初始 render 時被調用**。

```jsx=
// 直接傳值：
const complexCompute = () => {
 console.log("execution");
 return 0;
};

const Count = () => {
 // 每次按 +1 時，都會印出 ‘execution’
 const [count, setCount] = useState(complexCompute());

 const increase = () => {
   setCount(preCount => preCount + 1);
 };

 return (
   <>
     <span>{count}</span>
     <button onClick={increase}>+</button>
   </>
 );
};
```

```jsx=
// 改用 function
const Count = () => {
  // 首次渲染印出 ‘execution’，後續按 +1 時，不會在印出字了
  const [count, setCount] = useState(() => complexCompute());

  const increase = () => {
    setCount(preCount => preCount + 1);
  };

    ...
}
```

:::

<br/>

- `setState` 是完全覆蓋 state，而非 merge

```jsx=
// 直接整個覆寫 fruitDate
const Fruit = () => {
  const [fruitDate, setFruitDate] = useState({ amount: 1, fruit: "banana" });

  const change = () => {
    setFruitDate({ fruit: "apple" }); // 觸發後，fruitDate 為 { fruit: "apple" }
  };

  return <button onClick={change}>change fruit</button>
};
```

```jsx=
// 使用擴展運算子，保留物件內其他屬性
const Fruit = () => {
  const [fruitDate, setFruitDate] = useState({ amount: 1, fruit: "banana" });

  const change = () => {
    setFruitDate({ ...fruitData, fruit: "apple" }); // 觸發後，fruitDate 為 { amount: 1 fruit: "apple" }
  };

  ...
};
```

## useEffect

### 使用方法

```jsx=
// 語法： useEffect(()=>{},[依賴項])

useEffect(() => {
    // 每次畫面重新渲染後都會執行
    console.log("executed")
});
```

### 重點

- 處理 side effect 事件，e.g. ajax、EventLister
- DOM 改變 => 渲染畫面 => 調用 `useEffect`
- 可以有多個依賴項，皆放在陣列中 `useEffect(()=>{ ... },[a, b, c])`
- 搭配第二參數傳入依賴和 return function，可達到原先 React 生命週期 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的效果

```jsx=
const Fruit = () => {
  const [fruit, setFruit] = useState("banana");
  const [count, setCount] = useState(0);

  // A. 第二參數不帶入，每次畫面重新渲染，都會執行
  useEffect(() => {
    // 當 fruit 或 count 值改變，畫面重新渲染，都會印出 “changed”
    console.log("changed");
  });


  // B. 第二參數，傳入空陣列 []，只有在第一次渲染時執行
  useEffect(() => {
    // 只在第一次渲染會印出 "init"
    console.log("init");
  }, []);


  // C. 第二參數，傳入依賴項，只有在依賴項改變時才執行
  useEffect(() => {
    // 只有 count 值改變，畫面更新，才會印出 "count changed"
    // 如果是 fruit 值改變則不觸發
    console.log("count changed");
  }, [count]);


  // D. return 的 function 會在組件移除後會觸發
  useEffect(() => {
    // 初次渲染時，建立 setInterval
    const timer = setInterval(() => {
      console.log("hello world");
    }, 1000);

    // 在組件移除後會執行 clearInterval
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <button onClick={() => setFruit("apple")}>change fruit - {fruit}</button>;
      <button onClick={() => setCount(prev => prev + 1)}>increase count - {count}</button>;
    </>
  );
};
```

## useLayoutEffect

### 使用方法

```jsx=
// 語法： useLayoutEffect(()=>{},[依賴項])

useLayoutEffect(() => {
     // 每次畫面重新渲染前都會執行
     // 對 DOM 操作 ....
    console.log("executed")
});
```

### 重點

- DOM 改變 => 調用 `useLayoutEffect` => 渲染畫面
- 謹慎使用，會影響使用者體驗，因為需要等待 `useLayoutEffect` 內程式實行完，才會渲染出畫面
- 使用時機：需要基於 DOM 的 Layout 做額外操作 e.g. 測量 DOM

### 範例 (useEffect v.s. useLayoutEffect)

#### - 使用 useEffect

在慢動作的 gif 裡面可以看到一開始的 `hi` (`top: 0`) 先出現在按鈕旁邊，在下一個畫面才套用 `top: 100px`，如果用正常速度看，就會看到第一個 hi 會閃爍一下，這對使用者體驗很不好。

```jsx=
// 使用 useEffect
const Foo = () => {
  const [show, setShow] = useState(false);
  const greetRef = useRef(null);

  useEffect(() => {
    if (greetRef.current === null) return;

    (greetRef.current as HTMLSpanElement).style.top = "100px";
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(prev => !prev)}> toggle Button</button>
      {show && (
        <span ref={greetRef} style={{ position: "absolute" }}>
          hi
        </span>
      )}
    </>
  );
};
```

![useEffect](https://i.imgur.com/gGzLETq.gif)

#### - 使用 useLayoutEffect

因為在渲染畫面前，先執行完好 `hi` 的 `top: 100px`，所以在看到畫面時，已經所設定的位置上了。

```jsx=
// 使用 useLayoutEffect
const Foo = () => {
  const [show, setShow] = useState(false);
  const greetRef = useRef(null);

  useLayoutEffect(() => {
    if (greetRef.current === null) return;

    (greetRef.current as HTMLSpanElement).style.top = "100px";
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(prev => !prev)}> toggle Button</button>
      {show && (
        <span ref={greetRef} style={{ position: "absolute" }}>
          hi
        </span>
      )}
    </>
  );
};
```

![useLayoutEffect](https://i.imgur.com/k5IHSoW.gif)

## useMemo

### 使用方法

```jsx=
// 語法： const data = useMemo(()=>{ return 值 },[依賴項])

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 可以將**函式返回值 cached**（跟 Vue 的 computed 很像)，並回傳一個 [memoized](https://en.wikipedia.org/wiki/Memoization) 的值
- useMemo 的 function 會在 render 期間執行
- 可傳入依賴 array，當依賴改變時才重新計算，不提供則每次都計算
- 需額外記憶體儲存變數，相當於以空間換時間，所以簡單的計算 / 值，要避免濫用
- 使用情境：當值需要昂貴計算得到，但不需要每次 render 都進行重新計算，可使用 useMemo 來優化

### 範例

由於每次畫面更新渲染都會執行 `slowFunc`，即使我們只想 toggle theme 時，還是要等待 for 迴圈結束，導致 dark theme 的畫面更新會有延遲。

```jsx=
// 模擬複雜計算
const slowFunc = (num) => {
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

const Fruit = () => {
  const [num, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const doubleNumber = slowFunc(num); // 每次渲染都會執行
  const theme = {
    color: dark ? "white" : "black",
    backgroundColor: dark ? "black" : "white"
  };

  return (
    <>
      <input type="number" value={num} onChange={e => setNumber(parseInt(e.target.value))} />
      <span>{doubleNumber}</span>
      <button onClick={() => setDark(!dark)} style={theme}>
        toggle theme
      </button>
    </>
  );
};
```

使用 useMemo 改寫並指定依賴後，在 toggle theme 就不會再進入 for 迴圈，能及時變更顏色了

```jsx=
const slowFunc = (num) => {
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

const Fruit = () => {
  const [num, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  // 指定 num 為依賴的值，只有 num 改變值，才呼叫 slowFunc
  const doubleNumber = useMemo(() => slowFunc(num), [num]);
  const theme = {
    color: dark ? "white" : "black",
    backgroundColor: dark ? "black" : "white"
  };

  return (...);
};
```

## useCallback

### 使用方法

```jsx=
// 語法： const cb = useCallback(callback, [依賴項])

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

- 與 `useMemo` 概念大致相同，**`useMemo`** 儲存 function **return 回來的值**，**`useCallback`** 儲存**整個 function**，`useCallback(fn, deps)` 相等於 `useMemo(() => fn, deps)`
- 可傳入依賴 array，當依賴改變時才重新宣告跟建立 function
- 使用情境：當子組件有依賴父組件傳遞 function，父組件的 function 可使用 `useCallback` 優化，來防止不必要的 render

### 範例

當每次 Parent Component(`<Foo>`)的 `num` 或 `dark` 值變動時， 畫面會重新渲染，`<Foo>` 內的 `getItems` 也跟著被重新宣告跟建立，等於 Child Component(`<List>`) 每次接收不同的 `getItems`，也跟著重新渲染（即使值不變，只有 `dark` 變動的情境）。

#### - 不使用 useCallback

```jsx=
// Child Component
const List = ({ getItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems());
    console.log("executed"); // num 或 dark 值變動時，<List> 都會 rerender，印出 executed
  }, [getItems]);

  return items.map(item => <div key={item}>{item}</div>);
};

// Parent Component
const Foo = () => {
  const [num, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // 一般宣告函式
  const getItems = () => [num, num + 1, num + 2];

  const theme = {
    color: dark ? "white" : "black",
    backgroundColor: dark ? "black" : "white"
  };

  return (
    <>
      <input type="number" value={num} onChange={e => setNumber(parseInt(e.target.value))} />

      <button onClick={() => setDark(prev => !prev)} style={theme}>
        toggle theme
      </button>

      <List getItems={getItems} />
    </>
  );
};
```

#### - 使用 useCallback

使用 useCallback，並傳入 `num` 當作依賴項，接下來當 `num` 值改變時，`getItems` 這個 function 才會重新被建立。

```jsx=
// Child Component
const List = ({ getItems }: { getItems: () => number[] }) => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(getItems());
    console.log("executed"); // 只有在 num 值變動時，才印出 executed
  }, [getItems]);

  return items.map(item => <div key={item}>{item}</div>);
};

// Parent Component
const Foo = () => {
  const [num, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // 使用 useCallback
  const getItems = useCallback(() => [num, num + 1, num + 2], [num]);

  const theme = { ... };

  return (
    <>
      <input type="number" value={num} onChange={e => setNumber(parseInt(e.target.value))} />

      <button onClick={() => setDark(prev => !prev)} style={theme}>
        toggle theme
      </button>

      <List getItems={getItems} />
    </>
  );
};

```

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
