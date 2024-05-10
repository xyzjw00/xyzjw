//=============================================================================
// Yanfly Engine Plugins - Gamepad Config
// GamepadConfig.js
// Version: 1.01
//=============================================================================

var Imported = Imported || {};
Imported.GamepadConfig = true;

var Yanfly = Yanfly || {};
Yanfly.GamepadConfig = Yanfly.GamepadConfig || {};
Yanfly.GamepadConfig.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 手柄设置☁️
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @text 命令名称
 * @desc This is the option name that appears in the main menu.
 * @default 手柄设置
 *
 * @param Button Name
 * @text 按钮名称
 * @desc 这是按钮名称在配置菜单中的显示方式。
 * @default 按钮 %1
 *
 * @param OK Button
 * @text 确认 按钮
 * @desc 这是“确定”按钮的命令名。
 * @default OK / Talk
 *
 * @param OK Help
 * @text 确认 帮助说明
 * @desc 这是“确定”按钮的帮助说明。
 * @default 用于接受菜单操作和与人交谈。
 *
 * @param Cancel Button
 * @text 取消 按钮
 * @desc Cancel Button
 * @desc This is the command name for the Cancel button.
 * @default 取消
 *
 * @param Cancel Help
 * @text 取消 帮助说明
 * @desc This is the help description for the Cancel button.
 * @default 用于取消菜单操作。
 *
 * @param Shift Button
 * @text 冲刺 按钮
 * @desc This is the command name for the Shift button.
 * @default 冲刺
 *
 * @param Shift Help
 * @text 冲刺 帮助说明
 * @desc This is the help description for the Shift button.
 * @default 按住这个按钮在球场上冲刺。
 *
 * @param Menu Button
 * @text 菜单 按钮
 * @desc This is the command name for the Menu button.
 * @default 菜单
 *
 * @param Menu Help
 * @text 菜单 帮助说明
 * @desc This is the help description for the Menu button.
 * @default 从字段访问主菜单。
 *
 * @param PageUp Button
 * @text 向上翻页 按钮
 * @desc 这是“向上翻页”按钮的命令名。
 * @default 向上翻页
 *
 * @param PageUp Help
 * @text 向上翻页 帮助说明
 * @desc This is the help description for the Page Up button.
 * @default 使用它可以快速向上滚动菜单。
 *
 * @param PageDown Button
 * @text 向下翻页 按钮
 * @desc This is the command name for the Page Down button.
 * @default Page Down
 *
 * @param PageDown Help
 * @text 向下翻页 帮助说明
 * @desc This is the help description for the Page Down button.
 * @default 使用它可以快速向下滚动菜单。
 *
 * @param Reset Default
 * @text 重置默认值
 * @desc This is the command name to reset the config to default.
 * @default 重置为默认值
 *
 * @param Reset Help
 * @text 重置 帮助说明
 * @desc This is the help description for the Reset button.
 * @default 将控制器恢复为默认设置。
 *
 * @param Finish Config
 * @text 完成配置
 * @desc This is the command name for the finish button.
 * @default 完成配置
 *
 * @param Finish Help
 * @text 完成帮助
 * @desc This is the help description for the Finish button.
 * @default 你配置完游戏面板了吗？
 *
 * @help
 * 添加一个“游戏手柄设置”的选项在你的选项菜单里。
 * 玩家可以调整他们想要的键位设置，并且每次都会自动载入。
 * 考虑到键位冲突，游戏会自动弹出玩家防止玩家锁在里面。
 *
 * ============================================================================
 * 选项核心设置-添加新选项
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[83]Gamepad Config
 *
 * Help Description:
 * Configure the game's gamepad settings.
 *
 * Symbol:
 * gamepadConfig
 *
 * Show/Hide:
 * if (Imported.GamepadConfig && Input.isControllerConnected()) {
 *   show = !Utils.isMobileDevice();
 * } else {
 *   show = false;
 * }
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
 *
 * Process OK Code:
 * this.playOkSound();
 * SceneManager.push(Scene_GamepadConfig);
 *
 * Cursor Right Code:
 * // Empty. Provided by this plugin.
 * 
 * Cursor Left Code:
 * // Empty. Provided by this plugin.
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
 * Version 1.01:
 * - Compatibility update with YEP_OptionsCore.js!
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('GamepadConfig');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.GamepadConfigName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.GamepadConfigButton = String(Yanfly.Parameters['Button Name']);
Yanfly.Param.GamepadConfigOkTx = String(Yanfly.Parameters['OK Button']);
Yanfly.Param.GamepadConfigOkHelp = String(Yanfly.Parameters['OK Help']);
Yanfly.Param.GamepadConfigCancelTx = String(Yanfly.Parameters['Cancel Button']);
Yanfly.Param.GamepadConfigCancelHelp = String(Yanfly.Parameters['Cancel Help']);
Yanfly.Param.GamepadConfigShiftTx = String(Yanfly.Parameters['Shift Button']);
Yanfly.Param.GamepadConfigShiftHelp = String(Yanfly.Parameters['Shift Help']);
Yanfly.Param.GamepadConfigMenuTx = String(Yanfly.Parameters['Menu Button']);
Yanfly.Param.GamepadConfigMenuHelp = String(Yanfly.Parameters['Menu Help']);
Yanfly.Param.GamepadConfigPgUpTx = String(Yanfly.Parameters['PageUp Button']);
Yanfly.Param.GamepadConfigPgUpHelp = String(Yanfly.Parameters['PageUp Help']);
Yanfly.Param.GamepadConfigPgDnTx = String(Yanfly.Parameters['PageDown Button']);
Yanfly.Param.GamepadConfigPgDnHelp = String(Yanfly.Parameters['PageDown Help']);
Yanfly.Param.GamepadConfigResetTx = String(Yanfly.Parameters['Reset Default']);
Yanfly.Param.GamepadConfigResetHelp = String(Yanfly.Parameters['Reset Help']);
Yanfly.Param.GamepadConfigFinishTx = String(Yanfly.Parameters['Finish Config']);
Yanfly.Param.GamepadConfigFinishHelp = String(Yanfly.Parameters['Finish Help']);

