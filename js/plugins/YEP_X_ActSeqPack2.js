//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 2
// YEP_X_ActSeqPack2.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack2 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP2 = Yanfly.ASP2 || {};
Yanfly.ASP2.version = 1.13;

//=============================================================================
 /*:
 * @plugindesc v1.13 （需要 YEP_BattleEngineCore.js）戰鬥引擎核心的動作
 * 序列中添加了視覺功能。
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * Action Sequence Pack 2 插件是 Yanfly Engine Plugins 的 Battle Engine Core 
 * 的擴展插件。如果沒有主插件，此擴展插件將無法工作。這個擴展插件包含更基
 * 本的功能，用於在視覺比例上定制動作序列。
 * 這個插件專注於讓戰鬥人物執行視覺動作。
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
 * ATTACK ANIMATION: target, (mirror)  攻擊動畫：目標，（映射）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 顯示當前戰鬥者對目標的攻擊動畫。這將是由角色的武器決定的動畫。
 * 如果是敵人，則由敵人的攻擊動畫決定。 如果使用'mirror'，動畫將被翻轉。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： attack animation: target
 *=============================================================================
 *
 *=============================================================================
 * ENEMY EFFECT: target, effect-type   敵人效果：目標，效果類型
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 這僅影響敵人。 使目標顯示“變白”效果或“閃爍”效果。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     enemy effect: targets, whiten
 *                enemy effect: targets, blink
 *=============================================================================
 *
 *=============================================================================
 * FACE target: args      面向目標：args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FACE target1: FORWARD             面對目標1：前進
 * FACE target1: BACKWARD            面對目標1：後退
 * FACE target1: HOME                面對目標1：回到起點
 * FACE target1: AWAY FROM HOME      面對目標1：遠離起點
 * FACE target1: POINT, x coordinate, y coordinate 
 *             面對目標1：移到定點，X,Y 座標
 * FACE target1: AWAY FROM POINT, x coordinate, y coordinate
 *             面對目標1：遠離定點，X,Y 座標
 * FACE target1: target2             面對目標1：目標2
 * FACE target1: AWAY FROM target2   面對目標1：遠離目標 2
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 這會導致戰鬥者面對某個方向。可以在上述格式中使用參數。此動作序列命令
 * 將使 target1 面向這些方向中的任何一個。如果使用 target2，則 target1 
 * 將面向相對於 target2 的方向。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     face user: forward
 *                face target: backward
 *                face enemies: home
 *                face allies: away from home
 *                face target: point, 20, 40
 *                face target: away from point, 500, 600
 *                face user: target
 *                face target: away from user
 *=============================================================================
 *
 *=============================================================================
 * FADE OUT: (frames)      淡出：（幀）
 * FADE IN: (frames)       淡入：（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 分別淡出畫面和淡入畫面。 您可以設定淡入淡出過程的幀數。 
 * 如果省略幀，則預設使用 60 幀。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     fade out
 *                fade in: 10
 *=============================================================================
 *
 *=============================================================================
 * FLASH SCREEN: args      （畫面閃爍：args）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FLASH SCREEN: WHITE, (frames)
 * FLASH SCREEN: RED, (frames)
 * FLASH SCREEN: ORANGE, (frames)
 * FLASH SCREEN: YELLOW, (frames)
 * FLASH SCREEN: GREEN, (frames)
 * FLASH SCREEN: BLUE, (frames)
 * FLASH SCREEN: PURPLE, (frames)
 * FLASH SCREEN: MAGENTA, (frames)
 * FLASH SCREEN: BLACK, (frames)
 * FLASH SCREEN: (red), (green), (blue), (intensity), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 讓畫面閃爍設定的顏色。若使用參數設定的顏色，將使用預設的閃光設置。
 * 如果您選擇使用自己的設定，請使用紅色、綠色、藍色、強度格式來確定您
 * 想要哪種顏色的閃光燈。紅色、綠色、藍色和強度設置範圍從 0 到 255。
 * 若使用幀，這將是畫面閃爍的持續時間。如果省略，預設幀數將為 60 幀。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     flash screen: white
 *                flash screen: red, 45
 *                flash screen: 128, 170, 214, 170
 *                flash screen: 68, 68, 68, 170, 45
 *=============================================================================
 *
 *=============================================================================
 * FLOAT target: (height), (frames)      飄浮目標：（高度）,（幀數）
 * FLOAT target: (height%), (frames)     飄浮目標：（高度%）,（幀數）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使目標飄浮在距離地面高度%的空中。高度是相對於飄浮目標的。使用 100% 
 * 意味著目標將飄浮在比其高度高 100% 的地面上。如果未使用“%”符號，則
 * 目標將飄浮設定數值的像素而不是目標高度的百分比。幀數決定了目標達到
 * 該高度需要多少幀。高度設定為 0% 將使目標回到地面。
 * 注意：飄浮僅適用於側視戰鬥模式。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     float user: 200%
 *                float enemies: 500, 30
 *                float target: 0%, 30
 *=============================================================================
 *
 *=============================================================================
 * HIDE BATTLE HUD     （隱藏戰鬥介面）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 隱藏戰鬥介面以不妨礙正在播放的任何動畫。 
 * 您可以使用“顯示戰鬥介面”再次顯示戰鬥介面。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： hide battle hud
 *=============================================================================
 *
 *=============================================================================
 * JUMP target: (height), (frames)      跳躍目標：（高度）,（幀數）
 * JUMP target: (height%), (frames)     跳躍目標：（高度%）,（幀數）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使目標相對於目標本身跳躍一個高度。如果目標跳躍高度為 200%，則高度將
 * 為目標高度的 200%。如果沒有使用 '%' 符號，目標將跳躍設定數值的像素
 * 而不是目標高度的百分比。幀數是目標在空中的時間。您可以將其與“移動”
 * 動作序列結合使用，使目標看起來像是在跳躍一段距離。
 * 注意：跳躍僅適用於側視戰鬥模式。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     jump user: 150%
 *                jump target: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * MOTION type: target, (no weapon)  動作類型：目標，（無武器）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOTION WALK: target       行走
 * MOTION STANDBY: target    待機
 * MOTION CHANT: target      詠唱
 * MOTION GUARD: target      防禦
 * MOTION DAMAGE: target     受傷
 * MOTION EVADE: target      迴避
 * MOTION ATTACK: target     攻擊
 * MOTION THRUST: target     推撞
 * MOTION SWING: target      擺動
 * MOTION MISSILE: target    投射物
 * MOTION SKILL: target      技能
 * MOTION SPELL: target      法術
 * MOTION ITEM: target       物品
 * MOTION ESCAPE: target     逃跑
 * MOTION VICTORY: target    勝利
 * MOTION DYING: target      瀕死
 * MOTION ABNORMAL: target   異常
 * MOTION SLEEP: target      睡眠
 * MOTION DEAD: target       死亡
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 強制目標在側視戰鬥模式中執行特定類型的動作。如果您向目標發出動作序
 * 列命令以執行“攻擊”，目標將根據其裝備的武器自動判斷使用推撞、擺動
 * 或投射物。若有武器，攻擊、推撞、擺動和投射物也會顯示目標的武器。
 *
 * 如果在目標之後使用“無武器”，則不顯示任何武器。
 * 此效果僅適用於推撞、擺動和投射物。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     motion walk: user
 *                motion thrust: user, no weapon
 *=============================================================================
 *
 *=============================================================================
 * MOVE target: args     （移動目標：args）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOVE target1: HOME, (frames)                  原點
 * MOVE target1: RETURN, (frames)                返回
 * MOVE target1: FORWARD, (distance), (frames)   前進
 * MOVE target1: BACKWARD, (distance), (frames)  後退
 * MOVE target1: POINT, x coordinate, y coordinate, (frames)
 *          移動目標1：點，x坐標，y坐標，（幀）
 * MOVE target1: target2, BASE, (frames), (offset)              底部   想
 * MOVE target1: target2, CENTER, (frames), (offset)            中間   像
 * MOVE target1: target2, HEAD, (frames), (offset)              頭部   九
 * MOVE target1: target2, FRONT BASE, (frames), (offset)    前段底部   宮
 * MOVE target1: target2, FRONT CENTER, (frames), (offset)  前段中間   格
 * MOVE target1: target2, FRONT HEAD, (frames), (offset)    前段頭部   圖
 * MOVE target1: target2, BACK BASE, (frames), (offset)     後段底部   ！
 * MOVE target1: target2, BACK CENTER, (frames), (offset)   後段中間
 * MOVE target1: target2, BACK HEAD, (frames), (offset)     後段頭部
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 這是一個移動命令。可以在上述格式中使用參數。此動作序列命令會將
 * target1 移動到參數中列出的任何位置。如果它朝向目標 2，則必須包
 * 含相對於目標 2 的位置以便目標 1 前往。
 * 注意：移動僅適用於側視戰鬥模式。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 您可能對某些項目的可選（偏移）參數感到好奇。 
 * 您可以插入以下任何參數來代替 (偏移)：
 *
 *   offset x +100
 *   offset x -200
 *   offset y +300
 *   offset y -400
 *
 * 允許您將到目的地的距離偏移一個固定量。正數表示向前，負數表示向後。
 *
 *   auto offset x +500
 *   auto offset x -600
 *
 * 但是，如果您使用上述任何一種，根據使用者是角色還是敵人以及根據目
 * 標（如果有的話）是角色還是敵人，它會相應地將他們移動到適當位置。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     move user: home, 20
 *                move target: forward, 48, 12
 *                move enemy 1: point, 400, 300
 *                move enemy 2: point, 500, 250, offset x -50, offset y -50
 *                move actor 3: target, front base, 20
 *                move user: target, front base, 20, auto offset x -100
 *=============================================================================
 *
 *=============================================================================
 * OPACITY target: x, (frames)     不透明度目標：x，（幀）
 * OPACITY target: x%, (frames)    不透明度目標：x%，（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將目標的不透明度更改為 x (0-255) 或 x%（0% 到 100%）。
 * 如果您使用“幀”，這將是目標不透明度變化的持續時間所需要的幀數。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： opacity user: 50%, 30
 *                opacity not focus: 0
 *=============================================================================
 *
 *=============================================================================
 * SHOW BATTLE HUD    （顯示戰鬥介面）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 如果使用“隱藏戰鬥介面”隱藏介面，請使用它在畫面中顯示戰鬥介面。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： show battle hud
 *=============================================================================
 *
 *=============================================================================
 * SHAKE SCREEN: (power), (speed), (frames) 畫面震動：力道、速度、幀數
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 讓遊戲畫面震動。調整 0-9 的力道，0-9 的速度，以及改變畫面震動持續時
 * 間的幀數。如果省略這些值，它們將預設為 5 力道、5 速度和 60 幀。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     shake screen
 *                shake screen: 9
 *                shake screen: 3, 9, 30
 *=============================================================================
 *
 *=============================================================================
 * TINT SCREEN: args    （畫面色調：args）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * TINT SCREEN: NORMAL, (frames)     正常
 * TINT SCREEN: DARK, (frames)       黑暗
 * TINT SCREEN: SEPIA, (frames)      棕褐色
 * TINT SCREEN: SUNSET, (frames)     日落
 * TINT SCREEN: NIGHT, (frames)      晚上
 * TINT SCREEN: (red), (green), (blue), (gray), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 改變戰鬥畫面的色調。如果使用參數 'normal'、'dark'、'sepia'、'sunset' 
 * 或 'night'，畫面將被更換為預設色調。如果不是，則必須為色調輸入紅色、
 * 綠色、藍色和灰色值的參數。紅色、綠色和藍色的範圍從 -255 到 255，而灰
 * 色的範圍從 0 到 255。如果使用幀，這將是畫面更改色調的持續時間。 
 * 如果省略，預設使用的幀數將為 60 幀。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     tint screen: normal
 *                tint screen: sepia, 30
 *                tint screen: 68, -34, -34, 0
 *                tint screen: 68, -68, 0, 68, 45
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR FLOAT      （等待飄浮）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待所有戰鬥者飄浮完成，然後再繼續動作序列中的下一個動作。
 * 注意：飄浮僅適用於側視戰鬥模式。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for float
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR JUMP       （等待跳躍）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待所有戰鬥者跳躍完成，然後再繼續動作序列中的下一個動作。
 * 注意：跳躍僅適用於側視戰鬥模式。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for jump
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR OPACITY    （等待不透明）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待所有戰鬥者完成更改不透明度，然後再進行動作序列中的下一個動作。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例： wait for opacity
 *=============================================================================
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.13:
 * - Updated Float and Jump to allow for negative values.
 *
 * Version 1.12:
 * - Updated for RPG Maker MV version 1.5.0.
 * - Added new Offset X, Offset Y, arguments for the Move action sequence.
 *   Check the helpfile for more information.
 *
 * Version 1.11:
 * - Fixed a bug that caused enemies to not mirror the attack animation.
 *
 * Version 1.10a:
 * - Fixed a bug that caused scaled enemies to have their state icons and
 * overlays appear in odd places.
 * - Documentation update for Move, Float, and Jump related action sequences as
 * they only work in Sideview.
 *
 * Version 1.09:
 * - Animations played on a floating or jumping battlers 'Feet' location will
 * now be played at the base of the battler regardless of how high the battler
 * is floating. This is to provide a more consistent animation image.
 *
 * Version 1.08a:
 * - State Icon and State Overlays will now synch together for floating and
 * jumping battlers.
 *
 * Version 1.07c:
 * - Synchronized battle animations to floating and jumping battlers.
 * 
 * Version 1.06:
 * - Updated weapon motions for YEP_X_AnimatedSVEnemies to work with sideview
 * enemies.
 *
 * Version 1.05:
 * - Creating compatibility for a future plugin.
 *
 * Version 1.04a:
 * - Rewrote and updated movement formulas.
 *
 * Version 1.03:
 * - Made a change to Motion action sequence. 'Wait' is now substituted for
 * 'Standby' as to not confuse it with the actual Motion Wait action sequence.
 * - Added a 'no weapon' option to Motion action sequences. This new tag will
 * only affect the 'Thrust', 'Swing', and 'Missile' motions.
 *
 * Version 1.02:
 * - Added a check for motion attack to differentiate between actor and enemy.
 *
 * Version 1.01:
 * - Updated help file to include Character X for target typing.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack2');
Yanfly.Param = Yanfly.Param || {};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP2.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ATTACK ANIMATION
  if (actionName === 'ATTACK ANIMATION') {
    return this.actionAttackAnimation(actionArgs);
  }
  // ENEMY EFFECT
  if (actionName === 'ENEMY EFFECT') {
    return this.actionEnemyEffect(actionArgs);
  }
  // FACE TARGET
  if (actionName.match(/FACE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFace(string, actionArgs);
    }
  }
  // FADE IN, FADE OUT
  if (['FADE IN', 'FADE OUT'].contains(actionName)) {
    return this.actionFadeScreen(actionName, actionArgs);
  }
  // FLASH SCREEN
  if (actionName === 'FLASH SCREEN') {
    return this.actionFlashScreen(actionArgs);
  }
  // FLOAT TARGET
  if (actionName.match(/FLOAT[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFloat(string, actionArgs);
    }
  }
  // HIDE BATTLE HUD, SHOW BATTLE HUD
  if (['HIDE BATTLE HUD', 'SHOW BATTLE HUD'].contains(actionName)) {
    return this.actionBattleHud(actionName);
  }
  // JUMP TARGET
  if (actionName.match(/JUMP[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionJump(string, actionArgs);
    }
  }
  // MOTION TYPE
  if (actionName.match(/MOTION[ ](.*)/i)) {
    return this.actionMotionTarget(String(RegExp.$1), actionArgs);
  }
  // MOVE TARGET
  if (actionName.match(/MOVE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionMove(string, actionArgs);
    }
  }
  // OPACITY TARGET
  if (actionName.match(/OPACITY[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionOpacity(string, actionArgs);
    }
  }
  // SHAKE SCREEN
  if (actionName === 'SHAKE SCREEN') {
    return this.actionShakeScreen(actionArgs);
  }
  // TINT SCREEN
  if (actionName === 'TINT SCREEN') {
    return this.actionTintScreen(actionArgs);
  }
  // WAIT FOR FLOAT
  if (actionName === 'WAIT FOR FLOAT') {
    return this.actionWaitForFloat();
  }
  // WAIT FOR JUMP
  if (actionName === 'WAIT FOR JUMP') {
    return this.actionWaitForJump();
  }
  // WAIT FOR OPACITY
  if (actionName === 'WAIT FOR OPACITY') {
    return this.actionWaitForOpacity();
  }
  return Yanfly.ASP2.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAttackAnimation = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  if (mirror) {
    this._logWindow.showActorAtkAniMirror(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  } else {
    this._logWindow.showAttackAnimation(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  }
  return true;
};

BattleManager.actionBattleHud = function(actionName) {
  if (actionName === 'HIDE BATTLE HUD') {
    this._windowLayer.x = Graphics.boxWidth * 495;
  } else if (actionName === 'SHOW BATTLE HUD') {
    this._windowLayer.x = 0;
  }
  return false;
}

BattleManager.actionEnemyEffect = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    if (actionArgs[1].toUpperCase() === 'WHITEN') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('whiten');
      });
    } else if (actionArgs[1].toUpperCase() === 'BLINK') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('blink');
      });
    }
    return true;
};

BattleManager.actionFace = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['FORWARD', 'NORMAL'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceForward();
      });
    } else if (['BACKWARD', 'MIRROR'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceBackward();
      });
    } else if (['HOME', 'ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceHome();
      });
    } else if (['AWAY FROM HOME', 'AWAY FROM ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceAwayHome();
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      });
    } else if (['AWAY FROM POINT', 'AWAY FROM POSITION', 'AWAY FROM COORDINATE',
    'AWAY FROM SCREEN', 'AWAY FROM SCREEN POS',
    'AWAY FROM COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      });
    } else if (cmd.match(/AWAY[ ]FROM[ ](.*)/i)) {
      var targets = this.makeActionTargets(String(RegExp.$1));
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      }, this);
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      }, this);
    }
    return false;
};

BattleManager.actionFadeScreen = function(actionName, actionArgs) {
  var frames = actionArgs[0] || 60;
  if (actionName === 'FADE IN') {
    $gameScreen.startFadeIn(frames);
  } else if (actionName === 'FADE OUT') {
    $gameScreen.startFadeOut(frames);
  }
  return false;
};

BattleManager.actionFlashScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'WHITE') {
      var flash = [255, 255, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'RED') {
      var flash = [255, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'ORANGE') {
      var flash = [255, 128, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'YELLOW') {
      var flash = [255, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'GREEN') {
      var flash = [0, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLUE') {
      var flash = [0, 128, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'PURPLE') {
      var flash = [128, 64, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'MAGENTA') {
      var flash = [255, 0, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLACK') {
      var flash = [0, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var intensity = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var flash = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(intensity)];
    }
    $gameScreen.startFlash(flash, frames);
    return false;
};

BattleManager.actionFloat = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(.*)([%％])/i)) {
      var floatPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(cmd) || 0;
      var floatPeak = 0.0;
    } else {
      var floatPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var floatRate = floatPeak + (pixels / mover.spriteHeight());
      mover.spriteFloat(floatRate, frames);
    });
    return false;
};

BattleManager.actionJump = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(.*)([%％])/i)) {
      var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(cmd) || 0;
      var jumpPeak = 0.0;
    } else {
      var jumpPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
      mover.spriteJump(jumpRate, frames);
    });
    return true;
};

BattleManager.actionMotionTarget = function(name, actionArgs) {
    if (name.toUpperCase() === 'WAIT') return this.actionMotionWait(actionArgs);
    if (name.toUpperCase() === 'STANDBY') name = 'WAIT';
    var movers = this.makeActionTargets(actionArgs[0]);
    if (movers.length < 1) return true;
    var cmd = name.toLowerCase();
    var motion = 'wait';
    if (actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON') {
      var showWeapon = false;
    } else {
      var showWeapon = true;
    }
    if (['wait', 'chant', 'guard', 'evade', 'skill', 'spell', 'item', 'escape',
    'victory', 'dying', 'abnormal', 'sleep', 'dead'].contains(cmd)) {
      motion = cmd;
    } else if (['walk', 'move'].contains(cmd)) {
      motion = 'walk';
    } else if (['damage', 'hit'].contains(cmd)) {
      motion = 'damage';
    } else if (['attack'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.performAttack();
      });
      return false;
    } else if (['randattack'].contains(cmd)) {
      var motions = ['thrust', 'swing', 'missile'];
      movers.forEach(function(mover) {
        var motion = motions[Math.floor(Math.random() * motions.length)];
        mover.forceMotion(motion);
      });
      return false;
    } else if (['thrust', 'swing', 'missile'].contains(cmd)) {
      motion = cmd;
      movers.forEach(function(mover) {
        mover.forceMotion(motion);
        if (mover.isActor() && showWeapon) {
          var weapons = mover.weapons();
          var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
          var attackMotion = $dataSystem.attackMotions[wtypeId];
          if (attackMotion && [0, 1, 2].contains(attackMotion.type)) {
            mover.startWeaponAnimation(attackMotion.weaponImageId);
          }
        }
        if (Imported.YEP_X_AnimatedSVEnemies) {
          if (mover.isEnemy() && mover.hasSVBattler() && showWeapon) {
            var attackMotion = $dataSystem.attackMotions[wtypeId];
            mover.startWeaponAnimation(mover.weaponImageId());
          }
        }
      });
      return false;
    }
    movers.forEach(function(mover) {
      mover.forceMotion(motion);
    });
    return false;
};

BattleManager.actionMove = function(name, actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['HOME', 'ORIGIN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('walk');
        mover.spriteFaceHome();
      });
    } else if (['RETURN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('evade');
        mover.spriteFaceForward();
      });
    } else if (['FORWARD', 'FORWARDS', 'BACKWARD',
    'BACKWARDS'].contains(cmd)) {
      var distance = actionArgs[1] || Yanfly.Param.BECStepDist;
      if (['BACKWARD', 'BACKWARDS'].contains(cmd)) distance *= -1;
      var frames = actionArgs[2] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveForward(distance, frames);
        mover.requestMotion('walk');
        if (['FORWARD', 'FORWARDS'].contains(cmd)) {
          mover.spriteFaceForward();
        } else {
          mover.spriteFaceBackward();
        }
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      var frames = actionArgs[3] || 12;
      movers.forEach(function(mover) {
        var offsetX = BattleManager.actionMoveOffsetX(actionArgs, mover, mover);
        var offsetY = BattleManager.actionMoveOffsetY(actionArgs, mover, mover);
        mover.battler().moveToPoint(destX + offsetX, destY + offsetY, frames);
        mover.requestMotion('walk');
        mover.spriteFacePoint(destX, destY);
      });
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      var frames = actionArgs[2] || 12;
      var type = actionArgs[1].toUpperCase();
      if (targets.length < 1) return false;
      for (var i = 0; i < movers.length; ++i) {
      	var mover = movers[i];
      	if (!mover) continue;
      	if (['BASE', 'FOOT', 'FEET'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['CENTER', 'MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['HEAD', 'TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
	      'FRONT'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
	      'BACK'].contains(type)) {
	      	var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      }
        var offsetX = this.actionMoveOffsetX(actionArgs, mover, targets[0]);
        var offsetY = this.actionMoveOffsetY(actionArgs, mover, targets[0]);
	      mover.battler().moveToPoint(destX + offsetX, destY + offsetY, frames);
        mover.spriteFacePoint(destX, destY);
      }
    }
    return true;
};

BattleManager.actionMoveX = function(mover, targets, value) {
		value = this.actionMoveXLocation(mover, targets, value);
		var max = targets.length;
		var moverWidth = mover.spriteWidth();
		if (value === 'center') {
			var destX = null;
		} else {
			var destX = (value === 'left') ? Graphics.boxWidth : 0;
		}
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			var targetWidth = target.spriteWidth();
			var point = target.spritePosX();
			if (value === 'center') {
				destX = (destX === null) ? 0 : destX;
				destX += point;
			} else if (value === 'left') {
				point -= targetWidth / 2;
				point -= (mover.isActor() ? 1 : 1) * moverWidth / 2;
				destX = Math.min(point, destX);
			} else {
				point += targetWidth / 2;
				point += (mover.isActor() ? 1 : 1) * moverWidth / 2;
				destX = Math.max(point, destX);
			}
		}
		if (value === 'center') destX /= max;
		return destX;
};

BattleManager.actionMoveXLocation = function(mover, targets, value) {
		if (value === 'center') return 'center';
		var actors = 0;
		var enemies = 0;
		var max = targets.length;
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			if (target.isActor()) actors += 1;
			if (target.isEnemy()) enemies += 1;
		}
		if (actors > 0 && enemies === 0) {
			return (value === 'front') ? 'left' : 'right';
		} else if (actors === 0 && enemies > 0) {
			return (value === 'front') ? 'right' : 'left';
		} else {
			if (mover.isActor()) {
				return (value === 'front') ? 'right' : 'left';
			} else { // enemy
				return (value === 'front') ? 'left' : 'right';
			}
		}
		return 'center';
};

BattleManager.actionMoveY = function(mover, targets, value) {
		var max = targets.length;
		var destY = 0;
		var point = (value === 'head') ? Graphics.boxHeight : 0;
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			if (value === 'head') {
				point = Math.min(target.spritePosY() - target.spriteHeight(), point);
			} else if (value === 'center') {
				point += target.spritePosY() - target.spriteHeight() / 2;
			} else { // foot
				point = Math.max(target.spritePosY(), point);
			}
		}
		destY = (value === 'center') ? point / max : point;
		return destY;
};

BattleManager.actionMoveOffsetX = function(actionArgs, user, target) {
  if (actionArgs && actionArgs.length > 0) {
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var line = actionArgs[i];
      if (line.match(/AUTO OFFSET X[ ]([\+\-]\d+)/i)) {
        var value = parseInt(RegExp.$1);
        if (user.isActor() && !target) {
          return value * -1;
        } else if (user.isEnemy() && !target) {
          return value;
        } else if (user.isActor() && target.isActor()) {
          return value;
        } else if (user.isActor() && target.isEnemy()) {
          return value * -1;
        } else if (user.isEnemy() && target.isEnemy()) {
          return value * -1;
        } else if (user.isEnemy() && target.isActor()) {
          return value;
        }
      } else if (line.match(/OFFSET X[ ]([\+\-]\d+)/i)) {
        return parseInt(RegExp.$1);
      }
    }
  }
  return 0;
};

BattleManager.actionMoveOffsetY = function(actionArgs, user, target) {
  if (actionArgs && actionArgs.length > 0) {
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var line = actionArgs[i];
      if (line.match(/AUTO OFFSET Y[ ]([\+\-]\d+)/i)) {
        return parseInt(RegExp.$1);
      } else if (line.match(/OFFSET Y[ ]([\+\-]\d+)/i)) {
        return parseInt(RegExp.$1);
      }
    }
  }
  return 0;
};

BattleManager.actionOpacity = function(name, actionArgs) {
    var targets = this.makeActionTargets(name);
    if (targets.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    if (cmd.match(/(\d+)([%％])/i)) {
      var opacity = parseInt(RegExp.$1 * 0.01 * 255).clamp(0, 255);
    } else if (cmd.match(/(\d+)/i)) {
      var opacity = parseInt(RegExp.$1);
    } else {
      return false;
    }
    targets.forEach(function(target) {
      target.spriteOpacity(opacity, frames);
    });
    return false;
};

BattleManager.actionTintScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'NORMAL') {
      var tint = [0, 0, 0, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'DARK') {
      var tint = [-68, -68, -68, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SEPIA') {
      var tint = [34, -34, -68, 170];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SUNSET') {
      var tint = [68, -34, -34, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'NIGHT') {
      var tint = [68, -68, 0, 68];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var gray = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var tint = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(gray)];
    }
    $gameScreen.startTint(tint, frames);
    return false;
};

BattleManager.actionShakeScreen = function(actionArgs) {
    var power = actionArgs[0] || 5;
    var speed = actionArgs[1] || 5;
    var frames = actionArgs[2] || 60;
    $gameScreen.startShake(parseInt(power), parseInt(speed), parseInt(frames));
    return false;
};

BattleManager.actionWaitForFloat = function() {
    this._logWindow.waitForFloat();
    return false;
};

BattleManager.actionWaitForJump = function() {
    this._logWindow.waitForJump();
    return false;
};

BattleManager.actionWaitForOpacity = function() {
    this._logWindow.waitForOpacity();
    return false;
};

BattleManager.setWindowLayer = function(windowLayer) {
    this._windowLayer = windowLayer;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.ASP2.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.ASP2.Sprite_Battler_initMembers.call(this);
    this.resetFloat();
    this.setupJump(0, 0);
    this.resetOpacity();
};

Sprite_Battler.prototype.resetFloat = function() {
    this._floatHeight = 0.0;
    this._floatTarget = 0;
    this._floatDur = 0;
    this._floatRate = 0;
};

Sprite_Battler.prototype.resetOpacity = function() {
    this._opacityTarget = 255;
    this._opacityDur = 0;
    this._opacityRate = 0;
    this._opacityChanging = false;
};

Sprite_Battler.prototype.setupFloat = function(floatHeight, floatDuration) {
    floatDuration = Math.max(1, floatDuration);
    this._floatTarget = floatHeight;
    this._floatDur = floatDuration;
    var rate = Math.abs(this._floatHeight - floatHeight) / floatDuration;
    this._floatRate = rate;
};

Sprite_Battler.prototype.setupJump = function(jumpHeight, jumpDuration) {
    this._jumpHeight = jumpHeight;
    this._jumpDur = jumpDuration;
    this._jumpFull = jumpDuration;
};

Sprite_Battler.prototype.setupOpacityChange = function(target, duration) {
    duration = Math.max(1, duration);
    this._opacityTarget = target;
    this._opacityDur = duration;
    var rate = Math.abs(this.opacity - target) / duration;
    this._opacityRate = rate;
    this._opacityChanging = true;
};

Yanfly.ASP2.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.ASP2.Sprite_Battler_update.call(this);
    if (this._battler) {
      this.updateFloat();
      this.updateStateSprites();
      this.updateWeapon();
      this.updateOpacity();
    }
};

Sprite_Battler.prototype.updateFloat = function() {
    if (!this._battler) return;
    if (this._floatDur > 0) this._floatDur--;
    if (this._jumpDur > 0) this._jumpDur--;
    var baseY = this._battler.anchorY();
    var floatHeight = this.getFloatHeight();
    var jumpHeight = this.getJumpHeight();
    var height = floatHeight + jumpHeight;
    if (this._mainSprite && this._mainSprite.bitmap) {
      var rate = this._battler.spriteHeight() / this._mainSprite.height;
      this._mainSprite.anchor.y = (baseY + height * rate);
      this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
    } else {
      this.anchor.y = (baseY + height);
    }
};

Sprite_Battler.prototype.updateStateSprites = function() {
    if (this._stateIconSprite) {
      var height = this._battler.spriteHeight() * -1;
      height -= Sprite_StateIcon._iconHeight;
      height /= this.scale.y;
      this._stateIconSprite.y = height;
    }
    if (this._stateSprite) {
      var height = (this._battler.spriteHeight() - 64 * this.scale.y) * -1;
      this._stateSprite.y = height;
    }
    var heightRate = 0;
    heightRate += this.getFloatHeight();
    heightRate += this.getJumpHeight();
    if (Imported.YEP_X_AnimatedSVEnemies) {
      if (this._enemy && this._enemy.isFloating()) {
        heightRate += this.addFloatingHeight();
      };
    }
    var height = this._battler.spriteHeight();
    if (this._stateIconSprite) {
      this._stateIconSprite.y += Math.ceil(heightRate * -height);
    }
    if (this._stateSprite) {
      this._stateSprite.y += Math.ceil(heightRate * -height);
    }
};

Sprite_Battler.prototype.updateWeapon = function() {
    if (!this._battler) return;
    if (!this._battler.isActor()) return;
    this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
};

Sprite_Battler.prototype.getFloatHeight = function() {
    if (this._floatDur <= 0) {
      this._floatHeight = this._floatTarget;
    } else {
      var target = this._floatTarget;
      var rate = this._floatRate;
      if (this._floatHeight >= target) {
        this._floatHeight = Math.max(target, this._floatHeight - rate);
      } else {
        this._floatHeight = Math.min(target, this._floatHeight + rate);
      }
    }
    return this._floatHeight;
};

Sprite_Battler.prototype.getJumpHeight = function() {
    if (this._jumpDur <= 0) {
      return 0;
    } else {
      var x = this._jumpFull - this._jumpDur;
      var h = this._jumpFull / 2;
      var k = this._jumpHeight;
      var a = -k / Math.pow(h, 2);
      var height = a * Math.pow((x - h), 2) + k;
    }
    return height;
};

Sprite_Battler.prototype.updateOpacity = function() {
    if (this.antiOpacityChange()) return;
    this._opacityDur--;
    if (this._opacityDur <= 0) {
      if (this.opacity !== this._opacityTarget) {
        this.opacity = this._opacityTarget;
      }
      this._opacityChanging = false;
    } else {
      var target = this._opacityTarget;
      var rate = this._opacityRate;
      if (this.opacity >= target) {
        this.opacity = Math.max(target, this.opacity - rate);
      } else {
        this.opacity = Math.min(target, this.opacity + rate);
      }
    }
};

Sprite_Battler.prototype.antiOpacityChange = function() {
    if (!this._opacityChanging) return true;
    return false;
};

Sprite_Battler.prototype.isFloating = function() {
    return this._floatDur > 0;
};

Sprite_Battler.prototype.isJumping = function() {
    return this._jumpDur > 0;
};

Sprite_Battler.prototype.isChangingOpacity = function() {
    return this._opacityDur > 0;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Yanfly.ASP2.Sprite_Animation_updatePosition =
    Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
    Yanfly.ASP2.Sprite_Animation_updatePosition.call(this);
    if ([0, 1].contains(this._animation.position)) {
      if (this.isBattlerRelated()) this.updateBattlerPosition();
    }
};

Sprite_Animation.prototype.isBattlerRelated = function() {
    if (this._target instanceof Sprite_Battler) return true;
    if (this._target.parent instanceof Sprite_Battler) return true;
    return false;
};

Sprite_Animation.prototype.updateBattlerPosition = function() {
    if (this._target instanceof Sprite_Battler) {
      var target = this._target;
    } else if (this._target.parent instanceof Sprite_Battler) {
      var target = this._target.parent;
    } else {
      return;
    }
    if (!target.bitmap) return;
    if (target.bitmap.height <= 0) return;
    var heightRate = target.getFloatHeight() + target.getJumpHeight();
    var height = heightRate * target.bitmap.height;
    this.y -= height;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isAnyoneFloating = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isFloating();
    });
};

Spriteset_Battle.prototype.isAnyoneJumping = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isJumping();
    });
};

Spriteset_Battle.prototype.isAnyoneChangingOpacity = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isChangingOpacity();
    });
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.spriteFloat = function(floatHeight, floatDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupFloat(floatHeight, floatDuration);
};

Game_Battler.prototype.spriteJump = function(jumpHeight, jumpDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupJump(jumpHeight, jumpDuration);
};

Game_Battler.prototype.spriteOpacity = function(opacity, duration) {
    if (!this.battler()) return;
    this.battler().setupOpacityChange(opacity, duration);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.ASP2.Scene_Base_createWindowLayer =
    Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    Yanfly.ASP2.Scene_Base_createWindowLayer.call(this);
    BattleManager.setWindowLayer(this._windowLayer);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP2.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'float') {
      if (this._spriteset.isAnyoneFloating()) return true;
    } else if (this._waitMode === 'jump') {
      if (this._spriteset.isAnyoneJumping()) return true;
    } else if (this._waitMode === 'opacity') {
      if (this._spriteset.isAnyoneChangingOpacity()) return true;
    }
    return Yanfly.ASP2.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForFloat = function() {
    this.setWaitMode('float');
};

Window_BattleLog.prototype.waitForJump = function() {
    this.setWaitMode('jump');
};

Window_BattleLog.prototype.waitForOpacity = function() {
    this.setWaitMode('opacity');
};

//=============================================================================
// End of File
//=============================================================================
};
