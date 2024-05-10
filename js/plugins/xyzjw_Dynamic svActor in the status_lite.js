// Scene_Status
//
// The scene class of the status screen.

function Scene_Status() {
    this.initialize.apply(this, arguments);
}

Scene_Status.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Status.prototype.constructor = Scene_Status;


//初始化
Scene_Status.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

//建立視窗（Window_Status） & 自創方法
Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._statusWindow = new Window_Status();
    this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
    this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._statusWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._statusWindow.reserveFaceImages();
    this.addWindow(this._statusWindow);
	
	//自創方法
	this.createSvActor();            //繪製角色戰鬥圖（Sprite_Base）
	this.createSvShadow();           //建立角色陰影圖（Sprite_Base）
	
};


//建立角色戰鬥圖
Scene_Status.prototype.createSvActor = function() {
	
	//資料庫：角色_圖像_戰鬥圖
	var sv1 = $gameActors.actor(1)._battlerName;
	var sv2 = $gameActors.actor(2)._battlerName;
	var sv3 = $gameActors.actor(3)._battlerName;
	var sv4 = $gameActors.actor(4)._battlerName;
	var sv5 = $gameActors.actor(5)._battlerName;
	var sv6 = $gameActors.actor(6)._battlerName;
	var sv9 = $gameActors.actor(9)._battlerName;
	var sv10 = $gameActors.actor(10)._battlerName;
	var sv16 = $gameActors.actor(16)._battlerName;
	var sv17 = $gameActors.actor(17)._battlerName;
	var sv18 = $gameActors.actor(18)._battlerName;
	var sv19 = $gameActors.actor(19)._battlerName;
	var sv21 = $gameActors.actor(21)._battlerName;
	var sv22 = $gameActors.actor(22)._battlerName;
	var sv23 = $gameActors.actor(23)._battlerName;
	var sv31 = $gameActors.actor(31)._battlerName;
	var sv32 = $gameActors.actor(32)._battlerName;
		
	
	
	//定義 sprite, bitmap
	this._SvActor_1 = new Sprite_Base();
	this._SvActor_1.bitmap = ImageManager.loadSvActor(sv1);
	
	this._SvActor_2 = new Sprite_Base();
	this._SvActor_2.bitmap = ImageManager.loadSvActor(sv2);
	
	this._SvActor_3 = new Sprite_Base();
	this._SvActor_3.bitmap = ImageManager.loadSvActor(sv3);
	
	this._SvActor_4 = new Sprite_Base();
	this._SvActor_4.bitmap = ImageManager.loadSvActor(sv4);
	
	this._SvActor_5 = new Sprite_Base();
	this._SvActor_5.bitmap = ImageManager.loadSvActor(sv5);
	
	this._SvActor_6 = new Sprite_Base();
	this._SvActor_6.bitmap = ImageManager.loadSvActor(sv6);
	
	this._SvActor_9 = new Sprite_Base();
	this._SvActor_9.bitmap = ImageManager.loadSvActor(sv9);
	
	this._SvActor_10 = new Sprite_Base();
	this._SvActor_10.bitmap = ImageManager.loadSvActor(sv10);
	
	this._SvActor_16 = new Sprite_Base();
	this._SvActor_16.bitmap = ImageManager.loadSvActor(sv16);
	
	this._SvActor_17 = new Sprite_Base();
	this._SvActor_17.bitmap = ImageManager.loadSvActor(sv17);
	
	this._SvActor_18 = new Sprite_Base();
	this._SvActor_18.bitmap = ImageManager.loadSvActor(sv18);
	
	this._SvActor_19 = new Sprite_Base();
	this._SvActor_19.bitmap = ImageManager.loadSvActor(sv19);
	
	this._SvActor_21 = new Sprite_Base();
	this._SvActor_21.bitmap = ImageManager.loadSvActor(sv21);
	
	this._SvActor_22 = new Sprite_Base();
	this._SvActor_22.bitmap = ImageManager.loadSvActor(sv22);
	
	this._SvActor_23 = new Sprite_Base();
	this._SvActor_23.bitmap = ImageManager.loadSvActor(sv23);
	
	this._SvActor_31 = new Sprite_Base();
	this._SvActor_31.bitmap = ImageManager.loadSvActor(sv31);
	
	this._SvActor_32 = new Sprite_Base();
	this._SvActor_32.bitmap = ImageManager.loadSvActor(sv32);
	
}

//建立角色陰影圖
Scene_Status.prototype.createSvShadow = function() {
	
	//定義 sprite, bitmap, x, y
	this._shadowSprite = new Sprite_Base();
	this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow2');
        this._shadowSprite.x = 830;           
	this._shadowSprite.y = 403;           
	this.addChild(this._shadowSprite);    //最先添加的子元素，所以會位於最下方
}

//場景開始
Scene_Status.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshActor();       //刷新角色
	this.refreshSvActor();     //刷新角色戰鬥圖
    

};

//刷新角色
Scene_Status.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
};



