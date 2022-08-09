//play mp3s

//HTMLMediaElement

let songQueue = ["./resources/mp3s/Gmatters.m4a", "./resources/mp3s/MindBlown.m4a", "./resources/mp3s/Ouija.m4a", './resources/mp3s/test.mp3' ];
var audio = new Audio(songQueue[0]);
let playButton    =    document.getElementById("play-button");
let stopButton    =    document.getElementById('stop-button');
let volumeButton  =    document.getElementById('volume-button');
let volumeSlider  =    document.getElementById('volume-slider');
let forwardButton =    document.getElementById("forward-button");
let prevButton    =    document.getElementById('prev-button');
let shuffleButton =    document.getElementById('shuffle-button');
let uiQueue       =    document.getElementById('queue-list');
volumeSlider.style.display = 'none';

let searchButton = document.getElementsByClassName('search-button')[0]; 
let searchBar = document.getElementById('search-bar');
let fullScreenButton = document.getElementById('full-screen-button');



//START CONTROL PANEL BUTTONS

 let playMp3 = (path) => {
  if(path){
    audio = new Audio(path);
  }
   //play the audio
    audio.play();
  //change the audio button to a pause button
  playButton.removeEventListener('click', playMp3);
  playButton.addEventListener('click', pauseMp3);
  playButton.style.backgroundImage = "url('./resources/svg/media/az-pause.svg')";
  };
let pauseMp3 = () =>{
  audio.pause();
  //change the audio button to a play button
  playButton.removeEventListener('click', pauseMp3);
  playButton.addEventListener('click', playMp3);
  playButton.style.backgroundImage = "url('./resources/svg/media/az-play.svg')";
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
  //clear the queue
  while (uiQueue.firstChild) { // TODO: save the first child maybe add it back after it is deleted
    uiQueue.removeChild(uiQueue.lastChild);
  }
  //add all songs in js songQueue to UI queue
songQueue.forEach(song => {
  addSongToUIQueue(song);
});
}
audio.addEventListener('ended', playNextSong);
forwardButton.addEventListener('click', playNextSong);

let playPreviousSong = () =>{
  songQueue.unshift(songQueue.pop()); //move last song to front of queue
  audio.setAttribute('src', songQueue[0]); //set the current song to the song at the front of the queue
  audio.load(); //load new song so that it doesn't play the old song.
  playMp3(); //start playing the current song
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



//END CONTROL PANEL BUTTONS

//START QUEUE FUNCTIONS

let addSongToUIQueue = (newSong) =>{
  //create the container
const queueItem = document.createElement('div');
  queueItem.classList.add('queue-item');
  //create the songTitle
  const songTitle = document.createElement("p");

  //erase the first 17 characters from the new song string
  songTitleText = newSong.substring(17, newSong.length-4);
  const node = document.createTextNode(songTitleText);
  songTitle.appendChild(node);
  
  //create the song playtime
  const songDuration = document.createElement("p");
  var temp = new Audio(newSong);
  temp.preload = "metadata";
  temp.onloadedmetadata = function() {
    durationInSeconds = temp.duration;
    durationInMinutes = (Math.floor(durationInSeconds / 60));
    durationInSeconds = (Math.floor(durationInSeconds - (durationInMinutes*60))).toString();
    totalDuration = durationInMinutes.toString() + ":" + durationInSeconds.toString();
    if(durationInSeconds === '0'){
      totalDuration += '0';
    }
    const node2 = document.createTextNode(totalDuration);
    songDuration.appendChild(node2);
};

  //add the title and duration to the queueItem
  queueItem.appendChild(songTitle);
  queueItem.appendChild(songDuration);

  // add queueItem to UI queue
  uiQueue.appendChild(queueItem);

}

//add all songs in js songQueue to UI queue
songQueue.forEach(song => {
  addSongToUIQueue(song);
});

//END QUEUE FUNCTIONS

let displaySearchBar = () =>{
  if(searchBar.style.visibility!=='visible')
  searchBar.style.visibility = 'visible';
  else{
    searchBar.style.visibility = 'hidden';
  }
 
};
searchButton.addEventListener('click', displaySearchBar);

let enterFullScreen = () =>{  //from: https://www.w3schools.com/howto/howto_js_fullscreen.asp
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
 
