Game_Action.prototype.isForAll = function() {
    return this.checkItemScope([2, 8, 10, "EVERYBODY"]);
};