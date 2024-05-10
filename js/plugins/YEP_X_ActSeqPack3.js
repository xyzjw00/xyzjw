//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 3
// YEP_X_ActSeqPack3.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack3 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP3 = Yanfly.ASP3 || {};
Yanfly.ASP3.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 （需要 YEP_BattleEngineCore.js）鏡頭控制被添加到戰鬥引擎核心的動作序列中。
 * @author Yanfly Engine Plugins
 *
 * @param Camera Option
 * @desc 用於戰鬥中顯示的鏡頭移動的選項文本。
 * @default Battle Camera
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw（畫面震動修復）
 * ============================================================================
 *
 * Action Sequence Pack 3 插件是 Yanfly Engine Plugins 的 Battle Engine Core 
 * 的擴展插件。如果沒有主插件，此擴展插件將無法工作。
 * 這個擴展插件包含更基本的功能，用於在視覺比例上定制動作序列。
 * 這個插件專注於鏡頭控制和畫面縮放。
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
 * CAMERA CLAMP ON         （鏡頭固定 打開）
 * CAMERA CLAMP OFF        （鏡頭固定 關閉）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 預設情況下，鏡頭固定是打開的，這會強制鏡頭永遠不會平移到戰場邊界之外。
 * 但是，如果您希望關閉此功能，請使用“鏡頭固定 關閉”來控制它。
 * 但是，鏡頭固定將在每個“執行完成”動作結束時重新打開。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     camera clamp on
 *                camera clamp off
 *=============================================================================
 *
 *=============================================================================
 * CAMERA FOCUS: target, (location), (frames)鏡頭焦點：目標，（位置），（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA FOCUS: target, FRONT BASE, (frames)      前段底部     想
 * CAMERA FOCUS: target, BASE, (frames)                底部     像
 * CAMERA FOCUS: target, BACK BASE, (frames)       後段底部     九
 * CAMERA FOCUS: target, FRONT CENTER, (frames)    前段中部     宮
 * CAMERA FOCUS: target, CENTER, (frames)              中部     格
 * CAMERA FOCUS: target, BACK CENTER, (frames)     後段中部     圖
 * CAMERA FOCUS: target, FRONT HEAD, (frames)      前段頭部     ！
 * CAMERA FOCUS: target, HEAD, (frames)                頭部
 * CAMERA FOCUS: target, BACK HEAD, (frames)       後段頭部
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 這將著重於一個或多個目標（參考目標輸入）和一個位置。
 * 如果省略位置，鏡頭將聚焦在目標的中心。
 * 注意：鏡頭不會超過畫面邊界。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     camera focus: user
 *                camera focus: target, front, 40
 *                camera focus: enemies, center, 30
 *=============================================================================
 *
 *=============================================================================
 * CAMERA OFFSET: DIRECTION, DISTANCE    鏡頭偏移：方向、距離
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA OFFSET: LEFT, distance        左
 * CAMERA OFFSET: RIGHT, distance       右
 * CAMERA OFFSET: UP, distance          上
 * CAMERA OFFSET: DOWN, distance        下
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 依 距離 的數值進行偏移鏡頭方向。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     camera offset: left, 200
 *                camera offset: right, Graphics.boxWidth / 4
 *                camera offset: up, 300
 *                camera offset: down, $gameVariables.value(3);
 *=============================================================================
 *
 *=============================================================================
 * CAMERA PAN      鏡頭平移
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA PAN: LEFT, distance, (frames)      左
 * CAMERA PAN: RIGHT, distance, (frames)     右
 * CAMERA PAN: UP, distance, (frames)        上
 * CAMERA PAN: DOWN, distance, (frames)      下
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將鏡頭平移一定距離（以像素為單位）的方向。您可以使用左/右和上/下的組合
 * 來執行對角鏡頭平移。使用“幀”將允許您調整鏡頭平移的持續時間。
 * 省略“幀”會將鏡頭平移持續時間設置為 30 幀。
 * 注意：鏡頭不會超過畫面邊界。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     camera pan: left, 200
 *                camera pan: up, 250
 *                camera pan: right, 500, 60
 *                camera pan: down: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * CAMERA SCREEN      鏡頭畫面
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA SCREEN: TOP LEFT, (frames)               左上角
 * CAMERA SCREEN: FAR LEFT, (frames)               最左方
 * CAMERA SCREEN: BOTTOM LEFT, (frames)            左下角
 * CAMERA SCREEN: TOP CENTER, (frames)             中上方
 * CAMERA SCREEN: CENTER, (frames)                 正中間
 * CAMERA SCREEN: BOTTOM CENTER, (frames)          中下方
 * CAMERA SCREEN: TOP RIGHT, (frames)              右上角
 * CAMERA SCREEN: FAR RIGHT, (frames)              最右右
 * CAMERA SCREEN: BOTTOM RIGHT, (frames)           右下角
 * CAMERA SCREEN: POINT, x, y, (frames)            點，x，y，（幀）
 * CAMERA SCREEN: target, FRONT, (frames)         目標，前部，（幀）
 * CAMERA SCREEN: target, BASE, (frames)          目標，底部，（幀）
 * CAMERA SCREEN: target, BACK, (frames)          目標，後部，（幀）
 * CAMERA SCREEN: target, FRONT CENTER, (frames)  目標，前中部，（幀）
 * CAMERA SCREEN: target, CENTER, (frames)        目標，中部，（幀）
 * CAMERA SCREEN: target, BACK CENTER, (frames)   目標，後中部，（幀）
 * CAMERA SCREEN: target, FRONT TOP, (frames)     目標，前上部，（幀）
 * CAMERA SCREEN: target, TOP, (frames)           目標，中上部，（幀）
 * CAMERA SCREEN: target, BACK TOP, (frames)      目標，後上部，（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將鏡頭移動到畫面的特定部分。如果您選擇目標，鏡頭將鎖定目標的該部分。
 * 使用 (frames) 將決定鏡頭移動到目標位置的持續時間。省略 (frames) 會將
 * 鏡頭平移持續時間設置為 30 幀。
 * 注意：鏡頭不會超過畫面邊界。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     camera screen: top left
 *                camera screen: far right, 30
 *                camera screen: point, 400, 300, 60
 *                camera screen: user, base
 *                camera screen: targets, base, 60
 *=============================================================================
 *
 *=============================================================================
 * RESET CAMERA: (frames)       重置鏡頭：（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將鏡頭重置回預設位置，即戰場的中心。使用 (frames) 將允許您調整鏡頭重
 * 置的持續時間。省略“幀”會將鏡頭設置為在 30 幀後重置。
 * 注意：鏡頭不會超過畫面邊界。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     reset camera
 *                reset camera: 30
 *=============================================================================
 *
 *=============================================================================
 * RESET ZOOM: (frames)       重置縮放：（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 將鏡頭縮放重置為預設值，即 100%。使用 (frames) 將允許您調整縮放重置
 * 的持續時間。省略 'frames' 會將縮放設置為在 30 幀後重置。
 * 注意：鏡頭不會超過畫面邊界。
 * 注意：縮放僅適用於 側視戰鬥模式 。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     reset zoom
 *                reset zoom: 30
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR CAMERA      等待鏡頭
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待鏡頭完成平移，然後再進行動作序列中的下一個動作。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     wait for camera
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ZOOM        等待變焦
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 等待縮放完成，然後再繼續進行動作序列中的下一個動作。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     wait for zoom
 *=============================================================================
 *
 *=============================================================================
 * ZOOM: x%, (frames)          縮放：x%，（幀）
 * ZOOM: x.y, (frames)         縮放：x.y,（幀）
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 縮放到 x% 或 x.y 比例。使用 (frames) 將允許您調整縮放發生的持續時間。
 * 省略“幀”會將縮放持續時間設置為 30 幀。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 使用範例：     zoom: 200%
 *                zoom: 1.5, 45
 *=============================================================================
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options  選項核心設置 - 添加新選項
 * ============================================================================
 *
 * 如果您使用的是 YEP_OptionsCore.js，則可以使用此插件添加新選項。
 * 以下是您可以使用的 代碼/參數 設置。
 *
 * ---------
 * 設定：
 * ---------
 * 
 * Name:
 * \i[302]Battle Camera
 *
 * Help Description:
 * If ON, the camera in battle will move around.
 * If OFF, the camera in battle will be locked in place.
 *
 * Symbol:
 * battleCamera
 *
 * Show/Hide:
 * show = Imported.YEP_X_ActSeqPack3;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * 功能：
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.05:
 * - Compatibility update with YEP_OptionsCore.js.
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Restriction on Camera and Zoom action sequences lifted from being Sideview
 * only. Use them at your own caution.
 *
 * Version 1.02a:
 * - Updated the Game_Screen.startZoom() function from beta to newest version.
 * - Decided to separate the methods as it breaks panning.
 * - Changed priority of IF action sequences to higher to no longer interfere
 * other action sequences.
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
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ASP3CameraOption = String(Yanfly.Parameters['Camera Option']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP3.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // CAMERA CLAMP
  if (['CAMERA CLAMP ON', 'CAMERA CLAMP OFF'].contains(actionName)) {
    return this.actionCameraClamp(actionName);
  }
  // CAMERA FOCUS
  if (['CAMERA FOCUS', 'FOCUS CAMERA'].contains(actionName)) {
    return this.actionCameraFocus(actionArgs);
  }
  // CAMERA OFFSET
  if (['CAMERA OFFSET', 'OFFSET CAMERA'].contains(actionName)) {
    return this.actionCameraOffset(actionArgs);
  }
  // CAMERA PAN
  if (['CAMERA PAN', 'PAN CAMERA'].contains(actionName)) {
    return this.actionCameraPan(actionArgs);
  }
  // CAMERA SCREEN
  if (actionName === 'CAMERA SCREEN') {
    return this.actionCameraScreen(actionArgs);
  }
  // RESET CAMERA
  if (actionName === 'RESET CAMERA') {
    return this.actionResetCamera(actionArgs);
  }
  // RESET ZOOM
  if (actionName === 'RESET ZOOM') {
    return this.actionResetZoom(actionArgs);
  }
  // WAIT FOR CAMERA
  if (actionName === 'WAIT FOR CAMERA') {
    return this.actionWaitForCamera();
  }
  // WAIT FOR ZOOM
  if (actionName === 'WAIT FOR ZOOM') {
    return this.actionWaitForZoom();
  }
  // ZOOM
  if (actionName === 'ZOOM') {
    return this.actionZoom(actionArgs);
  }
  return Yanfly.ASP3.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

Yanfly.ASP3.BattleManager_actionPerformFinish =
    BattleManager.actionPerformFinish;
BattleManager.actionPerformFinish = function() {
    this.actionResetZoom([30]);
    this.resetCamera([30]);
    return Yanfly.ASP3.BattleManager_actionPerformFinish.call(this);
};

BattleManager.actionCameraClamp = function(actionName) {
    if (!ConfigManager.battleCamera) return true;
    if (actionName === 'CAMERA CLAMP ON') {
      this._cameraClamp = true;
    } else if (actionName === 'CAMERA CLAMP OFF') {
      this._cameraClamp = false;
    }
    return true;
};

BattleManager.actionCameraFocus = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    this._cameraFocusGroup = this.makeActionTargets(actionArgs[0]);
    if (this._cameraFocusGroup.length < 1) return false;
    var type = (actionArgs[1]) ? actionArgs[1].toUpperCase() : 'CENTER';
    var frames = actionArgs[2] || 30;
    if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'BASE';
    } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'BASE';
    } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'BASE';
    } else if (['FRONT CENTER', 'FRONT MIDDLE', 'FRONT'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['CENTER', 'MIDDLE'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['BACK CENTER', 'BACK MIDDLE', 'BACK'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'TOP';
    } else if (['HEAD', 'TOP'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'TOP';
    } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'TOP';
    } else {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionCameraOffset = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['LEFT'].contains(cmd)) {
      this._cameraOffsetX = -1 * eval(actionArgs[1]) || 100;;
    } else if (['RIGHT'].contains(cmd)) {
      this._cameraOffsetX = eval(actionArgs[1]) || 100;;
    } else if (['UP'].contains(cmd)) {
      this._cameraOffsetY = -1 * eval(actionArgs[1]) || 100;;
    } else if (['DOWN'].contains(cmd)) {
      this._cameraOffsetY = eval(actionArgs[1]) || 100;;
    }
    return true;
};

BattleManager.actionCameraPan = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    var frames = 30;
    if (['LEFT'].contains(cmd)) {
      this._cameraX -= eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['RIGHT'].contains(cmd)) {
      this._cameraX += eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['UP'].contains(cmd)) {
      this._cameraY -= eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['DOWN'].contains(cmd)) {
      this._cameraY += eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionCameraScreen = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    var frames = 30;
    if (['TOP LEFT', 'UPPER LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['FAR LEFT', 'ABSOLUTE LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM LEFT', 'LOWER LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['TOP CENTER', 'UPPER CENTER'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['CENTER', 'MIDDLE'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM CENTER', 'LOWER CENTER'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['TOP RIGHT', 'UPPER RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['FAR RIGHT', 'ABSOLUTE RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM RIGHT', 'LOWER RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      this._cameraX = eval(actionArgs[1]) || 0;
      this._cameraY = eval(actionArgs[2]) || 0;
      frames = actionArgs[3] || 30;
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var type = actionArgs[1].toUpperCase();
      var frames = actionArgs[2] || 30;
      if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
      'FRONT'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
      'BACK'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['CENTER', 'MIDDLE'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else if (['HEAD', 'TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else {
        return true;
      }
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionResetCamera = function(actionArgs) {
    var duration = parseInt(actionArgs[0]) || 30;
    this.resetCamera(duration);
    return true;
};

BattleManager.actionResetZoom = function(actionArgs) {
    var duration = parseInt(actionArgs[0]) || 30;
    $gameScreen.startBattleZoom(1, duration);
    return true;
};

BattleManager.actionWaitForCamera = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForCamera();
    return false;
};

BattleManager.actionWaitForZoom = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForZoom();
    return false;
};

BattleManager.actionZoom = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var scale = parseFloat(RegExp.$1 * 0.01) || 1.0;
    } else {
      var scale = parseFloat(actionArgs[0]) || 1.0;
    }
    var duration = parseInt(actionArgs[1]) || 30;
    $gameScreen.startBattleZoom(scale, duration);
    return true;
};

Yanfly.ASP3.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    this.resetCamera();
    this.actionResetZoom([1]);
    Yanfly.ASP3.BattleManager_setup.call(this, troopId, canEscape, canLose);
};

BattleManager.resetCamera = function(duration) {
    this._cameraX = Graphics.boxWidth / 2;
    this._cameraY = Graphics.boxHeight / 2;
    this._cameraOffsetX = 0;
    this._cameraOffsetY = 0;
    this._cameraFocusGroup = [];
    this._cameraFocusPosX = 'BASE';
    this._cameraFocusPosY = 'BASE';
    this._cameraClamp = true;
    $gameScreen.setCameraDuration(duration);
};

BattleManager.cameraClamp = function() {
    return this._cameraClamp;
};

BattleManager.cameraX = function() {
    if (this._cameraFocusGroup.length > 0) {
      var value = this.cameraFocusX();
    } else {
      var value = this._cameraX;
    }
    value += this._cameraOffsetX;
    return value;
};

BattleManager.cameraY = function() {
    if (this._cameraFocusGroup.length > 0) {
      var value = this.cameraFocusY();
    } else {
      var value = this._cameraY;
    }
    value += this._cameraOffsetY;
    return value;
};

BattleManager.cameraFocusX = function() {
    var i = this.targetPosX(this._cameraFocusGroup, this._cameraFocusPosX);
    return i;
};

BattleManager.cameraFocusY = function() {
    var i = this.targetPosY(this._cameraFocusGroup, this._cameraFocusPosY);
    return i;
};

BattleManager.targetPosX = function(group, position) {
    var value = 0;
    if (position === 'MIDDLE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value += battler.cameraPosX();
      }
    } else if (position === 'FRONT') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        if (battler.isActor()) var offset = -1 * battler.spriteWidth() / 2;
        if (battler.isEnemy()) var offset = battler.spriteWidth() / 2;
        value = Math.max(battler.cameraPosX() + offset, value);
      }
      value *= group.length;
    } else if (position === 'BACK') {
      value = Graphics.boxWidth;
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        if (battler.isActor()) var offset = battler.spriteWidth() / 2;
        if (battler.isEnemy()) var offset = -1 * battler.spriteWidth() / 2;
        value = Math.min(battler.cameraPosX() + offset, value);
      }
      value *= group.length;
    }
    value /= group.length;
    return value;
};

BattleManager.targetPosY = function(group, position) {
    var value = 0;
    if (position === 'BASE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value = Math.max(battler.cameraPosY(), value);
      }
      value *= group.length;
    } else if (position === 'MIDDLE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value += battler.cameraPosY() - battler.spriteHeight() / 2;
      }
    } else if (position === 'TOP') {
      value = Graphics.boxHeight;
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value = Math.min(battler.cameraPosY() - battler.spriteHeight(), value);
      }
      value *= group.length;
    }
    value /= group.length;
    return value;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.updatePosition = function() {
    var zoom = $gameScreen.zoomScale();
    var clamp = BattleManager.cameraClamp();
    this.scale.x = zoom;
    this.scale.y = zoom;
    var screenX = -1 * $gameScreen.zoomX() * zoom + Graphics.boxWidth / 2;
    var screenY = -1 * $gameScreen.zoomY() * zoom + Graphics.boxHeight / 2;
    if (clamp && zoom >= 1.0) {
      var clampX1 = -Graphics.boxWidth * zoom + Graphics.boxWidth;
      var clampY2 = -Graphics.boxHeight * zoom + Graphics.boxHeight;
      this.x = Math.round(screenX.clamp(clampX1, 0));
      this.y = Math.round(screenY.clamp(clampY2, 0));
    } else if (clamp && zoom < 1.0) {
      this.x = Math.round((Graphics.boxWidth - Graphics.boxWidth * zoom) / 2);
      this.y = Math.round((Graphics.boxHeight - Graphics.boxHeight * zoom) / 2);
    } else {
      this.x = Math.round(screenX);
      this.y = Math.round(screenY);
    }
	this.x += Math.round($gameScreen.shake());
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.cameraPosX = function() {
    var value = this.spritePosX();
    return value;
};

Game_Battler.prototype.cameraPosY = function() {
    var value = this.spritePosY();
    if (Imported.YEP_X_ActSeqPack2) {
      value -= this.battler().getFloatHeight() * this.spriteHeight();
      value -= this.battler().getJumpHeight() * this.spriteHeight();
    }
    return value;
};

//=============================================================================
// Game_Screen
//=============================================================================

Yanfly.ASP3.Game_Screen_clearZoom = Game_Screen.prototype.clearZoom;
Game_Screen.prototype.clearZoom = function() {
    Yanfly.ASP3.Game_Screen_clearZoom.call(this);
    this._cameraDuration = 0;
};

Yanfly.ASP3.Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
    Yanfly.ASP3.Game_Screen_update.call(this);
    this.updateBattleCamera();
};