//刷新角色戰鬥圖
Scene_Status.prototype.refreshSvActor = function() {

    //移除 mainSprite
	this.removeChild(this._mainSprite);
	
	//定義 mainSprite 的 x, y
	var x = 835;         
	var y = 360;         

    //獲取選單角色 ID
    var actorId = $gameParty.menuActor()._actorId;
	
	switch (actorId) {
	    case 1:
             this.addChild(this._SvActor_1);
			 this._mainSprite = this._SvActor_1;
        break;			 
		
		case 2:
             this.addChild(this._SvActor_2);
			 this._mainSprite = this._SvActor_2;
        break;			 
		
		case 3:
             this.addChild(this._SvActor_3);
			 this._mainSprite = this._SvActor_3;
        break;		
		
		case 4:
             this.addChild(this._SvActor_4);
			 this._mainSprite = this._SvActor_4;
        break;		
		
		case 5:
             this.addChild(this._SvActor_5);
			 this._mainSprite = this._SvActor_5;
        break;			
		
		case 6:
             this.addChild(this._SvActor_6);
			 this._mainSprite = this._SvActor_6;
        break;			
		
		case 9:
             this.addChild(this._SvActor_9);
			 this._mainSprite = this._SvActor_9;
        break;			
		
		case 10:
             this.addChild(this._SvActor_10);
			 this._mainSprite = this._SvActor_10;
        break;			
		
		case 16:
             this.addChild(this._SvActor_16);
			 this._mainSprite = this._SvActor_16;
        break;			
		
		case 17:
             this.addChild(this._SvActor_17);
			 this._mainSprite = this._SvActor_17;
        break;			
		
		case 18:
             this.addChild(this._SvActor_18);
			 this._mainSprite = this._SvActor_18;
        break;			
		
		case 19:
             this.addChild(this._SvActor_19);
			 this._mainSprite = this._SvActor_19;
        break;			
		
		case 21:
             this.addChild(this._SvActor_21);
			 this._mainSprite = this._SvActor_21;
        break;			
		
		
		case 22:
             this.addChild(this._SvActor_22);
			 this._mainSprite = this._SvActor_22;
        break;			
		
		case 23:
             this.addChild(this._SvActor_23);
			 this._mainSprite = this._SvActor_23;
        break;			
		
		case 31:
             this.addChild(this._SvActor_31);
			 this._mainSprite = this._SvActor_31;
        break;	
        
        case 32:
             this.addChild(this._SvActor_32);
			 this._mainSprite = this._SvActor_32;
        break;			
		
		
	}
	
	//定義 mainSprite 的 x, y
	this._mainSprite.x = x;
	this._mainSprite.y = y;
	
	//定義動作索引、動作速度、動作計數
	this._motionIndex = Math.ceil(Math.random() * 17);  //每次刷新隨機抽取 0 ~ 17 的動作展示
	this._motionSpeed = 12;
	this._motionCount = 0;
}

//切換角色
Scene_Status.prototype.onActorChange = function() {
    this.refreshActor();                //刷新角色
    this.refreshSvActor();              //刷新角色戰鬥圖
    this._statusWindow.activate();      //狀態視窗啟動
};

//動態更新
Scene_Status.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
	
	//更新角色戰鬥圖動作動畫
	this.updateSvActor();

}



//更新角色戰鬥圖動作動畫
Scene_Status.prototype.updateSvActor = function() {

     //調整動作動畫計數
	 if (this._motionCount < 3 * this._motionSpeed - 1) {
		 this._motionCount += 1;
	 } else {
		 this._motionCount = 0;
		 
	 }

     //定義 bitmap, motionIndex, pattern...
	 var bitmap = this._mainSprite.bitmap;
	 var motionIndex = this._motionIndex;
	 var pattern = Math.floor(this._motionCount / this._motionSpeed);
	 var cw = bitmap.width / 9;
	 var ch = bitmap.height / 6;
	 var cx = Math.floor(motionIndex / 6) * 3 + pattern;
	 var cy = motionIndex % 6;
	 this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
	
}


// Window_Status
//
// The window for displaying full status on the status screen.

function Window_Status() {
    this.initialize.apply(this, arguments);
}

Window_Status.prototype = Object.create(Window_Selectable.prototype);
Window_Status.prototype.constructor = Window_Status;

//初始化
Window_Status.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this._actor = null;
    this.refresh();
    this.activate();
};

//設定狀態視窗的角色
Window_Status.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

//刷新（繪製區域 1~4 & 水平線）
Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0.2);
        this.drawHorzLine(lineHeight * 1);
        this.drawBlock2(lineHeight * 2);
        this.drawHorzLine(lineHeight * 6);
        this.drawBlock3(lineHeight * 7);
        this.drawHorzLine(lineHeight * 13);
        this.drawBlock4(lineHeight * 14);
    }
};

//狀態視窗的行高
Window_Status.prototype.lineHeight = function() {
    return 38;
};

//狀態視窗調整文字大小
Window_Status.prototype.makeFontBigger * function() {
	if (this.contents.fontSize <= 96) {
		this.contents.fontSize += 4;
	}
};

Window_Status.prototype.makeFontSmaller = function() {
	if (this.contents.fontSize >= 24) {
		this.contents.fontSize -= 4;
	}
};

