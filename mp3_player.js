//play mp3s

//HTMLMediaElement

let songQueue = ["./resources/mp3s/Gmatters.m4a", "./resources/mp3s/MindBlown.m4a", "./resources/mp3s/Ouija.m4a", './resources/mp3s/test.mp3' ];
var audio = new Audio(songQueue[0]);
let playButton =  document.getElementById("play-button");
let stopButton = document.getElementById('stop-button');
let volumeButton = document.getElementById('volume-button');
let volumeSlider = document.getElementById('volume-slider');
volumeSlider.style.display = 'none';

let searchButton = document.getElementsByClassName('search-button')[0]; 
let searchBar = document.getElementById('search-bar');

let playMp3 = (event) => {
   //play the audio
    audio.play();
  //change the audio button to a pause button
  event.target.removeEventListener('click', playMp3);
  event.target.addEventListener('click', pauseMp3);
  event.target.innerText = 'Pause';
  };
let pauseMp3 = () =>{
  audio.pause();
  //change the audio button to a play button
  playButton.removeEventListener('click', pauseMp3);
  playButton.addEventListener('click', playMp3);
  playButton.innerText = 'Play';
};
playButton.addEventListener('click', playMp3);


let stopMp3 = () =>{
  pauseMp3(); //pause the audio 
  audio.currentTime = 0; //reset to beginning of the song
}
stopButton.addEventListener('click', stopMp3);

let playNextSong = () => {
  songQueue.push(songQueue.shift()); //put finished song at end of queue
  audio = new Audio(songQueue[0]); //set the current song to the song at the front of the queue
  audio.play(); //start playing the current song
}
audio.addEventListener('ended', playNextSong);

let toggleVolumeSlider = () =>{ //display  slider above the volume button
  if(volumeSlider.style.display === 'none'){
    volumeSlider.style.display = 'block';
    console.log("success!!");
  }
  else{
    volumeSlider.style.display = 'none';
  }
}
volumeButton.addEventListener('click', toggleVolumeSlider);

volumeSlider.oninput = function() {audio.volume =  (volumeSlider.value / 100); };



let displaySearchBar = () =>{
  searchBar.style.visibility = 'visible';
 
};


searchButton.addEventListener('click', displaySearchBar);

 