//=============================================================================
// Input
//=============================================================================

Input.getPressedGamepadButton = function() {
	if (Yanfly.Param.GamepadTimer > 0) {
		Yanfly.Param.GamepadTimer -= 1;
		return -1;
	}
	if (navigator.getGamepads) {
		var gamepads = navigator.getGamepads();
		if (gamepads) {
			for (var i = 0; i < gamepads.length; i++) {
				var gamepad = gamepads[i];
				if (gamepad && gamepad.connected) {
					return this.gamepadButtonId(gamepad);
				}
			}
		}
  }
	return -1;
};

Input.gamepadButtonId = function(gamepad) {
  var buttons = gamepad.buttons;
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].pressed) return i;
  }
	return -1;
};

Input.getGamepadButton = function(type) {
	for (var i = 0; i < 12; ++i) {
		if (Input.gamepadMapper[i] === type) return i;
	}
	return null;
};

Input.isControllerConnected = function() {
	if (navigator.getGamepads) {
		var gamepads = navigator.getGamepads();
		if (gamepads) {
			for (var i = 0; i < gamepads.length; i++) {
				var gamepad = gamepads[i];
				if (gamepad && gamepad.connected) return true;
			}
		}
	}
	return false;
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.gamepadInput = {
	0: 'ok',
	1: 'cancel',
	2: 'shift',
	3: 'menu',
	4: 'pageup',
	5: 'pagedown',
	12: 'up',
	13: 'down',
	14: 'left',
	15: 'right',
};

Yanfly.GamepadConfig.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.GamepadConfig.ConfigManager_makeData.call(this);
	config.gamepadInput = this.gamepadInput;
	return config;
};

Yanfly.GamepadConfig.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.GamepadConfig.ConfigManager_applyData.call(this, config);
	this.gamepadInput = this.readGamepadConfig(config, 'gamepadInput');
	this.applyGamepadConfig();
};

ConfigManager.applyGamepadConfig = function() {
	Input.gamepadMapper = this.gamepadInput;
	Input.update();
	Input.clear();
};

ConfigManager.readGamepadConfig = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return {
					0: 'ok',
					1: 'cancel',
					2: 'shift',
					3: 'menu',
					4: 'pageup',
					5: 'pagedown',
					12: 'up',
					13: 'down',
					14: 'left',
					15: 'right',
				};
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.GamepadConfig.Window_Options_addGeneralOptions =
	Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.GamepadConfig.Window_Options_addGeneralOptions.call(this);
  if (!Imported.YEP_OptionsCore) this.addGameConfigCommand();
};

