//play mp3s

let playMp3 = () => {
    var audio = new Audio('./resources/mp3s/test.mp3');
    audio.play();
  };

 let playButton =  document.getElementById("play-button");
 playButton.addEventListener('click', playMp3);

