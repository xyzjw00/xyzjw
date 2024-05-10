//=============================================================================
 /*:
 * @plugindesc Add a exit command in the title screen
 * and also in the Menu during the game.
 * @author Avsoft Studio
 *
 * @param Exit name
 * @desc Name of your "Exit command".
 * @default Exit
 *
 * @help
 * ==========================================================================
 * ============================How to use it ?===============================
 * ==========================================================================
 * Just put this plugin in your game project and that's all !
 * The different exit command will appear automatically
 * 
 * Parameters are available to change the text show in the different window
 * where this command appear.
 * 
 * WARNING :
 * -> If you use the plugin Translator Engine from SumRndmDde, put the exit
 * command plugin before this last in your plugin's list in order to avoid
 * conflict between them
 * 
 * ==========================================================================
 * =================================Changelog================================
 * ==========================================================================
 * Version 1.00 :
 *  - Finished plug-in
 * Version 1.10 :
 *  - Add the possibility to add a custom sound
 * Version 1.11 :
 *  - Correction of certains line of code
 * Version 1.20 :
 *  - Delete the custom sound parameter
 *  - Update of some line of code
 */

var Avsoft = Avsoft || {};
Avsoft.LINK = Avsoft.LINK || {};
Avsoft.LINK.version = 1.00

Avsoft.Parameters = PluginManager.parameters('AVSOFT_Exit');

Avsoft.Param = Avsoft.Param || {};
Avsoft.Param.name = String(Avsoft.Parameters['Exit name']);
//=============================================================================
// Window_TitleCommand
//=============================================================================

Avsoft.LINK.Window_TitleCommand_makeCommandList =
		Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Avsoft.LINK.Window_TitleCommand_makeCommandList.call(this);
		this.addHomePageCommand();
};

Window_TitleCommand.prototype.addHomePageCommand = function() {
		this.addCommand(Avsoft.Param.name, 'homePage');
};


//=============================================================================
// Window_GameEnd
//=============================================================================

Avsoft.LINK.Window_GameEnd_makeCommandList =
		Window_GameEnd.prototype.makeCommandList;
Window_GameEnd.prototype.makeCommandList = function() {
    Avsoft.LINK.Window_GameEnd_makeCommandList.call(this);
		this.addHomePageCommand();
};

Window_GameEnd.prototype.addHomePageCommand = function() {
		this.addCommand(Avsoft.Param.name, 'Quitter');
};

//=============================================================================
// SceneMenu
//=============================================================================

Avsoft.LINK.Scene_GameEnd_createCommandWindow =
		Scene_GameEnd.prototype.createCommandWindow;
	Scene_GameEnd.prototype.createCommandWindow = function() {
    Avsoft.LINK.Scene_GameEnd_createCommandWindow.call(this);
		this._commandWindow.setHandler('Quitter', this.commandExit.bind(this));
};

Scene_GameEnd.prototype.commandExit = function() {
	this.fadeOutAll();
	SceneManager.exit();
};

//=============================================================================
// Scene_Base
//=============================================================================
Avsoft.LINK.Scene_Title_createCommandWindow =
		Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Avsoft.LINK.Scene_Title_createCommandWindow.call(this);
		this._commandWindow.setHandler('homePage', this.command.bind(this));
};

Scene_Title.prototype.command = function() {
	this.fadeOutAll();
	SceneManager.exit();
};

//=============================================================================
// End of File
//=============================================================================