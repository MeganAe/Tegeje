import { useState, useRef } from 'react';
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

const songs = [
  {
    id: 1,
    title: "Summer Vibes",
    artist: "Beach Wave",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop",
    audio: "/music/song1.mp3"
  },
  {
    id: 2,
    title: "Mountain Echo",
    artist: "Nature Sound",
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop",
    audio: "/music/song2.mp3"
  },
  {
    id: 3,
    title: "Urban Night",
    artist: "City Lights",
    cover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    audio: "/music/song3.mp3"
  },
  {
    id: 4,
    title: "Sunset Dreams",
    artist: "Ocean Waves",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop",
    audio: "/music/song4.mp3"
  },
  {
    id: 5,
    title: "Forest Rain",
    artist: "Green Nature",
    cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop",
    audio: "/music/song5.mp3"
  }
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeSong = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSong((prev) => (prev + 1) % songs.length);
    } else {
      setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/30 backdrop-blur-lg z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              MusicFlow
            </h1>
            <div className="space-x-6">
              <a href="#" className="hover:text-purple-400 transition-colors">Accueil</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Bibliothèque</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Playlist</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                currentSong === index ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setCurrentSong(index)}
            >
              <img
                src={song.cover}
                alt={song.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-gray-400">{song.artist}</p>
            </div>
          ))}
        </div>

        {/* Player Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={songs[currentSong].cover}
                  alt={songs[currentSong].title}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{songs[currentSong].title}</h3>
                  <p className="text-sm text-gray-400">{songs[currentSong].artist}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <button
                  onClick={() => changeSong('prev')}
                  className="hover:text-purple-400 transition-colors"
                >
                  <BackwardIcon className="w-8 h-8" />
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-purple-600 hover:bg-purple-700 rounded-full p-3 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-8 h-8" />
                  ) : (
                    <PlayIcon className="w-8 h-8" />
                  )}
                </button>
                <button
                  onClick={() => changeSong('next')}
                  className="hover:text-purple-400 transition-colors"
                >
                  <ForwardIcon className="w-8 h-8" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <SpeakerWaveIcon className="w-6 h-6" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-24 accent-purple-600"
                />
              </div>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={songs[currentSong].audio}
          onEnded={() => changeSong('next')}
        />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-20 w-full bg-black/30 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 MusicFlow. Tous droits réservés.</p>
            <div className="space-x-4">
              <a href="#" className="text-sm hover:text-purple-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm hover:text-purple-400 transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
    }
