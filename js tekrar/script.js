
const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");
const volume = document.querySelector(".fa-volume-low");
const songEl = document.getElementById("song");
const soundContainer = document.getElementById("sound-container");
const onepointfivex=document.getElementById("onepointfivex")
const onex=document.getElementById("onex")
const twox=document.getElementById("twox")
const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const randomBtn = document.getElementById('random');

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");
const prev10sec=document.getElementById("prev10sec")
const next10sec=document.getElementById("next10sec")

const playlist = document.getElementById("playlist");

const songs = [
  {
    name: "Axtarma",
    artist: "okaber",
    title: "Axtarma",
    duration: "3:53",
  },
  {
    name: "Epi - Qırmızı Winston",
    artist: "Epi",
    title: "Qırmızı Winston",
    duration: "4:38",
  },
  {
    name: "Paster - 1st Class ( ft. DOST, OD) Lyrics",
    artist: "Paster",
    title: "1st Class ( ft. DOST, OD) Lyrics",
    duration: "4:14",
  }
];

let isPlaying = false;
let songIndex = 0;
const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    songIndex = randomIndex;
    displaySong(songs[songIndex]);
    playSong();
  };
  randomBtn.addEventListener("click",playRandomSong)
const playSong = () => {
  songEl.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
};

const pauseSong = () => {
  songEl.pause();
  isPlaying = false;
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

const nextSong = () => {
    const currentSelected = document.querySelector('.songlistli.red');
    if (currentSelected) {
      currentSelected.classList.remove('red');
    }
    
    songIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1;
    displaySong(songs[songIndex]);
    playSong();
    
    const nextListItem = document.querySelectorAll('.songlistli')[songIndex];
    nextListItem.classList.add('red');
  };
  

const prevSong = () => {
  songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
  displaySong(songs[songIndex]);
  playSong();
};

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

const displaySong = (song) => {
  imageEl.src = `${song.name}.jpg`;
  songEl.src = `${song.name}.mp3`;
  titleEl.innerText = song.title;
  artistEl.innerText = song.artist;
};
prev10sec.addEventListener("click", () => {
    if (!songEl.duration) return; 
  
    songEl.currentTime = Math.max(0, songEl.currentTime - 10);
  
    const { duration, currentTime } = songEl;
    updateTimeDisplay(duration, currentTime);
  });
  onepointfivex.addEventListener("click",()=>{
    if(!songEl.duration)return;
    songEl.playbackRate*=1.5
  })
  onex.addEventListener("click",()=>
  {
    songEl.playbackRate=1
  })
songEl.addEventListener("timeupdate", (e) => {
  const { duration, currentTime: current } = e.target;
  progressEl.style.width = `${(current / duration) * 100}%`;

  if (!duration) return;

  const durationMinute = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  const currentMinute = Math.floor(current / 60);
  const currentSeconds = Math.floor(current % 60);

  durationEl.textContent = `${durationMinute}:${String(
    durationSeconds
  ).padStart(2, "0")}`;
  currentTimeEl.textContent = `${currentMinute}:${String(
    currentSeconds
  ).padStart(2, "0")}`;
});
twox.addEventListener("click",()=>{
    songEl.playbackRate*=2
})
songEl.addEventListener("ended", nextSong);
next10sec.addEventListener("click",()=>{
    next10sec.addEventListener("click", () => {
        if (!songEl.duration) return; 
      
        songEl.currentTime = Math.max(0, songEl.currentTime+ 10);
      
        const { duration, currentTime } = songEl;
        updateTimeDisplay(duration, currentTime);
      });
      
})
progressContainerEl.addEventListener("click", function (event) {
  const width = this.clientWidth;
  const clicked = event.offsetX;
  const { duration } = songEl;
  songEl.currentTime = (clicked / width) * duration;
});
volume.addEventListener("click", () => {
    if (songEl.muted) {
      songEl.muted = false; 
      
    } else {

      songEl.muted = true; 
    }
    volume.className=`${songEl.muted? "fa-solid fa-volume-xmark":"fa-solid fa-volume-low"}`
  });
soundContainer.addEventListener("click", function(event) {
    const width = this.clientWidth;
    const clicked = event.offsetX;
    const volumeLevel = clicked / width;
    songEl.volume = volumeLevel;
    document.getElementById("sound").style.width = `${volumeLevel * 100}%`;
  });
   
  const createPlaylist = () => {
    const playlist = document.querySelector('.songlist');
    playlist.innerHTML = ''; 
    songs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.className = "songlistli";
        listItem.textContent = `${song.title} - ${song.duration}`;
        listItem.addEventListener('click', () => {
            songIndex = index;
            displaySong(songs[songIndex]);
            playSong();
            const prevSelected = document.querySelector('.songlistli.red');
            if (prevSelected) {
                prevSelected.classList.remove('red');
            }
            listItem.classList.add('red');
        });
        playlist.appendChild(listItem);
        if (index === songIndex && isPlaying) {
            listItem.classList.add('red'); 
        }
    });
};


createPlaylist();
