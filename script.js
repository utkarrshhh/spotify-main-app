console.log("hello ");
let result = {};
let isPlaying = false;
let isShuffle = false;
let currentAudio = null;
let btnId = null;
let randNum = null;
let currentAudioSrc = null;
let currentAudioId = null;
let currentAudioRealId = null;
let temp = null;
let i = 0;
let listElement = null;
let totalResults = 25;
let isSearch = false;
const spotifyPlaylist = document.getElementById("spotify-playlist-id");
const spotifyCard = document.getElementById("spotify-card");
const playBarFix = document.getElementById("play-bar-fix");
const playButton = document.querySelector(".button-basic2");
const playPauseBtn = document.getElementById("pause-play");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const logoSongSmall = document.createElement("div");
let h4 = document.getElementsByTagName("h4");
const shuffleBtn = document.getElementById("shuffle");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
// let crossBtn = null;
logoSongSmall.classList.add(
  "logo-song-small",
  "border-red",
  "border-radius-50"
);
const imgElement = document.createElement("img");
imgElement.src = "LOGOS/song-icon.png";
logoSongSmall.appendChild(imgElement);
const h3Element = document.createElement("h4");

h3Element.textContent = "Play something";
playBarFix.appendChild(logoSongSmall);
playBarFix.appendChild(h3Element);

const entry = async () => {
  const response = await fetch("eminem-songs/songs2.json");
  const result = await response.json();
  return result;
};

