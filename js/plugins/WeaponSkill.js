//=============================================================================
// WeaponSkill.js
//=============================================================================

/*:
 * @plugindesc 更改每種武器攻擊的技能 ID。
 * @author Sasuke KANNAZUKI
 *
 * @help 此插件不提供插件命令。
 *
 * 如果您在武器的“備忘錄”字段中寫入 <skill_id: 3>
 * 普通攻擊時會發動 3號 技能。
 * 除非另有說明，否則將照常採用第一個技能。 PS：預設是「技能1 的攻擊」。
 *
 * 檢查點：
 * - 雙持情況下，將採用優勢臂（之前定義的）所擁有的技能ID。
 * - 最好將技能類型設置為“無”。
 * - 否則，當該技能被封住時，您將無法攻擊。
 *  
 *
 * 預期用途：
 * - 做出可以攻擊所有人的武器
 * - 做出可以攻擊兩次甚至攻擊三次的武器
 * - 如果你將恢復魔法指定為技能，當您選擇“攻擊”時，您可以選擇隊友並恢復他們。
 * - 也可以實現相當於有防禦指令的武器。 
 *
 *                                           正體中文化 by xyzjw
 */

/*:ja
 * @plugindesc 武器ごとに通常攻撃のスキルIDを変更します。
 * @author 神無月サスケ
 *
 * @help このプラグインにはプラグインコマンドはありません。
 *
 *  武器の「メモ」欄に、<skill_id:3> と書いた場合、
 * 通常攻撃の際、3番のスキルが発動します。
 * ※特に記述がなければ、通常通り1番のスキルが採用されます。
 *
 * チェックポイント:
 * - 二刀流の場合、利き腕(先に定義された方)に持っているスキルIDが採用されます。
 * - スキルタイプは「なし」にするのが望ましいです。
 * さもなくば、技などを封じられたとき、攻撃が出来なくなります。
 *
 * 想定される用途:
 * - 全体攻撃可能な武器
 * - 2回攻撃、3回攻撃する武器
 * - 回復魔法をスキルに指定した場合、
 * 「攻撃」を選んだ際、味方の選択が出来、その仲間を回復します
 * - 防御コマンドなどと同等になる武器も実現可能です。
 */

(function() {

  //
  // set skill id for attack.
  //
  Game_Actor.prototype.attackSkillId = function() {
    var normalId = Game_BattlerBase.prototype.attackSkillId.call(this);
    if(this.hasNoWeapons()){
      return normalId;
    }
    var weapon = this.weapons()[0];  // at plural weapon, one's first skill.
    var id = weapon.meta.skill_id;
    return id ? Number(id) : normalId;
  };

  //
  // for command at battle
  //
  var _Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
  Scene_Battle.prototype.commandAttack = function() {
    BattleManager.inputtingAction().setAttack();
    // normal attack weapon (or other single attack weapon)
    var action = BattleManager.inputtingAction();
    if(action.needsSelection() && action.isForOpponent()){
      _Scene_Battle_commandAttack.call(this);
      return;
    }
    // special skill weapon
    this.onSelectAction();
  };

})();

