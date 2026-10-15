// app.js - Interactive functions for Artist Co. Website

// 1. Hero Cover Switcher
function switchHeroCover(imgSrc, title) {
  const heroImg = document.getElementById('hero-cover-img');
  if (heroImg) {
    heroImg.style.opacity = '0.3';
    heroImg.style.transform = 'scale(0.96)';
    setTimeout(() => {
      heroImg.src = imgSrc;
      heroImg.alt = title;
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'scale(1)';
    }, 150);
  }
}

// 2. Book Catalog Filter
function filterBooks(category) {
  const cards = document.querySelectorAll('.book-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-brand-pink', 'text-white');
    btn.classList.add('bg-white', 'text-gray-700');
  });

  // Activate clicked button
  event.target.classList.add('active', 'bg-brand-pink', 'text-white');
  event.target.classList.remove('bg-white', 'text-gray-700');

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
      card.classList.add('animate-scaleUp');
    } else {
      card.style.display = 'none';
    }
  });
}

// 3. Look Inside Modal
function openLookInside(title, images) {
  const modal = document.getElementById('preview-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  if (!modal || !modalTitle || !modalContent) return;

  modalTitle.textContent = title;
  modalContent.innerHTML = '';

  images.forEach(imgSrc => {
    const imgEl = document.createElement('img');
    imgEl.src = imgSrc;
    imgEl.className = 'w-full max-w-lg rounded-2xl shadow-lg border-2 border-gray-100 object-contain';
    imgEl.alt = 'Interior Sample Page';
    modalContent.appendChild(imgEl);
  });

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLookInside() {
  const modal = document.getElementById('preview-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Close modal on background click or Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLookInside();
});
document.getElementById('preview-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'preview-modal') closeLookInside();
});

// 4. Free Printable Download Handler
function handleDownload(e) {
  e.preventDefault();
  const emailInput = document.getElementById('subscriber-email');
  if (!emailInput || !emailInput.value) return;

  const email = emailInput.value;
  // Trigger file download
  const link = document.createElement('a');
  link.href = 'free-printables/Free_5_Page_Coloring_Pack_Artist_Co.pdf';
  link.download = 'Free_5_Page_Coloring_Pack_Artist_Co.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert(`🎉 Thank you! Your 5-page coloring pack is downloading now. We have sent a confirmation to ${email}!`);
  emailInput.value = '';
}

// 5. Interactive Canvas (Kids Digital Coloring Pad)
let canvas, ctx;
let isDrawing = false;
let currentColor = '#FF7B9C';

function initCanvas() {
  canvas = document.getElementById('coloring-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  // Load line art outline (Cupcake & Cherry)
  drawSampleOutline();

  // Pointer Events (supports mouse and touch)
  canvas.addEventListener('pointerdown', startDrawing);
  canvas.addEventListener('pointermove', draw);
  canvas.addEventListener('pointerup', stopDrawing);
  canvas.addEventListener('pointercancel', stopDrawing);
}

function drawSampleOutline() {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const cx = 250;
  const cy = 250;

  // Cupcake wrapper
  ctx.beginPath();
  ctx.moveTo(cx - 100, cy + 50);
  ctx.lineTo(cx + 100, cy + 50);
  ctx.lineTo(cx + 70, cy + 180);
  ctx.lineTo(cx - 70, cy + 180);
  ctx.closePath();
  ctx.stroke();

  // Wrapper pleats
  for (let x = -50; x <= 50; x += 25) {
    ctx.beginPath();
    ctx.moveTo(cx + x * 1.1, cy + 55);
    ctx.lineTo(cx + x * 0.85, cy + 175);
    ctx.stroke();
  }

  // Cupcake Frosting swirls
  ctx.beginPath();
  ctx.arc(cx - 70, cy + 20, 35, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + 70, cy + 20, 35, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy - 20, 60, 0, Math.PI * 2);
  ctx.stroke();

  // Cherry on top
  ctx.beginPath();
  ctx.arc(cx, cy - 100, 25, 0, Math.PI * 2);
  ctx.stroke();

  // Cherry stem
  ctx.beginPath();
  ctx.moveTo(cx, cy - 125);
  ctx.quadraticCurveTo(cx + 35, cy - 160, cx + 45, cy - 180);
  ctx.stroke();

  // Smiling face on cupcake
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx - 25, cy + 110, 8, 0, Math.PI * 2);
  ctx.arc(cx + 25, cy + 110, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + 120, 16, 0, Math.PI);
  ctx.stroke();

  // Text title
  ctx.font = 'bold 20px Fredoka, sans-serif';
  ctx.fillStyle = '#2D3142';
  ctx.textAlign = 'center';
  ctx.fillText('Color The Sweet Cupcake!', cx, 40);
}

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  ctx.fillStyle = currentColor;
  ctx.beginPath();
  ctx.arc(x, y, 14, 0, Math.PI * 2);
  ctx.fill();
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function setBrushColor(color) {
  currentColor = color;
  const buttons = document.querySelectorAll('.color-btn');
  buttons.forEach(btn => btn.classList.remove('active', 'ring-2', 'ring-brand-pink'));
  if (event && event.target) {
    event.target.classList.add('active', 'ring-2', 'ring-brand-pink');
  }
}

function clearCanvas() {
  drawSampleOutline();
}

function downloadArtwork() {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'My_Artist_Co_Cupcake_Art.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
});