//------------------------------------------------------------
//------------------------------------------------------------
//繪製區域 1
Window_Status.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 48, y);
    this.drawActorClass(this._actor, 240, y);
    this.drawActorNickname(this._actor, 490, y);
	
};

//------------------------------------------------------------
//------------------------------------------------------------
//繪製區域 2
Window_Status.prototype.drawBlock2 = function(y) {
	var width = 200;
	this.makeFontSmaller();
    this.drawActorFace(this._actor, 30, y);
    this.drawBasicInfo(240, y);
    this.drawExpInfo(490, y);
	this.drawActorCharacter(this._actor, 845, 203);         //繪製角色行走圖
	this.drawActorIcons(this._actor, 780, y + 20, width);   //異常狀態 Icon 
	//this.makeFontBigger();                                //字體變大
};


//繪製基本資料（區域 2 的 function）
Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
	var width = 186;
    this.drawActorLevel(this._actor, x, y + lineHeight * 0, width);
    this.drawActorHp(this._actor, x, y + lineHeight * 1, width);
    this.drawActorMp(this._actor, x, y + lineHeight * 2, width);
    this.drawActorTp(this._actor, x, y + lineHeight * 3, width);
};

	//繪製角色等級（基本資料的 function）
	Window_Status.prototype.drawActorLevel = function(actor, x, y, width) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.levelA, x, y, 48);
		this.resetTextColor();
		this.drawText(actor.level, x, y, width, 'right');
	};

	//繪製角色 HP （基本資料的 function）
	Window_Status.prototype.drawActorHp = function(actor, x, y, width) {
		var color1 = this.hpGaugeColor1();
		var color2 = this.hpGaugeColor2();
		this.changeTextColor(this.systemColor());
		this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
		this.drawText(TextManager.hpA, x, y, 44);
		this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
							   this.hpColor(actor), this.normalColor());
	};

	//繪製角色 MP （基本資料的 function）
	Window_Status.prototype.drawActorMp = function(actor, x, y, width) {
		var color1 = this.mpGaugeColor1();
		var color2 = this.mpGaugeColor2();
		this.changeTextColor(this.systemColor());
		this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
		this.drawText(TextManager.mpA, x, y, 44);
		this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
							   this.mpColor(actor), this.normalColor());
	};

	//繪製角色 TP （基本資料的 function）
	Window_Status.prototype.drawActorTp = function(actor, x, y, width) {
		var color1 = this.tpGaugeColor1();
		var color2 = this.tpGaugeColor2();
		this.changeTextColor(this.systemColor());
		this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
		this.drawText(TextManager.tpA, x, y, 44);
		this.changeTextColor(this.tpColor(actor));
		this.drawText(actor.tp, x + width - 64, y, 64, 'right');
	};

//繪製經驗值資料（區域 2 的 function）
Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
	var width = 180;
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, width);
    this.drawText(expNext, x, y + lineHeight * 2, width);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, width, 'right');
    this.drawText(value2, x, y + lineHeight * 3, width, 'right');
};



//------------------------------------------------------------
//------------------------------------------------------------
//繪製區域 3
Window_Status.prototype.drawBlock3 = function(y) {
	//this.makeFontSmaller();
    this.drawParameters(30, y);
    this.drawEquipments(240, y);
	//this.makeFontBigger();
};

//繪製參數（區域 3 的 function)
Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
    }
};

//繪製裝備（區域 3 的 function）
Window_Status.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i = 0; i < count - 4; i++) {
        this.drawItemName(equips[i], x + 70, y + this.lineHeight() * i * 1.5);
    }
	for (var i = 4; i < count; i++) {
        this.drawItemName(equips[i], x + 280, y - 228 + this.lineHeight() * i * 1.5);
    }
};

Window_Status.prototype.drawProfile = function(x, y) {
    this.drawTextEx(this._actor.profile(), x, y);
};

Window_Status.prototype.maxEquipmentLines = function() {
    return 8;
};

	//繪製裝備的最大數量（區域 3 的 function）
	Window_Status.prototype.maxEquipmentLines = function() {
		return 8;
	};

	//繪製裝備的 Icon 與名稱（繪製裝備的 function）
	Window_Status.prototype.drawItemName = function(item, x, y, width) {
		width = width || 312;
		if (item) {
			var iconBoxWidth = Window_Base._iconWidth;
			this.resetTextColor();
			this.drawIcon(item.iconIndex, x + 2, y + 2);
			this.drawText(item.name, x + iconBoxWidth + 18, y, width - iconBoxWidth);
		}
	};

//------------------------------------------------------------
//------------------------------------------------------------
//繪製區域 4
Window_Status.prototype.drawBlock4 = function(y) {
    this.drawProfile(30, y);
};

//繪製個人檔案（區域 4 的 function）
Window_Status.prototype.drawProfile = function(x, y) {
    this.drawTextEx(this._actor.profile(), x, y);
};

//------------------------------------------------------------
//------------------------------------------------------------
//繪製水平線
Window_Status.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

//繪製水平線的顏色
Window_Status.prototype.lineColor = function() {
    return this.normalColor();
};









