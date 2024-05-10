//=============================================================================
// SimpleMsgSideView.js
//=============================================================================

/*:
 * @plugindesc 側視角戰鬥中只顯示 技能/物品 的名稱。
 * @author Sasuke KANNAZUKI
 *
 * @param displayAttack
 * @desc 是否顯示普通攻擊。 1:是 0:否
 * @default 0
 *
 * @param position
 * @desc 技能名稱顯示位置。 0:左, 1:中
 * @default 1
 *
 * @help 這個插件不提供插件命令。
 *
 * 通過不顯示訊息而只顯示技能名稱，戰鬥速度會略有增加。
 * 
 *                                                    正體中文化 by xyzjw
 */

/*:ja
 * @plugindesc サイドビューバトルで技/アイテムの名前のみ表示します。
 * @author 神無月サスケ
 *
 * @param displayAttack
 * @desc 通常攻撃も表示するか (1:する 0:しない)
 * @default 0
 *
 * @param position
 * @desc 技名を表示する位置 (0:左寄せ, 1:中央)
 * @default 1
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 * ログを表示せず、技名のみを表示することで、戦闘のテンポが若干高速になります。
 */

(function() {

  var parameters = PluginManager.parameters('SimpleMsgSideView');
  var displayAttack = Number(parameters['displayAttack']) != 0;
  var position = Number(parameters['position'] || 1);

  var _Window_BattleLog_addText = Window_BattleLog.prototype.addText;
  Window_BattleLog.prototype.addText = function(text) {
   if($gameSystem.isSideView()){
     this.refresh();
     this.wait();
     return;  // not display battle log
   }
   _Window_BattleLog_addText.call(this, text);
  };

  // for sideview battle only
  Window_BattleLog.prototype.addItemNameText = function(itemName) {
    this._lines.push(itemName);
    this.refresh();
    this.wait();
  };

  var _Window_BattleLog_displayAction = 
   Window_BattleLog.prototype.displayAction;
  Window_BattleLog.prototype.displayAction = function(subject, item) {
    if($gameSystem.isSideView()){
      if(displayAttack ||
       !(DataManager.isSkill(item) && item.id == subject.attackSkillId())) {
　　    this.push('addItemNameText', item.name);  // display item/skill name
      } else {
        this.push('wait');
      }
      return;
    }
    _Window_BattleLog_displayAction.call(this, subject, item);
  };

  // to put skill/item name at center
  var _Window_BattleLog_drawLineText = Window_BattleLog.prototype.drawLineText;
  Window_BattleLog.prototype.drawLineText = function(index) {
    if($gameSystem.isSideView() && position == 1){
      var rect = this.itemRectForText(index);
      this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
      this.drawText(this._lines[index], rect.x, rect.y,
       rect.width, 'center');
      return;
    }
    _Window_BattleLog_drawLineText.call(this, index);
  };

})();
