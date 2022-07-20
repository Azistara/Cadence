//play mp3s
//HTMLMediaElement
var audio = new Audio('./resources/mp3s/test.mp3');

let playMp3 = (event) => {
   //play the audio
    audio.play();
  //change the audio button to a pause button
  event.target.removeEventListener('click', playMp3);
  event.target.addEventListener('click', pauseMp3);
  event.target.innerText = 'Pause';
  };
let pauseMp3 = (event) =>{
  audio.pause();
  //change the audio button to a play button
  event.target.removeEventListener('click', pauseMp3);
  event.target.addEventListener('click', playMp3);
  event.target.innerText = 'Play';
}

let playButton =  document.getElementById("play-button");
playButton.addEventListener('click', playMp3);

let searchBar = document.getElementById('search-bar');
let displaySearchBar = () =>{
  searchBar.style.visibility = 'visible';
};

document.getElementsByClassName('search-button')[0].addEventListener('click', displaySearchBar);

 
