const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const bearOverlay = document.getElementById('bearOverlay');
const bgMusic = document.getElementById('bgMusic');
const toggleMusic = document.getElementById('toggleMusic');

function moveButton() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  noButton.style.position = 'absolute';
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

noButton.addEventListener('mouseover', moveButton);
noButton.addEventListener('touchstart', moveButton);

yesButton.addEventListener('click', () => {
  bearOverlay.style.display = 'flex';

  setTimeout(() => {
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('secondView').style.display = 'flex';
    bearOverlay.style.display = 'none';
    startHeartRain();

    // 🔊 desmuta e dá play automático após clique
    bgMusic.muted = false;
    bgMusic.play().catch((e) => {
      console.warn('⚠️ Música bloqueada, tente clicar no botão 🔊');
    });

    toggleMusic.innerText = '🔊';
  }, 2500);
});

toggleMusic.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.muted = false;
    bgMusic.play();
    toggleMusic.innerText = '🔊';
  } else {
    bgMusic.pause();
    toggleMusic.innerText = '🔇';
  }
});

function createHeart() {
  const emojis = ['💖', '💘', '💝', '💗'];
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '0px';
  heart.style.fontSize = `${24 + Math.random() * 16}px`;

  document.getElementById('heartsContainer').appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

function startHeartRain() {
  setInterval(() => {
    createHeart();
    createHeart();
  }, 150);
}
