//=============================================================================
// TitleCommandPosition.js
//=============================================================================

/*:
 * @plugindesc 更改標題命令視窗的位置。
 * @author Yoji Ojima
 *
 * @param Offset X
 * @desc X 坐標的偏移值。
 * @default 0
 *
 * @param Offset Y
 * @desc Y 坐標的偏移值。
 * @default 0
 *
 * @param Width
 * @desc 命令視窗的寬度。
 * @default 240
 *
 * @param Background
 * @desc 背景類型。 0：正常，1：暗淡，2：透明
 * @default 0
 *
 * @help 此插件不提供插件命令。              正體中文化 by xyzjw
 */

/*:ja
 * @plugindesc タイトルコマンドウィンドウの位置を変更します。
 * @author Yoji Ojima
 *
 * @param Offset X
 * @desc X座標のオフセット値です。
 * @default 0
 *
 * @param Offset Y
 * @desc Y座標のオフセット値です。
 * @default 0
 *
 * @param Width
 * @desc コマンドウィンドウの幅です。
 * @default 240
 *
 * @param Background
 * @desc 背景タイプです。0: 通常、1: 暗くする、2: 透明
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

    var parameters = PluginManager.parameters('TitleCommandPosition');
    var offsetX = Number(parameters['Offset X'] || 0);
    var offsetY = Number(parameters['Offset Y'] || 0);
    var width = Number(parameters['Width'] || 240);
    var background = Number(parameters['Background'] || 0);

    var _Window_TitleCommand_updatePlacement =
            Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        this.x += offsetX;
        this.y += offsetY;
        this.setBackgroundType(background);
    };

    Window_TitleCommand.prototype.windowWidth = function() {
        return width;
    };

})();