Game_Screen.prototype.startBattleZoom = function(scale, duration) {
    this._zoomScaleTarget = scale;
    this._zoomDuration = duration;
};

Game_Screen.prototype.isZooming = function() {
    return this._zoomDuration > 0;
};

Game_Screen.prototype.setCameraDuration = function(duration) {
    this._cameraDuration = duration;
};

Game_Screen.prototype.updateBattleCamera = function() {
    if (!$gameParty.inBattle()) return;
    if (this._cameraDuration > 0) {
      var d = this._cameraDuration;
      var tx = BattleManager.cameraX();
      var ty = BattleManager.cameraY();
      this._zoomX = (this._zoomX * (d - 1) + tx) / d;
      this._zoomY = (this._zoomY * (d - 1) + ty) / d;
      this._cameraDuration--;
    } else {
      this._zoomX = BattleManager.cameraX();
      this._zoomY = BattleManager.cameraY();
    }
};

Game_Screen.prototype.isBattleCameraPanning = function() {
    if ($gameParty.inBattle()) return this._cameraDuration > 0;
    return false;
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.battleCamera = true;

Yanfly.ASP3.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.ASP3.ConfigManager_makeData.call(this);
    config.battleCamera = this.battleCamera;
    return config;
};

Yanfly.ASP3.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.ASP3.ConfigManager_applyData.call(this, config);
    this.battleCamera = this.readConfigBattleCamera(config, 'battleCamera');
};

ConfigManager.readConfigBattleCamera = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return true;
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.ASP3.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.ASP3.Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) {
      this.addCommand(Yanfly.Param.ASP3CameraOption, 'battleCamera');
    }
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP3.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'camera') {
      if ($gameScreen.isBattleCameraPanning()) return true;
    } else if (this._waitMode === 'zoom') {
      if ($gameScreen.isZooming()) return true;
    }
    return Yanfly.ASP3.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForCamera = function() {
    this.setWaitMode('camera');
};

Window_BattleLog.prototype.waitForZoom = function() {
    this.setWaitMode('zoom');
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.ASP3.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    Yanfly.ASP3.Scene_Map_onMapLoaded.call(this);
    $gameScreen.clearZoom();
};

//=============================================================================
// End of File
//=============================================================================
};
