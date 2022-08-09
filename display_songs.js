

let allSongsContainer = undefined;



let displaySongMenu = (e) =>{
    //display a menu of options
    //1. push song to queue
    //2. play immediately
    //3. delete song
    //4. rename song
}

let deleteSong = (songID) =>{
    //if song is currently playing display to user that they cannot delete a song that is currently playing
    //else{
    //connect to database
    //delete the song from database
    //close connection to database
    //call remove Node on the div
}

let renameSong = (songID) =>{
    //connect to database
    //update  the song title from database
    //close connection to database
    //update the div so that the <p>title</p> echos what the user renamed the song to
}

let createSongsList = async  () =>{ //changes the min content to display all the songs in the database
    
    // create the main container for all the songs
    let songListContainer = document.createElement('div');
    songListContainer.id = "all-songs-container";
    songListContainer.classList.add('main-content');
    let result;
    try{
         result = await window.electronAPI.loadAllSongs(); //load the songs from the db through the main process (index.js) via handleLoadAllSongs.js
   }
    catch(error){
        console.log(error);
        return;
    }  
    console.log(typeof result);
            result.forEach((row) =>{ //for each row create a container and add the song title the artist and the duration
                let currentSongContainer = document.createElement('div');
                currentSongContainer.classList.add('individual-song');
                //for the title
                let songTitle = document.createElement('p');
                songTitle.classList.add('individual-song-title');
                songTitle.innerText = row.title;
                currentSongContainer.appendChild(songTitle);
                //for the artist
                let songArtist = document.createElement('p');
                songArtist.classList.add('individual-song-artist');
                songArtist.innerText = row.artist;
                currentSongContainer.appendChild(songArtist);
                //for the duration
                let songDuration = document.createElement('p');
                songDuration.classList.add('individual-song-duration');
                songDuration.innerText = row.duration;
                currentSongContainer.appendChild(songDuration);
                //add an event listener to the song container
                currentSongContainer.addEventListener('click', playMp3(row.filePath)); // TODO: figure out how to play the song
                
               
               if( songListContainer.childElementCount === 0 || //if this is the first song to be added OR
               songListContainer.lastChild.firstChild.innerText.substring(0,1).toUpperCase() !== row.title.substring(0,1).toUpperCase() // the current song starts with a different letter than the last added song
               )
               { 
                    let letterheader = document.createElement('h2'); //create letter header
                    letterheader.classList.add('letter-header');
                    letterheader.innerText = row.title.substring(0,1).toUpperCase(); //set its inner text to the first letter of the song title
                    songListContainer.appendChild(letterheader); //add it to the container
               }
               //add the songContainer to the songListContainer
               songListContainer.appendChild(currentSongContainer);
        });

   return songListContainer; 
}

let displayMusic = async () =>{
   // if(document.getElementById('all-songs-container') !== undefined){ return;} //if we are already on the all songs page then do nothing.
    if(allSongsContainer === undefined){
        allSongsContainer = await createSongsList();
    }
        let mainContent =  document.getElementById('main-content');
         //display the songList div in front  of the main-content
        document.getElementsByTagName('main')[0].insertBefore(allSongsContainer, mainContent);
         //hide the main content of index.html 
         mainContent.style.display = 'none';
}

const musicButton = document.getElementById('music-button');
musicButton.addEventListener('click', displayMusic);

