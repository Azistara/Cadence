 const setNowPlayingArtAndTitle = async (path) =>{
  let artAndTitle = await window.electronAPI.loadArt(path);
  let title = artAndTitle.songTitle;
  if(title.length > 37){
    title = title.substring(0, 37);
    title += "...";
  }
  document.getElementById('now-playing-img').src = artAndTitle.picture;
  document.getElementById('now-playing-title').innerText = title; 
  pushToRecentlyPlayed(artAndTitle.picture, artAndTitle.songTitle, path);
}




let songQueue = [];

//HTMLMediaElement
let audio = undefined; //the one and only audio object. It is global and referenced by multiple browser side js files so be careful with it!!!

let playButton    =    document.getElementById("play-button");
let stopButton    =    document.getElementById('stop-button');
let volumeButton  =    document.getElementById('volume-button');
let volumeSlider  =    document.getElementById('volume-slider');
let forwardButton =    document.getElementById("forward-button");
let prevButton    =    document.getElementById('prev-button');
let shuffleButton =    document.getElementById('shuffle-button');
let uiQueue       =    document.getElementById('queue-list');
let clearQueueButton = document.getElementById('clear-queue');
let progressEl    =    document.getElementById("seek-bar");
let mouseDownOnSlider = false; //keep track of when mouse is selecting slider
volumeSlider.style.display = 'none'; 
let searchButton  =    document.getElementsByClassName('search-button')[0]; 
let searchBar     =    document.getElementById('search-bar');
let fullScreenButton = document.getElementById('full-screen-button');
let currentPlayTime = document.getElementById("now-playing-timestamp");
let currentTimeLeft = document.getElementById("now-playing-time-left");
let recent1 =  document.querySelector("#recent4");
let caption1 = document.querySelector("#recent-caption4");

let recent2 =  document.querySelector("#recent3");
let caption2 = document.querySelector("#recent-caption3");

let recent3 =  document.querySelector("#recent2");
let caption3 = document.querySelector("#recent-caption2");

let recent4 =  document.querySelector("#recent1");
let caption4 = document.querySelector("#recent-caption1");

//START CONTROL PANEL BUTTONS

 let playMp3 = (path) => {
  if(path){
    if(audio !==undefined){
      audio.setAttribute('src', path); //set the current song to the song at the front of the queue
      audio.load(); //load new song so that it doesn't play the old song.
    }
    else{//no audio has been set up yet.
      //SET UP THE AUDIO OBJECT
        audio = new Audio(path); //html media object

        //configure the audio global object and the seekbar
        audio.addEventListener("loadeddata", () => {
          progressEl.value = 0;
        });

        audio.addEventListener("timeupdate", () => { //update the seek bar based on the audio's current time in playback
          if (!mouseDownOnSlider) {
            progressEl.value = audio.currentTime / audio.duration * 100;
            currentPlayTime.innerText = formatDuration(audio.currentTime);
            currentTimeLeft.innerText = formatDuration(audio.duration - audio.currentTime);
          }
        });

        progressEl.addEventListener("change", () => {  //update the song's position when the user uses the slider.
          const pct = progressEl.value / 100;
          audio.currentTime = (audio.duration || 0) * pct;
        });

        progressEl.addEventListener("mousedown", () => { //just to take care of a bug where user hovers over slider and activates it.
          mouseDownOnSlider = true;
        });

        progressEl.addEventListener("mouseup", () => {
          mouseDownOnSlider = false;
        });

        if(audio){
          audio.addEventListener('ended', () => {playNextSong(); }); //play next song in queue when current song finishes.
          }
        //END SETUP THE AUDIO OBJECT
    }
    songQueue.push(path); //push the song that is now playing into the 
    addSongToUIQueue(path, songQueue.length);
    
  }
   //play the audio
    audio.play();
  //change the audio button to a pause button
  playButton.removeEventListener('click', playMp3);
  playButton.addEventListener('click', pauseMp3);
  playButton.style.backgroundImage = "url('./resources/svg/media/az-pause.svg')"; //toggle display to pause button 

  //update the now playing song title and album
  setNowPlayingArtAndTitle(path);
  };



let pauseMp3 = () =>{
  audio.pause();
  //change the audio button to a play button
  playButton.removeEventListener('click', pauseMp3);
  playButton.addEventListener('click', function(){playMp3();});
  playButton.style.backgroundImage = "url('./resources/svg/media/az-play.svg')"; //toggle the button to display a play arrow now
};
playButton.addEventListener('click', playMp3);


let stopMp3 = () =>{
  pauseMp3(); //pause the audio 
  audio.currentTime = 0; //reset to beginning of the song
}
stopButton.addEventListener('click', stopMp3);


let playNextSong = () => {
  songQueue.push(songQueue.shift()); //put finished song at end of queue
  audio.setAttribute('src', songQueue[0]); //set the current song to the song at the front of the queue
  audio.load(); //load new song so that it doesn't play the old song.
  playMp3(); //start playing the current song
  setNowPlayingArtAndTitle(songQueue[0]); //and switch to display the new song playing.
  //clear the queue
  while (uiQueue.firstChild) { // TODO: save the first child maybe add it back after it is deleted
    uiQueue.removeChild(uiQueue.lastChild);
  }
  //add all songs in js songQueue to UI queue
songQueue.forEach(song => {
  addSongToUIQueue(song);
});
}

