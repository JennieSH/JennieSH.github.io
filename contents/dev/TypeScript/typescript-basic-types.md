---
title: "[Note] TypeScript - The Basic Types"
fileName: "typescript-basic-types"
description: "TypeScript 基本型別複習筆記。"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - TypeScript
---

# [Note] TypeScript - The Basic Types

## Why TypeScript?

- 在編譯階段避免掉型別錯誤
- 更好的語法支持 (autocompletion)
- 可讀性、可維護性高
- 更好開發體驗 (debugging)

## 原始資料型別 - The primitives

### 布林值 boolean

使用 `boolean` 定義布林值型別

```typescript=
let isDone: boolean = false;
```

:::warning
注意：使用建構函式 Boolean 建立的物件**不是**布林值，`new Boolean()` 返回的是一個 Boolean 物件。

```typescript
// Type 'Boolean' is not assignable to type 'boolean'.
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
let createdByNewBoolean: boolean = new Boolean(1);
```

:::

### 數值 number

使用 `number` 定義數值型別

```typescript=
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010; // 10, 二進位制表示法
let octalLiteral: number = 0o744; // 484, 八進位制表示法
let notANumber: number = NaN; // Not A Number 是數值型別 ！！
let infinityNumber: number = Infinity;
```

### 字串 string

使用 `string` 定義字串型別

```typescript=
let greet: string = 'Hello';
```

### 空值 void

使用 `void` 表示沒有任何返回值的**函式**

```typescript=
function print(): void {
    console.log("Hello");
}
```

:::info
`void` 用於函式，不能賦值給其他型別的變數
<br/>

```typescript=
// incorrect
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

:::

### Null 和 Undefined

使用 `null` 和 `undefined` 定義變數

```typescript=
let u: undefined = undefined;
let n: null = null;
```

:::info
`undefined` 和 `null` 是所有型別的子型別，可以賦值給 `number` 型別的變數。
<br/>

```typescript=
// correct
let num: number = undefined;
```

:::

## 任意值 - any

使用 `any` 表示允許賦值為任意型別

### 可任意改變型別

如果是一個普通型別，在賦值或宣告型別後，再改變型別是不被允許的，但如果是 any 型別，則允許被賦值為任意型別。

```typescript=
// TypeSceipt 不會報錯
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

### `any` 返回的內容的型別都是 `any`

宣告一個變數為任意值之後，對它的任何操作，返回的內容的型別都是任意值。

```typescript=
// TypeSceipt 不會報錯，跟使用 js 效果是一樣
let anyThing: any = 'hello';
console.log(anyThing.myName);
```

### 未宣告型別的變數，視同 `any`

變數如果在宣告的時候，未指定其型別，那麼它會被識別為任意值型別。

```typescript=
let something; // 等同於 let something: any
something = 'seven';
something = 7;
```

## 型別註解 - Type Annotation

透過手動註解的方式，明確宣告資料型別，在變數、參數或屬性後面加上冒號 `:型別`

```typescript=
let greet: string = 'Hello';
let max: number = 100;
```

## 型別推論 - Type Inference

如果沒有明確的指定型別，會依照型別推論的規則推斷出一個型別

```typescript=
let myFavoriteNumber = 'seven';
// 等同於 let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

## 聯合型別 - Union Types

聯合型別使用 `|` 分隔每個型別，表示取值可以為多種型別中的一種

```typescript=
// 代表 myFavoriteNumber 只能是 string 或者 number，其他型別會報錯
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 存取聯合型別的屬性或方法

因 TypeScript 不確定一個聯合型別的變數到底是哪個型別，**只能存取此聯合型別的所有型別裡共有的屬性或方法**。

```typescript=
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

`length` 不是 `string` 和 `number` 的共有屬性，所以會報錯。

```typescript=
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 編譯時報錯

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

第二行的 `myFavoriteNumber` 被推斷成了 `string`，可以存取 length 屬性。

