

const switchToHome = () =>{
            let allSongsContainer = document.getElementById("all-songs-container");
            let mainContent =  document.getElementById('main-content');
            //delete the songList div in front of the main-content
            allSongsContainer.remove();
            //show the main content of index.html 
            mainContent.style.display = 'block';
     }


const homeButton = document.getElementById("home-button");
homeButton.addEventListener('click', switchToHome);