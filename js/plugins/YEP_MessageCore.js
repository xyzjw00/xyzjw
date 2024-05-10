//=============================================================================
// Yanfly Engine Plugins - Message Core
// YEP_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MessageCore = true;

var Yanfly = Yanfly || {};
Yanfly.Message = Yanfly.Message || {};
Yanfly.Message.version = 1.19;

//=============================================================================
 /*:
 * @plugindesc v1.19 向訊息視窗添加更多功能以自定義訊息的顯示方式和功能。
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Default Rows
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 這是訊息框將擁有的預設行數。
 * 預設： 4
 * @default 4
 *
 * @param Default Width
 * @parent ---General---
 * @desc 這是訊息框的預設寬度（以像素為單位）。
 * 預設： Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Face Indent
 * @parent ---General---
 * @desc 如果使用臉圖，這是文本縮減的量。
 * 預設： Window_Base._faceWidth + 24
 * @default Window_Base._faceWidth + 24
 *
 * @param Fast Forward Key
 * @parent ---General---
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc 這是用於快進的按鍵。
 * @default pagedown
 *
 * @param Enable Fast Forward
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 預設情況下為您的訊息啟用快進按鍵？
 * 不 - false     是 - true
 * @default true
 *
 * @param Word Wrapping
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 預設情況下使用此選項啟用或禁用自動換行。
 * 禁用 - false     啟用 - true
 * @default false
 *
 * @param Description Wrap
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 啟用或禁用描述的自動換行。
 * 禁用 - false     啟用 - true
 * @default false
 *
 * @param Word Wrap Space
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 手動換行時插入一個空白。
 * 不 - false     是 - true
 * @default false
 *
 * @param Tight Wrap
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 如果為 true 並為訊息使用臉圖，則訊息將更嚴密的封裝。
 * 不 - false     是 - true
 * @default false
 *
 * @param ---Font---
 * @default
 *
 * @param Font Name
 * @parent ---Font---
 * @desc 這是用於訊息視窗的預設字體。
 * 預設： GameFont
 * @default GameFont
 *
 * @param Font Name CH
 * @parent ---Font---
 * @desc 這是用於中文訊息視窗的預設字體。
 * 預設： SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Font Name KR
 * @parent ---Font---
 * @desc 這是用於韓文訊息視窗的預設字體。
 * 預設： Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Font Size
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc 這是用於訊息視窗的預設字體大小。
 * 預設： 28
 * @default 28
 *
 * @param Font Size Change
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc 每當使用 \{ 和 \} 時，它們都會根據此數值進行調整。
 * 預設： 12
 * @default 12
 *
 * @param Font Changed Max
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc 這是 \{ 可以實現的最大尺寸。
 * 預設： 96
 * @default 96
 *
 * @param Font Changed Min
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc 這是 \{ 可以實現的最小尺寸。
 * 預設： 12
 * @default 12
 *
 * @param Font Outline
 * @parent ---Font---
 * @type number
 * @min 0
 * @desc 這是訊息的預設字體輪廓寬度。
 * 預設： 4
 * @default 4
 *
 * @param Maintain Font
 * @parent ---Font---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 更改字體名稱或大小時，維持下列的訊息。
 * 不 - false     是 - true
 * @default false
 *
 * @param ---Name Box---
 * @default
 *
 * @param Name Box Buffer X
 * @parent ---Name Box---
 * @type number
 * @desc 這是名稱框 x 位置的緩衝區。
 * @default -28
 *
 * @param Name Box Buffer Y
 * @parent ---Name Box---
 * @type number
 * @desc 這是名稱框 y 位置的緩衝區。
 * @default 0
 *
 * @param Name Box Padding
 * @parent ---Name Box---
 * @desc 這是名稱框的填充值。
 * @default this.standardPadding() * 4
 *
 * @param Name Box Color
 * @parent ---Name Box---
 * @type number
 * @min 0
 * @max 31
 * @desc 這是用於名稱框的文本顏色。
 * @default 0
 *
 * @param Name Box Clear
 * @parent ---Name Box---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 您希望名稱框視窗清晰嗎？
 * 不 - false     是 - true
 * @default false
 *
 * @param Name Box Added Text
 * @parent ---Name Box---
 * @desc 每當使用名稱框時，都會添加此文本。
 * 這可用於自動設置顏色。
 * @default \c[6]
 *
 * @param Name Box Auto Close
 * @parent ---Name Box---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 每次名稱框顯示不同名稱時關閉訊息視窗？
 * 是 - true     不 - false
 * @default false
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * 雖然 RPG Maker MV Ace 確實大大改進了訊息系統，但添加更多功能也無妨，例如
 * 名稱視窗、轉換文本代碼以寫出物品、武器、盔甲的圖示 和/或 名稱，以及更多
 * 更快的方式。該腳本還使開發人員能夠在遊戲過程中調整訊息視窗的大小，為其提
 * 供單獨的字體，並為玩家提供文本快進功能。
 *
 * ============================================================================
 * 自動換行
 * ============================================================================
 *
 * 現在可以通過訊息系統進行自動換行。您可以使用插件命令啟用和禁用自動換行。
 * 使用自動換行時，如果單詞超出訊息視窗的區域，它將自動轉到下一行。
 * 也就是說，自動換行將禁用編輯器的換行符，並要求您使用插件提供的換行符：
 *
 * <br> 或 <line break> 是應用換行符的文本代碼。
 * 在您希望開始下一行的部分之後。
 *
 * 請記住，自動換行主要用於訊息視窗。然而，在其他您希望看到自動換行的地方，
 * 例如商品描述，在文本的開頭插入 <WordWrap> 以啟用它。
 *
 * ============================================================================
 * 文本代碼
 * ============================================================================
 *
 * 通過在您的訊息中使用某些文本代碼，您可以讓遊戲將它們替換為以下內容：
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 文本代碼     功能
 *   \V[n]       替換為第 n 個變數的值。
 *   \N[n]       替換為第 n 個角色的姓名。
 *   \P[n]       替換為第 n 名隊員的姓名。
 *   \G          由貨幣單位代替。
 *   \C[n]       以第 n 種顏色繪製後續文字。
 *   \I[n]       繪製第 n 個圖示。
 *   \{          將文字大小放大一級。
 *   \}          將文字大小減小一級。
 *   \\          由反斜線字元代換。
 *   \$          開啟金幣視窗。
 *   \.          等待 1/4 秒。
 *   \|          等待 1 秒。
 *   \!          等待按鍵輸入。
 *   \>          一次顯示同一行剩餘全部文字。
 *   \<          一次取消所有文字顯示效果。
 *   \^          顯示文字後不等待輸入。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  等待：       效果：
 *    \w[x]     - 等待 x 幀（60 幀 = 1 秒）。 僅限訊息視窗。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  名稱框：     效果：
 *    \n<x>     - 建立一個帶有 x 字符串的名稱框。 左邊。 *注意
 *    \nc<x>    - 建立一個帶有 x 字符串的名稱框。 置中。 *注意
 *    \nr<x>    - 建立一個帶有 x 字符串的名稱框。 右邊。 *注意
 *
 *              *注意：僅適用於訊息視窗。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  換行：       效果：
 *    <br>      - 如果使用自動換行模式，這將導致換行。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  位置：       效果：
 *    \px[x]    - 將文本的 x 位置設置為 x。
 *    \py[x]    - 將文本的 y 位置設置為 y。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  輪廓：       效果：
 *   \oc[x]    - 將輪廓顏色設置為 x。
 *   \ow[x]    - 將輪廓寬度設置為 x。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  字體：       效果：
 *    \fr       - 重置所有字體更改。
 *    \fs[x]    - 將字體大小更改為 x。
 *    \fn<x>    - 將字體名稱更改為 x。
 *    \fb       - 切換字體粗體。
 *    \fi       - 切換字體斜體。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  角色：       效果：
 *    \af[x]    - 顯示角色 x 的臉圖。 *注意
 *    \ac[x]    - 寫出角色的職業名稱。
 *    \an[x]    - 寫出角色的暱稱。
 *
 *              *注意：僅適用於訊息視窗。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  隊伍：       效果：
 *    \pf[x]    - 顯示隊員 x 的臉圖。 *注意
 *    \pc[x]    - 寫出隊員  x的職業名稱。
 *    \pn[x]    - 寫出隊員  x的暱稱。
 *
 *              *注意：僅適用於訊息視窗。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  名字：       效果：
 *    \nc[x]    - 寫出職業 x 的名稱。
 *    \ni[x]    - 寫出物品 x 的名稱。
 *    \nw[x]    - 寫出武器 x 的名稱。
 *    \na[x]    - 寫出盔甲 x 的名稱。
 *    \ns[x]    - 寫出技能 x 的名稱。
 *    \nt[x]    - 寫出狀態 x 的名稱。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  圖示名稱：   效果：
 *    \ii[x]    - 寫出物品 x 的名稱，包括圖示。
 *    \iw[x]    - 寫出武器 x 的名稱，包括圖示。
 *    \ia[x]    - 寫出盔甲 x 的名稱，包括圖示。
 *    \is[x]    - 寫出技能 x 的名稱，包括圖示。
 *    \it[x]    - 寫出狀態 x 的名稱，包括圖示。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 這些是與此腳本一起添加的文本代碼。請記住，其中一些文本代碼僅適用
 * 於訊息視窗。反之，它們將適用於幫助描述、角色傳記等。
 *
 * ============================================================================
 * 插件指令
 * ============================================================================
 *
 * 以下是一些插件命令，您可以通過事件編輯器使用它們來更改訊息系統的各方面。
 *
 * 插件指令
 *   MessageRows 6
 *   - 將顯示的訊息行更改為 6。如果您使用連續的顯示文本事件，這將繼續顯示
 *   下一行的文本，直到達到行限制。之後的任何內容都會被切斷，直到下一則訊息
 *   開始，以避免意外重疊。
 *
 *   MessageWidth 400
 *   - 將訊息視窗寬度更改為 400 像素。這將切斷任何顯示在右側太遠的單詞，因
 *   此請進行相應調整！
 *
 *   EnableWordWrap
 *   - 啟用自動換行。如果單詞超出視窗大小，它將自動移動到下一行。
 *   請記住，您需要我們的 \br 來執行換行。
 *
 *   DisableWordWrap
 *   - 這將禁用自動換行。在編輯器中開始新一行的點將自動換行。
 *
 *   EnableFastForward
 *   - 啟用 快進鍵 來處理訊息。
 *
 *   DisableFastForward
 *   - 禁用 快進鍵 來處理訊息。
 *
 * ============================================================================
 * 變更日誌
 * ============================================================================
 *
 * Version 1.19:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.18:
 * - Added new plugin parameters: 'Font Name CH' and 'Font Name KR'.
 *
 * Version 1.17:
 * - Compatibility update with Message Macros for 'Name Box Auto Close' option.
 *
 * Version 1.16:
 * - Added 'Tight Wrap' plugin parameter as a word wrap option to make the
 * word wrap tighter when using faces.
 *
 * Version 1.15:
 * - Added a failsafe where if the name box window would be off the screen, it
 * will automatically reposition itself to under the main message window.
 *
 * Version 1.14:
 * - Added 'Name Box Close' plugin parameter. If this is enabled, the message
 * window will check for the Name Window speaker each time a follow up message
 * occurs. If the name in the currently Name Window matches the name in the
 * following Name Window, the message window will remain open. If it doesn't,
 * the Name Window will close and reopen to indicate a new speaker.
 *
 * Version 1.13:
 * - Added 'Maintain Font' plugin parameter under the Font category. This will
 * allow you to use text codes \fn<x> and \fs[x] to permanently change the font
 * of your messages until you use it again. \fr will reset them to the plugin's
 * default parameter settings.
 *
 * Version 1.12:
 * - 'Word Wrap Space' parameter no longer leaves a space at the beginning of
 * each message.
 *
 * Version 1.11:
 * - Added 'Font Outline' parameter for the plugin parameters. This adjusts the
 * font outline width used by default for only message fonts.
 *
 * Version 1.10:
 * - Updated the Message Row system for Extended Message Pack 1's Autosizing
 * feature to work with extended heights.
 *
 * Version 1.09:
 * - Replaced 'Fast Forward' parameter with the 'Fast Forward Key' parameter
 * and 'Enable Fast Forward' parameter. Two new Plugin Commands are added. They
 * are 'EnableFastForward' and 'DisableFastForward' for control over when fast
 * forwarding is allowed as to not cause timed cutscenes to desynch.
 *
 * Version 1.08:
 * - Fixed a bug regarding Input Number positioning when the Message Window's
 * position was middle.
 *
 * Version 1.07:
 * - Added 'Word Wrap Space' for word wrap users. This parameter will leave a
 * space behind for those who want a space left behind.
 *
 * Version 1.06:
 * - Fixed a bug that would cause masking problems with mobile devices.
 *
 * Version 1.05:
 * - Fixed a bug that would cause the namebox window to appear distorted.
 *
 * Version 1.04:
 * - Fixed a bug that captured too many text codes with the namebox window.
 * - Timed Name Window's closing speed with main window's closing speed.
 *
 * Verison 1.03:
 * - Fixed a bug with textcodes that messed up wordwrapping.
 * - Fixed a bug with font reset, italic, and bold textcodes.
 *
 * Version 1.02:
 * - Namebox Window's overlap feature that's in every MV window is now disabled
 * to allow for overlapping with main message window.
 * - Updated window positioning for Branch Choices, Number Input, and Item
 * Selection windows.
 *
 * Version 1.01:
 * - Added 'Description Wrap' into the parameters to allow for all item
 * descriptions to be automatically processed with word wrapping.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MessageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSGDefaultRows = String(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSGDefaultWidth = String(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSGFaceIndent = String(Yanfly.Parameters['Face Indent']);
Yanfly.Param.MSGFastForwardKey = String(Yanfly.Parameters['Fast Forward Key']);
Yanfly.Param.MSGFFOn = eval(String(Yanfly.Parameters['Enable Fast Forward']));
Yanfly.Param.MSGWordWrap = String(Yanfly.Parameters['Word Wrapping']);
Yanfly.Param.MSGWordWrap = eval(Yanfly.Param.MSGWordWrap);
Yanfly.Param.MSGDescWrap = String(Yanfly.Parameters['Description Wrap']);
Yanfly.Param.MSGWrapSpace = eval(String(Yanfly.Parameters['Word Wrap Space']));
Yanfly.Param.MSGTightWrap = eval(String(Yanfly.Parameters['Tight Wrap']));

Yanfly.Param.MSGFontName = String(Yanfly.Parameters['Font Name']);
Yanfly.Param.MSGCNFontName = String(Yanfly.Parameters['Font Name CH']);
Yanfly.Param.MSGKRFontName = String(Yanfly.Parameters['Font Name KR']);
Yanfly.Param.MSGFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MSGFontSizeChange = String(Yanfly.Parameters['Font Size Change']);
Yanfly.Param.MSGFontChangeMax = String(Yanfly.Parameters['Font Changed Max']);
Yanfly.Param.MSGFontChangeMin = String(Yanfly.Parameters['Font Changed Min']);
Yanfly.Param.MSGFontOutline = Number(Yanfly.Parameters['Font Outline']);
Yanfly.Param.MSGFontMaintain = eval(String(Yanfly.Parameters['Maintain Font']));

Yanfly.Param.MSGNameBoxBufferX = String(Yanfly.Parameters['Name Box Buffer X']);
Yanfly.Param.MSGNameBoxBufferY = String(Yanfly.Parameters['Name Box Buffer Y']);
Yanfly.Param.MSGNameBoxPadding = String(Yanfly.Parameters['Name Box Padding']);
Yanfly.Param.MSGNameBoxColor = Number(Yanfly.Parameters['Name Box Color']);
Yanfly.Param.MSGNameBoxClear = String(Yanfly.Parameters['Name Box Clear']);
Yanfly.Param.MSGNameBoxText = String(Yanfly.Parameters['Name Box Added Text']);
Yanfly.Param.MSGNameBoxClose = String(Yanfly.Parameters['Name Box Auto Close']);
Yanfly.Param.MSGNameBoxClose = eval(Yanfly.Param.MSGNameBoxClose);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Message.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    Yanfly.Message.Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
};

Yanfly.Message.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
    if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
    return Yanfly.Message.Bitmap_makeFontNameText.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Message.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Message.Game_System_initialize.call(this);
    this.initMessageSystem();
    this.initMessageFontSettings();
};

Game_System.prototype.initMessageSystem = function() {
    this._wordWrap = Yanfly.Param.MSGWordWrap;
    this._fastForward = Yanfly.Param.MSGFFOn;
};

Game_System.prototype.initMessageFontSettings = function() {
    if ($dataSystem.locale.match(/^zh/)) {
      this._msgFontName = Yanfly.Param.MSGCNFontName;
    } else if ($dataSystem.locale.match(/^ko/)) {
      this._msgFontName = Yanfly.Param.MSGKRFontName;
    } else {
      this._msgFontName = Yanfly.Param.MSGFontName;
    }
    this._msgFontSize = Yanfly.Param.MSGFontSize;
    this._msgFontOutline = Yanfly.Param.MSGFontOutline;
};

Game_System.prototype.messageRows = function() {
    var rows = eval(this._messageRows) || eval(Yanfly.Param.MSGDefaultRows);
    return Math.max(1, Number(rows));
};

Game_System.prototype.messageWidth = function() {
    return eval(this._messageWidth) || eval(Yanfly.Param.MSGDefaultWidth);
};

Game_System.prototype.wordWrap = function() {
    if (this._wordWrap === undefined) this.initMessageSystem();
    return this._wordWrap;
};

Game_System.prototype.setWordWrap = function(state) {
    if (this._wordWrap === undefined) this.initMessageSystem();
    this._wordWrap = state;
};

Game_System.prototype.isFastFowardEnabled = function() {
    if (this._fastForward === undefined) this.initMessageSystem();
    return this._fastForward;
};

Game_System.prototype.setFastFoward = function(state) {
    if (this._fastForward === undefined) this.initMessageSystem();
    this._fastForward = state;
};

Game_System.prototype.getMessageFontName = function() {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
    return this._msgFontName;
};

Game_System.prototype.setMessageFontName = function(value) {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
    this._msgFontName = value;
};

Game_System.prototype.getMessageFontSize = function() {
    if (this._msgFontSize === undefined) this.initMessageFontSettings();
    return this._msgFontSize;
};

Game_System.prototype.setMessageFontSize = function(value) {
    if (this._msgFontSize === undefined) this.initMessageFontSettings();
    this._msgFontSize = value;
};

Game_System.prototype.getMessageFontOutline = function() {
    if (this._msgFontOutline === undefined) this.initMessageFontSettings();
    return this._msgFontOutline;
};

Game_System.prototype.setMessageFontOutline = function(value) {
    if (this._msgFontOutline === undefined) this.initMessageFontSettings();
    this._msgFontOutline = value;
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.addText = function(text) {
    if ($gameSystem.wordWrap()) text = '<WordWrap>' + text;
    this.add(text);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Message.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Message.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MessageRows') $gameSystem._messageRows = args[0];
    if (command === 'MessageWidth') $gameSystem._messageWidth = args[0];
    if (command === 'EnableWordWrap') $gameSystem.setWordWrap(true);
    if (command === 'DisableWordWrap') $gameSystem.setWordWrap(false);
    if (command === 'EnableFastForward') $gameSystem.setFastFoward(true);
    if (command === 'DisableFastForward') $gameSystem.setFastFoward(false);
};

Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
      while (this.isContinueMessageString()) {
        this._index++;
        if (this._list[this._index].code === 401) {
          $gameMessage.addText(this.currentCommand().parameters[0]);
        }
        if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
      }
      switch (this.nextEventCode()) {
      case 102:
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
      case 103:
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
      case 104:
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
};

Game_Interpreter.prototype.isContinueMessageString = function() {
    if (this.nextEventCode() === 101 && $gameSystem.messageRows() > 4) {
      return true;
    } else {
      return this.nextEventCode() === 401;
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Message.Window_Base_resetFontSettings =
    Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    Yanfly.Message.Window_Base_resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.outlineWidth = $gameSystem.getMessageFontOutline();
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Yanfly.Message.Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = this.setWordWrap(text);
    text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
    text = this.convertExtraEscapeCharacters(text);
    return text;
};

Window_Base.prototype.setWordWrap = function(text) {
    this._wordWrap = false;
    if (text.match(/<(?:WordWrap)>/i)) {
      this._wordWrap = true;
      text = text.replace(/<(?:WordWrap)>/gi, '');
    }
    if (this._wordWrap) {
      var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
      text = text.replace(/[\n\r]+/g, replace);
    }
    if (this._wordWrap) {
      text = text.replace(/<(?:BR|line break)>/gi, '\n');
    } else {
      text = text.replace(/<(?:BR|line break)>/gi, '');
    }
    return text;
};

Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
    // Font Codes
    text = text.replace(/\x1bFR/gi, '\x1bMSGCORE[0]');
    text = text.replace(/\x1bFB/gi, '\x1bMSGCORE[1]');
    text = text.replace(/\x1bFI/gi, '\x1bMSGCORE[2]');
    // \AC[n]
    text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
        return this.actorClassName(parseInt(arguments[1]));
    }.bind(this));
    // \AN[n]
    text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
        return this.actorNickname(parseInt(arguments[1]));
    }.bind(this));
    // \PC[n]
    text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
        return this.partyClassName(parseInt(arguments[1]));
    }.bind(this));
    // \PN[n]
    text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
        return this.partyNickname(parseInt(arguments[1]));
    }.bind(this));
    // \NC[n]
    text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
        return $dataClasses[parseInt(arguments[1])].name;
    }.bind(this));
    // \NI[n]
    text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
        return $dataItems[parseInt(arguments[1])].name;
    }.bind(this));
    // \NW[n]
    text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
        return $dataWeapons[parseInt(arguments[1])].name;
    }.bind(this));
    // \NA[n]
    text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
        return $dataArmors[parseInt(arguments[1])].name;
    }.bind(this));
    // \NE[n]
    text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
        return $dataEnemies[parseInt(arguments[1])].name;
    }.bind(this));
    // \NS[n]
    text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
        return $dataSkills[parseInt(arguments[1])].name;
    }.bind(this));
    // \NT[n]
    text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
        return $dataStates[parseInt(arguments[1])].name;
    }.bind(this));
    // \II[n]
    text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataItems);
    }.bind(this));
    // \IW[n]
    text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataWeapons);
    }.bind(this));
    // \IA[n]
    text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataArmors);
    }.bind(this));
    // \IS[n]
    text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataSkills);
    }.bind(this));
    // \IT[n]
    text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataStates);
    }.bind(this));
    // Finish
    return text;
};

Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.partyNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.escapeIconItem = function(n, database) {
    return '\x1bI[' + database[n].iconIndex + ']' + database[n].name;
};

Window_Base.prototype.obtainEscapeString = function(textState) {
    var arr = /^\<(.*?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '';
    }
};

Yanfly.Message.Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
  switch (code) {
  case 'MSGCORE':
    var id = this.obtainEscapeParam(textState);
    if (id === 0) {
      $gameSystem.initMessageFontSettings();
      this.resetFontSettings();
    }
    if (id === 1) this.contents.fontBold = !this.contents.fontBold;
    if (id === 2) this.contents.fontItalic = !this.contents.fontItalic;
    break;
  case 'FS':
    var size = this.obtainEscapeParam(textState);
    this.contents.fontSize = size;
    if (Yanfly.Param.MSGFontMaintain) $gameSystem.setMessageFontSize(size);
    break;
  case 'FN':
    var name = this.obtainEscapeString(textState);
    this.contents.fontFace = name;
    if (Yanfly.Param.MSGFontMaintain) $gameSystem.setMessageFontName(name);
    break;
  case 'OC':
    var id = this.obtainEscapeParam(textState);
    this.contents.outlineColor = this.textColor(id);
    break;
  case 'OW':
    this.contents.outlineWidth = this.obtainEscapeParam(textState);
    break;
  case 'PX':
    textState.x = this.obtainEscapeParam(textState);
    break;
  case 'PY':
    textState.y = this.obtainEscapeParam(textState);
    break;
  default:
    Yanfly.Message.Window_Base_processEscapeCharacter.call(this,
     code, textState);
    break;
  }
};

Window_Base.prototype.makeFontBigger = function() {
    var size = this.contents.fontSize + eval(Yanfly.Param.MSGFontSizeChange);
    this.contents.fontSize = Math.min(size, Yanfly.Param.MSGFontChangeMax);
};

Window_Base.prototype.makeFontSmaller = function() {
  var size = this.contents.fontSize - eval(Yanfly.Param.MSGFontSizeChange);
  this.contents.fontSize = Math.max(size, Yanfly.Param.MSGFontChangeMin);
};

Yanfly.Message.Window_Base_processNormalCharacter =
    Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
    if (this.checkWordWrap(textState)) return this.processNewLine(textState);
    Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
    if (!textState) return false;
    if (!this._wordWrap) return false;
    if (textState.text[textState.index] === ' ') {
      var nextSpace = textState.text.indexOf(' ', textState.index + 1);
      var nextBreak = textState.text.indexOf('\n', textState.index + 1);
      if (nextSpace < 0) nextSpace = textState.text.length + 1;
      if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
      var word = textState.text.substring(textState.index, nextSpace);
      var size = this.textWidthExCheck(word);
    }
    return (size + textState.x > this.wordwrapWidth());
};

Window_Base.prototype.wordwrapWidth = function(){
  return this.contents.width;
};

Window_Base.prototype.saveCurrentWindowSettings = function(){
    this._saveFontFace = this.contents.fontFace;
    this._saveFontSize = this.contents.fontSize;
    this._savetextColor = this.contents.textColor;
    this._saveFontBold = this.contents.fontBold;
    this._saveFontItalic = this.contents.fontItalic;
    this._saveOutlineColor = this.contents.outlineColor;
    this._saveOutlineWidth = this.contents.outlineWidth;
};

Window_Base.prototype.restoreCurrentWindowSettings = function(){
    this.contents.fontFace = this._saveFontFace;
    this.contents.fontSize = this._saveFontSize;
    this.contents.textColor = this._savetextColor;
    this.contents.fontBold = this._saveFontBold;
    this.contents.fontItalic = this._saveFontItalic;
    this.contents.outlineColor = this._saveOutlineColor;
    this.contents.outlineWidth = this._saveOutlineWidth;
};

Window_Base.prototype.clearCurrentWindowSettings = function(){
    this._saveFontFace = undefined;
    this._saveFontSize = undefined;
    this._savetextColor = undefined;
    this._saveFontBold = undefined;
    this._saveFontItalic = undefined;
    this._saveOutlineColor = undefined;
    this._saveOutlineWidth = undefined;
};

Window_Base.prototype.textWidthExCheck = function(text) {
    var setting = this._wordWrap;
    this._wordWrap = false;
    this.saveCurrentWindowSettings();
    this._checkWordWrapMode = true;
    var value = this.drawTextEx(text, 0, this.contents.height);
    this._checkWordWrapMode = false;
    this.restoreCurrentWindowSettings();
    this.clearCurrentWindowSettings();
    this._wordWrap = setting;
    return value;
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.Message.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (eval(Yanfly.Param.MSGDescWrap)) {
      this.setText(item ? '<WordWrap>' + item.description : '');
    } else {
      Yanfly.Message.Window_Help_setItem.call(this, item);
    }
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_ChoiceList.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Yanfly.Message.Window_ChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
    Yanfly.Message.Window_ChoiceList_updatePlacement.call(this);
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = this._messageWindow.height;
    } else if (messagePosType === 2) {
      this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.Message.Window_NumberInput_updatePlacement =
    Window_NumberInput.prototype.updatePlacement;
Window_NumberInput.prototype.updatePlacement = function() {
    Yanfly.Message.Window_NumberInput_updatePlacement.call(this);
    var messageY = this._messageWindow.y;
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = this._messageWindow.height;
    } else if (messagePosType === 1) {
      if (messageY >= Graphics.boxHeight / 2) {
          this.y = messageY - this.height;
      } else {
          this.y = messageY + this._messageWindow.height;
      }
    } else if (messagePosType === 2) {
      this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.Message.Window_EventItem_updatePlacement =
    Window_EventItem.prototype.updatePlacement;
Window_EventItem.prototype.updatePlacement = function() {
    Yanfly.Message.Window_EventItem_updatePlacement.call(this);
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = Graphics.boxHeight - this.height;
    } else if (messagePosType === 2) {
      this.y = 0;
    }
};

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_ScrollText.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

//=============================================================================
// Window_NameBox
//=============================================================================

Yanfly.DisableWebGLMask = false;

function Window_NameBox() {
    this.initialize.apply(this, arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function(parentWindow) {
    this._parentWindow = parentWindow;
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
    this._text = '';
    this._lastNameText = '';
    this._openness = 0;
    this._closeCounter = 0;
    this.deactivate();
    if (eval(Yanfly.Param.MSGNameBoxClear)) {
      this.backOpacity = 0;
      this.opacity = 0;
    }
    this.hide();
};

Window_NameBox.prototype.windowWidth = function() {
    this.resetFontSettings();
    var dw = this.textWidthEx(this._text);
    dw += this.padding * 2;
    var width = dw + eval(Yanfly.Param.MSGNameBoxPadding)
    return Math.ceil(width);
};

Window_NameBox.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_NameBox.prototype.calcNormalCharacter = function(textState) {
    return this.textWidth(textState.text[textState.index++]);
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_NameBox.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Window_NameBox.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) return;
    if (this.isClosed()) return;
    if (this.isClosing()) return;
    if (this._closeCounter-- > 0) return;
    if (this._parentWindow.isClosing()) {
      this._openness = this._parentWindow.openness;
    }
    this.close();
};

Window_NameBox.prototype.refresh = function(text, position) {
    this.show();
    this._lastNameText = text;
    this._text = Yanfly.Param.MSGNameBoxText + text;
    this._position = position;
    this.width = this.windowWidth();
    this.createContents();
    this.contents.clear();
    this.resetFontSettings();
    this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
    var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
    this.drawTextEx(this._text, padding, 0, this.contents.width);
    this._parentWindow.adjustWindowSettings();
    this._parentWindow.updatePlacement();
    this.adjustPositionX();
    this.adjustPositionY();
    this.open();
    this.activate();
    this._closeCounter = 4;
    return '';
};

Window_NameBox.prototype.adjustPositionX = function() {
    if (this._position === 1) {
      this.x = this._parentWindow.x;
      this.x += eval(Yanfly.Param.MSGNameBoxBufferX);
    } else if (this._position === 2) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width * 3 / 10;
      this.x -= this.width / 2;
    } else if (this._position === 3) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width / 2;
      this.x -= this.width / 2;
    } else if (this._position === 4) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width * 7 / 10;
      this.x -= this.width / 2;
    } else {
      this.x = this._parentWindow.x + this._parentWindow.width;
      this.x -= this.width;
      this.x -= eval(Yanfly.Param.MSGNameBoxBufferX);
    }
    this.x = this.x.clamp(0, Graphics.boxWidth - this.width);
};

Window_NameBox.prototype.adjustPositionY = function() {
    if ($gameMessage.positionType() === 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    } else {
      this.y = this._parentWindow.y;
      this.y -= this.height;
      this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
    }
    if (this.y < 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    }
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.Message.Window_Message_createSubWindows =
    Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    Yanfly.Message.Window_Message_createSubWindows.call(this);
    this._nameWindow = new Window_NameBox(this);
    Yanfly.nameWindow = this._nameWindow;
    var scene = SceneManager._scene;
    scene.addChild(this._nameWindow);
};

Window_Message.prototype.numVisibleRows = function() {
    return $gameSystem.messageRows();
};

Window_Message.prototype.windowWidth = function() {
    return $gameSystem.messageWidth();
};

Window_Message.prototype.wordwrapWidth = function(){
  if (Yanfly.Param.MSGTightWrap && $gameMessage.faceName() !== '') {
    return this.contents.width - this.newLineX();
  }
  return Window_Base.prototype.wordwrapWidth.call(this);
};

Window_Message.prototype.adjustWindowSettings = function() {
    this.width = this.windowWidth();
    this.height = Math.min(this.windowHeight(), Graphics.boxHeight);
    if (Math.abs(Graphics.boxHeight - this.height) < this.lineHeight()) {
      this.height = Graphics.boxHeight;
    }
    this.createContents();
    this.x = (Graphics.boxWidth - this.width) / 2;
};

Yanfly.Message.Window_Message_startMessage =
    Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._nameWindow.deactivate();
    Yanfly.Message.Window_Message_startMessage.call(this);
};

Yanfly.Message.Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.deactivate();
    Yanfly.Message.Window_Message_terminateMessage.call(this);
};

Yanfly.Message.Window_Message_newPage =
    Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this.adjustWindowSettings();
    Yanfly.Message.Window_Message_newPage.call(this, textState);
};

Window_Message.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_Message.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Window_Message.prototype.newLineX = function() {
    if ($gameMessage.faceName() === '') {
      return 0;
    } else {
      return eval(Yanfly.Param.MSGFaceIndent);
    }
};

Window_Message.prototype.isFastForward = function() {
    if (!$gameSystem.isFastFowardEnabled()) return false;
    return Input.isPressed(Yanfly.Param.MSGFastForwardKey);
};

Yanfly.Message.Window_Message_updateInput =
    Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
      if (!this._textState) {
        this.pause = false;
        this.terminateMessage();
      }
    }
    return Yanfly.Message.Window_Message_updateInput.call(this);
};

Yanfly.Message.Window_Message_updateShowFast =
    Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (this.isFastForward()) this._showFast = true;
    Yanfly.Message.Window_Message_updateShowFast.call(this);
};

Yanfly.Message.Window_Message_updateWait =
    Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (this.isFastForward()) return false;
    return Yanfly.Message.Window_Message_updateWait.call(this);
};

Yanfly.Message.Window_Message_startWait =
    Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
    if (this._checkWordWrapMode) return;
    Yanfly.Message.Window_Message_startWait.call(this, count);
    if (this.isFastForward()) this._waitCount = 0;
};

Yanfly.Message.Window_Message_startPause =
    Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
    if (this._checkWordWrapMode) return;
    Yanfly.Message.Window_Message_startPause.call(this);
};

Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
    text = this.convertNameBox(text);
    text = this.convertMessageCharacters(text);
    return text;
};

Window_Message.prototype.convertNameBox = function(text) {
    text = text.replace(/\x1bN\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN1\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN2\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 2);
    }, this);
    text = text.replace(/\x1bN3\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNC\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bN4\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 4);
    }, this);
    text = text.replace(/\x1bN5\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 5);
    }, this);
    text = text.replace(/\x1bNR\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 5);
    }, this);
    return text;
};

Window_Message.prototype.convertMessageCharacters = function(text) {
    text = text.replace(/\x1bAF\[(\d+)\]/gi, function() {
        var i = parseInt(arguments[1]);
        return this.convertActorFace($gameActors.actor(i));
    }.bind(this));
    text = text.replace(/\x1bPF\[(\d+)\]/gi, function() {
        var i = parseInt(arguments[1]);
        return this.convertActorFace($gameParty.members()[i - 1]);
    }.bind(this));
    return text;
};

Window_Message.prototype.convertActorFace = function(actor) {
    $gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

Yanfly.Message.Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '!':
      if (!this.isFastForward()) this.startPause();
      break;
    case 'W':
      this.startWait(this.obtainEscapeParam(textState));
    default:
      Yanfly.Message.Window_Message_processEscapeCharacter.call(this,
        code, textState);
      break;
    }
};

if (Yanfly.Param.MSGNameBoxClose) {

Yanfly.Message.Window_Message_doesContinue =
  Window_Message.prototype.doesContinue;
Window_Message.prototype.doesContinue = function() {
  var value = Yanfly.Message.Window_Message_doesContinue.call(this);
  if (!value) return false;
  if (this.hasDifferentNameBoxText()) {
    return false;
  }
  return true;
};

Window_Message.prototype.hasDifferentNameBoxText = function() {
  var texts = $gameMessage._texts;
  var length = texts.length;
  var open = this._nameWindow.isOpen();
  for (var i = 0; i < length; ++i) {
    var text = texts[i];
    if (text.length <= 0) continue;
    if (Yanfly.MsgMacro) {
      text = this.convertMacroText(text);
      text = text.replace(/\x1b/gi, '\\');
    }
    if (text.match(/\\(?:N|N1|N2|N3|N4|N5|NC|NR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    } else if (text.match(/\\(?:ND|ND1|ND2|ND3|ND4|ND5|NDC|NDR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    } else if (text.match(/\\(?:NT|NT1|NT2|NT3|NT4|NT5|NTC|NTR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    }
    if (name) {
      name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\N\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\P\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\/gi, '\x1b');
    }
    if (name && !open) return true;
    if (name && name !== this._nameWindow._lastNameText) {
      return true;
    }
  }
  if (open && !name) return true;
  return false;
};

} // Yanfly.Param.MSGNameBoxClose

//=============================================================================
// End of File
//=============================================================================
