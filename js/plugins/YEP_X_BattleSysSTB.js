//=============================================================================
// Yanfly Engine Plugins - Battle System - Standard Turn Battle
// YEP_X_BattleSysSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleSysSTB = true;

var Yanfly = Yanfly || {};
Yanfly.STB = Yanfly.STB || {};
Yanfly.STB.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05（需要 YEP_BattleEngineCore.js）使用此插件將 STB（標準回合制戰鬥）加入到您的遊戲中！
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
 * @param Delay Status Adjust
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 延遲狀態視窗向中心移動所需的時間。
 * 是 - true     否 - false
 * @default true
 *
 * @param ---Escape---
 * @default
 *
 * @param Escape Ratio
 * @parent ---Escape---
 * @desc STB 如何計算逃跑率？
 * 預設： 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.125 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @parent ---Escape---
 * @desc 玩家每次逃跑失敗都會增加這些成功率。 預設值：0.1 
 * @default 0.025
 *
 * @param ---Turn Order---
 * @default
 *
 * @param Show Turn Window
 * @parent ---Turn Order---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 要顯示回合視窗嗎？
 * 是 - true     不 - false
 * @default false
 *
 * @param Turn Window X
 * @parent ---Turn Order---
 * @desc 回合命令視窗的 X 位置，你可以使用公式。
 * @default Graphics.boxWidth - width
 *
 * @param Turn Window Y
 * @parent ---Turn Order---
 * @desc 回合命令視窗的 Y 位置，你可以使用公式。
 * @default this.fittingHeight(2)
 *
 * @param Turn Window Width
 * @parent ---Turn Order---
 * @desc 回合命令視窗的寬度，你可以使用公式。
 * @default 200
 *
 * @param Turn Window Height
 * @parent ---Turn Order---
 * @desc 回合命令視窗的高度，你可以使用公式。
 * @default Graphics.boxHeight - statusHeight - this.fittingHeight(2)
 *
 * @param Current Battler Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc 當前戰鬥人物使用的文本顏色。 
 * @default 6
 *
 * @param Actor Battler Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc 用於角色的文本顏色。 
 * @default 4
 *
 * @param Enemy Battler Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc 用於敵人的文本顏色。 
 * @default 2
 *
 * @help
 * ============================================================================
 * 介紹                    正體中文化 by xyzjw
 * ============================================================================
 *
 * 這個插件需要 YEP_BattleEngineCore。 
 * 確保此插件位於插件列表中的 YEP_BattleEngineCore 下。 
 *
 * 要使用 STB 系統，請轉到 Battle Engine Core 插件並將參數中的“預設系統”
 * 設定更改為“stb”。 
 *
 * 標準回合制戰鬥系統在預設回合制戰鬥系統的結構之外運行。行動順序由戰鬥者
 * 的 AGI 值決定，從高到低。但是，在回合開始時不會選擇行動。取而代之的是，
 * 隨著每個戰鬥人物的回合出現，輪流進行並選擇行動，然後立即執行。 
 *
 * 每一回合裡，每個戰鬥人物只能進行一個動作，這意味著即使戰鬥人物的 AGI 值
 * 是另一個戰鬥人物的兩倍，單一個戰鬥人物的回合數也不能是另一個戰鬥人物的
 * 兩倍。這是為了防止來自基於刻度的戰鬥系統的任何平衡問題，因為與基於回合的
 * 戰鬥系統相比，它們往往更難以平衡。 
 *
 * 由於標準回合戰鬥系統的性質，在資料庫中設定的物品或技能的動作速度值將被
 * 禁用，因為它無法在回合順序中推進戰鬥人物的動作。 
 *
 * ============================================================================
 * 插件指令
 * ============================================================================
 *
 * 要將您的戰鬥系統更改為標準回合制戰鬥（如果它不是預設戰鬥系統），您可以
 * 使用以下的插件指令：
 *
 * 插件指令：
 *   setBattleSys STB      將戰鬥系統設定為標準回合制戰鬥。 
 *   setBattleSys DTB      將戰鬥系統設置為預設回合制戰鬥。 
 *
 * 使用上述插件指令，您可以在預設戰鬥系統和標準回合制戰鬥之間切換！ 
 *
 * ============================================================================
 * 筆記標籤
 * ============================================================================
 *
 * 以下是與 STB 系統相關並影響 STB 系統的注意事項。
 *
 * 技能和物品標籤：
 *
 *   <STB Help>
 *    text
 *    text
 *   </STB Help>
 *
 *   對於那些計劃使用多個戰鬥系統的人，有時在使用 STB 時，您的技能可能會有
 *   所不同。 如果是這樣，使用此註釋標籤將允許技能和項目在啟用 STB 時顯示
 *   不同的幫助文本。
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.05:
 * - Fixed Forced Action endless bug and added compatibility with Instant Cast.
 *
 * Version 1.04:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Instant Cast compatibility update.
 *
 * Version 1.01:
 * - Fixed a bug that caused escaping to crash the game if not using STB.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
