const playBarFix = document.getElementById("play-bar-fix");

// Function to update the content of the play bar
function updatePlayBar(songName, isPaused) {
  const logoSongSmall = playBarFix.querySelector(".logo-song-small img");
  const h3Element = playBarFix.querySelector("h3");

  // Update song name
  h3Element.textContent = songName;

  // Update pause/play image
  const imageUrl = isPaused ? "/LOGOS/play.png" : "/LOGOS/pause.png";
  logoSongSmall.src = imageUrl;
}

// Example usage:
// Call this function with the song name and whether it's paused or not
updatePlayBar("Song Example", true);
