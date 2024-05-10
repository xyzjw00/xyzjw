//=============================================================================
// Yanfly Engine Plugins - Item Core
// YEP_ItemCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ItemCore = true;

var Yanfly = Yanfly || {};
Yanfly.Item = Yanfly.Item || {};
Yanfly.Item.version = 1.30;

//=============================================================================
 /*:
 * @plugindesc v1.30 改變您遊戲物品處理的方式以及物品場景的強化。
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Items
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 最大物品數量。 如果將其設定為 0，則將沒有獨立物品。
 * @default 0
 *
 * @param Max Weapons
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 最大武器數量。 如果將其設定為 0，則將沒有獨立武器。
 * @default 100
 *
 * @param Max Armors
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 最大盔甲數量。 如果將其設定為 0，則將沒有獨立盔甲。
 * @default 100
 *
 * @param Starting ID
 * @parent ---General---
 * @type number
 * @min 1
 * @desc 這將是獨立物品的起始 ID ，這樣它們就不會影響預設物品。
 * @default 3000
 *
 * @param Random Variance
 * @parent ---General---
 * @type number
 * @desc 無論正負值；以這個數值隨機化非賣品的數據。設定 0 表示不隨機。
 * @default 0
 *
 * @param Negative Variance
 * @parent ---General---
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc 如果使用隨機變化，允許隨機變化裝備的數據低於 0？
 * 不 - false     是 - true
 * @default false
 *
 * @param Name Format
 * @parent ---General---
 * @desc 物品名稱的排序和結構方式。
 * %1 - 前綴, %2 - 基本名稱, %3 - 後綴, %4 強化
 * @default %1%2%3%4
 *
 * @param Name Spacing
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在名稱的前綴和後綴之間放置一個空格？
 * 不 - false     是 - true
 * @default true
 *
 * @param Boost Format
 * @parent ---General---
 * @desc 已強化的獨立物品的文本格式。
 * %1 - 強化數值
 * @default (+%1)
 *
 * @param ---Item Scene---
 * @default
 *
 * @param Updated Scene Item
 * @parent ---Item Scene---
 * @type boolean
 * @on Updated (Recommended)
 * @off Normal
 * @desc 啟用此功能將更改物品場景的視覺外觀。
 * 不 - false     是 - true (強烈推薦)
 * @default true
 *
 * @param List Equipped Items
 * @parent ---Item Scene---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在物品列表中顯示已裝備的獨立物品？
 * 不 - false     是 - true
 * @default true
 *
 * @param Show Icon
 * @parent ---Item Scene---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在狀態視窗中顯現圖示？
 * 不 - false     是 - true
 * @default true
 *
 * @param Icon Size
 * @parent ---Item Scene---
 * @type number
 * @min 0
 * @desc 這將是要繪製的圖示的寬度和高度。
 * 這通常是預設圖示寬度和高度的 4 倍。
 * @default 128
 *
 * @param Font Size
 * @parent ---Item Scene---
 * @type number
 * @min 1
 * @desc 更改描述物品的字體大小。
 * 預設： 28
 * @default 20
 *
 * @param Command Alignment
 * @parent ---Item Scene---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 這是命令視窗的文本對齊方式。
 * 左 - left    中間 - center   右 - right
 * @default center
 *
 * @param Recovery Format
 * @parent ---Item Scene---
 * @desc 這是 HP/MP 恢復的文本格式。
 * @default %1 恢復
 *
 * @param Add State
 * @parent ---Item Scene---
 * @desc 附加狀態的文字。
 * @default 附加狀態
 *
 * @param Add Buff
 * @parent ---Item Scene---
 * @desc 附加增益狀態的文字。
 * @default 附加增益狀態
 *
 * @param Remove State
 * @parent ---Item Scene---
 * @desc 移除異常狀態的文字。
 * @default 消除狀態
 *
 * @param Remove Buff
 * @parent ---Item Scene---
 * @desc 移除增益狀態的文字。
 * @default 消除增益狀態
 *
 * @param Maximum Icons
 * @parent ---Item Scene---
 * @type number
 * @min 0
 * @desc 為狀態和增益狀態繪製的最大圖示數量。
 * @default 4
 *
 * @param Use Command
 * @parent ---Item Scene---
 * @desc 使用所選物品的命令文本。
 * %1 - 物品圖示和名稱
 * @default 使用 %1
 *
 * @param Carry Format
 * @parent ---Item Scene---
 * @desc 這是獨立物品 ID 的視覺文本格式。
 * %1 - 物品索引     %2 - 最大值
 * @default %1/%2
 *
 * @param --Independent Items--
 * @default
 *
 * @param Midgame Note Parsing
 * @parent ---Independent Items---
 * @type boolean
 * @on YES
 * @off NO (Recommended)
 * @desc 允許在遊戲中期解析還是在一開始時解析？
 * 不 - false     是 - true    強烈建議: false
 * @default false
 *
 * @help
 * ============================================================================
 * 介紹                    正體中文化 by xyzjw
 * ============================================================================
 *
 * 這個插件對你的遊戲和物品的處理方式進行了一些主要的改變，以便為未來的
 * 插件提供一個基本的核心。
 *
 * 1. Independent Items（獨立物品）
 * 如果你選擇對你的物品、武器 和/或 盔甲設定最大限制，這些物品將變為獨立
 * 並擁有其各自的統計數據等等。獨立物品能夠被升級、改變、修改等，並且獨
 * 立於相同類型的其他物品而保留那些改變的屬性。沒有最大限制（又名 0）的
 * 物品將繼續像它們在 RPG Maker MV 中通常所做的那樣工作。
 *
 * 2. New Scene_Item（新場景_物品）
 * 物品場景經過改造，看起來有點不同。使用新佈局，物品列表不再是兩列，而
 * 是一列。增加了更多視窗，例如物品狀態視窗（顯示基本物品訊息）、物品訊
 * 息視窗（顯示通過升級等應用到物品的訊息）和物品操作視窗，當您選擇一個
 * 物品，它會詢問您是否希望使用該物品或通過插件增加的任何操作
 * （例如升級物品）。如果你不想使用這個改造，你可以從參數中禁用它。
 *
 * 3. Random Variance（隨機變化）
 * 對於獨立的物品，新獲得的非賣品可以在較小程度上獲得隨機數據。物品可以
 * 高於庫存值或低於庫存值差值。如果您希望某個物品沒有隨機值，可以使用標
 * 籤將隨機值設定為 0。如果您希望所有物品都沒有隨機值，則可以將該參數設
 * 定為 0。
 *
 * 注意：在戰鬥測試中，獨立物品被禁用。
 *
 * ============================================================================
 * 筆記標籤
 * ============================================================================
 *
 * 如果您使用的是獨立物品，則非賣品可能會對其統計數據應用隨機變化。
 *
 * Item, Weapon, Armor Notetag（物品、武器、盔甲 標籤）
 *   <Random Variance: x>
 *   如果該物品是通過非商店方式獲得的，則它的隨機屬性會以正值或負值的
 *   形式偏移 x 值。
 *
 *   <Not Independent Item> 
 *   將預設獨立的物品設定為非獨立物品，允許其堆疊並使其不受獨立物品修
 *   飾的影響。
 *
 *   <Priority Name>
 *   這會將物品、武器或盔甲的優先級名稱設定為其資料庫條目，以便名稱方
 *   案不會影響該物品。
 *
 *   <Text Color: x>
 *   這將設定此物品、武器或盔甲的文本顏色以使用來自視窗外觀的文本顏色 x。
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 如果您希望能夠在不應用隨機變化的情況下將物品增加到玩家的庫存，您可
 * 以使用以下插件命令來調整設定。
 *
 * 插件命令：
 *   EnableVarianceStock  - 從這點開始獲得的所有物品的隨機都給出
 *                          庫存（非隨機）值。
 *   DisableVarianceStock - 從這點開始獲得的所有物品的隨機都給出
 *                          隨機值。
 *
 * 一個小小的注意事項，如果您啟用了隨機供應值（VarianceStock），如果玩
 * 家通過瀏覽標題畫面或只是關閉程序並重啟來重新遊戲，隨機變化將再次生
 * 效。此插件命令旨在作為短期禁用存在。
 *
 * ============================================================================
 * 事件變化
 * ============================================================================
 *
 * 為了適應獨立物品，對事件進行了一些更改。 詳情如下：
 *
 * 事件頁面條件和條件分支：
 *   如果該物品是可以獨立的，則檢查該物品是否存在於隊伍的庫存中且有所
 * 不同。相反，如果存在以所選物品作為基礎物品的物品，即使在升級後，也
 * 可以滿足條件。這意味著你的長劍 (+1) 將滿足在事件編輯器中有目標長劍
 * 物品的條件。
 *
 * 角色擁有 X 裝備：
 *   和之前的條件一樣，如果角色的基礎物品與事件編輯器的目標物品相匹配
 * ，就會滿足這個條件。長劍（+1）將滿足需要角色裝備長劍物品的條件。
 *
 * 裝備變更：
 *   如果目標裝備是獨立的，遊戲會先檢查角色是否有裝備了匹配基礎物品的
 * 物品。如果沒有，遊戲將檢查隊伍庫存中是否有匹配的基礎物品並使用它。
 * 如果又沒有，那麼遊戲將創建該物品的新庫存版本並將其裝備給角色。
 *
 * ============================================================================
 * 物品名稱系統
 * ============================================================================
 *
 * 對於獨立物品，他們有一個獨特的名稱處理系統。獨立物品由四部分組成：
 *
 * Prefix（前綴）Base Name（基本名稱）Suffix（後綴）Boost Count（強化次數）
 *
 * 前綴、基本名稱、後綴和強化次數由插件調整。根據應用的效果，它們可以
 * 改動或變化。使用名稱系統，前綴為“Fiery”、基本名稱為“Sword”、
 * 後綴為“of Might”且強化次數為 5 的物品最終將如下所示：
 *
 *      Fiery Sword of Might (+5)   （烈火之劍(+5)）
 *
 * 只有當它的各個名稱部分以某種方式被更改時，該物品才會以這種方式出現。
 * 但是，還有第五個命名規定，那就是優先級名稱。如果物品具有優先級名稱，
 * 它將僅用優先級名稱本身完全覆蓋當前的名稱方案。
 * 所以即使物品的名字是‘烈火之劍(+5)’，如果物品的優先級名稱是
 * ‘傳奇之刃’，那麼‘傳奇之刃’將會優先。
 *
 * ============================================================================
 * 瘋狂模式 - 獨立物品創建
 * ============================================================================
 *
 * 對於有 JavaScript 經驗的人，您可以使用以下瘋狂模式在創建物品時運行
 * JavaScript 代碼。這僅適用於新製作的獨立物品。
 *
 * Item, Weapon, Armor  （物品、武器、盔甲）
 *
 *   <On Creation Eval>
 *    item.price = baseItem.price;
 *    item.price += Math.floor(Random() * 100);
 *   </On Creation Eval>
 *   'item' 變數指的是正在製作的獨立物品。'baseItem' 是指物品的基礎物
 *   品。對“物品”所做的任何更改都將應用於獨立物品。
 *
 * ============================================================================
 * 瘋狂模式 - 自定義訊息視窗顯示
 * ============================================================================
 *
 * 如果您想在側面的訊息視窗中顯示獨特的自定義內容，可以使用以下註釋標籤：
 *
 *   <Info Text Top>
 *    text
 *    text
 *   </Info Text Top>
 *   在此處為物品訊息視窗輸入您希望輸入的額外訊息，無論是知識還是其他。
 *   可以使用文本代碼。此處的訊息顯示在訊息視窗的頂部。
 *
 *   <Info Text Bottom>
 *    text
 *    text
 *   </Info Text Bottom>
 *   在此處為物品訊息視窗輸入您希望輸入的額外訊息，無論是知識還是其他。
 *   可以使用文本代碼。此處的訊息顯示在訊息視窗的底部。
 *
 *   <Info Eval>
 *    var variableId = 1;
 *    var value = 500;
 *    $gameVariables.setValue(variableId, value);
 *   </Info Eval>
 *   如果您了解 JavaScript，您可以使用這些筆記標籤在顯示任何新訊息之前
 *   運行一些代碼。這樣，如果您計劃使用顯示變數值的文本代碼，可以在顯示
 *   它們之前運行一些代碼以同步物品訊息視窗中顯示的內容。
 *
 * ============================================================================
 * 獨立物品和遊戲中期筆記解析
 * ============================================================================
 *
 * 插件參數中的“Midgame Note Parsing”選項適用於任何可能只在遊戲中解析標籤
 * 而不是在遊戲加載時解析的插件。這是一個您應該自行承擔風險啟用的選項。
 *
 * 為什麼要自擔風險？ 因為啟用此選項意味著獨立物品將保留其筆記數據，因此，
 * 保存文件的文件大小將增加數倍，並且也會導致遊戲過程延遲。
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.30:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.29:
 * - Updated for RPG Maker MV version 1.6.0:
 *   Removal of the destructive code in Scene_Item.update function.
 *
 * Version 1.28:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.27:
 * - Compatibility update for future plugins.
 *
 * Version 1.26:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.25:
 * - Optimization Update
 *
 * Version 1.24a:
 * - Fixed a typo within the code. Please update Item Core, Item Disassemble,
 * Attachable Augments, and More Currencies if you are using those plugins.
 * - Random variance is now disabled from fresh plugin installation by default.
 *
 * Version 1.23:
 * - Fixed an issue custom info text when using different font sizes.
 *
 * Version 1.22:
 * - Fixed a removal bug that caused weapon and armor ID's to clash.
 *
 * Version 1.21:
 * - Fixed an error with sorting algorithm when items have the same base ID.
 *
 * Version 1.20:
 * - Added <On Creation Eval> Lunatic Mode notetag. Read the help file for more
 * information about it.
 *
 * Version 1.19:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.18a:
 * - Added 'Midgame Note Parsing' plugin parameter.
 * - Fixed a visual error with MP recovery displaying a 0 instead of ---.
 *
 * Version 1.17:
 * - Added <Text Color: x> notetag for items, weapons, and armors.
 *
 * Version 1.16:
 * - Fixed a bug that made mid-game actor initialization not display items
 * correctly in the item menu.
 *
 * Version 1.15:
 * - Fixed a bug with independent items getting values that crash the game.
 *
 * Version 1.14:
 * - Fixed an unintended function of the game not granting a piece of equipment
 * through events.
 *
 * Version 1.13:
 * - Fixed a bug that didn't unequip items properly.
 *
 * Version 1.12:
 * - Added 'Negative Variance' parameter.
 *
 * Version 1.11:
 * - Fixed a bug that caused random variance to not calculate correctly.
 * - Fixed a bug that didn't return the correct conditional branch results.
 * - Fixed the display in the shop window to show number of independent items
 * owned by the player rather than just 0.
 *
 * Version 1.10:
 * - Added Lunatic Mode - Custom Info Window Display.
 *
 * Version 1.09:
 * - Fixed a bug with evented item removal that didn't remove equipped items if
 * the 'Include Equipment' checkbox was checked.
 *
 * Version 1.08:
 * - Fixed a bug with the Control Variable event that would not gather the
 * right amount of independent items.
 *
 * Version 1.07:
 * - Fixed a bug with the Change Equipment event where armors wouldn't equip.
 *
 * Version 1.06:
 * - Fixed a bug and rewrote the initializing equipment process.
 *
 * Version 1.05:
 * - Compatibility update with ItemBook.
 *
 * Version 1.04:
 * - Added 'List Equipped Items' parameter to allow for equipment restricted
 * actors to be able to alt their equipment.
 *
 * Version 1.03:
 * - Fixed a bug where using events to remove independent items weren't working
 * properly and instead added more items.
 * - Fixed a bug where a Random Variance of 0 still gave random stats.
 *
 * Version 1.02:
 * - Fixed a bug where initializing equipment slots didn't work properly and/or
 * added incorrect equips from the wrong actors into the inventory.
 *
 * Version 1.01:
 * - Fixed bug where if you are using no independent pieces of equipment,
 * actors would fail to start with initial equipment.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ItemCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ItemMaxItems = Number(Yanfly.Parameters['Max Items']);
Yanfly.Param.ItemMaxWeapons = Number(Yanfly.Parameters['Max Weapons']);
Yanfly.Param.ItemMaxArmors = Number(Yanfly.Parameters['Max Armors']);
Yanfly.Param.ItemStartingId = Number(Yanfly.Parameters['Starting ID']);
Yanfly.Param.ItemRandomVariance = Number(Yanfly.Parameters['Random Variance']);
Yanfly.Param.ItemNegVar = eval(String(Yanfly.Parameters['Negative Variance']));
Yanfly.Param.ItemNameFmt = String(Yanfly.Parameters['Name Format']);
Yanfly.Param.ItemNameSpacing = String(Yanfly.Parameters['Name Spacing']);
Yanfly.Param.ItemBoostFmt = String(Yanfly.Parameters['Boost Format']);

Yanfly.Param.ItemSceneItem = String(Yanfly.Parameters['Updated Scene Item']);
Yanfly.Param.ItemSceneItem = eval(Yanfly.Param.ItemSceneItem);
Yanfly.Param.ItemShEquipped = String(Yanfly.Parameters['List Equipped Items']);
Yanfly.Param.ItemShEquipped = eval(Yanfly.Param.ItemShEquipped);
Yanfly.Param.ItemShowIcon = String(Yanfly.Parameters['Show Icon']);
Yanfly.Param.ItemShowIcon = eval(Yanfly.Param.ItemShowIcon);
Yanfly.Param.ItemIconSize = Number(Yanfly.Parameters['Icon Size']);
Yanfly.Param.ItemFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.ItemCmdAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.ItemRecoverFmt = String(Yanfly.Parameters['Recovery Format']);
Yanfly.Param.ItemAddState = String(Yanfly.Parameters['Add State']);
Yanfly.Param.ItemAddBuff = String(Yanfly.Parameters['Add Buff']);
Yanfly.Param.ItemRemoveState = String(Yanfly.Parameters['Remove State']);
Yanfly.Param.ItemRemoveBuff = String(Yanfly.Parameters['Remove Buff']);
Yanfly.Param.ItemMaxIcons = Number(Yanfly.Parameters['Maximum Icons']);
Yanfly.Param.ItemUseCmd = String(Yanfly.Parameters['Use Command']);
Yanfly.Param.ItemCarryFmt = String(Yanfly.Parameters['Carry Format']);

Yanfly.Param.ItemNoteParse = String(Yanfly.Parameters['Midgame Note Parsing']);
Yanfly.Param.ItemNoteParse = eval(Yanfly.Param.ItemNoteParse);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Item.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Item.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_ItemCore) {
    this.setDatabaseLengths();
    this.processItemCoreNotetags($dataItems);
    this.processItemCoreNotetags($dataWeapons);
    this.processItemCoreNotetags($dataArmors);
    Yanfly._loaded_YEP_ItemCore = true;
  }
  return true;
};

DataManager.processItemCoreNotetags = function(group) {
  var note1 = /<(?:RANDOM VARIANCE):[ ](\d+)>/i;
  var note2 = /<(?:NONINDEPENDENT ITEM|not independent item)>/i;
  var note3 = /<(?:PRIORITY NAME)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.randomVariance = Yanfly.Param.ItemRandomVariance;
    obj.textColor = 0;
    if (Imported.YEP_CoreEngine) obj.textColor = Yanfly.Param.ColorNormal;
    obj.nonIndependent = false;
    obj.setPriorityName = false;
    obj.infoEval = '';
    obj.infoTextTop = '';
    obj.infoTextBottom = '';
    obj.onCreationEval = '';
    var evalMode = 'none';

   for (var i = 0; i < notedata.length; i++) {
     var line = notedata[i];
     if (line.match(note1)) {
       obj.randomVariance = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.nonIndependent = true;
      } else if (line.match(note3)) {
        obj.setPriorityName = true;
      } else if (line.match(/<(?:INFO EVAL)>/i)) {
        evalMode = 'info eval';
      } else if (line.match(/<\/(?:INFO EVAL)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:INFO TEXT TOP)>/i)) {
        evalMode = 'info text top';
      } else if (line.match(/<\/(?:INFO TEXT TOP)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:INFO TEXT BOTTOM)>/i)) {
        evalMode = 'info text bottom';
      } else if (line.match(/<\/(?:INFO TEXT BOTTOM)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'info eval') {
        obj.infoEval = obj.infoEval + line + '\n';
      } else if (evalMode === 'info text top') {
        if (obj.infoTextTop !== '') obj.infoTextTop += '\n';
        obj.infoTextTop = obj.infoTextTop + line;
      } else if (evalMode === 'info text bottom') {
        if (obj.infoTextBottom !== '') obj.infoTextBottom += '\n';
        obj.infoTextBottom = obj.infoTextBottom + line;
      } else if (line.match(/<(?:TEXT COLOR):[ ](\d+)>/i)) {
        obj.textColor = parseInt(RegExp.$1);
      } else if (line.match(/<(?:ON CREATE EVAL|ON CREATION EVAL)>/i)) {
        evalMode = 'on create eval';
      } else if (line.match(/<\/(?:ON CREATE EVAL|ON CREATION EVAL)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'on create eval') {
        obj.onCreationEval = obj.onCreationEval + line + '\n';
      }
    }
  }
};

DataManager.setDatabaseLengths = function() {
    this._baseItemsLength   = $dataItems.length
    this._baseWeaponsLength = $dataWeapons.length
    this._baseArmorsLength  = $dataArmors.length
};

Yanfly.Item.DataManager_createGameObjects =
    DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Yanfly.Item.DataManager_createGameObjects.call(this);
    this.createIndependentObjects();
};

DataManager.createIndependentObjects = function() {
    DataManager.createIndependentGroups();
    this.loadIndependentItems();
};

DataManager.loadIndependentItems = function() {
    if (Yanfly.Param.ItemMaxItems > 0) {
      var difItems = $dataItems.length - DataManager._baseItemsLength;
      $dataItems.splice(DataManager._baseItemsLength, difItems);
      this.setIndependentLength($dataItems);
      $dataItems = $dataItems.concat(this._independentItems);
    }
    if (Yanfly.Param.ItemMaxWeapons > 0) {
      var difWeapons = $dataWeapons.length - DataManager._baseWeaponsLength;
      $dataWeapons.splice(DataManager._baseWeaponsLength, difWeapons);
      this.setIndependentLength($dataWeapons);
      $dataWeapons = $dataWeapons.concat(this._independentWeapons);
    }
    if (Yanfly.Param.ItemMaxArmors > 0) {
      var difArmors = $dataArmors.length - DataManager._baseArmorsLength;
      $dataArmors.splice(DataManager._baseArmorsLength, difArmors);
      this.setIndependentLength($dataArmors);
      $dataArmors = $dataArmors.concat(this._independentArmors);
    }
};

DataManager.setIndependentLength = function(group) {
    for (;;) {
      if (group.length > Yanfly.Param.ItemStartingId) break;
      group.push(null);
    }
};

DataManager.saveGameWithoutRescue = function(savefileId) {
    var json = JsonEx.stringify(this.makeSaveContents());
    StorageManager.save(savefileId, json);
    this._lastAccessedId = savefileId;
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};

Yanfly.Item.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = Yanfly.Item.DataManager_makeSaveContents.call(this);
    contents.items = this._independentItems;
    contents.weapons = this._independentWeapons;
    contents.armors = this._independentArmors;
    return contents;
};

Yanfly.Item.DataManager_extractSaveContents =
    DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Yanfly.Item.DataManager_extractSaveContents.call(this, contents);
    this._independentItems = contents.items || [];
    this._independentWeapons = contents.weapons || [];
    this._independentArmors = contents.armors || [];
    this.loadIndependentItems();
};

DataManager.createIndependentGroups = function() {
    this._independentItems = [];
    this._independentWeapons = [];
    this._independentArmors = [];
};

DataManager.isIndependent = function(item) {
    if (!item) return false;
    if (DataManager.isBattleTest()) return false;
    if (item.nonIndependent) return false;
    if (DataManager.isItem(item)) return Yanfly.Param.ItemMaxItems > 0;
    if (DataManager.isWeapon(item)) return Yanfly.Param.ItemMaxWeapons > 0;
    if (DataManager.isArmor(item)) return Yanfly.Param.ItemMaxArmors > 0;
    return false;
};

DataManager.registerNewItem = function(item) {
    if (!this.isNewItemValid(item)) return item;
    var newItem = JsonEx.makeDeepCopy(item);
    this.addNewIndependentItem(item, newItem);
    return newItem;
};

DataManager.isNewItemValid = function(item) {
    if (!item) return false;
    if (item.baseItemId) return false;
    return item.id === this.getDatabase(item).indexOf(item);
};

DataManager.addNewIndependentItem = function(baseItem, newItem) {
    newItem.id = this.getDatabase(baseItem).length;
    ItemManager.setNewIndependentItem(baseItem, newItem);
    ItemManager.customizeNewIndependentItem(baseItem, newItem);
    ItemManager.onCreationEval(baseItem, newItem);
    this.getDatabase(baseItem).push(newItem);
    this.getContainer(baseItem).push(newItem);
};

DataManager.removeIndependentItem = function(item) {
    if (!item) return;
    if (this.independentItemIsUsed(item)) return;
    var container = this.getContainer(item);
    var database = this.getDatabase(item);
    var index = container.indexOf(item);
    container[index] = null;
    var index = database.indexOf(item);
    database[index] = null;
};

DataManager.independentItemIsUsed = function(item) {
    if ($gameParty.numItems(item) > 0) return false;
    for (var i = 0; i < $dataActors.length; ++i) {
      var actor = $gameActors.actor(i);
      if (!actor) continue;
      if (actor.equips().contains(item)) return true;
    }
    return false;
};

DataManager.getDatabase = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return $dataItems;
    if (DataManager.isWeapon(item)) return $dataWeapons;
    if (DataManager.isArmor(item)) return $dataArmors;
    return [];
};

DataManager.getContainer = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return this._independentItems;
    if (DataManager.isWeapon(item)) return this._independentWeapons;
    if (DataManager.isArmor(item)) return this._independentArmors;
    return [];
};

DataManager.getBaseItem = function(item) {
    if (!this.isIndependent(item)) return item;
    if (!item.baseItemId) return item;
    var baseItemId = item.baseItemId;
    var baseItem = this.getDatabase(item)[baseItemId];
    return baseItem;
};

//=============================================================================
// ItemManager
//=============================================================================

function ItemManager() {
    throw new Error('This is a static class');
};

ItemManager.setNewIndependentItem = function(baseItem, newItem) {
    newItem.baseItemId = baseItem.id;
    newItem.baseItemName = baseItem.name;
    newItem.baseItemPrice = baseItem.price;
    newItem.baseItemIconIndex = baseItem.iconIndex;
    newItem.namePrefix = '';
    newItem.nameSuffix = '';
    if (baseItem.setPriorityName) {
      newItem.priorityName = baseItem.name;
    } else {
      newItem.priorityName = '';
    }
    newItem.boostCount = 0;
    if (!Yanfly.Param.ItemNoteParse) newItem.note = '';
};

ItemManager.customizeNewIndependentItem = function(baseItem, newItem) {
    this.randomizeInitialItem(baseItem, newItem);
    this.updateItemName(newItem);
};

ItemManager.randomizeInitialItem = function(baseItem, newItem) {
    if ($gameTemp.varianceStock()) return;
    if (DataManager.isItem(baseItem)) {
      this.randomizeInitialEffects(baseItem, newItem);
    } else {
      this.randomizeInitialStats(baseItem, newItem);
    }
};

ItemManager.randomizeInitialEffects = function(baseItem, newItem) {
    if (baseItem.randomVariance <= 0) return;
    var randomValue = baseItem.randomVariance * 2 + 1;
    var offset = baseItem.randomVariance;
    newItem.effects.forEach(function(effect) {
      if (effect.code === Game_Action.EFFECT_RECOVER_HP) {
        if (effect.value1 !== 0) {
          var boost = Math.floor(Math.random() * randomValue - offset);
          effect.value1 += boost * 0.01;
          effect.value1 = parseFloat(effect.value1.toFixed(2));
          effect.value1 = effect.value1.clamp(0, 1);
        }
        if (effect.value2 !== 0) {
          effect.value2 += Math.floor(Math.random() * randomValue - offset);
        }
      }
      if (effect.code === Game_Action.EFFECT_RECOVER_MP) {
        if (effect.value1 !== 0) {
          var boost = Math.floor(Math.random() * randomValue - offset);
          effect.value1 += boost * 0.01;
          effect.value1 = parseFloat(effect.value1.toFixed(2));
          effect.value1 = effect.value1.clamp(0, 1);
        }
        if (effect.value2 !== 0) {
          effect.value2 += Math.floor(Math.random() * randomValue - offset);
        }
      }
    }, this);
};

ItemManager.randomizeInitialStats = function(baseItem, newItem) {
    if (baseItem.randomVariance <= 0) return;
    var randomValue = baseItem.randomVariance * 2 + 1;
    var offset = baseItem.randomVariance;
    for (var i = 0; i < 8; ++i) {
      if (newItem.params[i] === 0) continue;
      newItem.params[i] += Math.floor(Math.random() * randomValue - offset);
      if (!Yanfly.Param.ItemNegVar && baseItem.params[i] >= 0) {
        newItem.params[i] = Math.max(newItem.params[i], 0);
      }
    }
};

ItemManager.setBaseName = function(item, value) {
    item.baseItemName = value;
};

ItemManager.setNamePrefix = function(item, value) {
    item.namePrefix = value;
    if (eval(Yanfly.Param.ItemNameSpacing) && item.namePrefix.length > 0) {
      item.namePrefix = item.namePrefix + ' ';
    }
};

ItemManager.setNameSuffix = function(item, value) {
    item.nameSuffix = value;
    if (eval(Yanfly.Param.ItemNameSpacing) && item.nameSuffix.length > 0) {
      item.nameSuffix = ' ' + item.nameSuffix;
    }
};

ItemManager.setPriorityName = function(item, value) {
    item.priorityName = value;
};

ItemManager.updateItemName = function(item) {
    if (item.priorityName && item.priorityName.length > 0) {
      item.name = item.priorityName;
      return;
    }
    var prefix = item.namePrefix || '';
    var baseName = item.baseItemName || '';
    var suffix = item.nameSuffix || '';
    var boostCount = item.boostCount || 0;
    var fmt = Yanfly.Param.ItemBoostFmt;
    var boostText = fmt.format(Yanfly.Util.toGroup(boostCount))
    if (boostText === fmt.format(0)) {
      boostText = '';
    } else if (eval(Yanfly.Param.ItemNameSpacing)) {
      boostText = ' ' + boostText;
    }
    fmt = Yanfly.Param.ItemNameFmt;
    item.name = fmt.format(prefix, baseName, suffix, boostText);
};

ItemManager.increaseItemBoostCount = function(item, value) {
    value = value || 1;
    if (!item.boostCount) item.boostCount = 0;
    item.boostCount += value;
    this.updateItemName(item);
};

ItemManager.onCreationEval = function(baseItem, newItem) {
    var item = newItem;
    if (item.onCreationEval === '') return;
    var weapon = item;
    var armor = item;
    var baseWeapon = baseItem;
    var baseArmor = baseItem;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.onCreationEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ITEM CREATION CUSTOM CODE ERROR');
    }
    item.onCreationEval = '';
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.enableVarianceStock = function() {
    this._independentStock = true;
};

Game_Temp.prototype.disableVarianceStock = function() {
    this._independentStock = false;
};

Game_Temp.prototype.varianceStock = function() {
    return this._independentStock;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Item.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Item.Game_Actor_setup.call(this, actorId);
    if ($gameTemp._initializeStartingMemberEquipment) return;
    this.initIndependentEquips($dataActors[actorId].equips);
};

Game_Actor.prototype.initIndependentEquips = function(equips) {
    var equips = this.convertInitEquips(equips);
    this.equipInitIndependentEquips(equips);
    this.releaseUnequippableItems(true);
    this.recoverAll();
    this.refresh();
};

Game_Actor.prototype.convertInitEquips = function(equips) {
    var items = [];
    for (var i = 0; i < equips.length; ++i) {
      var equipId = equips[i];
      if (equipId <= 0) continue;
      var equipType = $dataSystem.equipTypes[i + 1];
      if (equipType === $dataSystem.equipTypes[1] ||
      (i === 1 && this.isDualWield())) {
        var equip = $dataWeapons[equipId];
      } else {
        var equip = $dataArmors[equipId];
      }
      items.push(equip);
    }
    return items;
};

Game_Actor.prototype.equipInitIndependentEquips = function(equips) {
    var slots = this.equipSlots();
    var maxSlots = slots.length;
    this._equips = [];
    for (var i = 0; i < maxSlots; ++i) {
      this._equips[i] = new Game_Item();
    }
    for (var i = 0; i < maxSlots; ++i) {
      var slotType = slots[i];
      var equip = this.grabInitEquips(equips, slotType);
      if (DataManager.isIndependent(equip) && this.canEquip(equip)) {
        var array = $gameParty.gainIndependentItem(equip, 1)
        if (array instanceof Array) {
          newItem = array[0];
          this.changeEquip(i, newItem);
        }
      } else if (this.canEquip(equip)) {
        this._equips[i].setObject(equip);
      }
    }
};

Game_Actor.prototype.grabInitEquips = function(equips, slotType) {
    var item = null;
    for (var i = 0; i < equips.length; ++i) {
      var equip = equips[i];
      if (!equip) continue;
      if (slotType === 1 && DataManager.isWeapon(equip)) {
        item = equip;
        break;
      } else if (equip.etypeId === slotType) {
        item = equip;
        break;
      }
    }
    if (item) equips[i] = null;
    return item;
};

Yanfly.Item.Game_Actor_hasWeapon = Game_Actor.prototype.hasWeapon;
Game_Actor.prototype.hasWeapon = function(weapon) {
    if (this.hasBaseItem(weapon)) return true;
    return Yanfly.Item.Game_Actor_hasWeapon.call(this, weapon);
};

Yanfly.Item.Game_Actor_hasArmor = Game_Actor.prototype.hasArmor;
Game_Actor.prototype.hasArmor = function(armor) {
    if (this.hasBaseItem(armor)) return true;
    return Yanfly.Item.Game_Actor_hasArmor.call(this, armor);
};

Game_Actor.prototype.hasBaseItem = function(baseItem) {
    if (!DataManager.isIndependent(baseItem)) return false;
    var type = (DataManager.isWeapon(baseItem)) ? 'weapon' : 'armor';
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (!equip.baseItemId) continue;
      if (DataManager.isWeapon(equip) && type === 'weapon') {
        if (equip.baseItemId === baseItem.id) return true;
      } else if (DataManager.isArmor(equip) && type === 'armor') {
        if (equip.baseItemId === baseItem.id) return true;
      }
    }
    return false;
};

Yanfly.Item.Game_Actor_changeEquipById = Game_Actor.prototype.changeEquipById;
Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    if (itemId > 0) {
      var slotId = etypeId - 1;
      if (this.equipSlots()[slotId] === 1) {
        var baseItem = $dataWeapons[itemId];
      } else {
        var baseItem = $dataArmors[itemId];
      }
      if (!$gameParty.hasItem(baseItem)) {
        $gameParty.gainItem(baseItem, 1);
      }
      if (DataManager.isIndependent(baseItem)) {
        if (this.hasBaseItem(baseItem)) return;
        var item = $gameParty.getMatchingBaseItem(baseItem, false);
        if (item === null) {
          $gameTemp.enableVarianceStock();
          $gameParty.gainItem(baseItem, 1);
          $gameTemp.disableVarianceStock();
          item = $gameParty.getMatchingBaseItem(baseItem, false);
        }
        this.changeEquip(slotId, item);
        return;
      }
    }
    Yanfly.Item.Game_Actor_changeEquipById.call(this, etypeId, itemId)
};

Game_Actor.prototype.unequipItem = function(item) {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip !== item) continue;
      this.changeEquip(i, null);
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.Item.Game_Party_setupStartingMembers =
    Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    Yanfly.Item.Game_Party_setupStartingMembers.call(this);
    $gameTemp.enableVarianceStock();
    this.initActorEquips();
    $gameTemp.disableVarianceStock();
};

Game_Party.prototype.initActorEquips = function() {
    $gameTemp._initializeStartingMemberEquipment = true;
    for (var i = 0; i < $dataActors.length; ++i) {
      var actor = $gameActors.actor(i);
      if (actor) {
        var baseActor = $dataActors[i];
        actor.initIndependentEquips(baseActor.equips);
      }
    }
    $gameTemp._initializeStartingMemberEquipment = undefined;
};

Yanfly.Item.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if (DataManager.isIndependent(item)) {
      this.gainIndependentItem(item, amount, includeEquip);
    } else {
      Yanfly.Item.Game_Party_gainItem.call(this, item, amount, includeEquip);
    }
};

Game_Party.prototype.gainIndependentItem = function(item, amount, includeEquip) {
    var arr = [];
    if (amount > 0) {
      for (var i = 0; i < amount; ++i) {
        var newItem = DataManager.registerNewItem(item);
        this.registerNewItem(item, newItem);
        arr.push(newItem);
      }
    } else if (amount < 0) {
      amount = Math.abs(amount);
      for (var i = 0; i < amount; ++i) {
        if (item.baseItemId) {
          this.removeIndependentItem(item, includeEquip);
        } else if (DataManager.isIndependent(item)) {
          var target = $gameParty.getMatchingBaseItem(item, includeEquip);
          if (target !== null) this.removeIndependentItem(target, includeEquip);
        } else {
          this.removeBaseItem(item, includeEquip);
        }
      }
    }
    return arr;
};

Game_Party.prototype.getIndependentItemTypeMax = function(item) {
    if (!item) return 0;
    if (DataManager.isItem(item)) return Yanfly.Param.ItemMaxItems;
    if (DataManager.isWeapon(item)) return Yanfly.Param.ItemMaxWeapons;
    if (DataManager.isArmor(item)) return Yanfly.Param.ItemMaxArmors;
};

Game_Party.prototype.getIndependentItemTypeCur = function(item) {
    if (!item) return 0;
    if (DataManager.isItem(item)) return this.items().length;
    if (DataManager.isWeapon(item)) return this.weapons().length;
    if (DataManager.isArmor(item)) return this.armors().length;
};

Game_Party.prototype.registerNewItem = function(baseItem, newItem) {
    var container = this.itemContainer(baseItem);
    if (container) {
      var lastNumber = this.numItems(newItem);
      container[newItem.id] = 1;
    }
};

Game_Party.prototype.removeIndependentItem = function(item, includeEquip) {
    if (includeEquip && this.checkItemIsEquipped(item)) {
      for (var i = 1; i < $gameActors._data.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (!actor.equips().contains(item)) continue;
        actor.unequipItem(item);
      }
    }
    var container = this.itemContainer(item);
    container[item.id] = 0;
    if (container[item.id] <= 0) delete container[item.id];

};

Game_Party.prototype.removeBaseItem = function(item, includeEquip) {
    var container = this.itemContainer(item);
    container[item.id]--;
    if (container[item.id] <= 0) delete container[item.id];
    if (includeEquip) this.discardMembersEquip(item, -1);
};

Game_Party.prototype.getMatchingBaseItem = function(baseItem, equipped) {
    if (!baseItem) return null;
    if (DataManager.isItem(baseItem)) var group = this.items();
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    if (equipped) {
      for (var a = 0; a < this.members().length; ++a) {
        var actor = this.members()[a];
        if (!actor) continue;
        if (DataManager.isWeapon(baseItem)) {
          group = group.concat(actor.weapons());
        } else if (DataManager.isArmor(baseItem)) {
          group = group.concat(actor.armors());
        }
      }
    }
    var baseItemId = baseItem.id;
    for (var i = 0; i < group.length; ++i) {
      var item = group[i];
      if (!item) continue;
      if (!item.baseItemId) continue;
      if (item.baseItemId !== baseItemId) continue;
      return item;
    }
    return null;
};

Game_Party.prototype.checkItemIsEquipped = function(item) {
    for (var i = 1; i < $gameActors._data.length; ++i) {
      var actor = $gameActors.actor(i);
      if (!actor) continue;
      if (actor.equips().contains(item)) return true;
    }
    return false;
};

Yanfly.Item.Game_Party_items = Game_Party.prototype.items;
Game_Party.prototype.items = function() {
    var results = Yanfly.Item.Game_Party_items.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Yanfly.Item.Game_Party_weapons = Game_Party.prototype.weapons;
Game_Party.prototype.weapons = function() {
    var results = Yanfly.Item.Game_Party_weapons.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Yanfly.Item.Game_Party_armors = Game_Party.prototype.armors;
Game_Party.prototype.armors = function() {
    var results = Yanfly.Item.Game_Party_armors.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Game_Party.prototype.independentItemSort = function(a, b) {
    var aa = (a.baseItemId) ? a.baseItemId : a.id;
    var bb = (b.baseItemId) ? b.baseItemId : b.id;
    if (aa < bb) return -1;
    if (aa >= bb) return 1;
    return 0;
};

Yanfly.Item.Game_Party_maxItems = Game_Party.prototype.maxItems;
Game_Party.prototype.maxItems = function(item) {
    if (DataManager.isIndependent(item)) return 1;
    return Yanfly.Item.Game_Party_maxItems.call(this, item);
};

Yanfly.Item.Game_Party_hasItem = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem = function(item, includeEquip) {
    if (DataManager.isIndependent(item)) {
      if (this.numIndependentItems(item) > 0) return true;
    }
    return Yanfly.Item.Game_Party_hasItem.call(this, item, includeEquip);
};

Yanfly.Item.Game_Party_isAnyMemberEquipped =
    Game_Party.prototype.isAnyMemberEquipped;
Game_Party.prototype.isAnyMemberEquipped = function(item) {
    if (DataManager.isIndependent(item)) {
      for (var i = 0; i < this.members().length; ++i) {
        var actor = this.members()[i];
        if (!actor) continue;
        if (actor.hasBaseItem(item)) return true;
      }
    }
    return Yanfly.Item.Game_Party_isAnyMemberEquipped.call(this, item);
};

Game_Party.prototype.numIndependentItems = function(baseItem) {
    var value = 0;
    if (!DataManager.isIndependent(baseItem)) return this.numItems(baseItem);
    var id = baseItem.id;
    if (DataManager.isItem(baseItem)) var group = this.items();
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    for (var i = 0; i < group.length; ++i) {
      var item = group[i];
      if (!item) continue;
      if (item.baseItemId && item.baseItemId === id) value += 1;
    }
    return value;
};

Game_Party.prototype.clearAllMatchingBaseItems = function(baseItem, equipped) {
  if (!Imported.YEP_ItemCore) return;
  for (;;) {
    var item = this.getMatchingBaseItem(baseItem, equipped);
    if (item) {
      this.removeIndependentItem(item, equipped);
      DataManager.removeIndependentItem(item);
    } else {
      break;
    }
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Item.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Item.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'EnableVarianceStock') $gameTemp.enableVarianceStock();
    if (command === 'DisableVarianceStock') $gameTemp.disableVarianceStock();
};

Yanfly.Item.Game_Interpreter_gDO = Game_Interpreter.prototype.gameDataOperand;
Game_Interpreter.prototype.gameDataOperand = function(type, param1, param2) {
  switch (type) {
  case 0:
    return $gameParty.numIndependentItems($dataItems[param1]);
    break;
  case 1:
    return $gameParty.numIndependentItems($dataWeapons[param1]);
    break;
  case 2:
    return $gameParty.numIndependentItems($dataArmors[param1]);
    break;
  default:
    return Yanfly.Item.Game_Interpreter_gDO.call(this, type, param1, param2);
    break;
  }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Item.Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, wx, wy, ww) {
    ww = ww || 312;
    this.setItemTextColor(item);
    Yanfly.Item.Window_Base_drawItemName.call(this, item, wx, wy, ww);
    this._resetTextColor = undefined;
    this.resetTextColor();
};

Window_Base.prototype.setItemTextColor = function(item) {
    if (!item) return;
    if (item.textColor === undefined) return;
    this._resetTextColor = item.textColor;
};

Yanfly.Item.Window_Base_normalColor = Window_Base.prototype.normalColor;
Window_Base.prototype.normalColor = function() {
    if (this._resetTextColor !== undefined) {
      return this.textColor(this._resetTextColor);
    }
    return Yanfly.Item.Window_Base_normalColor.call(this);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.Item.Window_ItemList_makeItemList =
    Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function() {
    Yanfly.Item.Window_ItemList_makeItemList.call(this);
    if (SceneManager._scene instanceof Scene_Item) this.listEquippedItems();
};

Window_ItemList.prototype.listEquippedItems = function() {
    if (!Yanfly.Param.ItemShEquipped) return;
    var results = [];
    for (var a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      for (var i = 0; i < actor.equips().length; ++i) {
        var equip = actor.equips()[i];
        if (!equip) continue;
        if (!equip.baseItemId) continue;
        if (this.includes(equip)) results.push(equip);
      }
    }
    this._data = results.concat(this._data);
};

Yanfly.Item.Window_ItemList_drawItemNumber =
    Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, dx, dy, dw) {
    if (DataManager.isIndependent(item)) {
      this.drawItemCarryNumber(item, dx, dy, dw);
      return;
    }
    Yanfly.Item.Window_ItemList_drawItemNumber.call(this, item, dx, dy, dw);
};

Window_ItemList.prototype.drawItemCarryNumber = function(item, dx, dy, dw) {
    if (DataManager.isItem(item)) {
      var index = $gameParty.items().indexOf(item);
    } else if (DataManager.isWeapon(item)) {
      var index = $gameParty.weapons().indexOf(item);
    } else if (DataManager.isArmor(item)) {
      var index = $gameParty.armors().indexOf(item);
    }
    if (index < 0) return this.drawEquippedActor(item, dx, dy, dw);
    index += 1;
    var max = $gameParty.getIndependentItemTypeMax(item);
    var fmt = Yanfly.Param.ItemCarryFmt;
    var text = fmt.format(Yanfly.Util.toGroup(index), Yanfly.Util.toGroup(max));
    if (Yanfly.Param.ItemQuantitySize) {
      this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    }
    if (index > max) {
      this.changeTextColor(this.powerDownColor());
    } else if (index === max) {
      this.changeTextColor(this.crisisColor());
    } else {
      this.changeTextColor(this.normalColor());
    }
    this.drawText(text, dx, dy, dw, 'right');
    this.resetFontSettings();
};

Window_ItemList.prototype.drawEquippedActor = function(item, dx, dy, dw) {
    var carrier = null;
    for (var a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      if (actor.equips().contains(item)) carrier = actor;
    };
    if (Yanfly.Param.ItemQuantitySize) {
      this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    }
    var text = carrier.name();
    this.drawText(text, dx, dy, dw, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_EquipItem
//=============================================================================

Yanfly.Item.Window_EquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
    if (this._actor && item !== null) {
      if (!item) return false;
    }
    return Yanfly.Item.Window_EquipItem_includes.call(this, item);
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Yanfly.Item.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
    if (DataManager.isIndependent(item)) {
      var typeMax = $gameParty.getIndependentItemTypeMax(item);
      var typeCur = $gameParty.getIndependentItemTypeCur(item);
      if (typeCur >= typeMax) return false;
    }
    return Yanfly.Item.Window_ShopBuy_isEnabled.call(this, item);
};

//=============================================================================
// Window_ShopStatus
//=============================================================================

Yanfly.Item.Window_ShopStatus_drawPossession =
    Window_ShopStatus.prototype.drawPossession;
Window_ShopStatus.prototype.drawPossession = function(x, y) {
    if (DataManager.isIndependent(this._item)) {
      return this.drawIndependentPossession(x, y);
    }
    Yanfly.Item.Window_ShopStatus_drawPossession.call(this, x, y);
};

Window_ShopStatus.prototype.drawIndependentPossession = function(x, y) {
    var width = this.contents.width - this.textPadding() - x;
    var baseItem = DataManager.getBaseItem(this._item);
    var value = $gameParty.numIndependentItems(baseItem);
    value = Yanfly.Util.toGroup(value);
    var possessionWidth = this.textWidth(value);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.possession, x, y, width - possessionWidth);
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
};

//=============================================================================
// Scene_Equip
//=============================================================================

Yanfly.Item.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
    this.actor().releaseUnequippableItems();
    Yanfly.Item.Scene_Equip_refreshActor.call(this);
};

//=============================================================================
// Scene_Shop
//=============================================================================

Yanfly.Item.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    $gameTemp.enableVarianceStock();
    Yanfly.Item.Scene_Shop_doBuy.call(this, number);
    $gameTemp.disableVarianceStock();
};

Yanfly.Item.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    Yanfly.Item.Scene_Shop_doSell.call(this, number);
    if (!DataManager.isIndependent(this._item)) return;
    DataManager.removeIndependentItem(this._item);
};

//=============================================================================
// Scene_Item 1.6.0 Code Suppress
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") {

Scene_Item.prototype.update = function() {
  Scene_ItemBase.prototype.update.call(this);
};

}; // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0"

//=============================================================================
// Scene_Item Update
//=============================================================================

if (Yanfly.Param.ItemSceneItem) {

//=============================================================================
// Window_ItemCategory
//=============================================================================

Yanfly.Item.Window_ItemCategory_windowWidth =
    Window_ItemCategory.prototype.windowWidth;
Window_ItemCategory.prototype.windowWidth = function() {
    if (SceneManager._scene instanceof Scene_Item) return 240;
    return Yanfly.Item.Window_ItemCategory_windowWidth.call(this);
};

Yanfly.Item.Window_ItemCategory_numVisibleRows =
    Window_ItemCategory.prototype.numVisibleRows;
Window_ItemCategory.prototype.numVisibleRows = function() {
    if (SceneManager._scene instanceof Scene_Item) return 4;
    return Yanfly.Item.Window_ItemCategory_numVisibleRows.call(this);
};

Yanfly.Item.Window_ItemCategory_maxCols = Window_ItemCategory.prototype.maxCols;
Window_ItemCategory.prototype.maxCols = function() {
    if (SceneManager._scene instanceof Scene_Item) return 1;
    return Yanfly.Item.Window_ItemCategory_maxCols.call(this);
};

Yanfly.Item.Window_ItemCategory_itemTextAlign =
    Window_ItemCategory.prototype.itemTextAlign;
Window_ItemCategory.prototype.itemTextAlign = function() {
    if (SceneManager._scene instanceof Scene_Item) {
      return Yanfly.Param.ItemCmdAlign;
    }
    return Yanfly.Item.Window_ItemCategory_itemTextAlign.call(this);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.Item.Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(x, y, width, height) {
    if (SceneManager._scene instanceof Scene_Item) {
      width = Graphics.boxWidth / 2;
    }
    Yanfly.Item.Window_ItemList_initialize.call(this, x, y, width, height);
};

Yanfly.Item.Window_ItemList_maxCols = Window_ItemList.prototype.maxCols;
Window_ItemList.prototype.maxCols = function() {
    if (SceneManager._scene instanceof Scene_Item) return 1;
    return Yanfly.Item.Window_ItemList_maxCols.call(this);
};

Yanfly.Item.Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
    if (!item) return false;
    if (SceneManager._scene instanceof Scene_Item) return true;
    return Yanfly.Item.Window_ItemList_isEnabled.call(this, item);
};

Window_ItemList.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.update();
};

Window_ItemList.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
    this.update();
};

Yanfly.Item.Window_ItemList_updateHelp = Window_ItemList.prototype.updateHelp;
Window_ItemList.prototype.updateHelp = function() {
    Yanfly.Item.Window_ItemList_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Item && this._statusWindow) {
      this._statusWindow.setItem(this.item());
    }
    if (SceneManager._scene instanceof Scene_Item && this._infoWindow) {
      this._infoWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_ItemStatus
//=============================================================================

function Window_ItemStatus() {
    this.initialize.apply(this, arguments);
}

Window_ItemStatus.prototype = Object.create(Window_Base.prototype);
Window_ItemStatus.prototype.constructor = Window_ItemStatus;

Window_ItemStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.deactivate();
    this.refresh();
};

Window_ItemStatus.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_ItemStatus.prototype.refresh = function() {
    this.contents.clear();
    this.drawDarkRectEntries();
    if (!this._item) return;
    this.contents.fontSize = Yanfly.Param.ItemFontSize;
    this.drawItemEntry();
};

Window_ItemStatus.prototype.drawDarkRectEntries = function() {
    var rect = new Rectangle();
    if (Yanfly.Param.ItemShowIcon) {
      rect.width = Window_Base._faceWidth;
      rect.height = Window_Base._faceHeight;
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
      rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
    } else {
      rect.width = this.contents.width / 2;
    }
    rect.height = this.lineHeight();
    for (var i = 0; i < 8; ++i) {
      rect = this.getRectPosition(rect, i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_ItemStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ItemStatus.prototype.getRectPosition = function(rect, i) {
    if (i % 2 === 0) {
      if (Yanfly.Param.ItemShowIcon) {
        rect.x = Window_Base._faceWidth;
      } else {
        rect.x = 0;
      }
      rect.y = i / 2 * this.lineHeight();
    } else {
      if (Yanfly.Param.ItemShowIcon) {
        rect.x = Window_Base._faceWidth + rect.width;
      } else {
        rect.x = rect.width;
      }
    }
    return rect;
};

Window_ItemStatus.prototype.drawItemEntry = function() {
    var item = this._item;
    if (Yanfly.Param.ItemShowIcon) this.drawItemIcon(item);
    if (DataManager.isItem(item)) this.drawItemInfo(item);
    if (DataManager.isWeapon(item)) this.drawEquipInfo(item);
    if (DataManager.isArmor(item)) this.drawEquipInfo(item);
};

Window_ItemStatus.prototype.drawItemIcon = function() {
    this.drawLargeIcon();
};

Window_ItemStatus.prototype.drawLargeIcon = function() {
    var iconIndex = this._item.iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var dw = Yanfly.Param.ItemIconSize;
    var dh = Yanfly.Param.ItemIconSize;
    var dx = (Window_Base._faceWidth - dw) / 2;
    var dy = (Window_Base._faceHeight - dh) / 2;
    this.contents._context.imageSmoothingEnabled = false;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
    this.contents._context.imageSmoothingEnabled = true;
};

Window_ItemStatus.prototype.drawEquipInfo = function(item) {
    var rect = new Rectangle();
    if (eval(Yanfly.Param.ItemShowIcon)) {
      rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
    } else {
      rect.width = this.contents.width / 2;
    }
    for (var i = 0; i < 8; ++i) {
      rect = this.getRectPosition(rect, i);
      var dx = rect.x + this.textPadding();
      var dw = rect.width - this.textPadding() * 2;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(i), dx, rect.y, dw);
      this.changeTextColor(this.paramchangeTextColor(item.params[i]));
      var text = Yanfly.Util.toGroup(item.params[i]);
      if (item.params[i] >= 0) text = '+' + text;
      if (text === '+0') this.changePaintOpacity(false);
      this.drawText(text, dx, rect.y, dw, 'right');
      this.changePaintOpacity(true);
    }
};

Window_ItemStatus.prototype.drawItemInfo = function(item) {
    var rect = new Rectangle();
    if (eval(Yanfly.Param.ItemShowIcon)) {
      rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
    } else {
      rect.width = this.contents.width / 2;
    }
    for (var i = 0; i < 8; ++i) {
      rect = this.getRectPosition(rect, i);
      var dx = rect.x + this.textPadding();
      var dw = rect.width - this.textPadding() * 2;
      this.changeTextColor(this.systemColor());
      var text = this.getItemInfoCategory(i);
      this.drawText(text, dx, rect.y, dw);
      this.drawItemData(i, dx, rect.y, dw);
    }
};

Window_ItemStatus.prototype.getItemInfoCategory = function(i) {
    var fmt = Yanfly.Param.ItemRecoverFmt;
    if (i === 0) return fmt.format(TextManager.param(0));
    if (i === 1) return fmt.format(TextManager.hp);
    if (i === 2) return fmt.format(TextManager.param(1));
    if (i === 3) return fmt.format(TextManager.mp);
    if (i === 4) return Yanfly.Param.ItemAddState;
    if (i === 5) return Yanfly.Param.ItemRemoveState;
    if (i === 6) return Yanfly.Param.ItemAddBuff;
    if (i === 7) return Yanfly.Param.ItemRemoveBuff;
    return '';
};

Window_ItemStatus.prototype.drawItemData = function(i, dx, dy, dw) {
    if (!this._item) return;
    var effect;
    var value = '---';
    var pre = '';
    var text = '';
    var icons = [];
    if (i === 0) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_HP);
      value = (effect) ? effect.value1 : '---';
      if (value === 0) value = '---';
      if (value !== '---' && value !== 0) value *= 100;
    }
    if (i === 1) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_HP);
      value = (effect) ? effect.value2 : '---';
      if (value === 0) value = '---';
    }
    if (i === 2) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_MP);
      value = (effect) ? effect.value1 : '---';
      if (value === 0) value = '---';
      if (value !== '---' && value !== 0) value *= 100;
    }
    if (i === 3) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_MP);
      value = (effect) ? effect.value2 : '---';
      if (value === 0) value = '---';
    }
    if (i >= 4) {
      icons = this.getItemIcons(i, icons);
    }
    this.changeTextColor(this.normalColor());
    if (value === '---') {
      this.changePaintOpacity(false);
    } else if (i < 4) {
      if (value > 0) pre = '+';
      value = Yanfly.Util.toGroup(parseInt(value));
      if ([0, 2].contains(i)) text = '%';
    }
    if (icons.length > 0) {
      this.changePaintOpacity(true);
      dx = dx + dw - icons.length * Window_Base._iconWidth;
      dx += this.textPadding() - 2;
      for (var j = 0; j < icons.length; ++j) {
        var icon = icons[j];
        this.drawIcon(icon, dx, dy + 2);
        dx += Window_Base._iconWidth;
      }
    } else {
      text = pre + value + text;
      this.drawText(text, dx, dy, dw, 'right');
      this.changePaintOpacity(true);
    }
};

Window_ItemStatus.prototype.getEffect = function(code) {
    var targetEffect;
    this._item.effects.forEach(function(effect) {
      if (effect.code === code) targetEffect = effect;
    }, this);
    return targetEffect;
};

Window_ItemStatus.prototype.getItemIcons = function(i, array) {
    this._item.effects.forEach(function(effect) {
      if (i === 4 && effect.code === Game_Action.EFFECT_ADD_STATE) {
        var state = $dataStates[effect.dataId];
        if (state && state.iconIndex !== 0) array.push(state.iconIndex);
      }
      if (i === 5 && effect.code === Game_Action.EFFECT_REMOVE_STATE) {
        var state = $dataStates[effect.dataId];
        if (state && state.iconIndex !== 0) array.push(state.iconIndex);
      }
      if (i === 6 && effect.code === Game_Action.EFFECT_ADD_BUFF) {
        var icon = Game_BattlerBase.ICON_BUFF_START + effect.dataId;
        array.push(icon);
      }
      if (i === 6 && effect.code === Game_Action.EFFECT_ADD_DEBUFF) {
        var icon = Game_BattlerBase.ICON_DEBUFF_START + effect.dataId;
        array.push(icon);
      }
      if (i === 7 && effect.code === Game_Action.EFFECT_REMOVE_BUFF) {
        var icon = Game_BattlerBase.ICON_BUFF_START + effect.dataId;
        array.push(icon);
      }
      if (i === 7 && effect.code === Game_Action.EFFECT_REMOVE_DEBUFF) {
        var icon = Game_BattlerBase.ICON_DEBUFF_START + effect.dataId;
        array.push(icon);
      }
    }, this);
    array = array.slice(0, Yanfly.Param.ItemMaxIcons);
    return array;
};

//=============================================================================
// Window_ItemInfo
//=============================================================================

function Window_ItemInfo() {
    this.initialize.apply(this, arguments);
}

Window_ItemInfo.prototype = Object.create(Window_Base.prototype);
Window_ItemInfo.prototype.constructor = Window_ItemInfo;

Window_ItemInfo.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.deactivate();
    this.refresh();
};

Window_ItemInfo.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_ItemInfo.prototype.refresh = function() {
    this.contents.clear();
    var dy = 0;
    if (!this._item) return dy;
    this.preInfoEval();
    dy = this.drawPreItemInfo(dy);
    dy = this.drawItemInfo(dy);
    dy = this.drawItemInfoA(dy);
    dy = this.drawItemInfoB(dy);
    dy = this.drawItemInfoC(dy);
    dy = this.drawItemInfoD(dy);
    dy = this.drawItemInfoE(dy);
    return this.drawItemInfoF(dy);
};

Window_ItemInfo.prototype.preInfoEval = function() {
    var item = this._item;
    if (item.infoEval === undefined) {
      item.infoEval = DataManager.getBaseItem(item).infoEval;
    }
    if (item.infoEval === '') return;
    var weapon = this._item;
    var armor = this._item;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.infoEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ITEM WINDOW PRE INFO EVAL ERROR');
    }
};

Window_ItemInfo.prototype.drawPreItemInfo = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfo = function(dy) {
    var dx = this.textPadding();
    var dw = this.contents.width - this.textPadding() * 2;
    this.resetFontSettings();
    this.drawItemName(this._item, dx, dy, dw);
    return dy + this.lineHeight();
};

Window_ItemInfo.prototype.drawItemInfoA = function(dy) {
    dy = this.drawInfoTextTop(dy);
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoB = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoC = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoD = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoE = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoF = function(dy) {
    dy = this.drawInfoTextBottom(dy);
    return dy;
};

Window_ItemInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ItemInfo.prototype.drawInfoTextTop = function(dy) {
    var item = this._item;
    if (item.infoTextTop === undefined) {
      item.infoTextTop = DataManager.getBaseItem(item).infoTextTop;
    }
    if (item.infoTextTop === '') return dy;
    var info = item.infoTextTop.split(/[\r\n]+/);
    for (var i = 0; i < info.length; ++i) {
      var line = info[i];
      this.resetFontSettings();
      this.drawTextEx(line, this.textPadding(), dy);
      dy += this.contents.fontSize + 8;
    }
    return dy;
};

Window_ItemInfo.prototype.drawInfoTextBottom = function(dy) {
    var item = this._item;
    if (item.infoTextBottom === undefined) {
      item.infoTextBottom = DataManager.getBaseItem(item).infoTextBottom;
    }
    if (item.infoTextBottom === '') return dy;
    var info = item.infoTextBottom.split(/[\r\n]+/);
    for (var i = 0; i < info.length; ++i) {
      var line = info[i];
      this.resetFontSettings();
      this.drawTextEx(line, this.textPadding(), dy);
      dy += this.contents.fontSize + 8;
    }
    return dy;
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

function Window_ItemActionCommand() {
    this.initialize.apply(this, arguments);
}

Window_ItemActionCommand.prototype = Object.create(Window_Command.prototype);
Window_ItemActionCommand.prototype.constructor = Window_ItemActionCommand;

Window_ItemActionCommand.prototype.initialize = function(x, y) {
    this._windowHeight = Graphics.boxHeight - y;
    Window_Command.prototype.initialize.call(this, x, y);
    this._item = null;
    this.hide();
    this.deactivate();
};

Window_ItemActionCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

Window_ItemActionCommand.prototype.update = function() {
  Window_Command.prototype.update.call(this);
};

Window_ItemActionCommand.prototype.setItem = function(item) {
    this._item = item;
    this.refresh();
    this.show();
    this.activate();
    this.select(0);
};

Window_ItemActionCommand.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_ItemActionCommand.prototype.makeCommandList = function() {
    if (!this._item) return;
    this.addUseCommand();
    this.addCustomCommandsA();
    this.addCustomCommandsB();
    this.addCustomCommandsC();
    this.addCustomCommandsD();
    this.addCustomCommandsE();
    this.addCustomCommandsF();
    this.addCancelCommand();
};

Window_ItemActionCommand.prototype.addUseCommand = function() {
    var enabled = this.isEnabled(this._item);
    var fmt = Yanfly.Param.ItemUseCmd;
    text = '\\i[' + this._item.iconIndex + ']';
    if (this._item.textColor !== undefined) {
      text += '\\c[' + this._item.textColor + ']';
    }
    text += this._item.name;
    text = fmt.format(text);
    this.addCommand(text, 'use', enabled);
};

Window_ItemActionCommand.prototype.isEnabled = function(item) {
    if (!item) return false;
    return $gameParty.canUse(item);
};

Window_ItemActionCommand.prototype.addCustomCommandsA = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsB = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsC = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsD = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsE = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsF = function() {
};

Window_ItemActionCommand.prototype.addCancelCommand = function() {
    this.addCommand(TextManager.cancel, 'cancel');
};

Window_ItemActionCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.Item.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    Yanfly.Item.Scene_Item_createItemWindow.call(this);
    this.createStatusWindow();
    this.createInfoWindow();
    this.createActionWindow();
    this._categoryWindow.setHandler('cancel', this.exitScene.bind(this));
};

Scene_Item.prototype.createStatusWindow = function() {
    var wx = this._categoryWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._categoryWindow.height;
    this._statusWindow = new Window_ItemStatus(wx, wy, ww, wh);
    this._itemWindow.setStatusWindow(this._statusWindow);
    this.addWindow(this._statusWindow);
};

Scene_Item.prototype.createInfoWindow = function() {
    var wx = this._itemWindow.width;
    var wy = this._itemWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._itemWindow.height;
    this._infoWindow = new Window_ItemInfo(wx, wy, ww, wh);
    this._itemWindow.setInfoWindow(this._infoWindow);
    this.addWindow(this._infoWindow);
};

Scene_Item.prototype.createActionWindow = function() {
    var wy = this._itemWindow.y;
    this._itemActionWindow = new Window_ItemActionCommand(0, wy);
    this._itemActionWindow.setHandler('use', this.onActionUse.bind(this));
    this._itemActionWindow.setHandler('cancel', this.onActionCancel.bind(this));
    this.addWindow(this._itemActionWindow);
};

Scene_Item.prototype.isCursorLeft = function() {
    return true;
};

Scene_Item.prototype.onItemOk = function() {
    var item = this.item();
    this._itemActionWindow.setItem(item);
};

Yanfly.Item.Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
Scene_Item.prototype.onItemCancel = function() {
    Yanfly.Item.Scene_Item_onItemCancel.call(this);
    this._statusWindow.setItem(null);
    this._infoWindow.setItem(null);
};

Scene_Item.prototype.onActionUse = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

Scene_Item.prototype.onActionCancel = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._itemWindow.activate();
};

Yanfly.Item.Scene_Item_applyItem = Scene_Item.prototype.applyItem;
Scene_Item.prototype.applyItem = function() {
    Yanfly.Item.Scene_Item_applyItem.call(this);
    if (DataManager.isIndependent(this.item())) this.onActorCancel();
};

Scene_Item.prototype.exitScene = function() {
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.members()[i];
      if (member) member.refresh();
    }
    this.popScene();
};

//=============================================================================
// Scene_Item Update
//=============================================================================

}; // End Scene_Item

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
   Yanfly.Util.toGroup = function(inVal) {
       return inVal;
   }
};

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

//=============================================================================
// End of File
//=============================================================================
