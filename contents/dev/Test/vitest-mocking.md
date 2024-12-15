---
title: Vitest - Mocking
fileName: vitest-mocking
description: Vitest Mocking 方法介紹
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Test
  - Vitest
  - mock
---

# Vitest - Mocking

## 前言

在撰寫測試時，經常遇到的挑戰是大部分程式碼包含 Side Effect，並非單純的 Pure Function。這些程式碼可能依賴外部套件、網路等因素，增加了測試的複雜性和不穩定性。此外，測試時通常不希望直接依賴外部 API，以免因外部因素的變動導致 CI 測試失敗、誤觸發 DoS、或超出速率限制。

為了解決這些問題，可以透過 mock 方法來模擬函式的返回值或 API 的回應，讓測試聚焦於當前程式碼的邏輯。

> @[Vitest Mocking Doc](https://vitest.dev/guide/mocking.html)
> @[Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI) - 1:04:30

## 範例

> @[CharacterList 測試程式碼 Github 入口](https://github.com/JennieSH/vitest-example/blob/main/app/components/CharacterList.test.tsx)

用一個簡單 React 程式碼來分別演示如何 `Mock API Fetching` 和 `Mock hook` ：

- `CharacterList` - 提供打關鍵字的搜尋框，並會渲染出對應的角色列表
- `useSearch` - 會根據關鍵字(keyword)，返回包含關鍵字的物件陣列
- `useCharacters` - 執行打 API 的邏輯函式，且返回 API 相關狀態

`CharacterList` 中有使用到 `useCharacters` 和 `useSearch` 這兩個 hooks。

```tsx
// CharacterList.tsx - 提供打關鍵字的搜尋框，並會渲染出對應的角色列表
const CharacterList = () => {
  const { characters } = useCharacters();
  const { keyword, filteredItems, setKeyword } = useSearch<Character>(
    characters,
    ["name"]
  );

  return (
    <div>
      <input
        type="text"
        value={keyword}
        placeholder="Search characters"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ul>
        {filteredItems.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

```ts
// useSearch.tsx -  會根據關鍵字(keyword)，返回包含關鍵字的物件陣列
const useSearch = <T extends { [key: string]: any }>(
  items: T[],
  filters = ["id"]
) => {
  const [keyword, setKeyword] = useState("");
  const filteredItems = items.filter((item) =>
    filters.some((key) =>
      item[key]?.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return {
    keyword,
    filteredItems,
    setKeyword
  };
};
```

```tsx
// useCharacters.tsx - 執行打 API 的邏輯函式，且返回 API 相關狀態
type Character = {
  id: number;
  name: string;
};

const useCharacters = (): {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
} => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?name=rick&status=alive"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }

      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    isLoading,
    error
  };
};

export default useCharacters;
```

### 設定 Mocking 對象

#### **1\. import 需要模擬的函式**

```ts
import useCharacters from "../hooks/useCharacters";
import useSearch from "../hooks/useSearch";
```

#### **2\. 使用 `vi.mock` 選擇要模擬的函式**

```ts
vi.mock("../hooks/useCharacters");
vi.mock("../hooks/useSearch");
```

#### **3\. 宣告模擬的函式**

```ts
const mockUseCharacters = useCharacters as MockedFunction<typeof useCharacters>;
const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;
```

#### **4\. 使用 `MockedFunction` 來指定模擬函式的返回值**

```ts
mockUseCharacters.mockReturnValue({
  characters: [
    { id: 1, name: "Character 1" },
    { id: 2, name: "Character 2" }
  ],
  isLoading: false,
  error: null
});

mockUseSearch.mockReturnValue({
  keyword: "",
  filteredItems: [
    { id: 1, name: "Character 1" },
    { id: 2, name: "Character 2" }
  ],
  setKeyword: vi.fn()
});
```

::: spoiler 步驟完整程式碼

```ts
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, MockedFunction, vi } from "vitest";

// 1. 引入測試需要的函式
import useCharacters from "../hooks/useCharacters";
import useSearch from "../hooks/useSearch";

// 2. 選擇要模擬的函式
vi.mock("../hooks/useCharacters");
vi.mock("../hooks/useSearch");

// 3. 宣告模擬的函式
const mockUseCharacters = useCharacters as MockedFunction<typeof useCharacters>;
const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;

describe("CharacterList Component", () => {
  beforeEach(() => {
    // 4. 指定模擬函式的返回值 (設置每個測試的初始狀態)
    mockUseCharacters.mockReturnValue({
      characters: [
        { id: 1, name: "Character 1" },
        { id: 2, name: "Character 2" }
      ],
      isLoading: false,
      error: null
    });

    mockUseSearch.mockReturnValue({
      keyword: "",
      filteredItems: [
        { id: 1, name: "Character 1" },
        { id: 2, name: "Character 2" }
      ],
      setKeyword: vi.fn()
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup(); // 清理 DOM
  });
});
```

如果確保返回值永遠是定值，且後面不需要在更新修改該資料，可以在執行到第二步驟即可，`vi.mock` 傳入第二個參數，後續都會返回其結果：

```ts
// 呼叫 getUsers，永遠的 return 值都會是這邊設定好的，不會因後續操作而變動
vi.mock("./getUsers", () => {
  return {
    getUsers() {
      return {
        user: [
          { id: 1, name: "Jennie" },
          { id: 2, name: "Jason" }
        ],
        isLoading: false,
        error: null
      };
    }
  };
});
```

:::

### 測試目標

#### 1\. 初始渲染列表

測試第一次渲染的內容是否為預期。

```ts
test("renders characters correctly", () => {
  render(<CharacterList />);
  expect(screen.getByText("Character 1")).toBeTruthy();
  expect(screen.getByText("Character 2")).toBeTruthy();
});
```

#### 2\. 搜尋功能

測試在輸入框內輸入關鍵字後，渲染的列表內容是否有包含該關鍵字。

使用到的 API：

- **`mockReturnValueOnce`**
  只會在下一次調用 useSearch 時返回這個值，這樣可以模擬特定情境下的返回值，而不影響其他測試。
- **`rerender`**
  用於模擬 React 組件在資料改變後的重新渲染機制，因資料改變，從而觸發畫面更新。
- **`fireEvent`**
  模擬 React 事件，例如 change、click 等。

```ts
test("changes keyword in UI and filters characters", () => {
  const setKeywordMock = vi.fn();
  mockUseSearch.mockReturnValueOnce({
    keyword: "",
    filteredItems: [
      { id: 1, name: "Character 1" },
      { id: 2, name: "Character 2" }
    ],
    setKeyword: setKeywordMock
  });

  const { rerender } = render(<CharacterList />);

  const input = screen.getByPlaceholderText("Search characters");
  // 模擬觸發 input 值改變
  fireEvent.change(input, { target: { value: "Character 1" } });

  // 模擬 mockUseSearch 在 input 改變後的返回值
  mockUseSearch.mockReturnValueOnce({
    keyword: "Character 1",
    filteredItems: [{ id: 1, name: "Character 1" }],
    setKeyword: setKeywordMock
  });

  // 重新渲染 CharacterList
  rerender(<CharacterList />);

  expect(setKeywordMock).toHaveBeenCalledWith("Character 1");
  expect(screen.getByText("Character 1")).toBeTruthy();
  expect(screen.queryByText("Character 2")).toBeNull();
});
```

## **參考資料**

- [Vitest](https://vite.dev/)
- [Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI)