第四行的 `myFavoriteNumber` 被推斷成了 `number`，`number` `無length` 屬性時就報錯了。

## 物件的型別 介面 - Interface

使用介面（Interfaces）來定義物件的型別，具體如何行動則需要由類別（classes）去實現（implement）

- 介面一般首字母大寫
- 賦值的時候，變數的形狀必須和介面的形狀保持一致

```typescript=
// 定義了一個介面 Person
interface Person {
    name: string;
    age: number;
}

// 定義了一個變數 tom，它的型別是 Person
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

```typescript=
interface Person {
    name: string;
    age: number;
}

// 少/多 屬性皆不允許，需與 interface 一樣
let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

### 可選屬性 Optional Properties

使用 `?` 表示可選屬性，但仍然不允許新增未定義的屬性。

```typescript=
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```

```typescript=
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

### 任意屬性 Indexable Types

如希望一個介面允許有任意的屬性，使用 `[propName: type]` 來表示任意屬性取 `type` 型別的值

```typescript=
// [propName: string] 定義了任意屬性取 string 型別的值
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

:::warning
一旦**定義了任意屬性**，那麼**確定屬性和可選屬性的型別都必須是它的型別的子集**。

<br/>

```typescript=
interface Person {
    name: string;
    age?: number;
    // 使用 [propName: string] 定義了任意屬性取 string 型別的值
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

任意屬性的值允許是 `string`，但是可選屬性 `age` 的值卻是 `number`，`number` 不是 `string` 的子屬性，所以報錯了。

<br/>

如要確定 `interface` 會存在兩個以上型別，任意屬性的型別可使用**聯合型別**，或是使用 **`any`**。

<br/>

```typescript=
interface Person {
    name: string;
    // age 屬性是可選的，可能為 undefined 型別
    age?: number;
    // strict 模式一定要加上 undefined，否則會報錯
    [propName: string]: string | number | undefined;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

:::

:::info
**補充：**
`[propName: string]: string` 是指在 `interface` 內的 `key` 的型別是 `string`，TypeScript 會去約束確定屬性和可選屬性的 `key` 是 `string` 的型別，都必須是任意屬性的型別的子集。

<br/>

```typescript=
// 會報錯，age 這個 key 型別是 string，所以他會被任意屬性的型別約束
interface Person {
    name: string;
    age?: number;
    [propName: string]: string ;
}

// Property 'age' of type 'number | undefined' is not assignable to string index type 'string'
```

```typescript=
// 不報錯，propName 型別會是 number，不會去檢查非 number 型別的 key
interface Person {
    name: string;
    age?: number;
    [propName: number]: string ;
}
```

key 的類型會有 number 的情境，可以參考內置對象的型別 [`IArguments`](https://willh.gitbook.io/typescript-tutorial/basics/type-of-array#lei-bie-zhen-lie)。
:::

### 唯讀屬性 readonly properties

希望物件中的一些欄位**只能在建立的時候被賦值**，那麼可以用 `readonly` 定義唯讀屬性

```typescript=
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

使用 `readonly` 定義的屬性 id 初始化後，又被賦值了，所以報錯了。

:::warning
**唯讀的約束存在於第一次給「物件」賦值的時候，而不是第一次給「唯讀屬性」賦值的時候**

<br/>

```typescript=
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

有兩個 error： 1. 對 tom 進行賦值的時候，沒有給 id 賦值 2. `tom.id` 賦值的時候，由於它是只讀屬性，所以報錯了
:::

## 陣列的型別 - Array

主要有三種表示式可以定義陣列的型別

### 型別 + []

```typescript=
// 數值型別的陣列，陣列內的值只允許是 number
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

- 陣列內的值不允許出現其他的型別

```typescript=
let fibonacci: number[] = [1, '1', 2, 3, 5];

// Type 'string' is not assignable to type 'number'.
```

- 陣列的一些方法也會根據陣列在定義時約定的型別進行參數型別的限制

```typescript=
let fibonacci: number[] = [1, 1, 2, 3, 5];

// push 方法只允許傳入 number 型別的參數，卻傳了個 string
fibonacci.push('8');

// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

### Array\<型別>

使用陣列泛型（Array Generic) 來表示

```typescript=
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

### interface

```typescript=
interface NumberArray {
    [index: number]: number;
}

let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

`NumberArray` 表示：只要 `index` 的型別是數字時，那麼值的型別必須是數字。

很少這樣寫，通常用於特殊情境，例如：類別陣列。

#### 類別陣列

類別陣列（Array-like Object）不是陣列型別，比如 `arguments`。

> `arguments` 為 JavaScript 的[內建物件](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它們直接在 TypeScript 中當做定義好了的型別。

```typescript=
function sum() {
    let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

`arguments` 不能用普通的陣列的方式來描述，而應該用 interface，屬性可參考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments#properties)。

```typescript=
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

我們除了約束當 `index` 的型別是數字時，值的型別必須是數字之外，也約束了它還有 `length` 和 `callee` 兩個屬性，此時就不會報錯了。

:::info
常用的類別陣列 TypeScript 都有介面定義，如 `IArguments`、 `NodeList`、 `HTMLCollection` 等。

<br/>

```typescript=
// arguments 在 TypeScript 內建的介面定義為 IArguments

interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

function sum() {
    let args: IArguments = arguments;
}
```

:::

#### any 陣列

any 陣列內可允許出現任意型別

```typescript=
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

## 函式的型別 - Function Types

> [函式是 JavaScript 中的一等公民](https://www.cnblogs.com/fundebug/p/javascript-first-class-function.html)：
> 它們和其他對象都一樣，可以像對待任何其他數據類型一樣對待它們，作為**函數參數**，可以作為**函數返回值**，也可以**賦值給變量**。

### 函式宣告

常見的定義函式的方式 :

1. 函式宣告（Function Declaration）
2. 函式表示式（Function Expression）
   > TypeScript 的型別定義中，`=>` 用來表示函式的定義，左邊是輸入型別，需要用括號括起來，右邊是輸出型別

```javascript=
// javascript
// 函式宣告（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函式表示式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```

```typescript=
// typescript
// 函式宣告（Function Declaration）
function sum(x: number, y: number): number {
    return x + y;
}

// 函式表示式（Function Expression）
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

:::info

```typescript=
// mySum 的型別是透過賦值操作進行型別推論
let mySum = function (x: number, y: number): number {
    return x + y;
};

// 手動給 mySum 新增型別
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

上面第二行的程式碼只對等號右側的匿名函式進行了型別定義，而等號左邊的 **`mySum`**，是透過賦值操作進行**型別推論而推斷出來的**。
:::

- 輸入多餘的（或者少於要求的）參數，是不被允許的

```typescript=
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```

### interface 定義函式型別

使用 interface 的方式來定義一個函式需要符合的形狀

```typescript=
interface SumFunc {
    (x: number, y: number) : number
}

let mySum: SumFunc  = function (x: number, y: number): number {
    return x + y;
}
```

### 可選參數

- #### 使用 `?` 表示可選的參數

```typescript=
function sum(x: number, y?: number): number {
    if(y) return x+y;
    return x ;
}
```

:::warning
**使用 `?` 的情境下：**
可選參數必須接在必需參數後面，**可選參數後面不允許再出現必需參數**。
<br/>

```typescript=
function sum(x?: number, y: number): number {
    if(x) return x+y;
    return y ;
}

// A required parameter cannot follow an optional parameter.
```

:::

- #### 參數預設值
  TypeScript 會將添加了**預設值的參數識別為可選參數**

![參數預設值](https://i.imgur.com/2xll5gr.png)

```typescript=
function sum(x: number, y: number = 2): number {
   return x+y;
}

sum(1) // 3
sum(1,5) // 6
```

:::info
**使用預設值的情境下：**

**不受**「可選參數必須接在必需參數後面」的限制。

<br/>

```typescript=
function sum(x: number = 10, y: number): number {
   return x+y;
}

sum(undefined,1) // 11
sum(10,1) // 11
```

:::

### 剩餘參數

使用 `...rest` 的方式獲取函式中的剩餘參數[（rest 參數）](https://es6.ruanyifeng.com/#docs/function#rest%E5%BC%95%E6%95%B8)

```javascript=
// javascript
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);

console.log(a) // [1, 2, 3]
```

```typescript=
// typescript
function push(array: number[], ...items: number[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a:number[] = [];
push(a, 1, 2, 3);

console.log(a) // [1, 2, 3]
```

:::warning
注意，[rest 參數](https://es6.ruanyifeng.com/#docs/function#rest-%E5%8F%82%E6%95%B0)之後不能再有其他參數（即只能是最後一個參數），否則會報錯，同 javascript ES6 規則。

<br/>

```typescript=
function f(a:number[], ...b:number[], c:number) {
  // ...
}

// A rest parameter must be last in a parameter list.
```

:::

### 過載 (Function Overloads)

過載允許一個函式接受不同數量或型別參數時，作出不同的處理

#### 聯合型別寫法

```typescript=
// 聯合型別
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else {
        return x.split('').reverse().join('');
    }
}

reverse('abc') // "cba"
reverse(123) // 321
```

![聯合型別](https://i.imgur.com/Zq0Ysby.png)

![聯合型別 1](https://i.imgur.com/CGBsFBw.png)

利用聯合型別，實現數字和字串的反轉；但其**缺點**為，**不能夠精確的表達**，輸入為數字的時候，輸出也應該為數字，輸入為字串的時候，輸出也應該為字串。

#### 過載定義寫法

使用過載定義多個 reverse 的函式型別，前幾次都是函式定義，最後一次是函式實現。

```typescript=
// 過載定義多個 reverse 的函式型別
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else {
        return x.split('').reverse().join('');
    }
}
```

![過載](https://i.imgur.com/mb3d1fw.png)

![過載1](https://i.imgur.com/QgRqkLN.png)
![過載2](https://i.imgur.com/zTRooIw.png)

:::warning
注意，TypeScript 會**優先從最前面的函式定義開始匹配**，所以多個函式定義如果有包含關係，需要**優先把精確的定義寫在前面**。[(Function Overloads - Ordering)](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#function-overloads)
:::

## 型別斷言 - Type Assertion

型別斷言可以用來手動指定一個值的型別

```typescript=
// 寫法一：
<型別>值

// 寫法二 (React 只能使用這種)：
值 as 型別
```

形如 `<Foo>` 的語法在 tsx 中表示的是一個 ReactNode，在 ts 中除了表示型別斷言之外，也可能是表示一個泛型。

故建議大家在使用型別斷言時，統一使用`值 as 型別`這樣的語法。

### 斷言應用和特性

- 聯合型別可以被斷言為其中一個型別
- 父類可以被斷言為子類
- 任何型別都可以被斷言為 any
- any 可以被斷言為任何型別
- 要使得 A 能夠被斷言為 B，只需要 A 兼容 B 或 B 兼容 A 即可

#### 將一個聯合類型斷言為其中一個類型

當 TypeScript 不確定一個聯合類型的變量到底是哪個類型的時候，我們只能訪問此聯合類型的所有類型中共有的屬性或方法。

```typescript=
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function getName(animal: Cat | Fish) {
    return animal.name;
}
```

在還不確定類型的時候就訪問其中一個類型特有的屬性或方法，會報錯。

```typescript=
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

// error: Cat 不存在 swim 方法
function isFish(animal: Cat | Fish) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}

// Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
```

使用斷言改寫後，解決訪問 animal.swim 時報錯的問題。

```typescript=
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```

:::warning
類型斷言只能夠「欺騙」TypeScript 編譯器，無法避免運行時的錯誤，反而濫用類型斷言可能會導致運行時錯誤：

```typescript=
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};

// tom 型別是 Cat，沒有型別 Fish 的 swim 方法
swim(tom);

// 編譯時不會報錯，但在運行時會報錯
// Uncaught TypeError: animal.swim is not a function`
```

原因是 `(animal as Fish).swim()` 這段代碼隱藏了 `animal` 可能為 `Cat` 的情況，將 `animal` 直接斷言為 `Fish` 了，`而TypeScript` 編譯器信任了我們的斷言，故在調用 `swim()` 時沒有編譯錯誤。
<br/>
使用類型斷言時一定要格外小心，盡量避免斷言後調用方法或引用深層屬性，以減少不必要的運行時錯誤。
:::

#### 將一個父類斷言為更加具體的子類

當類之間有繼承關係時，類型斷言也是很常見的

```typescript=
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    // 判斷傳入的參數是不是 ApiError 型別
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

聲明了函數 `isApiError`，它用來判斷傳入的參數是不是 `ApiError` 型別，為了實現這樣一個函數，它的參數的型別肯定得是比較抽象的父類 `Error`，這樣的話這個函數就能接受 `Error` 或它的子類作為參數了。

但是由於父類 `Error` 中沒有 `code` 屬性，故直接獲取 `error.code` 會報錯，需要使用類型斷言獲取 `(error as ApiError).code`。

:::info
**class 情境：**(優先推薦使用 **`instanceof`**)

因 `ApiError` 是 **`class`** 的緣故，這裡也可使用 **`instanceof`** 來判斷 `error` 是否是它的實例。

<br/>

```typescript=
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
```

:::

:::info
**interface 情境：**(使用 **斷言**)

`ApiError` 和 `HttpError` 不是一個真正的 `class`，而只是一個 TypeScript 的接口（interface），接口是一個型別，不是一個真正的值，它在編譯結果中會被刪除，當然就無法使用 `instanceof` 來做運行時判斷了。

<br/>

```typescript=
// wrong
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    // ApiError 為型別，不是真正的值
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
// 'ApiError' only refers to a type, but is being used as a value here.
```

只能用型別斷言，通過判斷是否存在 `code` 屬性，來判斷傳入的參數的型別是不是 `ApiError`。
<br/>

```typescript=
// correct
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    // 用類型斷言判斷傳入的參數型別是不是 ApiError
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

:::

#### 將任何一個型別斷言為 `any` (pending

**它極有可能掩蓋了真正的型別錯誤，所以如果不是非常確定，就不要使用 `as any`。**

```typescript=
// error: window 上不存在 foo 屬性
window.foo = 1;

// Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

需要將 window 上添加一個屬性 foo，但 TypeScript 編譯時會報錯，提示我們 window 上不存在 foo 屬性。

```typescript=
(window as any).foo = 1;
```

使用 `as any` 臨時將 `window` 斷言為 `any` 型別，在 `any` 型別的變量上，訪問任何屬性都是允許的。

#### 將 `any` 斷言為一個具體的型別

下面三種情境都有可能受到 TypeScript 型別系統的限制而無法精確定義型別，這時就會處理 `any` 型別的變量。

- 第三方庫未能定義好自己的型別
- 前人遺留的代碼
- `JavaScript` 到 `TypeScript` 的過渡期

```typescript=
// 舊 code，返回值是 any
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

// 目標： 將返回值斷言成一個精確的類型
```

通過型別斷言把 `any` 斷言為精確的型別，亡羊補牢，使我們的代碼向著高可維護性的目標發展。

```typescript=
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

// 調用了它之後的返回值斷言成一個精確的類型 Cat
const tom = getCacheData('tom') as Cat;
tom.run();
```

調用完 `getCacheData` 之後，立即將它斷言為 `Cat` 類型。這樣的話明確了 `tom` 的類型，後續對 `tom` 的訪問時就有了代碼補全，提高了代碼的可維護性。
