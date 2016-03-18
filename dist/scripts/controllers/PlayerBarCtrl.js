(function() {
	function PlayerBarCtrl(Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		//this.onChange 
	}
	
	angular
	.module('blocJams')
	.controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
	
})();