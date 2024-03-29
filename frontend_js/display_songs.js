

let allSongsContainer = undefined;


let formatDuration = (duration) =>{ //converts song duration from seconds to minutes and seconds
        let durationInSeconds = duration;
        let durationInMinutes = (Math.floor(durationInSeconds / 60));
        durationInSeconds = (Math.floor(durationInSeconds - (durationInMinutes*60)));
        durationInSeconds = (durationInSeconds < 10 && durationInSeconds > 0) ?  "0" + durationInSeconds.toString() : durationInSeconds.toString();
        let totalDuration = durationInMinutes.toString() + ":" + durationInSeconds.toString();
        if(durationInSeconds === '0'){
        totalDuration += '0';
        }
        
        return totalDuration;
}

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

let createSongsList = async  (isSearch) =>{ //changes the min content to display all the songs in the database if isSearch is false otherwise it displays the search results 
    
    // create the main container for all the songs
    let songListContainer = document.createElement('div');
    songListContainer.id = "all-songs-container";
    songListContainer.classList.add('main-content');
    let result;
    
    try{
        console.log("searchbar value: " + searchBar.value);
         result = (isSearch) ? 
         await window.electronAPI.searchAllSongs(searchBar.value) :  //load the songs from the db through the main process (index.js) via handle_search.js
         await window.electronAPI.loadAllSongs(); //load the songs from the db through the main process (index.js) via handleLoadAllSongs.js
   }
    catch(error){
        console.log(error);
        return;
    }  
            result.forEach((row) =>{ //for each row create a container and add the song title the artist and the duration
                if(row.duration <= 10){ //TODO: delete this to allow for songs under 10 seconds long.
                    return;
                }
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
                songDuration.innerText = formatDuration(row.duration);
                currentSongContainer.appendChild(songDuration);
                //add an event listener to the song container
                currentSongContainer.addEventListener('click', function(){playMp3(row.filePath);}); 
               
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

let displayMusic = async (isSearch) =>{
    let allsongs =document.getElementById('all-songs-container');
    if(allsongs){
        allsongs.remove();
}
   if(isSearch){
    allSongsContainer = undefined; //if this is a new search then get rid of the old search results and then repopulate it with the new search results
    allSongsContainer = await createSongsList(isSearch);
   }
   else{
    allSongsContainer = await createSongsList(isSearch);
   }

        let mainContent =  document.getElementById('main-content');
         //display the songList div in front  of the main-content
        document.getElementsByTagName('main')[0].insertBefore(allSongsContainer, mainContent);
         //hide the main content of index.html 
         mainContent.style.display = 'none';
}

const musicButton = document.getElementById('music-button');
musicButton.addEventListener('click', () => {displayMusic(false);});

searchBar.addEventListener('keyup', (event) => { 
    if(event.key === "Enter"){
        displayMusic(true);
    }
    });
