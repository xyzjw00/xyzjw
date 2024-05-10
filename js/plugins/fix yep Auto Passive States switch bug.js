// Fix for switch conditions
Game_Map.prototype.refresh = function() {
    this.events().forEach(function(event) {
        event.refresh();
    });
    this._commonEvents.forEach(function(event) {
        event.refresh();
    });
    this.refreshTileEvents();
    $gamePlayer.refresh();
    this._needsRefresh = false;
};