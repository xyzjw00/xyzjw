//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 1
// YEP_X_ActSeqPack1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack1 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP1 = Yanfly.ASP1 || {};
Yanfly.ASP1.version = 1.13;

//=============================================================================
 /*:
 * @plugindesc v1.13 （需要 YEP_BattleEngineCore.js）
 * Battle Engine Core 的動作序列中添加了基本功能。
 * @author Yanfly Engine Plugins
 *
 * @param Default Volume
 * @desc BGM 播放的音量。
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param Default Pitch
 * @type number
 * @min 0
 * @max 100
 * @desc BGM 播放的音調。
 * @default 100
 *
 * @param Default Pan
 * @type number
 * @min 0
 * @max 100
 * @desc BGM 播放的平移效果。
 * @default 0
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * Action Sequence Pack 1 插件是 Yanfly Engine Plugins 的 Battle Engine Core 
 * 的擴展插件。如果沒有主插件，此擴展插件將無法運作。此擴展插件包含用於在技
 * 術層面上自定義動作序列的更多基本功能。
 * 在這裡，您可以更改開關、操作變數、添加狀態、更改傷害率等等。
 *
 * ============================================================================
 * 動作序列 - ala Melody
 * ============================================================================
 *
 * Battle Engine Core 包括 Yanfly Engine Melody 的 Battle Engine 系統，
 * 可以在一定程度上控制技能和物品效果的各方面。這些被稱為動作序列，其中動作
 * 序列中的每個命令都會導致遊戲執行不同的單獨動作。
 *
 * 每個技能和物品由 5 個不同的動作序列組成。 它們如下：
 *
 * 1. Setup Actions（設定操作）
 *   在執行大部分動作及其單獨效果之前讓行動的戰鬥人物做好準備。通常你在這裡
 * 看到的是行動的戰鬥人物向前移動一點，拔出他們的武器等。這一步驟會在行動的
 * 戰鬥人物施展他們的技能或物品之前發生。
 *
 * 2. Whole Actions（整體行動）
 *   這些操作將同時影響所有目標。 儘管不需要使用此部分，但大多數動作將使用
 * 它來向所有敵人顯示動畫。 此步驟發生在施展技能和物品之後。
 *
 * 3. Target Actions（目標行動）
 *   此部分將分別影響所有目標。主要用於會造成更多自身傷害的物理攻擊。 
 * 除非另有明確命令，否則此處發生的操作不會影響其他目標。
 *
 * 4. Follow Actions（關注行動）
 *   本部份將致力於在各個目標操作之後的清理工作。在這裡，它將執行諸如移除不
 * 死標記、啟動常見事件等操作。
 *
 * 5. Finish Actions（完成動作）
 *   本部份將關閉行動結束的戰鬥人物其動作序列。通常諸如技能和物品在最後一刻
 * 的運行等待和掌握，並和其它部份一同恢復原狀。
 *
 * 現在您已經了解了每個動作序列所經歷的 5 個步驟中的每一個，下面是您可以在
 * 技能和物品中插入的標籤。 注意每個標籤名稱。
 *
 * 1. <setup action>                                5. <finish action>
 *     action list（動作列表）                          action list
 *     action list                                      action list
 *    </setup action>                                  </finish action>
 *
 * 2. <whole action>       3. <target action>       4. <follow action>
 *     action list             action list              action list
 *     action list             action list              action list
 *    </whole action>         </target action>         </follow action>
 *
 * 他們會做自己的動作集。為動作列表插入的方法可以在幫助手冊的核心部分找到。
 *
 * 此外，為了防止數據庫項的每個記事本都被操作序列列表淹沒，您可以使用一種快
 * 速的方式來複製所有設定操作、整體行動、目標行動、關注行動和完成行動，只需
 * 一行。
 *
 * <action copy: x:y>
 *
 * 將 x 替換為“item”或“skill”，設置動作列表代碼的類型直接複製。整數 y 
 * 是為該特定對象類型分配的 ID。例如，要複製第 45 個技能的動作序列，對於接
 * 受這些動作代碼的任何內容；代碼將是 <action copy: Skill:45>。
 * 如果您確實使用了此筆記標籤，它將優先於您放置在筆記框中的任何自定義內容。
 *
 * ============================================================================
 * 目標對象的輸入
 * ============================================================================
 *
 * 您可能會注意到，在下面的某些操作中會說“參考目標輸入”，這部分就在此處。 
 * 以下是您可以選擇的各種目標的簡要介紹。
 *
 *   user; 選擇可以行動的戰鬥人物。
 *   target, targets; 選擇有問題的可行動目標。
 *   actors, existing actors; 選擇所有活著的角色。
 *   all actors; 選擇包含死亡狀態的所有角色。
 *   dead actors: 只選擇死亡的角色。
 *   actors not user; 選擇除了玩家以外所有活著的角色。
 *   actor x; 選擇在“位置 x“ 的角色。
 *   character x; 選擇 “角色 ID x“ 的特定角色。
 *   enemies, existing enemies; 選擇所有活著的敵人。
 *   all enemies; 選擇包含已死亡的所有敵人。
 *   dead enemies: 只選擇死亡的敵人。
 *   enemies not user; 選擇除了玩家以外的所有敵人。
 *   enemy x; 選擇在“位置 x“ 的敵人。
 *   friends; 選擇生存的戰友。
 *   all friends; 選擇包含已死亡的所有戰友。
 *   dead friends; 選擇已死亡的戰友。
 *   friends not user; 選擇除了玩家以外的所有戰友。
 *   friend x: 選擇在“位置 x“ 的戰友。
 *   opponents; 選擇戰友仍生存的對手。
 *   all opponents; 選擇戰友的所有對手。
 *   dead opponents; 選擇戰友已死亡的對手。
 *   opponent x: 選擇戰友在“位置 x“ 的對手。
 *   all alive; 選擇所有活著的角色和敵人。
 *   all members; 不論生死選擇所有角色和敵人。
 *   all dead; 選擇所有死亡的角色和敵人。
 *   all not user; 選擇除了玩家以外的所有仍生存的戰鬥人物。
 *   focus; 選擇行動的戰鬥人物及其目標。
 *   not focus; 選擇除了“行動的戰鬥人物及其目標“以外的所有事物。
 *
 * ============================================================================
 * 動作序列 - 動作列表（action list）
 * ============================================================================
 *
 * 以下包含您可以在 5 個動作序列中使用的動作列表。 
 * 每個動作都有一個獨特的功能，需要一定的格式才能正常運行。
 *
 *=============================================================================
 * ACTION ANIMATION: (target), (mirror)   行動動畫：(目標),(映射)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 播放分配給技能/物品的動畫。動畫將自動選擇技能/物品的指定目標。
 * 如果使用'target'，它將指定一個目標來播放動畫。如果使用 'mirror'將映射動畫。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     action animation
 *                action animation: target
 *                action animation: user, mirror
 *=============================================================================
 *
 *=============================================================================
 * ACTION COMMON EVENT（行動公共事件） 
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 播放在技能/物品的特色列表中找到的公共事件。這將遵循遊戲引擎的原始流程而僅
 * 播放列表中的最後一個公共事件。在普通事件完成之前，動作列表上不會再有任何其
 * 他內容（除非它是強制動作，在這種情況下，它會先等待動作完成）。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： action common event
 *=============================================================================
 *
 *=============================================================================
 * ACTION EFFECT: target（行動效果：目標） 
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使目標受到技能/物品的傷害/治療，並導致對目標的增益或狀態所做的任何更改。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： action effect
 *=============================================================================
 *
 *=============================================================================
 * ADD stat BUFF: target, (turns), (show) 添加增益狀態：目標，(回合),(顯示)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 用“stat”增益影響目標。將“stat”替換為“hp”、“mp”、“atk”、“def”
 * 、“mat”、“mdf”、“agi”或“luk”。如果你在目標後面加上一個數字，它將會
 * 維持目標的增益狀態持續這些回合。再加上“show”，它將顯示目標在戰鬥訊息中應
 * 用的增益效果。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：  add atk buff: user, 3, show
 *             add def buff: target, 8
 *=============================================================================
 *
 *=============================================================================
 * ADD stat DEBUFF: target, (turns), (show)添加減益狀態：目標，(回合),(顯示)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 用“stat”減益影響目標。將“stat”替換為“hp”、“mp”、“atk”、“def”
 * 、“mat”、“mdf”、“agi”或“luk”。如果你在目標後面加上一個數字，它將會
 * 維持目標的減益狀態持續這些回合。再加上“show”，它將顯示目標在戰鬥訊息中應
 * 用的減益效果。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：  add atk debuff: user, 3, show
 *             add def debuff: target, 8
 *=============================================================================
 *
 *=============================================================================
 * ADD STATE X: target, (show)        添加狀態 X：目標，（顯示）
 * ADD STATE X, Y, Z: target (show)   添加狀態 X、Y、Z：目標（顯示）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 影響具有 X 狀態的目標（如果以該格式使用，則包括 Y 和 Z）。
 * 如果包含“show”，它將顯示任何與狀態相關的訊息。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：  add state 5: target
 *             add state 6, 7, 8: user, show
 *=============================================================================
 *
 *=============================================================================
 * ANIMATION X: target, (mirror)      動畫 X：目標，（映射）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在目標身上播放動畫 X。'Mirror' 將導致動畫出現鏡像。請記住，角色身上播放的
 * 動畫將自動被映射，設置映射選項將反轉它並使其看起來沒有鏡像。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：  animation 5: user
 *             animation 6: target, mirror
 *=============================================================================
 *
 *=============================================================================
 * ANIMATION WAIT: X        動畫等待：X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待 x 動畫幀。動畫的每一幀不會只持續一個遊戲幀，而是持續多個遊戲幀。
 * 為了讓生活更輕鬆，您可以使用它讓遊戲等待 x 幀播放動畫。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：  animation wait: 10
 *             animation wait: 30
 *=============================================================================
 *
 *=============================================================================
 * BGM: STOP                              音樂：停止
 * BGM: MEMORIZE                          音樂：記憶
 * BGM: MEMORY                            音樂：回憶
 * BGM: filename, (volume), (pitch), (pan)音樂：文件名稱,(音量),(音調),(平移)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 手動更改當前的背景音樂。“停止”將停止播放任何 BGM。 
 * “記憶”將記住當前的 BGM。如果有已記憶的音樂，“回憶”將重播記憶的 BGM。
 * 如果您選擇文件名（沒有文件副檔名），遊戲將改為播放該 BGM。使用此選項可以
 * 調整音量、音調和平移效果，所有這些都是可調整的。如果沒有輸入音量、音調和
 * 平移的數值，遊戲將使用此插件參數中的設置。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     bgm: stop
 *                bgm: memorize
 *                bgm: memory
 *                bgm: Battle7
 *                bgm: Theme2, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * BGS: STOP                              音效：停止
 * BGS: MEMORIZE                          音效：記憶
 * BGS: MEMORY                            音效：回憶
 * BGS: filename, (volume), (pitch), (pan)音效：文件名稱,(音量),(音調),(平移)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 手動更改當前的背景音效。“停止”將停止播放任何 BGS。 
 * “記憶”將記住當前的 BGS。如果有已記憶的音樂，“回憶”將重播記憶的 BGS。
 * 如果您選擇文件名（沒有文件副檔名），遊戲將改為播放該 BGS。使用此選項可以
 * 調整音量、音調和平移效果，所有這些都是可調整的。如果沒有輸入音量、音調和
 * 平移的數值，遊戲將使用此插件參數中的設置。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     bgs: stop
 *                bgs: memorize
 *                bgs: memory
 *                bgs: City
 *                bgs: Darkness, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * BREAK ACTION （中斷行動）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 這將強制關閉並跳過該部分技能/物品的其餘動作序列。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： break action
 *=============================================================================
 *
 *=============================================================================
 * CAST ANIMATION （詠唱動畫）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 對使用技能的角色播放動畫。如果是使用物品或預設的普通攻擊，則不會發生。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： cast animation
 *=============================================================================
 *
 *=============================================================================
 * CLEAR BATTLE LOG （清除戰鬥訊息）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 清除畫面上方所有的訊息。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： clear battle log
 *=============================================================================
 *
 *=============================================================================
 * CHANGE SWITCH X: on/off/toggle/switch z   （更改開關 X 的所有應用）
 * CHANGE SWITCH X..Y: on/off/toggle/switch z
 * CHANGE SWITCH X TO Y: on/off/toggle/switch z
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將遊戲開關 X 更改為開、關、切換（在開/關之間切換）或開關 y 的任何數值。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     change switch 1: on           更改開關 1：開
 *                change switch 2..4: off       更改開關 2..4：關閉
 *                change switch 5 to 8: toggle  將開關 5 更改為 8：切換
 *                change switch 9: switch 5     更改開關 9：開關 5
 *=============================================================================
 *
 *=============================================================================
 * CHANGE VARIABLE X = Y      （變數 X 的所有運算）
 * CHANGE VARIABLE X += Y
 * CHANGE VARIABLE X -= Y
 * CHANGE VARIABLE X *= Y
 * CHANGE VARIABLE X /= Y
 * CHANGE VARIABLE X %= Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 改變動作序列之間的 變數 X 為 Y 數值。 Y 可以是整數或一段代碼。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     change variable 1 = 2
 *                change variable 3 += 4
 *                change variable 5 -= 6
 *                change variable 7 *= 8
 *                change variable 9 /= 10
 *                change variable 11 %= 12
 *=============================================================================
 *
 *=============================================================================
 * COLLAPSE: target, (force)      瓦解：目標，（強制）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 如果目標此時在動作序列中的某個時機點死亡，只要目標的 HP 為 0，您就可以
 * 提示遊戲殺死目標。 如果要強制目標死亡，請在目標後加入“force”命令。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     collapse: user
 *                collapse: target, force
 *=============================================================================
 *
 *=============================================================================
 * COMMON EVENT: X （公用事件：X）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在動作序列中的某個時機點播放公共事件 X。在公共事件完成之前不會有任何其
 * 他事情繼續（除非它是強制操作，在這種情況下，它會先等待操作完成）。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： common event: 1
 *=============================================================================
 *
 *=============================================================================
 * DEATH BREAK      （死亡中斷）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 如果技能使用者在行動過程中因任何原因死亡（通過反擊或反射），這將迫使該
 * 技能/物品部分的其餘動作序列關閉並被跳過。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： death break
 *=============================================================================
 *
 *=============================================================================
 * DISPLAY ACTION   （顯示行動）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在戰鬥訊息的頂部顯示動作的名稱。它會一直留在那裡，直到清除戰鬥訊息。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： display action
 *=============================================================================
 *
 *=============================================================================
 * EVAL: code     （ EVAL：代碼 ）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 對於那些想做一些當前 Battle Engine 不支援的事情的人，你可以使用 eval 
 * 函數來讓一段代碼發生。
 * 使用者注意，對那些不熟悉 JavaScript 的人應該避免掌控這個動作序列命令。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： eval: $gameParty.loseItem($dataItems[3], 10)
 *=============================================================================
 *
 *=============================================================================
 * GAIN ITEM X: Y           LOSE ITEM X: Y   （獲得或失去物品、裝備）
 * GAIN WEAPON X: Y         LOSE WEAPON X: Y
 * GAIN ARMOR X: Y          LOSE ARMOR X: Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 你的隊伍將 獲得/失去 物品 x、武器 x 或盔甲 x 的數量。
 * 如果您選擇省略 y，它將默認為 1。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     gain item 1: 20
 *                lose weapon 2
 *                gain armor 3: 50
 *=============================================================================
 *
 *=============================================================================
 * GOLD +x       （ 金錢的增減 ）
 * GOLD -x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 你的隊伍將在戰鬥中 獲得/失去 x 數量的金幣。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     gold +2000
 *                gold -500
 *=============================================================================
 *
 *=============================================================================
 * IF ... ELSE STATEMENTS   （分歧條件判斷）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 對於熟悉編程的人，可使用 if...else 語句根據不同的條件執行不同的操作。
 * 如果指定條件成立，則使用“if”指定要執行的代碼塊。反之若條件不成立，
 * 則使用“else”指定要執行的代碼塊。
 * 如果第一個條件不成立，則使用“else if”指定要測試的新條件。 
 * 使用 'end' 指定條件結束的位置。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：
 *     if $gameSwitches.value(1)
 *         action effect
 *     else if $gameSwitches.value(2)
 *         action effect
 *         action effect
 *     else
 *         action effect
 *         action effect
 *         action effect
 *     end
 *
 * *注意：您不必在兩者之間縮排代碼即可運作。這樣在您的動作序列中看起來更好。
 *=============================================================================
 *
 *=============================================================================
 * IMMORTAL: targets, true/false  （不死：目標，是/否）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將目標設定為不死狀態，這樣他們就不會在攻擊過程中死亡。 
 * 這是為了確保每個動作效果都有運作。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： immortal: targets true
 *=============================================================================
 *
 *=============================================================================
 * HP +X: target, (show)  （ HP 值的相關應用）
 * HP -X: target, (show)
 * HP +X%: target, (show)
 * HP -X%: target, (show)
 * HP +VARIABLE X: target, (show)
 * HP -VARIABLE X: target, (show)
 * HP +VARIABLE X%: target, (show)
 * HP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 目標獲得等於 X 值的 HP。要顯示彈出視窗，請在行中的目標後插入“show”。
 * 是否包括 'show' 是完全可選的。如果省略 'show'，則不會顯示彈出視窗。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     hp +500: user
 *                hp -variable 5: target
 *                hp +25%: target
 *                hp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * ME: STOP     （號角音樂的播放應用）
 * ME: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 讓戰鬥播放號角音樂。如果您選擇一個文件（沒有副檔名），遊戲將播放那
 * 個 ME。使用此選項可以調整音量、音調和平移效果，所有這些都是可選的。
 * 如果沒有輸入音量、音調和平移的值，遊戲將使用此插件參數中的設置。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     me: stop
 *                me: Victory1
 *                me: Darkness, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * MOTION WAIT: target   （動作等待：目標）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 若執行動作的目標是角色則使遊戲等待 12 幀。如果目標不是角色則不等待。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： motion wait: user
 *=============================================================================
 *
 *=============================================================================
 * MP +X: target, (show)   （ MP 值的相關應用）
 * MP -X: target, (show)
 * MP +X%: target, (show)
 * MP -X%: target, (show)
 * MP +VARIABLE X: target, (show)
 * MP -VARIABLE X: target, (show)
 * MP +VARIABLE X%: target, (show)
 * MP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 目標獲得等於 X 值的 MP。要顯示彈出視窗，請在行中的目標後插入“show”。
 * 是否包括 'show' 是完全可選的。如果省略 'show'，則不會顯示彈出視窗。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     mp +500: user
 *                mp -variable 5: target
 *                mp +25%: target
 *                mp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * PERFORM ACTION   （執行動作）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使角色向前移動並揮動他們的武器或推撞，但是確定的動作將由遊戲自動完成。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： perform action
 *=============================================================================
 *
 *=============================================================================
 * PERFORM FINISH   （執行完成）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使角色移動回原地點。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： perform finish
 *=============================================================================
 *
 *=============================================================================
 * PERFORM START    （執行開始）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使角色從其原點向前移動。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： perform start
 *=============================================================================
 *
 *=============================================================================
 * REFRESH STATUS   （刷新狀態）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在動作序列中間刷新狀態視窗。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： refresh status
 *=============================================================================
 *
 *=============================================================================
 * REMOVE stat BUFF: target, (show)    （移除增益狀態）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 移除目標的增益狀態。將“stat”替換為“hp”、“mp”、“atk”、“def”、
 * “mat”、“mdf”、“agi”或“luk”。
 * 如果加上'show'，它會在戰鬥訊息中顯示目標被移除的增益狀態。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     remove atk buff: user, show
 *                remove def buff: target
 *=============================================================================
 *
 *=============================================================================
 * REMOVE stat DEBUFF: target, (show)    （移除減益狀態）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 移除目標的減益狀態。將“stat”替換為“hp”、“mp”、“atk”、“def”、
 * “mat”、“mdf”、“agi”或“luk”。
 * 如果加上'show'，它會在戰鬥訊息中顯示目標被移除的減益狀態。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     remove atk debuff: user, show
 *                remove def debuff: target
 *=============================================================================
 *
 *=============================================================================
 * REMOVE STATE X: target (show)    （ 移除狀態 X ）
 * REMOVE STATE X, Y, Z: target (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 從目標中移除 X 狀態（如果以下面的格式使用則包括 Y 和 Z）。
 * 如果包含“show”，它將顯示任何與狀態相關的訊息。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     remove state 5: target
 *                remove state 6, 7, 8: user, show
 *=============================================================================
 *
 *=============================================================================
 * SE: filename, (volume), (pitch), (pan)   （音效的播放應用）
 * SE: PLAY OK
 * SE: PLAY CURSOR
 * SE: PLAY CANCEL
 * SE: PLAY BUZZER
 * SE: PLAY EQUIP
 * SE: PLAY SAVE
 * SE: PLAY LOAD
 * SE: PLAY BATTLE START
 * SE: PLAY ESCAPE
 * SE: PLAY ENEMY ATTACK
 * SE: PLAY ENEMY DAMAGE
 * SE: PLAY ENEMY COLLAPSE
 * SE: PLAY BOSS COLLAPSE 1
 * SE: PLAY BOSS COLLAPSE 2
 * SE: PLAY ACTOR DAMAGE
 * SE: PLAY ACTOR COLLAPSE
 * SE: PLAY RECOVERY
 * SE: PLAY MISS
 * SE: PLAY EVASION
 * SE: PLAY MAGIC EVASION
 * SE: PLAY REFLECTION
 * SE: PLAY SHOP
 * SE: PLAY USE ITEM
 * SE: PLAY USE SKILL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 讓戰鬥播放音效。如果您選擇一個文件（沒有副檔名），遊戲將播放那個 SE。
 * 使用此選項可以調整音量、音調和平移效果，所有這些都是可選的。如果沒有
 * 輸入音量、音調和平移的值，遊戲將使用此插件參數中的設置。
 * 使用包含“play x”的動作序列將播放 RPG Maker 數據庫中的系統聲音集。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     se: play enemy attack
 *                se: Ice1
 *                se: Laser2, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * TP +X: target, (show)        （ TP 值的相關應用）
 * TP -X: target, (show)
 * TP +X%: target, (show)
 * TP -X%: target, (show)
 * TP +VARIABLE X: target, (show)
 * TP -VARIABLE X: target, (show)
 * TP +VARIABLE X%: target, (show)
 * TP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 目標獲得等於 X 值的 TP。要顯示彈出視窗，請在行中的目標後插入“show”。
 * 是否包括 'show' 是完全可選的。如果省略 'show'，則不會顯示彈出視窗。
 * 為了讓 TP 真正顯示彈出視窗，需要另一個插件來顯示 TP 彈出視窗。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     tp +500: user
 *                tp -variable 5: target
 *                tp +25%: target
 *                tp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * WAIT: frames   （等待：幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使遊戲在進入動作序列中的下一個動作之前等待一定數量的幀。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait: 60
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ANIMATION  （等待動畫）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在繼續執行動作序列中的下一個動作之前等待所有動畫完成。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for animation
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR EFFECT   （等待效果）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在繼續之前等待所有效果完成播放。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for effect
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR MOVEMENT  （等待移動）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待所有戰鬥人物動作完成，然後再進行動作序列中的下一個動作。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for movement
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR NEW LINE  （等待新行）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在繼續動作序列中的下一個行動之前，等待訊息視窗中出現新行。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for new line
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR POPUPS  （等待彈出視窗）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 在繼續下一個行動之前等待所有彈出視窗完成播放。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for popups
 *=============================================================================
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.13:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.12:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.11:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.10a:
 * - Changed the 'Change Variable' action sequence to read more effectively.
 * - Documentation update for 'Action Common Event' and 'Common Event' to
 * indicate that they will not work immediately if used as a forced action
 * since another event is already running.
 *
 * Version 1.09:
 * - Fixed a bug that didn't allow for HP and MP buff/debuff removal.
 *
 * Version 1.08:
 * - Added 'Break Action' action sequence effect to completely cancel out all
 * of the remaining action effects.
 *
 * Version 1.07:
 * - Fixed a bug with the forcing a Collapse action sequence.
 *
 * Version 1.06:
 * - If using the Add State action sequence to add the Death state, it will
 * remove immortality settings.
 *
 * Version 1.05:
 * - Optimized status window to refresh at a minimum.
 *
 * Version 1.04:
 * - Updated help file to include Character X for target typing.
 *
 * Version 1.03:
 * - Fixed a bug that didn't make the sounds played work properly (again).
 *
 * Version 1.02:
 * - Fixed a bug that didn't make the sounds played work properly.
 *
 * Version 1.01:
 * - Fixed a small bug that didn't allow Change Variable to work properly with
 * evaluated strings.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack1');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SoundVolume = Number(Yanfly.Parameters['Default Volume']);
Yanfly.Param.SoundPitch = Number(Yanfly.Parameters['Default Pitch']);
Yanfly.Param.SoundPan = Number(Yanfly.Parameters['Default Pan']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP1.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ADD X BUFF
  if (actionName.match(/ADD[ ](.*)[ ]BUFF/i)) {
    return this.actionAddBuff(actionName, actionArgs);
  }
  // ADD X DEBUFF
  if (actionName.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
    return this.actionAddDebuff(actionName, actionArgs);
  }
  // ADD STATE X
  if (actionName.match(/(?:ADD_STATE|ADD STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    return this.actionAddState(actionName, actionArgs);
  }
  // ANIMATION X
  if (actionName.match(/ANIMATION[ ](\d+)/i)) {
    return this.actionAnimation(parseInt(RegExp.$1), actionArgs);
  }
  // BGM, MUSIC, SONG
  if (['BGM', 'MUSIC', 'SONG'].contains(actionName)) {
    return this.actionBgmPlay(actionArgs);
  }
  // BGS, AMBIENCE
  if (['BGS', 'AMBIENCE'].contains(actionName)) {
    return this.actionBgsPlay(actionArgs);
  }
  // BREAK ACTION
  if (actionName === 'BREAK ACTION') {
    return this.actionBreakAction();
  }
  // COLLAPSE: target, (force)
  if (actionName === 'COLLAPSE') {
    return this.actionCollapse(actionArgs);
  }
  // COMMON EVENT: event id
  if (actionName === 'COMMON EVENT') {
    return this.actionCommonEvent(actionArgs[0]);
  }
  // CHANGE SWITCH X
  if (actionName.match(/CHANGE[ ]SWITCH[ ](.*)/i)) {
    return this.actionChangeSwitch(actionName, actionArgs);
  }
  // CHANGE VARIABLE X
  if (actionName.match(/CHANGE[ ]VARIABLE[ ](.*)/i)) {
    return this.actionChangeVariable(actionName);
  }
  // EVAL, SCRIPT
  if (['EVAL', 'SCRIPT'].contains(actionName)) {
    return this.actionEval(actionArgs);
  }
  // GAIN ITEM (item, weapon, armor) X
  if (actionName.match(/GAIN[ ](.*)[ ](\d+)/i) ||
  actionName.match(/LOSE[ ](.*)[ ](\d+)/i)) {
    return this.actionGainItem(actionName, actionArgs);
  }
  // GOLD +/- VALUE
  if (actionName.match(/GOLD[ ]([\+\-]\d+)/i)) {
    return this.actionGoldModify(parseInt(RegExp.$1));
  }
  // ME, FANFARE
  if (['ME', 'FANFARE'].contains(actionName)) {
    return this.actionMePlay(actionArgs);
  }
  // REFRESH STATUS, REFRESH WINDOW
  if (['REFRESH STATUS', 'REFRESH WINDOW'].contains(actionName)) {
    return this.actionRefreshStatus();
  }
  // REMOVE X BUFF
  if (actionName.match(/REMOVE[ ](.*)[ ]BUFF/i)) {
    return this.actionRemoveBuff(actionName, actionArgs);
  }
  // REMOVE X DEBUFF
  if (actionName.match(/REMOVE[ ](.*)[ ]DEBUFF/i)) {
    return this.actionRemoveDebuff(actionName, actionArgs);
  }
  // REMOVE STATE X
  if
  (actionName.match(/(?:REMOVE_STATE|REMOVE STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    return this.actionRemoveState(actionName, actionArgs);
  }
  // SE, SOUND, SFX
  if (['SE', 'SOUND', 'SFX'].contains(actionName)) {
    return this.actionSePlay(actionArgs);
  }
  // HP +/- VALUE
  if (actionName.match(/HP[ ](.*)/i)) {
    return this.actionHpModify(actionName, actionArgs);
  }
  // MP +/- VALUE
  if (actionName.match(/MP[ ](.*)/i)) {
    return this.actionMpModify(actionName, actionArgs);
  }
  // TP +/- VALUE
  if (actionName.match(/TP[ ](.*)/i)) {
    return this.actionTpModify(actionName, actionArgs);
  }
  return Yanfly.ASP1.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.getParamId = function(stat) {
    switch (stat) {
    case 'HP':
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MP':
    case 'MAXMP':
    case 'MAX MP':
    case 'SP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT' || 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    }
    return -1;
};

BattleManager.actionAddBuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/ADD[ ](.*)[ ]BUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (actionArgs[1] && parseInt(actionArgs[1]) > 0) {
    var turns = parseInt(actionArgs[1]);
  } else {
    var turns = 5;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    target.addBuff(paramId, turns);
    if (show) this._logWindow.displayActionResults(this._subject, target);
  }, this);
  return true;
};

BattleManager.actionAddDebuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (actionArgs[1] && parseInt(actionArgs[1]) > 0) {
    var turns = parseInt(actionArgs[1]);
  } else {
    var turns = 5;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    target.addDebuff(paramId, turns);
    if (show) this._logWindow.displayActionResults(this._subject, target);
  }, this);
  return true;
};

BattleManager.actionAddState = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/(?:ADD_STATE|ADD STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    var states = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
  } else {
    return true;
  }
  targets.forEach(function(target) {
    for (var i = 0; i < states.length; ++i) {
      stateId = states[i];
      if (stateId === target.deathStateId()) {
        if (target._prevImmortalState === false) target.forceRemoveImmortal();
      }
      target.addState(stateId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionAnimation = function(aniId, actionArgs) {
  if (aniId <= 0) return;
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  this._logWindow.showNormalAnimation(targets, aniId, mirror);
  return true;
};

BattleManager.actionBgmPlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopBgm();
  } else if (actionArgs[0].toUpperCase() === 'MEMORIZE') {
    this._battleMemorizedBgm = AudioManager.saveBgm();
    return true;
  } else if (actionArgs[0].toUpperCase() === 'MEMORY') {
    if (this._battleMemorizedBgm) {
      AudioManager.replayBgm(this._battleMemorizedBgm);
    }
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var bgm = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playBgm(bgm);
  }
  return true;
};

BattleManager.actionBgsPlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopBgs();
  } else if (actionArgs[0].toUpperCase() === 'MEMORIZE') {
    this._battleMemorizedBgs = AudioManager.saveBgs();
    return true;
  } else if (actionArgs[0].toUpperCase() === 'MEMORY') {
    if (this._battleMemorizedBgs) {
      AudioManager.replayBgs(this._battleMemorizedBgs);
    }
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var bgs = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playBgs(bgs);
  }
  return true;
};

BattleManager.actionBreakAction = function() {
    this._targets = [];
    this._actionList = [];
    this._individualTargets = [];
    this._phase = 'phaseChange';
    return false;
};

BattleManager.actionCollapse = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var force = false;
  if (actionArgs[1]) var force = (actionArgs[1].toUpperCase() === 'FORCE');
  targets.forEach(function(target) {
    if (force) {
      target.removeImmortal();
      target.addState(target.deathStateId());
    }
    if (target.isDeathStateAffected()) target.performCollapse();

  }, this);
  return false;
};

BattleManager.actionCommonEvent = function(id) {
  if ($gameTroop.isEventRunning()) {
    var ev = $dataCommonEvents[id];
    if (!ev) return;
    var list = ev.list;
    var interpreter = $gameTroop._interpreter;
    interpreter.setupChild(list, 0);
  } else {
    $gameTemp.reserveCommonEvent(id);
  }
  return false;
};

BattleManager.actionChangeSwitch = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var switches = [];
  if (actionName.match(/SWITCH[ ](\d+)/i)) {
    switches = [parseInt(RegExp.$1)];
  } else if (actionName.match(/SWITCH[ ](\d+)..(\d+)/i)) {
    switches = [getRange(parseInt(RegExp.$1), parseInt(RegExp.$2))];
  } else if (actionName.match(/SWITCH[ ](\d+)[ ]TO[ ](\d+)/i)) {
      switches = [getRange(parseInt(RegExp.$1), parseInt(RegExp.$2))];
  } else {
    return true;
  }
  var result = actionArgs[0].toUpperCase();
  var value;
  if (['ON', 'TRUE'].contains(result)) {
    value = true;
  } else if (['OFF', 'FALSE'].contains(result)) {
    value = false;
  } else if (['TOGGLE', 'OPPOSITE', 'REVERSE'].contains(result)) {
    value = 'toggle';
  } else if (result.match(/SWITCH[ ](\d+)/i)) {
    value = $gameSwitches.value(parseInt(RegExp.$1));
  }
  switches.forEach(function(switchId) {
    if (value === 'toggle') {
      $gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
    } else {
      $gameSwitches.setValue(switchId, value);
    }
  }, this);
  return true;
};

BattleManager.actionChangeVariable = function(actionName) {
  var cV1 =
  /CHANGE[ ](?:VARIABLE|VAR)[ ](\d+)[ ](.*)[ ](?:VARIABLE|VAR)[ ](\d+)/i;
  var cV2 = /CHANGE[ ](?:VARIABLE|VAR)[ ](\d+)[ ](.*?)[ ](.*)/i;
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  if (this._actSeq[0].match(cV1)) {
    var mainVar = parseInt(RegExp.$1);
    var operation = String(RegExp.$2);
    var editVar = $gameVariables.value(parseInt(RegExp.$3));
  } else if (this._actSeq[0].match(cV2)) {
    var mainVar = parseInt(RegExp.$1);
    var operation = String(RegExp.$2);
    var editVar = eval(String(RegExp.$3));
  } else {
    return true;
  }
  var mainValue = $gameVariables.value(mainVar);
  if (['='].contains(operation)) {
    $gameVariables.setValue(mainVar, eval(editVar));
  } else if (['+=', '+'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue + eval(editVar));
  } else if (['-=', '-'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue - eval(editVar));
  } else if (['*=', '*'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue * eval(editVar));
  } else if (['/=', '/'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue / eval(editVar));
  } else if (['%=', '%'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue % eval(editVar));
  }
  return true;
};

BattleManager.actionEval = function(actionArgs) {
    if (actionArgs.length < 1) return true;
    var subject = this._subject;
    var user = this._subject;
    var target = this._targets[0];
    var targets = this._targets;
    var action = this._action;
    var item = this._action.item();
    var text = String(actionArgs[0]);
    for (var i = 1; i < actionArgs.length; ++i) {
        text = text + ', ' + String(actionArgs[i]);
    }
    try {
      eval(text);
    } catch (e) {
      Yanfly.Util.displayError(e, text, 'ACTION SEQUENCE EVAL ERROR');
    }
    return false;
};

BattleManager.actionGainItem = function(actionName, actionArgs) {
    var gainItem;
    var type;
    var itemId;
    if (actionName.match(/GAIN[ ](.*)[ ](\d+)/i)) {
      gainItem = true;
      type = String(RegExp.$1).toUpperCase();
      itemId = parseInt(RegExp.$2);
    } else if (actionName.match(/LOSE[ ](.*)[ ](\d+)/i)) {
      gainItem = false;
      type = String(RegExp.$1).toUpperCase();
      itemId = parseInt(RegExp.$2);
    } else {
      return true;
    }
    var item;
    if (type === 'ITEM') {
      item = $dataItems[itemId];
    } else if (['WPN', 'WEAPON'].contains(type)) {
      item = $dataWeapons[itemId];
    } else if (['ARM', 'ARMOR', 'ARMOUR'].contains(type)) {
      item = $dataArmors[itemId];
    } else {
      return true;
    }
    var amount = Math.max(1, parseInt(actionArgs[0]));
    if (isNaN(amount)) amount = 1;
    if (gainItem)  $gameParty.gainItem(item, amount);
    if (!gainItem) $gameParty.loseItem(item, amount);
    return true;
};

BattleManager.actionGoldModify = function(value) {
    $gameParty.gainGold(value);
    return true;
};

BattleManager.actionHpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/HP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/HP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%％])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/HP[ ]([\+\-]\d+)([%％])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/HP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.mhp * change * 0.01) : change;
      target.gainHp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

BattleManager.actionMePlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopMe();
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var me = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playMe(me);
  }
  return true;
};

BattleManager.actionMpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/MP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/MP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%％])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/MP[ ]([\+\-]\d+)([%％])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/MP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.mmp * change * 0.01) : change;
      target.gainMp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

BattleManager.actionRefreshStatus = function() {
    this._statusWindow.refresh();
    return false;
};

BattleManager.actionRemoveBuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/REMOVE[ ](.*)[ ]BUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    if (target.isBuffAffected(paramId)) {
      target.removeBuff(paramId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionRemoveDebuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/REMOVE[ ](.*)[ ]DEBUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    if (target.isDebuffAffected(paramId)) {
      target.removeBuff(paramId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionRemoveState = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if
  (actionName.match(/(?:REMOVE_STATE|REMOVE STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    var states = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
  } else {
    return true;
  }
  targets.forEach(function(target) {
    for (var i = 0; i < states.length; ++i) {
      stateId = states[i];
      if (target.isStateAffected(stateId)) {
        target.removeState(stateId);
        if (show) this._logWindow.displayActionResults(this._subject, target);
      }
    }
  }, this);
  return true;
};

BattleManager.actionSePlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'PLAY CURSOR') {
    SoundManager.playCursor();
  } else if (actionArgs[0].toUpperCase() === 'PLAY OK') {
    SoundManager.playOk();
  } else if (actionArgs[0].toUpperCase() === 'PLAY CANCEL') {
    SoundManager.playCancel();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BUZZER') {
    SoundManager.playBuzzer();
  } else if (actionArgs[0].toUpperCase() === 'PLAY EQUIP') {
    SoundManager.playEquip();
  } else if (actionArgs[0].toUpperCase() === 'PLAY SAVE') {
    SoundManager.playSave();
  } else if (actionArgs[0].toUpperCase() === 'PLAY LOAD') {
    SoundManager.playLoad();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BATTLE START') {
    SoundManager.playBattleStart();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ESCAPE') {
    SoundManager.playEscape();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY ATTACK') {
    SoundManager.playEnemyAttack();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY DAMAGE') {
    SoundManager.playEnemyDamage();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY COLLAPSE') {
    SoundManager.playEnemyCollapse();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BOSS COLLAPSE 1') {
    SoundManager.playBossCollapse1();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BOSS COLLAPSE 2') {
    SoundManager.playBossCollapse2();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ACTOR DAMAGE') {
    SoundManager.playActorDamage();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ACTOR COLLAPSE') {
    SoundManager.playActorCollapse();
  } else if (actionArgs[0].toUpperCase() === 'PLAY RECOVERY') {
    SoundManager.playRecovery();
  } else if (actionArgs[0].toUpperCase() === 'PLAY MISS') {
    SoundManager.playMiss();
  } else if (actionArgs[0].toUpperCase() === 'PLAY EVASION') {
    SoundManager.playEvasion();
  } else if (actionArgs[0].toUpperCase() === 'PLAY MAGIC EVASION') {
    SoundManager.playMagicEvasion();
  } else if (actionArgs[0].toUpperCase() === 'PLAY REFLECTION') {
    SoundManager.playReflection();
  } else if (actionArgs[0].toUpperCase() === 'PLAY SHOP') {
    SoundManager.playShop();
  } else if (actionArgs[0].toUpperCase() === 'PLAY USE ITEM') {
    SoundManager.playUseItem();
  } else if (actionArgs[0].toUpperCase() === 'PLAY USE SKILL') {
    SoundManager.playUseSkill();
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var se = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playSe(se);
  }
  return true;
};

BattleManager.actionTpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/TP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/TP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%％])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/TP[ ]([\+\-]\d+)([%％])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/TP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.maxTp() * change * 0.01) : change;
      target.gainTp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

//=============================================================================
// Utilities
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

//=============================================================================
// End of File
//=============================================================================
};