if (Yanfly.BEC.version && Yanfly.BEC.version >= 1.42) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleSysSTB');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.STBActionSpeed = String(Yanfly.Parameters['Action Speed']);
Yanfly.Param.STBDelayStatus = String(Yanfly.Parameters['Delay Status Adjust']);
Yanfly.Param.STBDelayStatus = eval(Yanfly.Param.STBDelayStatus);

Yanfly.Param.STBEscapeRatio = String(Yanfly.Parameters['Escape Ratio']);
Yanfly.Param.STBEscapeBoost = String(Yanfly.Parameters['Fail Escape Boost']);

Yanfly.Param.STBShowWindow = String(Yanfly.Parameters['Show Turn Window']);
Yanfly.Param.STBShowWindow = eval(Yanfly.Param.STBShowWindow);
Yanfly.Param.STBWindowX = String(Yanfly.Parameters['Turn Window X']);
Yanfly.Param.STBWindowY = String(Yanfly.Parameters['Turn Window Y']);
Yanfly.Param.STBWindowW = String(Yanfly.Parameters['Turn Window Width']);
Yanfly.Param.STBWindowH = String(Yanfly.Parameters['Turn Window Height']);
Yanfly.Param.STBWinSubject = Number(Yanfly.Parameters['Current Battler Color']);
Yanfly.Param.STBWinActor = Number(Yanfly.Parameters['Actor Battler Color']);
Yanfly.Param.STBWinEnemy = Number(Yanfly.Parameters['Enemy Battler Color']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.STB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.STB.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_BattleSysSTB) {
    this.processSTBNotetags1($dataSkills);
    this.processSTBNotetags1($dataItems);
    Yanfly._loaded_YEP_X_BattleSysSTB = true;
  }
  
  return true;
};

DataManager.processSTBNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var evalMode = 'none';
    obj.stbHelp = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:STB HELP)>/i)) {
        evalMode = 'stb help';
        obj.stbHelp = '';
      } else if (line.match(/<\/(?:STB HELP)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'stb help') {
        obj.stbHelp += line + '\n';
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.isSTB = function() {
  return this.isBattleSystem('stb');
};

Yanfly.STB.BattleManager_isTurnBased = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
  if (this.isSTB()) return true;
  return Yanfly.STB.BattleManager_isTurnBased.call(this);
};

Yanfly.STB.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
  if (this.isSTB()) {
    var code = Yanfly.Param.STBEscapeRatio;
    try {
      this._escapeRatio = eval(code);
    } catch (e) {
      this._escapeRatio = 0;
      Yanfly.Util.displayError(e, code, 'STB ESCAPE RATIO ERROR');
    }
    var code = Yanfly.Param.STBEscapeBoost;
    try {
      this._escapeFailBoost = eval(code);
    } catch (e) {
      this._escapeFailBoost = 0;
      Yanfly.Util.displayError(e, code, 'STB ESCAPE BOOST ERROR');
    }
  } else {
    this._escapeFailBoost = 0.1;
    Yanfly.STB.BattleManager_makeEscapeRatio.call(this);
  }
};