forwardButton.addEventListener('click', playNextSong);

let playPreviousSong = () =>{
  songQueue.unshift(songQueue.pop()); //move last song to front of queue
  audio.setAttribute('src', songQueue[0]); //set the current song to the song at the front of the queue
  audio.load(); //load new song so that it doesn't play the old song.
  playMp3(); //start playing the current song
  setNowPlayingArtAndTitle(songQueue[0]); //and switch to display the new song playing.
  //clear the queue
  while (uiQueue.firstChild) {
    uiQueue.removeChild(uiQueue.lastChild);
  }
  //add all songs in js songQueue to UI queue
songQueue.forEach(song => {
  addSongToUIQueue(song);
});
};
prevButton.addEventListener('click', playPreviousSong);



function shuffleArray(array) {  //durstenfeld shuffle algorithm https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
let shuffleQueue = () =>{
  shuffleArray(songQueue);
}

shuffleButton.addEventListener('click', shuffleQueue);

let toggleVolumeSlider = () =>{ //display  slider above the volume button
  if(volumeSlider.style.display === 'none'){
    volumeSlider.style.display = 'block';
  }
  else{
    volumeSlider.style.display = 'none';
  }
}
volumeButton.addEventListener('click', toggleVolumeSlider);

volumeSlider.oninput = function() {audio.volume =  (volumeSlider.value / 100); };

recent1.addEventListener("click", (event) => {playMp3(event.target.value);});
recent2.addEventListener("click", (event) => {playMp3(event.target.value);});
recent3.addEventListener("click", (event) => {playMp3(event.target.value);});
recent4.addEventListener("click", (event) => {playMp3(event.target.value);});


//END CONTROL PANEL BUTTONS

//START QUEUE FUNCTIONS

let addSongToUIQueue = (newSong, index) =>{
  
  //create the container
const queueItem = document.createElement('div');
queueItem.classList.add('queue-item');
queueItem.id = "queue-item-" + index;
  //create the songTitle
  const songTitle = document.createElement("p");
  //erase the first 17 characters from the new song string
  songTitleText = newSong.substring(20, newSong.length-4);

  const regex = /[^a-zA-Z\d\s:]/g;
  songTitleText = songTitleText.replace(regex, " ");

  
  const node = document.createTextNode(songTitleText);
  songTitle.appendChild(node);
  
  //create the song playtime
  const songDuration = document.createElement("p");
  var temp = new Audio(newSong);
  temp.preload = "metadata";
  temp.onloadedmetadata = function() {
    durationInSeconds = temp.duration;
    const node2 = document.createTextNode(formatDuration(durationInSeconds));
    songDuration.appendChild(node2);
};

  //create the delete button
let deleteButton = document.createElement("button");
deleteButton.classList.add("queue-delete-button");
deleteButton.innerHTML = "X";
deleteButton.addEventListener("click", () =>{ 
document.getElementById(`queue-item-${index}`).remove(); //remove the element from the uiqueue
songQueue.splice(index, 1); //remove the element from the songQueue

});

  //add the title and duration and delete button to the queueItem
  queueItem.appendChild(songTitle);
  queueItem.appendChild(songDuration);
  queueItem.appendChild(deleteButton);
  // add queueItem to UI queue
  uiQueue.insertBefore(queueItem, uiQueue.firstElementChild); //TODO: fix the uiQueue layout so that the header or album art/playlist art does not
  //get pushed down when adding queue items.

}

//add all songs in js songQueue to UI queue
let songIndex = 0;
songQueue.forEach(song => {
  addSongToUIQueue(song, index);
  index++;
});

let clearQueue = () =>{
  songQueue = [];
  uiQueue.innerHTML="";
}
clearQueueButton.addEventListener('click', clearQueue);

//END QUEUE FUNCTIONS

let toggleSearchBar = () =>{
  if(searchBar.style.visibility!=='visible')
  searchBar.style.visibility = 'visible';
  else{
    searchBar.style.visibility = 'hidden';
  }
 
};
searchButton.addEventListener('click', toggleSearchBar);

let enterFullScreen = () =>{  //from: https://www.w3schools.com/howto/howto_js_fullscreen.asp TODO: FIX
  let elem = document.documentElement;
if (elem.requestFullscreen) {
  elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) { /* Safari */
  elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) { /* IE11 */
  elem.msRequestFullscreen();
}
};
fullScreenButton.addEventListener('click', enterFullScreen);

const pushToRecentlyPlayed = (art, title, path) =>{ //shifts all recently played figures to the left and sticks the now playing song in the first spot
  if(title.length > 37){
    title = title.substring(0, 37);
    title += "...";
  }


 recent4.src = recent3.src;
 recent4.value = recent3.value;

 recent3.src = recent2.src;
 recent3.value = recent2.value;

 recent2.src = recent1.src;
 recent2.value = recent1.value;
 
 recent1.src = art;
 recent1.value = path;

 caption4.innerText = caption3.innerText;
 caption3.innerText = caption2.innerText;
 caption2.innerText = caption1.innerText;
 caption1.innerText = title;

}

 
