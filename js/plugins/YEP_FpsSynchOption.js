//=============================================================================
// Yanfly Engine Plugins - FPS Synch Option
// YEP_FpsSynchOption.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SynchFpsOption = true;

var Yanfly = Yanfly || {};
Yanfly.FpsSynch = Yanfly.FpsSynch || {};
Yanfly.FpsSynch.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 新增一個選項設定，用於同步具有更高 FPS 的顯示器。
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc 設定選單中使用的指令名稱。
 * @default Synch Monitor FPS
 *
 * @param Default Setting
 * @type boolean
 * @on ON
 * @off OFF
 * @desc 同步顯示器 FPS 的預設值。
 * OFF - false (推薦)  ON - true
 * @default false
 *
 * @help
 * ============================================================================
 * 介紹		   正體中文化 by xyzjw
 * ============================================================================
 *
 * 此插件適用於 RPG Maker MV 版本 1.1.0 及更高版本。
 *
 * RPG Maker MV 引擎的構建方式是每幀更新一次。
 * 雖然有許多玩家通過 60 FPS 進行遊戲都很順利，但一些玩家對遊戲的體驗卻不同，
 * 因為他們的硬體可能以高於 60 FPS 的速度執行。
 *
 * 自從 RPG Maker MV 1.1.0 版問世以來，它實現了 Galenmereth 流暢的時序流動，這
 * 迫使遊戲始終以 60 FPS 的速度執行。實際上，這對每個人來說都很棒，因為體驗高 
 * 於 60 FPS 的玩家將能夠像 60 FPS 一樣玩遊戲。
 *
 * 但是，如果玩家的硬體不夠強大，無法以 60 FPS 的速度原生支持 RPG Maker MV
 * （例如使用舊電腦或舊手機的情況），或者玩家使用的影片錄製軟體低於 60 幀/秒。
 * 如果輸入命令沒有良好的回應速度，遊戲將顯得遲緩和跳躍，甚至可能使玩家錯過某
 * 些幀數的畫面更新。
 *
 * 這個插件在設定選單中增加一個設定用來啟用或禁用時序流動並利用以前的 
 * RPG Maker MV 引擎更新功能。通過這種方式，玩家可以選擇使用流暢的時序流動或選
 * 擇不使用它，而不是強迫每個可能不適用的人使用它。
 *
 * ============================================================================
 * 選項核心設定 - 添加新選項
 * ============================================================================
 *
 * 如果您使用 YEP_OptionsCore.js，則可以使用此插件添加新選項。 
 * 以下是您可以使用的代碼/參數設定。
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[302]Synch Monitor FPS
 *
 * Help Description:
 * Turn this ON if your monitor runs above 60 FPS
 * to synchronize the game to run at 60 FPS.
 *
 * Symbol:
 * synchFps
 *
 * Show/Hide:
 * show = Imported.YEP_SynchFpsOption;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
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
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Compatibility update with YEP_OptionsCore.js.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - The plugin is now prevented if the project's core files are under version
 * RPG Maker MV 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0') {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FpsSynchOption');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FpsSynchCmd = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.FpsSDefault = eval(String(Yanfly.Parameters['Default Setting']));

//=============================================================================
// MainCode
//=============================================================================

ConfigManager.synchFps = Yanfly.Param.FpsSDefault;

Yanfly.FpsSynch.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.FpsSynch.ConfigManager_makeData.call(this);
    config.synchFps = this.synchFps;
    return config;
};

Yanfly.FpsSynch.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.FpsSynch.ConfigManager_applyData.call(this, config);
    this.synchFps = this.readConfigFpsSynch(config, 'synchFps');
};

ConfigManager.readConfigFpsSynch = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Yanfly.Param.FpsSDefault;
    }
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager.updateMainFluidTimestep = SceneManager.updateMain;

SceneManager.updateMain = function() {
    if (ConfigManager.synchFps) {
      this.updateMainFluidTimestep();
    } else {
      this.updateMainNoFpsSynch();
    }
};

SceneManager.updateMainNoFpsSynch = function() {
    this.updateInputData();
    this.changeScene();
    this.updateScene();
    this.renderScene();
    this.requestUpdate();
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.FpsSynch.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.FpsSynch.Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) {
      this.addCommand(Yanfly.Param.FpsSynchCmd, 'synchFps');
    }
};

//=============================================================================
// Version Compatibility Update
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run FPS Synch ';
text += 'Options while your project files are lower than version 1.1.0. \n\n';
text += 'Please visit this thread for instructions on how to update your ';
text += 'project files to 1.1.0 or higher: \n\n';
text += 'http://forums.rpgmakerweb.com/index.php?/topic/';
text += '71400-rpg-maker-mv-v134-update/';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0')

//=============================================================================
// End of File
//=============================================================================
