//=============================================================================
// Yanfly Engine Plugins - Battle Engine Core
// YEP_BattleEngineCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleEngineCore = true;

var Yanfly = Yanfly || {};
Yanfly.BEC = Yanfly.BEC || {};
Yanfly.BEC.version = 1.51;

//=============================================================================
 /*:
 * @plugindesc v1.51 使用此插件可以更好地控制戰鬥系統的流程，並根據自己的喜好
 * 更改各部份。
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Action Speed
 * @parent ---General---
 * @desc 這是用於計算行動基本速度的公式。
 * 預設： agi + Math.randomInt(Math.floor(5 + agi / 4))
 * @default agi
 *
 * @param Default System
 * @parent ---General---
 * @type select
 * @option Default Turn Battle
 * @value dtb
 * @option Active Turn Battle (plugin required)
 * @value atb
 * @option Charge Turn Battle (plugin required)
 * @value ctb
 * @option Standard Turn Battle (plugin required)
 * @value stb
 * @desc 這是您的遊戲使用的預設戰鬥系統。
 * 預設： dtb
 * @default dtb
 *
 * @param ---Escape---
 * @default
 *
 * @param Escape Ratio
 * @parent ---Escape---
 * @desc 這是用於確定逃跑成功的公式。
 * 預設： 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.5 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @parent ---Escape---
 * @type number
 * @decimals 2
 * @desc 每次玩家逃跑失敗，增加的成功機率：
 * 預設： 0.10
 * @default 0.10
 *
 * @param ---Animation---
 * @default
 *
 * @param Animation Base Delay
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 這設置了動畫之間的基本延遲。
 * 預設： 8
 * @default 0
 *
 * @param Animation Next Delay
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 這會設置動畫之間的順序延遲。
 * 預設： 12
 * @default 0
 *
 * @param Certain Hit Animation
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 播放某些命中技能的預設動畫。
 * 如果您希望沒有動畫，請使用 0。 預設：0 
 * @default 0
 *
 * @param Physical Animation
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 播放物理技能的預設動畫。
 * 如果您希望沒有動畫，請使用 0。 預設：52
 * @default 52
 *
 * @param Magical Animation
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 為魔法技能播放的預設動畫。
 * 如果您希望沒有動畫，請使用 0。 預設：51
 * @default 51
 *
 * @param Enemy Attack Animation
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 這播放的是敵人的預設攻擊動畫。
 * 預設： 0
 * @default 39
 *
 * @param Reflect Animation
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 魔法攻擊被反射時使用的動畫。 
 * 預設：42
 * @default 42
 *
 * @param Motion Waiting
 * @parent ---Animation---
 * @type boolean
 * @on After
 * @off During
 * @desc 播放動畫在執行行動“之後“或“過程中“？
 * 過程 - false     之後 - true     預設： false
 * @default false
 *
 * @param ---Frontview---
 * @default
 *
 * @param Front Position X
 * @parent ---Frontview---
 * @desc 此公式確定角色的初始 X 位置。
 * 預設： 0
 * @default Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index
 *
 * @param Front Position Y
 * @parent ---Frontview---
 * @desc 此公式確定角色的初始 Y 位置。
 * 預設： 0
 * @default Graphics.boxHeight - 180
 *
 * @param Front Actor Sprite
 * @parent ---Frontview---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在前視戰鬥模式中顯示角色戰鬥人物？
 * 不 - false     是 - true     預設 - false
 * @default false
 *
 * @param Front Sprite Priority
 * @parent ---Frontview---
 * @type select
 * @option Normal
 * @value 0
 * @option Actors on Top
 * @value 1
 * @option Enemies on Top
 * @value 2
 * @desc 賦予角色人物始終處於領先地位的優先級？
 * 0 - 正常   1 - 角色優先   2 - 敵人優先
 * @default 1
 *
 * @param ---Sideview---
 * @default
 *
 * @param Home Position X
 * @parent ---Sideview---
 * @desc 此公式確定角色的初始 X 位置。
 * 預設： 600 + index * 32
 * @default screenWidth - 16 - (maxSize + 2) * 32 + index * 32
 *
 * @param Home Position Y
 * @parent ---Sideview---
 * @desc 此公式確定角色的初始 Y 位置。
 * 預設： 280 + index * 48
 * @default screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32
 *
 * @param Side Sprite Priority
 * @parent ---Sideview---
 * @type select
 * @option Normal
 * @value 0
 * @option Actors on Top
 * @value 1
 * @option Enemies on Top
 * @value 2
 * @desc 賦予角色人物始終處於領先地位的優先級？
 * 0 - 正常   1 - 角色優先   2 - 敵人優先
 * @default 1
 *
 * @param ---Sprites---
 * @default
 *
 * @param Default X Anchor
 * @parent ---Sprites---
 * @type number
 * @decimals 2
 * @desc 用於您的人物 X 錨點的預設值。
 * 預設： 0.50
 * @default 0.50
 *
 * @param Default Y Anchor
 * @parent ---Sprites---
 * @type number
 * @decimals 2
 * @desc 用於您的人物 Y 錨點的預設值。
 * 預設： 1.00
 * @default 1.00
 *
 * @param Step Distance
 * @parent ---Sprites---
 * @type number
 * @desc 這是一個單位為行動而前進的距離。
 * 預設： 48
 * @default 48
 *
 * @param Flinch Distance
 * @parent ---Sprites---
 * @type number
 * @desc 在側視戰鬥模式中，當一個單位受到傷害
 * 或閃避時，它會以像素為單位退縮一定距離。
 * @default 12
 *
 * @param Show Shadows
 * @parent ---Sprites---
 * @type boolean
 * @on Show Shadows
 * @off Hide Shadows
 * @desc 您希望角色下方出現陰影嗎？
 * 不 - false     是 - true
 * @default true
 *
 * @param ---Damage Popups---
 * @default
 *
 * @param Popup Duration
 * @parent ---Damage Popups---
 * @type number
 * @min 1
 * @desc 調整彈出通知將保持可見的幀數。
 * 預設： 90
 * @default 128
 *
 * @param Newest Popup Bottom
 * @parent ---Damage Popups---
 * @type boolean
 * @on Newest at bottom
 * @off Newest at top
 * @desc 將最新彈出的通知放在群組的底部。
 * 不 - false     是 - true
 * @default true
 *
 * @param Popup Overlap Rate
 * @parent ---Damage Popups---
 * @type number
 * @decimals 1
 * @desc 當出現多個傷害彈出通知時，它們會相互覆蓋。
 * 使用它來改變每個人物的緩衝速率量。
 * @default 0.9
 *
 * @param Critical Popup
 * @parent ---Damage Popups---
 * @desc 為爆擊調整彈出通知的閃爍顏色。
 * 預設： 255, 0, 0, 160
 * @default 255, 0, 0, 160
 *
 * @param Critical Duration
 * @parent ---Damage Popups---
 * @type number
 * @min 1
 * @desc 一個爆擊的閃爍將保留多少幀？
 * 預設： 60
 * @default 60
 *
 * @param ---Tick-Settings---
 * @default
 *
 * @param Timed States
 * @parent ---Tick-Settings---
 * @type boolean
 * @on Time-Based States
 * @off Turn-Based States
 * @desc 如果戰鬥系統是基於“刻度“的，那麼使用時間
 * 而不是回合來表示狀態？ 不 - false   是 - true
 * @default false
 *
 * @param Timed Buffs
 * @parent ---Tick-Settings---
 * @type boolean
 * @on Time-Based Buffs
 * @off Turn-Based Buffs
 * @desc 如果戰鬥系統是基於“刻度“的，那麼使用時間
 * 而不是回合來獲得增益？ 不 - false   是 - true
 * @default false
 *
 * @param Turn Time
 * @parent ---Tick-Settings---
 * @type number
 * @min 1
 * @desc 必須經過多少“刻度“才能等於 1 回合？
 * @default 100
 * 
 * @param AI Self Turns
 * @parent ---Tick-Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 將 AI 設置為基於他們自己的個人回合？
 * 不 - false     是 - true
 * @default true
 *
 * @param ---Window Settings---
 * @default
 *
 * @param Lower Windows
 * @parent ---Window Settings---
 * @type boolean
 * @on Bottom Layout
 * @off Default Layout
 * @desc 將技能和物品視窗放在畫面底部。
 * 不 - false     是 - true
 * @default true
 *
 * @param Window Rows
 * @parent ---Window Settings---
 * @number
 * @min 1
 * @desc 對於較低層的視窗，您希望視窗顯示多少行物品？
 * @default 4
 *
 * @param Command Window Rows
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc 設置要顯示的每個指令視窗的行數。
 * 預設： 4
 * @default 4
 *
 * @param Command Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 設置隊伍/角色指令的文本對齊方式。
 * 左 - left   中間 - center   右 - right   預設： left
 * @default center
 *
 * @param Start Actor Command
 * @parent ---Window Settings---
 * @type boolean
 * @on Actor Command Window
 * @off Party Command Window
 * @desc 使用角色指令視窗而不是隊伍來開始回合。
 * 不 - false     是 - true
 * @default true
 *
 * @param Current Max
 * @parent ---Window Settings---
 * @type boolean
 * @on Current / Max
 * @off Just Current
 * @desc 顯示整個 HP/MP 的 當前/最大值？
 * 不 - false     是 - true     預設： true
 * @default false
 *
 * @param ---Selection Help---
 * @default
 *
 * @param Mouse Over
 * @parent ---Selection Help---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允許您將滑鼠停留在敵人上方以自動選擇它們。
 * 不 - false     是 - true
 * @default true
 *
 * @param Select Help Window
 * @parent ---Selection Help---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 選擇角色和敵人時，顯示幫助視窗？
 * 不 - false     是 - true
 * @default true
 *
 * @param User Help Text
 * @parent ---Selection Help---
 * @desc 幫助視窗中使用的“User”（玩家）的單數形式。
 * @default User
 *
 * @param Ally Help Text
 * @parent ---Selection Help---
 * @desc 幫助視窗中使用的“Ally”（隊友）的單數形式。
 * @default Ally
 *
 * @param Allies Help Text
 * @parent ---Selection Help---
 * @desc 幫助視窗中使用的“Allies”（隊友）的複數形式。
 * @default Allies
 *
 * @param Enemy Help Text
 * @parent ---Selection Help---
 * @desc 幫助視窗中使用的“Enemy”（敵人）的單數形式。
 * @default Enemy
 *
 * @param Enemies Help Text
 * @parent ---Selection Help---
 * @desc 幫助視窗中使用的“Enemies”（敵人）的複數形式。
 * @default Enemies
 *
 * @param All Help Text
 * @parent ---Selection Help---
 * @desc 選擇整組目標時：
 * %1 - 目標群組（隊友或敵人）
 * @default All %1
 *
 * @param Random Help Text
 * @parent ---Selection Help---
 * @desc 選擇隨機選擇的目標時：
 * %1 - 目標群組（隊友或敵人）     %2 - 編號
 * @default %2 Random %1
 *
 * @param ---Enemy Select---
 * @default
 *
 * @param Visual Enemy Select
 * @parent ---Enemy Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 用更直觀的畫面替換敵人選擇畫面。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Enemy Name
 * @parent ---Enemy Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 使用視覺化選擇敵人來顯示敵人名稱。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Select Box
 * @parent ---Enemy Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 選擇敵人時顯示選擇框。
 * 不 - false     是 - true
 * @default false
 *
 * @param Enemy Font Size
 * @parent ---Enemy Select---
 * @type number
 * @min 1
 * @desc 更改用於顯示敵人名稱的字體大小。
 * 預設： 28
 * @default 20
 *
 * @param Enemy Auto Select
 * @parent ---Enemy Select---
 * @desc 更改最初自動選擇的敵人。
 * 左 - 0     右 - this.furthestRight()
 * @default this.furthestRight()
 *
 * @param ---Actor Select---
 * @default
 *
 * @param Visual Actor Select
 * @parent ---Actor Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允許您單擊畫面上的角色以選擇它。
 * 不 - false     是 - true
 * @default true
 *
 * @param ---Battle Log---
 * @default
 *
 * @param Show Emerge Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示戰鬥開始時敵人出現的文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show Pre-Emptive Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示取得先制攻擊的文本。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Surprise Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示被偷襲的文本。
 * 不 - false     是 - true
 * @default true
 *
 * @param Optimize Speed
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 減少訊息基本流程以優化戰鬥速度。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Action Text
 * @parent ---Battle Log---
 * @type boolean
 * @on Full
 * @off Simple
 * @desc 顯示完整的動作文本或其簡化版本。
 * 簡化 - false     完整 - true
 * @default false
 *
 * @param Show State Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關狀態的所有文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show Buff Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示所有關於增益的文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show Counter Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關反擊的文本。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Reflect Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關反射法術的文本。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Substitute Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關替代傷害的文本。
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Fail Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關攻擊失敗的文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show Critical Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示關於爆擊的文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show Miss Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關攻擊未命中的文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show Evasion Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關閃避攻擊的文本。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show HP Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關 HP 傷害或治療的文字。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show MP Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關 MP 傷害或治療的文字。
 * 不 - false     是 - true
 * @default false
 *
 * @param Show TP Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 顯示有關 TP 傷害或治療的文字。
 * 不 - false     是 - true
 * @default false
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * 這個插件改變了預設戰鬥系統的各個方面，使它像大多數現代 RPG 一樣更加精簡，
 * 而不像舊式 RPG 那樣笨拙。 這包括可以選擇頂部的戰鬥日誌視窗中顯示的文本以
 * 及它的顯示方式。
 *
 * ============================================================================
 * 戰鬥訊息
 * ============================================================================
 *
 * 更改戰鬥中出現的“術語”和“訊息”時，在訊息中的任何位置插入以下標籤將使
 * 其在戰鬥訊息裡置中。
 *
 *   <CENTER>
 *   此標籤必須全部大寫，以便戰鬥日誌視窗將其識別為將顯示的戰鬥文本消息置中
 *   的指令。
 *
 * 您可以使用幾個註釋標籤來更改某些技能和物品的顯示方式，以防您不希望名稱中
 * 出現“哈洛德的攻擊”之類的名稱。
 *
 * 技能和物品標籤（Notetags）：
 *
 *   <Display Text: x>
 *   這會將顯示的文本更改為 x。
 *
 *   <Display Icon: x>
 *   這會將顯示的圖示更改為 x。
 *
 * ============================================================================
 * 戰鬥視窗
 * ============================================================================
 *
 * 有多種選項可以調整戰鬥系統中的視窗設置，使戰鬥系統的導航更加直觀。
 * 此類選項包括使用角色指令視窗而不是隊伍指令視窗（戰鬥/逃跑）開始回合。
 * 隊伍指令視窗仍然可以使用，但只能通過在第一個角色的視窗上按取消。
 *
 * ============================================================================
 * 戰鬥指令
 * ============================================================================
 *
 * 戰鬥回合順序也已經修正。這樣任何在戰鬥過程中 AGI 值發生變化的戰鬥人物都會在
 * 當前回合而不是下一回合反映這些變化。
 * 還可以調整和微調動作速度計算，以去除其速度計算公式的隨機因素，使 AGI 真正值
 * 得作為戰術參數。
 *
 * 技能和物品標籤（Notetags）：
 *   <speed: +x>
 *   <speed: -x>
 *   這使您可以突破編輯器的 -2000 和 2000 限制，從而可以更好地控制操作的速度。
 *
 * ============================================================================
 * 多段命中
 * ============================================================================
 *
 * 如果目標在動作中途死亡，則連擊動作將不再提前結束。這是通過切換不死狀態來完
 * 成的。要使用功能，請確保您的數據庫在某處具有不死狀態。
 * 如果您不想使用此功能，請將 不死狀態（Immortal State）ID 的參數設置為 0。
 *
 * ============================================================================
 * 彈出訊息改造
 * ============================================================================
 *
 * 儘管傷害彈出訊息可能看起來仍與 MV 中的預設彈出訊息相同，但創建它們的過程現
 * 在有所不同，已簡化傷害彈出程序。以前彈出訊息一次只會出現一個，至少有一幀不
 * 同，以便它們顯示。現在，發生在同一幀的任何操作都將在同一幀顯示彈出訊息，從
 * 而使傷害彈出訊息更流暢且不那麼笨重。
 *
 * ============================================================================
 * 常見事件
 * ============================================================================
 *
 * 現在無論敵方是否還活著，都會在每次動作結束時發生常見事件。通過正確放置動作
 * 序列標籤，您也可以使技能的常見事件發生在動作之間。但是，請記住，如果您強制
 * 執行一個動作在另外一個動作之中，那麼前一個動作的序列列表的其餘部分將變為無
 * 效，以支持新的強制動作。
 *
 * ============================================================================
 * 詠唱動畫
 * ============================================================================
 *
 * 詠唱動畫通過讓玩家知道哪個戰鬥者將要執行一個動作或該動作將是什麼類型的技能
 * 來幫助玩家提供視覺提示。該插件使技能能夠擁有可以針對每個技能進行通用修改或
 * 自定義的施法動畫。
 *
 * 技能標籤：
 *   <Cast Animation: x>
 *   將技能的施法動畫設置為動畫 ID x。
 *   將 x 設置為 零 將導致技能根本沒有任何動畫。
 *
 * ============================================================================
 * 改變戰鬥系統
 * ============================================================================
 *
 * 當玩家不在戰鬥中時，您可以使用插件命令更改戰鬥系統。 
 * 只有這個插件，只包含一個戰鬥系統：預設戰鬥系統。
 *
 * 插件指令：
 *   setBattleSys DTB      將戰鬥系統設置為預設回合制戰鬥。
 *
 * 其他未來的插件可能包括其他可能使用戰鬥引擎核心的戰鬥系統。
 *
 * ============================================================================
 * 側視戰鬥模式的操作
 * ============================================================================
 *
 * 在 RPG Maker MV 的預設戰鬥系統中，側視和前視設置均不顯示反擊、反射魔法攻
 * 擊，也沒有任何替換戰鬥成員的情況。Battle Engine Core 提供使用側視圖設置少
 * 量動畫的遊戲，以更直觀的方式將訊息傳遞給玩家。
 *
 * 魔法反射還會顯示一個反射動畫，以表示戰鬥人員具有反射屬性。可以在參數中更
 * 改此動畫，但如果需要，某些角色、職業、敵人、武器、盔甲和狀態也可以顯示一
 * 種獨特的動畫以進行反射。
 *
 * 角色、職業、敵人、武器、盔甲 和 狀態 標籤：
 *   <Reflect Animation ID: x>
 *   將使用者的反射動畫更改為 x。 
 *   這將按以下優先順序：角色、職業、敵人、武器、盔甲、狀態、預設。
 *
 * 有時，您不希望敵人能夠移動。或者您不希望某些角色能夠移動。無論出於何種原
 * 因，它們都只是靜止的。要做到這一點，您可以使用此標籤來禁止戰鬥者移動。
 *
 * 角色、職業、敵人、武器、盔甲 和 狀態 標籤：
 *   <Sprite Cannot Move>
 *   阻止戰鬥者的人物移動。
 *   這將按以下優先順序：角色、職業、敵人、武器、盔甲和狀態。 
 *   如果敵人在執行動作時無法移動，它會像在前視戰鬥模式中一樣閃爍白色。
 *
 * ============================================================================
 * 客製化側視戰鬥模式的戰鬥人物
 * ============================================================================
 *
 * 側視戰鬥模式的人物通常水平居中，腳下著地。然而，並非所有側視戰鬥人物都適
 * 用這種方式運作。如果您有一個不符合這些標準的側視戰鬥人物，您可以用不同的
 * 方式“錨定”它們。
 *
 * 角色、職業、武器、盔甲、狀態 標籤：
 *   <Anchor X: y.z>
 *   <Anchor Y: y.z>
 *   這將在 y.z 處設置角色的側視戰鬥人物的錨點位置。預設情況下，X 錨點為 0.5
 *   ，而 Y 錨點為 1.0。如果您希望 X 錨點更靠左一點，請使其小於 0.5。使其大
 *   於 0.5 則使 X 錨更向右。要升高 Y 錨點，請將數值設置為小於 1.0。
 *   不斷調整，直到找到完美的錨定設置。
 *
 * 如果一個錨點有多個產生不同錨點的特點，它將以這個順序的優先級列表來作用：
 *
 *   狀態（States）
 *   武器（Weapons）
 *   盔甲（Armors）
 *   職業（Class）
 *   角色（Actor）
 *   預設（Default）
 *
 * 它在優先級列表中越高，其優先級就越高。
 *
 * ============================================================================
 * 敵人攻擊動畫
 * ============================================================================
 *
 * 為了給你的敵人獨特的攻擊動畫，你可以使用這個標籤：
 *
 * 敵人標籤：
 *   <Attack Animation: x>
 *   將 x 替換為您希望設置為敵人預設攻擊動畫的戰鬥動畫 ID。
 *
 * ============================================================================
 * 自動狀態移除條件
 * ============================================================================
 *
 * 預設情況下，RPG Maker MV 戰鬥系統在三種不同條件下具有自動狀態清除：無、
 * 動作結束、回合結束。
 *
 * “無“和“回合結束“按預期工作。 然而，“動作結束“在戰鬥者的行動開始而
 * 不是結束時移除狀態。這被更改和更新為僅在戰鬥者的行動結束時作用。
 *
 * 現在添加另外兩個自動條件：行動開始（Action Start）和回合開始（Turn Start）。
 * 可以使用以下註釋標籤添加和實現這些：
 *
 * 狀態標籤：
 *   <Action Start: x>
 *   <Action Start: x to y>
 *   這將影響此狀態更新其在動作開始時剩餘的回合數。 x 是它將持續的回合數。
 *   如果您使用 x 到 y，則在該狀態作用時，該狀態將從 x 到 y 之間取隨機數來
 *   移除對應的回合數。
 *
 *   <Turn Start: x>
 *   <Turn Start: x to y>
 *   這將影響此狀態更新其在戰鬥回合開始時剩餘的回合。 
 *   x 是它將持續的回合數。
 *   如果您使用 x 到 y，則在該狀態作用時，該狀態將從 x 到 y 之間取隨機數來
 *   移除對應的回合數。
 *
 * 具有 行動停止 的狀態對它們有一個獨特的特性，如果狀態的施法者是當前活躍
 * 的戰鬥者（對象），並且如果該狀態隨後作用於玩家本身，則它們將獲得“自由
 * 回合”。“自由回合”是為了減輕玩家失去回合的 1 個持續時間，因為在行動結
 * 束計時，他們將失去在該回合計時的狀態下的好處。
 *
 * ============================================================================
 * 動作序列
 * ============================================================================
 *
 * Yanfly 引擎插件 - 戰鬥引擎核心包括使用自定義動作序列的功能。
 * 動作序列是遊戲在視覺和機械上創建自定義技能的基本指令。
 * 然而 Battle Engine Core 將只包含最基本的動作序列，因此有關如何創建自定義動
 * 作序列的說明將包含在此插件未來擴展插件的幫助文件中。
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.51:
 * - Fixed updateBattlerName function. Thanks to ZServ.
 *
 * Version 1.50:
 * - Action sequences allow for unlimited arguments now.
 *
 * Version 1.49:
 * - Added failsafe for 'furthestRight()' errors.
 *
 * Version 1.48:
 * - Optimization update.
 *
 * Version 1.47:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.46:
 * - Updated for RPG Maker MV version 1.6.1.
 *
 * Version 1.45:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.44:
 * - Fixed a bug where the enemy name windows disappear if you change scenes
 * mid-way through battle and return to it.
 *
 * Version 1.43b:
 * - Bug fixed to prevent crash if non-existent actions are used.
 * - Optimization update.
 *
 * Version 1.42:
 * - Optimization update.
 *
 * Version 1.41:
 * - Fixed a bug that allowed certain sprites to remain in the active pool
 * while party members were removed midway through battle.
 *
 * Version 1.40:
 * - Updated for RPG Maker MV version 1.3.2.
 *
 * Version 1.39c:
 * - Fixed a bug that caused dead actors to not be a part of action sequence
 * targeting for "Not Focus".
 * - Optimization update.
 * - Updated "queueForceAction" to utilize both numbers and actual targets.
 *
 * Version 1.38a:
 * - Optimization update.
 * - Compatibility update for Selection Control v1.08.
 * - Bug fixed for mirrored animations on enemies.
 *
 * Version 1.37:
 * - Fixed a bug where if the enemy's size is too small, the enemy's name
 * during selection will be cut off.
 *
 * Version 1.36d:
 * - Made an update for the battle background image snaps when there is no
 * battleback being used. This will prevent the player party and enemy troop
 * from appearing in the background snapshot when entering menus mid-battle.
 * - 'Death Break' action sequence now only triggers upon dead status and not
 * an 'or 0 HP' condition.
 * - Updated Forced Action sequencing for more efficiency.
 * - 'Action Times+' traits now work properly for DTB again.
 * - Optimized message displaying for battle log.
 * - Optimized z sorting algorithm for sprites.
 *
 * Verison 1.35d:
 * - Scopes that target a dead ally will automatically target the first dead
 * ally now. Scopes that target all dead allies will lock onto the first dead
 * ally. This will hopefully provide less confusion amongst playing.
 * - Added anti-crash measure for sprite bitmaps.
 * - Added anti-crash measure for faux actions.
 * - Added anti-crash measure to prevent non-existant animations from playing.
 * - Added a check that prevents hidden battlers from appearing when using
 * certain action sequences.
 *
 * Version 1.34a:
 * - Fixed a bug where 'NOT FOCUS' targets were not including dead members.
 * - Fixed a bug where using NOT FOCUS would cause dead targets to be visible.
 *
 * Version 1.33:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.32d:
 * - Fixed a bug that caused a crash when an actor died.
 * - Added a motion engine to be used for future plugins.
 * - Preparation for a future plugin.
 * - <Anchor X: y.z> and <Anchor Y: y.z> notetags for actors are now extended
 * to actors, classes, weapons, armors, and states.
 * - Added <Display Text: x> and <Display Icon: x> notetags for skills and
 * items. These notetags will alter the display name shown and icon shown
 * respectively while performing a skill.
 * - Switched Magic Reflect checking order with Counterattack checking order.
 * This is to give priority to reflected actions over countered actions.
 *
 * Version 1.31b:
 * - States with Action End now have a unique trait to them where if the caster
 * of the state is the current active battler (subject) and if the state is
 * then applied on the user itself, they will gain a 'free turn'. The 'free
 * turn' is to mitigate the user from losing 1 duration of the turn since with
 * an Action End timing, they would lose the benefit of being under the state
 * for that turn's timing.
 * - Added failsafes for Free Turns in case other plugins have overwritten the
 * on battle start functions.
 * - Added a compatibility update to Animated SV Enemies for dead motion.
 *
 * Version 1.30:
 * - Optimization update.
 * - Fixed a bug that prevented added state effects be unable to apply if they
 * are an added Death state.
 * - Battlelog lines are now able to display text codes.
 *
 * Version 1.29:
 * - Fixed a bug with the 'else if' action sequences not working in the right
 * order of sequence conditions.
 *
 * Version 1.28d:
 * - Fixed a bug if instant casting a skill that would make an opponent battler
 * to force an action to end incorrectly. Thanks to DoubleX for the fix.
 * - Fixed a bug with mouse over not working properly.
 * - Fixed a bug regarding forced actions that will cause the battle to freeze
 * if the forced action causes the main active subject to leave the battle.
 * - Fixed a bug with timed states not updating their turns properly.
 * - Changed priority of IF action sequences to higher to no longer interfere
 * other action sequences.
 *
 * Version 1.27:
 * - Mechanic change. This will only affect those using turn-based state timing
 * mechanics. Turn End state updates are now shifted from Turn End to occur at
 * Regeneration timing to have a more synchronized aspect. The timings are very
 * close so there's next to no notice in difference. Buff turn updates are also
 * moved to the regeneration timing, too.
 *
 * Version 1.26:
 * - Added 'Mouse Over' parameter to Selection Help. This parameter enables
 * mouse users to simply hover over the enemy to select them rather than having
 * to click an enemy twice to select them.
 *
 * Version 1.25f:
 * - Added failsafes for Forced Action queues.
 * - Added 'Show Select Box' parameter when selecting enemies.
 * - Fixed a bug that caused End Turn events to not function properly.
 * - Battle animations, by default, are positioned relative to the base bitmap
 * for its target sprite. However, actor sprites do not have a base bitmap and
 * therefore, battle animations, regardless of position, will always target the
 * actor sprite's feet. This update now gives actor sprites a base bitmap.
 * - Readjusted sprite width and sprite height calculations.
 * - Added a failsafe for when no sideview actor graphics are used.
 *
 * Version 1.24:
 * - Implemented a Forced Action queue list. This means if a Forced Action
 * takes place in the middle of an action, the action will resume after the
 * forced action finishes rather than cancels it out like MV does.
 * 
 * Version 1.23:
 * - Fixed a bug that didn't regenerate HP/MP/TP properly for tick-based.
 *
 * Version 1.22:
 * - Fixed a bug within MV that caused Forced Actions at Turn End to prompt and
 * trigger all turn-end related activities (such as regeneration and state turn
 * updating).
 * - Made a mechanic change so that Action Start and Action End state turns do
 * not update their turns through forced actions.
 *
 * Version 1.21:
 * - Fixed a bug where states Action End weren't going down properly with DTB.
 *
 * Version 1.20:
 * - Fixed a bug where revived actors using instant cast aren't properly set to
 * use actions immediately.
 *
 * Version 1.19:
 * - Added <Attack Animation: x> notetag for enemies.
 * - Added 'AI Self Turns' for Tick-Based Battles. Enemies can now have their
 * A.I. revolve around their own individual turns rather than the battle's.
 * - Mechanic change for states. Following suit with the change to Action End
 * removal, there are now two more conditions added: Action Start, Turn Start.
 * - Added <Action Start: x>, <Action Start: x to y>, <Turn Start: x>, and
 * <Turn Start: x to y> notetags for automatic state removal.
 *
 * Version 1.18:
 * - Fixed a bug with irregular targeting scopes.
 * - Fixed an MV-related bug with Recover All event not refreshing battlers.
 * 
 * Version 1.17b:
 * - Fixed a bug with action end states to remove multiple at once.
 * - Fixed a visual error with flinching sprites.
 * - Added 'Current Max' parameter to change HP current/max display in battle.
 * - Mechanic change for states that update on Action End to end at the end of
 * a battler's turn instead of at the start.
 * - Began preparations for another battle system.
 *
 * Version 1.16:
 * - Fixed an issue with mirrored enemies having mirrored state icons.
 *
 * Version 1.15a:
 * - Fixed a bug revolving the status window not updating.
 * - Updated default home position formula to better fit other party sizes.
 * New Home Position X:
 *   screenWidth - 16 - (maxSize + 2) * 32 + index * 32
 * New Home Position Y:
 *   screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 16
 *
 * Version 1.14:
 * - Fixed a bug with Forced Actions locking out the battle.
 * - New mechanic: For tick-based battle systems, states with action-end will
 * go down in turns based on how many actions took place for the actor instead.
 * Previously, they were indistinguishable from states with Turn End removal.
 * - New mechanic: Using Instant Skills/Items from YEP_InstantCast.js will also
 * cause states with action-end to go down in turns upon using actions.
 *
 * Version 1.13a:
 * - Fixed a bug that made battlebacks disappear.
 * - Reworked visual enemy selection.
 * - Victory phase doesn't immediately display level up changes in battle
 * status window.
 * - Fixed a bug with the visual enemy select showing dead enemy names.
 *
 * Version 1.12b:
 * - If the Battle HUD has been hidden for whatever reason during the victory
 * sequence, it will be returned.
 * - Added <speed: +x> and <speed: -x> notetags to break past editor limits.
 * - Added new conditions where the battle won't end until all action sequences
 * have been fulfilled.
 *
 * Version 1.11:
 * - Fixed a bug that didn't show HP/MP Regeneration.
 *
 * Version 1.10:
 * - Removed immortal state dependancy. Immortality is now its own setting.
 * - Added more abbreviated variables for action speed calculation.
 * - Fixed a bug where all-scope attacks would reveal Appear-Halfway enemies.
 * - Fixed a bug where the battle wouldn't end if the final enemy was killed
 * by state damage.
 *
 * Version 1.09:
 * - Fixed a undefined actor bug for refreshing the status window.
 * - Added 'Show Shadows' parameter to the plugin settings.
 * - Reworked the default action sequences so that forced actions do not appear
 * on top of each other and party-heal animations occur simultaneously.
 *
 * Version 1.08:
 * - Fixed a bug where battlers gaining HP/MP in the damage formula for
 * themselves wouldn't trigger popups.
 * - Fixed a bug where if the party failed to escape from battle, states that
 * would be removed by battle still get removed. *Fixed by Emjenoeg*
 * - Fixed a bug where instant death skills didn't work.
 * - Changed Sprite Priority settings to decide whether actors, enemies, or
 * neither would always be on top.
 *
 * Version 1.07:
 * - Optimized status window to refresh at a minimum.
 * - Set up frame work for future plugins:
 * - Added 'Escape Ratio' and 'Fail Escape Boost' to parameters to allow users
 * to set the escape ratio they want.
 * - Added 'Front Sprite Priority' and 'Side Sprite Priority' to parameters to
 * dictate if actor sprites are always on top.
 * - Added 'Tick-Settings' category for tick-based battle systems.
 *
 * Version 1.06:
 * - Fixed a bug that causes dead actors at the start of battle to not spawn.
 * - Fixed a bug where the help window on an empty slot would show the
 * previous skill's message.
 *
 * Version 1.05:
 * - Added new target typing: Character X, which allows you to select
 * specifically the actor with an actor ID of X if he/she/it is in the party.
 * - Fixed a bug that prevented Miss and Evade popups from showing.
 *
 * Version 1.04:
 * - Fixed a bug where popups didn't show under certain animation types.
 * - Fixed certain battler motions from not refreshing correctly.
 * - Actions with no scope will not trigger the confirmation selection window.
 *
 * Version 1.03:
 * - Added 'Wait for Effect' action sequence.
 * - Actions now wait for effects (such as collapsing) to be done before
 * continuing on with battle or to end battle.
 *
 * Version 1.02:
 * - Fixed a bug where the help window would retain descriptions on no skills.
 * - Synched up weapons with actor sprites so they would occur simultaneously.
 * - Fixed an issue where requesting certain motions from enemies that don't
 * exist would cause them to crash.
 *
 * Version 1.01:
 * - Skills and items that affect both HP and MP will now show popups for both.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleEngineCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BECSystem = String(Yanfly.Parameters['Default System']);
Yanfly.Param.BECEscRatio = String(Yanfly.Parameters['Escape Ratio']);
Yanfly.Param.BECEscFail = String(Yanfly.Parameters['Fail Escape Boost']);
Yanfly.Param.CastCertHit = Number(Yanfly.Parameters['Certain Hit Animation']);
Yanfly.Param.CastPhysical = Number(Yanfly.Parameters['Physical Animation']);
Yanfly.Param.CastMagical = Number(Yanfly.Parameters['Magical Animation']);
Yanfly.Param.EnemyAtkAni = Number(Yanfly.Parameters['Enemy Attack Animation']);
Yanfly.Param.BECOptSpeed = String(Yanfly.Parameters['Optimize Speed']);
Yanfly.Param.BECOptSpeed = eval(Yanfly.Param.BECOptSpeed);
Yanfly.Param.BECEmergeText = String(Yanfly.Parameters['Show Emerge Text']);
Yanfly.Param.BECEmergeText = eval(Yanfly.Param.BECEmergeText);
Yanfly.Param.BECPreEmpText = String(Yanfly.Parameters['Show Pre-Emptive Text']);
Yanfly.Param.BECPreEmpText = eval(Yanfly.Param.BECPreEmpText);
Yanfly.Param.BECSurpText = String(Yanfly.Parameters['Show Surprise Text']);
Yanfly.Param.BECSurpText = eval(Yanfly.Param.BECSurpText);
Yanfly.Param.BECPopupOverlap = String(Yanfly.Parameters['Popup Overlap Rate']);
Yanfly.Param.BECPopupOverlap = eval(Yanfly.Param.BECPopupOverlap);
Yanfly.Param.BECNewPopBottom = String(Yanfly.Parameters['Newest Popup Bottom']);
Yanfly.Param.BECNewPopBottom = eval(Yanfly.Param.BECNewPopBottom);
Yanfly.Param.BECStartActCmd = String(Yanfly.Parameters['Start Actor Command']);
Yanfly.Param.BECStartActCmd = eval(Yanfly.Param.BECStartActCmd);
Yanfly.Param.BECCurMax = eval(String(Yanfly.Parameters['Current Max']));
Yanfly.Param.BECSelectHelp = String(Yanfly.Parameters['Select Help Window']);
Yanfly.Param.BECSelectHelp = eval(Yanfly.Param.BECSelectHelp);
Yanfly.Param.BECHelpUserTx = String(Yanfly.Parameters['User Help Text']);
Yanfly.Param.BECHelpAllyTx = String(Yanfly.Parameters['Ally Help Text']);
Yanfly.Param.BECHelpAlliesTx = String(Yanfly.Parameters['Allies Help Text']);
Yanfly.Param.BECHelpEnemyTx = String(Yanfly.Parameters['Enemy Help Text']);
Yanfly.Param.BECHelpEnemiesTx = String(Yanfly.Parameters['Enemies Help Text']);
Yanfly.Param.BECHelpAllTx = String(Yanfly.Parameters['All Help Text']);
Yanfly.Param.BECHelpRandTx = String(Yanfly.Parameters['Random Help Text']);
Yanfly.Param.BECFrontPosX = String(Yanfly.Parameters['Front Position X']);
Yanfly.Param.BECFrontPosY = String(Yanfly.Parameters['Front Position Y']);
Yanfly.Param.BECFrontSprite = String(Yanfly.Parameters['Front Actor Sprite']);
Yanfly.Param.BECFrontSprite = eval(Yanfly.Param.BECFrontSprite);
Yanfly.Param.BECFrSpPrio = String(Yanfly.Parameters['Front Sprite Priority']);
Yanfly.Param.BECHomePosX = String(Yanfly.Parameters['Home Position X']);
Yanfly.Param.BECHomePosY = String(Yanfly.Parameters['Home Position Y']);
Yanfly.Param.BECSideSpPrio = String(Yanfly.Parameters['Side Sprite Priority']);
Yanfly.Param.BECSideSpPrio = eval(Yanfly.Param.BECSideSpPrio);
Yanfly.Param.BECAnchorX = Number(Yanfly.Parameters['Default X Anchor']);
Yanfly.Param.BECAnchorY = Number(Yanfly.Parameters['Default Y Anchor']);
Yanfly.Param.BECStepDist = Number(Yanfly.Parameters['Step Distance']);
Yanfly.Param.BECFlinchDist = Number(Yanfly.Parameters['Flinch Distance']);
Yanfly.Param.BECShowShadows = String(Yanfly.Parameters['Show Shadows']);
Yanfly.Param.BECShowShadows = eval(Yanfly.Param.BECShowShadows);
Yanfly.Param.BECPopupDur = Number(Yanfly.Parameters['Popup Duration']);
Yanfly.Param.BECCritPopup = String(Yanfly.Parameters['Critical Popup']);
Yanfly.Param.BECCritDur = Number(Yanfly.Parameters['Critical Duration']);
Yanfly.Param.BECActionSpeed = String(Yanfly.Parameters['Action Speed']);
Yanfly.Param.BECReflectAni = Number(Yanfly.Parameters['Reflect Animation']);
Yanfly.Param.BECMotionWait = String(Yanfly.Parameters['Motion Waiting']);
Yanfly.Param.BECMotionWait = eval(Yanfly.Param.BECMotionWait);
Yanfly.Param.BECTimeStates = String(Yanfly.Parameters['Timed States']);
Yanfly.Param.BECTimeStates = eval(Yanfly.Param.BECTimeStates);
Yanfly.Param.BECTimeBuffs = String(Yanfly.Parameters['Timed Buffs']);
Yanfly.Param.BECTimeBuffs = eval(Yanfly.Param.BECTimeBuffs);
Yanfly.Param.BECTurnTime = Number(Yanfly.Parameters['Turn Time']);
Yanfly.Param.BECAISelfTurn = eval(String(Yanfly.Parameters['AI Self Turns']));
Yanfly.Param.BECLowerWindows = String(Yanfly.Parameters['Lower Windows']);
Yanfly.Param.BECLowerWindows = eval(Yanfly.Param.BECLowerWindows);
Yanfly.Param.BECSelectMouseOver = eval(String(Yanfly.Parameters['Mouse Over']));
Yanfly.Param.BECEnemySelect = String(Yanfly.Parameters['Visual Enemy Select']);
Yanfly.Param.BECEnemySelect = eval(Yanfly.Param.BECEnemySelect);
Yanfly.Param.BECActorSelect = String(Yanfly.Parameters['Visual Actor Select']);
Yanfly.Param.BECActorSelect = eval(Yanfly.Param.BECActorSelect);
Yanfly.Param.BECWindowRows = Number(Yanfly.Parameters['Window Rows']);
Yanfly.Param.BECEnemyFontSize = Number(Yanfly.Parameters['Enemy Font Size']);
Yanfly.Param.BECShowEnemyName = String(Yanfly.Parameters['Show Enemy Name']);
Yanfly.Param.BECShowEnemyName = eval(Yanfly.Param.BECShowEnemyName);
Yanfly.Param.BECShowSelectBox = String(Yanfly.Parameters['Show Select Box']);
Yanfly.Param.BECShowSelectBox = eval(Yanfly.Param.BECShowSelectBox);
Yanfly.Param.BECEnemyAutoSel = String(Yanfly.Parameters['Enemy Auto Select']);
Yanfly.Param.BECEnemyAutoSel = Yanfly.Param.BECEnemyAutoSel;
Yanfly.Param.BECCommandAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.BECCommandRows = Number(Yanfly.Parameters['Command Window Rows']);
Yanfly.Param.BECAniBaseDel = Number(Yanfly.Parameters['Animation Base Delay']);
Yanfly.Param.BECAniNextDel = Number(Yanfly.Parameters['Animation Next Delay']);

Yanfly.Param.BECFullActText = String(Yanfly.Parameters['Show Action Text']);
Yanfly.Param.BECFullActText = eval(Yanfly.Param.BECFullActText);
Yanfly.Param.BECShowCntText = String(Yanfly.Parameters['Show Counter Text']);
Yanfly.Param.BECShowCntText = eval(Yanfly.Param.BECShowCntText);
Yanfly.Param.BECShowRflText = String(Yanfly.Parameters['Show Reflect Text']);
Yanfly.Param.BECShowRflText = eval(Yanfly.Param.BECShowRflText);
Yanfly.Param.BECShowSubText = String(Yanfly.Parameters['Show Substitute Text']);
Yanfly.Param.BECShowSubText = eval(Yanfly.Param.BECShowSubText);
Yanfly.Param.BECShowFailText = String(Yanfly.Parameters['Show Fail Text']);
Yanfly.Param.BECShowFailText = eval(Yanfly.Param.BECShowFailText);
Yanfly.Param.BECShowCritText = String(Yanfly.Parameters['Show Critical Text']);
Yanfly.Param.BECShowCritText = eval(Yanfly.Param.BECShowCritText);
Yanfly.Param.BECShowMissText = String(Yanfly.Parameters['Show Miss Text']);
Yanfly.Param.BECShowMissText = eval(Yanfly.Param.BECShowMissText);
Yanfly.Param.BECShowEvaText = String(Yanfly.Parameters['Show Evasion Text']);
Yanfly.Param.BECShowEvaText = eval(Yanfly.Param.BECShowEvaText);
Yanfly.Param.BECShowHpText = String(Yanfly.Parameters['Show HP Text']);
Yanfly.Param.BECShowHpText = eval(Yanfly.Param.BECShowHpText);
Yanfly.Param.BECShowMpText = String(Yanfly.Parameters['Show MP Text']);
Yanfly.Param.BECShowMpText = eval(Yanfly.Param.BECShowMpText);
Yanfly.Param.BECShowTpText = String(Yanfly.Parameters['Show TP Text']);
Yanfly.Param.BECShowTpText = eval(Yanfly.Param.BECShowTpText);
Yanfly.Param.BECShowStateText = String(Yanfly.Parameters['Show State Text']);
Yanfly.Param.BECShowStateText = eval(Yanfly.Param.BECShowStateText);
Yanfly.Param.BECShowBuffText = String(Yanfly.Parameters['Show Buff Text']);
Yanfly.Param.BECShowBuffText = eval(Yanfly.Param.BECShowBuffText);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BEC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.BEC.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_BattleEngineCore) {
    this.processMELODYNotetags($dataSkills);
    this.processMELODYNotetags($dataItems);
    this.processBECNotetags1($dataSkills);
    this.processBECNotetags2($dataSkills);
    this.processBECNotetags2($dataItems);
    this.processBECNotetags3($dataEnemies);
    this.processBECNotetags4($dataActors);
    this.processBECNotetags4($dataClasses);
    this.processBECNotetags4($dataWeapons);
    this.processBECNotetags4($dataArmors);
    this.processBECNotetags4($dataEnemies);
    this.processBECNotetags4($dataStates);
    this.processBECNotetags5($dataActors, true);
    this.processBECNotetags5($dataClasses, false);
    this.processBECNotetags5($dataWeapons, false);
    this.processBECNotetags5($dataArmors, false);
    this.processBECNotetags5($dataStates, false);
    this.processBECNotetags6($dataStates);
    Yanfly._loaded_YEP_BattleEngineCore = true;
  }
  return true;
};

DataManager.processMELODYNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.actionsMade) continue;
    obj.actionsMade = true;
    var notedata = obj.note.split(/[\r\n]+/);

    var actionType = 0;
    this.setDefaultActions(obj);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SETUP ACTION|setup)>/i)) {
        actionType = 1;
        obj.setupActions = [];
      } else if (line.match(/<\/(?:SETUP ACTION|setup)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:WHOLE ACTION|whole)>/i)) {
        actionType = 2;
        obj.wholeActions = [];
      } else if (line.match(/<\/(?:WHOLE ACTION|whole)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:TARGET ACTION|target)>/i)) {
        actionType = 3;
        obj.targetActions = [];
      } else if (line.match(/<\/(?:TARGET ACTION|target)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FOLLOW ACTION|follow)>/i)) {
        actionType = 4;
        obj.followActions = [];
      } else if (line.match(/<\/(?:FOLLOW ACTION|follow)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FINISH ACTION|finish)>/i)) {
        actionType = 5;
        obj.finishActions = [];
      } else if (line.match(/<\/(?:FINISH ACTION|finish)>/i)) {
        var actionType = 0;
      } else {
        this.convertSequenceLine(obj, line, actionType);
      }
    }
  }
};

Yanfly.BEC.DefaultActionSetup = [
    ['CLEAR BATTLE LOG'],
    ['DISPLAY ACTION'],
    ['IMMORTAL', ['TARGETS', 'TRUE']],
    ['PERFORM START'],
    ['WAIT FOR MOVEMENT'],
    ['CAST ANIMATION'],
    ['WAIT FOR ANIMATION']
];
Yanfly.BEC.DefaultActionWhole = [
    ['PERFORM ACTION'],
];
Yanfly.BEC.DefaultActionTarget = [
    ['PERFORM ACTION'],
];
if (Yanfly.Param.BECMotionWait) {
  Yanfly.BEC.DefaultActionWhole.push(['MOTION WAIT', ['USER']]);
  Yanfly.BEC.DefaultActionTarget.push(['MOTION WAIT', ['USER']]);
} else {
  Yanfly.BEC.DefaultActionWhole.push(['WAIT', [10]]);
  Yanfly.BEC.DefaultActionTarget.push(['WAIT', [10]]);
};
Yanfly.BEC.DefaultActionWhole.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionWhole.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionFollow = [
];
Yanfly.BEC.DefaultActionFinish = [
    ['IMMORTAL', ['TARGETS', 'FALSE']],
    ['WAIT FOR NEW LINE'],
    ['CLEAR BATTLE LOG'],
    ['PERFORM FINISH'],
    ['WAIT FOR MOVEMENT'],
    ['WAIT FOR EFFECT'],
    ['ACTION COMMON EVENT'],
];
DataManager.setDefaultActions = function(obj) {
    obj.setupActions = Yanfly.BEC.DefaultActionSetup.slice();
    if (this.isWholeAction(obj)) {
      obj.wholeActions = Yanfly.BEC.DefaultActionWhole.slice();
      this.addActionEffects(obj, obj.wholeActions);
      obj.targetActions = [];
    } else {
      obj.wholeActions = [];
      obj.targetActions = Yanfly.BEC.DefaultActionTarget.slice();
      this.addActionEffects(obj, obj.targetActions);
    }
    obj.followActions = Yanfly.BEC.DefaultActionFollow.slice();
    obj.finishActions = Yanfly.BEC.DefaultActionFinish.slice();
};

DataManager.isWholeAction = function(obj) {
  if (obj.animationId > 0 && $dataAnimations[obj.animationId]) {
    var animation = $dataAnimations[obj.animationId];
    if (animation.position === 3) return true;
    if (animation.position !== 3 && [2, 8, 10].contains(obj.scope)) return true;
  }
  return false;
};

DataManager.addActionEffects = function(obj, array) {
    for (;;) {
      array[array.length] = ['ACTION EFFECT'];
      array[array.length] = ['DEATH BREAK'];
      obj.repeats -= 1;
      if (obj.repeats <= 0) break;
      array[array.length] = ['WAIT', [8]];
    }
    obj.repeats = 1;
};

DataManager.convertSequenceLine = function(obj, line, actionType) {
  if (actionType <= 0 || actionType > 5) return;
  Yanfly.BEC.SeqType;
  var seqArgs;
  if (line.match(/[ ]*(.*):[ ](.*)/i)) {
    Yanfly.BEC.SeqType = RegExp.$1.trim();
    seqArgs = RegExp.$2.split(',');
    var length = seqArgs.length;
    for (var i = 0; i < length; ++i) {
      seqArgs[i] = seqArgs[i].trim();
    }
  } else {
    Yanfly.BEC.SeqType = line.trim();
    seqArgs = [];
  }
  var array = [Yanfly.BEC.SeqType, seqArgs];
  if (actionType === 1) obj.setupActions[obj.setupActions.length] = array;
  if (actionType === 2) obj.wholeActions[obj.wholeActions.length] = array;
  if (actionType === 3) obj.targetActions[obj.targetActions.length] = array;
  if (actionType === 4) obj.followActions[obj.followActions.length] = array;
  if (actionType === 5) obj.finishActions[obj.finishActions.length] = array;
};

DataManager.processBECNotetags1 = function(group) {
  var note1 = /<(?:CAST ANIMATION|cast ani):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.castAnimation = 0;
    if (obj.hitType === 0) obj.castAnimation = Yanfly.Param.CastCertHit;
    if (obj.hitType === 1) obj.castAnimation = Yanfly.Param.CastPhysical;
    if (obj.hitType === 2) obj.castAnimation = Yanfly.Param.CastMagical;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.castAnimation = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processBECNotetags2 = function(group) {
  var note1 = /<(?:ACTION COPY):[ ](.*):[ ]*(\d+)>/i;
  var note2 = /<(?:SPEED):[ ]([\+\-]\d+)>/i;
  var note3 = /<(?:DISPLAY NAME|DISPLAY TEXT):[ ](.*)>/i;
  var note4 = /<(?:DISPLAY ICON):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.battleDisplayText = obj.name;
    obj.battleDisplayIcon = obj.iconIndex;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var text = String(RegExp.$1).toUpperCase();
        var target;
        if (['I', 'ITEM'].contains(text)) {
          target = $dataItems[parseInt(RegExp.$2)];
        } else if (['S', 'SKILL'].contains(text)) {
          target = $dataSkills[parseInt(RegExp.$2)];
        }
        if (target) {
          obj.setupActions = target.setupActions.slice();
          obj.wholeActions = target.wholeActions.slice();
          obj.targetActions = target.targetActions.slice();
          obj.followActions = target.followActions.slice();
          obj.finishActions = target.finishActions.slice();
        }
      } else if (line.match(note2)) {
        obj.speed = parseInt(RegExp.$1);
      } else if (line.match(note3)) {
        obj.battleDisplayText = String(RegExp.$1);
      } else if (line.match(note4)) {
        obj.battleDisplayIcon = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processBECNotetags3 = function(group) {
  var note1 = /<(?:ATTACK ANIMATION|attack ani):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.attackAnimationId = Yanfly.Param.EnemyAtkAni;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.attackAnimationId = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processBECNotetags4 = function(group) {
  var note1 = /<(?:REFLECT ANIMATION|reflect ani):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.reflectAnimationId = 0;
    obj.spriteCannotMove = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.reflectAnimationId = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SPRITE CANNOT MOVE)>/i)) {
        obj.spriteCannotMove = true;
      }
    }
  }
};

DataManager.processBECNotetags5 = function(group, isActor) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    if (isActor) {
      obj.anchorX = Yanfly.Param.BECAnchorX;
      obj.anchorY = Yanfly.Param.BECAnchorY;
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ANCHOR X):[ ](\d+)[.](\d+)>/i)) {
        obj.anchorX = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
      } else if (line.match(/<(?:ANCHOR Y):[ ](\d+)[.](\d+)>/i)) {
        obj.anchorY = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
      }
    }
  }
};

DataManager.processBECNotetags6 = function(group) {
  var note1a = /<(?:ACTION START):[ ](\d+)>/i;
  var note1b = /<(?:ACTION START):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note2a = /<(?:TURN START):[ ](\d+)>/i;
  var note2b = /<(?:TURN START):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var turns = parseInt(RegExp.$1);
        obj.autoRemovalTiming = 3;
        obj.maxTurns = turns;
        obj.minTurns = turns;
      } else if (line.match(note1b)) {
        var turns1 = parseInt(RegExp.$1);
        var turns2 = parseInt(RegExp.$2);
        obj.autoRemovalTiming = 3;
        obj.maxTurns = turns1;
        obj.minTurns = turns2;
      } else if (line.match(note2a)) {
        var turns = parseInt(RegExp.$1);
        obj.autoRemovalTiming = 4;
        obj.maxTurns = turns;
        obj.minTurns = turns;
      } else if (line.match(note2b)) {
        var turns1 = parseInt(RegExp.$1);
        var turns2 = parseInt(RegExp.$2);
        obj.autoRemovalTiming = 4;
        obj.maxTurns = turns1;
        obj.minTurns = turns2;
      }
    }
  }
};

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.BEC.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    Yanfly.BEC.TouchInput_onMouseMove.call(this, event);
    this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
    this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BEC.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Yanfly.BEC.BattleManager_initMembers.call(this);
    this._forceSelection = false;
    this._allSelection = false;
    this._victoryPhase = false;
    this._forceActionQueue = [];
};

BattleManager.isBattleSystem = function(value) {
    return value.toLowerCase() === $gameSystem.getBattleSystem();
};

BattleManager.isDTB = function() {
    return this.isBattleSystem('dtb');
};

BattleManager.isTurnBased = function() {
    if (this.isDTB()) return true;
    return false;
};

BattleManager.isTickBased = function() {
    return !this.isTurnBased();
};

BattleManager.tickRate = function() {
    return 1;
};

BattleManager.forceSelection = function() {
    this._forceSelection = true;
};

BattleManager.isForceSelection = function() {
    return this._forceSelection;
};

BattleManager.resetSelection = function() {
    this._forceSelection = false;
};

BattleManager.startAllSelection = function() {
    this._allSelection = true;
};

BattleManager.isAllSelection = function() {
     return this._allSelection && BattleManager.isInputting();
};

BattleManager.stopAllSelection = function() {
    this._allSelection = false;
};

Yanfly.BEC.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
    if (this.isDTB()) {
      var code = Yanfly.Param.BECEscRatio;
      try {
        this._escapeRatio = eval(code);
      } catch (e) {
        this._escapeRatio = 0;
        Yanfly.Util.displayError(e, code, 'ESCAPE RATIO FORMULA ERROR');
      }
      var code = Yanfly.Param.BECEscFail;
      try {
        this._escapeFailBoost = eval(code);
      } catch (e) {
        this._escapeFailBoost = 0;
        Yanfly.Util.displayError(e, code, 'ESCAPE FAIL BOOST FORMULA ERROR');
      }
    } else {
      this._escapeFailBoost = 0.1;
      Yanfly.BEC.BattleManager_makeEscapeRatio.call(this);
    }
};

BattleManager.timeBasedStates = function() {
    if (!$gameParty.inBattle()) return false;
    if (this.isTurnBased()) return false;
    if (this._timeBasedStates !== undefined) return this._timeBasedStates;
    this._timeBasedStates = Yanfly.Param.BECTimeStates;
    return this._timeBasedStates;
};

BattleManager.timeBasedBuffs = function() {
    if (!$gameParty.inBattle()) return false;
    if (this.isTurnBased()) return false;
    if (this._timeBasedBuffs !== undefined) return this._timeBasedBuffs;
    this._timeBasedBuffs = Yanfly.Param.BECTimeBuffs;
    return this._timeBasedBuffs;
};

BattleManager.displayStartMessages = function() {
    if (Yanfly.Param.BECEmergeText) {
      $gameTroop.enemyNames().forEach(function(name) {
          $gameMessage.add(TextManager.emerge.format(name));
      });
    }
    if (this._preemptive && Yanfly.Param.BECPreEmpText) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise && Yanfly.Param.BECSurpText) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};

BattleManager.registerSprite = function(battler, sprite) {
  if (!this._registeredSprites) this._registeredSprites = {};
  if (battler.isActor()) var id = 100000 + battler.actorId();
  if (battler.isEnemy()) var id = 200000 + battler.index();
  this._registeredSprites[id] = sprite;
};

BattleManager.getSprite = function(battler) {
  if (!this._registeredSprites) this._registeredSprites = {};
  if (battler.isActor()) var id = 100000 + battler.actorId();
  if (battler.isEnemy()) var id = 200000 + battler.index();
  return this._registeredSprites[id];
};

BattleManager.setSpritePriority = function() {
    if ($gameSystem.isSideView()) {
      this._spritePriority = Yanfly.Param.BECSideSpPrio;
    } else {
      this._spritePriority = Yanfly.Param.BECFrontSprite;
    }
    if (this._spritePriority === false) this._spritePriority = 0;
    if (this._spritePriority === true) this._spritePriority = 1;
};

BattleManager.getSpritePriority = function() {
    if (!this._spritePriority) this.setSpritePriority();
    return this._spritePriority;
};

BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    var lastActor = this.actor();
    this._actorIndex = newActorIndex;
    var newActor = this.actor();
    if (lastActor) {
        lastActor.setActionState(lastActorActionState);
        lastActor.spriteReturnHome();
    }
    if (newActor) {
        newActor.setActionState('inputting');
        newActor.spriteStepForward();
    }
};

BattleManager.createActions = function() {
    $gameParty.createActions();
    $gameTroop.createActions();
};

BattleManager.clearInputtingAction = function() {
    if (this.inputtingAction()) this.inputtingAction().clear();
};

Yanfly.BEC.BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    if (this._phase === 'actionList') return false;
    if (this._phase === 'actionTargetList') return false;
    if (this._phase === 'action') return false;
    if (this._phase === 'phaseChange') return false;
    if ($gameTroop.isEventRunning()) return false;
    return Yanfly.BEC.BattleManager_checkBattleEnd.call(this);
};

Yanfly.BEC.BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
    this._processTurn = true;
    Yanfly.BEC.BattleManager_processTurn.call(this);
    this._processTurn = false;
};

Yanfly.BEC.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    this._logWindow.clear();
    this._victoryPhase = true;
    if (this._windowLayer) this._windowLayer.x = 0;
    Yanfly.BEC.BattleManager_processVictory.call(this);
};

BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    if ($gamePlayer.isDebugThrough()) success = true;
    if (success) {
        $gameParty.performEscapeSuccess();
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += this._escapeFailBoost;
        $gameParty.clearActions();
        this.startTurn();
    }
    return success;
};

Yanfly.BEC.BattleManager_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
    $gameParty.removeBattleStates();
    Yanfly.BEC.BattleManager_processAbort.call(this);
};

BattleManager.refreshAllMembers = function() {
  $gameParty.refreshMembers();
  $gameTroop.refreshMembers();
};

BattleManager.startTurn = function() {
    this._enteredEndPhase = false;
    this._phase = 'turn';
    this.clearActor();
    $gameTroop.increaseTurn();
    $gameParty.onTurnStart();
    $gameTroop.onTurnStart();
    this._performedBattlers = [];
    this.makeActionOrders();
    $gameParty.requestMotionRefresh();
    this._logWindow.startTurn();
    this._subject = this.getNextSubject();
};

Yanfly.BEC.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    if (this.isTurnBased() && this._spriteset.isPopupPlaying()) return;
    if (this.isTurnBased() && this._enteredEndPhase) {
      this._phase = 'turnEnd';
      this._preemptive = false;
      this._surprise = false;
      return;
    }
    this._enteredEndPhase = true;
    Yanfly.BEC.BattleManager_endTurn.call(this);
    BattleManager.refreshAllMembers();
};

BattleManager.getNextSubject = function() {
    if ($gameTroop.turnCount() <= 0) return;
    this._performedBattlers = this._performedBattlers || [];
    this.makeActionOrders();
    for (;;) {
        var battlerArray = [];
        for (var i = 0; i < this._actionBattlers.length; ++i) {
          var obj = this._actionBattlers[i];
          if (!this._performedBattlers.contains(obj)) battlerArray.push(obj);
        }
        this._actionBattlers = battlerArray;
        var battler = this._actionBattlers.shift();
        if (!battler) return null;
        if (battler.isBattleMember() && battler.isAlive()) {
            this.pushPerformedBattler(battler);
            return battler;
        }
    }
};

BattleManager.pushPerformedBattler = function(battler) {
  this._performedBattlers.push(battler);
};

BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'start':
            this.startInput();
            break;
        case 'turn':
            this.updateTurn();
            break;
        case 'action':
            this.updateAction();
            break;
        case 'phaseChange':
            this.updatePhase();
            break;
        case 'actionList':
            this.updateActionList()
            break;
        case 'actionTargetList':
            this.updateActionTargetList()
            break;
        case 'turnEnd':
            this.updateTurnEnd();
            break;
        case 'battleEnd':
            this.updateBattleEnd();
            break;
        }
    }
};

BattleManager.updateEvent = function() {
    if (this._processingForcedAction) return false;
    switch (this._phase) {
    case 'start':
    case 'turn':
    case 'turnEnd':
    case 'actionList':
    case 'actionTargetList':
      if (this.isActionForced()) {
        this.processForcedAction();
        return true;
      } else {
        return this.updateEventMain();
      }
    }
    return this.checkAbort();
};

BattleManager.queueForceAction = function(user, skillId, target) {
    if (target === undefined) {
      var targetIndex = 0;
    } else if (typeof target === 'number') {
      var targetIndex = target;
    } else {
      var targetIndex = target.index();
    }
    var param = [
      user.isEnemy() ? 0 : 1,
      user.isActor() ? user.actorId() : user.index(),
      skillId,
      targetIndex
    ];
    var command = {
      code: 339,
      indent: 0,
      parameters: param
    }
    $gameTemp.forceActionQueue(command);
    this.clearResults();
    if (this.isTickBased()) this._phase = 'action';
};

BattleManager.addText = function(text, wait) {
  if (!SceneManager._scene._logWindow) return;
  wait = wait || 0;
  SceneManager._scene._logWindow.addText(text);
  if (wait <= 0) return;
  var last = this._actionList[this._actionList.length - 1];
  if (last && last[0] === 'WAIT') return;
  this._actionList.push(['WAIT', [wait]]);
};

BattleManager.clearResults = function() {
  var group = this.allBattleMembers();
  var length = group.length;
  for (var i = 0; i < length; ++i) {
    var member = group[i];
    if (member) member.clearResult();
  }
  this._allTargets = [];
  this._targets = [];
  this._target = undefined;
};

Yanfly.BEC.BattleManager_forceAction = BattleManager.forceAction;
BattleManager.forceAction = function(battler) {
    if (this._subject) this._subject.clearResult();
    this.createForceActionFailSafes();
    this.savePreForceActionSettings();
    Yanfly.BEC.BattleManager_forceAction.call(this, battler);
};

BattleManager.createForceActionFailSafes = function() {
    this._actionList = this._actionList || [];
    this._targets = this._targets || [];
    this._allTargets = this._allTargets || [];
    this._individualTargets = this._individualTargets || [];
    this._phaseSteps = this._phaseSteps || [];
    this._conditionFlags = this._conditionFlags || [];
    this._trueFlags = this._trueFlags || [];
};

BattleManager.savePreForceActionSettings = function() {
    var settings = this.setPreForceActionSettings();
    this._forceActionQueue.push(settings);
};

BattleManager.setPreForceActionSettings = function() {
    return {
      subject: this._subject,
      action: JsonEx.makeDeepCopy(this._action),
      actionList: JsonEx.makeDeepCopy(this._actionList),
      targets: this._targets.slice(),
      allTargets: this._allTargets.slice(),
      indTargets: this._individualTargets.slice(),
      phaseSteps: JsonEx.makeDeepCopy(this._phaseSteps),
      returnPhase: this._returnPhase,
      phase: this._phase,
      conditionFlags: JsonEx.makeDeepCopy(this._conditionFlags),
      trueFlags: JsonEx.makeDeepCopy(this._trueFlags)
    }
};

BattleManager.loadPreForceActionSettings = function() {
    var settings = this._forceActionQueue[0];
    if (settings) {
      this._forceActionQueue.shift();
      this.resetPreForceActionSettings(settings);
      return this._subject && this._subject.isAppeared();
    } else {
      return false;
    }
};

BattleManager.resetPreForceActionSettings = function(settings) {
    this._subject = settings['subject'];
    this._action = settings['action'];
    this._actionList = settings['actionList'];
    this._targets = settings['targets'];
    this._allTargets = settings['allTargets'];
    this._individualTargets = settings['indTargets'];
    this._phaseSteps = settings['phaseSteps'];
    this._returnPhase = settings['returnPhase'];
    this._conditionFlags = settings['conditionFlags'];
    this._trueFlags = settings['trueFlags'];
    this._phase = settings['phase'];   
};

Yanfly.BEC.BattleManager_processForcedAction =
    BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    if (this._actionForcedBattler) {
      this._preForcePhase = this._phase;
      this._processingForcedAction = true;
    }
    Yanfly.BEC.BattleManager_processForcedAction.call(this);
};

BattleManager.setTargets = function(array) {
    this._targets = [];
    var max = array.length;
    for (var i = 0; i < max; ++i) {
      var target = array[i];
      if (target) this._targets.push(target);
    }
};

BattleManager.updateAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        if (this._returnPhase === 'target') {
          this.setTargets([this._individualTargets[0]]);
          this._phase = 'actionTargetList';
        } else {
          this.setTargets(this._allTargets.slice());
          this._phase = 'actionList';
        }
    }
};

BattleManager.invokeAction = function(subject, target) {
  if (!Yanfly.Param.BECOptSpeed)  this._logWindow.push('pushBaseLine');
  var normal = true;
  if (Math.random() < this._action.itemMrf(target)) {
    this.invokeMagicReflection(subject, target);
  } else if (Math.random() < this._action.itemCnt(target)) {
    this.invokeCounterAttack(subject, target);
  } else {
    this.invokeNormalAction(subject, target);
  }
  if (subject) subject.setLastTarget(target);
  if (!Yanfly.Param.BECOptSpeed) this._logWindow.push('popBaseLine');
};

BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    this._logWindow.displayCounter(target);
    action.setAttack();
    action.apply(subject);
    this._logWindow.displayActionResults(target, subject);
    if (subject.isDead()) subject.performCollapse();
};

Yanfly.BEC.BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
    Yanfly.BEC.BattleManager_invokeMagicReflection.call(this, subject, target);
    if (subject.isDead()) subject.performCollapse();
};

BattleManager.updatePhase = function() {
    var phase = this._phaseSteps.shift();
    if (phase) this.createPhaseChanges();
    switch (phase) {
    case 'setup':
      this.createSetupActions();
      break;
    case 'whole':
      this.createWholeActions();
      break;
    case 'target':
      this.createTargetActions();
      break;
    case 'follow':
      this.createFollowActions();
      break;
    case 'finish':
      this.createFinishActions();
      break;
    default:
      this.endAction();
      break;
    }
};

BattleManager.createPhaseChanges = function() {
    this._phase = 'actionList';
    this.setTargets(this._allTargets.slice());
    this._conditionFlags = [];
    this._trueFlags = [];
};

BattleManager.createSetupActions = function() {
    $gameTemp.clearActionSequenceSettings();
    this._returnPhase = 'setup';
    this._actionList = this._action.item().setupActions.slice();
};

BattleManager.createWholeActions = function() {
    this._returnPhase = 'whole';
    this._actionList = this._action.item().wholeActions.slice();
};

BattleManager.createTargetActions = function() {
    this._returnPhase = 'target';
    this._phase = 'actionTargetList';
    this.setTargets([this._individualTargets[0]]);
    this._actionList = this._action.item().targetActions.slice();
};

BattleManager.createFollowActions = function() {
    this._returnPhase = 'follow';
    this._actionList = this._action.item().followActions.slice();
};

BattleManager.createFinishActions = function() {
    this._returnPhase = 'finish';
    this._actionList = this._action.item().finishActions.slice();
};

Yanfly.BEC.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this._subject) {
      this._subject.onAllActionsEnd();
    }
    if (this._processingForcedAction) {
      this._subject.removeCurrentAction();
      this._phase = this._preForcePhase;
    }
    this._processingForcedAction = false;
    if (this.loadPreForceActionSettings()) return;
    Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.updateActionList = function() {
    for (;;) {
      this._actSeq = this._actionList.shift();
      if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
        var seqName = this._actSeq[0].toUpperCase();
        if (!this.processActionSequenceCheck(seqName, this._actSeq[1])) {
          break;
        }
      } else {
        this._phase = 'phaseChange';
        break;
      }
    }
};

BattleManager.updateActionTargetList = function() {
    for (;;) {
      this._actSeq = this._actionList.shift();
      if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
        var seqName = this._actSeq[0].toUpperCase();
        if (!this.processActionSequenceCheck(seqName, this._actSeq[1])) {
          break;
        }
      } else if (this._individualTargets.length > 0) {
        this._individualTargets.shift();
        if (this._individualTargets.length > 0) {
          this.setTargets([this._individualTargets[0]]);
          this._actionList = this._action.item().targetActions.slice();
        } else {
          this._phase = 'phaseChange';
          break;
        }
      } else {
        this._phase = 'phaseChange';
        break;
      }
    }
};

BattleManager.updateActionTargetList = function() {
    for (;;) {
      this._actSeq = this._actionList.shift();
      if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
        var seqName = this._actSeq[0].toUpperCase();
        if (!this.processActionSequenceCheck(seqName, this._actSeq[1])) {
          break;
        }
      } else if (this._individualTargets.length > 0) {
        this._individualTargets.shift();
        if (this._individualTargets.length > 0) {
          this.setTargets([this._individualTargets[0]]);
          this._actionList = this._action.item().targetActions.slice();
        } else {
          this._phase = 'phaseChange';
          break;
        }
      } else {
        this._phase = 'phaseChange';
        break;
      }
    }
};

BattleManager.startAction = function() {
    var subject = this._subject;
    if (!subject) return this.endAction();
    var action = subject.currentAction();
    this._action = action;
    if (!this._action) return this.endAction();
    if (!this._action.item()) return this.endAction();
    var targets = action.makeTargets();
    this.setTargets(targets);
    this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
    this._phase = 'phaseChange';
    this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
    this._returnPhase = '';
    this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

BattleManager.processActionSequenceCheck = function(actionName, actionArgs) {
    // IF condition
    if (actionName.match(/IF[ ](.*)/i)) {
      return this.actionIfConditions(actionName, actionArgs);
    }
    return this.processActionSequence(actionName, actionArgs)
};

BattleManager.processActionSequence = function(actionName, actionArgs) {
    // NO ACTION
    if (actionName === '') {
      return true;
    }
    // ACTION ANIMATION
    if (actionName === 'ACTION ANIMATION') {
      return this.actionActionAnimation(actionArgs);
    }
    // ACTION EFFECT
    if (actionName === 'ACTION COMMON EVENT') {
      return this.actionActionCommonEvent();
    }
    // ACTION EFFECT
    if (actionName === 'ACTION EFFECT') {
      return this.actionActionEffect(actionArgs);
    }
    // ANI WAIT: frames
    if (['ANI WAIT', 'ANIWAIT', 'ANIMATION WAIT'].contains(actionName)) {
      return this.actionAniWait(actionArgs[0]);
    }
    // CAST ANIMATION
    if (actionName === 'CAST ANIMATION') {
      return this.actionCastAnimation();
    }
    // CLEAR BATTLE LOG
    if (actionName === 'CLEAR BATTLE LOG') {
      return this.actionClearBattleLog();
    }
    // DEATH BREAK
    if (actionName === 'DEATH BREAK') {
      return this.actionDeathBreak();
    }
    // DISPLAY ACTION
    if (actionName === 'DISPLAY ACTION') {
      return this.actionDisplayAction();
    }
    // IMMORTAL: targets, true/false
    if (actionName === 'IMMORTAL') {
      return this.actionImmortal(actionArgs);
    }
    // MOTION WAIT
    if (actionName === 'MOTION WAIT') {
      return this.actionMotionWait(actionArgs);
    }
    // PERFORM ACTION
    if (actionName === 'PERFORM ACTION') {
      return this.actionPerformAction();
    }
    // PERFORM FINISH
    if (actionName === 'PERFORM FINISH') {
      return this.actionPerformFinish();
    }
    // PERFORM START
    if (actionName === 'PERFORM START') {
      return this.actionPerformStart();
    }
    // WAIT: frames
    if (actionName === 'WAIT') {
      return this.actionWait(actionArgs[0]);
    }
    // WAIT FOR ANIMATION
    if (actionName === 'WAIT FOR ANIMATION') {
      return this.actionWaitForAnimation();
    }
    // WAIT FOR EFFECT
    if (actionName === 'WAIT FOR EFFECT') {
      return this.actionWaitForEffect();
    }
    // WAIT FOR MOVEMENT
    if (actionName === 'WAIT FOR MOVEMENT') {
      return this.actionWaitForMovement();
    }
    // WAIT FOR NEW LINE
    if (actionName === 'WAIT FOR NEW LINE') {
      return this.actionWaitForNewLine();
    }
    // WAIT FOR POPUPS
    if (actionName === 'WAIT FOR POPUPS') {
      return this.actionWaitForPopups();
    }
    return false;
};

BattleManager.makeActionTargets = function(string) {
    var targets = []
    string = string.toUpperCase()
    if (['SUBJECT', 'USER'].contains(string)) {
      return [this._subject];
    }
    if (['TARGET', 'TARGETS'].contains(string)) {
      var group = this._targets;
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ACTORS', 'EXISTING ACTORS', 'ALIVE ACTORS'].contains(string)) {
      var group = $gameParty.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ACTORS ALL', 'ALL ACTORS', 'PARTY'].contains(string)) {
      var group = $gameParty.battleMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD ACTORS', 'DEAD ACTOR'].contains(string)) {
      var group = $gameParty.deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['ACTORS NOT USER', 'ACTORS NOT SUBJECT'].contains(string)) {
      var group = $gameParty.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (['ENEMIES', 'EXISTING ENEMIES', 'ALIVE ENEMIES', 'TROOP',
    'TROOPS'].contains(string)) {
      var group = $gameTroop.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ENEMIES ALL', 'ALL ENEMIES'].contains(string)) {
      var group = $gameTroop.members();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD ENEMIES', 'DEAD ENEMY'].contains(string)) {
      var group = $gameTroop.deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['ENEMIES NOT USER', 'ENEMIES NOT SUBJECT', 'TROOP NOT USER',
    'TROOP NOT SUBJECT'].contains(string)) {
      var group = $gameTroop.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (string.match(/ACTOR[ ](\d+)/i)) {
      var target = $gameParty.battleMembers()[parseInt(RegExp.$1)];
      if (target && target.isAppeared()) return [target];
    }
    if (string.match(/ENEMY[ ](\d+)/i)) {
      var target = $gameTroop.members()[parseInt(RegExp.$1)];
      if (target && target.isAppeared()) return [target];
    }
    if (['FRIEND', 'FRIENDS', 'ALLIES'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL FRIENDS', 'ALL ALLIES'].contains(string)) {
      var group = this._action.friendsUnit().members();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD FRIEND', 'DEAD FRIENDS', 'DEAD ALLIES'].contains(string)) {
      var group = this._action.friendsUnit().deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['OPPONENT', 'OPPONENTS', 'RIVALS', 'FOES'].contains(string)) {
      var group = this._action.opponentsUnit().aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL OPPONENTS', 'ALL RIVALS', 'ALL FOES'].contains(string)) {
      var group = this._action.opponentsUnit().members();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD OPPONENT', 'DEAD OPPONENTS', 'DEAD RIVALS',
    'DEAD FOES'].contains(string)) {
      var group = this._action.opponentsUnit().deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['FRIENDS NOT USER', 'ALLIES NOT USER'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (string.match(/(?:FRIEND|ALLY)[ ](\d+)/i)) {
      var target = this._action.friendsUnit().members()[parseInt(RegExp.$1)];
      if (target && target.isAppeared()) return [target];
    }
    if (string.match(/(?:OPPONENT|FOE|RIVAL)[ ](\d+)/i)) {
      var target = this._action.opponentsUnit().members()[parseInt(RegExp.$1)]
      if (target && target.isAppeared()) return [target];
    }
    if (['ALL ALIVE'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      group = group.concat(this._action.opponentsUnit().aliveMembers());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL MEMBERS'].contains(string)) {
      var group = this._action.friendsUnit().members();
      group = group.concat(this._action.opponentsUnit().members());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL DEAD'].contains(string)) {
      var group = this._action.friendsUnit().deadMembers();
      group = group.concat(this._action.opponentsUnit().deadMembers());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['ALL NOT USER'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      group = group.concat(this._action.opponentsUnit().aliveMembers());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (['FOCUS', 'PARTICIPANTS'].contains(string)) {
      var group = this._targets;
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      if (!targets.contains(this._subject)) targets.push(this._subject);
      return targets;
    }
    if (['NOT FOCUS', 'NONPARTICIPANTS'].contains(string)) {
      var group = this._action.friendsUnit().members();
      group = group.concat(this._action.opponentsUnit().members());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) {
          if (target === this._subject) continue;
          if (target.isHidden()) continue;
          if (this._targets.contains(target)) continue;

          if (target.isDead()) {
            if (Imported.KELYEP_DragonBones && target.isEnemy() && target.hasDragonBone) {
              continue;
            } else if (Imported.YEP_X_AnimatedSVEnemies && target.isEnemy()) {
              if (target.hasSVBattler() && !target.sideviewCollapse()) {
                // Ignore
              } else {
                continue;
              }
            } else if (target.isActor()) {
              // Ignore
            } else {
              continue;
            }
          }

          targets.push(target);
        }
      }
      return targets;
    }
    if (string.match(/(?:CHAR|CHARA|CHARACTER)[ ](\d+)/i)) {
      var actorId = parseInt(RegExp.$1);
      var actor = $gameActors.actor(actorId);
      if (actor && $gameParty.battleMembers().contains(actor)) {
        return [actor];
      }
    }
    if ('FIRST' === string.toUpperCase()) {
      return [this._targets[0]];
    }
    return targets;
};

BattleManager.actionConditionsMet = function(actSeq) {
  var ci = this._conditionFlags.length - 1;
  var actionName = actSeq[0];
  var actionArgs = actSeq[1];
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  if (actionName.match(/ELSE[ ]IF[ ](.*)/i)) {
    if (this._conditionFlags.length <= 0) return false;
    if (this._conditionFlags[ci]) {
      this._conditionFlags[ci] = false;
      this._trueFlags[ci] = true;
    } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
      var text = String(RegExp.$1);
      try {
        this._conditionFlags[ci] = eval(text);
        this._trueFlags[ci] = eval(text);
      } catch (e) {
        Yanfly.Util.displayError(e, text, 'ACTION SEQUENCE IF CONDITION ERROR');
        this._conditionFlags[ci] = false;
        this._trueFlags[ci] = false;
      }
    }
    return false;
  } else if (actionName.match(/ELSE[ ]*(.*)/i)) {
    if (this._conditionFlags.length <= 0) return false;
    if (this._conditionFlags[ci]) {
      this._conditionFlags[ci] = false;
      this._trueFlags[ci] = true;
    } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
      this._conditionFlags[ci] = true;
      this._trueFlags[ci] = true;
    }
    return false;
  } else if (actionName.toUpperCase() === 'END') {
    if (this._conditionFlags.length <= 0) return false;
    this._conditionFlags.pop();
    this._trueFlags.pop();
    return false;
  }
  if (this._conditionFlags.length > 0) return this._conditionFlags[ci];
  return true
};

BattleManager.actionActionAnimation = function(actionArgs) {
    if (actionArgs && actionArgs[0]) {
      var targets = this.makeActionTargets(actionArgs[0]);
    } else {
      var targets = this._targets;
    }
    var mirror = false;
    if (actionArgs && actionArgs[1]) {
      if (actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
    }
    var subject = this._subject;
    var group = targets.filter(Yanfly.Util.onlyUnique);
    var aniId = this._action.item().animationId;
    if (aniId < 0) {
      if (mirror) {
        this._logWindow.showActorAtkAniMirror(subject, group);
      } else {
        this._logWindow.showAttackAnimation(subject, group);
      }
    } else {
      this._logWindow.showNormalAnimation(group, aniId, mirror);
    }
    return true;
};

BattleManager.actionActionCommonEvent = function() {
    this._action.item().effects.forEach(function(effect) {
        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
            $gameTemp.reserveCommonEvent(effect.dataId);
        }
    }, this);
    return false;
};

BattleManager.actionActionEffect = function(actionArgs) {
    if (actionArgs && actionArgs[0]) {
      var targets = this.makeActionTargets(actionArgs[0]);
    } else {
      var targets = this._targets;
    }
    targets.forEach(function(target) {
      if (target !== undefined) {
        var alreadyDead = target.isDead();
        this.invokeAction(this._subject, target);
        if (target.isDead() && !alreadyDead) {
            target.performCollapse();
        }
      }
    }, this);
    return true;
};

BattleManager.actionAniWait = function(frames) {
    frames *= Yanfly.Param.AnimationRate || 4;
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionCastAnimation = function() {
  if (!$gameSystem.isSideView() && this._subject.isActor()) return true;
  if (!this._action.isAttack() && !this._action.isGuard() &&
  this._action.isSkill()) {
    if (this._action.item().castAnimation > 0) {
      var ani = $dataAnimations[this._action.item().castAnimation]
      this._logWindow.showAnimation(this._subject, [this._subject],
        this._action.item().castAnimation);
    }
  }
  return true;
};


BattleManager.actionClearBattleLog = function() {
    this._logWindow.clear();
    return false;
};

BattleManager.actionDeathBreak = function() {
    if (this._subject.isDead()) {
      this._targets = [];
      this._actionList = [];
      this._individualTargets = [];
      this._phase = 'phaseChange';
      return false;
    }
    return true;
};

BattleManager.actionDisplayAction = function() {
    this._logWindow.displayAction(this._subject, this._action.item());
    return false;
};

BattleManager.actionIfConditions = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var critical = false;
  if (target && target.result()) critical = target.result().critical;
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var actionName = this._actSeq[0];
  if (actionName.match(/IF[ ](.*)/i)) {
    var text = String(RegExp.$1);
    try {
      this._conditionFlags.push(eval(text));
    } catch (e) {
      this._conditionFlags.push(false);
      Yanfly.Util.displayError(e, text, 'ACTION SEQUENCE IF CONDITION ERROR');
    }
    this._trueFlags.push(false);
    var ci = this._conditionFlags.length;
  }
  return true;
};

BattleManager.actionImmortal = function(actionArgs) {
    var targets =
      this.makeActionTargets(actionArgs[0]).filter(Yanfly.Util.onlyUnique);
    try {
      var value = eval(String(actionArgs[1]).toLowerCase());
    } catch (e) {
      var value = false;
    }
    targets.forEach(function (target) {
      if (value) {
        target.addImmortal();
      } else {
        var alreadyDead = target.isDead();
        target.removeImmortal();
      }
    }, this);
    return true;
};

BattleManager.actionMotionWait = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets[0].isActor() && targets[0].isSpriteVisible()) {
      this._logWindow._waitCount += 12;
      return false;
    }
    return true;
};

BattleManager.actionPerformAction = function() {
    this._logWindow.performAction(this._subject, this._action);
    if (this._subject.isActor() && this._subject.isSpriteVisible) {
      this._logWindow._waitCount += 20;
      return false;
    }
    return true;
};

BattleManager.actionPerformFinish = function() {
    this._logWindow.performActionEnd(this._subject);
    $gameParty.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    $gameTroop.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    return true;
};

BattleManager.actionPerformStart = function() {
    this._logWindow.performActionStart(this._subject, this._action);
    return true;
};

BattleManager.actionWait = function(frames) {
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionWaitForAnimation = function() {
    this._logWindow.waitForAnimation();
    return false;
};

BattleManager.actionWaitForEffect = function() {
    this._logWindow.waitForEffect();
    return false;
};

BattleManager.actionWaitForMovement = function() {
    this._logWindow.waitForMovement();
    return false;
};

BattleManager.actionWaitForNewLine = function() {
    this._logWindow.waitForNewLine();
    return false;
};

BattleManager.actionWaitForPopups = function() {
    this._logWindow.waitForPopups();
    return false;
};

//=============================================================================
// SceneManager
//=============================================================================

Yanfly.BEC.SceneManager_snapForBackground = SceneManager.snapForBackground;
SceneManager.snapForBackground = function() {
    if ($gameParty.inBattle()) {
      var spriteset = this._scene._spriteset;
      if (spriteset.battleback1Name() === '' && 
      spriteset.battleback2Name() === '') {
        return;
      }
    }
    Yanfly.BEC.SceneManager_snapForBackground.call(this);
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.BEC.Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
Sprite_Battler.prototype.initialize = function(battler) {
    this.preSpriteInitialize(battler);
    Yanfly.BEC.Sprite_Battler_initialize.call(this, battler);
};

Sprite_Battler.prototype.preSpriteInitialize = function(battler) {
};

Yanfly.BEC.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.BEC.Sprite_Battler_update.call(this);
    if (this._postSpriteInitialized) return;
    this.postSpriteInitialize();
};

Sprite_Battler.prototype.postSpriteInitialize = function() {
    this._postSpriteInitialized = true;
};

Yanfly.BEC.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.BEC.Sprite_Battler_initMembers.call(this);
    this.adjustAnchor();
    this.setZ();
};

Sprite_Battler.prototype.adjustAnchor = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
};

Sprite_Battler.prototype.setZ = function() {
    this.z = 1;
};

Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
      if (this._battler.isSpriteVisible()) {
        var sprite = new Sprite_Damage();
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
        sprite.setup(this._battler);
        this.pushDamageSprite(sprite);
        BattleManager._spriteset.addChild(sprite);
        this._battler.clearResult();
      }
    } else {
      this._battler.clearDamagePopup();
    }
};

Sprite_Battler.prototype.pushDamageSprite = function(sprite) {
    var heightBuffer = Yanfly.Param.BECPopupOverlap;
    if (Yanfly.Param.BECNewPopBottom) {
      this._damages.push(sprite);
      this._damages.forEach(function(spr) {
        for (var i = 0; i < spr.children.length; i++) {
          childSprite = spr.children[i];
          childSprite.anchor.y += heightBuffer;
        }
      }, this);
    } else {
      this._damages.push(sprite);
      heightBuffer *= this._damages.length
      for (var i = 0; i < sprite.children.length; i++) {
        childSprite = sprite.children[i];
        childSprite.anchor.y += heightBuffer;
      }
    }
};

Yanfly.BEC.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Yanfly.BEC.Sprite_Battler_setBattler.call(this, battler);
    if (battler) battler.setBattler(this);
};

Yanfly.BEC.Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._battler && !this._battler.spriteCanMove()) return;
    Yanfly.BEC.Sprite_Battler_startMove.call(this, x, y, duration);
};

Sprite_Battler.prototype.stepForward = function() {
    this.startMove(Yanfly.Param.BECStepDist, 0, 12);
};

Sprite_Battler.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};

Sprite_Battler.prototype.stepFlinch = function() {
    var flinchX = this.x - this._homeX - Yanfly.Param.BECFlinchDist;
    var flinchY = this.y - this._homeY;
    this.startMove(flinchX, flinchY, 6);
};

Sprite_Battler.prototype.stepSubBack = function() {
    var backX = -1 * this.width / 2;
    this.startMove(backX, 0, 6);
};

Sprite_Battler.prototype.stepToSubstitute = function(focus) {
    var target = focus.battler();
    var targetX = (this.x - this._homeX) + (target._homeX - this._homeX);
    var targetY = (this.y - this._homeY) + (target._homeY - this._homeY);;
    if (focus.isActor()) targetX -= this._mainSprite.width / 2;
    if (focus.isEnemy()) targetX += this.width / 2;
    this.startMove(targetX, targetY, 1);
};

Sprite_Battler.prototype.startMotion = function(motionType) {
};

Sprite_Battler.prototype.forceMotion = function(motionType) {
};

Sprite_Battler.prototype.refreshMotion = function() {
};

Sprite_Battler.prototype.startActionMotion = function() {
};

Sprite_Battler.prototype.moveForward = function(distance, frames) {
    distance = parseInt(distance);
    frames = parseInt(frames);
    if (this._battler.isActor()) distance *= -1;
    var moveX = this.x - this._homeX + distance;
    var moveY = this.y - this._homeY;
    this.startMove(moveX, moveY, frames);
};

Sprite_Battler.prototype.moveToPoint = function(pointX, pointY, frames) {
    pointX = parseInt(pointX);
    pointY = parseInt(pointY);
    var targetX = pointX - this._homeX;
    var targetY = pointY - this._homeY;
    this.startMove(targetX, targetY, frames);
};

Sprite_Battler.prototype.setMirror = function(value) {
    if (this.scale.x > 0 && value) this.scale.x *= -1;
    if (this.scale.x < 0 && !value) this.scale.x *= -1;
};

Sprite_Battler.prototype.isPopupPlaying = function() {
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; ++i) {
        return this._damages[i].isPlaying();
      }
    }
    return false;
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Sprite_Actor.prototype.preSpriteInitialize = function(battler) {
    Sprite_Battler.prototype.preSpriteInitialize.call(this, battler);
};

Sprite_Actor.prototype.postSpriteInitialize = function() {
    Sprite_Battler.prototype.postSpriteInitialize.call(this);
};

Yanfly.BEC.Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
    if (this._hideShadows === undefined) {
      this._hideShadows = Yanfly.Param.BECShowShadows;
    }
    if (!this._hideShadows) return this._shadowSprite.visible = false;
    Yanfly.BEC.Sprite_Actor_updateShadow.call(this);
};

Sprite_Actor.prototype.setActorHome = function(index) {
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameParty.maxBattleMembers();
    var partySize = $gameParty.battleMembers().length;
    var statusHeight = eval(Yanfly.Param.BECCommandRows);
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    if ($gameSystem.isSideView()) {
      var code = Yanfly.Param.BECHomePosX;
      try {
        var homeX = eval(code);
      } catch (e) {
        var homeX = 0;
        Yanfly.Util.displayError(e, code, 'SIDE VIEW HOME X FORMULA ERROR');
      }
      var code = Yanfly.Param.BECHomePosY;
      try {
        var homeY = eval(code);
      } catch (e) {
        var homeY = 0;
        Yanfly.Util.displayError(e, code, 'SIDE VIEW HOME Y FORMULA ERROR');
      }
    } else {
      var code = Yanfly.Param.BECFrontPosX;
      try {
        var homeX = eval(code);
      } catch (e) {
        var homeX = 0;
        Yanfly.Util.displayError(e, code, 'FRONT VIEW HOME X FORMULA ERROR');
      }
      var code = Yanfly.Param.BECFrontPosY;
      try {
        var homeY = eval(code);
      } catch (e) {
        var homeY = 0;
        Yanfly.Util.displayError(e, code, 'FRONT VIEW HOME Y FORMULA ERROR');
      }
    }
    this._checkAliveStatus = false;
    if ($gameParty.battleMembers()[index]) {
      var actor = $gameParty.battleMembers()[index];
      if (actor.isAlive()) this._checkAliveStatus = true;
    }
    this.setHome(homeX, homeY);
    this.moveToStartPosition();
};

Sprite_Actor.prototype.moveToStartPosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    if ($gameSystem.isSideView() && this._checkAliveStatus) {
      this.startMove(300, 0, 0);
    }
};

Sprite_Actor.prototype.setupMotion = function() {
};

Sprite_Actor.prototype.forceMotion = function(motionType) {
    var newMotion = Sprite_Actor.MOTIONS[motionType];
    this._motion = newMotion;
    this._motionCount = 0;
    this._pattern = 0;
};

Sprite_Actor.prototype.updateTargetPosition = function() {
};

Sprite_Actor.prototype.updateMotion = function() {
    this.updateMotionCount();
};

Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
};

Sprite_Actor.prototype.stepForward = function() {
    this.startMove(-Yanfly.Param.BECStepDist, 0, 12);
};

Sprite_Actor.prototype.stepFlinch = function() {
    var flinchX = this.x - this._homeX + Yanfly.Param.BECFlinchDist;
    var flinchY = this.y - this._homeY;
    this.startMove(flinchX, flinchY, 6);
};

Sprite_Actor.prototype.stepSubBack = function() {
    var backX = this._mainSprite.width / 2;
    this.startMove(backX, 0, 6);
};

Yanfly.BEC.Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    var name = this._actor.battlerName();
    var needUpdate = false;
    if (this._battlerName !== name) needUpdate = true;
    Yanfly.BEC.Sprite_Actor_updateBitmap.call(this);
    if (needUpdate) this.adjustAnchor();
};

Sprite_Actor.prototype.adjustAnchor = function() {
    if (!this._mainSprite) return;
    this._mainSprite.anchor.x = this._actor.anchorX();
    this._mainSprite.anchor.y = this._actor.anchorY();
};

Yanfly.BEC.Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
Sprite_Actor.prototype.updateFrame = function() {
    Yanfly.BEC.Sprite_Actor_updateFrame.call(this);
    if (!this._mainSprite) return;
    if (!this._mainSprite.bitmap) return;
    if (this._mainSprite.bitmap.width > 0 && !this.bitmap) {
      var sw = this._mainSprite.bitmap.width / 9;
      var sh = this._mainSprite.bitmap.height / 6;
      this.bitmap = new Bitmap(sw, sh);
    }
};

Yanfly.BEC.Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    var actor = this._actor;
    if (!actor) return;
    var motionGuard = Sprite_Actor.MOTIONS['guard'];
    if (this._motion === motionGuard && !BattleManager.isInputting()) return;
    var stateMotion = actor.stateMotionIndex();
    if (actor.isInputting() || actor.isActing()) {
      this.startMotion(actor.idleMotion());
    } else if (stateMotion === 3) {
      this.startMotion(actor.deadMotion());
    } else if (stateMotion === 2) {
      this.startMotion(actor.sleepMotion());
    } else if (actor.isChanting()) {
      this.startMotion(actor.chantMotion());
    } else if (actor.isGuard() || actor.isGuardWaiting()) {
      this.startMotion(actor.guardMotion());
    } else if (stateMotion === 1) {
      this.startMotion(actor.abnormalMotion());
    } else if (actor.isDying()) {
      this.startMotion(actor.dyingMotion());
    } else if (actor.isUndecided()) {
      this.startMotion(actor.idleMotion());
    } else {
      this.startMotion(actor.waitMotion());
    }
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

Sprite_Enemy.prototype.preSpriteInitialize = function(battler) {
    Sprite_Battler.prototype.preSpriteInitialize.call(this, battler);
    this._visualSelect = Yanfly.Param.BECEnemySelect;
    if (this._visualSelect) this.createVisualSelectWindow();
};

Yanfly.BEC.Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    Yanfly.BEC.Sprite_Enemy_update.call(this);
    this.addVisualSelectWindow();
    this.checkExistInSceneChildren()
};

Sprite_Enemy.prototype.addVisualSelectWindow = function() {
    if (!this._visualSelect) return;
    if (this._addedVisualSelect) return;
    if (!SceneManager._scene) return;
    var scene = SceneManager._scene;
    if (!scene._windowLayer) return;
    this._addedVisualSelect = true;
    scene.addChild(this._visualSelectWindow);
};

Sprite_Enemy.prototype.createVisualSelectWindow = function() {
    this._visualSelectWindow = new Window_EnemyVisualSelect();
};

Yanfly.BEC.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Yanfly.BEC.Sprite_Enemy_setBattler.call(this, battler);
    if (this._visualSelectWindow) this._visualSelectWindow.setBattler(battler);
};

Sprite_Enemy.prototype.checkExistInSceneChildren = function() {
    if (!this._visualSelect) return;
    if (!SceneManager._scene) return;
    var scene = SceneManager._scene;
    if (!scene._windowLayer) return;
    if (!scene.children.contains(this._visualSelectWindow)) {
      this._addedVisualSelect = true;
      scene.addChild(this._visualSelectWindow);
    }
};

//=============================================================================
// Sprite_Weapon
//=============================================================================

Yanfly.BEC.Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    Yanfly.BEC.Sprite_Weapon_setup.call(this, weaponImageId);
    this._animationCount -= 1; // Synch with sprite
};

//=============================================================================
// Sprite_Damage
//=============================================================================

Yanfly.BEC.Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    Yanfly.BEC.Sprite_Damage_initialize.call(this);
    this._duration = Yanfly.Param.BECPopupDur;
};

Sprite_Damage.prototype.setup = function(target) {
    this._result = target.shiftDamagePopup();
    var result = this._result;
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
};

Sprite_Damage.prototype.setupCriticalEffect = function() {
    this._flashColor = eval('[' + Yanfly.Param.BECCritPopup + ']');
    this._flashDuration = Yanfly.Param.BECCritDur;
};

Yanfly.BEC.Sprite_Damage_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
    Yanfly.BEC.Sprite_Damage_update.call(this);
    if (this._duration <= 0 && this.parent) {
        this.parent.removeChild(this);
    }
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Yanfly.BEC.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
    Yanfly.BEC.Sprite_StateIcon_update.call(this);
    this.updateMirror();
};

Sprite_StateIcon.prototype.updateMirror = function() {
    if (this.parent.scale.x < 0) this.scale.x = -1 * Math.abs(this.scale.x);
    if (this.parent.scale.x > 0) this.scale.x = Math.abs(this.scale.x);
};

//=============================================================================
// Sprite_StateOverlay
//=============================================================================

Yanfly.BEC.Sprite_StateOverlay_update = Sprite_StateOverlay.prototype.update;
Sprite_StateOverlay.prototype.update = function() {
    Yanfly.BEC.Sprite_StateOverlay_update.call(this);
    this.updateMirror();
};

Sprite_StateOverlay.prototype.updateMirror = function() {
    if (this.parent.scale.x < 0) this.scale.x = -1 * Math.abs(this.scale.x);
    if (this.parent.scale.x > 0) this.scale.x = Math.abs(this.scale.x);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isBusy = function() {
    return false;
};

Yanfly.BEC.Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    Yanfly.BEC.Spriteset_Battle_update.call(this);
    this.updateZCoordinates();
};

Spriteset_Battle.prototype.updateZCoordinates = function() {
  if (Imported.YEP_ImprovedBattlebacks) {
    this.updateBattlebackGroupRemove();
  } else {
    this._battleField.removeChild(this._back1Sprite);
    this._battleField.removeChild(this._back2Sprite);
  }
  this._battleField.children.sort(this.battleFieldDepthCompare);
  if (Imported.YEP_ImprovedBattlebacks) {
    this.updateBattlebackGroupAdd();
  } else {
    this._battleField.addChildAt(this._back2Sprite, 0);
    this._battleField.addChildAt(this._back1Sprite, 0);
  }
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
    var priority = BattleManager.getSpritePriority();
    if (a._battler && b._battler && priority !== 0) {
      if (priority === 1) {
        if (a._battler.isActor() && b._battler.isEnemy()) return 1;
        if (a._battler.isEnemy() && b._battler.isActor()) return -1;
      } else if (priority === 2) {
        if (a._battler.isActor() && b._battler.isEnemy()) return -1;
        if (a._battler.isEnemy() && b._battler.isActor()) return 1;
      }
    }
    if (a.z < b.z) return -1;
    if (a.z > b.z) return 1;
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return 0;
};

Spriteset_Battle.prototype.isPopupPlaying = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isPopupPlaying();
    });
};

Yanfly.BEC.Spriteset_Battle_battlerSprites =
  Spriteset_Battle.prototype.battlerSprites;
Spriteset_Battle.prototype.battlerSprites = function() {
  var sprites = Yanfly.BEC.Spriteset_Battle_battlerSprites.call(this);
  var length = sprites.length;
  var result = [];
  for (var i = 0; i < length; ++i) {
    var sprite = sprites[i];
    if (!sprite) continue;
    if (!sprite._battler) continue;
    result.push(sprite);
  }
  return result;
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.clearActionSequenceSettings = function() {
};

Game_Temp.prototype.forceActionQueue = function(command) {
  if (!this._forceActionQueue) {
    this._forceActionQueue = JsonEx.makeDeepCopy($dataCommonEvents[1]);
    this._forceActionQueue.list = [];
  }
  this._forceActionQueue.list.push(command);
};

Yanfly.BEC.Game_Temp_clearCommonEvent = Game_Temp.prototype.clearCommonEvent;
Game_Temp.prototype.clearCommonEvent = function() {
    this._forceActionQueue = undefined;
    Yanfly.BEC.Game_Temp_clearCommonEvent.call(this);
};

Yanfly.BEC.Game_Temp_isCommonEventReserved =
  Game_Temp.prototype.isCommonEventReserved;
Game_Temp.prototype.isCommonEventReserved = function() {
  if (this._forceActionQueue) return true;
  return Yanfly.BEC.Game_Temp_isCommonEventReserved.call(this);
};

Yanfly.BEC.Game_Temp_reservedCommonEvent =
  Game_Temp.prototype.reservedCommonEvent;
Game_Temp.prototype.reservedCommonEvent = function() {
  if (this._forceActionQueue) {
    return this._forceActionQueue;
  }
  return Yanfly.BEC.Game_Temp_reservedCommonEvent.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.BEC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.BEC.Game_System_initialize.call(this);
    this.initBattleSystem();
};

Game_System.prototype.initBattleSystem = function() {
    this._battleSystem = Yanfly.Param.BECSystem.toLowerCase();
};

Game_System.prototype.getBattleSystem = function() {
    if (this._battleSystem === undefined) this.initBattleSystem();
    return this._battleSystem;
};

Game_System.prototype.setBattleSystem = function(type) {
    this._battleSystem = type.toLowerCase();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.BEC.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.BEC.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setBattleSys' && !$gameParty.inBattle()) {
      this.setBattleSystem(args[0]);
    }
};

Game_Interpreter.prototype.setBattleSystem = function(value) {
    $gameSystem.setBattleSystem(value);
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.speed = function() {
    var user = this.subject(); var a = user;
    var maxhp = user.mhp; var mhp = user.mhp; var hp = user.hp;
    var maxmp = user.mmp; var mmp = user.mmp; var mp = user.mp;
    var maxtp = user.maxTp(); var mtp = user.maxTp(); var tp = user.tp;
    var atk = user.atk; var def = user.def; var mat = user.mat;
    var int = user.mat; var mdf = user.mdf; var res = user.res;
    var agi = user.agi; var luk = user.luk;
    var code = Yanfly.Param.BECActionSpeed;
    try {
      var speed = eval(code);
    } catch (e) {
      var speed = 0;
      Yanfly.Util.displayError(e, code, 'ACTION SPEED FORMULA ERROR');
    }
    if (this.item()) speed += this.item().speed;
    if (this.isAttack()) speed += this.subject().attackSpeed();
    return speed;
};

Yanfly.BEC.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    target._result = null;
    target._result = new Game_ActionResult();
    this.subject()._result = null;
    this.subject()._result = new Game_ActionResult();
    Yanfly.BEC.Game_Action_apply.call(this, target);
    if ($gameParty.inBattle()) {
      target.startDamagePopup();
      target.performResultEffects();
      if (target !== this.subject()) this.subject().startDamagePopup();
    }
};

Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
    this.subject().attackStates().forEach(function(stateId) {
        var chance = effect.value1;
        chance *= target.stateRate(stateId);
        chance *= this.subject().attackStatesRate(stateId);
        chance *= this.lukEffectRate(target);
        if (Math.random() < chance) {
            if (stateId === target.deathStateId()) {
              if (target.isImmortal()) target.removeImmortal();
            }
            target.addState(stateId);
            this.makeSuccess(target);
        }
    }.bind(this), target);
};

Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    var stateId = effect.dataId;
    var chance = effect.value1;
    if (!this.isCertainHit()) {
      chance *= target.stateRate(stateId);
      chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
      if (stateId === target.deathStateId()) {
        if (target.isImmortal()) target.removeImmortal();
      }
      target.addState(stateId);
      this.makeSuccess(target);
    }
};

Yanfly.BEC.Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function() {
    if ($gameParty.inBattle()) return;
    Yanfly.BEC.Game_Action_applyGlobal.call(this);
};

Yanfly.BEC.Game_Action_needsSelection = Game_Action.prototype.needsSelection;
Game_Action.prototype.needsSelection = function() {
    if ($gameParty.inBattle() && this.item().scope === 0) return false;
    if ($gameParty.inBattle() && BattleManager.isForceSelection()) return true;
    return Yanfly.BEC.Game_Action_needsSelection.call(this);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BEC.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    Yanfly.BEC.Game_BattlerBase_recoverAll.call(this);
    this.refresh();
    if ($gameParty.inBattle()) this.forceMotionRefresh();
};

Game_BattlerBase.prototype.requestStatusRefresh = function() {
    this._statusRefreshRequested = true;
};

Game_BattlerBase.prototype.isStatusRefreshRequested = function() {
    return this._statusRefreshRequested;
};

Game_BattlerBase.prototype.completetStatusRefreshRequest = function() {
    this._statusRefreshRequested = false;
};

Game_BattlerBase.prototype.updateStateTicks = function() {
    var needRefresh = false;
    for (var i = 0; i < this._states.length; ++i) {
      var stateId = this._states[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (state.autoRemovalTiming !== 2) continue;
      if (!this._stateTurns[stateId]) continue;
      var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
      var shown1 = Math.ceil(this._stateTurns[stateId]);
      this._stateTurns[stateId] -= value;
      var shown2 = Math.ceil(this._stateTurns[stateId]);
      if (shown1 !== shown2) needRefresh = true;
      if (this._stateTurns[stateId] <= 0) this.removeState(stateId);
    }
    if (needRefresh) this.refresh();
};

Game_BattlerBase.prototype.isBypassUpdateTurns = function() {
    if ($gameTroop.isEventRunning()) return true;
    return false;
};

Game_BattlerBase.prototype.updateStateTurns = function() {
    this.updateStateTurnEnd();
};

Game_BattlerBase.prototype.updateStateTurnTiming = function(timing) {
    if (this.isBypassUpdateTurns()) return;
    var statesRemoved = [];
    this._freeStateTurn = this._freeStateTurn || [];
    for (var i = 0; i < this._states.length; ++i) {
      var stateId = this._states[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (state.autoRemovalTiming !== timing) continue;
      if (!this._stateTurns[stateId]) continue;
      if (this._freeStateTurn.contains(stateId)) {
        var index = this._freeStateTurn.indexOf(stateId);
        this._freeStateTurn.splice(index, 1);
      } else {
        this._stateTurns[stateId] -= 1;
      }
      if (this._stateTurns[stateId] <= 0) statesRemoved.push(stateId);
    }
    for (var i = 0; i < statesRemoved.length; ++i) {
      var stateId = statesRemoved[i];
      this.removeState(stateId);
    }
};

Game_BattlerBase.prototype.updateStateActionStart = function() {
    this.updateStateTurnTiming(3);
};

Game_BattlerBase.prototype.updateStateActionEnd = function() {
    this.updateStateTurnTiming(1);
};

Game_BattlerBase.prototype.updateStateTurnStart = function() {
    this.updateStateTurnTiming(4);
};

Game_BattlerBase.prototype.updateStateTurnEnd = function() {
    this.updateStateTurnTiming(2);
};

Game_BattlerBase.prototype.updateBuffTicks = function() {
    var needRefresh = false;
    for (var i = 0; i < this._buffTurns.length; i++) {
      if (this._buffTurns[i] <= 0) continue;
      var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
      var shown1 = Math.ceil(this._buffTurns[i]);
      this._buffTurns[i] -= value;
      var shown2 = Math.ceil(this._buffTurns[i]);
      if (shown1 !== shown2) needRefresh = true;
      if (this._buffTurns[i] <= 0) this.removeBuff(i);
    }
    if (needRefresh) this.refresh();
};

Game_BattlerBase.prototype.timedTick = function() {
    return 1 * BattleManager.tickRate();
};

Yanfly.BEC.Game_BattlerBase_isStateResist =
    Game_BattlerBase.prototype.isStateResist;
Game_BattlerBase.prototype.isStateResist = function(stateId) {
    if (stateId === this.deathStateId() && this.isImmortal()) return true;
    return Yanfly.BEC.Game_BattlerBase_isStateResist.call(this, stateId);
};

Game_BattlerBase.prototype.isImmortal = function() {
    return this._immortalState;
};

Yanfly.BEC.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    this.requestStatusRefresh();
    Yanfly.BEC.Game_BattlerBase_paySkillCost.call(this, skill);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BEC.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Yanfly.BEC.Game_Battler_useItem.call(this, item);
    this.refresh();
    if (!$gameParty.inBattle()) return;
    this.increaseSelfTurnCount();
    this.updateStateActionStart();
};

Yanfly.BEC.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.BEC.Game_Battler_onBattleStart.call(this);
    this._freeStateTurn = [];
    this._immortalState = false;
    this._selfTurnCount = 0;
};

Yanfly.BEC.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.BEC.Game_Battler_onBattleEnd.call(this);
    this._freeStateTurn = [];
    this._immortalState = false;
};

Yanfly.BEC.Game_Battler_isSelected = Game_Battler.prototype.isSelected;
Game_Battler.prototype.isSelected = function() {
    if ($gameParty.inBattle() && BattleManager.isAllSelection()) {
      if (!this.isAppeared()) return false;
      var action = BattleManager.inputtingAction();
      if (action && action.item()) {
        if (this.isDead() && this.isEnemy()) return false;
        if (this.isDead() && this.isActor()) return action.isForDeadFriend();
        if (action.isForFriend() && this.isActor()) return true;
        if (action.isForOpponent() && this.isEnemy()) return true;
      }
    }
    return Yanfly.BEC.Game_Battler_isSelected.call(this);
};

Yanfly.BEC.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    this.clearResult();
    var lifeState = this.isAlive();
    Yanfly.BEC.Game_Battler_regenerateAll.call(this);
    if ($gameParty.inBattle()) {
      if (!BattleManager.timeBasedStates()) this.updateStateTurns();
      if (!BattleManager.timeBasedBuffs()) {
        this.updateBuffTurns();
        this.removeBuffsAuto();
      }
      if (this.isDead() && lifeState === true) {
        this.performCollapse();
      }
      this.startDamagePopup();
    }
};

Game_Battler.prototype.addImmortal = function() {
    this._immortalState = true;
};

Game_Battler.prototype.removeImmortal = function() {
    var alreadyDead = this.isDead();
    this._immortalState = false;
    this.refresh();
    if (this.isDead() && !alreadyDead) this.performCollapse();
};

Yanfly.BEC.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    Yanfly.BEC.Game_Battler_removeState.call(this, stateId);
};

Game_Battler.prototype.clearDamagePopup = function() {
    this._damagePopup = [];
};

Game_Battler.prototype.isDamagePopupRequested = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.length > 0;
};

Game_Battler.prototype.startDamagePopup = function() {
    var result = this.result();
    if (result.missed || result.evaded) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.hpAffected) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.mpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      this._damagePopup.push(copyResult);
    }
};

Game_Battler.prototype.shiftDamagePopup = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.shift();
};

Yanfly.BEC.Game_Battler_performCollapse =
    Game_Battler.prototype.performCollapse;
Game_Battler.prototype.performCollapse = function() {
    Yanfly.BEC.Game_Battler_performCollapse.call(this);
    if ($gameParty.inBattle()) this.forceMotion(this.deadMotion());
};

Game_Battler.prototype.performResultEffects = function() {
    var result = this.result();
    if (result.missed && result.physical) this.performMiss();
    if (result.evaded) {
      if (result.physical) {
        this.performEvasion();
      } else {
        this.performMagicEvasion();
      }
    }
    if (result.hpAffected) {
      if (result.hpDamage > 0 && !result.drain) {
        this.performDamage();
      }
      if (result.hpDamage < 0) {
        this.performRecovery();
      }
    }
    if (this.isAlive() && result.mpDamage !== 0 && result.mpDamage < 0) {
      this.performRecovery();
    }
    if (this.isAlive() && result.tpDamage !== 0 && result.tpDamage < 0) {
      this.performRecovery();
    }
};

Yanfly.BEC.Game_Battler_performDamage =
  Game_Battler.prototype.performDamage;
Game_Battler.prototype.performDamage = function() {
    Yanfly.BEC.Game_Battler_performDamage.call(this);
    this.performFlinch();
};

Yanfly.BEC.Game_Battler_performMiss = Game_Battler.prototype.performMiss;
Game_Battler.prototype.performMiss = function() {
    Yanfly.BEC.Game_Battler_performMiss.call(this);
    this.performFlinch();
};

Yanfly.BEC.Game_Battler_performEvasion =
    Game_Battler.prototype.performEvasion;
Game_Battler.prototype.performEvasion = function() {
    Yanfly.BEC.Game_Battler_performEvasion.call(this);
    this.performFlinch();
};

Yanfly.BEC.Game_Battler_performMagicEvasion =
    Game_Battler.prototype.performMagicEvasion;
Game_Battler.prototype.performMagicEvasion = function() {
    Yanfly.BEC.Game_Battler_performMagicEvasion.call(this);
    this.performFlinch();
};

Game_Battler.prototype.performFlinch = function() {
    if (this._flinched || !$gameSystem.isSideView()) return;
    this._flinched = true;
    this.spriteStepFlinch();
};

Yanfly.BEC.Game_Battler_performReflection =
    Game_Battler.prototype.performReflection;
Game_Battler.prototype.performReflection = function() {
    Yanfly.BEC.Game_Battler_performReflection.call(this);
    if (!$gameSystem.isSideView() && this.isActor()) return;
    var animationId = this.reflectAnimationId();
    var mirror = this.isActor();
    this.startAnimation(animationId, mirror, 0);
};

Yanfly.BEC.Game_Battler_performSubstitute =
    Game_Battler.prototype.performSubstitute;
Game_Battler.prototype.performSubstitute = function(target) {
    Yanfly.BEC.Game_Battler_performSubstitute.call(this, target);
    if (!$gameSystem.isSideView()) return;
    this._flinched = true;
    if (BattleManager._action.isForAll()) {
      this.spriteStepForward();
      target.spriteStepSubBack();
    } else {
      this.spriteStepToSubstitute(target);
      target.spriteStepSubBack();
    }
};

Game_Battler.prototype.setBattler = function(sprite) {
    BattleManager.registerSprite(this, sprite);
};

Game_Battler.prototype.battler = function() {
    return BattleManager.getSprite(this);
};

Game_Battler.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().startMotion(motionType);
    }
};

Game_Battler.prototype.forceMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().forceMotion(motionType);
    }
};

Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
    this._weaponImageId = weaponImageId;
    if (this.battler()) {
      this.battler().setupWeaponAnimation();
    }
};

Game_Battler.prototype.performActionStart = function(action) {
    if (!action.isGuard()) {
        this.setActionState('acting');
        this.spriteStepForward();
    }
};

Yanfly.BEC.Game_Battler_performActionEnd =
    Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Yanfly.BEC.Game_Battler_performActionEnd.call(this);
    this.spriteReturnHome();
};

Game_Battler.prototype.spriteStepForward = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepForward();
    }
};

Game_Battler.prototype.spriteStepBack = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepBack();
    }
};

Game_Battler.prototype.spriteStepSubBack = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepSubBack();
    }
};

Game_Battler.prototype.spriteStepToSubstitute = function(target) {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepToSubstitute(target);
    }
};

Game_Battler.prototype.spriteStepFlinch = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepFlinch();
    }
};

Game_Battler.prototype.spriteReturnHome = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this._flinched = false;
      this.spriteFaceForward();
      this.battler().stepBack();
      if (this.numActions() <= 0) {
        this.setActionState('undecided');
      }
      this.battler().refreshMotion();
    }
};

Game_Battler.prototype.reflectAnimationId = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.reflectAnimationId > 0) return state.reflectAnimationId;
    }
    return Yanfly.Param.BECReflectAni;
};

Game_Battler.prototype.spriteCanMove = function() {
    if (!$gameSystem.isSideView()) return false;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.spriteCannotMove) return false;
    }
    return this.canMove();
};

Game_Battler.prototype.spritePosX = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler().x;
    } else if (this.battler()) {
      return this.battler().x;
    } else {
      return 0;
    }
};

Game_Battler.prototype.spritePosY = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler().y;
    } else if (this.battler()) {
      return this.battler().y;
    } else {
      return 0;
    }
};

Game_Battler.prototype.spriteWidth = function() {
    if ($gameSystem.isSideView() && this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.width;
    } else if (this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.width;
    } else {
      return 1;
    }
};

Game_Battler.prototype.spriteHeight = function() {
    if ($gameSystem.isSideView() && this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.height;
    } else if (this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.height;
    } else {
      return 1;
    }
};

Game_Battler.prototype.anchorX = function() {
    return Yanfly.Param.BECAnchorX;
};

Game_Battler.prototype.anchorY = function() {
    return Yanfly.Param.BECAnchorY;
};

Game_Battler.prototype.spriteHomeX = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._homeX;
    } else {
      return 0;
    }
};

Game_Battler.prototype.spriteHomeY = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._homeY;
    } else {
      return 0;
    }
};

Game_Battler.prototype.setMirror = function(value) {
    if ($gameSystem.isSideView() && this.battler() && this.spriteCanMove()) {
      this.battler().setMirror(value);
    }
};

Game_Battler.prototype.spriteFaceForward = function() {
    this.setMirror(false);
};

Game_Battler.prototype.spriteFaceBackward = function() {
    this.setMirror(true);
};

Game_Battler.prototype.spriteFacePoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceBackward();
    } else {
      this.spriteFaceForward();
    }
};

Game_Battler.prototype.spriteFaceAwayPoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceForward();
    } else {
      this.spriteFaceBackward();
    }
};

Game_Battler.prototype.spriteFaceTarget = function(target) {
    if (!target) return;
    var pointX = target.spritePosX();
    var pointY = target.spritePosY();
    this.spriteFacePoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceAwayTarget = function(target) {
    if (!target) return;
    var pointX = target.spritePosX();
    var pointY = target.spritePosY();
    this.spriteFaceAwayPoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceHome = function() {
    var pointX = this.spriteHomeX();
    var pointY = this.spriteHomeY();
    this.spriteFacePoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceAwayHome = function() {
    var pointX = target.spriteHomeX();
    var pointY = target.spriteHomeY();
    this.spriteFaceAwayPoint(pointX, pointY);
};

Game_Battler.prototype.attackMotion = function() {
    return 'thrust';
};

Game_Battler.prototype.performAttack = function() {
};

Game_Battler.prototype.forceMotionRefresh = function() {
    if (!$gameParty.inBattle()) return;
    if (this.battler()) this.battler().refreshMotion();
};

Game_Battler.prototype.requestMotionRefresh = function() {
    var deadMotion = this.deadMotion();
    if (this.isDead() && this._motionType !== deadMotion) {
      this.requestMotion(deadMotion);
    }
    if (this.isDead() && this._motionType === deadMotion) return;
    if (this._motionType === 'victory') return;
    if (this._motionType === 'escape' && !BattleManager.isInputting()) return;
    if (this._motionType === 'guard' && !BattleManager.isInputting()) return;
    this.clearMotion();
    if (this.battler() && BattleManager.isInputting()) {
      this.battler().refreshMotion();
    }
};

Game_Battler.prototype.onTurnStart = function() {
    this.updateStateTurnStart();
};

Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
    if (BattleManager.isTurnBased()) {
      this.regenerateAll();
    } else if (BattleManager.isTickBased() && !BattleManager.isTurnEnd()) {
      this.regenerateAll();
    }
    this.removeStatesAuto(2);
};

Yanfly.BEC.Game_Battler_onAllActionsEnd =
    Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    Yanfly.BEC.Game_Battler_onAllActionsEnd.call(this);
    if (!BattleManager._processTurn) this.updateStateActionEnd();
};

Game_Battler.prototype.updateTick = function() {
    if (BattleManager.timeBasedStates()) this.updateStateTicks();
    if (BattleManager.timeBasedBuffs()) this.updateBuffTicks();
};

Game_Battler.prototype.increaseSelfTurnCount = function() {
    if (this._selfTurnCount === undefined) this._selfTurnCount = 0;
    this._selfTurnCount += 1;
};

Game_Battler.prototype.turnCount = function() {
    if (BattleManager.isTurnBased()) return $gameTroop.turnCount();
    if (BattleManager.isTickBased() && Yanfly.Param.BECAISelfTurn) {
      return this._selfTurnCount;
    }
    return $gameTroop.turnCount();
};

Game_Battler.prototype.createActions = function() {
    if (this.currentAction()) return;
    this.makeActions();
};

Yanfly.BEC.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    Yanfly.BEC.Game_Battler_addState.call(this, stateId);
    if (this.canAddStateFreeTurn(stateId)) this.setStateFreeTurn(stateId);
};

Game_Battler.prototype.canAddStateFreeTurn = function(stateId) {
    if (!$gameParty.inBattle()) return false;
    if (BattleManager._subject !== this) return false;
    if ($dataStates[stateId].autoRemovalTiming !== 1) return false;
    if (Imported.YEP_BuffsStatesCore) {
      if ($dataStates[stateId].reapplyRules === 0) return false;
    }
    return true;
};

Game_Battler.prototype.setStateFreeTurn = function(stateId) {
    this._freeStateTurn = this._freeStateTurn || [];
    this._freeStateTurn.push(stateId);
};

Game_Battler.prototype.idleMotion = function() {
    return 'walk';
};

Game_Battler.prototype.deadMotion = function() {
    return 'dead';
};

Game_Battler.prototype.sleepMotion = function() {
    return 'sleep';
};

Game_Battler.prototype.chantMotion = function() {
    return 'chant';
};

Game_Battler.prototype.guardMotion = function() {
    return 'guard';
};

Game_Battler.prototype.abnormalMotion = function() {
    return 'abnormal';
};

Game_Battler.prototype.dyingMotion = function() {
    return 'dying';
};

Game_Battler.prototype.waitMotion = function() {
    return 'wait';
};

Yanfly.BEC.Game_Battler_startAnimation = Game_Battler.prototype.startAnimation;
Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
  if (!$dataAnimations[animationId]) return;
  Yanfly.BEC.Game_Battler_startAnimation.call(this, animationId, mirror, delay);
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BEC.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    this._anchorX = undefined;
    this._anchorY = undefined;
    Yanfly.BEC.Game_Actor_refresh.call(this);
    if ($gameParty.inBattle()) this.requestStatusRefresh();
};

Game_Actor.prototype.isSpriteVisible = function() {
    if ($gameSystem.isSideView()) return true;
    return Yanfly.Param.BECFrontSprite;
};

Game_Actor.prototype.reflectAnimationId = function() {
    if (this.actor().reflectAnimationId > 0) {
      return this.actor().reflectAnimationId;
    }
    if (this.currentClass().reflectAnimationId > 0) {
      return this.currentClass().reflectAnimationId;
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.reflectAnimationId > 0) {
        return equip.reflectAnimationId;
      }
    }
    return Game_Battler.prototype.reflectAnimationId.call(this);
};

Game_Actor.prototype.spriteCanMove = function() {
    if (this.actor().spriteCannotMove) return false;
    if (this.currentClass().spriteCannotMove) return false;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.spriteCannotMove) return false;
    }
    return Game_Battler.prototype.spriteCanMove.call(this);
};

Game_Actor.prototype.spriteWidth = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._mainSprite.width;
    } else {
      return 1;
    }
};

Game_Actor.prototype.spriteHeight = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._mainSprite.height;
    } else {
      return 1;
    }
};

Game_Actor.prototype.anchorX = function() {
    if (this._anchorX !== undefined) return this._anchorX;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.anchorX !== undefined) {
        this._anchorX = obj.anchorX;
        return this._anchorX;
      }
    }
    length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.anchorX !== undefined) {
        this._anchorX = obj.anchorX;
        return this._anchorX;
      }
    }
    if (this.currentClass().anchorX !== undefined) {
      this._anchorX = this.currentClass().anchorX;
      return this._anchorX;
    }
    this._anchorX = this.actor().anchorX;
    return this._anchorX;
};

Game_Actor.prototype.anchorY = function() {
    if (this._anchorY !== undefined) return this._anchorY;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.anchorY !== undefined) {
        this._anchorY = obj.anchorY;
        return this._anchorY;
      }
    }
    length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.anchorY !== undefined) {
        this._anchorY = obj.anchorY;
        return this._anchorY;
      }
    }
    if (this.currentClass().anchorY !== undefined) {
      this._anchorY = this.currentClass().anchorY;
      return this._anchorY;
    }
    this._anchorY = this.actor().anchorY;
    return this._anchorY;
};

Game_Actor.prototype.spriteFacePoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceForward();
    } else {
      this.spriteFaceBackward();
    }
};

Game_Actor.prototype.spriteFaceAwayPoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceBackward();
    } else {
      this.spriteFaceForward();
    }
};

Game_Actor.prototype.performAttack = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        this.forceMotion('thrust');
      } else if (attackMotion.type === 1) {
        this.forceMotion('swing');
      } else if (attackMotion.type === 2) {
        this.forceMotion('missile');
      }
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

Game_Actor.prototype.attackMotion = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        return 'thrust';
      } else if (attackMotion.type === 1) {
        return 'swing';
      } else if (attackMotion.type === 2) {
        return 'missile';
      }
    };
    return 'thrust';
};

Game_Actor.prototype.performEscapeSuccess = function() {
    if (this.battler()) {
      this.performEscape();
      this.battler().startMove(300, 0, 60);
    }
};

//=============================================================================
// Game_Enemy
//=============================================================================

if (!Game_Enemy.prototype.skills) {
Game_Enemy.prototype.skills = function() {
  var skills = []
  for (var i = 0; i < this.enemy().actions.length; ++i) {
    var skill = $dataSkills[this.enemy().actions[i].skillId]
    if (skill) skills.push(skill);
  }
  return skills;
}
}; // (!Game_Enemy.prototype.skills)

Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    if (!$gameSystem.isSideView() || !this.spriteCanMove()) {
      this.requestEffect('whiten');
    }
};

Yanfly.BEC.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if ($gameSystem.isSideView()) {
      Game_Battler.prototype.performDamage.call(this);
      SoundManager.playEnemyDamage();
    } else {
      Yanfly.BEC.Game_Enemy_performDamage.call(this);
    }
};

Game_Enemy.prototype.attackAnimationId = function() {
    return this.enemy().attackAnimationId;
};

Game_Enemy.prototype.attackAnimationId1 = function() {
    return this.attackAnimationId();
};

Game_Enemy.prototype.attackAnimationId2 = function() {
    return this.attackAnimationId();
};

Game_Enemy.prototype.reflectAnimationId = function() {
    if (this.enemy().reflectAnimationId > 0) {
      return this.enemy().reflectAnimationId;
    }
    return Game_Battler.prototype.reflectAnimationId.call(this);
};

Game_Enemy.prototype.spriteCanMove = function() {
    if (this.enemy().spriteCannotMove) return false;
    return Game_Battler.prototype.spriteCanMove.call(this);
};

Game_Enemy.prototype.meetsTurnCondition = function(param1, param2) {
    var n = this.turnCount();
    if (param2 === 0) {
        return n === param1;
    } else {
        return n > 0 && n >= param1 && n % param2 === param1 % param2;
    }
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.createActions = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) member.createActions();
    }
};

Game_Unit.prototype.requestMotionRefresh = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) member.requestMotionRefresh();
    }
};

Game_Unit.prototype.onTurnStart = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) {
        member.onTurnStart();
        member.refresh();
      }
    }
};

Game_Unit.prototype.updateTick = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) member.updateTick();
    }
};

Game_Unit.prototype.refreshMembers = function() {
    var group = this.allMembers();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.refresh();
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.performEscapeSuccess = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) member.performEscapeSuccess();
    }
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.allMembers = function() {
  return this.members();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.BEC.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    Yanfly.BEC.Scene_Battle_update.call(this);
    this.updateStatusWindowRequests();
};

Scene_Battle.prototype.updateStatusWindowRequests = function() {
    if (!this._statusWindow) return;
    if (this._statusWindow.isClosed()) return;
    this._statusWindow.updateStatusRequests();
};

Yanfly.BEC.Scene_Battle_createSkillWindow =
    Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
    Yanfly.BEC.Scene_Battle_createSkillWindow.call(this);
    if (Yanfly.Param.BECLowerWindows) {
      this.adjustLowerWindow(this._skillWindow);
    }
};

Yanfly.BEC.Scene_Battle_createItemWindow =
    Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
    Yanfly.BEC.Scene_Battle_createItemWindow.call(this);
    if (Yanfly.Param.BECLowerWindows) {
      this.adjustLowerWindow(this._itemWindow);
    }
};

Yanfly.BEC.Scene_Battle_createActorWindow =
    Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    Yanfly.BEC.Scene_Battle_createActorWindow.call(this);
    this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
    if (Yanfly.Param.BECSelectHelp) {
      this._actorWindow.setHelpWindow(this._helpWindow);
    }
};

Yanfly.BEC.Scene_Battle_createEnemyWindow =
    Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    Yanfly.BEC.Scene_Battle_createEnemyWindow.call(this);
    if (Yanfly.Param.BECSelectHelp) {
      this._enemyWindow.setHelpWindow(this._helpWindow);
    }
};

Scene_Battle.prototype.adjustLowerWindow = function(win) {
    win.height = win.fittingHeight(Yanfly.Param.BECWindowRows);
    win.y = Graphics.boxHeight - win.height;
};

Yanfly.BEC.Scene_Battle_startPartyCommandSelection =
    Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    if (this.isStartActorCommand()) {
      this.selectNextCommand();
    } else {
      Yanfly.BEC.Scene_Battle_startPartyCommandSelection.call(this);
    }
};

Scene_Battle.prototype.isStartActorCommand = function() {
    if (this._isStartActorCommand === undefined) {
      this._isStartActorCommand = Yanfly.Param.BECStartActCmd;
    }
    return this._isStartActorCommand;
};

Yanfly.BEC.Scene_Battle_selectPreviousCommand =
    Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    if (this.isStartActorCommand()) {
      BattleManager.selectPreviousCommand();
      if (BattleManager.isInputting() && BattleManager.actor()) {
        this.startActorCommandSelection();
      } else {
        Yanfly.BEC.Scene_Battle_startPartyCommandSelection.call(this);
      }
    } else {
      Yanfly.BEC.Scene_Battle_selectPreviousCommand.call(this);
    }
};

Yanfly.BEC.Scene_Battle_selectNextCommand =
    Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    Yanfly.BEC.Scene_Battle_selectNextCommand.call(this);
    this._helpWindow.clear();
    BattleManager.stopAllSelection();
};

Yanfly.BEC.Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_commandSkill.call(this);
};

Yanfly.BEC.Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_commandItem.call(this);
};

Yanfly.BEC.Scene_Battle_startActorCommandSelection =
    Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    BattleManager.createActions();
    Yanfly.BEC.Scene_Battle_startActorCommandSelection.call(this);
    this._statusWindow.refresh();
};

Yanfly.BEC.Scene_Battle_selectActorSelection =
    Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.show();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_selectActorSelection.call(this);
    this._actorWindow.autoSelect();
};

Yanfly.BEC.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.hide();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onActorCancel.call(this);
    BattleManager.stopAllSelection();
    BattleManager.clearInputtingAction();
};

Yanfly.BEC.Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.show();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_selectEnemySelection.call(this);
    this._enemyWindow.autoSelect();
};

Yanfly.BEC.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.hide();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onEnemyCancel.call(this);
    BattleManager.stopAllSelection();
    BattleManager.clearInputtingAction();
};

Yanfly.BEC.Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    if (Yanfly.Param.BECSelectHelp) BattleManager.forceSelection();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onSelectAction.call(this);
    if (Yanfly.Param.BECSelectHelp) BattleManager.resetSelection();
};

Yanfly.BEC.Scene_Battle_onSkillOk =
    Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onSkillOk.call(this);
};

Yanfly.BEC.Scene_Battle_onSkillCancel =
    Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onSkillCancel.call(this);
    BattleManager.clearInputtingAction();
};

Yanfly.BEC.Scene_Battle_onItemOk =
    Scene_Battle.prototype.onItemOk;
Scene_Battle.prototype.onItemOk = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onItemOk.call(this);
};

Yanfly.BEC.Scene_Battle_onItemCancel =
    Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onItemCancel.call(this);
    BattleManager.clearInputtingAction();
};

//=============================================================================
// Window_Selectable
//=============================================================================

Yanfly.BEC.Window_Selectable_isCursorMovable =
    Window_Selectable.prototype.isCursorMovable;
Window_Selectable.prototype.isCursorMovable = function() {
    if (this._inputLock) return false;
    return Yanfly.BEC.Window_Selectable_isCursorMovable.call(this);
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.BEC.Window_Help_clear = Window_Help.prototype.clear;
Window_Help.prototype.clear = function() {
    Yanfly.BEC.Window_Help_clear.call(this);
    this.contents.clear();
};

Window_Help.prototype.setBattler = function(battler) {
    this.contents.clear();
    this.clear();
    this.resetFontSettings();
    if (!$gameParty.inBattle()) return;
    if (!battler) return;
    var action = BattleManager.inputtingAction();
    if (this.specialSelectionText(action)) {
      this.drawSpecialSelectionText(action);
    } else {
      this.drawBattler(battler);
    }
};

Window_Help.prototype.specialSelectionText = function(action) {
    BattleManager.resetSelection();
    if (!action) return false;
    return !action.needsSelection();
};

Window_Help.prototype.drawBattler = function(battler) {
    var text = battler.name();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

Window_Help.prototype.drawSpecialSelectionText = function(action) {
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = '';
    if (action.isForUser()) {
      text = Yanfly.Param.BECHelpUserTx;
    } else if (action.isForRandom()) {
      BattleManager.startAllSelection();
      var fmt = Yanfly.Param.BECHelpRandTx;
      if (action.isForOpponent() && action.numTargets() !== 1) {
        var target = Yanfly.Param.BECHelpEnemiesTx;
      } else if (action.isForOpponent() && action.numTargets() === 1) {
        var target = Yanfly.Param.BECHelpEnemyTx;
      } else if (action.isForFriend() && action.numTargets() !== 1) {
        var target = Yanfly.Param.BECHelpAlliesTx;
      } else {
        var target = Yanfly.Param.BECHelpAllyTx;
      }
      text = fmt.format(target, Yanfly.Util.toGroup(action.numTargets()));
    } else if (action.isForAll()) {
      BattleManager.startAllSelection();
      var fmt = Yanfly.Param.BECHelpAllTx;
      if (action.isForOpponent()) {
        var target = Yanfly.Param.BECHelpEnemiesTx;
      } else {
        var target = Yanfly.Param.BECHelpAlliesTx;
      }
      text = fmt.format(target);
    }
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

//=============================================================================
// Window_BattleActor
//=============================================================================

Window_BattleActor.prototype.autoSelect = function() {
    var action = BattleManager.inputtingAction();
    if (!action) return;
    this._inputLock = false;
    this._selectDead = false;
    this.setCursorAll(false);
    if (action.isForUser()) {
      this.select(BattleManager.actor().index());
      this._inputLock = true;
    } else if (action.isForAll()) {
      this._inputLock = true;
      this.setCursorAll(true);
    } else if (action.isForDeadFriend()) {
      this._selectDead = true;
      this.autoSelectFirstDeadActor();
    }
    this.updateCursor();
};

Window_BattleActor.prototype.updateCursor = function() {
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

Window_BattleActor.prototype.autoSelectFirstDeadActor = function() {
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.members()[i];
      if (member && member.isDead()) return this.select(i);
    }
};

Window_BattleActor.prototype.isOkEnabled = function() {
    if (this._selectDead) return this.actor().isDead();
    return Window_Selectable.prototype.isOkEnabled.call(this);
};

Window_BattleActor.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
    this._helpWindow.setBattler(this.actor());
};

Yanfly.BEC.Window_BattleActor_processTouch =
    Window_BattleActor.prototype.processTouch;
Window_BattleActor.prototype.processTouch = function() {
    if (Yanfly.Param.BECActorSelect && this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
        if (this.getClickedActor() >= 0) {
          var index = this.getClickedActor();
          if (this.index() === index) {
            return this.processOk();
          } else {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
        if (this.getClickedActor() >= 0) {
          var index = this.getClickedActor();
          if (this.index() !== index) {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (Yanfly.Param.BECSelectMouseOver) {
        var index = this.getMouseOverActor();
        if (index >= 0 && this.index() !== index) {
          SoundManager.playCursor();
          return this.select(index);
        }
      }
    }
    Yanfly.BEC.Window_BattleActor_processTouch.call(this);
};

Window_BattleActor.prototype.getClickedActor = function() {
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers().reverse()[i];
      if (!actor) continue;
      if (this.isClickedActor(actor)) {
        if (this._selectDead && !actor.isDead()) continue;
        if (this._inputLock && actor.index() !== this.index()) continue;
        return actor.index();
      }
    }
    return -1;
};

Window_BattleActor.prototype.isClickedActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible()) return false;
    if (!actor.isAppeared()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.width = actor.spriteWidth();
    rect.height = actor.spriteHeight();
    rect.x = actor.spritePosX() - rect.width / 2;
    rect.y = actor.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

Window_BattleActor.prototype.getMouseOverActor = function() {
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers().reverse()[i];
      if (!actor) continue;
      if (this.isMouseOverActor(actor)) {
        if (this._selectDead && !actor.isDead()) continue;
        if (this._inputLock && actor.index() !== this.index()) continue;
        return actor.index();
      }
    }
    return -1;
};

Window_BattleActor.prototype.isMouseOverActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible()) return false;
    if (!actor.isAppeared()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput._mouseOverX;
    var y = TouchInput._mouseOverY;
    var rect = new Rectangle();
    rect.width = actor.spriteWidth();
    rect.height = actor.spriteHeight();
    rect.x = actor.spritePosX() - rect.width / 2;
    rect.y = actor.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

//=============================================================================
// Window_BattleEnemy
//=============================================================================

Yanfly.DisableWebGLMask = false;

Yanfly.BEC.Window_BattleEnemy_initialize =
    Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    if (Yanfly.Param.BECEnemySelect) {
      x -= Graphics.boxWidth * 200;
      y -= Graphics.boxHeight * 200;
    };
    Yanfly.BEC.Window_BattleEnemy_initialize.call(this, x, y);
};

Yanfly.BEC.WindowLayer_webglMaskWindow =
    WindowLayer.prototype._webglMaskWindow;
WindowLayer.prototype._webglMaskWindow = function(renderSession, win) {
    if (win._ignoreMask) return;
    Yanfly.BEC.WindowLayer_webglMaskWindow.call(this, renderSession, win);
};

Yanfly.BEC.Window_BattleEnemy_maxCols =
    Window_BattleEnemy.prototype.maxCols;
Window_BattleEnemy.prototype.maxCols = function() {
    if (Yanfly.Param.BECEnemySelect) return this._enemies.length;
    return Yanfly.BEC.Window_BattleEnemy_maxCols.call(this);
};

Window_BattleEnemy.prototype.allowedTargets = function() {
    var targets = [];
    targets = targets.concat($gameTroop.aliveMembers());
    return targets;
};

Window_BattleEnemy.prototype.refresh = function() {
    this._enemies = this.allowedTargets();
    this.sortTargets();
    Window_Selectable.prototype.refresh.call(this);
};

Window_BattleEnemy.prototype.sortTargets = function() {
    this._enemies.sort(function(a, b) {
        if (a.spritePosX() === b.spritePosX()) {
          return a.spritePosY() - b.spritePosY();
        }
        return a.spritePosX() - b.spritePosX();
    });
};

Window_BattleEnemy.prototype.autoSelect = function() {
    if (Yanfly.Param.BECEnemyAutoSel === 0 ||
    Yanfly.Param.BECEnemyAutoSel === '0') {
      var selectIndex = 0;
    } else {
      var selectIndex = this.furthestRight();
    }
    this.select(selectIndex);
};

Window_BattleEnemy.prototype.furthestRight = function() {
    return this.maxItems() - 1;
};

Window_BattleEnemy.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
    this._helpWindow.setBattler(this.enemy());
};

Yanfly.BEC.Window_BattleEnemy_processTouch =
    Window_BattleEnemy.prototype.processTouch;
Window_BattleEnemy.prototype.processTouch = function() {
    if (Yanfly.Param.BECEnemySelect && this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
        if (this.getClickedEnemy() >= 0) {
          var index = this.getClickedEnemy();
          if (this.index() === index) {
            return this.processOk();
          } else {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
        if (this.getClickedEnemy() >= 0) {
          var index = this.getClickedEnemy();
          if (this.index() !== index) {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (Yanfly.Param.BECSelectMouseOver) {
        var index = this.getMouseOverEnemy();
        if (index >= 0 && this.index() !== index) {
          SoundManager.playCursor();
          return this.select(index);
        }
      }
    };
    Yanfly.BEC.Window_BattleEnemy_processTouch.call(this);
};

Window_BattleEnemy.prototype.getClickedEnemy = function() {
    for (var i = 0; i < this._enemies.length; ++i) {
      var enemy = this._enemies[i];
      if (!enemy) continue;
      if (this.isClickedEnemy(enemy)) {
        if (this._selectDead && !enemy.isDead()) continue;
        var index = this._enemies.indexOf(enemy)
        if (this._inputLock && index !== this.index()) continue;
        return index;
      }
    }
    return -1;
};

Window_BattleEnemy.prototype.isClickedEnemy = function(enemy) {
    if (!enemy) return false;
    if (!enemy.isSpriteVisible()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.width = enemy.spriteWidth();
    rect.height = enemy.spriteHeight();
    rect.x = enemy.spritePosX() - rect.width / 2;
    rect.y = enemy.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

Window_BattleEnemy.prototype.getMouseOverEnemy = function() {
    for (var i = 0; i < this._enemies.length; ++i) {
      var enemy = this._enemies[i];
      if (!enemy) continue;
      if (this.isMouseOverEnemy(enemy)) {
        if (this._selectDead && !enemy.isDead()) continue;
        var index = this._enemies.indexOf(enemy)
        if (this._inputLock && index !== this.index()) continue;
        return index;
      }
    }
    return -1;
};

Window_BattleEnemy.prototype.isMouseOverEnemy = function(enemy) {
    if (!enemy) return false;
    if (!enemy.isSpriteVisible()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput._mouseOverX;
    var y = TouchInput._mouseOverY;
    var rect = new Rectangle();
    rect.width = enemy.spriteWidth();
    rect.height = enemy.spriteHeight();
    rect.x = enemy.spritePosX() - rect.width / 2;
    rect.y = enemy.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

//=============================================================================
// Window_EnemyVisualSelect
//=============================================================================

function Window_EnemyVisualSelect() {
    this.initialize.apply(this, arguments);
}

Window_EnemyVisualSelect.prototype = Object.create(Window_Base.prototype);
Window_EnemyVisualSelect.prototype.constructor = Window_EnemyVisualSelect;

Window_EnemyVisualSelect.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this._battler = null;
    this._battlerName = '';
    this._requestRefresh = false;
    this._showSelectCursor = Yanfly.Param.BECShowSelectBox;
    this._showEnemyName = Yanfly.Param.BECShowEnemyName;
    this.contentsOpacity = 0;
    this.opacity = 0;
};

Window_EnemyVisualSelect.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
    this._battlerName = battler.name();
};

Window_EnemyVisualSelect.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._battler) return;
    this.updateWindowAspects();
};

Window_EnemyVisualSelect.prototype.updateWindowAspects = function() {
    this.updateBattlerName();
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updateRefresh();
    this.updateCursor();
};

Window_EnemyVisualSelect.prototype.updateBattlerName = function() {
    if (this._battlerName !== this._battler.name()) {
        this._battlerName = this._battler.name();
        this._requestRefresh = true;
        this._nameTextWidth = undefined;
    }
};

Window_EnemyVisualSelect.prototype.updateWindowSize = function() {
    var spriteWidth = this._battler.spriteWidth();
    this.contents.fontSize = Yanfly.Param.BECEnemyFontSize;
    if (this._nameTextWidth === undefined) {
      this._nameTextWidth = this.textWidth(this._battler.name());
    }
    var textWidth = this._nameTextWidth;
    textWidth += this.textPadding() * 2;
    var width = Math.max(spriteWidth, textWidth) + this.standardPadding() * 2;
    width = Math.ceil(width);
    var height = this._battler.spriteHeight() + this.standardPadding() * 2;
    height = Math.ceil(height);
    height = Math.max(height, this.lineHeight() + this.standardPadding() * 2);
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.createContents();
    this._requestRefresh = true;
    this.makeWindowBoundaries();
};

Window_EnemyVisualSelect.prototype.makeWindowBoundaries = function() {
    if (!this._requestRefresh) return;
    this._minX = -1 * this.standardPadding();
    this._maxX = Graphics.boxWidth - this.width + this.standardPadding();
    this._minY = -1 * this.standardPadding();
    this._maxY = Graphics.boxHeight - this.height + this.standardPadding();
    this._maxY -= SceneManager._scene._statusWindow.height;
};

Window_EnemyVisualSelect.prototype.updateWindowPosition = function() {
    if (!this._battler) return;
    this.x = -1 * this.width / 2;
    this.y = -1 * this.height + this.standardPadding();
    this.x += this._battler.spritePosX();
    this.y += this._battler.spritePosY();
    this.x = this.x.clamp(this._minX, this._maxX);
    this.y = this.y.clamp(this._minY, this._maxY);
};

Window_EnemyVisualSelect.prototype.updateOpacity = function() {
    if (this.isShowWindow()) {
      this.contentsOpacity += 32;
    } else {
      this.contentsOpacity -= 32;
    }
};

Window_EnemyVisualSelect.prototype.isShowWindow = function() {
    var scene = SceneManager._scene;
    if (!scene._enemyWindow) return false;
    var enemyWindow = scene._enemyWindow;
    if (!enemyWindow.active) return false;
    if (!this._battler.isAppeared()) return false;
    if (this._battler.isDead()) {
      return enemyWindow._selectDead;
    }
    return enemyWindow._enemies.contains(this._battler);
};

Window_EnemyVisualSelect.prototype.updateCursor = function() {
    if (this.isShowCursor()) {
      var wy = this.contents.height - this.lineHeight();
      this.setCursorRect(0, wy, this.contents.width, this.lineHeight());
    } else {
      this.setCursorRect(0, 0, 0, 0);
    }
};

Window_EnemyVisualSelect.prototype.isShowCursor = function() {
    if (!this._showSelectCursor) return false;
    var scene = SceneManager._scene;
    if (!scene._enemyWindow) return false;
    var enemyWindow = scene._enemyWindow;
    if (!enemyWindow.active) return false;
    if (!this._battler.isAppeared()) return false;
    return this._battler.isSelected();
};

Window_EnemyVisualSelect.prototype.updateRefresh = function() {
    if (this._requestRefresh) this.refresh();
};

Window_EnemyVisualSelect.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;
    if (!this._showEnemyName) return;
    if (this._battler.isHidden()) return;
    this._requestRefresh = false;
    this.contents.fontSize = Yanfly.Param.BECEnemyFontSize;
    var text = this._battler.name();
    var wy = this.contents.height - this.lineHeight();
    this.drawText(text, 0, wy, this.contents.width, 'center');
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Window_PartyCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.BECCommandAlign;
};

Window_PartyCommand.prototype.numVisibleRows = function() {
    return Yanfly.Param.BECCommandRows;
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.BECCommandAlign;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return Yanfly.Param.BECCommandRows;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.numVisibleRows = function() {
    return Yanfly.Param.BECCommandRows;
};

Window_BattleStatus.prototype.updateStatusRequests = function() {
    if (BattleManager._victoryPhase) return;
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers()[i];
      if (!actor) continue;
      if (actor.isStatusRefreshRequested()) this.processStatusRefresh(i);
    }
};

Window_BattleStatus.prototype.processStatusRefresh = function(index) {
    var actor = $gameParty.battleMembers()[index];
    if (!actor) return;
    var rect = this.itemRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawItem(index);
    actor.completetStatusRefreshRequest();
};

Window_BattleStatus.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
};

if (!Yanfly.Param.BECCurMax) {

Window_BattleStatus.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    this.changeTextColor(color1);
    this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth, 'right');
};

}; // Yanfly.Param.BECCurMax

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.BEC.Window_BattleLog_isFastForward =
    Window_BattleLog.prototype.isFastForward;
Window_BattleLog.prototype.isFastForward = function() {
    if (Yanfly.Param.BECOptSpeed) return true;
    return Yanfly.BEC.Window_BattleLog_isFastForward.call(this);
};

Window_BattleLog.prototype.updateWaitCount = function() {
    if (this._waitCount > 0) {
        this._waitCount -= 1;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
        return true;
    }
    return false;
};

Window_BattleLog.prototype.animationBaseDelay = function() {
    return Yanfly.Param.BECAniBaseDel;
};

Window_BattleLog.prototype.animationNextDelay = function() {
    return Yanfly.Param.BECAniNextDel;
};

Window_BattleLog.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'effect':
        waiting = this._spriteset.isEffecting();
        break;
    case 'movement':
        waiting = this._spriteset.isAnyoneMoving();
        break;
    case 'animation':
        waiting = this._spriteset.isAnimationPlaying();
        break;
    case 'popups':
        waiting = this._spriteset.isPopupPlaying();
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};

Window_BattleLog.prototype.startAction = function(subject, action, targets) {
};

Window_BattleLog.prototype.endAction = function(subject) {
};

Window_BattleLog.prototype.waitForAnimation = function() {
    this.setWaitMode('animation');
};

Window_BattleLog.prototype.waitForEffect = function() {
    this.setWaitMode('effect');
};

Window_BattleLog.prototype.waitForPopups = function() {
    this.setWaitMode('popups');
};

Yanfly.BEC.Window_BattleLog_displayAction =
    Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (Yanfly.Param.BECFullActText) {
      Yanfly.BEC.Window_BattleLog_displayAction.call(this, subject, item);
    } else {
      this._actionIcon = this.displayIcon(item);
      var text = this.displayText(item);
      this.push('addText', '<SIMPLE>' + text);
      if (item.message2) {
        this.push('addText', '<CENTER>' + item.message2.format(text));
      }
    }
};

Window_BattleLog.prototype.displayIcon = function(item) {
    if (!item) return 0;
    return item.battleDisplayIcon;
};

Window_BattleLog.prototype.displayText = function(item) {
    if (!item) return '';
    return item.battleDisplayText;
};

Yanfly.BEC.Window_BattleLog_displayActionResults =
    Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    if (Yanfly.Param.BECOptSpeed) {
      if (target.result().used) {
          this.displayCritical(target);
          this.displayDamage(target);
          this.displayAffectedStatus(target);
          this.displayFailure(target);
      }
    } else {
      Yanfly.BEC.Window_BattleLog_displayActionResults.call(this, subject,
          target);
    }
    if (target.isDead()) target.performCollapse();
};

Yanfly.BEC.Window_BattleLog_drawLineText =
    Window_BattleLog.prototype.drawLineText;
Window_BattleLog.prototype.drawLineText = function(index) {
    if (this._lines[index].match('<CENTER>')) {
      this.drawCenterLine(index);
    } else if (this._lines[index].match('<SIMPLE>')) {
      this.drawSimpleActionLine(index);
    } else {
      Yanfly.BEC.Window_BattleLog_drawLineText.call(this, index);
    }
};

Window_BattleLog.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Window_BattleLog.prototype.drawCenterLine = function(index) {
    var text = this._lines[index].replace('<CENTER>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    var tw = this.textWidthEx(text);
    var wx = rect.x + (rect.width - tw) / 2;
    this.resetFontSettings();
    this.drawTextEx(text, wx, rect.y);
};

Window_BattleLog.prototype.drawSimpleActionLine = function(index) {
    var text = this._lines[index].replace('<SIMPLE>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (this._actionIcon) {
      var tw = this.textWidth(text);
      var ix = (rect.width - tw) / 2 - 4;
      this.drawIcon(this._actionIcon, ix, rect.y + 2);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
};

Window_BattleLog.prototype.displayCounter = function(target) {
    if (Yanfly.Param.BECShowCntText) {
      this.addText(TextManager.counterAttack.format(target.name()));
    }
    target.performCounter();
    this.showAttackAnimation(target, [BattleManager._subject]);
    this.waitForAnimation();
};

Window_BattleLog.prototype.displayReflection = function(target) {
    if (Yanfly.Param.BECShowRflText) {
      this.addText(TextManager.magicReflection.format(target.name()));
    }
    target.performReflection();
    var animationId = BattleManager._action.item().animationId;
    this.showNormalAnimation([BattleManager._subject], animationId);
    this.waitForAnimation();
};

Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
    if (Yanfly.Param.BECShowSubText) {
      var substName = substitute.name();
      this.addText(TextManager.substitute.format(substName, target.name()));
    }
    substitute.performSubstitute(target);
};

Yanfly.BEC.Window_BattleLog_displayFailure =
    Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if (!Yanfly.Param.BECShowFailText) return;
    Yanfly.BEC.Window_BattleLog_displayFailure.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayCritical =
    Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    if (!Yanfly.Param.BECShowCritText) return;
    Yanfly.BEC.Window_BattleLog_displayCritical.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayMiss =
    Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if (!Yanfly.Param.BECShowMissText) return;
    Yanfly.BEC.Window_BattleLog_displayMiss.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayEvasion =
    Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
    if (!Yanfly.Param.BECShowEvaText) return;
    Yanfly.BEC.Window_BattleLog_displayEvasion.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayHpDamage =
    Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (!Yanfly.Param.BECShowHpText) return;
    Yanfly.BEC.Window_BattleLog_displayHpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayMpDamage =
    Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (!Yanfly.Param.BECShowMpText) return;
    Yanfly.BEC.Window_BattleLog_displayMpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayTpDamage =
    Window_BattleLog.prototype.displayTpDamage;
Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (!Yanfly.Param.BECShowTpText) return;
    Yanfly.BEC.Window_BattleLog_displayTpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayCurrentState =
    Window_BattleLog.prototype.displayCurrentState;
Window_BattleLog.prototype.displayCurrentState = function(subject) {
    if (!Yanfly.Param.BECShowStateText) return;
    Yanfly.BEC.Window_BattleLog_displayCurrentState.call(this, subject);
};

Yanfly.BEC.Window_BattleLog_displayAddedStates =
    Window_BattleLog.prototype.displayAddedStates;
Window_BattleLog.prototype.displayAddedStates = function(target) {
    if (!Yanfly.Param.BECShowStateText) return;
    Yanfly.BEC.Window_BattleLog_displayAddedStates.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayRemovedStates =
    Window_BattleLog.prototype.displayRemovedStates;
Window_BattleLog.prototype.displayRemovedStates = function(target) {
    if (!Yanfly.Param.BECShowStateText) return;
    Yanfly.BEC.Window_BattleLog_displayRemovedStates.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayChangedBuffs =
    Window_BattleLog.prototype.displayChangedBuffs;
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    if (!Yanfly.Param.BECShowBuffText) return;
    Yanfly.BEC.Window_BattleLog_displayChangedBuffs.call(this, target);
};

Window_BattleLog.prototype.popupDamage = function(target) {
};

Yanfly.BEC.Window_BattleLog_showEnemyAttackAnimation =
    Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation =
function(subject, targets) {
    if ($gameSystem.isSideView()) {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
    } else {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
      Yanfly.BEC.Window_BattleLog_showEnemyAttackAnimation.call(this, subject,
          targets);
    }
};

Window_BattleLog.prototype.showActorAtkAniMirror = function(subject, targets) {
  if (subject.isActor()) {
    this.showNormalAnimation(targets, subject.attackAnimationId1(), true);
    this.showNormalAnimation(targets, subject.attackAnimationId2(), false);
  } else {
    this.showNormalAnimation(targets, subject.attackAnimationId1(), true)
  }
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

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

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
