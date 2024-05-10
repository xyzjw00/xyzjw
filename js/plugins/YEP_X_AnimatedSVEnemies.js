//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Animated Sideview Enemies
// YEP_X_AnimatedSVEnemies.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_AnimatedSVEnemies = true;

var Yanfly = Yanfly || {};
Yanfly.SVE = Yanfly.SVE || {};
Yanfly.SVE.version = 1.20;

//=============================================================================
 /*:
 * @plugindesc v1.20 (需要 YEP_BattleEngineCore.js) 此插件可以讓您把側面戰鬥人物圖變成敵人！
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Anchor X
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 設置戰鬥人物的預設錨點位置。
 * Default: 0.5
 * @default 0.5
 *
 * @param Anchor Y
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 設置戰鬥人物的預設錨點位置。
 * Default: 1.0
 * @default 1.0
 *
 * @param Sprite Smoothing
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 啟用平滑的戰鬥人物圖？這是一個全局的設置。
 * NO - false     YES - true
 * @default true
 *
 * @param Sprite Width
 * @parent ---General---
 * @desc 設置側視戰鬥人物圖的最小寬度。
 * 使用 'auto' 進行自動檢測。 預設： 64
 * @default auto
 *
 * @param Sprite Height
 * @parent ---General---
 * @desc 設置側視戰鬥人物圖的最小高度。
 * 使用 'auto' 進行自動檢測。 預設： 64
 * @default auto
 *
 * @param Collapse
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 當戰鬥人物死亡時，它會崩潰並消失嗎？
 * 不 - false     是 - true
 * @default false
 *
 * @param Frame Speed
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 動作之間使用的預設幀數速度。
 * 預設： 12
 * @default 12
 *
 * @param Show State Overlay
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在側視戰鬥的敵人身上顯示狀態疊加？
 * 不 - false     是 - true
 * @default true
 *
 * @param ---Shadows---
 * @default
 *
 * @param Show Shadow
 * @parent ---Shadows---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在側視戰鬥敵人身上顯示陰影？
 * 不 - false     是 - true
 * @default false
 *
 * @param Shadow Scale X
 * @parent ---Shadows---
 * @desc 設定預設的水平陰影比例。
 * 使用 'auto' 進行自動檢測。 預設：1
 * @default auto
 *
 * @param Shadow Scale Y
 * @parent ---Shadows---
 * @desc 設定預設的垂直陰影比例。
 * 使用 'auto' 進行自動檢測。 預設：1
 * @default auto
 *
 * @param ---Breathing---
 * @default
 *
 * @param Enable Breathing
 * @parent ---Breathing---
 * @desc 敵人的呼吸選項。
 * @type select
 * @option None
 * @value 0
 * @option Static
 * @value 1
 * @option Sideview
 * @value 2
 * @option Both
 * @value 3
 * 0 - 無， 1 - 靜態， 2 - 側視圖， 3 - 兩者
 * @default 3
 *
 * @param Breathing Speed
 * @parent ---Breathing---
 * @type number
 * @min 0
 * @desc 敵人預設的呼吸頻率。
 * 數值越小 - 較快     數值越大 - 較慢
 * @default 20
 *
 * @param Breathing X Rate
 * @parent ---Breathing---
 * @type number
 * @decimals 3
 * @desc 敵人預設的呼吸 X 頻率。
 * 較低 - 靜態     較大 - 動態
 * @default 0.001
 *
 * @param Breathing Y Rate
 * @parent ---Breathing---
 * @type number
 * @decimals 3
 * @desc 敵人預設的呼吸 Y 頻率。
 * 較低 - 靜態     較大 - 動態
 * @default 0.020
 *
 * @param HP Link Breathing
 * @parent ---Breathing---
 * @type boolean
 * @on Link
 * @off Don't Link
 * @desc 將呼吸率連結 HP 率？
 * 不 - false     是 - true
 * @default false
 *
 * @param ---Floating---
 * @default
 *
 * @param Floating Speed
 * @parent ---Floating---
 * @type number
 * @min 0
 * @desc 敵人預設的飄浮速度。
 * 數值越小 - 較快     數值越大 - 較慢
 * @default 20
 *
 * @param Floating Rate
 * @parent ---Floating---
 * @type number
 * @decimals 1
 * @desc 敵人預設的飄浮頻率。
 * 數值越小 - 較快     數值越大 - 較慢
 * @default 0.3
 *
 * @param Floating Height
 * @parent ---Floating---
 * @type number
 * @min 0
 * @desc 敵人預設的最小飄浮高度。
 * 數值越小 - 更接近地面    數值越大 - 更高
 * @default 50
 *
 * @param Floating Death
 * @parent ---Floating---
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc 允許敵人死亡後仍然飄浮？
 * 不 - false     是 - true
 * @default true
 *
 * @param ---Motions---
 * @default
 *
 * @param Attack Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設置沒有武器的預設攻擊動作。
 * 攻擊動作類型：swing - 擺動，thrust - 推撞，missile - 發射物
 * @default thrust
 *
 * @param Idle Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物閒置的動作。
 * 預設： walk
 * @default walk
 *
 * @param Damage Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物受傷的動作。
 * 預設： damage
 * @default damage
 *
 * @param Evade Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物迴避的動作。
 * 預設： evade
 * @default evade
 *
 * @param Escape Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物逃跑的動作。
 * 預設： escape
 * @default escape
 *
 * @param Guard Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物防禦的動作。
 * 預設： guard
 * @default guard
 *
 * @param Abnormal Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物受異常狀態影響的動作。
 * 預設： abnormal
 * @default abnormal
 *
 * @param Sleep Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物睡眠的動作。
 * 預設： sleep
 * @default sleep
 *
 * @param Dying Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物瀕死的動作。
 * 預設： dying
 * @default dying
 *
 * @param Dead Motion
 * @parent ---Motions---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 設定戰鬥人物死亡的動作。
 * 預設： dead
 * @default dead
 *
 * @param ---Weapons---
 * @default
 *
 * @param Weapon Image Index
 * @parent ---Weapons---
 * @type number
 * @min 0
 * @desc 設定戰鬥人物的預設武器圖像索引。
 * 使用 0 表示沒有圖像。
 * @default 0
 *
 * @param Weapon 1 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 1：匕首    動作：擺動
 * @default swing
 *
 * @param Weapon 1 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 6
 *
 * @param Weapon 2 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 2：劍      動作：擺動
 * @default swing
 *
 * @param Weapon 2 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 6
 *
 * @param Weapon 3 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 3：連枷    動作：擺動
 * @default swing
 *
 * @param Weapon 3 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 4 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 4：斧      動作：擺動
 * @default swing
 *
 * @param Weapon 4 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 6
 *
 * @param Weapon 5 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 5：鞭子    動作：擺動
 * @default swing
 *
 * @param Weapon 5 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 6
 *
 * @param Weapon 6 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 6：杖      動作：擺動
 * @default swing
 *
 * @param Weapon 6 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 7 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 7：長弓    動作：發射物
 * @default missile
 *
 * @param Weapon 7 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 11
 *
 * @param Weapon 8 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 8：十字弓    動作：發射物
 * @default missile
 *
 * @param Weapon 8 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 11
 *
 * @param Weapon 9 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 9：槍械    動作：發射物
 * @default missile
 *
 * @param Weapon 9 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 111
 *
 * @param Weapon 10 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 10：爪    動作：推撞
 * @default thrust
 *
 * @param Weapon 10 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 16
 *
 * @param Weapon 11 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 11：手套    動作：推撞
 * @default thrust
 *
 * @param Weapon 11 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 12 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 12：矛    動作：推撞
 * @default thrust
 *
 * @param Weapon 12 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 11
 *
 * @param Weapon 13 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 13：錘    動作：擺動
 * @default swing
 *
 * @param Weapon 13 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 14 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 14：棍    動作：擺動
 * @default swing
 *
 * @param Weapon 14 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 15 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 15：棒    動作：擺動
 * @default swing
 *
 * @param Weapon 15 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 16 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 16：鎖鏈    動作：擺動
 * @default swing
 *
 * @param Weapon 16 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 6
 *
 * @param Weapon 17 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 17：劍 #2    動作：擺動
 * @default swing
 *
 * @param Weapon 17 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 7
 *
 * @param Weapon 18 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 18：鐵管    動作：擺動
 * @default swing
 *
 * @param Weapon 18 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 19 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 19：彈弓    動作：發射物
 * @default missile
 *
 * @param Weapon 19 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 11
 *
 * @param Weapon 20 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 20：散彈槍    動作：發射物
 * @default missile
 *
 * @param Weapon 20 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 111
 *
 * @param Weapon 21 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 21：步槍    動作：發射物
 * @default missile
 *
 * @param Weapon 21 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 111
 *
 * @param Weapon 22 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 22：電鋸    動作：推撞
 * @default thrust
 *
 * @param Weapon 22 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 7
 *
 * @param Weapon 23 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 23：軌道砲    動作：發射物
 * @default missile
 *
 * @param Weapon 23 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 15
 *
 * @param Weapon 24 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 24：電擊棒    動作：推撞
 * @default thrust
 *
 * @param Weapon 24 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 15
 *
 * @param Weapon 25 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 25：咒語書    動作：擺動
 * @default swing
 *
 * @param Weapon 25 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 26 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 26：客製化    動作：推撞
 * @default thrust
 *
 * @param Weapon 26 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 27 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 27：客製化    動作：推撞
 * @default thrust
 *
 * @param Weapon 27 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 28 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 28：客製化    動作：推撞
 * @default thrust
 *
 * @param Weapon 28 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 29 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 29：客製化    動作：推撞
 * @default thrust
 *
 * @param Weapon 29 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @param Weapon 30 Motion
 * @parent ---Weapons---
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc 使用此武器預設的動作。
 * 武器 30：客製化    動作：推撞
 * @default thrust
 *
 * @param Weapon 30 Animation
 * @parent ---Weapons---
 * @type animation
 * @desc 此武器圖像預設使用的戰鬥動畫。
 * @default 1
 *
 * @help
 * ============================================================================
 * 介紹                正體中文化 by xyzjw
 * ============================================================================
 *
 * 這個插件需要 YEP_BattleEngineCore。
 * 確保此插件位於插件列表中的 YEP_BattleEngineCore 下。
 * 這個擴展插件允許您以多種方式為敵人設置動畫，從賦予靜態敵人呼吸、飄浮
 * 和縮放屬性到利用側視戰鬥人物動畫作為敵人的潛在戰鬥者而不是靜態圖形來
 * 幫助您的敵人顯得更加生動！
 * 如果您正在使用 YEP_X_ActSeqPack2，並希望能夠添加飄浮敵人，請將此插件
 * 也放在 YEP_X_ActSeqPack2 下。要使用此插件，請在敵人的記事本中插入您
 * 在以下部分中看到的記事標籤：
 *
 * ============================================================================
 * 標籤
 * ============================================================================
 *
 * 將這些標籤插入敵方標籤框內，以將他們改變為側視戰鬥人物。
 *
 * 敵人標籤：
 *
 *   --- 一般 ---
 *
 *   <Breathing>
 *   <No Breathing>
 *   啟用或禁用敵方戰鬥人物的“呼吸”效果。
 *
 *   <Breathing Speed: x>
 *   完成一個完整的呼吸循環需要多少幀？ 
 *   x 值越低，敵人呼吸越快。 x 值越高，敵人呼吸越慢。
 *
 *   <Breathing Rate X: x.y>
 *   <Breathing Rate Y: x.y>
 *   將水平和垂直呼吸頻率設置為 x.y。 
 *   1.0 是 100% 的變異數，而 0.0 是 0% 的變異數。
 *
 *   <Enable HP Link Breathing>
 *   <Disable HP Link Breathing>
 *   將啟用/禁用 HP 連結呼吸。 敵人的HP越低，敵人的呼吸就越慢。
 *
 *   <Floating>
 *   將敵人設定為飄浮的動畫。
 *
 *   <Floating Speed: x>
 *   完成一個完整的飄浮週期需要多少幀？ 
 *   x 值越低，敵人飄浮的速度就越快。 x 值越高，敵人飄浮越慢。
 *
 *   <Floating Rate: x.y>
 *   將敵人的飄浮頻率設置為 x.y。 
 *   1.0 是 100% 的變異數，而 0.0 是 0% 的變異數。
 *
 *   <Floating Height: x>
 *   將敵人的最小飄浮高度設定為 x。
 *
 *   <Floating Death>
 *   <No Floating Death>
 *   決定這個特定敵人是否會在死亡時飄浮，或者立即掉到地上並忽
 *   略特定敵人的“飄浮死亡”插件參數。
 *
 *   <Scale Sprite: x%>
 *   這允許您將戰鬥人物放大或縮小為原始人物大小的 x%。 
 *   如果您只想縮放寬度或高度，請使用以下註釋標籤：
 *
 *   <Scale Sprite Width: x%>
 *   <Scale Sprite Height: x%>
 *   這將專程按 x% 縮放戰鬥人物的寬度或高度，而不是按相同比例縮放全身。
 *
 *   --- 側視 ---
 *
 *   <Sideview Battler: filename>
 *   在 img/sv_actors/ 文件夾中找到的側視戰鬥人物的文件名稱以供應用。
 *   如此以下註釋標籤將能夠應用於戰鬥人員。 
 *   這是區分大小寫的，並且能在沒有圖像文件副檔名的情況下使用。
 *
 *   *範例： SF_Actor3_8.png 將是 <Sideview Battler: SF_Actor3_8>
 *
 *   *注意：如果使用了多個標籤，則會從隨機池中挑選側視戰鬥人物。
 *   但是，為簡單起見，它們的設定將與標籤中設定的所有其他側視圖設定相匹配。
 *
 *   --- 側視戰鬥的規格 ---
 *
 *   <Sideview Anchor X: y.z>
 *   <Sideview Anchor Y: y.z>
 *   這將在 y.z 處設定敵人的側視戰鬥人物的錨點位置。
 *   這用於您擁有奇怪比例的側視戰鬥人物的事件。
 *
 *   <Sideview Width: x>
 *   <Sideview Height: x>
 *   設定側視戰鬥人物的寬度/高度。
 *   這是針對您使用的戰鬥人物圖像可能與普通側視戰鬥人物具有不同比例的事件。
 *
 *   <Sideview Collapse>
 *   設置它可以讓敵人死亡時崩潰並消失。
 *
 *   <Sideview No Collapse>
 *   設置它可以讓敵人死時會留下屍體並且不會消失。
 *
 *   <Sideview Frame Speed: x>
 *   將此側視戰鬥人物的幀速設定為 x。 x 值越低，側視戰鬥人物的動畫就越快。
 *   x 值越高，戰鬥人物的動畫就越慢。
 *
 *   --- 狀態推疊 ---
 *
 *   <Sideview Show State Overlay>
 *   <Sideview Hide State Overlay>
 *   這將顯示或隱藏側視圖敵人的狀態推疊，並忽略插件參數中的預設設定。
 *
 *   --- 動作 ---
 *
 *   <Sideview Attack Motion: swing>
 *   <Sideview Attack Motion: thrust>
 *   <Sideview Attack Motion: missile>
 *   為你的側視敵人設置基本攻擊動作，側視敵人沒有使用任何武器。 
 *   您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Weapon： x>
 *   這將戰鬥人物的武器圖像設定為 x。 如果您沒有修改武器的系統圖像，
 *   它們將如下所示：
 *
 *   0 - 沒有
 *   1 - 匕首   7 - 長弓    13 - 錘     19 - 彈弓    25 - 書
 *   2 - 劍     8 - 十字弓  14 - 棍     20 - 散彈槍  26 - 客製化
 *   3 - 連枷   9 - 槍械    15 - 棒     21 - 步槍    27 - 客製化
 *   4 - 斧    10 - 爪      16 - 鎖鏈   22 - 電鋸    28 - 客製化
 *   5 - 鞭子  11 - 手套    17 - 劍 #2  23 - 軌道砲  29 - 客製化
 *   6 - 杖    12 - 矛      18 - 鐵管   24 - 電擊棒  30 - 客製化
 *
 *   * 注意：插入多個這些標籤會將它們放入一個隨機的武器池中以供使用。
 *   請記住，如果您使用此標籤，它將使用插件參數中的所有預設設定。 
 *   如果您想使用更多獨特的設定，請使用下面的註釋標籤：
 *
 *   <Sideview Weapon: x, y, z>
 *   設定戰鬥人物的武器圖像為 x，動作設定為 y，攻擊動畫設定為 z。 
 *   如何使用此標籤的範例如下：
 *   
 *      <Sideview Weapon: 2, swing, 6>
 *
 *   這將給戰鬥人物一把帶有擺動動作的劍，並在攻擊時播放戰鬥動畫 6。
 *
 *   <Sideview Idle Motion: x>
 *   為側視敵人設定閒置的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *   * 注意：插入多個這些標籤會將它們放入隨機的動作池以供使用。
 *
 *   <Sideview Damage Motion: x>
 *   為側視敵人設定受傷的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Evade Motion: x>
 *   為側視敵人設定閃避的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Escape Motion: x>
 *   為側視敵人設定逃跑的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Guard Motion: x>
 *   為側視敵人設定防禦的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Abnormal Motion: x>
 *   為側視敵人設定異常狀態發作的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Sleep Motion: x>
 *   為側視敵人設定睡眠的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Dying Motion: x>
 *   為側視敵人設定瀕死的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   <Sideview Dead Motion: x>
 *   為側視敵人設定死亡的動作。 您可以使用以下任一動作：
 *   walk(走路)    wait(等待)    chant(詠唱)    guard(防禦)    damage(受傷)    
 *   evade(迴避)   thrust(推撞)  swing(擺動)    missile(發射物) skill(技能) 
 *   spell(咒語)   item(道具)    escape(逃跑)   victory(勝利)  dying(瀕死)
 *   abnormal(異常)      sleep(睡眠)      dead(死亡)
 *
 *   --- 陰影 ---
 *
 *   <Sideview Show Shadow>
 *   設置它以便敵人可以顯示其側視戰鬥人物的陰影。
 *   預設設定與 Battle Engine Core 的“Show Shadows”相關。
 *
 *   <Sideview Hide Shadow>
 *   設置它以便敵人可以隱藏其側視戰鬥人物的陰影。 
 *   預設設定與 Battle Engine Core 的“Show Shadows”相關。
 *
 *   <Sideview Shadow Width: x%>
 *   將陰影寬度設定為：比 img/system 文件夾中的預設陰影大小“大/小“ x%。
 *
 *   <Sideview Shadow Height: x%>
 *   將陰影高度設定為：比 img/system 文件夾中的預設陰影大小“大/小“ x%。
 *
 *   --- 隱藏側視武器 ---
 *
 *   <Hide Sideview Weapon>
 *   這將導致側視敵方戰鬥人物動畫隱藏其側視武器效果。
 *   攻擊動作將恢復成為其設置的徒手攻擊動作，並且攻擊動畫將是敵人的
 *   預設攻擊動畫。
 *
 * ============================================================================
 * 更新日誌
 * ============================================================================
 *
 * Version 1.20:
 * - Bugfix provided by YoraeRasante regarding the animation positioning on
 * animated sideview enemies.
 *
 * Version 1.19:
 * - Bugfix provided by SwiftIllusion regarding the animation positioning on
 * animated sideview enemies.
 *
 * Version 1.18:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Verison 1.17:
 * - Visual graphic update to sync attack animations properly with how actor
 * animations are now handled in the more updated RPG Maker MV versions.
 *
 * Version 1.16:
 * - Added 'Floating Death' plugin parameter.
 * - Optimization update.
 *
 * Version 1.15:
 * - Updated for RPG Maker MV version 1.3.2.
 *
 * Version 1.14:
 * - Pixi4 update to fix bug that caused state icons to fly off the screen.
 * - Fixed a compatibility issue with YEP_X_VisualStateFX regarding state
 * sprites being disabled and causing crashes.
 *
 * Version 1.13:
 * - Compatibility update with YEP_X_VisualStateFX to disable State Overlays on
 * enemies properly.
 *
 * Version 1.12:
 * - Fixed a bug that caused the <Sideview Show State Overlay> and 
 * <Sideview Hide State Overlay> notetags to not work.
 * - Fixed a bug that caused scaled enemies to have their state icons and
 * overlays appear in odd places.
 *
 * Version 1.11:
 * - Fixed a bug that caused hidden enemies to appear early on.
 *
 * Version 1.10:
 * - Optimized plugin to use less resources. Animated enemies will no longer
 * have a static graphic once the game is loaded.
 *
 * Version 1.09:
 * - Added a fix for state icons appearing behind battlers for the users who
 * aren't using the Action Sequence Packs.
 *
 * Version 1.08:
 * - State Icon and State Overlays will now synch together for floating and
 * jumping battlers.
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.06a:
 * - Fixed a bug that prevented animated sideview enemies from not mirroring.
 * - Added <Sideview Show State Overlay> and <Sideview Hide State Overlay>
 * notetags to make certain enemies show/hide state overlays.
 * - Fixed a bug that was caused by motion notetags not retrieved properly.
 *
 * Version 1.05:
 * - Made adjustments to the <Sprite Height: x> notetag to also affect the
 * location of the state icons and effects.
 *
 * Version 1.04:
 * - Fixed a bug with Sprite Smoothing disabled on Shadows.
 * - Fixed a bug with the anchor Y positions being overwritten.
 *
 * Version 1.03:
 * - Fixed a bug that would cause <Sideview Width: x> & <Sideview Height: x>
 * notetags to crash the game.
 *
 * Version 1.02:
 * - Synchronized state icons and overlays with floating enemies.
 *
 * Version 1.01:
 * - Added 'HP Link Breathing' plugin parameter. If enabled, the lower the HP,
 * the slower the enemy breathes.
 * - Added <Enable HP Link Breathing> and <Disable HP Link Breathing> notetags.
 *
 * Version 1.00:
 * - Finished plugin! Hooray!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

if (Yanfly.BEC.version && Yanfly.BEC.version >= 1.42) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_AnimatedSVEnemies');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SVEAnchorX = Number(Yanfly.Parameters['Anchor X']);
Yanfly.Param.SVEAnchorY = Number(Yanfly.Parameters['Anchor Y']);
Yanfly.Param.SVESmoothing = eval(String(Yanfly.Parameters['Sprite Smoothing']));
Yanfly.Param.SVEWidth = String(Yanfly.Parameters['Sprite Width']);
Yanfly.Param.SVEWidth = Yanfly.Param.SVEWidth.toLowerCase();
Yanfly.Param.SVEHeight = String(Yanfly.Parameters['Sprite Height']);
Yanfly.Param.SVEHeight = Yanfly.Param.SVEHeight.toLowerCase();
Yanfly.Param.SVECollapse = eval(String(Yanfly.Parameters['Collapse']));
Yanfly.Param.SVEFrameSpeed = Number(Yanfly.Parameters['Frame Speed']);
Yanfly.Param.SVEOverlay = eval(String(Yanfly.Parameters['Show State Overlay']));

Yanfly.Param.SVEBreathing = Number(Yanfly.Parameters['Enable Breathing']);
Yanfly.Param.SVEBreathSpeed = Number(Yanfly.Parameters['Breathing Speed']);
Yanfly.Param.SVEBreathXRate = Number(Yanfly.Parameters['Breathing X Rate']);
Yanfly.Param.SVEBreathYRate = Number(Yanfly.Parameters['Breathing Y Rate']);
Yanfly.Param.SVELinkBreathing = eval(Yanfly.Parameters['HP Link Breathing']);

Yanfly.Param.SVEFloatSpeed = Number(Yanfly.Parameters['Floating Speed']);
Yanfly.Param.SVEFloatRate = Number(Yanfly.Parameters['Floating Rate']);
Yanfly.Param.SVEFloatHeight = Number(Yanfly.Parameters['Floating Height']);
Yanfly.Param.SVEFloatDeath = String(Yanfly.Parameters['Floating Death']);
Yanfly.Param.SVEFloatDeath = eval(Yanfly.Param.SVEFloatDeath);

Yanfly.Param.SVEShowShadow = eval(String(Yanfly.Parameters['Show Shadow']));
Yanfly.Param.SVEShadowScaleX = String(Yanfly.Parameters['Shadow Scale X']);
Yanfly.Param.SVEShadowScaleY = String(Yanfly.Parameters['Shadow Scale Y']);

Yanfly.Param.SVEAttackMotion = String(Yanfly.Parameters['Attack Motion']);
Yanfly.Param.SVEIdleMotion = String(Yanfly.Parameters['Idle Motion']);
Yanfly.Param.SVEDmgMotion = String(Yanfly.Parameters['Damage Motion']);
Yanfly.Param.SVEEvadeMotion = String(Yanfly.Parameters['Evade Motion']);
Yanfly.Param.SVEEscMotion = String(Yanfly.Parameters['Escape Motion']);
Yanfly.Param.SVEGuardMotion = String(Yanfly.Parameters['Guard Motion']);
Yanfly.Param.SVEAbnMotion = String(Yanfly.Parameters['Abnormal Motion']);
Yanfly.Param.SVESleepMotion = String(Yanfly.Parameters['Sleep Motion']);
Yanfly.Param.SVEDyingMotion = String(Yanfly.Parameters['Dying Motion']);
Yanfly.Param.SVEDeadMotion = String(Yanfly.Parameters['Dead Motion']);

Yanfly.Param.SVEWeaponIndex = Number(Yanfly.Parameters['Weapon Image Index']);
Yanfly.Param.SVEWeaponMotion = {};
Yanfly.Param.SVEWeaponAnimation = {};
Yanfly.Param.SVEWeaponMotion[0] = Yanfly.Param.SVEAttackMotion.toLowerCase();
for (Yanfly.i = 1; Yanfly.i < 31; ++Yanfly.i) {
  Yanfly.s1 = 'Weapon ' + Yanfly.i + ' Motion';
  Yanfly.s2 = String(Yanfly.Parameters[Yanfly.s1]);
  Yanfly.Param.SVEWeaponMotion[Yanfly.i] = Yanfly.s2.toLowerCase();
  Yanfly.s1 = 'Weapon ' + Yanfly.i + ' Animation';
  Yanfly.s2 = Number(Yanfly.Parameters[Yanfly.s1]);
  Yanfly.Param.SVEWeaponAnimation[Yanfly.i] = Yanfly.s2;
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SVE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SVE.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_AnimatedSVEnemies) {
    this.processSVENotetags1($dataEnemies);
    this.processSVENotetags2($dataStates);
    Yanfly._loaded_YEP_X_AnimatedSVEnemies = true;
  }
  return true;
};

DataManager.processSVENotetags1 = function(group) {
  var noteWeapon = /<(?:SIDEVIEW WEAPON):[ ](\d+),[ ](.*),[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.sideviewBattler = [];
    obj.sideviewAttackMotion = Yanfly.Param.SVEAttackMotion.toLowerCase();
    obj.sideviewIdleMotion = [];
    obj.sideviewDmgMotion = Yanfly.Param.SVEDmgMotion.toLowerCase();
    obj.sideviewEvadeMotion = Yanfly.Param.SVEEvadeMotion.toLowerCase();
    obj.sideviewEscMotion = Yanfly.Param.SVEEscMotion.toLowerCase();
    obj.sideviewGuardMotion = Yanfly.Param.SVEGuardMotion.toLowerCase();
    obj.sideviewAbnMotion = Yanfly.Param.SVEAbnMotion.toLowerCase();
    obj.sideviewSleepMotion = Yanfly.Param.SVESleepMotion.toLowerCase();
    obj.sideviewDyingMotion = Yanfly.Param.SVEDyingMotion.toLowerCase();
    obj.sideviewDeadMotion = Yanfly.Param.SVEDeadMotion.toLowerCase();
    obj.sideviewAnchorX = Yanfly.Param.SVEAnchorX;
    obj.sideviewAnchorY = Yanfly.Param.SVEAnchorY;
    obj.sideviewWeaponImage = [];
    obj.sideviewWidth = Yanfly.Param.SVEWidth;
    obj.sideviewHeight = Yanfly.Param.SVEHeight;
    obj.sideviewCollapse = Yanfly.Param.SVECollapse;
    obj.sideviewShadowShow = Yanfly.Param.SVEShowShadow;
    obj.sideviewShadowScaleX = Yanfly.Param.SVEShadowScaleX;
    obj.sideviewShadowScaleY = Yanfly.Param.SVEShadowScaleY;
    obj.spriteScaleX = 1;
    obj.spriteScaleY = 1;
    obj.sideviewFrameSpeed = Yanfly.Param.SVEFrameSpeed;
    obj.sideviewBreathing = [1, 3].contains(Yanfly.Param.SVEBreathing);
    obj.sideviewBreathSpeed = Math.max(1, Yanfly.Param.SVEBreathSpeed);
    obj.sideviewBreathXRate = Math.max(0, Yanfly.Param.SVEBreathXRate);
    obj.sideviewBreathYRate = Math.max(0, Yanfly.Param.SVEBreathYRate);
    obj.sideviewLinkBreathing = Yanfly.Param.SVELinkBreathing;
    obj.sideviewFloating = false;
    obj.sideviewFloatSpeed = Yanfly.Param.SVEFloatSpeed;
    obj.sideviewFloatRate = Yanfly.Param.SVEFloatRate;
    obj.sideviewFloatHeight = Yanfly.Param.SVEFloatHeight;
    obj.sideviewFloatDeath = Yanfly.Param.SVEFloatDeath;
    obj.sideviewStateOverlay = Yanfly.Param.SVEOverlay;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
       if (line.match(/<(?:SCALE SPRITE):[ ](\d+)([%％])>/i)) {
        obj.spriteScaleX = parseFloat(RegExp.$1) * 0.01;
        obj.spriteScaleY = obj.spriteScaleX;
      } else if (line.match(/<(?:SCALE SPRITE WIDTH):[ ](\d+)([%％])>/i)) {
        obj.spriteScaleX = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SCALE SPRITE HEIGHT):[ ](\d+)([%％])>/i)) {
        obj.spriteScaleY = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SIDEVIEW BATTLER):[ ](.*)>/i)) {
        obj.sideviewBattler.push(String(RegExp.$1));
        obj.sideviewBreathing = [2, 3].contains(Yanfly.Param.SVEBreathing);
      } else if (line.match(/<(?:SIDEVIEW ATTACK MOTION):[ ](.*)>/i)) {
        obj.sideviewAttackMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW IDLE MOTION):[ ](.*)>/i)) {
        obj.sideviewIdleMotion.push(String(RegExp.$1).toLowerCase());
      } else if (line.match(/<(?:SIDEVIEW DAMAGE MOTION):[ ](.*)>/i)) {
        obj.sideviewDmgMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW EVADE MOTION):[ ](.*)>/i)) {
        obj.sideviewEvadeMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW ESCAPE MOTION):[ ](.*)>/i)) {
        obj.sideviewEscMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW GUARD MOTION):[ ](.*)>/i)) {
        obj.sideviewGuardMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW ABNORMAL MOTION):[ ](.*)>/i)) {
        obj.sideviewAbnMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW SLEEP MOTION):[ ](.*)>/i)) {
        obj.sideviewSleepMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW DYING MOTION):[ ](.*)>/i)) {
        obj.sideviewDyingMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW DEAD MOTION):[ ](.*)>/i)) {
        obj.sideviewDeadMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:SIDEVIEW ANCHOR X):[ ](\d+)[.](\d+)>/i)) {
        obj.sideviewAnchorX = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
      } else if (line.match(/<(?:SIDEVIEW ANCHOR Y):[ ](\d+)[.](\d+)>/i)) {
        obj.sideviewAnchorY = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
      } else if (line.match(/<(?:SIDEVIEW WEAPON):[ ](\d+)>/i)) {
        var weaponId = parseInt(RegExp.$1);
        var motionId = Yanfly.Param.SVEWeaponMotion[weaponId].toLowerCase();
        var aniId = Yanfly.Param.SVEWeaponAnimation[weaponId];
        var index = obj.sideviewWeaponImage.length;
        obj.sideviewWeaponImage[index] = [weaponId, motionId, aniId];
      } else if (line.match(noteWeapon)) {
        var weaponId = parseInt(RegExp.$1);
        var motionId = String(RegExp.$2).toLowerCase();
        var aniId = parseInt(RegExp.$3);
        var index = obj.sideviewWeaponImage.length;
        obj.sideviewWeaponImage[index] = [weaponId, motionId, aniId];
      } else if (line.match(/<(?:SIDEVIEW WIDTH):[ ](\d+)>/i)) {
        obj.sideviewWidth = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SIDEVIEW HEIGHT):[ ](\d+)>/i)) {
        obj.sideviewHeight = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SIDEVIEW COLLAPSE)>/i)) {
        obj.sideviewCollapse = true;
      } else if (line.match(/<(?:SIDEVIEW NO COLLAPSE)>/i)) {
        obj.sideviewCollapse = false;
      } else if (line.match(/<(?:SIDEVIEW SHOW SHADOW)>/i)) {
        obj.sideviewShadowShow = true;
      } else if (line.match(/<(?:SIDEVIEW HIDE SHADOW)>/i)) {
        obj.sideviewShadowShow = false;
      } else if (line.match(/<(?:SIDEVIEW SHADOW WIDTH):[ ](\d+)([%％])>/i)) {
        obj.sideviewShadowScaleX = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(/<(?:SIDEVIEW SHADOW HEIGHT):[ ](\d+)([%％])>/i)) {
        obj.sideviewShadowScaleY = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(/<(?:SIDEVIEW FRAME SPEED):[ ](\d+)>/i)) {
        obj.sideviewFrameSpeed = parseInt(RegExp.$1);
      } else if (line.match(/<(?:FLOATING|float)>/i)) {
        obj.sideviewFloating = true;
      } else if (line.match(/<(?:FLOATING SPEED):[ ](\d+)>/i)) {
        obj.sideviewFloatSpeed = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<(?:FLOATING RATE):[ ](\d+)[.](\d+)>/i)) {
        var rate = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
        obj.sideviewFloatRate = rate;
      } else if (line.match(/<(?:FLOATING HEIGHT):[ ](\d+)>/i)) {
        obj.sideviewFloatHeight = parseInt(RegExp.$1);
      } else if (line.match(/<(?:FLOATING DEATH|FLOAT DEATH)>/i)) {
        obj.sideviewFloatDeath = true;
      } else if (line.match(/<(?:NO FLOATING DEATH|NO FLOAT DEATH)>/i)) {
        obj.sideviewFloatDeath = false;
      } else if (line.match(/<SIDEVIEW SHOW STATE OVERLAY>/i)) {
        obj.sideviewStateOverlay = true;
      } else if (line.match(/<SIDEVIEW HIDE STATE OVERLAY>/i)) {
        obj.sideviewStateOverlay = false;
      }
    }
    // Breathing
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:BREATHING)>/i)) {
        obj.sideviewBreathing = true;
      } else if (line.match(/<(?:NO BREATHING)>/i)) {
        obj.sideviewBreathing = false;
      } else if (line.match(/<(?:BREATHING SPEED):[ ](\d+)>/i)) {
        obj.sideviewBreathSpeed = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<(?:BREATHING RATE X):[ ](\d+)[.](\d+)>/i)) {
        var rate = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
        obj.sideviewBreathXRate = rate;
      } else if (line.match(/<(?:BREATHING RATE Y):[ ](\d+)[.](\d+)>/i)) {
        var rate = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
        obj.sideviewBreathYRate = rate;
      } else if (line.match(/<(?:ENABLE HP LINK BREATHING)>/i)) {
        obj.sideviewLinkBreathing = true;
      } else if (line.match(/<(?:DISABLE HP LINK BREATHING)>/i)) {
        obj.sideviewLinkBreathing = false;
      }
    }
    // Create Defaults
    if (obj.sideviewIdleMotion.length <= 0) {
      obj.sideviewIdleMotion = [Yanfly.Param.SVEIdleMotion.toLowerCase()];
    }
    if (obj.sideviewWeaponImage.length <= 0) {
      var weaponId = Yanfly.Param.SVEWeaponIndex;
      var motionId = Yanfly.Param.SVEWeaponMotion[weaponId].toLowerCase();
      var aniId = Yanfly.Param.SVEWeaponAnimation[weaponId];
      obj.sideviewWeaponImage = [[weaponId, motionId, aniId]];
    }
    obj.sideviewFrameSpeed = Math.max(1, obj.sideviewFrameSpeed);
    if (obj.sideviewBattler.length > 0) {
      if (Imported.YEP_X_BattleSysCTB) {
        Yanfly.Param.CTBEnemySVBattler = true;
      }
      obj.battlerName = '';
      obj.battlerHue = 0;
    }
  }
};

DataManager.processSVENotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.hideSVWeapon;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:HIDE SIDEVIEW WEAPON)>/i)) {
        obj.hideSVWeapon = true;
      }
    }
  }
};

//=============================================================================
// ImageManager
//=============================================================================

if (Yanfly.Param.SVESmoothing) {

ImageManager.loadSvActor = function(filename, hue) {
    return this.loadBitmap('img/sv_actors/', filename, hue, true);
};

ImageManager.loadSystemSmooth = function(filename, hue) {
    return this.loadBitmap('img/system/', filename, hue, true);
};

}; // Yanfly.Param.SVESmoothing

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.SVE.Game_Battler_spriteWidth = Game_Battler.prototype.spriteWidth;
Game_Battler.prototype.spriteWidth = function() {
    if (this.isSideviewDimensions('width')) {
      var value = this.sideviewWidth();
    } else {
      var value = Yanfly.SVE.Game_Battler_spriteWidth.call(this);
    }
    //value *= Math.abs(this.spriteScaleX());
    return Math.floor(value);
};

Yanfly.SVE.Game_Battler_spriteHeight = Game_Battler.prototype.spriteHeight;
Game_Battler.prototype.spriteHeight = function() {
    if (this.isSideviewDimensions('height')) {
      var value = this.sideviewHeight();
    } else {
      var value = Yanfly.SVE.Game_Battler_spriteHeight.call(this);
    }
    //value *= Math.abs(this.spriteScaleY());
    return Math.floor(value);
};

Game_Battler.prototype.isSideviewDimensions = function(value) {
    if (!this.isEnemy()) return false;
    if (!this.hasSVBattler()) return false;
    if (value === 'width') return this.sideviewWidth() !== 'auto';
    if (value === 'height') return this.sideviewHeight() !== 'auto';
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.actor = function() {
    return this.enemy();
};

Game_Enemy.prototype.clearSVAttributes = function() {
    this._svWeaponImageId = undefined;
    this._svAttackMotion = undefined;
    this._svAttackAnimationId = undefined;
    this._svBattlerName = undefined;
    this._svIdleMotion = undefined;
};

Game_Enemy.prototype.setupSVAttributes = function() {
    var array = this.enemy().sideviewWeaponImage;
    var newArray = Yanfly.Util.getRandomElement(array);
    this._svWeaponImageId = newArray[0];
    this._svAttackMotion = newArray[1];
    this._svAttackAnimationId = newArray[2];
    if (this._svAttackAnimationId === undefined) this._svAttackAnimationId =
      Yanfly.SVE.Game_Enemy_attackAnimationId.call(this);
};

Yanfly.SVE.Game_Enemy_attackAnimationId =
    Game_Enemy.prototype.attackAnimationId;
Game_Enemy.prototype.attackAnimationId = function() {
    if (this.hasSVBattler() && !this.isHideSVWeapon()) {
      if (this._svAttackAnimationId) return this._svAttackAnimationId;
      this.setupSVAttributes();
      return this._svAttackAnimationId;
    }
    return Yanfly.SVE.Game_Enemy_attackAnimationId.call(this);
};

Game_Enemy.prototype.svBattlerName = function() {
    if (this._svBattlerName) return this._svBattlerName;
    var array = this.enemy().sideviewBattler;
    this._svBattlerName = Yanfly.Util.getRandomElement(array);
    return this._svBattlerName;
};

Game_Enemy.prototype.hasSVBattler = function() {
    return this.svBattlerName() !== undefined;
};

Game_Enemy.prototype.weaponImageId = function() {
    if (this.isHideSVWeapon()) return 0;
    if (this._svWeaponImageId) return this._svWeaponImageId;
    this.setupSVAttributes();
    return this._svWeaponImageId;
};

Game_Enemy.prototype.attackMotion = function() {
    if (this.weaponImageId() === 0) return this.enemy().sideviewAttackMotion;
    if (this._svAttackMotion) return this._svAttackMotion;
    this.setupSVAttributes();
    return this._svAttackMotion;
};

Game_Enemy.prototype.idleMotion = function() {
    if (this._svIdleMotion) return this._svIdleMotion;
    var array = this.enemy().sideviewIdleMotion;
    this._svIdleMotion = Yanfly.Util.getRandomElement(array);
    return this._svIdleMotion;
};

Game_Enemy.prototype.damageMotion = function() {
    return this.enemy().sideviewDmgMotion;
};

Game_Enemy.prototype.evadeMotion = function() {
    return this.enemy().sideviewEvadeMotion;
};

Game_Enemy.prototype.escapeMotion = function() {
    return this.enemy().sideviewEscMotion;
};

Game_Enemy.prototype.guardMotion = function() {
    return this.enemy().sideviewGuardMotion;
};

Game_Enemy.prototype.abnormalMotion = function() {
    return this.enemy().sideviewAbnMotion;
};

Game_Enemy.prototype.sleepMotion = function() {
    return this.enemy().sideviewSleepMotion;
};

Game_Enemy.prototype.dyingMotion = function() {
    return this.enemy().sideviewDyingMotion;
};

Game_Enemy.prototype.deadMotion = function() {
    return this.enemy().sideviewDeadMotion;
};

Game_Enemy.prototype.sideviewAnchorX = function() {
    return this.enemy().sideviewAnchorX;
};

Game_Enemy.prototype.sideviewAnchorY = function() {
    return this.enemy().sideviewAnchorY;
};

Game_Enemy.prototype.anchorX = function() {
    if (this.hasSVBattler()) return this.sideviewAnchorX();
    return Game_Battler.prototype.anchorX.call(this);
};

Game_Enemy.prototype.anchorY = function() {
    if (this.hasSVBattler()) return this.sideviewAnchorY();
    return Game_Battler.prototype.anchorY.call(this);
};

Game_Enemy.prototype.sideviewWidth = function() {
    return this.enemy().sideviewWidth;
};

Game_Enemy.prototype.sideviewHeight = function() {
    return this.enemy().sideviewHeight;
};

Game_Enemy.prototype.sideviewCollapse = function() {
    return this.enemy().sideviewCollapse;
};

Game_Enemy.prototype.showSideviewShadow = function() {
    return this.enemy().sideviewShadowShow;
};

Game_Enemy.prototype.sideviewShadowScaleX = function() {
    return this.enemy().sideviewShadowScaleX;
};

Game_Enemy.prototype.sideviewShadowScaleY = function() {
    return this.enemy().sideviewShadowScaleY;
};

Game_Enemy.prototype.spriteScaleX = function() {
    if (this.hasSVBattler()) return this.enemy().spriteScaleX * -1;
    return this.enemy().spriteScaleX;
};

Game_Enemy.prototype.spriteScaleY = function() {
    return this.enemy().spriteScaleY;
};

Game_Enemy.prototype.sideviewFrameSpeed = function() {
    return this.enemy().sideviewFrameSpeed;
};

Game_Enemy.prototype.performAttack = function() {
    if (!this.hasSVBattler()) {
      return Game_Battler.prototype.performAttack.call(this);
    }
    this.forceMotion(this.attackMotion());
    this.startWeaponAnimation(this.weaponImageId());
};

Game_Enemy.prototype.performAction = function(action) {
    if (!this.hasSVBattler()) {
      return Game_Battler.prototype.performAction.call(this, action);
    }
    Game_Actor.prototype.performAction.call(this, action);
};

Yanfly.SVE.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if (!this.hasSVBattler()) {
      return Yanfly.SVE.Game_Enemy_performDamage.call(this);
    }
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
      this.requestMotion(this.damageMotion());
    } else {
      $gameScreen.startShake(5, 5, 10);
    }
    SoundManager.playEnemyDamage();
};

Game_Enemy.prototype.performEvasion = function() {
    Game_Battler.prototype.performEvasion.call(this);
    if (!this.hasSVBattler()) return;
    this.requestMotion(this.evadeMotion());
};

Game_Enemy.prototype.performMagicEvasion = function() {
    Game_Battler.prototype.performMagicEvasion.call(this);
    if (!this.hasSVBattler()) return;
    this.requestMotion(this.evadeMotion());
};

Game_Enemy.prototype.performCounter = function() {
    Game_Battler.prototype.performCounter.call(this);
    if (!this.hasSVBattler()) return;
    this.performAttack();
};

Game_Enemy.prototype.performEscape = function() {
    if (!this.hasSVBattler()) return;
    if (!this.canMove()) return;
    this.requestMotion(this.escapeMotion());
};

Game_Enemy.prototype.isBreathing = function() {
    if (this.isDead()) return false;
    return this.enemy().sideviewBreathing;
};

Game_Enemy.prototype.breathingSpeed = function() {
    return this.enemy().sideviewBreathSpeed;
};

Game_Enemy.prototype.breathXRate = function() {
    return this.enemy().sideviewBreathXRate;
};

Game_Enemy.prototype.breathYRate = function() {
    return this.enemy().sideviewBreathYRate;
};

Game_Enemy.prototype.linkBreathing = function() {
    return this.enemy().sideviewLinkBreathing;
};

Game_Enemy.prototype.isFloating = function() {
    if (this.isDead() && !this.enemy().sideviewFloatDeath) return false;
    return this.enemy().sideviewFloating;
};

Game_Enemy.prototype.floatSpeed = function() {
    return this.enemy().sideviewFloatSpeed;
};

Game_Enemy.prototype.floatRate = function() {
    return this.enemy().sideviewFloatRate;
};

Game_Enemy.prototype.floatHeight = function() {
    return this.enemy().sideviewFloatHeight;
};

Game_Enemy.prototype.isHideSVWeapon = function() {
    var max = this.states().length;
    for (var i = 0; i < max; ++i) {
      var state = this.states()[i];
      if (state && state.hideSVWeapon) return true;
    }
    return false;
};

Yanfly.SVE.Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    this.clearSVAttributes();
    Yanfly.SVE.Game_Enemy_transform.call(this, enemyId);
    this.battler().setTransform(this);
    this.battler().setBattler(this);
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.SVE.Game_Party_requestMotionRefresh =
    Game_Party.prototype.requestMotionRefresh;
Game_Party.prototype.requestMotionRefresh = function() {
    Yanfly.SVE.Game_Party_requestMotionRefresh.call(this);
    $gameTroop.requestMotionRefresh();
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

Yanfly.SVE.Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    Yanfly.SVE.Sprite_Enemy_initMembers.call(this);
    this._battlerName = null;
    this.initSVSprites();
};

Sprite_Enemy.prototype.initSVSprites = function() {
    this._svRand = Math.random() * 10000;
    this._svBattlerName = '';
    this._motion = null;
    this._motionCount = 0;
    this._pattern = 0;
    this._svBattlerEnabled = false;
    this.createShadowSprite();
    this.createWeaponSprite();
    this.createMainSprite();
    this.createStateSprite();
    this._effectTarget = this;
};

Sprite_Enemy.prototype.setTransform = function(battler) {
    this._shadowSprite.opacity = 0;
    this._weaponSprite.opacity = 0;
    this._mainSprite.opacity = 0;
    this._stateSprite.opacity = 0;
    if (battler.svBattlerName()) {
      this.createShadowSprite();
      this.createWeaponSprite();
      this.createMainSprite();
      this.createStateSprite();
      this._shadowSprite.opacity = 255;
      this._weaponSprite.opacity = 255;
      this._mainSprite.opacity = 255;
      this._stateSprite.opacity = 255;
    }
};

Sprite_Enemy.prototype.createMainSprite = function() {
    Sprite_Actor.prototype.createMainSprite.call(this);
};

Sprite_Enemy.prototype.createShadowSprite = function() {
    this._shadowSprite = new Sprite();
    if (Yanfly.Param.SVESmoothing) {
      this._shadowSprite.bitmap = ImageManager.loadSystemSmooth('Shadow2');
    } else {
      this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow2');
    }    
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 0.5;
    this._shadowSprite.y = -2;
    this.addChild(this._shadowSprite);
    this._shadowSprite.opacity = 0;
};

Sprite_Enemy.prototype.createWeaponSprite = function() {
    Sprite_Actor.prototype.createWeaponSprite.call(this);
};

Sprite_Enemy.prototype.createStateSprite = function() {
    if (Imported.YEP_X_VisualStateFX) {
      if (!Yanfly.Param.VSFXEnemyOver) return;
    }
    Sprite_Actor.prototype.createStateSprite.call(this);
};

Yanfly.SVE.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    this._svBattlerEnabled = false;
    this.initSVSprites();
    Yanfly.SVE.Sprite_Enemy_setBattler.call(this, battler);
    this.setSVBattler(battler);
};

Sprite_Enemy.prototype.setMirror = function(value) {
    if (this._svBattlerEnabled) value = !value;
    Sprite_Battler.prototype.setMirror.call(this, value);
};

Sprite_Enemy.prototype.setSVBattler = function(battler) {
    if (!this._enemy) return;
    if (this._enemy.svBattlerName() === undefined) return;
    this._adjustMainBitmapSettings = false;
    this._actor = this._enemy;
    this._svBattlerEnabled = true;
    if (this._stateSprite) this._stateSprite.setup(battler);
};

Yanfly.SVE.Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    Yanfly.SVE.Sprite_Enemy_update.call(this);
    if (this._svBattlerEnabled) this.updateMotion();
    this.updateBreathing();
    if (!Imported.YEP_X_ActSeqPack2) this.updateStateIconHeight();
};

Yanfly.SVE.Sprite_Enemy_updateStateSprite =
    Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSprite = function() {
    if (this._enemy && this._enemy.hasSVBattler()) {
      this.updateSVStateSprite();
    } else {
      Yanfly.SVE.Sprite_Enemy_updateStateSprite.call(this);
    }
    this.updateFloatingStateSprite();
};

Sprite_Enemy.prototype.updateSVStateSprite = function() {
    if (!this._stateSprite) return;
    this._stateSprite.visible = this._enemy.enemy().sideviewStateOverlay;
    return;
    var height = this._enemy.spriteHeight() * -1;
    height -= Sprite_StateIcon._iconHeight;
    this._stateIconSprite.y = height;
    this._stateSprite.y = (this._enemy.spriteHeight() - 64) * -1;
};

Sprite_Enemy.prototype.updateFloatingStateSprite = function() {
    if (this._enemy && this._enemy.isFloating()) {
      var heightRate = this.addFloatingHeight();
      var height = this._enemy.spriteHeight();
      this._stateIconSprite.y += Math.ceil(heightRate * height);
      this._stateSprite.y += Math.ceil(heightRate * height);
    };
};

Sprite_Enemy.prototype.updateBreathing = function() {
    if (!this._enemy) return;
    if (this._enemy.isBreathing()) {
      var c = Graphics.frameCount + this._svRand;
      var s = this._enemy.breathingSpeed();
      var rateX = this._enemy.breathXRate();
      var rateY = this._enemy.breathYRate();
      if (this._enemy.linkBreathing()) s /= this._enemy.hpRate();
      var scaleX = Math.cos(c / s) * rateX;
      var scaleY = Math.cos(c / s) * rateY;
    } else {
      var scaleX = 0;
      var scaleY = 0;
    }
    var mirror = this.scale.x > 0 ? 1 : -1;
    this.scale.x = this._enemy.spriteScaleX() + scaleX;
    this.scale.x = Math.abs(this.scale.x) * mirror;
    this.scale.y = this._enemy.spriteScaleY() + scaleY;
};

if (Imported.YEP_X_ActSeqPack2) {

Yanfly.SVE.Sprite_Battler_getFloatHeight = 
    Sprite_Battler.prototype.getFloatHeight;
Sprite_Battler.prototype.getFloatHeight = function() {
    var value = Yanfly.SVE.Sprite_Battler_getFloatHeight.call(this);
    value -= this.addFloatingHeight();
    return value;
};

Sprite_Battler.prototype.addFloatingHeight = function() {
    value = 0;
    if (this._enemy && this._enemy.isFloating()) {
      var c = Graphics.frameCount + this._svRand;
      var s = this._enemy.floatSpeed();
      var rate = this._enemy.floatRate();
      value += Math.cos(c / s) * rate - rate;
      var height = this._enemy.floatHeight();
      value -= height / this._enemy.spriteHeight();
    }
    return value;
};

} else { // If YEP_X_ActSeqPack2 is NOT installed

Sprite_Enemy.prototype.updateStateIconHeight = function() {
  if (!this._stateIconSprite) return;
  var height = this._battler.spriteHeight() * -1;
  height -= Sprite_StateIcon._iconHeight;
  height /= this.scale.y;
  this._stateIconSprite.y = height;
};

} // Imported.YEP_X_ActSeqPack2

Yanfly.SVE.Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
    Yanfly.SVE.Sprite_Enemy_updateBitmap.call(this);
    if (!this._svBattlerEnabled) this.updateScale();
    this.updateSVBitmap();
    this.adjustAnchor();
};

Sprite_Enemy.prototype.updateSVBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var name = this._enemy.svBattlerName();
    if (this._svBattlerEnabled && this._svBattlerName !== name) {
      this._createdDummyMainSprite = false;
      this._svBattlerName = name;
      this._mainSprite.bitmap = ImageManager.loadSvActor(name);
      this.adjustAnchor();
      this.refreshMotion();
      this.updateScale();
    } else if (this._svBattlerName === '') {
      this._svBattlerName = '';
      this._svBattlerEnabled = false;
      if (this._createdDummyMainSprite) return;
      this._createdDummyMainSprite = true;
      this._mainSprite = new Sprite_Base();
      this._mainSprite.anchor.x = 0.5;
      this._mainSprite.anchor.y = 1;
    }
};

Sprite_Enemy.prototype.adjustAnchor = function() {
    if (!this._mainSprite) return;
    this._mainSprite.anchor.x = this._enemy.sideviewAnchorX();
    this._mainSprite.anchor.y = this._enemy.sideviewAnchorY();
};

Sprite_Enemy.prototype.updateScale = function() {
    this.scale.x = this._enemy.spriteScaleX();
    this.scale.y = this._enemy.spriteScaleY();
    if (this._stateIconSprite) {
      var safe = 1 / 100000;
      var sprite = this._stateIconSprite;
      sprite.scale.x = 1 / Math.max(safe, Math.abs(this.scale.x));
      sprite.scale.y = 1 / Math.max(safe, Math.abs(this.scale.y));
    }
};

Yanfly.SVE.Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function() {
    if (this._svBattlerEnabled) return this.updateSVFrame();
    Yanfly.SVE.Sprite_Enemy_updateFrame.call(this);
};

Sprite_Enemy.prototype.updateSVFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    var bitmap = this._mainSprite.bitmap;
    if (bitmap.width <= 0) return;
    this._effectTarget = this._mainSprite;
    var motionIndex = this._motion ? this._motion.index : 0;
    var pattern = this._pattern < 3 ? this._pattern : 1;
    var cw = bitmap.width / 9;
    var ch = bitmap.height / 6;
    var cx = Math.floor(motionIndex / 6) * 3 + pattern;
    var cy = motionIndex % 6;
    var cdh = 0;
    if (this._effectType === 'bossCollapse') {
      cdh = ch - this._effectDuration;
    }
    // this.setFrame(cx * cw, cy * ch, cw, ch);
    this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch - cdh);
    this.adjustMainBitmapSettings(bitmap);
    this.adjustSVShadowSettings();
};

Sprite_Enemy.prototype.adjustMainBitmapSettings = function(bitmap) {
    if (this._adjustMainBitmapSettings) return;
    this._adjustMainBitmapSettings = true;
    var svw = this._enemy.sideviewWidth();
    var svh = this._enemy.sideviewHeight();
    if (svw === 'auto') svw = bitmap.width / 9;
    if (svh === 'auto') svh = bitmap.height / 6;
    svw = Math.floor(Math.abs(svw * this._enemy.spriteScaleX()));
    svh = Math.floor(Math.abs(svh * this._enemy.spriteScaleY()));
    this.bitmap = new Bitmap(svw, svh);
};

Sprite_Enemy.prototype.adjustSVShadowSettings = function() {
    if (this._enemy.showSideviewShadow()) this._shadowSprite.opacity = 255;
    var scaleX = this._enemy.sideviewShadowScaleX();
    var scaleY = this._enemy.sideviewShadowScaleY();
    if (scaleX === 'auto') scaleX = this._mainSprite.bitmap.width / 9 / 64;
    if (scaleY === 'auto') scaleY = this._mainSprite.bitmap.width / 9 / 64;
    this._shadowSprite.scale.x = scaleX;
    this._shadowSprite.scale.y = scaleY;
};

Sprite_Enemy.prototype.updateMotion = function() {
    if (!this._svBattlerEnabled) return;
    this.setupMotion();
    this.setupWeaponAnimation();
    if (this._enemy.isMotionRefreshRequested()) {
      Sprite_Actor.prototype.refreshMotion.call(this);
      this._enemy.clearMotion();
    }
    this.updateMotionCount();
};

Sprite_Enemy.prototype.setupMotion = function() {
    if (!this._svBattlerEnabled) return;
    if (!this._enemy.isMotionRequested()) return;
    this.startMotion(this._enemy.motionType());
    this._enemy.clearMotion();
};

Sprite_Enemy.prototype.startMotion = function(motionType) {
    if (!this._svBattlerEnabled) return;
    var newMotion = Sprite_Actor.MOTIONS[motionType];
    if (this._motion === newMotion) return;
    this._motion = newMotion;
    this._motionCount = 0;
    this._pattern = 0;
};

Sprite_Enemy.prototype.setupWeaponAnimation = function() {
    if (!this._svBattlerEnabled) return;
    if (!this._enemy.isWeaponAnimationRequested()) return;
    this._weaponSprite.setup(this._enemy.weaponImageId());
    this._enemy.clearWeaponAnimation();
};

Sprite_Enemy.prototype.updateMotionCount = function() {
    if (!this._svBattlerEnabled) return;
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
      if (this._motion.loop) {
        this._pattern = (this._pattern + 1) % 4;
      } else if (this._pattern < 2) {
        this._pattern++;
      } else if (this._pattern >= 2) {
        this.startMotion(this._enemy.idleMotion());
      } else {
        this.refreshMotion();
      }
      this._motionCount = 0;
    }
};

Sprite_Enemy.prototype.refreshMotion = function() {
    if (!this._svBattlerEnabled) return;
    var enemy = this._enemy;
    if (!enemy) return;
    var motionGuard = Sprite_Actor.MOTIONS['guard'];
    if (this._motion === motionGuard && !BattleManager.isInputting()) return;
    var stateMotion = enemy.stateMotionIndex();
    if (enemy.isInputting() || enemy.isActing()) {
        this.startMotion('walk');
    } else if (stateMotion === 3) {
        this.startMotion(enemy.deadMotion());
    } else if (stateMotion === 2) {
        this.startMotion(enemy.sleepMotion());
    } else if (enemy.isGuard() || enemy.isGuardWaiting()) {
        this.startMotion(enemy.guardMotion());
    } else if (stateMotion === 1) {
        this.startMotion(enemy.abnormalMotion());
    } else if (enemy.isDying()) {
        this.startMotion(enemy.dyingMotion());
    } else {
        this.startMotion(enemy.idleMotion());
    }
};

Sprite_Enemy.prototype.motionSpeed = function() {
    if (!this._enemy) return 12;
    return this._enemy.sideviewFrameSpeed() || 12;
};

Sprite_Enemy.prototype.updateSelectionEffect = function() {
    if (!this._svBattlerEnabled) {
      return Sprite_Battler.prototype.updateSelectionEffect.call(this);
    }
    var target = this._mainSprite;
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            target.setBlendColor([255, 255, 255, 64]);
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
    }
};

Sprite_Enemy.prototype.isSideviewCollapse = function() {
    if (!this._svBattlerEnabled) return true;
    return this._enemy.sideviewCollapse();
};

Yanfly.SVE.Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
Sprite_Enemy.prototype.updateCollapse = function() {
    if (!this.isSideviewCollapse()) return;
    if (this._svBattlerEnabled) {
      this._mainSprite.blendMode = Graphics.BLEND_ADD;
      this._mainSprite.setBlendColor([255, 128, 128, 128]);
      this.opacity *= this._effectDuration / (this._effectDuration + 1);
    } else {
      Yanfly.SVE.Sprite_Enemy_updateCollapse.call(this);
    }
};

Yanfly.SVE.Sprite_Enemy_startBossCollapse =
    Sprite_Enemy.prototype.startBossCollapse;
Sprite_Enemy.prototype.startBossCollapse = function() {
    if (this._svBattlerEnabled) {
      this._effectDuration = Math.ceil(this._mainSprite.height * this.scale.y);
    this._appeared = false;
    } else {
      Yanfly.SVE.Sprite_Enemy_startBossCollapse.call(this);
    }
};

Yanfly.SVE.Sprite_Enemy_updateBossCollapse =
    Sprite_Enemy.prototype.updateBossCollapse;
Sprite_Enemy.prototype.updateBossCollapse = function() {
    if (!this.isSideviewCollapse()) return;
    if (this._svBattlerEnabled) {
      this._shake = this._effectDuration % 2 * 4 - 2;
      this._mainSprite.blendMode = Graphics.BLEND_ADD;
      this._mainSprite.setBlendColor([255, 255, 255, 255 - this.opacity]);
      this.opacity *= this._effectDuration / (this._effectDuration + 1);
      if (this._effectDuration % 20 === 19) {
        SoundManager.playBossCollapse2();
      }
    } else {
      Yanfly.SVE.Sprite_Enemy_updateBossCollapse.call(this);
    }
};

Yanfly.SVE.Sprite_Enemy_updateInstantCollapse =
    Sprite_Enemy.prototype.updateInstantCollapse;
Sprite_Enemy.prototype.updateInstantCollapse = function() {
    if (!this.isSideviewCollapse()) return;
    Yanfly.SVE.Sprite_Enemy_updateInstantCollapse.call(this);
};

Sprite_Enemy.prototype.forceMotion = function(motionType) {
    var newMotion = Sprite_Actor.MOTIONS[motionType];
    this._motion = newMotion;
    this._motionCount = 0;
    this._pattern = 0;
};

//=============================================================================
// Sprite_Animation
// ----------------------------------------------------------------------------
// Code provided by SwiftIllusion and YoraeRasante
//=============================================================================

Yanfly.SVE.Sprite_Animation_updatePosition = 
  Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
  Yanfly.SVE.Sprite_Animation_updatePosition.call(this);
  this.updateSvePosition();
};

Sprite_Animation.prototype.updateSvePosition = function() {
  if (typeof this._target.parent._battler != 'undefined' && this._target.parent._battler.isEnemy() && typeof this._target.parent._mainSprite != 'undefined'){
    if (this._animation.position !== 3) {
      if (this._animation.position === 0) {
        this.y += this._target.parent._mainSprite.height - this._target.parent.texture.height;
      } else if (this._animation.position === 1) {
        this.y += (this._target.parent._mainSprite.height - this._target.parent.texture.height) / 2;
      }
    }
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRandomElement = function(array) {
    var value = array[Math.floor(Math.random() * array.length)];
    return value;
};

//=============================================================================
// End of File
//=============================================================================
} else { // Yanfly.BEC.version

var text = '================================================================\n';
text += 'YEP_X_AnimatedSVEnemies requires YEP_BattleEngineCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_BattleEngineCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Yanfly.BEC.version
}; // YEP_BattleEngineCore