Window_Options.prototype.addGameConfigCommand = function() {
	if (Input.isControllerConnected()) {
		this.addCommand(Yanfly.Param.GamepadConfigName, 'gamepadConfig', true);
		this._addedController = true;
	}
};

Yanfly.GamepadConfig.Window_Options_update =
	Window_Options.prototype.update;
Window_Options.prototype.update = function() {
	Yanfly.GamepadConfig.Window_Options_update.call(this);
	if (this._addedController && !Input.isControllerConnected()) {
		this.refresh();
		this.height = this.windowHeight();
		this.updatePlacement();
	}
};

if (!Imported.YEP_OptionsCore) {

Yanfly.GamepadConfig.Window_Options_drawItem =
	Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
    if (this.commandSymbol(index) === 'gamepadConfig') {
			var rect = this.itemRectForText(index);
			var text = this.commandName(index);
	    this.resetTextColor();
	    this.changePaintOpacity(this.isCommandEnabled(index));
	    this.drawText(text, rect.x, rect.y, rect.width, 'left');
		} else {
			Yanfly.GamepadConfig.Window_Options_drawItem.call(this, index);
		}
};

Yanfly.GamepadConfig.Window_Options_processOk =
	Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  if (this.commandSymbol(this.index()) === 'gamepadConfig') {
		Window_Command.prototype.processOk.call(this);
	} else {
		Yanfly.GamepadConfig.Window_Options_processOk.call(this);
	}
};

}; // Imported.YEP_OptionsCore


//=============================================================================
// Window_GamepadConfig
//=============================================================================

function Window_GamepadConfig() {
    this.initialize.apply(this, arguments);
}

Window_GamepadConfig.prototype = Object.create(Window_Command.prototype);
Window_GamepadConfig.prototype.constructor = Window_GamepadConfig;

Window_GamepadConfig.prototype.initialize = function(helpWindow) {
	var wy = helpWindow.height;
	Window_Command.prototype.initialize.call(this, 0, wy);
  this.setHelpWindow(helpWindow);
	this.height = Graphics.boxHeight - wy;
	this.refresh();
	this.activate();
	this.select(0);
};

Window_GamepadConfig.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_GamepadConfig.prototype.makeCommandList = function(index) {
	for (var i = 0; i < 6; ++i) {
		var text = this.getButtonTypeText(i);
		this.addCommand(text, 'button', true);
	}
	this.addCommand('', 'filler', true);
	this.addCommand(this.getButtonTypeText(7), 'reset', true);
	this.addCommand(this.getButtonTypeText(8), 'finish', true);
};

Window_GamepadConfig.prototype.drawItem = function(index) {
	if (index > 5) {
		Window_Command.prototype.drawItem.call(this, index);
	} else {
		var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
		var ww = rect.width / 2;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawText(this.commandName(index), rect.x, rect.y, ww, align);
		var text = this.getButtonConfig(index);
		this.drawText(text, rect.x + ww, rect.y, ww, align);
	}
};

Window_GamepadConfig.prototype.getButtonTypeText = function(index) {
	if (index === 0) return Yanfly.Param.GamepadConfigOkTx;
	if (index === 1) return Yanfly.Param.GamepadConfigCancelTx;
	if (index === 2) return Yanfly.Param.GamepadConfigShiftTx;
	if (index === 3) return Yanfly.Param.GamepadConfigMenuTx;
	if (index === 4) return Yanfly.Param.GamepadConfigPgUpTx;
	if (index === 5) return Yanfly.Param.GamepadConfigPgDnTx;
	if (index === 7) return Yanfly.Param.GamepadConfigResetTx;
	if (index === 8) return Yanfly.Param.GamepadConfigFinishTx;
	return '';
};

Window_GamepadConfig.prototype.getButtonConfig = function(index) {
	if (index > 5) return '';
	var key = this.getButtonKey(index);
	var button = Input.getGamepadButton(key);
  return Yanfly.Param.GamepadConfigButton.format(button);
};

Window_GamepadConfig.prototype.getButtonKey = function(index) {
	if (index === 0) return 'ok';
	if (index === 1) return 'cancel';
	if (index === 2) return 'shift';
	if (index === 3) return 'menu';
	if (index === 4) return 'pageup';
	if (index === 5) return 'pagedown';
};

Window_GamepadConfig.prototype.itemTextAlign = function() {
    return 'center';
};

Window_GamepadConfig.prototype.clearButtonConfig = function(index) {
    var rect = this.itemRectForText(index);
		rect.x += rect.width / 2;
		rect.width /= 2;
		this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
};

