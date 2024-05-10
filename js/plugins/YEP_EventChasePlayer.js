//=============================================================================
// Yanfly Engine Plugins - Event Chase Player
// YEP_EventChasePlayer.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventChasePlayer = true;

var Yanfly = Yanfly || {};
Yanfly.ECP = Yanfly.ECP || {};
Yanfly.ECP.version = 1.07;

//=============================================================================
 /*:
 * @plugindesc v1.07 當玩家靠近某個事件時，該事件將開始追逐或逃離玩家。
 * @author Yanfly Engine Plugins
 *
 * @param Sight Lock
 * @type number
 * @min 0
 * @desc 如果“this._seePlayer = true”開始作用，這是事件追逐玩家多長時間
 * 的幀數。
 * @default 300
 *
 * @param See Player
 * @type boolean
 * @on YES
 * @off NO
 * @desc 事件是否預設必須能夠看到玩家？
 * 不 - false     是 - true
 * @default true
 *
 * @param Alert Timer
 * @type number
 * @min 0
 * @desc 這是警報氣球動畫出現在同一事件之前必須發生的幀數。
 * @default 120
 *
 * @param Alert Balloon
 * @type number
 * @min 0
 * @desc 這是看到玩家時使用的默認氣球動畫。 請參閱氣球動畫 ID。
 * @default 1
 *
 * @param Alert Sound
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 這是玩家被看到時播放的預設聲音。
 * @default Attack1
 *
 * @param Alert Common Event
 * @type common_event
 * @desc 當玩家被看到時播放的預設公共事件。如果不想使用公共事件，請使用 0。
 * @default 0
 *
 * @param Return After
 * @type boolean
 * @on YES
 * @off NO
 * @desc 追逐 / 逃離玩家後，事件返回到原來的位置。
 * 不 - false   是 - true
 * @default true
 *
 * @param Return Wait
 * @type number
 * @min 0
 * @desc 完成 追逐 / 逃離 後等待的幀數。
 * @default 180
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * 這個插件允許您製作當玩家進入事件範圍內或當事件看到玩家時追逐玩家或逃
 * 離玩家的事件。
 *
 * ============================================================================
 * 如何使用
 * ============================================================================
 *
 * 將這幾行插入到移動路線事件內的腳本調用視窗中，為事件提供追逐或逃離標誌。
 *
 * 注意：這不適用於玩家。
 *
 * 腳本調用行：
 *  this._chaseRange = x       如果到達 x 距離，事件將追逐玩家。
 *  this._fleeRange = x        如果到達 x 距離，事件將逃離玩家。
 *  this._chaseSpeed = x       追逐時事件的移動速度。
 *  this._fleeSpeed = x        逃跑時事件的移動速度。
 *  this._sightLock = x        事件將 逃離 / 追逐 玩家 x 幀。
 *  this._seePlayer = true     需要事件能看到玩家。
 *  this._seePlayer = false    不需要事件能看到玩家。
 *  this._alertBalloon = x     這個氣球動畫會在玩家被看到時播放。
 *  this._alertSound = x       當看到玩家時會播放此聲音。
 *  this._alertSoundVol = x    警報聲音出現的音量。
 *  this._alertSoundPitch = x  警報聲音出現的音調。
 *  this._alertSoundPan = x    警報聲音出現的平移。
 *  this._alertCommonEvent = x 當玩家被看到時將播放此事件。
 *  this._returnAfter = true   將事件返回到其原始位置。
 *  this._returnAfter = false  事件在完成追逐時停留在原處。
 *  this._returnWait = x       完成 追逐 / 逃離 後事件等待多長時間。
 *
 * 最好在事件的自定義移動路線內以高頻率執行此內容。請記住，這些效果僅在進行
 * 設置並運行後才會發生，這意味著在讀取地圖時，如果頻率較低的事件尚未在其移
 * 動序列中加載 'this._chaseRange = x'，則該事件將 暫時還沒有追逐玩家。
 *
 * ============================================================================
 * 變更日誌
 * ============================================================================
 *
 * Version 1.07:
 * - Added a background mechanic to stagger an event if they're chasing the
 * player and get caught behind an object. This will prevent the event from
 * continuously chasing the player and dropping the FPS rate.
 *
 * Version 1.06:
 * - Updated for RPG Maker MV version 1.5.0.
 * 
 * Version 1.05:
 * - Optimization update.
 *
 * Version 1.04:
 * - Fixed a bug with this._seePlayer causing them to see stealthed players.
 *
 * Version 1.03:
 * - Improved pathfinding for chasing events. They will get stuck less by walls
 * and/or events that may be blocking the event.
 * - Added random factor for fleeing events. Fleeing events won't simply just
 * run away 180 degrees away from the player. They will sometimes move in a
 * random direction.
 *
 * Version 1.02:
 * - Added 'Return After' parameter where events will return to their original
 * spot after chasing/fleeing from a player.
 * - Added 'Return Wait' parameter to determine how long an event will wait in
 * place before returning after a finished chase/flee.
 * - Added 'this._returnAfter' and 'this._returnWait' to the list of available
 * movement route script calls.
 *
 * Version 1.01:
 * - Added 'this._alertSoundPitch' 'this._alertSoundVol' 'this._alertSoundPan'
 * to the settings you can alter to adjust the alert sound.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventChasePlayer');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ECPSightLock = Number(Yanfly.Parameters['Sight Lock']);
Yanfly.Param.ECPSeePlayer = String(Yanfly.Parameters['See Player']);
Yanfly.Param.ECPSeePlayer = eval(Yanfly.Param.ECPSeePlayer);
Yanfly.Param.ECPAlertTimer = Number(Yanfly.Parameters['Alert Timer']);
Yanfly.Param.ECPAlertBalloon = Number(Yanfly.Parameters['Alert Balloon']);
Yanfly.Param.ECPAlertSound = String(Yanfly.Parameters['Alert Sound']);
Yanfly.Param.ECPAlertEvent = Number(Yanfly.Parameters['Alert Common Event']);
Yanfly.Param.ECPReturn = eval(String(Yanfly.Parameters['Return After']));
Yanfly.Param.ECPReturnWait = Number(Yanfly.Parameters['Return Wait']);

//=============================================================================
// Main Code
//=============================================================================

Yanfly.ECP.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Yanfly.ECP.Game_Event_setupPage.call(this);
    this.clearChaseSettings();
};

Game_Event.prototype.clearChaseSettings = function() {
  this._alertBalloon = Yanfly.Param.ECPAlertBalloon;
  this._alertCommonEvent = Yanfly.Param.ECPAlertEvent;
  this._alertLock = 0;
  this._alertPlayer = false;
  this._alertSound = Yanfly.Param.ECPAlertSound;
  this._alertSoundVol = 100;
  this._alertSoundPitch = 100;
  this._alertSoundPan = 0;
  this._alertTimer = 0;
  this._chasePlayer = false;
  this._chaseRange = 0;
  this._chaseSpeed = this._moveSpeed;
  this._defaultSpeed = this._moveSpeed;
  this._fleePlayer = false;
  this._fleeRange = 0;
  this._fleeSpeed = this._moveSpeed;
  this._seePlayer = Yanfly.Param.ECPSeePlayer;
  this._sightLock = Yanfly.Param.ECPSightLock;
  this._returnAfter = Yanfly.Param.ECPReturn;
  this._returnWait = Yanfly.Param.ECPReturnWait;
  this._returnPhase = false;
  this._returnFrames = 0;
  this._staggerCount = 0;
  this._startLocationX = this.x;
  this._startLocationY = this.y;
  this._startLocationDir = this._direction;
};

Yanfly.ECP.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (Imported.YEP_StopAllMove && $gameSystem.isEventMoveStopped()) return;
    this.updateChaseDistance();
    this.updateFleeDistance();
    this.updateChaseMovement();
};

Yanfly.ECP.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    Yanfly.ECP.Game_Event_update.call(this);
    this.updateAlert();
    this.updateReturnPhase();
};

Game_Event.prototype.canSeePlayer = function() {
    if (!this._seePlayer) return false;
    var sx = this.deltaXFrom($gamePlayer.x);
    var sy = this.deltaYFrom($gamePlayer.y);
    if (Math.abs(sx) > Math.abs(sy)) {
      var direction = (sx > 0) ? 4 : 6;
    } else {
      var direction = (sy > 0) ? 8 : 2;
    }
    if (direction === this.direction()) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.updateChaseDistance = function() {
    if (this._erased) return;
    if (this._chaseRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.chaseConditions(dis)) {
      this.startEventChase();
    } else if (this._chasePlayer) {
      this.endEventChase();
    }
};

Game_Event.prototype.chaseConditions = function(dis) {
    if (dis <= this._chaseRange && this.nonSeePlayer()) {
      this._alertLock = this._sightLock;
      return true;
    }
    if (this._alertLock > 0) return true;
    if (dis <= this._chaseRange && this.canSeePlayer()) return true;
    return false;
};

Game_Event.prototype.nonSeePlayer = function() {
  if (Imported.YEP_X_EventChaseStealth) {
    if (this.meetStealthModeConditions()) {
      this.stealthClearChaseSettings();
      this._stopCount = 0;
      return false;
    }
  }
  return !this._seePlayer;
};

Game_Event.prototype.startEventChase = function() {
    this._chasePlayer = true;
    this.setMoveSpeed(this._chaseSpeed);
};

Game_Event.prototype.endEventChase = function() {
    this._chasePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateFleeDistance = function() {
    if (this._erased) return;
    if (this._fleeRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.fleeConditions(dis)) {
      this.startEventFlee();
    } else if (this._fleePlayer) {
      this.endEventFlee();
    }
};

Game_Event.prototype.fleeConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._fleeRange && this.canSeePlayer()) return true;
    if (dis <= this._fleeRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventFlee = function() {
    this._fleePlayer = true;
    this.setMoveSpeed(this._fleeSpeed);
};

Game_Event.prototype.endEventFlee = function() {
    this._fleePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateChaseMovement = function() {
    if (this._staggerCount > 0) {
      return this._staggerCount--;
    }
    if (this._stopCount > 0 && this._chasePlayer) {
      var direction = this.findDirectionTo($gamePlayer.x, $gamePlayer.y);
      if (direction > 0) {
        var x = this._x;
        var y = this._y;
        this.moveStraight(direction);
        if (x === this._x && y === this._y) this._staggerCount = 20;
      }
    } else if (this._stopCount > 0 && this._fleePlayer) {
      this.updateFleeMovement();
    } else if (this._returnPhase) {
      this.updateMoveReturnAfter();
    } else {
      Yanfly.ECP.Game_Event_updateSelfMovement.call(this);
    }
};

Game_Event.prototype.updateFleeMovement = function() {
    switch (Math.randomInt(6)) {
    case 0: case 1: case 2: case 3: case 4:
      this.moveAwayFromPlayer();
      break;
    case 5:
      this.moveRandom();
      break;
    }
};

Game_Event.prototype.updateAlert = function() {
    if (this._erased) return;
    this._alertLock--;
    if (this.alertConditions()) this.activateAlert();
    if (this._alertPlayer) this._alertTimer--;
};

Game_Event.prototype.alertConditions = function() {
    return (this._chasePlayer || this._fleePlayer) && !this._alertPlayer;
};

Game_Event.prototype.activateAlert = function() {
    if (this._alertBalloon >= 0) this.requestBalloon(this._alertBalloon);
    this._alertPlayer = true;
    this._alertTimer = Yanfly.Param.ECPAlertTimer;
    this.playAlertSound();
    this.playAlertCommonEvent();
};

Game_Event.prototype.playAlertSound = function() {
    if (this._alertSound === '') return;
    var sound = {
      name:   this._alertSound,
      volume: this._alertSoundVol,
      pitch:  this._alertSoundPitch,
      pan:    this._alertSoundPan
    };
    AudioManager.playSe(sound);
};

Game_Event.prototype.playAlertCommonEvent = function() {
    if (this._alertCommonEvent <= 0) return;
    $gameTemp.reserveCommonEvent(this._alertCommonEvent);
};

Game_Event.prototype.startReturnPhase = function() {
    if (!this._returnAfter) return;
    this._returnPhase = true;
    this._returnFrames = this._returnWait;
};

Game_Event.prototype.updateReturnPhase = function() {
    if (this._returnPhase) this._returnFrames--;
};

Game_Event.prototype.updateMoveReturnAfter = function() {
    if (this._returnFrames > 0) return;
    var sx = this.deltaXFrom(this._startLocationX);
    var sy = this.deltaYFrom(this._startLocationY);
    if (Math.abs(sx) > Math.abs(sy)) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
          this.moveStraight(sy > 0 ? 8 : 2);
        }
      } else {
        this.moveRandom();
      }
    } else if (sy !== 0) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
          this.moveStraight(sx > 0 ? 4 : 6);
        }
      } else {
        this.moveRandom();
      }
    }
    if (sx === 0 && sy === 0) {
      this._returnPhase = false;
      this._returnFrames = 0;
      this._direction = this._startLocationDir;
    }
};

//=============================================================================
// End of File
//=============================================================================
