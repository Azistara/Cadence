//play mp3s

//HTMLMediaElement
var audio = new Audio('./resources/mp3s/test.mp3');
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


let stopMp3 = (event) =>{
  pauseMp3(); //pause the audio 
  audio.currentTime = 0; //reset to beginning of the song
}
stopButton.addEventListener('click', stopMp3);


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

let displaySearchBar = () =>{
  console.log("hello from search bar!");
  searchBar.style.visibility = 'visible';
 
};


searchButton.addEventListener('click', displaySearchBar);

 
