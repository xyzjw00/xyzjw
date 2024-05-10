//=============================================================================
// Yanfly Engine Plugins - Core Engine
// YEP_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CoreEngine = true;

var Yanfly = Yanfly || {};
Yanfly.Core = Yanfly.Core || {};
Yanfly.Core.version = 1.32;

//=============================================================================
/*:
 * @plugindesc v1.32 Yanfly Engine Plugins 的所有插件幾乎必備的核心。
 * 包含 RPG Maker 中固有的錯誤修復。
 * @author Yanfly Engine Plugins
 *
 * @param ---Screen---
 * @default
 *
 * @param Screen Width
 * @parent ---Screen---
 * @type number
 * @min 0
 * @desc 調整畫面的寬度。
 * 預設：816
 * @default 816
 *
 * @param Screen Height
 * @parent ---Screen---
 * @type number
 * @min 0
 * @desc 調整畫面的高度。
 * 預設：624
 * @default 624
 *
 * @param Scale Battlebacks
 * @parent ---Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 您是否希望將戰鬥背景縮放到當前的解析度？
 * 不 - false     是 - true
 * @default true
 *
 * @param Scale Title
 * @parent ---Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 您是否希望將標題畫面縮放到當前的解析度？
 * 不 - false     是 - true
 * @default true
 *
 * @param Scale Game Over
 * @parent ---Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 您是否希望將遊戲結束的畫面縮放到當前的解析度？
 * 不 - false     是 - true
 * @default true
 *
 * @param Open Console
 * @parent ---Screen---
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc 出於測試和偵錯目的，這可以打開控制台。
 * 不要打開 - false     打開 - true
 * @default false
 *
 * @param Reposition Battlers
 * @parent ---Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允許插件重新定位戰鬥角色以適合當前的解析度？
 * 不 - false     是 - true
 * @default true
 *
 * @param GameFont Load Timer
 * @parent ---Screen---
 * @type number
 * @min 0
 * @desc 這允許您設置用於加載遊戲字體的計時器。
 * 設置為 0 表示無限時間。 預設：20000
 * @default 0
 *
 * @param Update Real Scale
 * @parent ---Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 目前，最好別管它，但它將允許畫面伸展真正的縮放。
 * 不 - false   是 - true
 * @default false
 *
 * @param Collection Clear
 * @parent ---Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 切換場景時清除主要場景中儲存的對象以釋放記憶體。
 * 不 - false   是 - true
 * @default true
 *
 * @param ---Gold---
 * @desc
 *
 * @param Gold Max
 * @parent ---Gold---
 * @type number
 * @min 1
 * @desc 玩家可以擁有的最大金幣數量。
 * 預設：99999999
 * @default 99999999
 *
 * @param Gold Font Size
 * @parent ---Gold---
 * @type number
 * @min 1
 * @desc 用於顯示金幣的字體大小。
 * 預設：28
 * @default 20
 *
 * @param Gold Icon
 * @parent ---Gold---
 * @type number
 * @min 0
 * @desc 這將是用於在金幣視窗中代表金幣的圖示，如果保留為 0 ，
 * 則不會顯示任何圖標。
 * @default 313
 *
 * @param Gold Overlap
 * @parent ---Gold---
 * @desc 這將是當金幣數量超過分配區域的內容大小時顯示的內容。
 * 
 * @default A lotta
 *
 * @param ---Items---
 * @desc
 *
 * @param Default Max
 * @parent ---Items---
 * @type number
 * @min 1
 * @desc 這是玩家可以持有的最大物品數量。
 * 預設：99
 * @default 99
 *
 * @param Quantity Text Size
 * @parent ---Items---
 * @type number
 * @min 1
 * @desc 這是用於物品數量的文本字體大小。
 * 預設：28
 * @default 20
 *
 * @param ---Parameters---
 * @default
 *
 * @param Max Level
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 調整角色的最大級別限制。
 * 預設：99
 * @default 99
 *
 * @param Actor MaxHP
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 調整角色的最大 HP 限制。
 * 預設：9999
 * @default 9999
 *
 * @param Actor MaxMP
 * @parent ---Parameters---
 * @type number
 * @min 0
 * @desc 調整角色的最大 MP 限制。
 * 預設：9999
 * @default 9999
 *
 * @param Actor Parameter
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 調整角色的最大能力限制。
 * 預設：999
 * @default 999
 *
 * @param Enemy MaxHP
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 調整敵人的最大 HP 限制。
 * 預設：999999
 * @default 999999
 *
 * @param Enemy MaxMP
 * @parent ---Parameters---
 * @type number
 * @min 0
 * @desc 調整敵人的最大 MP 限制。
 * 預設：9999
 * @default 9999
 *
 * @param Enemy Parameter
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 調整敵人的最大能力限制。
 * 預設：999
 * @default 999
 *
 * @param ---Battle---
 * @desc
 *
 * @param Animation Rate
 * @parent ---Battle---
 * @type number
 * @min 1
 * @desc 調整戰鬥動畫的速率。 降低速度更快。
 * 預設：4
 * @default 4
 *
 * @param Flash Target
 * @parent ---Battle---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 如果目標是敵人，它會閃爍或變白。
 * 否 - false     是 - true
 * @default false
 *
 * @param Show Events Transition
 * @parent ---Battle---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在戰鬥過程中顯示事件？
 * 顯示 - true     隱藏 - false     預設：false
 * @default true
 *
 * @param Show Events Snapshot
 * @parent ---Battle---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 顯示戰鬥背景快照的事件？
 * 顯示 - true     隱藏 - false     預設：false
 * @default true
 *
 * @param ---Map Optimization---
 * @desc
 *
 * @param Refresh Update HP
 * @parent ---Map Optimization---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在地圖上更新 HP 時是否刷新全體角色？
 * 是 - true     否 - false     預設：true
 * @default true
 *
 * @param Refresh Update MP
 * @parent ---Map Optimization---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在地圖上更新 MP 時是否刷新全體角色？
 * 是 - true     否 - false     預設：true
 * @default true
 *
 * @param Refresh Update TP
 * @parent ---Map Optimization---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在地圖上更新 TP 時是否刷新全體角色？
 * 是 - true     否 - false     預設：true
 * @default false
 *
 * @param ---Font---
 * @desc
 *
 * @param Chinese Font
 * @parent ---Font---
 * @desc 中文 RPG 使用的預設字體。
 * 預設：SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @parent ---Font---
 * @desc 用於韓國 RPG 的預設字體。
 * 預設：Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Default Font
 * @parent ---Font---
 * @desc 用於其他所有內容的預設字體。
 * 預設：GameFont
 * @default GameFont, Verdana, Arial, Courier New
 *
 * @param Font Size
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc 用於視窗的預設字體大小。
 * 預設：28
 * @default 28
 *
 * @param Text Align
 * @parent ---Font---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 如何對齊命令視窗的文本。
 * 左：left     中：center     右：right
 * @default left
 *
 * @param ---Windows---
 * @default
 *
 * @param Digit Grouping
 * @parent ---Windows---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 用逗號將數字組合在一起。
 * false - OFF     true - ON
 * @default true
 *
 * @param Line Height
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整視窗中使用的通用行高。
 * 預設：36
 * @default 36
 *
 * @param Icon Width
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整圖示的寬度。
 * 預設：32
 * @default 32
 *
 * @param Icon Height
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整圖示的高度。
 * 預設：32
 * @default 32
 *
 * @param Face Width
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整角色臉圖的寬度。
 * 預設：144
 * @default 144
 *
 * @param Face Height
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整角色臉圖的高度。
 * 預設：144
 * @default 144
 *
 * @param Window Padding
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整所有標準視窗的填充。
 * 預設：18
 * @default 18
 *
 * @param Text Padding
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整視窗內文本的填充。
 * 預設：6
 * @default 6
 *
 * @param Window Opacity
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 調整視窗背景的不透明度。
 * 預設：192
 * @default 192
 *
 * @param Gauge Outline
 * @parent ---Windows---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 啟用計量條的外形。
 * false - OFF     true - ON
 * @default true
 *
 * @param Gauge Height
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 設置計量條的高度。
 * 預設：6
 * @default 18
 *
 * @param Menu TP Bar
 * @parent ---Windows---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在角色的選單狀態中繪製一個 TP 計量條。
 * false - OFF     true - ON
 * @default true
 *
 * @param ---Window Colors---
 * @default
 *
 * @param Color: Normal
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（通常）的文本顏色。
 * 預設：0
 * @default 0
 *
 * @param Color: System
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（系統）的文本顏色。
 * 預設：16
 * @default 16
 *
 * @param Color: Crisis
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（危機）的文本顏色。
 * 預設：17
 * @default 17
 *
 * @param Color: Death
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（死亡）的文本顏色。
 * 預設：18
 * @default 18
 *
 * @param Color: Gauge Back
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（計量條背景）的文本顏色。
 * 預設：19
 * @default 19
 *
 * @param Color: HP Gauge 1
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（HP 計量條 1）的文本顏色。
 * 預設：20
 * @default 20
 *
 * @param Color: HP Gauge 2
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（HP 計量條 2）的文本顏色。
 * 預設：21
 * @default 21
 *
 * @param Color: MP Gauge 1
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（MP 計量條 1）的文本顏色。
 * 預設：22
 * @default 22
 *
 * @param Color: MP Gauge 2
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（MP 計量條 2）的文本顏色。
 * 預設：23
 * @default 23
 *
 * @param Color: MP Cost
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（MP 消耗）的文本顏色。
 * 預設：23
 * @default 23
 *
 * @param Color: Power Up
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（能力上升）的文本顏色。
 * 預設：24
 * @default 24
 *
 * @param Color: Power Down
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（能力下降）的文本顏色。
 * 預設：25
 * @default 25
 *
 * @param Color: TP Gauge 1
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（TP 計量條 1）的文本顏色。
 * 預設：28
 * @default 28
 *
 * @param Color: TP Gauge 2
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（TP 計量條 2）的文本顏色。
 * 預設：29
 * @default 29
 *
 * @param Color: TP Cost Color
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改視窗（TP 消耗）的文本顏色。
 * 預設：29
 * @default 29
 *
 * @help
 * ============================================================================
 * 介紹和說明                正體中文化 by xyzjw
 * ============================================================================
 *
 * Yanfly 引擎插件 - 核心引擎是為 RPG Maker MV 製作的。其主要用於修復錯誤並允
 * 許使用者更好地控制 RPG Maker MV 的各種功能，例如畫面解析度、字體、視窗顏色
 * 等。只需將它放在所有其它 Yanfly 引擎插件之上。調整您認為合適的任何參數。
 *
 * ============================================================================
 * Bug 修復
 * ============================================================================
 *
 * 這個插件修復了在 RPG Maker MV 中發現的一些錯誤。
 * 其中包括：
 *
 * 動畫疊加
 *   當一個技能/物品使用全畫面動畫同時瞄準多個敵人時，它會多次疊加，導致圖像
 *   看起來像是被一系列疊加的效果扭曲。 該插件通過在群組中僅播放一個動畫而不
 *   是每個動畫來解決此問題。
 *
 * 音樂音量堆疊
 *   有時候當多個聲音效果在同一幀中以精確設置播放時（通常是由於動畫），音量會
 *   相互疊加，導致它們無法播放效果的預期音量。該插件通過防止在同一幀中播放相
 *   同設置的聲音效果來解決此問題，只允許第一個通過而不將音量堆疊得更高。
 *
 * 事件移動速度
 *   由於源代碼中的一個小錯誤，事件的移動速度略慢於它們應有的速度。 
 *   該插件解決了這個問題，它們以適當的速度移動。
 *
 * 事件移動隊列
 *   如果事件要通過事件命令移動，則更改將事件設置為更改到不同頁面的條件將導致
 *   該事件的移動路徑在其軌道上停止。
 *   該插件修復了這個問題，事件的移動路線將完成。
 *
 * 事件碰撞
 *   事件不能移動到具有低於玩家設置的其他事件之上。這使得某些類型的謎題或事件
 *   難以存在。此插件通過使碰撞檢查僅適用於“與角色相同”優先級的事件來解決此
 *   問題。任何高於或低於角色的事件將不再與其他事件發生衝突。
 *
 * 畫面撕裂
 *   緩慢移動時，畫面上的圖塊會撕裂。 雖然它在所有系統上都不是很明顯，但速度
 *   較慢的電腦肯定會顯示出來。該插件將解決此問題並同步圖塊以正確跟上畫面的相
 *   機移動。
 *
 * 精靈失真
 *   由於 JavaScript 奇怪的數學行為，有時帶有小數位的值會導致 spritesheets 最
 *   終看起來扭曲。該插件將去掉小數位，並通過僅使用整數值讓精靈表正確取出幀。
 *
 * ============================================================================
 * Gold - 金幣
 * ============================================================================
 *
 * 您可以使用插件命令添加或刪除超過編輯器 9,999,999 限制的金幣。
 * 還可以將標籤（Notetags）放入物品、武器和盔甲中，以超過 999,999 的價格限制。
 *
 * 插件指令：
 *   GainGold 1234567890       # 隊伍獲得 1234567890 金幣。
 *   LoseGold 9876543210       # 隊伍失去 9876543210 金幣。
 *
 * 物品、武器、盔甲 標籤（Notetags）：
 *   <Price: x>
 *   將物品的價格更改為 x。 這個標籤可以讓你繞過編輯器的 999,999 售價限制。
 *
 * 敵人標籤
 *   <Gold: x>
 *   將敵人的金幣掉落值更改為 x。 這個標籤可以讓你繞過編輯器的 9,999,999 金幣
 *   掉落限制。
 *
 * ============================================================================
 * Items - 物品
 * ============================================================================
 *
 * 更改參數以反應玩家每個物品可以持有的最大物品數量。如果您希望使單一物品具有
 * 不同的最大值，請使用以下註釋標籤：
 *
 * 物品、武器、盔甲 標籤（Notetag）：
 *   <Max Item: x>
 *   這會將物品的最大數量更改為 x。
 *
 * ============================================================================
 * Stats - 能力狀態
 * ============================================================================
 *
 * 即使提高了參數限制，編輯器仍然受限於 RPG Maker MV 的預設限制。
 * 要突破它們，請使用以下註釋標籤來進一步控制參數的各個方面。
 *
 * 角色標籤 （Notetag）
 *   <Initial Level: x>
 *   將角色的初始等級更改為 x。 這允許您繞過編輯器的 99 級限制。
 *
 *   <Max Level: x>
 *   將角色的最大等級更改為 x。 這允許您繞過編輯器的 99 級限制。
 *
 * 職業技能學習標籤 （Notetag）
 *   <Learn at Level: x>
 *   當放置在職業的“要學習的技能”標籤中時，這將導致在第 x 級學習職業技能。
 *
 * 武器和盔甲標籤 （Notetags）
 *   <stat: +x>
 *   <stat: -x>
 *   允許一件武器或盔甲獲得或失去 x 數值的屬性。
 *   將“stat”替換為“hp”、“mp”、“atk”、“def”、“mat”、“mdf”、
 *   “agi”或“luk”來改變那個特定的數值。
 *   這允許該裝備只要最大值允許，就可以超越編輯器的預設限制。
 *
 * 敵人標籤 （Notetags）
 *   <stat: x>
 *   這會將敵人的統計數據更改為 x 數值。
 *   將“stat”替換為“hp”，“mp”、“atk”、“def”、“mat”、“mdf”、
 *   “agi”或“luk”來改變它具體統計 這允許設備通過編輯器的默認限制。
 *
 *   <exp: x>
 *   這會將敵人的經驗值更改為 x 值。
 *   這允許敵人給出的 exp 比編輯器預設的 9,999,999 限制更多。
 *
 * ============================================================================
 * 腳本調用失敗安全
 * ============================================================================
 *
 * 損壞公式、腳本調用、條件分支和變量事件中的不規則代碼將不再導致遊戲崩潰。
 * 相反，他們將強制打開控制台窗口以僅在測試播放期間顯示錯誤。如果玩家不在試玩
 * 中，遊戲將照常繼續，而不會顯示錯誤。如果遊戲是在瀏覽器中玩的，打開控制台視
 * 窗仍然會顯示錯誤。
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * 版本 1.32:
 * - 從版本 1.24 中取消了畫面抖動修復的禁用。 不知何故它回來了，我不知道什麼
 *   時候，但現在它需要去除。
 *
 * 版本 1.31:
 * - 向核心引擎添加了墮落天使奧利維亞的完整錯誤消息顯示。
 *  （當然在她的允許下）。
 * - 修復了關於混合模式和灌木深度的錯誤，使精靈在遊戲中無法正確混合。
 * - Tab 鍵不再需要您在觸發 Tab 鍵相關輸入之前按兩次。
 *
 * 版本 1.30:
 * - 修復了音樂音效堆疊的錯誤。
 * - 優化更新。
 *
 * 版本 1.29:
 * - 由於更新到 MV 1.6.1，將錯誤代碼插入腳本調用或自定義瘋人模式代碼段時，
 *   繞過 isDevToolsOpen() 錯誤。
 *
 * 版本 1.28:
 * - 按 F5 重新加載遊戲後，如果在重新加載之前打開 DevTools 調試控制台，這將關
 *   閉它。這是因為在關閉的情況下重新加載最終會更快地重新加載遊戲。
 *   - 添加了新的插件參數：刷新更新 HP、MP 和 TP。
 *   - 選擇在改變 HP、MP 或 TP 時進行完整角色刷新的選項。
 *   - 這是為了減少整體地圖讀取緩慢。
 *
 * 版本 1.27:
 * - RPG Maker MV 1.6.0 版更新：
 *   - 修復使用開關和自開關進行的腳本調用檢查
 *     由於 ES6 處理 === 的方式不同而產生的條件分支。
 *
 * 版本 1.26:
 * - RPG Maker MV 1.6.0 版更新：
 *   - 刪除 Scene_Item.update 函數中的破壞性代碼。
 *   - 打開控制台參數現在在地圖加載或戰鬥開始後發生。這是因為在 1.6.0 更改之
 *     後，先加載控制台會導致 RPG Maker 的其他方面無法正常加載。
 *
 * 版本 1.25:
 * - 為 RPG Maker MV 版本 1.5.0 更新。
 * - 更新了 Scale Title 和 Scale GameOver 以適用於 1.5.0。
 *
 * 版本 1.24:
 * - RPG Maker MV 1.3.4 及更高版本現在可以防止它的畫面抖動預防，因為 Pixi4 
 *   現在可以處理。
 *
 * 版本 1.23:
 * - 對於 RPG Maker MV 1.3.2 及更高版本，'Scale Battlebacks' 插件參數現在將
 *   以不同的格式重新創建戰鬥精靈。這是因為使用平鋪精靈進行戰鬥縮放太不穩定
 *   了。戰鬥背景精靈現在只是普通精靈而不是平鋪精靈。這可能會也可能不會導致
 *   插件與其他改變戰鬥的插件不兼容。
 * - 對於 RPG Maker MV 版本 1.3.4，Game_Actor.meetsUsableItemConditions 現已
 *   更新以返回對原始 Game_BattlerBase 版本的檢查，以保持與其他插件的兼容性。
  *
 * 版本 1.22:
 * - 添加了“顯示事件轉換”插件參數。啟用此功能將使地圖上的事件在進入戰鬥的
 *   過程中不再隱藏自己。
 * - 添加了“顯示事件快照”插件參數。啟用此功能將在進入戰鬥時將事件顯示為戰
 *   鬥快照的一部分。
 * - 損壞公式、腳本調用、條件分支和變量事件中的不規則代碼將不再導致遊戲崩潰。
 *   相反，它會強制打開控制台窗口以僅在測試播放期間顯示錯誤。
 *
 * 版本 1.21:
 * - 修復了縮放戰鬥對於前視戰鬥圖無法正常工作的錯誤。
 * - 優化更新以保持所有場景的垃圾集中。
 *
 * 版本 1.20:
 * - 改變了增加解析度的功能。
 * - 添加了“更新真實比例”插件參數。現在最好暫時不使用它，如果以後更新具有
 *   渲染縮放的網格時再使用。
 * - 為 1.3.2 以下版本添加內存清除功能，以在離開地圖場景時釋放更多記憶體。
 * - 添加了“收集清除”插件參數。如果此選項保持打開狀態，則在切換到不同場景
 *   時將清除附加到 Scene_Map 和 Scene_Battle 的子項。
 *   這可能會從其他插件（取決於它們的添加方式）添加到這些場景的各種對像中釋
 *   放記憶體，並作為減少記憶體膨脹的一種手段。
 *
 * 版本 1.19:
 * - 為 RPG Maker MV 版本 1.3.2 更新。
 * - 修復了一件裝備暫時添加了一項技能，則角色的“學習技能”功能不會被繞過。
 *
 * 版本 1.18:
 * - 修復了縮放戰鬥對前視戰鬥圖無法正常工作的錯誤。
 *
 * 版本 1.17:
 * - 為 RPG Maker MV 版本 1.3.0 更新。
 *
 * 版本 1.16:
 * - 修復了 RPG Maker MV 固有的“drawTextEx”功能的錯誤。預設情況下，它會計
 *   算文本高度，然後在繪製文本之前重置字體設置，如果要匹配計算的高度設置，
 *   則會導致文本高度不一致。
 *
 * 版本 1.15:
 * - 視窗現在設置為只有整數的寬度和高度。它們不再可能具有十進制值。 這是為
 *   了減少由非整數引起的任何和所有裁剪問題。
 *
 * 版本 1.14:
 * - RPG Maker MV 本身的優化更新，將常用函數中的記憶體密集型迴圈替換為更高
 *   效的迴圈。
 *
 * 版本 1.13:
 * - 為 RPG Maker MV 版本 1.1.0 更新。
 *
 * 版本 1.12:
 * - 修正了一個帶有註釋標籤的錯誤：<Learn at Level: x>。
 *   現在，notetag 適用於 <Learn at Level: x> 和 <Learn Level: x>
 *
 * 版本 1.11:
 * - 修復了 MV 源代碼，其中 FaceWidth 使用硬編碼的 144 值，而不管 
 *   Face Width 參數發生了什麼變化。
 * - 修正了一個不能與敵人 EXP 值一起使用的標籤。
 * - 更新了戰鬥人員重新定位以在使用 Row Formation 進出場景時不再發生衝突。
 *
 * 版本 1.10:
 * - 刪除了通過 MV 的新資訊更新應用的 MV 錯誤修復。
 *
 * 版本 1.09:
 * - 更改了狀態圖的最小顯示寬度以適應預設的隊伍編組設置。
 *
 * 版本 1.08:
 * - 修復了 MV 源代碼中更改類和維護級別的錯誤，即使維護級別的功能已被刪除。
 *
 * 版本 1.07:
 * - 修復了計量表繪製輪廓比正常情況下更粗的問題。* 視窗不規則縮放時的間隔。
 *
 * 版本 1.06:
 * - 刪除了事件頻率錯誤修復，因為它現在包含在源頭之中。
 *
 * 版本 1.05:
 * - 在插件設置中添加了“Scale Game Over”參數。
 *
 * 版本 1.04:
 * - 重新設計了計算比例戰鬥位置的數學方法。
 * - 修復了如果隊伍未能從戰鬥中逃脫，會被戰鬥移除的狀態仍然會被移除的錯誤。
 *   *由 Emjenoeg 修復*
 *
 * 版本 1.03:
 * - 修復了一個奇怪的錯誤，該錯誤會在一場戰鬥後導致縮放的戰鬥背景發生變化。
 *
 * 版本 1.02:
 * - 修復了導致移動設備上的畫面淡入淡出無法正常工作的錯誤。
 * - 添加了“Scale Battlebacks”和“Scale Title”參數。
 *
 * 版本 1.01:
 * - 修復了如果按鍵精靈具有不同的錨點，它們將無法正確點擊的錯誤。
 *   *由 Zalerinian 修正*
 *
 * 版本 1.00:
 * - 插件完成！
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CoreEngine');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.ScreenWidth  = Number(Yanfly.Parameters['Screen Width'] || 816);
Yanfly.Param.ScreenHeight = Number(Yanfly.Parameters['Screen Height'] || 624);
Yanfly.Param.ScaleBattleback = String(Yanfly.Parameters['Scale Battlebacks']);
Yanfly.Param.ScaleBattleback = eval(Yanfly.Param.ScaleBattleback);
Yanfly.Param.ScaleTitle = eval(String(Yanfly.Parameters['Scale Title']));
Yanfly.Param.ScaleGameOver = eval(String(Yanfly.Parameters['Scale Game Over']));
Yanfly.Param.OpenConsole = String(Yanfly.Parameters['Open Console']);
Yanfly.Param.OpenConsole = eval(Yanfly.Param.OpenConsole);
Yanfly.Param.ReposBattlers = String(Yanfly.Parameters['Reposition Battlers']);
Yanfly.Param.ReposBattlers = eval(Yanfly.Param.ReposBattlers);
Yanfly.Param.GameFontTimer = Number(Yanfly.Parameters['GameFont Load Timer']);
Yanfly.Param.UpdateRealScale = String(Yanfly.Parameters['Update Real Scale']);
Yanfly.Param.UpdateRealScale = eval(Yanfly.Param.UpdateRealScale);
Yanfly.Param.CollectionClear = String(Yanfly.Parameters['Collection Clear']);
Yanfly.Param.CollectionClear = eval(Yanfly.Param.CollectionClear);

Yanfly.Param.MaxGold = String(Yanfly.Parameters['Gold Max']);
Yanfly.Param.GoldFontSize = Number(Yanfly.Parameters['Gold Font Size']);
Yanfly.Icon.Gold = Number(Yanfly.Parameters['Gold Icon']);
Yanfly.Param.GoldOverlap = String(Yanfly.Parameters['Gold Overlap']);

Yanfly.Param.MaxItem = Number(Yanfly.Parameters['Default Max']);
Yanfly.Param.ItemQuantitySize = Number(Yanfly.Parameters['Quantity Text Size']);

Yanfly.Param.MaxLevel = Number(Yanfly.Parameters['Max Level']);
Yanfly.Param.EnemyMaxHp = Number(Yanfly.Parameters['Enemy MaxHP']);
Yanfly.Param.EnemyMaxMp = Number(Yanfly.Parameters['Enemy MaxMP']);
Yanfly.Param.EnemyParam = Number(Yanfly.Parameters['Enemy Parameter']);
Yanfly.Param.ActorMaxHp = Number(Yanfly.Parameters['Actor MaxHP']);
Yanfly.Param.ActorMaxMp = Number(Yanfly.Parameters['Actor MaxMP']);
Yanfly.Param.ActorParam = Number(Yanfly.Parameters['Actor Parameter']);

Yanfly.Param.AnimationRate = Number(Yanfly.Parameters['Animation Rate']);
Yanfly.Param.FlashTarget = eval(String(Yanfly.Parameters['Flash Target']));
Yanfly.Param.ShowEvTrans = String(Yanfly.Parameters['Show Events Transition']);
Yanfly.Param.ShowEvTrans = eval(Yanfly.Param.ShowEvTrans);
Yanfly.Param.ShowEvSnap = String(Yanfly.Parameters['Show Events Snapshot']);
Yanfly.Param.ShowEvSnap = eval(Yanfly.Param.ShowEvSnap);

Yanfly.Param.RefreshUpdateHp = String(Yanfly.Parameters['Refresh Update HP']);
Yanfly.Param.RefreshUpdateHp = eval(Yanfly.Param.RefreshUpdateHp);
Yanfly.Param.RefreshUpdateMp = String(Yanfly.Parameters['Refresh Update MP']);
Yanfly.Param.RefreshUpdateMp = eval(Yanfly.Param.RefreshUpdateMp);
Yanfly.Param.RefreshUpdateTp = String(Yanfly.Parameters['Refresh Update TP']);
Yanfly.Param.RefreshUpdateTp = eval(Yanfly.Param.RefreshUpdateTp);

Yanfly.Param.ChineseFont = String(Yanfly.Parameters['Chinese Font']);
Yanfly.Param.KoreanFont = String(Yanfly.Parameters['Korean Font']);
Yanfly.Param.DefaultFont = String(Yanfly.Parameters['Default Font']);
Yanfly.Param.FontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.TextAlign = String(Yanfly.Parameters['Text Align']);

Yanfly.Param.DigitGroup = eval(String(Yanfly.Parameters['Digit Grouping']));
Yanfly.Param.LineHeight = Number(Yanfly.Parameters['Line Height']);
Yanfly.Param.IconWidth = Number(Yanfly.Parameters['Icon Width'] || 32);;
Yanfly.Param.IconHeight = Number(Yanfly.Parameters['Icon Height'] || 32);;
Yanfly.Param.FaceWidth = Number(Yanfly.Parameters['Face Width'] || 144);
Yanfly.Param.FaceHeight = Number(Yanfly.Parameters['Face Height'] || 144);
Yanfly.Param.WindowPadding = Number(Yanfly.Parameters['Window Padding']);
Yanfly.Param.TextPadding = Number(Yanfly.Parameters['Text Padding']);
Yanfly.Param.WindowOpacity = Number(Yanfly.Parameters['Window Opacity']);
Yanfly.Param.GaugeOutline = eval(String(Yanfly.Parameters['Gauge Outline']));
Yanfly.Param.GaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.MenuTpGauge = eval(String(Yanfly.Parameters['Menu TP Bar']));

Yanfly.Param.ColorNormal = Number(Yanfly.Parameters['Color: Normal']);
Yanfly.Param.ColorSystem = Number(Yanfly.Parameters['Color: System']);
Yanfly.Param.ColorCrisis = Number(Yanfly.Parameters['Color: Crisis']);
Yanfly.Param.ColorDeath = Number(Yanfly.Parameters['Color: Death']);
Yanfly.Param.ColorGaugeBack = Number(Yanfly.Parameters['Color: Gauge Back']);
Yanfly.Param.ColorHpGauge1 = Number(Yanfly.Parameters['Color: HP Gauge 1']);
Yanfly.Param.ColorHpGauge2 = Number(Yanfly.Parameters['Color: HP Gauge 2']);
Yanfly.Param.ColorMpGauge1 = Number(Yanfly.Parameters['Color: MP Gauge 1']);
Yanfly.Param.ColorMpGauge2 = Number(Yanfly.Parameters['Color: MP Gauge 2']);
Yanfly.Param.ColorMpCost = Number(Yanfly.Parameters['Color: MP Cost']);
Yanfly.Param.ColorPowerUp = Number(Yanfly.Parameters['Color: Power Up']);
Yanfly.Param.ColorPowerDown = Number(Yanfly.Parameters['Color: Power Down']);
Yanfly.Param.ColorTpGauge1 = Number(Yanfly.Parameters['Color: TP Gauge 1']);
Yanfly.Param.ColorTpGauge2 = Number(Yanfly.Parameters['Color: TP Gauge 2']);
Yanfly.Param.ColorTpCost = Number(Yanfly.Parameters['Color: TP Cost Color']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Core.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
  Yanfly.Core.Bitmap_initialize.call(this, width, height);
  this.fontFace = Yanfly.Param.DefaultFont;
};

Yanfly.Core.Bitmap_blt = Bitmap.prototype.blt;
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    sx = Math.floor(sx);
    sy = Math.floor(sy);
    sw = Math.floor(sw);
    sh = Math.floor(sh);
    dx = Math.floor(dx);
    dy = Math.floor(dy);
    dw = Math.floor(dw);
    dh = Math.floor(dh);
    Yanfly.Core.Bitmap_blt.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
};

Yanfly.Core.Bitmap_fillRect = Bitmap.prototype.fillRect;
Bitmap.prototype.fillRect = function(x, y, w, h, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    Yanfly.Core.Bitmap_fillRect.call(this, x, y, w, h, c);
};

Yanfly.Core.Bitmap_gradientFillRect = Bitmap.prototype.gradientFillRect;
Bitmap.prototype.gradientFillRect = function(x, y, w, h, c1, c2, ve) {
    Yanfly.Core.Bitmap_gradientFillRect.call(this, x, y, w, h, c1, c2, ve);
};

Yanfly.Core.Bitmap_drawCircle = Bitmap.prototype.drawCircle;
Bitmap.prototype.drawCircle = function(x, y, r, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    Yanfly.Core.Bitmap_drawCircle.call(this, x, y, r, c);
};

Yanfly.Core.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, mW, l, align) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (mW < 0) mW = 0;
    mW = Math.floor(mW);
    l = Math.floor(l);
    Yanfly.Core.Bitmap_drawText.call(this, text, x, y, mW, l, align);
};

//=============================================================================
// Graphics
//=============================================================================

if (Yanfly.Param.UpdateRealScale) {

Graphics._updateRealScale = function() {
  if (this._stretchEnabled) {
    var h = window.innerWidth / this._width;
    var v = window.innerHeight / this._height;
    this._realScale = Math.min(h, v);
    if (this._realScale >= 3) this._realScale = 3;
    else if (this._realScale >= 2) this._realScale = 2;
    else if (this._realScale >= 1.5) this._realScale = 1.5;
    else if (this._realScale >= 1) this._realScale = 1;
    else this._realScale = 0.5;
  } else {
    this._realScale = this._scale;
  }
};

}; // Yanfly.Param.UpdateRealScale

Graphics.printFullError = function(name, message, stack) {
  stack = this.processErrorStackMessage(stack);
  if (this._errorPrinter) {
    this._errorPrinter.innerHTML =
      this._makeFullErrorHtml(name, message, stack);
  }
  this._applyCanvasFilter();
  this._clearUpperCanvas();
};

Graphics._makeFullErrorHtml = function(name, message, stack) {
  var text = '';
  for (var i = 2; i < stack.length; ++i) {
    text += '<font color=white>' + stack[i] + '</font><br>';
  }
  return ('<font color="yellow"><b>' + stack[0] + '</b></font><br>' +
    '<font color="yellow"><b>' + stack[1] + '</b></font><br>' + text);
};

Graphics.processErrorStackMessage = function(stack)  {
  var data = stack.split(/(?:\r\n|\r|\n)/);
  data.unshift('Game has encountered a bug. Please report it.<br>');
  for (var i = 1; i < data.length; ++i) {
    data[i] = data[i].replace(/[\(](.*[\/])/, '(');
  }
  data.push('<br><font color="yellow"><b>Press F5 to restart the game.' +
    '</b></font><br>');
  return data;
};

Yanfly.Core.Graphics_updateErrorPrinter = Graphics._updateErrorPrinter;
Graphics._updateErrorPrinter = function() {
  Yanfly.Core.Graphics_updateErrorPrinter.call(this);
  this._errorPrinter.height = this._height * 0.5;
  this._errorPrinter.style.textAlign = 'left';
  this._centerElement(this._errorPrinter);
};

SceneManager.catchException = function(e) {
  if (e instanceof Error) {
    Graphics.printFullError(e.name, e.message, e.stack);
    console.error(e.stack);
  } else {
    Graphics.printError('UnknownError', e);
  }
  AudioManager.stopAll();
  this.stop();
};

//=============================================================================
// Input
//=============================================================================

Yanfly.Core.Input_shouldPreventDefault = Input._shouldPreventDefault;
Input._shouldPreventDefault = function(keyCode) {
  if (keyCode === 9) return true;
  return Yanfly.Core.Input_shouldPreventDefault.call(this, keyCode);
};

//=============================================================================
// Sprite
//=============================================================================

Yanfly.Core.Sprite_updateTransform = Sprite.prototype.updateTransform;
Sprite.prototype.updateTransform = function() {
  Yanfly.Core.Sprite_updateTransform.call(this);
  this.worldTransform.tx = Math.floor(this.worldTransform.tx);
  this.worldTransform.ty = Math.floor(this.worldTransform.ty);
};

//=============================================================================
// ScreenSprite
//=============================================================================

Yanfly.Core.ScreenSprite_initialize = ScreenSprite.prototype.initialize;
ScreenSprite.prototype.initialize = function() {
  Yanfly.Core.ScreenSprite_initialize.call(this);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.0') return;
  this.scale.x = Graphics.boxWidth * 10;
  this.scale.y = Graphics.boxHeight * 10;
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.x = 0;
  this.y = 0;
};

//=============================================================================
// Window
//=============================================================================

Yanfly.Core.Window_refreshAllParts = Window.prototype._refreshAllParts;
Window.prototype._refreshAllParts = function() {
  this._roundWhUp();
  Yanfly.Core.Window_refreshAllParts.call(this);
};

Window.prototype._roundWhUp = function() {
  this._width = Math.ceil(this._width);
  this._height = Math.ceil(this._height);
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Core.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Core.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_CoreEngine) {
    this.processCORENotetags1($dataItems);
    this.processCORENotetags1($dataWeapons);
    this.processCORENotetags1($dataArmors);
    this.processCORENotetags2($dataEnemies);
    this.processCORENotetags3($dataActors);
    this.processCORENotetags4($dataClasses);
    Yanfly._loaded_YEP_CoreEngine = true;
  }
  return true;
};

DataManager.processCORENotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxItem = Yanfly.Param.MaxItem;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PRICE):[ ](\d+)>/i)) {
        obj.price = parseInt(RegExp.$1);
      } else if (line.match(/<(?:MAX ITEM):[ ](\d+)>/i)) {
        obj.maxItem = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<(.*):[ ]([\+\-]\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT' || 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:GOLD):[ ](\d+)>/i)) {
        obj.gold = parseInt(RegExp.$1);
      } else if (line.match(/<(.*):[ ](\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT':
          case 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxLevel = Yanfly.Param.MaxLevel;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:MAX LEVEL):[ ](\d+)>/i)) {
        obj.maxLevel = parseInt(RegExp.$1);
        if (obj.maxLevel < 1) obj.maxLevel = 1;
      } else if (line.match(/<(?:INITIAL LEVEL):[ ](\d+)>/i)) {
        obj.initialLevel = parseInt(RegExp.$1);
        if (obj.initialLevel < 1) obj.initialLevel = 1;
      }
    }
  }
};

DataManager.processCORENotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnings.forEach(function(learning) {
      if (learning.note.match(/<(?:LEARN LEVEL|LEARN AT LEVEL):[ ](\d+)>/i)) {
        learning.level = parseInt(RegExp.$1);
        if (learning.level < 1) obj.maxLevel = 1;
      }
    }, this);
  }
};

//=============================================================================
// AudioManager Stacking Volume Bug Fix
//=============================================================================

Yanfly.Core.AudioManager_playSe = AudioManager.playSe;
AudioManager.playSe = function(se) {
    this._frameSe = this._frameSe || [];
    if (this.uniqueCheckSe(se)) {
      Yanfly.Core.AudioManager_playSe.call(this, se);
      this._frameSe.push(se);
    }
};

AudioManager.uniqueCheckSe = function(se1) {
    if (this._frameSe.contains(se1)) return false;
    return true;
};

AudioManager.clearUniqueCheckSe = function() {
    this._frameSe = [];
};

Yanfly.Core.SceneManager_updateInputData = SceneManager.updateInputData;
SceneManager.updateInputData = function() {
    Yanfly.Core.SceneManager_updateInputData.call(this);
    AudioManager.clearUniqueCheckSe();
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager._screenWidth  = Yanfly.Param.ScreenWidth;
SceneManager._screenHeight = Yanfly.Param.ScreenHeight;
SceneManager._boxWidth     = Yanfly.Param.ScreenWidth;
SceneManager._boxHeight    = Yanfly.Param.ScreenHeight

Yanfly.Core.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
  Yanfly.Core.SceneManager_run.call(this, sceneClass);
  Yanfly.updateResolution();
  if (!Utils.isNwjs()) return;
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Yanfly.Param.OpenConsole) Yanfly.openConsole();
};

Yanfly.updateResolution = function() {
  var resizeWidth = Yanfly.Param.ScreenWidth - window.innerWidth;
  var resizeHeight = Yanfly.Param.ScreenHeight - window.innerHeight;
  if (!Imported.ScreenResolution) {
    window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
    window.resizeBy(resizeWidth, resizeHeight);
  }
};

Yanfly.openConsole = function() {
  Yanfly._openedConsole = true;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    var _debugWindow = require('nw.gui').Window.get().showDevTools();
    if (_debugWindow) _debugWindow.moveTo(0, 0);
    window.focus();
  }
};

Yanfly.Core.SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function(event) {
  if (!event.ctrlKey && !event.altKey && event.keyCode === 116) {
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      var win = require('nw.gui').Window.get();
      win.closeDevTools();
    }
  }
  Yanfly.Core.SceneManager_onKeyDown.call(this, event);
};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") {

Yanfly.openConsole = function() {
  Yanfly._openedConsole = true;
  if (!Yanfly.Param.OpenConsole) return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    var win = require('nw.gui').Window.get();
    win.showDevTools();
    setTimeout(this.focusWindow.bind(this, win), 500);
  }
};

Yanfly.focusWindow = function(win) {
  win.focus();
};

Yanfly.Core.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  Yanfly.Core.Scene_Map_update.call(this);
  if (!Yanfly._openedConsole) Yanfly.openConsole();
};

Yanfly.Core.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  Yanfly.Core.Scene_Battle_update.call(this);
  if (!Yanfly._openedConsole) Yanfly.openConsole();
};

}; // 1.6.0

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Core.BattleManager_displayStartMessages =
    BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  Yanfly.Core.BattleManager_displayStartMessages.call(this);
  $gameTroop.members().forEach(function(enemy) {
      enemy.recoverAll();
  });
};

BattleManager.processEscape = function() {
  $gameParty.performEscape();
  SoundManager.playEscape();
  var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
  if (success) {
      $gameParty.removeBattleStates();
      this.displayEscapeSuccessMessage();
      this._escaped = true;
      this.processAbort();
  } else {
      this.displayEscapeFailureMessage();
      this._escapeRatio += 0.1;
      $gameParty.clearActions();
      this.startTurn();
  }
  return success;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
        return Yanfly.Param.EnemyMaxHp;
    } else if (paramId === 1) {
        return Yanfly.Param.EnemyMaxMp;
    } else {
        return Yanfly.Param.EnemyParam;
    }
};

Yanfly.Core.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;

Game_BattlerBase.prototype.mapRegenUpdateCheck = function(type) {
  if ($gameParty.inBattle()) return true;
  if (type === 'hp') {
    return Yanfly.Param.RefreshUpdateHp;
  } else if (type === 'mp') {
    return Yanfly.Param.RefreshUpdateMp;
  } else if (type === 'tp') {
    return Yanfly.Param.RefreshUpdateTp;
  }
};

Game_BattlerBase.prototype.setHp = function(hp) {
  if (this._hp === hp) return;
  this._hp = hp;
  if (this.mapRegenUpdateCheck('hp')) {
    this.refresh();
  } else {
    Yanfly.Core.Game_BattlerBase_refresh.call(this);
  }
};

Game_BattlerBase.prototype.setMp = function(mp) {
  if (this._mp === mp) return;
  this._mp = mp;
  if (this.mapRegenUpdateCheck('mp')) {
    this.refresh();
  } else {
    Yanfly.Core.Game_BattlerBase_refresh.call(this);
  }
};

Game_BattlerBase.prototype.setTp = function(tp) {
  if (this._tp === tp) return;
  this._tp = tp;
  if (this.mapRegenUpdateCheck('tp')) {
    this.refresh();
  } else {
    Yanfly.Core.Game_BattlerBase_refresh.call(this);
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.onTurnEnd = function() {
  this.clearResult();
  this.regenerateAll();
  this.updateStateTurns();
  this.updateBuffTurns();
  this.removeStatesAuto(2);
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Core.Game_Actor_isMaxLevel = Game_Actor.prototype.isMaxLevel;
Game_Actor.prototype.isMaxLevel = function() {
    if (this.maxLevel() === 0) return false;
    return Yanfly.Core.Game_Actor_isMaxLevel.call(this);
};

Game_Actor.prototype.paramMax = function(paramId) {
  if (paramId === 0) {
      return Yanfly.Param.ActorMaxHp;
  } else if (paramId === 1) {
      return Yanfly.Param.ActorMaxMp;
  } else {
      return Yanfly.Param.ActorParam;
  }
};

Yanfly.Core.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if (this.level > 99) {
      var i = this.currentClass().params[paramId][99];
      var j = this.currentClass().params[paramId][98];
      i += (i - j) * (this.level - 99);
      return i;
    }
    return Yanfly.Core.Game_Actor_paramBase.call(this, paramId);
};

Game_Actor.prototype.changeClass = function(classId, keepExp) {
    if (keepExp) {
        this._exp[classId] = this._exp[this._classId];
    }
    this._classId = classId;
    this.changeExp(this._exp[this._classId] || 0, false);
    this.refresh();
};

Game_Actor.prototype.learnSkill = function(skillId) {
    if (!this._skills.contains(skillId)) {
        this._skills.push(skillId);
        this._skills.sort(function(a, b) {
            return a - b;
        });
    }
};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.4') {

Game_Actor.prototype.meetsUsableItemConditions = function(item) {
  if($gameParty.inBattle() && !BattleManager.canEscape() &&
  this.testEscape(item)){
    return false;
  }
  return Game_BattlerBase.prototype.meetsUsableItemConditions.call(this, item);
};

}; // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.4'

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.maxGold = function() {
    return eval(Yanfly.Param.MaxGold);
};

Game_Party.prototype.maxItems = function(item) {
    if (!item) return 1;
    return item.maxItem;
};

Game_Party.prototype.onPlayerWalk = function() {
    var group = this.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var actor = group[i];
      if (actor) actor.onPlayerWalk();
    }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.isPreventScreenJittering = function() {
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') return true;
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.4') return false;
  return true;
};

if (Yanfly.isPreventScreenJittering()) {

Game_Map.prototype.displayX = function() {
    return parseFloat(Math.floor(this._displayX *
      this.tileWidth())) / this.tileWidth();
};

Game_Map.prototype.displayY = function() {
    return parseFloat(Math.floor(this._displayY *
      this.tileHeight())) / this.tileHeight();
};

}; // Yanfly.isPreventScreenJittering

Game_Map.prototype.adjustX = function(x) {
    if (this.isLoopHorizontal() && x < this.displayX() -
            (this.width() - this.screenTileX()) / 2) {
        return x - this.displayX() + $dataMap.width;
    } else {
        return x - this.displayX();
    }
};

Game_Map.prototype.adjustY = function(y) {
    if (this.isLoopVertical() && y < this.displayY() -
            (this.height() - this.screenTileY()) / 2) {
        return y - this.displayY() + $dataMap.height;
    } else {
        return y - this.displayY();
    }
};

Game_Map.prototype.updateEvents = function() {
    var group = this.events();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var ev = group[i];
      if (ev) ev.update();
    }
    var group = this._commonEvents;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var ev = group[i];
      if (ev) ev.update();
    }
};

Game_Map.prototype.updateVehicles = function() {
    var group = this._vehicles;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var vehicle = group[i];
      if (vehicle) vehicle.update();
    }
};

//=============================================================================
// Game_Character
//=============================================================================

Game_Character.prototype.queueMoveRoute = function(moveRoute) {
    this._originalMoveRoute = moveRoute;
    this._originalMoveRouteIndex = 0;
};

Yanfly.Core.Game_Event_setMoveRoute =
    Game_Event.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function(moveRoute) {
    if (!this._moveRouteForcing) {
        Yanfly.Core.Game_Event_setMoveRoute.call(this, moveRoute);
    } else {
        this.queueMoveRoute(moveRoute);
    }
};

Yanfly.Core.Game_Character_processMoveCommand =
  Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
  var gc = Game_Character;
  var params = command.parameters;
  switch (command.code) {
  case gc.ROUTE_SCRIPT:
    try {
      eval(params[0]);
    } catch (e) {
      Yanfly.Util.displayError(e, params[0], 'MOVE ROUTE SCRIPT ERROR');
    }
    return;
    break;
  }
  return Yanfly.Core.Game_Character_processMoveCommand.call(this, command);
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isCollidedWithEvents = function(x, y) {
  var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
    return ev.isNormalPriority();
  });
  if (events.length <= 0) return false;
  return this.isNormalPriority();
};

//=============================================================================
// Game_Screen
//=============================================================================

Game_Screen.prototype.updatePictures = function() {
    var group = this._pictures;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var picture = group[i];
      if (picture) picture.update();
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Core.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
Game_Action.prototype.testItemEffect = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_LEARN_SKILL:
      return target.isActor() && !target._skills.contains(effect.dataId);
    default:
      return Yanfly.Core.Game_Action_testItemEffect.call(this, target, effect);
    }
};

Game_Action.prototype.evalDamageFormula = function(target) {
  var item = this.item();
  var a = this.subject();
  var b = target;
  var v = $gameVariables._data;
  var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
  try {
    var value = Math.max(eval(item.damage.formula), 0) * sign;
    if (isNaN(value)) value = 0;
    return value;
  } catch (e) {
    Yanfly.Util.displayError(e, item.damage.formula, 'DAMAGE FORMULA ERROR');
    return 0;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Conditional Branch
Yanfly.Core.Game_Interpreter_command111 =
  Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  var result = false;
  switch (this._params[0]) {
  case 0: // Switch
    if (this._params[2] === 0) {
      result = $gameSwitches.value(this._params[1]);
    } else {
      result = !$gameSwitches.value(this._params[1]);
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true
    break;
  case 2: // Self Switch
    if (this._eventId > 0) {
      var key = [this._mapId, this._eventId, this._params[1]];
      if (this._params[2] === 0) {
        result = $gameSelfSwitches.value(key);
      } else {
        result = !$gameSelfSwitches.value(key);
      }
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true
    break;
  case 12:  // Script
    var code = this._params[1];
    try {
      result = !!eval(code);
    } catch (e) {
      result = false;
      Yanfly.Util.displayError(e, code, 'CONDITIONAL BRANCH SCRIPT ERROR');
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true
    break;
  }
  return Yanfly.Core.Game_Interpreter_command111.call(this);
};

// Control Variables
Yanfly.Core.Game_Interpreter_command122 =
  Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  switch (this._params[3]) {
  case 4:  // Script
    var value = 0;
    var code = this._params[4];
    try {
      value = eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CONTROL VARIABLE SCRIPT ERROR');
    }
    for (var i = this._params[0]; i <= this._params[1]; i++) {
      this.operateVariable(i, this._params[2], value);
    }
    return true;
    break;
  }
  return Yanfly.Core.Game_Interpreter_command122.call(this);
};

// Script
Game_Interpreter.prototype.command355 = function() {
  var script = this.currentCommand().parameters[0] + '\n';
  while (this.nextEventCode() === 655) {
    this._index++;
    script += this.currentCommand().parameters[0] + '\n';
  }
  try {
    eval(script);
  } catch (e) {
    Yanfly.Util.displayError(e, script, 'SCRIPT CALL ERROR');
  }
  return true;
};

Yanfly.Core.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Core.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GainGold') {
        $gameParty.gainGold(parseInt(args[0]));
    }
    if (command === 'LoseGold') {
        $gameParty.loseGold(parseInt(args[0]));
    }
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.clearChildren = function() {
  while (this.children.length > 0) {
    this.removeChild(this.children[0]);
  }
};

if (Yanfly.Param.CollectionClear) {

Yanfly.Core.Scene_Base_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
  Yanfly.Core.Scene_Base_terminate.call(this);
  if (this._bypassFirstClear) return;
  this.clearChildren();
};

Yanfly.Core.Scene_Title_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Title_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Map_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Battle_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Options_terminate = Scene_Options.prototype.terminate;
Scene_Options.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Options_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Load_terminate = Scene_Load.prototype.terminate;
Scene_Load.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Load_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Gameover_terminate = Scene_Gameover.prototype.terminate;
Scene_Gameover.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Gameover_terminate.call(this);
  this.clearChildren();
};

}; // Yanfly.Param.CollectionClear

//=============================================================================
// Scene_Boot
//=============================================================================

Scene_Boot.prototype.isGameFontLoaded = function() {
  if (Graphics.isFontLoaded('GameFont')) {
    return true;
  } else if (Yanfly.Param.GameFontTimer <= 0) {
    return false;
  } else {
    var elapsed = Date.now() - this._startDate;
    if (elapsed >= Yanfly.Param.GameFontTimer) {
      throw new Error('Failed to load GameFont');
    } else {
      return false;
    }
  }
};

//=============================================================================
// Scene_Item
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") {

Scene_Item.prototype.update = function() {
  Scene_ItemBase.prototype.update.call(this);
};

}; // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0"

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Core.Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
  Yanfly.Core.Scene_Title_start.call(this);
  if (Yanfly.Param.ScaleTitle) this.rescaleTitle();
};

Scene_Title.prototype.rescaleTitle = function() {
  this.rescaleTitleSprite(this._backSprite1);
  this.rescaleTitleSprite(this._backSprite2);
};

Scene_Title.prototype.rescaleTitleSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {
    return setTimeout(this.rescaleTitleSprite.bind(this, sprite), 5);
  }
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) sprite.scale.x = ratioX;
  if (ratioY > 1.0) sprite.scale.y = ratioY;
  this.centerSprite(sprite);
};

//=============================================================================
// Scene_Map
//=============================================================================

if (Yanfly.Param.ShowEvTrans) {

Scene_Map.prototype.startEncounterEffect = function() {
  this._encounterEffectDuration = this.encounterEffectSpeed();
};

}; // Yanfly.Param.ShowEvTrans

Yanfly.Core.Scene_Map_snapForBattleBackground =
  Scene_Map.prototype.snapForBattleBackground;
Scene_Map.prototype.snapForBattleBackground = function() {
  if (!Yanfly.Param.ShowEvSnap) this._spriteset.hideCharacters();
  Yanfly.Core.Scene_Map_snapForBattleBackground.call(this);
  if (Yanfly.Param.ShowEvTrans) this._spriteset.showCharacters();
};

//=============================================================================
// Scene_Gameover
//=============================================================================

Yanfly.Core.Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
    Yanfly.Core.Scene_Gameover_start.call(this);
    if (Yanfly.Param.ScaleGameOver) this.rescaleBackground();
};

Scene_Gameover.prototype.rescaleBackground = function() {
    this.rescaleImageSprite(this._backSprite);
};

Scene_Gameover.prototype.rescaleImageSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {
      return setTimeout(this.rescaleImageSprite.bind(this, sprite), 5);
    }
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

Scene_Gameover.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Sprite_Animation.prototype.setupRate = function() {
  this._rate = Yanfly.Param.AnimationRate;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

if (!Yanfly.Param.FlashTarget) {

Yanfly.Core.Sprite_Battler_updateSelectionEffect =
    Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (this._battler.isActor()) {
      Yanfly.Core.Sprite_Battler_updateSelectionEffect.call(this);
    } else {
      if (this._battler.isSelected()) this.startEffect('whiten');
    }
};

}; // Yanfly.Param.FlashTarget

//=============================================================================
// Sprite_Actor
//=============================================================================

if (Yanfly.Param.ReposBattlers) {
  Yanfly.Core.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
      Yanfly.Core.Sprite_Actor_setActorHome.call(this, index);
      this._homeX += Graphics.boxWidth - 816;
      this._homeY += Graphics.boxHeight - 624;
  };
};

Sprite_Actor.prototype.retreat = function() {
    this.startMove(1200, 0, 120);
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

if (Yanfly.Param.ReposBattlers) {

Yanfly.Core.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Yanfly.Core.Sprite_Enemy_setBattler.call(this, battler);
    if (!this._enemy._alteredScreenY) {
      this._homeY += Math.floor((Graphics.boxHeight - 624) / 2);
      this._enemy._screenY = this._homeY;
      this._enemy._alteredScreenY = true;
    }
    if ($gameSystem.isSideView()) return;
    if (!this._enemy._alteredScreenX) {
      this._homeX += (Graphics.boxWidth - 816) / 2;
      this._enemy._screenX = this._homeX;
      this._enemy._alteredScreenX = true;
    }
};

}; // Yanfly.Param.ReposBattlers

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Sprite_StateIcon._iconWidth  = Yanfly.Param.IconWidth;
Sprite_StateIcon._iconHeight = Yanfly.Param.IconHeight;

//=============================================================================
// Sprite_Button
//=============================================================================

Sprite_Button.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x) + (this.anchor.x * this.width);
    var y = this.canvasToLocalY(TouchInput.y) + (this.anchor.y * this.height);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Sprite_Battleback
//=============================================================================

function Sprite_Battleback() {
    this.initialize.apply(this, arguments);
}

Sprite_Battleback.prototype = Object.create(Sprite.prototype);
Sprite_Battleback.prototype.constructor = Sprite_Battleback;

Sprite_Battleback.prototype.initialize = function(bitmapName, type) {
  Sprite.prototype.initialize.call(this);
  this._bitmapName = bitmapName;
  this._battlebackType = type;
  this.createBitmap();
};

Sprite_Battleback.prototype.createBitmap = function() {
  if (this._bitmapName === '') {
    this.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
  } else {
    if (this._battlebackType === 1) {
      this.bitmap = ImageManager.loadBattleback1(this._bitmapName);
    } else {
      this.bitmap = ImageManager.loadBattleback2(this._bitmapName);
    }
    this.scaleSprite();
  }
};

Sprite_Battleback.prototype.scaleSprite = function() {
  if (this.bitmap.width <= 0) return setTimeout(this.scaleSprite.bind(this), 5);
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  if (this.bitmap.width < width) {
    this.scale.x = width / this.bitmap.width;
  }
  if (this.bitmap.height < height) {
    this.scale.y = height / this.bitmap.height;
  }
  this.anchor.x = 0.5;
  this.x = Graphics.boxWidth / 2;
  if ($gameSystem.isSideView()) {
    this.anchor.y = 1;
    this.y = Graphics.boxHeight;
  } else {
    this.anchor.y = 0.5;
    this.y = Graphics.boxHeight / 2;
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.Core.Sprite_Character_updateHalfBodySprites =
  Sprite_Character.prototype.updateHalfBodySprites;
Sprite_Character.prototype.updateHalfBodySprites = function() {
  Yanfly.Core.Sprite_Character_updateHalfBodySprites.call(this);
  if (this._bushDepth > 0) {
    this._upperBody.blendMode = this.blendMode;
    this._lowerBody.blendMode = this.blendMode;
  }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Spriteset_Map.prototype.hideCharacters = function() {
  for (var i = 0; i < this._characterSprites.length; i++) {
    var sprite = this._characterSprites[i];
    if (!sprite.isTile()) sprite.hide();
  }
};

Spriteset_Map.prototype.showCharacters = function() {
  for (var i = 0; i < this._characterSprites.length; i++) {
    var sprite = this._characterSprites[i];
    if (!sprite.isTile()) sprite.show();
  }
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

if (Yanfly.Param.ScaleBattleback) {

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.2') {

// Rewriting the battlebacks
Spriteset_Battle.prototype.createBattleback = function() {
  this._back1Sprite = new Sprite_Battleback(this.battleback1Name(), 1);
  this._back2Sprite = new Sprite_Battleback(this.battleback2Name(), 2);
  this._battleField.addChild(this._back1Sprite);
  this._battleField.addChild(this._back2Sprite);
};

// No more updateBattleback
Spriteset_Battle.prototype.updateBattleback = function() {
};

} else { // Version 1.3.0 and below
  
Yanfly.Core.Spriteset_Battle_locateBattleback =
    Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
  var sprite1 = this._back1Sprite;
  var sprite2 = this._back2Sprite;
  if (sprite1.bitmap.width <= 0) return;
  if (sprite2.bitmap.width <= 0) return;
  if (this._rescaledBattlebackSprite) return;
  this._rescaledBattlebackSprite = true;
  Yanfly.Core.Spriteset_Battle_locateBattleback.call(this);
  var height = this._battleField.height;
  sprite1.origin.y = sprite1.x + sprite1.bitmap.height - height;
  sprite2.origin.y = sprite1.y + sprite2.bitmap.height - height;
  this.rescaleBattlebacks();
};

Spriteset_Battle.prototype.rescaleBattlebacks = function() {
  this.rescaleBattlebackSprite(this._back1Sprite);
  this.rescaleBattlebackSprite(this._back2Sprite);
};

Spriteset_Battle.prototype.rescaleBattlebackSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) {
    sprite.scale.x = ratioX;
    sprite.anchor.x = 0.5;
    sprite.x = width / 2;
  }
  if (ratioY > 1.0) {
    sprite.scale.y = ratioY;
    sprite.origin.y = 0;
    sprite.y = 0;
  }
};

} // Version 1.3.0 and below

} // Yanfly.Param.ScaleBattleback

//=============================================================================
// Window_Base
//=============================================================================

Window_Base._iconWidth   = Yanfly.Param.IconWidth;
Window_Base._iconHeight  = Yanfly.Param.IconHeight;
Window_Base._faceWidth   = Yanfly.Param.FaceWidth;
Window_Base._faceHeight  = Yanfly.Param.FaceHeight;

Window_Base.prototype.lineHeight = function() {
  return Yanfly.Param.LineHeight;
};

Window_Base.prototype.drawTextEx = function(text, x, y) {
  if (text) {
    this.resetFontSettings();
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    return textState.x - x;
  } else {
    return 0;
  }
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
    return Yanfly.Param.ChineseFont;
    } else if ($gameSystem.isKorean()) {
    return Yanfly.Param.KoreanFont;
    } else {
    return Yanfly.Param.DefaultFont;
    }
};

Window_Base.prototype.standardFontSize = function() {
    return Yanfly.Param.FontSize;
};

Window_Base.prototype.standardPadding = function() {
    return Yanfly.Param.WindowPadding;
};

Window_Base.prototype.textPadding = function() {
    return Yanfly.Param.TextPadding;
};

Window_Base.prototype.standardBackOpacity = function() {
    return Yanfly.Param.WindowOpacity;
};

Window_Base.prototype.normalColor = function() {
  return this.textColor(Yanfly.Param.ColorNormal);
};
Window_Base.prototype.systemColor = function() {
    return this.textColor(Yanfly.Param.ColorSystem);
};

Window_Base.prototype.crisisColor = function() {
    return this.textColor(Yanfly.Param.ColorCrisis);
};

Window_Base.prototype.deathColor = function() {
    return this.textColor(Yanfly.Param.ColorDeath);
};

Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(Yanfly.Param.ColorGaugeBack);
};

Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge1);
};

Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge2);
};

Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge1);
};

Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge2);
};

Window_Base.prototype.mpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorMpCost);
};

Window_Base.prototype.powerUpColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerUp);
};

Window_Base.prototype.powerDownColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerDown);
};

Window_Base.prototype.tpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge1);
};

Window_Base.prototype.tpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge2);
};

Window_Base.prototype.tpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorTpCost);
};

Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  if (Yanfly.Param.GaugeOutline) {
    color3.paintOpacity = this.translucentOpacity();
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }
  this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

Window_Base.prototype.gaugeHeight = function() {
    return Yanfly.Param.GaugeHeight;
};

Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    var dw1 = this.textWidth(TextManager.levelA);
    this.drawText(TextManager.levelA, x, y, dw1);
    this.resetTextColor();
    var level = Yanfly.Util.toGroup(actor.level);
    var dw2 = this.textWidth(Yanfly.Util.toGroup(actor.maxLevel()));
    this.drawText(level, x + dw1, y, dw2, 'right');
};

Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x3, y, valueWidth,
          'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(Yanfly.Util.toGroup(max), x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth,
          'right');
    }
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(Yanfly.Util.toGroup(actor.tp), x + width - 64, y, 64,
      'right');
};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y, width2);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    if (Yanfly.Param.MenuTpGauge) {
      this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
    }
};

Window_Base.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
    this.resetTextColor();
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    if (this.usingGoldIcon(unit)) {
      var cx = Window_Base._iconWidth;
    } else {
      var cx = this.textWidth(unit);
    }
    var text = Yanfly.Util.toGroup(value);
    if (this.textWidth(text) > ww - cx) {
      text = Yanfly.Param.GoldOverlap;
    }
    this.drawText(text, wx, wy, ww - cx - 4, 'right');
    if (this.usingGoldIcon(unit)) {
      this.drawIcon(Yanfly.Icon.Gold, wx + ww - Window_Base._iconWidth, wy + 2);
    } else {
      this.changeTextColor(this.systemColor());
      this.drawText(unit, wx, wy, ww, 'right');
    }
    this.resetFontSettings();
};

Window_Base.prototype.usingGoldIcon = function(unit) {
    if (unit !== TextManager.currencyUnit) return false;
    return Yanfly.Icon.Gold > 0;
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.itemTextAlign = function() {
    return Yanfly.Param.TextAlign;
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    var fw = Window_Base._faceWidth;
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, fw, rect.height - 2);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
    var x = rect.x + xpad;
    if (!Yanfly.Param.MenuTpGauge) {
      var y = Math.floor(rect.y + rect.height / 2 - this.lineHeight() * 1.5);
    } else {
      var y = Math.floor(rect.y);
    }
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Window_ItemList.prototype.numberWidth = function() {
    return this.textWidth('\u00d70,000');
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
    var numItems = Yanfly.Util.toGroup($gameParty.numItems(item));
    this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    this.drawText('\u00d7' + numItems, x, y, width, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        if (!Yanfly.Param.MenuTpGauge) {
          var y = h / 2 - this.lineHeight() * 1.5;
        } else {
          var y = 0;
        }
        var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
        var width = w - xpad - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, h);
        this.drawActorSimpleStatus(this._actor, xpad, y, width);
    }
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillTpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillMpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    }
};

//=============================================================================
// Window_EquipStatus
//=============================================================================

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, 48, 'right');
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b){return a-b});
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
        }, this);
    }
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b){return a-b});
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, 'skill', true, stypeId);
    }, this);
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x, y2, 160);
      this.resetTextColor();
      var actorParam = Yanfly.Util.toGroup(this._actor.param(paramId));
      var dw = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i + 2)));
      this.drawText(actorParam, x + 160, y2, dw, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    } else {
      value1 = Yanfly.Util.toGroup(value1);
      value2 = Yanfly.Util.toGroup(value2);
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width);
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    var itemPrice = Yanfly.Util.toGroup(this.price(item));
    this.drawText(itemPrice, rect.x, rect.y, rect.width, 'right');
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    var itemNumber = Yanfly.Util.toGroup(this._number);
    this.drawText(itemNumber, x, y, width, 'right');
};

//=============================================================================
// Window_NameEdit
//=============================================================================

Window_NameEdit.prototype.faceWidth = function() {
    return Window_Base._faceWidth;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return this.width / 2 + this.standardPadding();
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    var minIconArea = Window_Base._iconWidth * 2;
    var nameLength = this.textWidth('0') * 16 + 6;
    var iconWidth = Math.max(rect.width - nameLength, minIconArea);
    var nameWidth = rect.width - iconWidth;
    this.drawActorName(actor, rect.x + 0, rect.y, nameWidth);
    this.drawActorIcons(actor, rect.x + nameWidth, rect.y, iconWidth);
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = Math.floor(parseInt(totalArea * 108 / 300));
    var otW = Math.floor(parseInt(totalArea * 96 / 300));
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
    this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 15;
    var hpW = Math.floor(parseInt(totalArea * 201 / 315));
    var otW = Math.floor(parseInt(totalArea * 114 / 315));
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15,  rect.y, otW);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.showNormalAnimation = function(targets,
animationId, mirror) {
    var animation = $dataAnimations[animationId];
    if (animation) {
      if (animation.position === 3) {
        targets.forEach(function(target) {
            target.startAnimation(animationId, mirror, 0);
        });
      } else {
          var delay = this.animationBaseDelay();
          var nextDelay = this.animationNextDelay();
          targets.forEach(function(target) {
              target.startAnimation(animationId, mirror, delay);
              delay += nextDelay;
          });
      }
    }
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') {

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal === 'string') return inVal;
  if (!Yanfly.Param.DigitGroup) return inVal;
  return inVal.toLocaleString('en');
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

} else {

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  if (!Yanfly.Param.DigitGroup) return inVal;
  return inVal.toLocaleString('en');
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

} // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0'



Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