Yanfly.STB.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
  Yanfly.STB.BattleManager_startInput.call(this);
  if (this.isSTB() && this._phase !== 'turn') this.startTurn();
};

Yanfly.STB.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
  if (this._stbFailedEscape) {
    this.stbFailedEscape();
  } else {
    Yanfly.STB.BattleManager_startTurn.call(this);
  }
};

BattleManager.stbFailedEscape = function() {
  this._stbFailedEscape = false;
  $gameParty.requestMotionRefresh();
};

Yanfly.STB.BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
  var subject = this._subject;
  SceneManager._scene.refreshSTBTurnOrderWindow();
  if (this.isSTB() && subject.isActor()) {
    this.startSTBInput();
  } else {
    Yanfly.STB.BattleManager_processTurn.call(this);
  }
};

BattleManager.startSTBInput = function() {
  this._phase = 'input';
  var battler = this._subject;
  BattleManager.changeActor(battler.index(), 'undecided');
  if (!battler.canInput()) {
    battler.makeActions();
    this.startAction();
  }
};

Yanfly.STB.BattleManager_selectPreviousCommand =
  BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
  if (this.isSTB()) {
    this._activeSTBActor = this._actorIndex;
    this._subject = null;
    this.changeActor(-1, 'undecided');
  } else {
    Yanfly.STB.BattleManager_selectPreviousCommand.call(this);
  }
};

Yanfly.STB.BattleManager_displayEscapeFailureMessage =
  BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  Yanfly.STB.BattleManager_displayEscapeFailureMessage.call(this);
  if (this.isSTB()) {
    this.endAction();
    this._stbFailedEscape = true;
  }
};

BattleManager.stbSetSubject = function() {
  BattleManager.changeActor(this._activeSTBActor, 'undecided');
  this._subject = this.actor();
};

Yanfly.STB.BattleManager_selectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
  if (this.isSTB()) {
    if (this._subject) {
      this.startAction();
    } else {
      this.stbSetSubject();
      this.startSTBInput();
    }
  } else {
    Yanfly.STB.BattleManager_selectNextCommand.call(this);
  }
};

Yanfly.STB.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
  if (Imported.YEP_InstantCast) this.detectStbInstantCast();
  Yanfly.STB.BattleManager_startAction.call(this);
};

Yanfly.STB.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
  if (this.isSTB()) {
    this.endSTBAction();
  } else {
    Yanfly.STB.BattleManager_endAction.call(this);
  }
};