Window_GamepadConfig.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
		switch (this.index()) {
		case 0:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigOkHelp);
			break;
		case 1:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigCancelHelp);
			break;
		case 2:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigShiftHelp);
			break;
		case 3:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigMenuHelp);
			break;
		case 4:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigPgUpHelp);
			break;
		case 5:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigPgDnHelp);
			break;
		case 7:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigResetHelp);
			break;
		case 8:
			this._helpWindow.setText(Yanfly.Param.GamepadConfigFinishHelp);
			break;
		default:
			this._helpWindow.clear();
			break;
		}
};

//=============================================================================
// Scene_Options
//=============================================================================

Yanfly.GamepadConfig.Scene_Options_createOptionsWindow =
	Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function() {
  Yanfly.GamepadConfig.Scene_Options_createOptionsWindow.call(this);
	this._optionsWindow.setHandler('gamepadConfig',
		this.commandGamepadConfig.bind(this));
};

Scene_Options.prototype.commandGamepadConfig = function() {
	SceneManager.push(Scene_GamepadConfig);
};

//=============================================================================
// Scene_GamepadConfig
//=============================================================================

function Scene_GamepadConfig() {
  this.initialize.apply(this, arguments);
}

Scene_GamepadConfig.prototype = Object.create(Scene_MenuBase.prototype);
Scene_GamepadConfig.prototype.constructor = Scene_GamepadConfig;

Scene_GamepadConfig.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_GamepadConfig.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
	this.createGamepadConfigWindow();
};

Scene_GamepadConfig.prototype.terminate = function() {
  Scene_MenuBase.prototype.terminate.call(this);
  ConfigManager.save();
};

Scene_GamepadConfig.prototype.update = function() {
  Scene_MenuBase.prototype.update.call(this);
	this.updateAttachedController();
	this.updateButtonConfig();
	this.updateAfterConfig();
};

Scene_GamepadConfig.prototype.updateAttachedController = function() {
	if (Input.isControllerConnected()) return;
	this.popScene();
};

Scene_GamepadConfig.prototype.createGamepadConfigWindow = function() {
	this._configWindow = new Window_GamepadConfig(this._helpWindow);
	this._configWindow.setHandler('button', this.commandButton.bind(this));
	this._configWindow.setHandler('reset', this.commandReset.bind(this));
	this._configWindow.setHandler('finish', this.popScene.bind(this));
	this.addWindow(this._configWindow);
};

Scene_GamepadConfig.prototype.commandButton = function() {
	var index = this._configWindow.index();
	this._configWindow.clearButtonConfig(index);
	this._configEnabled = true;
	Yanfly.Param.GamepadTimer = 12;
};

Scene_GamepadConfig.prototype.commandReset = function() {
	ConfigManager.gamepadInput = {
		0: 'ok',
		1: 'cancel',
		2: 'shift',
		3: 'menu',
		4: 'pageup',
		5: 'pagedown',
		12: 'up',
		13: 'down',
		14: 'left',
		15: 'right',
	};
	ConfigManager.applyGamepadConfig();
	this.refreshWindows();
};

Scene_GamepadConfig.prototype.refreshWindows = function() {
	this._configWindow.refresh();
	this._configWindow.activate();
	ConfigManager.save();
};

Scene_GamepadConfig.prototype.updateButtonConfig = function() {
	if (!this._configEnabled) return;
	var buttonId = Input.getPressedGamepadButton();
	if (buttonId > 11) return;
	if (buttonId >= 0) this.applyButtonConfig(buttonId);
};

Scene_GamepadConfig.prototype.applyButtonConfig = function(buttonId) {
	this._configEnabled = false;
	var index = this._configWindow.index();
	var newConfig = this._configWindow.getButtonKey(index);
	var formerConfig = Input.gamepadMapper[buttonId];
	var formerButton = Input.getGamepadButton(newConfig);
	ConfigManager.gamepadInput[buttonId] = newConfig;
	ConfigManager.gamepadInput[formerButton] = formerConfig;
	ConfigManager.applyGamepadConfig();
	this._configTimer = 12;
};

Scene_GamepadConfig.prototype.updateAfterConfig = function() {
	if (!this._configTimer) return;
	if (--this._configTimer > 0) return;
	SoundManager.playEquip();
	this.refreshWindows();
};

//=============================================================================
// End of File
//=============================================================================
