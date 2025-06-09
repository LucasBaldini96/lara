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

  // Toca a música o mais cedo possível
  try {
    bgMusic.muted = false;
    bgMusic.play()
      .then(() => {
        toggleMusic.innerText = '🔊';
      })
      .catch((e) => {
        console.warn('⚠️ Música bloqueada, tente clicar no botão 🔊');
      });
  } catch (e) {
    console.error('Erro ao tentar tocar a música:', e);
  }

  // Vai pra segunda view depois de 2.5s
  setTimeout(() => {
    const mainView = document.getElementById('mainView');
    const secondView = document.getElementById('secondView');
    if (mainView && secondView && bearOverlay) {
      mainView.style.display = 'none';
      secondView.style.display = 'flex';
      bearOverlay.style.display = 'none';
      startHeartRain();

      // Agora o botão existe, adiciona o evento aqui
      const botaoWhats = document.getElementById('enviarWhats');
      if (botaoWhats) {
        botaoWhats.addEventListener('click', () => {
          const mensagem = document.getElementById('respostaTexto').value.trim();
          if (!mensagem) {
            alert('Por favor, escreva algo antes de enviar ❤️');
            return;
          }
          const numero = '5514997087118';
          const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
          window.open(link, '_blank');
        });
      }

    } else {
      console.error('❌ Elementos da view não encontrados');
    }
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
