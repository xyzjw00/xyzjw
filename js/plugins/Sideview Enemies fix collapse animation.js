Sprite_Enemy.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
    if (this._svBattlerEnabled)
    {
        this._mainSprite.setBlendColor([0, 0, 0, 0]);
        this._mainSprite.blendMode=0;
    }
};