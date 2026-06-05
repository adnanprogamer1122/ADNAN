const plannerForm = document.getElementById('planner-form');
const popupOverlay = document.getElementById('popup-overlay');
const popupTitle = document.getElementById('popup-title');
const itineraryContent = document.getElementById('itinerary-content');
const saveTripButton = document.getElementById('save-trip');
const copyTextButton = document.getElementById('copy-text');
const closePopupButtons = document.querySelectorAll('.close-popup');
const loaderOverlay = document.getElementById('loader-overlay');
const loaderProgress = document.getElementById('loader-progress');
const heroButtons = document.querySelectorAll('#hero-cta, #hero-cta-bottom');

const sampleItineraryTemplate = ({ destination, startDate, endDate, budget, travelers }) => {
  return `🗺️ Itinerary Waypoint untuk ${destination}

• Durasi: ${startDate} sampai ${endDate}
• Budget: Rp ${budget} untuk ${travelers} orang

Hari 1 — Tiba & adaptasi
  • Check-in hotel ramah budget
  • Jalan santai di area lokal
  • Makan malam khas setempat

Hari 2 — Wisata populer pemula
  • Kunjungi landmark utama
  • Coba kuliner jalanan
  • Foto spot Instagramable

Hari 3 — Budaya & tips praktis
  • Belajar transportasi umum
  • Kunjungi pasar atau festival lokal
  • Selesaikan itinerary ringan

Tips:
  • Pilih penginapan dekat transportasi umum
  • Siapkan cash lokal dan kartu
  • Simpan itinerary ini di browser kamu
`;
};

function openLoader() {
  loaderOverlay.classList.add('active');
  const interval = setInterval(() => {
    const currentWidth = Number(loaderProgress.style.width.replace('%', '')) || 0;
    const nextWidth = Math.min(currentWidth + Math.floor(Math.random() * 20) + 10, 98);
    loaderProgress.style.width = `${nextWidth}%`;
  }, 250);
  return interval;
}

function closeLoader(intervalId) {
  clearInterval(intervalId);
  loaderOverlay.classList.remove('active');
  loaderProgress.style.width = '25%';
}

function openPopup(title, content) {
  popupTitle.textContent = title;
  itineraryContent.textContent = content;
  popupOverlay.classList.add('active');
}

function closePopup() {
  popupOverlay.classList.remove('active');
}

function saveTrip() {
  const current = {
    title: popupTitle.textContent,
    itinerary: itineraryContent.textContent,
    createdAt: new Date().toISOString(),
  };
  const saved = JSON.parse(localStorage.getItem('waypointTrips') || '[]');
  saved.unshift(current);
  localStorage.setItem('waypointTrips', JSON.stringify(saved.slice(0, 5)));
  saveTripButton.textContent = 'Tersimpan!';
  setTimeout(() => {
    saveTripButton.textContent = '💾 Simpan Trip';
  }, 1800);
}

function copyItineraryText() {
  navigator.clipboard.writeText(itineraryContent.textContent).then(() => {
    copyTextButton.textContent = 'Disalin!';
    setTimeout(() => {
      copyTextButton.textContent = '📋 Salin Teks';
    }, 1600);
  });
}

plannerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(plannerForm);
  const destination = formData.get('destination').trim() || 'destinasi impian';
  const startDate = formData.get('start-date') || 'Tanggal awal';
  const endDate = formData.get('end-date') || 'Tanggal pulang';
  const budget = formData.get('budget') || '0';
  const travelers = formData.get('travelers') || '1';

  const loaderInterval = openLoader();
  setTimeout(() => {
    closeLoader(loaderInterval);
    const itinerary = sampleItineraryTemplate({ destination, startDate, endDate, budget, travelers });
    openPopup(`Itinerary: ${destination}`, itinerary);
  }, 1500 + Math.random() * 1200);
});

closePopupButtons.forEach((button) => button.addEventListener('click', closePopup));
saveTripButton.addEventListener('click', saveTrip);
copyTextButton.addEventListener('click', copyItineraryText);
heroButtons.forEach((button) => button.addEventListener('click', () => {
  document.getElementById('hero-form').scrollIntoView({ behavior: 'smooth' });
}));
