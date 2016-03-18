(function(){
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};
		
		/** 
			@desc retrieves album info from the getAlbum function
			@type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
		/** 
			@function getSongIndex
			@desc  gets song number
			@type {object} song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		var stopSong = function(){
			currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
		};
		
		
		/**
		@ desc Buzz object audio file
		@type {Object}
		*/
		var currentBuzzObject = null;
		/**
			@function setSong
			@desc Stopes currently playing song and loads new audio file as currentBuzzObject
			@param {object} song
		*/
		
		var setSong = function(song) {
			if(currentBuzzObject){
				stopSong();
					
			}else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			currentBuzzObject.bind('timeupdate', function(){
				$rootScope.$apply(function(){
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});
			
			SongPlayer.currentSong = song;
		};
		
		SongPlayer.currentSong = null;
		
		/**
		* @desc Current playback time in seconds of currently playing song
		*/
		
		SongPlayer.currentTime = null;
		
		var playSong = function(song){
		currentBuzzObject.play();
			song.playing = true;
		};
		
		SongPlayer.play = function(song){
			song = song || SongPlayer.currentSong;
			
			if(SongPlayer.currentSong !== song){
				
			setSong(song);
			playSong(song);	
			
				
			}
		};
		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
			
				currentSongIndex = currentAlbum.songs.length -1;
			} 
			var song = currentAlbum.songs[currentSongIndex];
			setSong(song);
			playSong(song);
		  
			
		};
		SongPlayer.next = function() {
			
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if (currentSongIndex > currentAlbum.songs.length - 1){
				currentSongIndex = 0;
			}
			var song = currentAlbum.songs[currentSongIndex];
			setSong(song);
			playSong(song);
			
			
		};
		
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer',['$rootScope', 'Fixtures', SongPlayer]);
	
	
})();