//=============================================================================
// Yanfly Engine Plugins - Save Core
// YEP_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SaveCore = true;

var Yanfly = Yanfly || {};
Yanfly.Save = Yanfly.Save || {};
Yanfly.Save.version = 1.06;

//=============================================================================
 /*:
 * @plugindesc v1.06 大幅美化存檔選單的佈局並掌握存檔系統的規則。
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Files
 * @parent ---General---
 * @type number
 * @min 1
 * @desc 遊戲的最大存檔數量。
 * 預設： 20
 * @default 24
 *
 * @param Saved Icon
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 在已使用的存檔上顯示的圖示 ID：
 * @default 231
 *
 * @param Empty Icon
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 在未使用的空白處顯示的圖示 ID：
 * @default 230
 *
 * @param Return After Saving
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 記錄後返回上一個場景？
 * 不 - false     是 - true     預設： true
 * @default false
 * 
 * @param Auto New Index
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 開始新遊戲的時候會自動決定存檔的位置？
 * 不 - false     是 - true     預設： true
 * @default true
 *
 * @param ---Action Window---
 * @default
 *
 * @param Load Command
 * @parent ---Action Window---
 * @desc 在操作視窗中表示“讀取指令“的文本。
 * @default 讀取
 *
 * @param Save Command
 * @parent ---Action Window---
 * @desc 在操作視窗中表示“存檔指令“的文本。
 * @default 記錄
 *
 * @param Delete Command
 * @parent ---Action Window---
 * @desc 在操作視窗中表示“刪除指令“的文本。
 * @default 刪除
 *
 * @param ---Help Window---
 * @default
 *
 * @param Select Help
 * @parent ---Help Window---
 * @desc 選擇“檔案槽“時顯示的幫助文本。
 * @default 請選擇一個存檔位置。
 *
 * @param Load Help
 * @parent ---Help Window---
 * @desc 選擇“讀取選項“時顯示的幫助文本。
 * @default 讀取已記錄的存檔數據。
 *
 * @param Save Help
 * @parent ---Help Window---
 * @desc 選擇“記錄選項“時顯示的幫助文本。
 * @default 記錄遊戲當下的進度。
 *
 * @param Delete Help
 * @parent ---Help Window---
 * @desc 選擇“刪除選項“時顯示的幫助文本。
 * @default 刪除這個存檔所有的數據。
 *
 * @param ---Delete---
 * @default
 *
 * @param Delete Filename
 * @parent ---Delete---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 從 /audio/se/ 文件夾中選擇用於表示“刪除“的音效。
 * 不包含文件的副檔名。
 * @default save
 *
 * @param Delete Volume
 * @parent ---Delete---
 * @desc 〝刪除〝音效的音量。
 * @default 100
 *
 * @param Delete Pitch
 * @parent ---Delete---
 * @desc 〝刪除〝音效的音調。
 * @default 150
 *
 * @param Delete Pan
 * @parent ---Delete---
 * @desc 〝刪除〝音效的平移。
 * @default 0
 *
 * @param ---Info Window---
 * @default
 *
 * @param Show Game Title
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在存檔中顯示遊戲名稱？
 * 不 - false     是 - true
 * @default true
 *
 * @param Invalid Game Text
 * @parent ---Info Window---
 * @desc 當存檔在不同遊戲時使用的文本。
 * @default 這是不同遊戲的存檔。
 *
 * @param Empty Game Text
 * @parent ---Info Window---
 * @desc 當存檔是空白時使用的文本。
 * @default 未使用
 *
 * @param Map Display Name
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 顯示存檔地圖的名稱？
 * 不 - false     是 - true
 * @default true
 *
 * @param Party Display
 * @parent ---Info Window---
 * @type select
 * @option None
 * @value 0
 * @option Characters
 * @value 1
 * @option Faces
 * @value 2
 * @option SV Actors
 * @value 3
 * @desc 隊伍的顯示類型。
 * 0 - 無； 1 - 角色； 2 - 臉圖； 3 - 戰鬥人物圖
 * @default 2
 *
 * @param Party Y Position
 * @parent ---Info Window---
 * @desc 這是顯示隊伍的基本 Y 位置。
 * 可以使用公式。
 * @default this.lineHeight() + Window_Base._faceHeight
 *
 * @param Show Actor Names
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 顯示角色的名稱？
 * 不 - false     是 - true
 * @default true
 *
 * @param Name Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc 顯示名稱的字體大小。
 * 預設： 28
 * @default 20
 *
 * @param Show Actor Level
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 顯示角色的等級？
 * 不 - false     是 - true
 * @default true
 *
 * @param Level Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc 顯示等級的字體大小。
 * 預設： 28
 * @default 20
 *
 * @param Level Format
 * @parent ---Info Window---
 * @desc 用於顯示等級的文本格式。
 * %1 - Lv (Abbr)   %2 - Lv (Full)     %3 - Value
 * @default \c[16]%1 \c[0]%3
 *
 * @param Data Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc 顯示數據的字體大小。
 * 預設： 28
 * @default 20
 *
 * @param Data Column 1
 * @parent ---Info Window---
 * @desc 要在數據列 1 中顯示的數據。有關數據條目，請參閱幫助文件。 
 * 用逗號分隔每個條目。
 * @default empty, playtime, save count, gold count
 *
 * @param Data Column 2
 * @parent ---Info Window---
 * @desc 要在數據列 2 中顯示的數據。有關數據條目，請參閱幫助文件。 
 * 用逗號分隔每個條目。
 * @default location, variable 1, variable 2, variable 3
 *
 * @param Data Column 3
 * @parent ---Info Window---
 * @desc 要在數據列 3 中顯示的數據。有關數據條目，請參閱幫助文件。 
 * 用逗號分隔每個條目。
 * @default empty, variable 4, variable 5, variable 6
 *
 * @param Data Column 4
 * @parent ---Info Window---
 * @desc 要在數據列 4 中顯示的數據。有關數據條目，請參閱幫助文件。 
 * 用逗號分隔每個條目。
 * @default
 *
 * @param ---Vocabulary---
 * @default
 *
 * @param Map Location
 * @parent ---Vocabulary---
 * @desc 對“地圖位置”進行分類的文本。
 * 保留空白不使用此類別並將數據置中。
 * @default
 *
 * @param Playtime
 * @parent ---Vocabulary---
 * @desc 對“遊戲時間”進行分類的文本。
 * 保留空白不使用此類別並將數據置中。
 * @default 遊戲時間：
 *
 * @param Save Count
 * @parent ---Vocabulary---
 * @desc 對“存檔次數”進行分類的文本。
 * 保留空白不使用此類別並將數據置中。
 * @default 記錄次數：
 *
 * @param Gold Count
 * @parent ---Vocabulary---
 * @desc 對“金錢數量”進行分類的文本。
 * 保留空白不使用此類別並將數據置中。
 * @default %1：
 *
 * @param ---Technical---
 * @default
 *
 * @param Save Mode
 * @parent ---Technical---
 * @type combo
 * @option local
 * @option web
 * @option auto
 * @desc 您的遊戲要如何運作存檔系統？
 * local     web     auto
 * @default auto
 *
 * @param Local Config
 * @parent ---Technical---
 * @desc 使用單機存檔時設置的文件名稱。
 * 預設： config.rpgsave
 * @default config.rpgsave
 *
 * @param Local Global
 * @parent ---Technical---
 * @desc 使用單機存檔時全局的文件名稱。
 * 預設： global.rpgsave
 * @default global.rpgsave
 *
 * @param Local Save
 * @parent ---Technical---
 * @desc 使用單機存檔時；遊戲記錄的文件名稱。
 * %1 - File Slot. 預設： config.rpgsave
 * @default file%1.rpgsave
 *
 * @param Web Config
 * @parent ---Technical---
 * @desc 使用網路存檔時設置的文件名稱。
 * %1 - Game Name. 預設： RPG Config
 * @default RPG %1 Config
 *
 * @param Web Global
 * @parent ---Technical---
 * @desc 使用網路存檔時全局的文件名稱。
 * %1 - Game Name. 預設： RPG Global
 * @default RPG %1 Global
 *
 * @param Web Save
 * @parent ---Technical---
 * @desc 使用網路存檔時；遊戲記錄的文件名稱。
 * %1 - Game Name. %2 - File Slot. 預設： RPG File%1
 * @default RPG %1 File%2
 *
 * @param ---Confirmation---
 * @default
 *
 * @param Load Confirmation
 * @parent ---Confirmation---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 讀取存檔的時候，顯示“是否讀取“的確認視窗？
 * 不 - false     是 - true
 * @default true
 *
 * @param Load Text
 * @parent ---Confirmation---
 * @desc 讀取存檔的時候顯示的文本。
 * @default 確定要讀取這個存檔嗎？
 *
 * @param Save Confirmation
 * @parent ---Confirmation---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 覆寫存檔的時候，顯示“是否記錄“的確認視窗？
 * 不 - false     是 - true
 * @default true
 *
 * @param Save Text
 * @parent ---Confirmation---
 * @desc 覆寫存檔的時候顯示的文本。
 * @default 確定要覆蓋這個存檔嗎？
 *
 * @param Delete Confirmation
 * @parent ---Confirmation---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 刪除存檔的時候，顯示“是否刪除“的確認視窗？
 * 不 - false     是 - true
 * @default true
 *
 * @param Delete Text
 * @parent ---Confirmation---
 * @desc 刪除存檔的時候顯示的文本。
 * @default 確定要刪除這個存檔嗎？
 *
 * @param Confirm Yes
 * @parent ---Confirmation---
 * @desc 確認指令 'Yes' 的文本。
 * @default 是
 *
 * @param Confirm No
 * @parent ---Confirmation---
 * @desc 確認指令 'No' 的文本。
 * @default 否
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * 這個插件為玩家提供了一個新的存檔介面。 除了新介面外，玩家還可以直接從
 * 選單本身讀取和刪除存檔。反而將使主選單中的存檔命令始終可用，但新存檔
 * 選單中的存檔選項將根據是否允許或禁止而啟用。從介面中，玩家可以獲得更
 * 多關於存檔文件的訊息，包括玩家存檔的位置、可用金幣數量以及您想要向玩
 * 家展示的任何變數。
 *
 * ============================================================================
 * 說明 - 數據列
 * ============================================================================
 *
 * 對於那些希望在每個存檔文件的存檔選單中顯示附加數據的人，您可以在插件
 * 參數內的“數據列”中添加各種數據類別。
 * 用逗號 (,) 分隔每個類別。 您可以將以下條目用於數據類別：
 *
 * 數據列類別：
 *
 *   Empty
 *   - 在類別位置留下一個空框。 這甚至不會在類別槽中顯示黑色矩形。
 *
 *   Null
 *   - 不會繪製任何文本，但會在類別槽中繪製黑色矩形。
 *
 *   Location
 *   - 繪製存檔文件的當前地圖位置。
 *
 *   Playtime
 *   - 繪製存檔文件的遊戲時間。
 *
 *   Save Count
 *   - 繪製在遊玩過程中存檔的次數。
 *
 *   Gold Count
 *   - 繪製存檔文件當前的金錢總數。
 *
 *   Variable x
 *   - 繪製變數的名稱和變數的值。您可以在變數名稱中使用文本代碼。
 *   << 和 >> 之間的任何文本在繪製時都不會顯示。
 *   如果變數名稱為空白，則數值將置中。
 *
 *   text: stuff
 *   left text: stuff
 *   center text: stuff
 *   right text: stuff
 *   - 這將繪製"東西"（用您自己的文本替換）作為文本本身，不附加任何數據。
 *   使用 'left'、'center' 或 'right' 來決定文本對齊方式。
 *   如果未使用對齊方式，則默認為“左”對齊方式。
 *   您可以在繪製的文本中使用文本代碼。
 *
 * ============================================================================
 * 技術性的 - 保存模式
 * ============================================================================
 *
 * 對於計劃在網路上發佈他們的 RPG Maker MV 遊戲的開發人員，您可能需要查
 * 看“技術”參數。在這裡，您可以強制遊戲判斷是在“單機”或“網路”模式
 * 下運行的。預設情況下，您希望它處於“自動”狀態，但強制模式用於測試目
 * 的。儘管是為了測試目的，如果您希望您的遊戲按照“網路”模式調整存檔，
 * 即使您的遊戲僅限單機，您也可以保持這種方式。 但是，網路上的遊戲不能
 * 使用“單機”模式，並且會自動預設為“網路”模式。
 *
 * ============================================================================
 * 技術性的 - 保存文件
 * ============================================================================
 *
 * “本地配置”、“本地全局”和“本地保存”可以根據自己的喜好更改其文件
 * 名稱格式。就個人而言，除非您知道自己在做什麼，否則我不建議您搞砸這個。
 *
 * ---
 *
 * 但是，如果您正在製作基於 Web（網路） 的（含移動裝置），我強烈建議您查
 * 看“Web 配置”、“Web 全局”和“Web 保存”參數。
 * 預設情況下，RPG Maker MV 將全部存檔到 RPG 檔案 X。所有基於 Web 的 
 * RPG Maker MV 遊戲將使用相同的配置、相同的全局存檔文件，並且個人玩的所
 * 有 RPG Maker MV 遊戲將共享相同的存檔位置。 這可能非常有問題。
 *
 * 此插件的預設設置將通過根據您的遊戲名稱來命名網路存檔以解決此共享問題，
 * 前提是您保持當前插件設置不變或相應地調整它。現在，您的遊戲將擁有自己的
 * 個人身份、使用自己的配置、全局和存檔文件，而不會與玩家可能玩過的任何其
 * 他 RPG Maker MV 遊戲發生衝突。
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.06:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.05:
 * - Added anti-crash measure for nonexistent $dataMapInfos entries.
 *
 * Version 1.04:
 * - Added 'Map Display Name' plugin parameter. Enabling this option will now
 * display the display name for the map instead of the editor name.
 *
 * Version 1.03:
 * - Fixed a bug that caused web saving to not work properly.
 *
 * Version 1.02:
 * - Fixed a bug that caused the actor's default name to appear in the save
 * screen instead of the actor's current name (if it was changed.)
 *
 * Version 1.01:
 * - Added a wait time update for save info data to load when moving across the
 * various save files.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SaveCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SaveMaxFiles = Number(Yanfly.Parameters['Max Files']);
Yanfly.Param.SaveIconSaved = Number(Yanfly.Parameters['Saved Icon']);
Yanfly.Param.SaveIconEmpty = Number(Yanfly.Parameters['Empty Icon']);
Yanfly.Param.SavePop = eval(String(Yanfly.Parameters['Return After Saving']));
Yanfly.Param.SaveAutoIndex = eval(String(Yanfly.Parameters['Auto New Index']));

Yanfly.Param.SaveCmdLoad = String(Yanfly.Parameters['Load Command']);
Yanfly.Param.SaveCmdSave = String(Yanfly.Parameters['Save Command']);
Yanfly.Param.SaveCmdDelete = String(Yanfly.Parameters['Delete Command']);

Yanfly.Param.SaveHelpSelect = String(Yanfly.Parameters['Select Help']);
Yanfly.Param.SaveLoadSelect = String(Yanfly.Parameters['Load Help']);
Yanfly.Param.SaveSaveSelect = String(Yanfly.Parameters['Save Help']);
Yanfly.Param.SaveDeleteSelect = String(Yanfly.Parameters['Delete Help']);

Yanfly.Param.SaveDeleteSound = {
  name:   String(Yanfly.Parameters['Delete Filename']),
  volume: Number(Yanfly.Parameters['Delete Volume']),
  pitch:  Number(Yanfly.Parameters['Delete Pitch']),
  pan:    Number(Yanfly.Parameters['Delete Pan'])
};

Yanfly.Param.SaveInfoTitle = String(Yanfly.Parameters['Show Game Title']);
Yanfly.Param.SaveInfoTitle = eval(Yanfly.Param.SaveInfoTitle);
Yanfly.Param.SaveInfoInvalid = String(Yanfly.Parameters['Invalid Game Text']);
Yanfly.Param.SaveInfoEmpty = String(Yanfly.Parameters['Empty Game Text']);
Yanfly.Param.SaveMapDisplayName = String(Yanfly.Parameters['Map Display Name']);
Yanfly.Param.SaveMapDisplayName = eval(Yanfly.Param.SaveMapDisplayName);
Yanfly.Param.SaveInfoPartyType = Number(Yanfly.Parameters['Party Display']);
Yanfly.Param.SaveInfoPartyType = Yanfly.Param.SaveInfoPartyType.clamp(0, 3);
Yanfly.Param.SaveInfoPartyY = String(Yanfly.Parameters['Party Y Position']);
Yanfly.Param.SaveInfoActorName = String(Yanfly.Parameters['Show Actor Names']);
Yanfly.Param.SaveInfoActorName = eval(Yanfly.Param.SaveInfoActorName);
Yanfly.Param.SaveInfoActorNameSz = Number(Yanfly.Parameters['Name Font Size']);
Yanfly.Param.SaveInfoActorLv = String(Yanfly.Parameters['Show Actor Level']);
Yanfly.Param.SaveInfoActorLv = eval(Yanfly.Param.SaveInfoActorLv);
Yanfly.Param.SaveInfoActorLvSz = Number(Yanfly.Parameters['Level Font Size']);
Yanfly.Param.SaveInfoActorLvFmt = String(Yanfly.Parameters['Level Format']);
Yanfly.Param.SaveInfoDataSz = Number(Yanfly.Parameters['Data Font Size']);
Yanfly.Param.SaveInfoDataCol1 = String(Yanfly.Parameters['Data Column 1']);
Yanfly.Param.SaveInfoDataCol1 = Yanfly.Param.SaveInfoDataCol1.split(',');
Yanfly.Param.SaveInfoDataCol2 = String(Yanfly.Parameters['Data Column 2']);
Yanfly.Param.SaveInfoDataCol2 = Yanfly.Param.SaveInfoDataCol2.split(',');
Yanfly.Param.SaveInfoDataCol3 = String(Yanfly.Parameters['Data Column 3']);
Yanfly.Param.SaveInfoDataCol3 = Yanfly.Param.SaveInfoDataCol3.split(',');
Yanfly.Param.SaveInfoDataCol4 = String(Yanfly.Parameters['Data Column 4']);
Yanfly.Param.SaveInfoDataCol4 = Yanfly.Param.SaveInfoDataCol4.split(',');

Yanfly.trimSaveDataColumns = function(array) {
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    array[i] = array[i].trim();
  }
  if (length === 1 && array[0] === '') array.splice(0);
};

Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol1);
Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol2);
Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol3);
Yanfly.trimSaveDataColumns(Yanfly.Param.SaveInfoDataCol4);

Yanfly.Param.SaveVocabLocation = String(Yanfly.Parameters['Map Location']);
Yanfly.Param.SaveVocabPlaytime = String(Yanfly.Parameters['Playtime']);
Yanfly.Param.SaveVocabSaveCount = String(Yanfly.Parameters['Save Count']);
Yanfly.Param.SaveVocabGoldCount = String(Yanfly.Parameters['Gold Count']);

Yanfly.Param.SaveTechSaveMode = String(Yanfly.Parameters['Save Mode']).trim();
Yanfly.Param.SaveTechSaveMode = Yanfly.Param.SaveTechSaveMode.toLowerCase();
Yanfly.Param.SaveTechLocalConfig = String(Yanfly.Parameters['Local Config']);
Yanfly.Param.SaveTechLocalGlobal = String(Yanfly.Parameters['Local Global']);
Yanfly.Param.SaveTechLocalSave = String(Yanfly.Parameters['Local Save']);
Yanfly.Param.SaveTechWebConfig = String(Yanfly.Parameters['Web Config']);
Yanfly.Param.SaveTechWebGlobal = String(Yanfly.Parameters['Web Global']);
Yanfly.Param.SaveTechWebSave = String(Yanfly.Parameters['Web Save']);

Yanfly.Param.SaveConfirmLoad = String(Yanfly.Parameters['Load Confirmation']);
Yanfly.Param.SaveConfirmLoad = eval(Yanfly.Param.SaveConfirmLoad);
Yanfly.Param.SaveConfirmLoadTx = String(Yanfly.Parameters['Load Text']);
Yanfly.Param.SaveConfirmSave = String(Yanfly.Parameters['Save Confirmation']);
Yanfly.Param.SaveConfirmSave = eval(Yanfly.Param.SaveConfirmSave);
Yanfly.Param.SaveConfirmSaveTx = String(Yanfly.Parameters['Save Text']);
Yanfly.Param.SaveConfirmDel = String(Yanfly.Parameters['Delete Confirmation']);
Yanfly.Param.SaveConfirmDel = eval(Yanfly.Param.SaveConfirmDel);
Yanfly.Param.SaveConfirmDelTx = String(Yanfly.Parameters['Delete Text']);
Yanfly.Param.SaveConfirmYes = String(Yanfly.Parameters['Confirm Yes']);
Yanfly.Param.SaveConfirmNo = String(Yanfly.Parameters['Confirm No']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.maxSavefiles = function() {
    return Yanfly.Param.SaveMaxFiles;
};

Yanfly.Save.DataManager_selectSavefileForNewGame =
    DataManager.selectSavefileForNewGame;
DataManager.selectSavefileForNewGame = function() {
    Yanfly.Save.DataManager_selectSavefileForNewGame.call(this);
    if (Yanfly.Param.SaveAutoIndex) return;
    this._lastAccessedId = 1;
};

Yanfly.Save.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  var contents = Yanfly.Save.DataManager_makeSaveContents.call(this);
  contents.map.locationDisplayName = $dataMap.displayName;
  return contents;
};

//=============================================================================
// StorageManager
//=============================================================================

Yanfly.Save.StorageManager_isLocalMode = StorageManager.isLocalMode;
StorageManager.isLocalMode = function() {
  if (Yanfly.Param.SaveTechSaveMode === 'local') {
    if (!Utils.isNwjs()) return false;
    return true;
  } else if (Yanfly.Param.SaveTechSaveMode === 'web') {
    return false;
  } else {
    return Yanfly.Save.StorageManager_isLocalMode.call(this);
  }
};

StorageManager.localFilePath = function(savefileId) {
  var name;
  if (savefileId < 0) {
    name = Yanfly.Param.SaveTechLocalConfig;
  } else if (savefileId === 0) {
    name = Yanfly.Param.SaveTechLocalGlobal;
  } else {
    name = Yanfly.Param.SaveTechLocalSave.format(savefileId);
  }
  return this.localFileDirectoryPath() + name;
};

Yanfly.Save.StorageManager_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function(savefileId) {
  if (!$dataSystem) return Yanfly.Save.StorageManager_webStorageKey.call(this);
  var title = $dataSystem.gameTitle;
  this.loadConfig();
  if (savefileId < 0) {
    return Yanfly.Param.SaveTechWebConfig.format(title);
  } else if (savefileId === 0) {
    return Yanfly.Param.SaveTechWebGlobal.format(title);
  } else {
    return Yanfly.Param.SaveTechWebSave.format(title, savefileId);
  }
};

StorageManager.loadConfig = function() {
  if (this._configLoaded) return;
  this._configLoaded = true;
  ConfigManager.load();
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Save.BattleManager_setBattleTest = BattleManager.setBattleTest;
BattleManager.setBattleTest = function(battleTest) {
    Yanfly.Save.BattleManager_setBattleTest.call(this, battleTest);
    if (battleTest) StorageManager.loadConfig();
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Window_MenuCommand.prototype.isSaveEnabled = function() {
    if (DataManager.isEventTest()) return false;
    return true;
};

//=============================================================================
// Window_SavefileList
//=============================================================================

Window_SavefileList.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var rect = this.itemRect(index);
    this.resetTextColor();
    //if (this._mode === 'load') this.changePaintOpacity(valid);
    this.changePaintOpacity(valid);
    var icon = valid ? Yanfly.Param.SaveIconSaved : Yanfly.Param.SaveIconEmpty;
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawFileId(id, rect.x + Window_Base._iconWidth + 4, rect.y);
};

Window_SavefileList.prototype.playOkSound = function() {
    Window_Selectable.prototype.playOkSound.call(this);
};

//=============================================================================
// Window_SaveAction
//=============================================================================

function Window_SaveAction() {
    this.initialize.apply(this, arguments);
}

Window_SaveAction.prototype = Object.create(Window_HorzCommand.prototype);
Window_SaveAction.prototype.constructor = Window_SaveAction;

Window_SaveAction.prototype.initialize = function(x, y, mode) {
    this._width = Graphics.boxWidth - x;
    this._currentFile = 0;
    this._mode = mode;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.deactivate();
    this.deselect();
};

Window_SaveAction.prototype.windowWidth = function() {
    return this._width;
};

Window_SaveAction.prototype.maxCols = function() {
    return 3;
};

Window_SaveAction.prototype.savefileId = function() {
    return SceneManager._scene._listWindow.index() + 1;
};

Window_SaveAction.prototype.makeCommandList = function() {
    var id = this.savefileId();
    var enabled = DataManager.isThisGameFile(id);
    var valid = DataManager.loadSavefileInfo(id);
    this.addCommand(this.getCommandName('load'), 'load', valid);
    this.addCommand(this.getCommandName('save'), 'save', this.isSaveEnabled());
    this.addCommand(this.getCommandName('delete'), 'delete', enabled);
};

Window_SaveAction.prototype.getCommandName = function(type) {
    if (type === 'load') {
      return Yanfly.Param.SaveCmdLoad;
    } else if (type === 'save') {
      return Yanfly.Param.SaveCmdSave;
    } else {
      return Yanfly.Param.SaveCmdDelete;
    }
};

Window_SaveAction.prototype.isSaveEnabled = function() {
    if (this._mode !== 'save') return false;
    return $gameSystem.isSaveEnabled();
};

Window_SaveAction.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this.savefileId() !== this._currentFile) this.updateIndex();
};

Window_SaveAction.prototype.updateIndex = function() {
    this._currentFile = this.savefileId();
    this.refresh();
};

Window_SaveAction.prototype.playOkSound = function() {
};

Window_SaveAction.prototype.updateHelp = function() {
    var text = '';
    if (this.currentSymbol() === 'load') {
      text = Yanfly.Param.SaveLoadSelect;
    } else if (this.currentSymbol() === 'save') {
      text = Yanfly.Param.SaveSaveSelect;
    } else if (this.currentSymbol() === 'delete') {
      text = Yanfly.Param.SaveDeleteSelect;
    }
    this._helpWindow.setText(text);
};

//=============================================================================
// Window_SaveInfo
//=============================================================================

function Window_SaveInfo() {
    this.initialize.apply(this, arguments);
}

Window_SaveInfo.prototype = Object.create(Window_Base.prototype);
Window_SaveInfo.prototype.constructor = Window_SaveInfo;

Window_SaveInfo.prototype.initialize = function(x, y, width, height, mode) {
  this._currentFile = 0;
  this._waitTime = 0;
  this._mode = mode;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
};

Window_SaveInfo.prototype.resetFontSettings = function() {
  Window_Base.prototype.resetFontSettings.call(this);
  if (this._drawLevel) this.contents.fontSize = Yanfly.Param.SaveInfoActorLvSz;
  if (this._drawData) this.contents.fontSize = Yanfly.Param.SaveInfoDataSz;
};

Window_SaveInfo.prototype.savefileId = function() {
  return SceneManager._scene._listWindow.index() + 1;
};

Window_SaveInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
  this.changePaintOpacity(true);
};

Window_SaveInfo.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (this.savefileId() !== this._currentFile) this.updateIndex();
  if (this._waitTime > 0) this.updateTimer();
};

Window_SaveInfo.prototype.systemColorEx = function() {
    if (Imported.YEP_CoreEngine) {
      return '\\c[' + Yanfly.Param.ColorSystem + ']';
    } else {
      return '\\c[16]';
    }
};

Window_SaveInfo.prototype.updateIndex = function() {
  var id = this.savefileId();
  this._currentFile = id;
  this._waitTime = 30;
  this.contents.clear();
};

Window_SaveInfo.prototype.updateTimer = function() {
  this._waitTime -= 1;
  if (this._waitTime > 0) return;
  var id = this.savefileId();
  this._valid = DataManager.isThisGameFile(id);
  this._info = DataManager.loadSavefileInfo(id);
  this.refresh();
};

Window_SaveInfo.prototype.refresh = function() {
  this.contents.clear();
  this.resetFontSettings();
  var dy = 0;
  dy = this.drawGameTitle(dy);
  if (!this._valid) return this.drawInvalidText(dy);
  this._saveContents = StorageManager.load(this.savefileId());
  this.drawContents(dy);
};

Window_SaveInfo.prototype.drawGameTitle = function(dy) {
  if (!Yanfly.Param.SaveInfoTitle) return dy;
  if (!this._info) return dy;
  if (!this._info.title) return dy;
  this.resetFontSettings();
  var text = this._info.title;
  this.drawText(text, 0, dy, this.contents.width, 'center');
  return dy + this.lineHeight();
};

Window_SaveInfo.prototype.drawInvalidText = function(dy) {
  this.drawDarkRect(0, dy, this.contents.width, this.contents.height - dy);
  dy = (this.contents.height - dy - this.lineHeight()) / 2;
  if (this._info) {
    var text = Yanfly.Param.SaveInfoInvalid;
  } else {
    var text = Yanfly.Param.SaveInfoEmpty;
  }
  this.changeTextColor(this.systemColor());
  this.drawText(text, 0, dy, this.contents.width, 'center');
};

Window_SaveInfo.prototype.drawContents = function(dy) {
  if (!this._saveContents) {
    return setTimeout(this.drawContents.bind(this, dy), 50);
  }
  this._saveContents = JsonEx.parse(this._saveContents);
  dy = this.drawPartyGraphics(dy);
  dy = this.drawPartyNames(dy);
  dy = this.drawPartyLevels(dy);
  this.drawColumnData(dy);
};

Window_SaveInfo.prototype.drawPartyGraphics = function(dy) {
  if (Yanfly.Param.SaveInfoPartyType === 0) return dy;
  dy = eval(Yanfly.Param.SaveInfoPartyY);
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = Math.floor(dw / 2);
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      if (Yanfly.Param.SaveInfoPartyType === 1) {
        var name = member.characterName();
        var index = member.characterIndex();
        this.drawCharacter(name, index, dx, dy);
      } else if (Yanfly.Param.SaveInfoPartyType === 2) {
        var fh = Window_Base._faceHeight;
        var fw = Window_Base._faceWidth;
        var fx = dx - Math.floor(Math.min(fh, dw) / 2);
        var dif = Math.floor(Math.max(0, dw - fw) / 2);
        var name = member.faceName();
        var index = member.faceIndex();
        this.drawFace(name, index, fx - dif, dy - fh, dw, fh);
      } else if (Yanfly.Param.SaveInfoPartyType === 3) {
        this.drawSvActor(member, dx, dy);
      }
    }
    dx += dw;
  }
  return dy;
};

Window_SaveInfo.prototype.drawCharacter = function(name, index, x, y) {
    var bitmap = ImageManager.loadCharacter(name);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawCharacter.bind(this, name, index, x, y), 50);
    }
    Window_Base.prototype.drawCharacter.call(this, name, index, x, y);
};

Window_SaveInfo.prototype.drawFace = function(name, index, x, y, w, h) {
    var bitmap = ImageManager.loadFace(name);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawFace.bind(this, name, index, x, y, w, h), 50);
    }
    Window_Base.prototype.drawFace.call(this, name, index, x, y, w, h);
};

Window_SaveInfo.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawSvActor.bind(this, actor, x, y), 50);
    }
    Window_Base.prototype.drawSvActor.call(this, actor, x, y);
};

Window_SaveInfo.prototype.drawPartyNames = function(dy) {
  if (!Yanfly.Param.SaveInfoActorName) return dy;
  this.resetFontSettings();
  this.contents.fontSize = Yanfly.Param.SaveInfoActorNameSz;
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = 0;
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      var name = member._name;
      this.drawText(name, dx, dy, dw, 'center');
    }
    dx += dw
  }
  return dy += this.lineHeight();
};

Window_SaveInfo.prototype.drawPartyLevels = function(dy) {
  if (!Yanfly.Param.SaveInfoActorLv) return dy;
  this._drawLevel = true;
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = 0;
  var fmt = Yanfly.Param.SaveInfoActorLvFmt;
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      var lv = Yanfly.Util.toGroup(member.level);
      var text = fmt.format(TextManager.levelA, TextManager.level, lv);
      var tw = this.textWidthEx(text);
      var dif = Math.floor(Math.max(0, dw - tw) / 2);
      this.drawTextEx(text, dx + dif, dy);
    }
    dx += dw
  }
  this._drawLevel = false;
  return dy += this.lineHeight();
};

Window_SaveInfo.prototype.drawColumnData = function(dy) {
    var totalColumns = 0;
    var drawnArrays = [];
    if (Yanfly.Param.SaveInfoDataCol1.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol1);
    }
    if (Yanfly.Param.SaveInfoDataCol2.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol2);
    }
    if (Yanfly.Param.SaveInfoDataCol3.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol3);
    }
    if (Yanfly.Param.SaveInfoDataCol4.length > 0) {
      totalColumns += 1;
      drawnArrays.push(Yanfly.Param.SaveInfoDataCol4);
    }
    if (totalColumns <= 0) return;
    var dw = Math.floor(this.contents.width / totalColumns);
    var dif = totalColumns > 1 ? this.textPadding() : 0;
    for (var i = 0; i < totalColumns; ++i) {
      var column = drawnArrays[i];
      var dx = i * dw;
      this.drawColumn(column, dx, dy, dw - dif);
    }
};

Window_SaveInfo.prototype.drawColumn = function(column, dx, dy, dw) {
    var length = column.length;
    var tp = this.textPadding();
    for (var i = 0; i < length; ++i) {
      this.resetFontSettings();
      this.contents.fontSize = Yanfly.Param.SaveInfoDataSz;
      var data = column[i];
      if (data.toUpperCase().trim() !== 'EMPTY') {
        this.drawDarkRect(dx, dy, dw, this.lineHeight());
        this.drawData(data, dx + tp, dy, dw - tp * 2);
      }
      dy += this.lineHeight();
    }
};

Window_SaveInfo.prototype.drawData = function(data, dx, dy, dw) {
  if (data.toUpperCase().trim() === 'NULL') {
    return;
  } else if (data.toUpperCase().trim() === 'LOCATION') {
    this.drawLocation(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'PLAYTIME') {
    this.drawPlaytime(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'SAVE COUNT') {
    this.drawSaveCount(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'GOLD COUNT') {
    this.drawGoldCount(dx, dy, dw);
  } else if (data.match(/VARIABLE[ ](\d+)/i)) {
    this.drawVariable(parseInt(RegExp.$1), dx, dy, dw);
  } else if (data.match(/(.*)[ ]TEXT:(.*)/i)) {
    this.drawDataText(String(RegExp.$1), String(RegExp.$2), dx, dy, dw);
  } else if (data.match(/TEXT:(.*)/i)) {
    this.drawDataText('left', String(RegExp.$1), dx, dy, dw);
  }
};

Window_SaveInfo.prototype.drawLocation = function(dx, dy, dw) {
    var id = this._saveContents.map._mapId;
    if (Yanfly.Param.SaveMapDisplayName) {
      var text = this._saveContents.map.locationDisplayName || '';
      if (text.length <= 0 && $dataMapInfos[id]) text = $dataMapInfos[id].name;
    } else if ($dataMapInfos[id]) {
      var text = $dataMapInfos[id].name;
    } else {
      var text = '';
    }
    if (Yanfly.Param.SaveVocabLocation.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(Yanfly.Param.SaveVocabLocation, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawPlaytime = function(dx, dy, dw) {
    if (!this._info.playtime) return;
    var text = this._info.playtime;
    if (Yanfly.Param.SaveVocabPlaytime.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(Yanfly.Param.SaveVocabPlaytime, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawSaveCount = function(dx, dy, dw) {
    var text = Yanfly.Util.toGroup(this._saveContents.system._saveCount);
    if (Yanfly.Param.SaveVocabSaveCount.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(Yanfly.Param.SaveVocabSaveCount, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawGoldCount = function(dx, dy, dw) {
    var text = Yanfly.Util.toGroup(this._saveContents.party._gold);
    if (Yanfly.Param.SaveVocabGoldCount.length > 0) {
      this.changeTextColor(this.systemColor());
      var fmt = Yanfly.Param.SaveVocabGoldCount;
      this.drawText(fmt.format(TextManager.currencyUnit), dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      var fmt = '\\c[0]%1' + this.systemColorEx() + '%2';
      var ftext = fmt.format(text, TextManager.currencyUnit);
      this._drawData = true;
      var fw = this.textWidthEx(ftext);
      dx += Math.max(0, Math.floor((dw - fw) / 2));
      this.drawTextEx(ftext, dx, dy);
      this._drawData = false;
    }
};

Window_SaveInfo.prototype.drawVariable = function(id, dx, dy, dw) {
    var varName = $dataSystem.variables[id];
    varName = varName.replace(/<<(.*?)>>/i, '');
    var text = Yanfly.Util.toGroup(this._saveContents.variables.value(id));
    var diff = Math.max(0, (this.standardFontSize() - 
      this.contents.fontSize) / 2);
    if (varName.length > 0) {
      this._drawData = true;
      this.changeTextColor(this.systemColor());
      dy += diff;
      this.drawTextEx(this.systemColorEx() + varName, dx, dy, dw, 'left');
      dy -= diff;
      this.changeTextColor(this.normalColor());
      this._drawData = false;
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawDataText = function(align, text, dx, dy, dw) {
    this._drawData = true;
    dy += Math.max(0, (this.standardFontSize() - this.contents.fontSize) / 2);
    var align = align.toLowerCase().trim();
    var text = text.trim();
    if (align === 'left') {
      this.drawTextEx(text, dx, dy);
    } else if (align === 'right') {
      var tw = this.textWidthEx(text);
      this.drawTextEx(text, dx + dw - tw, dy);
    } else {
      var tw = this.textWidthEx(text);
      this.drawTextEx(text, dx + (dw - tw) / 2, dy);
    }
    this._drawData = false;
};

//=============================================================================
// Window_SaveConfirm
//=============================================================================

function Window_SaveConfirm() {
    this.initialize.apply(this, arguments);
}

Window_SaveConfirm.prototype = Object.create(Window_Command.prototype);
Window_SaveConfirm.prototype.constructor = Window_SaveConfirm;

Window_SaveConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_SaveConfirm.prototype.makeCommandList = function() {
    this.addCommand(Yanfly.Param.SaveConfirmYes, 'confirm');
    this.addCommand(Yanfly.Param.SaveConfirmNo, 'cancel');
};

Window_SaveConfirm.prototype.setData = function(text) {
    this._text = text;
    var ww = this.textWidthEx(this._text) + this.standardPadding() * 2;
    ww += this.textPadding() * 2;
    this.width = ww;
    this.refresh();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_SaveConfirm.prototype.itemTextAlign = function() {
    return 'center';
};

Window_SaveConfirm.prototype.windowHeight = function() {
    return this.fittingHeight(3);
};

Window_SaveConfirm.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += this.lineHeight();
    return rect;
};

//=============================================================================
// Scene_File
//=============================================================================

Scene_File.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    if (this._loadSuccess) $gameSystem.onAfterLoad();
};

Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createHelpWindow();
    this.createListWindow();
    this.createActionWindow();
    this.createInfoWindow();
    this.createConfirmWindow();
};

Scene_File.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(2);
    this._helpWindow.setText(Yanfly.Param.SaveHelpSelect);
    this.addWindow(this._helpWindow);
};

Scene_File.prototype.createListWindow = function() {
    var x = 0;
    var y = this._helpWindow.height;
    var width = 240;
    var height = Graphics.boxHeight - y;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this.addWindow(this._listWindow);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    
};

Scene_File.prototype.createActionWindow = function() {
    var x = this._listWindow.width;
    var y = this._listWindow.y;
    this._actionWindow = new Window_SaveAction(x, y, this.mode());
    this.addWindow(this._actionWindow);
    this._actionWindow.setHelpWindow(this._helpWindow);
    this._actionWindow.setHandler('load', this.onActionLoad.bind(this));
    this._actionWindow.setHandler('save', this.onActionSave.bind(this));
    this._actionWindow.setHandler('delete', this.onActionDelete.bind(this));
    this._actionWindow.setHandler('cancel', this.onActionCancel.bind(this));
};

Scene_File.prototype.createInfoWindow = function() {
    var x = this._actionWindow.x;
    var y = this._actionWindow.y + this._actionWindow.height;
    var width = Graphics.boxWidth - x;
    var height = Graphics.boxHeight - y;
    this._infoWindow = new Window_SaveInfo(x, y, width, height, this.mode());
    this.addWindow(this._infoWindow);
};

Scene_File.prototype.createConfirmWindow = function() {
    this._confirmWindow = new Window_SaveConfirm();
    var win = this._confirmWindow;
    win.setHandler('confirm', this.onConfirmOk.bind(this));
    win.setHandler('cancel',  this.onConfirmCancel.bind(this));
    this.addWindow(this._confirmWindow);
};

Scene_File.prototype.onSavefileOk = function() {
    this._actionWindow.activate();
    if (this.mode() === 'load') {
      this._actionWindow.select(0);
    } else if (this.mode() === 'save') {
      this._actionWindow.select(1);
    }
};

Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
};

Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
};

Scene_File.prototype.onActionLoad = function() {
    if (Yanfly.Param.SaveConfirmLoad) {
      this.startConfirmWindow(Yanfly.Param.SaveConfirmLoadTx);
    } else {
      this.performActionLoad();
    }
};

Scene_File.prototype.performActionLoad = function() {
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
};

Scene_File.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};

Scene_Load.prototype.onLoadSuccess = function() {
    Scene_File.prototype.onLoadSuccess.call(this);
};

Scene_File.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.onActionCancel();
};

Scene_Load.prototype.onLoadFailure = function() {
    Scene_File.prototype.onLoadFailure.call(this);
};

Scene_File.prototype.reloadMapIfUpdated = function() {
  if ($gameSystem.versionId() === $dataSystem.versionId) return;
  $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
  $gamePlayer.requestMapReload();
};

Scene_File.prototype.onActionSave = function() {
  var id = this.savefileId();
  if (Yanfly.Param.SaveConfirmSave && StorageManager.exists(id)) {
    this.startConfirmWindow(Yanfly.Param.SaveConfirmSaveTx);
  } else {
    this.performActionSave();
  }
};

Scene_File.prototype.performActionSave = function() {
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
      this.onSaveSuccess();
    } else {
      this.onSaveFailure();
    }
};

Scene_File.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
    StorageManager.cleanBackup(this.savefileId());
    if (Yanfly.Param.SavePop) {
      this.popScene();
    } else {
      this._listWindow.refresh();
      this._actionWindow._currentFile = this.savefileId() - 1;
      this._infoWindow._currentFile = this.savefileId() - 1;
      this.onActionCancel();
    }
};

Scene_Save.prototype.onSaveSuccess = function() {
    Scene_File.prototype.onSaveSuccess.call(this);
};

Scene_File.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this.onActionCancel();
};

Scene_Save.prototype.onSaveFailure = function() {
    Scene_File.prototype.onSaveFailure.call(this);
};

Scene_File.prototype.onActionDelete = function() {
    if (Yanfly.Param.SaveConfirmDel) {
      this.startConfirmWindow(Yanfly.Param.SaveConfirmDelTx);
    } else {
      this.performActionDelete();
    }
};

Scene_File.prototype.performActionDelete = function() {
    AudioManager.playSe(Yanfly.Param.SaveDeleteSound);
    StorageManager.remove(this.savefileId());
    this.onActionCancel();
    this._listWindow.refresh();
    this._actionWindow._currentFile = this.savefileId() - 1;
    this._infoWindow._currentFile = this.savefileId() - 1;
};

Scene_File.prototype.onActionCancel = function() {
    this._actionWindow.deselect();
    this._listWindow.activate();
    this._helpWindow.setText(Yanfly.Param.SaveHelpSelect);
};

Scene_File.prototype.startConfirmWindow = function(text) {
    SoundManager.playOk();
    this._confirmWindow.setData(text);
    this._confirmWindow.open();
    this._confirmWindow.activate();
    this._confirmWindow.select(0);
};

Scene_File.prototype.onConfirmOk = function() {
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    if (this._actionWindow.currentSymbol() === 'load') {
      setTimeout(this.performActionLoad.bind(this), 200);
    } else if (this._actionWindow.currentSymbol() === 'save') {
      setTimeout(this.performActionSave.bind(this), 200);
    } else if (this._actionWindow.currentSymbol() === 'delete') {
      setTimeout(this.performActionDelete.bind(this), 200);
    } else {
      this.onConfirmCancel();
    }
};

Scene_File.prototype.onConfirmCancel = function() {
    var index = this._actionWindow.index();
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    this.onSavefileOk();
    this._actionWindow.select(index);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