const getSongs = async () => {
  result = await entry();

  const randomSong = (result) => {
    console.log("inside random");
    randNum = Math.floor(Math.random() * totalResults) + 1;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      isPlaying = false;
    }
    let audio = new Audio(result.data[randNum].preview);
    audio.play();
    currentAudio = audio;
    console.log(result.data[randNum]);
    fixPlayBar(result.data, randNum);
    console.log("here");
    isPlaying = true;
  };
  result.data.map((value) => {
    const spotifyCard = document.createElement("div");
    spotifyCard.className = "spotify-card spacing";
    spotifyCard.id = `${value.id} ${i}`;
    const playButtonContainer = document.createElement("div");
    playButtonContainer.className = "playbutton-container";
    playButtonContainer.id = `${value.id} ${i}`;
    const playButtonImage = document.createElement("img");
    playButtonImage.src = "./LOGOS/playbutton.svg";
    playButtonImage.alt = value.title;
    playButtonImage.className = "playbutton-logo";
    playButtonImage.id = `${value.id} ${i}`;
    playButtonContainer.appendChild(playButtonImage);

    const songImage = document.createElement("img");
    songImage.src = value.album.cover_medium;
    songImage.alt = value.title;
    songImage.className = "song-img border-radius ";
    songImage.id = `${value.id} ${i}`;
    const h2Element = document.createElement("h2");
    h2Element.textContent = value.title;
    h2Element.id = `${value.id} ${i} `;
    h2Element.className = "h2-Element";
    const pElement2 = document.createElement("h3");
    pElement2.textContent = `Duration: ${Math.floor(value.duration / 60)}min ${
      value.duration % 60
    }sec`;
    pElement2.id = value.id;
    const anchor = document.createElement("a");
    anchor.className = "init-color link-style";
    anchor.href = value.artist.link;
    const pElement = document.createElement("h2");
    pElement.textContent = `Artist: ${value.artist.name}`;
    anchor.appendChild(pElement);
    spotifyCard.appendChild(playButtonContainer);
    spotifyCard.appendChild(songImage);
    spotifyCard.appendChild(h2Element);
    spotifyCard.appendChild(pElement2);
    spotifyCard.appendChild(anchor);
    spotifyPlaylist.appendChild(spotifyCard);
    i++;
  });
  function searchFunc(e) {
    e.preventDefault();
    let crossBtn = document.getElementById("cross-btn");
    if (isSearch) {
      searchBar.classList.remove("display-block");
      searchBar.className += " display-none";
      searchBtn.classList.remove("display-none");
      searchBtn.className += " display-block";
      crossBtn.classList.remove("display-block");
      crossBtn.className += " display-none";
      isSearch = false;
    } else {
      searchBtn.classList.remove("display-block");
      searchBtn.className += " display-none";
      searchBar.classList.remove("display-none");
      searchBar.className += " display-block";
      crossBtn.className += " display-block";
      crossBtn.classList.remove("display-none");
      crossBtn = document.getElementById("cross-btn");
      isSearch = true;
      crossBtn.addEventListener("click", (e) => searchFunc(e));
    }
  }
  function shuffleFunc(e) {
    console.log("clcked");
    if (isShuffle) {
      shuffleBtn.classList += " color-invert";
      shuffleBtn.src = "./LOGOS/shuffle1.png";
      isShuffle = false;
    } else {
      shuffleBtn.classList.remove("color-invert");
      shuffleBtn.src = "./LOGOS/shuffle.png";
      isShuffle = true;
    }
  }
  function playPreviousSong(e, currentAudio, result) {
    let songTitle = null;
    if (currentAudio && !isShuffle) {
      currentAudioSrc = currentAudio.src;
      console.log(currentAudioSrc);
      currentAudioId = result.data.filter(
        (value) => value.preview == currentAudioSrc
      );
      songTitle = document.getElementsByClassName("h2-Element");
      console.log(currentAudioId);
      console.log(currentAudioId[0].id);
      currentAudioRealId = Array.from(songTitle).filter(
        (value) => value.id.split(" ")[0] == currentAudioId[0].id
      );
      currentAudioRealId = currentAudioRealId[0].id.split(" ");
      console.log(currentAudioRealId);
      currentAudio.pause();
      isPlaying = false;
      currentAudio.currentTime = 0;
      temp = result.data;
      console.log("here");
      let j = totalResults - 1;
      while (
        j >=
        (parseInt(currentAudioRealId[1]) - 1 + totalResults) % totalResults
      ) {
        console.log("inside whilte loop");
        console.log(
          (parseInt(currentAudioRealId[1]) - 1 + totalResults) % totalResults
        );
        console.log(result.data[totalResults - 1].id);
        temp = result.data[j].id;
        j--;
      }

      console.log(temp);
      playSongs(e, temp);
    } else if ((currentAudio, isShuffle)) {
      randomSong(result);
    } else {
      playPause(playPauseBtn, isPlaying, currentAudio);
    }
  }
  function playNextSong(e, currentAudio, songId) {
    let songTitle = null;
    if (currentAudio && !isShuffle) {
      currentAudioSrc = currentAudio.src;
      console.log(currentAudioSrc);
      currentAudioId = result.data.filter(
        (value) => value.preview == currentAudioSrc
      );
      songTitle = document.getElementsByClassName("h2-Element");
      console.log(currentAudioId);
      console.log(currentAudioId[0].id);
      currentAudioRealId = Array.from(songTitle).filter(
        (value) => value.id.split(" ")[0] == currentAudioId[0].id
      );
      currentAudioRealId = currentAudioRealId[0].id.split(" ");
      console.log(currentAudioRealId);
      if (isPlaying) {
        currentAudio.pause();
      }
      isPlaying = false;
      currentAudio.currentTime = 0;
      console.log((parseInt(currentAudioRealId[1]) + 1) % totalResults);
      // console.log(result.data[0]);
      temp = result.data;
      let j = 0;
      while (j <= (parseInt(currentAudioRealId[1]) + 1) % totalResults) {
        // console.log(result.data[j]);
        temp = result.data[j].id;
        j++;
      }

      console.log(temp);
      playSongs(e, temp);
    } else if ((currentAudio, isShuffle)) {
      randomSong(result);
    } else {
      playPause(playPauseBtn, isPlaying, currentAudio);
    }
  }
  function playPause(alt, isPlaying, currentAudio) {
    console.log(isPlaying);
    console.log(currentAudio);
    if (isPlaying && alt.src.endsWith("pause.png")) {
      console.log("inside to pause this");
      currentAudio.pause();
      isPlaying = false;
      console.log(alt.src);
      alt.src = "http://127.0.0.1:5500/LOGOS/play.png";
    } else if (h4.textContent != "Play something" && currentAudio) {
      currentAudio.play();
      isPlaying = true;
      alt.src = "http://127.0.0.1:5500/LOGOS/pause.png";
    } else {
      randomSong(result);
      isPlaying = true;
      alt.src = "http://127.0.0.1:5500/LOGOS/pause.png";
    }
    console.log(isPlaying);
  }
  const fixPlayBar = (song, i = 0) => {
    imgElement.src = song[i].album.cover_small;
    h3Element.textContent = song[i].title;
  };

  const playSongs = (e, id) => {
    var song = result.data.filter((value) => value.id == id);
    // console.log("qwert");
    console.log(song);
    console.log(song.length);
    if (song.length != 0) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        isPlaying = false;
      }
      playPauseBtn.src = "http://127.0.0.1:5500/LOGOS/pause.png";
      var audio = new Audio(song[0].preview);
      audio.play();
      currentAudio = audio;
      isPlaying = true;
      fixPlayBar(song);
      // listElement = null;
      // listElement = e.target;
      // listElement.className += " glow";
      // listElement.className.includes("glow")
      //   ? listElement.classList.remove("glow")
      //   : (listElement.className += " glow");
    }
  };

  const getPlayedSong = (e) => {
    console.log(e.target.id.split(" ")[0]);
    playSongs(e, e.target.id.split(" ")[0]);
    // e.target.className +=" glow";
  };
  spotifyPlaylist.addEventListener("click", getPlayedSong);
  console.log(isPlaying);
  playPauseBtn.addEventListener("click", (e) => {
    btnId = e.target.id;
    playPause(e.target, isPlaying, currentAudio);
  });
  nextBtn.addEventListener("click", (e) => {
    playNextSong(e, currentAudio, e.target);
  });
  previousBtn.addEventListener("click", (e) => {
    playPreviousSong(e, currentAudio, result);
  });
  shuffleBtn.addEventListener("click", (e) => shuffleFunc(e));
  searchBtn.addEventListener("click", (e) => searchFunc(e));
  // crossBtn.addEventListener("click", (e) => searchFunc(e));
};
getSongs();

// document.body.addEventListener("contextmenu", (e) => e.preventDefault());
