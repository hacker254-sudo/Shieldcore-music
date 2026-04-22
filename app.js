let ytPlayer, currentPlaylist = [], currentIndex = 0, isPlaying = false;
let savedTracks = JSON.parse(localStorage.getItem('shieldcore_library') || '[]');

// Playlist de démo qui marche toujours
currentPlaylist = [
    { id: "fLexgOxsZu0", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", img: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg" },
    { id: "09R8_2nJtjg", title: "Sugar", artist: "Maroon 5", img: "https://i.ytimg.com/vi/09R8_2nJtjg/hqdefault.jpg" },
    { id: "kJQP7kiw5Fk", title: "Despacito", artist: "Luis Fonsi", img: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg" },
    { id: "JGwWNGJdvx8", title: "Shape of You", artist: "Ed Sheeran", img: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg" },
    { id: "OPf0YbXqDm0", title: "Uptown Funk", artist: "Mark Ronson", img: "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg" },
    { id: "YQHsXMglC9A", title: "Hello", artist: "Adele", img: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg" }
];

window.showScreen = (screenId) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.getElementById('navHome').classList.toggle('text-white', screenId === 'homeScreen');
    document.getElementById('navHome').classList.toggle('text-gray-500', screenId!== 'homeScreen');
    document.getElementById('navLibrary').classList.toggle('text-white', screenId === 'libraryScreen');
    document.getElementById('navLibrary').classList.toggle('text-gray-500', screenId!== 'libraryScreen');
    if (screenId === 'libraryScreen') loadLibrary();
};

loadHome();

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
    ytPlayer = new YT.Player('ytplayer', { height: '0', width: '0', playerVars: { 'playsinline': 1 }, events: { 'onStateChange': onPlayerStateChange, 'onReady': () => setInterval(updateProgress, 500) } });
};

function onPlayerStateChange(e) {
    if (e.data == YT.PlayerState.ENDED) nextTrack();
    if (e.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        document.getElementById('playBtn').className = 'fas fa-pause text-2xl cursor-pointer';
        document.getElementById('fullPlayBtn').className = 'fas fa-circle-pause text-6xl cursor-pointer';
    }
    if (e.data == YT.PlayerState.PAUSED) {
        isPlaying = false;
        document.getElementById('playBtn').className = 'fas fa-play text-2xl cursor-pointer';
        document.getElementById('fullPlayBtn').className = 'fas fa-circle-play text-6xl cursor-pointer';
    }
}

window.showLoginModal = () => document.getElementById('loginModal').classList.remove('hidden');
window.hideLoginModal = () => document.getElementById('loginModal').classList.add('hidden');
window.showSignup = () => { document.getElementById('loginForm').classList.add('hidden'); document.getElementById('signupForm').classList.remove('hidden'); document.getElementById('authError').textContent = ''; }
window.showLogin = () => { document.getElementById('signupForm').classList.add('hidden'); document.getElementById('loginForm').classList.remove('hidden'); document.getElementById('authError').textContent = ''; }

window.signup = async () => { alert('Crée un compte plus tard. Mode démo activé.'); }
window.login = async () => { alert('Connexion désactivée en mode démo'); }
window.logout = () => { alert('Déjà déconnecté'); }

function updateUserUI() {
    document.getElementById('greeting').textContent = 'Bonjour';
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('authForms').classList.remove('hidden');
}

window.showHome = () => {
    showScreen('homeScreen');
    document.getElementById('searchBar').classList.add('hidden');
    document.getElementById('sectionTitle1').textContent = "Titres tendance";
    document.getElementById('sectionTitle2').textContent = "Artistes populaires";
    loadHome();
}

window.toggleSearch = () => {
    showScreen('homeScreen');
    document.getElementById('searchBar').classList.toggle('hidden');
    if (!document.getElementById('searchBar').classList.contains('hidden')) {
        document.getElementById('searchInput').focus();
    }
}

function loadHome() {
    renderTracks(currentPlaylist, 'tracksList');
    loadPopularArtists();
    loadAlbums();
    loadRadios();
    loadCharts();
}

function loadPopularArtists() {
    const artists = [
        { name: "GIMS", img: "https://i1.sndcdn.com/avatars-000242595317-tpzq9g-t500x500.jpg" },
        { name: "Jul", img: "https://i1.sndcdn.com/avatars-000011116206-4w3p7k-t500x500.jpg" },
        { name: "Ninho", img: "https://i1.sndcdn.com/avatars-000593340081-1r1r1r-t500x500.jpg" },
        { name: "Dadju", img: "https://i1.sndcdn.com/avatars-000593340081-1r1r1r-t500x500.jpg" },
        { name: "Aya Nakamura", img: "https://i1.sndcdn.com/avatars-000593340081-1r1r1r-t500x500.jpg" }
    ];
    document.getElementById('artistsList').innerHTML = artists.map(a => `
        <div class="artist-card cursor-pointer" onclick="alert('Recherche désactivée en mode démo')">
            <img src="${a.img}" alt="${a.name}">
            <p class="font-semibold text-sm truncate">${a.name}</p>
        </div>
    `).join('');
}

function loadAlbums() {
    const albums = [
        { title: "Le Fléau", img: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg" },
        { title: "Jefe", img: "https://i.ytimg.com/vi/09R8_2nJtjg/hqdefault.jpg" },
        { title: "Civilisation", img: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg" }
    ];
    document.getElementById('albumsList').innerHTML = albums.map(a => `
        <div class="track-card cursor-pointer" onclick="playTrack(0)">
            <img src="${a.img}" alt="${a.title}">
            <p class="font-semibold text-sm truncate">${a.title}</p>
        </div>
    `).join('');
}

function loadRadios() {
    const radios = [
        { name: "L'Oiseau Rare", color: "#5EA3E8", img: "https://i1.sndcdn.com/avatars-000011116206-4w3p7k-t500x500.jpg" },
        { name: "Youssoupha", color: "#57D2B7", img: "https://i1.sndcdn.com/avatars-000593340081-1r1r1r-t500x500.jpg" },
        { name: "Ninho", color: "#F5B700", img: "https://i1.sndcdn.com/avatars-000593340081-1r1r1r-t500x500.jpg" }
    ];
    document.getElementById('radioList').innerHTML = radios.map(r => `
        <div class="radio-card cursor-pointer" onclick="playTrack(0)">
            <div class="radio-card-inner" style="background: ${r.color}; color: black;">
                <i class="fab fa-spotify"></i>
                <span style="position:absolute;top:8px;right:8px;font-size:10px;font-weight:700;">RADIO</span>
                <div style="position:absolute;bottom:8px;left:8px;display:flex;">
                    <img src="${r.img}" style="width:48px;height:48px;border-radius:9999px;border:2px solid ${r.color};">
                </div>
                <p style="position:absolute;bottom:8px;left:8px;right:8px;font-weight:700;font-size:14px;">${r.name}</p>
            </div>
            <p class="font-semibold text-sm truncate mt-2">Radio ${r.name}</p>
        </div>
    `).join('');
}

function loadCharts() {
    const charts = [
        { name: "Top Titres Monde", color: "#8D67AB", subtitle: "Top de la Semaine" },
        { name: "Top Titres États-Unis", color: "#E61E32", subtitle: "Top de la Semaine" },
        { name: "Top Titres France", color: "#1E3264", subtitle: "Top de la Semaine" }
    ];
    document.getElementById('chartsList').innerHTML = charts.map(c => `
        <div class="chart-card cursor-pointer" onclick="playTrack(0)">
            <div class="chart-card-inner" style="background: ${c.color};">
                <div>
                    <p class="text-2xl font-bold">Top</p>
                    <p class="text-2xl font-bold">Titres</p>
                    <p class="text-xl">${c.name.split(' ').pop()}</p>
                </div>
                <div class="flex items-center gap-1 text-xs bg-black/30 px-2 py-1 rounded w-fit">
                    <i class="fas fa-arrow-trend-up"></i>
                    <span>${c.subtitle}</span>
                </div>
            </div>
            <p class="font-semibold text-sm truncate mt-2">${c.name}</p>
        </div>
    `).join('');
}

window.searchMusic = () => { alert('Recherche désactivée en mode démo Android'); }

function isSaved(id) {
    return savedTracks.some(t => t.id === id);
}

function renderTracks(tracks, containerId) {
    document.getElementById(containerId).innerHTML = tracks.map((t, i) => `
        <div class="track-card">
            <div class="save-btn ${isSaved(t.id)? 'saved' : ''}" onclick="toggleSave(${i}, event)">
                <i class="${isSaved(t.id)? 'fas fa-bookmark' : 'far fa-bookmark'} text-xs"></i>
            </div>
            <img src="${t.img}" alt="${t.title}" onclick="playTrack(${i})" class="cursor-pointer">
            <p class="font-semibold text-sm truncate cursor-pointer" onclick="playTrack(${i})">${t.title}</p>
            <p class="text-xs text-gray-400 truncate">${t.artist}</p>
        </div>
    `).join('');
}

window.toggleSave = (index, e) => {
    e.stopPropagation();
    const track = currentPlaylist[index];
    const idx = savedTracks.findIndex(t => t.id === track.id);
    if (idx > -1) {
        savedTracks.splice(idx, 1);
    } else {
        savedTracks.unshift(track);
    }
    localStorage.setItem('shieldcore_library', JSON.stringify(savedTracks));
    renderTracks(currentPlaylist, 'tracksList');
};

window.saveCurrentTrack = () => {
    const track = currentPlaylist[currentIndex];
    if (!track) return;
    if (!isSaved(track.id)) {
        savedTracks.unshift(track);
        localStorage.setItem('shieldcore_library', JSON.stringify(savedTracks));
        document.getElementById('fullSaveBtn').className = 'fas fa-bookmark text-xl cursor-pointer text-[#1DB954]';
    } else {
        alert('Déjà dans ta Bibliothèque');
    }
};

function loadLibrary() {
    savedTracks = JSON.parse(localStorage.getItem('shieldcore_library') || '[]');
    if (savedTracks.length === 0) {
        document.getElementById('libraryList').innerHTML = '';
        document.getElementById('libraryEmpty').classList.remove('hidden');
    } else {
        document.getElementById('libraryEmpty').classList.add('hidden');
        document.getElementById('libraryList').innerHTML = savedTracks.map((t, i) => `
            <div class="library-item cursor-pointer" onclick="playFromLibrary(${i})">
                <img src="${t.img}" class="w-14 h-14 rounded">
                <div class="flex-1">
                    <p class="font-semibold text-sm truncate">${t.title}</p>
                    <p class="text-xs text-gray-400 truncate">${t.artist}</p>
                </div>
                <i onclick="removeFromLibrary(${i}, event)" class="fas fa-times text-gray-500 hover:text-white"></i>
            </div>
        `).join('');
    }
}

window.removeFromLibrary = (index, e) => {
    e.stopPropagation();
    savedTracks.splice(index, 1);
    localStorage.setItem('shieldcore_library', JSON.stringify(savedTracks));
    loadLibrary();
};

window.clearLibrary = () => {
    if (confirm('Vider toute la bibliothèque?')) {
        savedTracks = [];
        localStorage.setItem('shieldcore_library', JSON.stringify(savedTracks));
        loadLibrary();
    }
};

window.playFromLibrary = (index) => {
    currentPlaylist = savedTracks;
    playTrack(index);
};

window.playAlbumTrack = (id, title, img) => { playTrack(0); }

window.playTrack = (index) => {
    currentIndex = index;
    const track = currentPlaylist[index];
    ytPlayer.loadVideoById(track.id);
    document.getElementById('player').classList.remove('hidden');
    document.getElementById('playerImg').src = track.img;
    document.getElementById('playerTitle').textContent = track.title;
    document.getElementById('playerArtist').textContent = track.artist;
    updateFullPlayer();
}

window.showFullPlayer = () => {
    if (!currentPlaylist[currentIndex]) return;
    document.getElementById('fullPlayer').classList.remove('hidden');
    updateFullPlayer();
}

window.hideFullPlayer = () => {
    document.getElementById('fullPlayer').classList.add('hidden');
}

function updateFullPlayer() {
    const track = currentPlaylist[currentIndex];
    if (!track) return;
    document.getElementById('fullPlayerImg').src = track.img;
    document.getElementById('fullPlayerBg').style.backgroundImage = `url(${track.img})`;
    document.getElementById('fullPlayerTitle').textContent = track.title;
    document.getElementById('fullPlayerArtist').textContent = track.artist;
    document.getElementById('fullSaveBtn').className = isSaved(track.id)? 'fas fa-bookmark text-xl cursor-pointer text-[#1DB954]' : 'far fa-bookmark text-xl cursor-pointer';
}

function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    sec = Math.floor(sec);
    return Math.floor(sec/60) + ":" + String(sec%60).padStart(2,'0');
}

function updateProgress() {
    if (ytPlayer && ytPlayer.getCurrentTime) {
        const current = ytPlayer.getCurrentTime();
        const total = ytPlayer.getDuration();
        const pct = total? (current/total)*100 : 0;
        document.getElementById('progressBar').style.width = pct + '%';
        document.getElementById('fullProgressBar').style.width = pct + '%';
        document.getElementById('currentTime').textContent = formatTime(current);
        document.getElementById('totalTime').textContent = formatTime(total);
    }
}

window.seek = (e) => {
    if (!ytPlayer ||!ytPlayer.getDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    ytPlayer.seekTo(ytPlayer.getDuration() * pct);
}

window.togglePlay = () => {
    if (isPlaying) ytPlayer.pauseVideo();
    else ytPlayer.playVideo();
}

window.nextTrack = () => {
    currentIndex = (currentIndex + 1) % currentPlaylist.length;
    playTrack(currentIndex);
}

window.prevTrack = () => {
    currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playTrack(currentIndex);
}

window.showLyrics = async () => { alert('Paroles désactivées en mode démo'); }
window.hideLyrics = () => document.getElementById('lyricsModal').classList.add('hidden');
