import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Summer Vibes",
    artist: "Beach Wave",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop",
    audio: "/music/song1.mp3",
  },
  {
    id: 2,
    title: "Mountain Echo",
    artist: "Nature Sound",
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop",
    audio: "/music/song2.mp3",
  },
  {
    id: 3,
    title: "Urban Night",
    artist: "City Lights",
    cover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    audio: "/music/song3.mp3",
  },
  {
    id: 4,
    title: "Sunset Dreams",
    artist: "Ocean Waves",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop",
    audio: "/music/song4.mp3",
  },
  {
    id: 5,
    title: "Forest Rain",
    artist: "Green Nature",
    cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop",
    audio: "/music/song5.mp3",
  },
];

class MusicApp {
  private currentSongIndex: number;
  private isPlaying: boolean;
  private volume: number;
  private audio: HTMLAudioElement;

  constructor() {
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.volume = 80;
    this.audio = new Audio();

    this.setSong(this.currentSongIndex);
    this.initDOM();
  }

  private setSong(index: number): void {
    this.currentSongIndex = index;
    const song = songs[this.currentSongIndex];
    this.audio.src = song.audio;
    this.audio.volume = this.volume / 100;
    this.updatePlayerUI();
  }

  private togglePlay(): void {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
    this.updatePlayPauseButton();
  }

  private changeSong(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentSongIndex = (this.currentSongIndex + 1) % songs.length;
    } else {
      this.currentSongIndex = (this.currentSongIndex - 1 + songs.length) % songs.length;
    }
    this.setSong(this.currentSongIndex);
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  private setVolume(newVolume: number): void {
    this.volume = newVolume;
    this.audio.volume = this.volume / 100;
  }

  private updatePlayerUI(): void {
    const cover = document.querySelector<HTMLImageElement>("#player-cover");
    const title = document.querySelector<HTMLHeadingElement>("#player-title");
    const artist = document.querySelector<HTMLParagraphElement>("#player-artist");

    if (cover) cover.src = songs[this.currentSongIndex].cover;
    if (title) title.textContent = songs[this.currentSongIndex].title;
    if (artist) artist.textContent = songs[this.currentSongIndex].artist;
  }

  private updatePlayPauseButton(): void {
    const playButton = document.querySelector<HTMLButtonElement>("#play-pause-button");
    if (playButton) {
      playButton.textContent = this.isPlaying ? "Pause" : "Play";
    }
  }

  private initDOM(): void {
    document.body.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
        <header class="fixed top-0 w-full bg-black/30 backdrop-blur-lg z-50">
          <nav class="container mx-auto px-6 py-4">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">MusicFlow</h1>
          </nav>
        </header>
        <main class="container mx-auto px-6 pt-24 pb-32">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" id="song-list"></div>
          <div class="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg">
            <div class="container mx-auto px-6 py-4 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img id="player-cover" src="${songs[0].cover}" class="w-16 h-16 rounded-lg" />
                <div>
                  <h3 id="player-title" class="font-semibold">${songs[0].title}</h3>
                  <p id="player-artist" class="text-sm text-gray-400">${songs[0].artist}</p>
                </div>
              </div>
              <div class="flex items-center space-x-6">
                <button id="prev-button" class="hover:text-purple-400 transition-colors">Prev</button>
                <button id="play-pause-button" class="bg-purple-600 hover:bg-purple-700 rounded-full p-3 transition-colors">Play</button>
                <button id="next-button" class="hover:text-purple-400 transition-colors">Next</button>
              </div>
              <div class="flex items-center space-x-2">
                <input id="volume-slider" type="range" min="0" max="100" value="80" class="w-24 accent-purple-600" />
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    const songList = document.getElementById("song-list");
    songs.forEach((song, index) => {
      const songElement = document.createElement("div");
      songElement.className = "bg-white/10 backdrop-blur-lg rounded-xl p-4";
      songElement.innerHTML = `
        <img src="${song.cover}" class="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 class="text-xl font-semibold">${song.title}</h3>
        <p class="text-gray-400">${song.artist}</p>
      `;
      songElement.addEventListener("click", () => this.setSong(index));
      songList?.appendChild(songElement);
    });

    document.getElementById("play-pause-button")?.addEventListener("click", () => this.togglePlay());
    document.getElementById("prev-button")?.addEventListener("click", () => this.changeSong("prev"));
    document.getElementById("next-button")?.addEventListener("click", () => this.changeSong("next"));
    document.getElementById("volume-slider")?.addEventListener("input", (e) =>
      this.setVolume(parseInt((e.target as HTMLInputElement).value))
    );
  }
}

new MusicApp();
      