BattleManager.endSTBAction = function() {
  this._phase = 'turn';
  if (this._stbInstantCast) {
    this._stbInstantCast = false;
    return Yanfly.BEC.BattleManager_endAction.call(this);
  }
  if (this._subject) {
    this._performedBattlers.push(this._subject);
    this._subject.spriteStepBack();
    this._subject.onAllActionsEnd();
    this._subject.removeCurrentAction();
  }
  if (this._processingForcedAction) {
    this._phase = this._preForcePhase;
    this._processingForcedAction = false;
  }
  if (this.loadPreForceActionSettings()) return;
  this._subject = null;
  Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.detectStbInstantCast = function() {
  this._stbInstantCast = false;
  if (!this.isSTB()) return;
  if (!this._subject) return;
  if (!this._subject.currentAction()) return;
  if (!this._subject.currentAction().item()) return;
  var item = this._subject.currentAction().item();
  this._stbInstantCast = this._subject.isInstantCast(item);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.STB.Game_Action_speed = Game_Action.prototype.speed;
Game_Action.prototype.speed = function() {
  if (BattleManager.isSTB()) {
    var user = this.subject(); var a = user;
    var maxhp = user.mhp; var mhp = user.mhp; var hp = user.hp;
    var maxmp = user.mmp; var mmp = user.mmp; var mp = user.mp;
    var maxtp = user.maxTp(); var mtp = user.maxTp(); var tp = user.tp;
    var atk = user.atk; var def = user.def; var mat = user.mat;
    var int = user.mat; var mdf = user.mdf; var res = user.res;
    var agi = user.agi; var luk = user.luk;
    var code = Yanfly.Param.STBActionSpeed;
    try {
      var speed = eval(code);
    } catch (e) {
      var speed = agi;
      Yanfly.Util.displayError(e, code, 'STB ACTION SPEED FORMULA ERROR');
    }
    return speed;
  } else {
    return Yanfly.STB.Game_Action_speed.call(this);
  }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.STB.Scene_Battle_createHelpWindow =
  Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
  if (BattleManager.isSTB()) this.createSTBTurnOrderWindow();
  Yanfly.STB.Scene_Battle_createHelpWindow.call(this);
};

Scene_Battle.prototype.createSTBTurnOrderWindow = function() {
  if (!Yanfly.Param.STBShowWindow) return;
  var statusWindow = this._statusWindow;
  this._stbTurnOrderWindow = new Window_STB_TurnOrder(statusWindow);
  this.addWindow(this._stbTurnOrderWindow);
};

Scene_Battle.prototype.refreshSTBTurnOrderWindow = function() {
  if (!this._stbTurnOrderWindow) return;
  this._stbTurnOrderWindow.refresh();
};

Yanfly.STB.Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
Scene_Battle.prototype.commandFight = function() {
  if (BattleManager.isSTB()) {
    BattleManager.stbSetSubject();
    BattleManager.startSTBInput();
  } else {
    Yanfly.STB.Scene_Battle_commandFight.call(this);
  }
};

Yanfly.STB.Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
  if (BattleManager.isSTB()) {
    BattleManager.processEscape();
  } else {
    Yanfly.STB.Scene_Battle_commandEscape.call(this);
  }
};

if (Yanfly.Param.STBDelayStatus) {

Yanfly.STB.Scene_Battle_updateWindowPositions =
    Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function() {
    if (BattleManager.isSTB()) return this.updateWindowPositionsSTB();
    Yanfly.STB.Scene_Battle_updateWindowPositions.call(this);
};

Scene_Battle.prototype.updateWindowPositionsSTB = function() {
  if (this._STBWindowPosCount === undefined) this._STBWindowPosCount = 0;
  if (this._partyCommandWindow.active) {
    this._STBWindowPosCount = 16;
    var statusX = 0;
    statusX = this._partyCommandWindow.width;
    if (this._statusWindow.x < statusX) {
      this._statusWindow.x += 16;
      if (this._statusWindow.x > statusX) this._statusWindow.x = statusX;
    }
    if (this._statusWindow.x > statusX) {
      this._statusWindow.x -= 16;
      if (this._statusWindow.x < statusX) this._statusWindow.x = statusX;
    }
  } else if (this._actorCommandWindow.active) {
    this._STBWindowPosCount = 16;
    Yanfly.STB.Scene_Battle_updateWindowPositions.call(this);
  } else {
    if (--this._STBWindowPosCount > 0) return;
    Yanfly.STB.Scene_Battle_updateWindowPositions.call(this);
  }
};

}; // Yanfly.Param.STBDelayStatus

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.STB.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (this.meetSTBConditions(item)) return this.setText(item.stbHelp);
    Yanfly.STB.Window_Help_setItem.call(this, item);
};

Window_Help.prototype.meetSTBConditions = function(item) {
    if (!item) return false;
    if (!BattleManager.isSTB()) return false;
    return item.stbHelp !== undefined;
};

//=============================================================================
// Window_STB_TurnOrder
//=============================================================================

function Window_STB_TurnOrder() {
  this.initialize.apply(this, arguments);
}

Window_STB_TurnOrder.prototype = Object.create(Window_Base.prototype);
Window_STB_TurnOrder.prototype.constructor = Window_STB_TurnOrder;

