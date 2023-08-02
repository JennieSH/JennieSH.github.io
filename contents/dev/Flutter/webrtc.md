---
title: "[Note] WebRTC 與他的名詞們"
fileName: "webrtc"
description: "WebRTC 不只 APP 可以使用，同樣 Web 也可以實作唷！介紹 WebRTC 與之相關的名詞和連接流程。"
createdAt: 2023-05-05
updatedAt: 2023-05-05
tags:
  - Flutter
  - WebRTC
---

###### tags: `Flutter`、`WebRTC`

# [Note] WebRTC 與他的名詞們

## 前言

推薦 [WebRTC Crash Course](https://www.youtube.com/watch?v=FExZvpVvYxA) 這部影片，把 WebRTC 會出現的名詞解釋滿清楚的，雖然後面 demo 是 web 的，但不影響概念理解。

另外一部是 2013 Google I/O 的 [Real-time communication with WebRTC](https://www.youtube.com/watch?v=p2HzZkd2A40&t=1272s) 也滿推的，時間有點久遠，但觀念是共通不變的，筆記中有些圖也是參考這部影片畫的。

> 註: 文章內大部分圖片來源自 [WebRTC Crash Course](https://www.youtube.com/watch?v=FExZvpVvYxA)

## WebRTC

WebRTC（Web Real-Time Communication）是指通過 API 建立點對點的連線，並可交換彼此的語音、影像和數據通信的技術，應用於視訊會議、直播和即時通訊。

- **即時**
- **點對點** - 提高傳送效率和低延遲(因為不用透過 server 在中間溝通)
- **多平台** - Browsers、Mobile

<br/>

:::spoiler 延伸問題：WebSockets v.s. WebRTC ？

![WebSockets v.s. WebRTC](https://hackmd.io/_uploads/rydC0YIrh.png)

#### WebSockets

- 透過 server 實現即時溝通，資料會通過 server 傳遞給對方
- 因透過 server 傳遞資料，會間接增加些許延遲時間(特別是影片和音源類型特別有感）

#### WebRTC

- 透過 browsers/devices 實現點對點即時溝通，資料可以直接傳遞給對方
- 使用 [UDP](https://nordvpn.com/zh-tw/blog/tcp-udp-bijiao/) 傳輸協定，速度較快，

#### Q1. `WebSockets` 和 `WebRTC` 可以同時使用嗎？

> 可以，這兩者其實是互補的技術，因為 WebRTC 有一些局限性：<br>
> (1) WebRTC 使用 UDP 傳輸，但 **UDP 本身是一種不可靠的協議，資料傳輸過程中可能會丟失或損壞**，所以通常不會用來傳輸重要資料，如：重要文件，因為只要丟失幾個 byte，檔案就直接損壞了。然而，對於傳輸影片或音訊等媒體資料，一些丟失（掉幀）並不會對觀看或聆聽體驗產生明顯影響，因此可以接受。<br>
> (2) WebRTC 僅提供點對點通訊功能，無法自行建立連接，因此需要進行信令（Signaling）來交換連接資訊，以得知要與誰建立連接<br/>
> WebSockets 可以作為 Signaling Server 的角色，解決以上兩個限制。
> 第一， WebSockets 使用 TCP 傳輸，能確保信令資料（如 SDP）能夠準確、完整地傳送到對等方。
> 第二，提供了信令機制，解決了 WebRTC 無法自行建立連接的問題。

:::

## Peer-To-Peer Connection (P2P)

![P2P](https://hackmd.io/_uploads/S1bsx5wN2.png)

P2P（Peer-to-Peer）是指直接將兩個或多個計算機連接起來進行數據交換和共享，而**不需要通過中央服務器進行中轉**。在 P2P 模式下，每個計算機都可以充當客戶端和服務器。

- **分散式架構**：通過多個計算機之間的直接連接進行數據交換和共享，有效減輕服務器的負擔
- **高效性**：利用多個計算機的資源進行數據傳輸和處理，可以提高數據傳輸的速度和效率
- **可靠性**：由於數據通過多個節點進行傳輸，因此即使某些節點失敗或斷開連接，也不會對整個系統造成影響

## NAT

NAT（Network Address Translation）是一種常見的網絡協議，**將私有網絡中的 IP 地址轉換為公共網絡中的 IP 地址**，實現兩個網絡之間的通訊。

NAT 協議通常由路由器、防火墻等網絡設備實現，它可以將多個設備的內部私有 IP 地址映射到一個公共 IP 地址上，從而實現多個設備通過一個公共 IP 地址訪問互聯網。

![](https://hackmd.io/_uploads/S1zxXqvEn.png)

![](https://hackmd.io/_uploads/B1jMBqwVn.png)

**優點：**

1. 減少公共 IP 地址的使用 (解決 IPv4 位址不足)
2. 提高網絡的安全性

**缺點：**

1. 影響對等連接
2. 影響網絡性能

### NAT Translations Method

1. One to One NAT (Full- cone NAT)
2. Address restricted NAT
3. Port reststricted NAT
4. Symmetric NAT

:::info
:bulb:**補充：**
如果遇到 `Symmetric NAT`，會對 WebRTC 建立 P2P 連接帶來一定的難度，因為 P2P 連接需要直接通過公共 IP 地址進行通訊，需要搭配使用 TURN 服務器進行中繼，再將數據通過 TURN 服務器進行轉發。

> 前三種 NAT 內部同一內部位址都對應到同一個外部位址，但 Symmetric NAT 內是每一內部位址對應到不同的外部位址。
> :::

:::spoiler 延伸問題：為什麼需要 `STUN` 和 `TURN`？
**理想情況：**
A 和 B 都有一個 Public IP，透過雲端交換彼此 IP 訊息後，直接建立 P2P 連線。
![理想情況 webRTC](https://hackmd.io/_uploads/BJBZdNHBh.png)

**現實情況：**
NAT 會分發所謂的 Privacy IP，這些 Privacy IP 無法用於建立 P2P 連接，所以需要透過 STUN + TURN 的技術，穿透 NAT 這座高牆。
![現實情況 webRTC](https://hackmd.io/_uploads/ryndYNrB3.png)

:::

## STUN 服務器

![](https://hackmd.io/_uploads/HyeA35DN2.png)

STUN（Simple Traversal of UDP through NATs）服務器用於獲取用戶的公共 IP 地址和端口號。

- 取得 public IP 地址
- 對於 `Symmetric NAT` 無效

通過比較 STUN 服務器提供的 IP 和你自己電腦的地址，就可以判斷是否需要穿越 NAT，市面上也有一些現成的 [STUN 服務器](https://gist.github.com/mondain/b0ec1cf5f60ae726202e)可以使用。

## TURN 服務器

![](https://hackmd.io/_uploads/SkQYCcw43.png)

TURN（Traversal Using Relays around NAT）可以作為**中繼站**，將通信流量轉發到另一端。

- P2P 連接失敗時，提供雲端備援
- 確保任何環境條件下，都可以正常連接

優先使用 STUN 服務器，如遇到 `Symmetric NAT` 這類型的，才會使用 TURN 服務器，因為 TURN 服務器會增加網路流量和延遲，選擇的過程會藉由 ICE 的技術來實現。

## ICE - 交互式連接建立

ICE（Interactive Connectivity Establishment）通過對 STUN 和 TURN 發出請求，收集多個 ICE Candidates，並嘗試出各種可能性，**找出 P2P 連線的最佳路徑**，是實現 NAT 穿越方式之一。

- 收集的 ICE Candidates (addresses)
- 找出最佳連接路徑

:::info
:bulb:**補充：**

**ICE Candidate** 是建立對等連接的網路地址，包含 IP 地址和端口號，該 IP 地址可以是公共 IP、本地 IP 或中繼伺服器的地址。
:::

## SDP - 會話描述協議

![](https://hackmd.io/_uploads/HJrTGivNn.png)

SDP 會話描述協議（Session Description Protocol）描述通訊的基本信息（IP 地址、端口號、加密通信的公鑰信息等）、影像和音頻流信息、數據通道等信息，是一份(字符串)文件。

通過 SDP，兩端的設備，可以確定媒體流的格式、傳輸參數和連接信息等，以確保成功建立對應的多媒體通信。

## Signaling Server - 信令服務器

建立 P2P 連線前，因為客戶端彼此不知道對方，因此需要透過**信令服務器（Signaling Server）進行中介**，交換客戶端的會話描述協議（SDP）和 ICE Candidates 等。

> Signaling Server 可以想像就是幫兩邊 Client 傳遞兩種主要訊息：
> (1) `連接什麼` 和 `如何連接` - SDP
> (2) `使用哪條路徑連接` - ICE Candidates

![Signaling step 1](https://hackmd.io/_uploads/rJdH1OAH3.png)
![Signaling step 2](https://hackmd.io/_uploads/r1PqkORB2.png)
![Signaling step 2](https://hackmd.io/_uploads/rySaJ_RHh.png)

信令服務器可以是自行搭建的伺服器或第三方開發平台，例如 Firebase 等

## WebRTC 連接流程

1. A 想要與 B 建立連接
2. A 找出所有可能的公開連接方式
3. B 找出所有可能的公開連接方式
4. A 和 B 通過其他方式（e.g. WebSockets/HTTP fetch）傳遞會話信息
5. A 通過最優的路徑連接到 B
6. A 和 B 建立 P2P 連線

## 參考資料

- [WebRTC Crash Course](https://www.youtube.com/watch?v=FExZvpVvYxA)
- [【Flutter✖️WebRTC】WebRTC について学んだことのまとめ](https://zenn.dev/faucon/articles/085ab8e420b432)
- [WebRTC for flutter Developer](https://www.youtube.com/watch?v=IFPFNiFozdw&t=58s)
- [Real-time communication with WebRTC: Google I/O 2013](https://www.youtube.com/watch?v=p2HzZkd2A40&t=1272s)
- [How Does WebRTC Work? | Crash Course](https://www.youtube.com/watch?v=8I2axE6j204&t=632s)
- [WebRTC vs. WebSocket: Key differences and which to use](https://ably.com/topic/webrtc-vs-websocket)