Window_STB_TurnOrder.prototype.initialize = function(statusWindow) {
  if (statusWindow) {
    var statusHeight = statusWindow.height;
  } else {
    statusHeight = this.fittingHeight(4);
  }
  var code = Yanfly.Param.STBWindowW;
  try {
    var width = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW WIDTH ERROR');
    var width = 200;
  }
  var code = Yanfly.Param.STBWindowH;
  try {
    var height = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW HEIGHT ERROR');
    var height = Graphics.boxHeight - statusHeight - this.fittingHeight(2);
  }
  var code = Yanfly.Param.STBWindowX;
  try {
    var x = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW X ERROR');
    var x = Graphics.boxWidth - width;
  }
  var code = Yanfly.Param.STBWindowY;
  try {
    var y = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW Y ERROR');
    var y = this.fittingHeight(2);
  }
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.opacity = 0;
  this.refresh();
};

Window_STB_TurnOrder.prototype.refresh = function() {
  this.getTurnOrderData();
  this.drawTurnOrders();
};

Window_STB_TurnOrder.prototype.getTurnOrderData = function() {
  if (!BattleManager._actionBattlers) return;
  if (!BattleManager._performedBattlers) return;
  var array = BattleManager._actionBattlers;
  this._actionBattlers = array.filter(Yanfly.Util.onlyUnique);
  array = BattleManager._performedBattlers;
  this._performedBattlers = array.filter(Yanfly.Util.onlyUnique);
};

Window_STB_TurnOrder.prototype.drawTurnOrders = function() {
  if (!this._actionBattlers) return;
  if (!this._performedBattlers) return;
  this.contents.clear();
  var dy = 0;
  dy = this.drawPerformedActors(dy);
  dy = this.drawSubject(dy);
  dy = this.drawActionActors(dy);
};

Window_STB_TurnOrder.prototype.drawPerformedActors = function(dy) {
  var dx = this.textPadding();
  var dw = this.contents.width - this.textPadding() * 2;
  this.resetFontSettings();
  this.changePaintOpacity(false);
  var array = this._performedBattlers;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var battler = array[i];
    if (!battler) continue;
    if (battler.isDead()) continue;
    if (battler === BattleManager._subject) continue;
    if (battler.isActor()) {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinActor));
    } else {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinEnemy));
    }
    var text = this.getBattlerName(battler);
    this.drawText(text, dx, dy, dw);
    dy += this.lineHeight();
  }
  return dy;
};

Window_STB_TurnOrder.prototype.drawSubject = function(dy) {
  if (!BattleManager._subject) return dy;
  if (BattleManager._subject.isDead()) return dy;
  var dx = this.textPadding();
  var dw = this.contents.width - this.textPadding() * 2;
  this.resetFontSettings();
  this.changePaintOpacity(true);
  this.changeTextColor(this.textColor(Yanfly.Param.STBWinSubject));
  var battler = BattleManager._subject;
  var text = this.getBattlerName(battler);
  this.drawText(text, dx, dy, dw);
  dy += this.lineHeight();
  return dy;
};

Window_STB_TurnOrder.prototype.drawActionActors = function(dy) {
  var dx = this.textPadding();
  var dw = this.contents.width - this.textPadding() * 2;
  this.resetFontSettings();
  this.changePaintOpacity(true);
  var array = this._actionBattlers;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var battler = array[i];
    if (!battler) continue;
    if (battler.isDead()) continue;
    if (battler === BattleManager._subject) continue;
    if (this._performedBattlers.contains(battler)) continue;
    if (battler.isActor()) {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinActor));
    } else {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinEnemy));
    }
    var text = this.getBattlerName(battler);
    this.drawText(text, dx, dy, dw);
    dy += this.lineHeight();
  }
  return dy;
};

Window_STB_TurnOrder.prototype.getBattlerName = function(battler) {
  if (Imported.YEP_EnemyLevels && battler.isEnemy()) {
    var text = Yanfly.ELV.Game_Enemy_name.call(battler);
  } else {
    var text = battler.name();
  }
  return text;
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

Yanfly.Util.onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
} else { // Yanfly.BEC.version

var text = '================================================================\n';
text += 'YEP_X_BattleSysSTB requires YEP_BattleEngineCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_BattleEngineCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Yanfly.BEC.version
}; // YEP_BattleEngineCore