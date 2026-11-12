// ================================================================
// DASHBOARD ADMIN - FAZL & NADYA WEDDING INVITATION
// Support API PHP (JSON Database) + LocalStorage Fallback
// ================================================================

const defaultData = {
  groomShort: "Fazl",
  brideShort: "Nadya",
  coverTag: "THE WEDDING OF",
  coverSub: "Kami mengundang Anda untuk hadir di momen bahagia kami",
  coverBg: "assets/bg.jpg",

  greetingTitle: "Salam Hangat,",
  greetingVerse: "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.” (QS. Ar-Rum: 21)",
  greetingText1: "Dengan penuh rasa syukur dan sukacita ke hadirat Tuhan Yang Maha Esa, kami bermaksud membagikan kabar bahagia ini bersama Anda. Kami mengundang Bapak/Ibu/Saudara/i untuk menjadi bagian dan saksi dari hari istimewa pernikahan kami.",
  greetingText2: "Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi langkah awal perjalanan hidup baru kami.",

  groomFull: "Fazl El Hakeem, S.T",
  groomBirth: "Lahir : 01 Januari 2007",
  groomParents: "Putra tercinta dari Bapak Andy Weir & Ibu Windy Floren",
  groomQuote: "“Bagi saya, dia bukan hanya pasangan hidup, tetapi juga rumah tempat saya selalu ingin pulang.”",
  groomPhoto: "assets/fazl.jpeg",

  brideFull: "Nadya Sulfa, S.T",
  brideBirth: "Lahir : 31 Desember 2007",
  brideParents: "Putri tercinta dari Bapak Ander Terzt & Ibu Diana Lisen",
  brideQuote: "“Dia adalah alasan saya percaya bahwa setiap doa baik selalu menemukan jalannya di waktu yang paling tepat.”",
  bridePhoto: "assets/nadya.jpeg",

  story1Title: "First Met (2020)",
  story1Text: "Pertemuan di Kampus - “Pertemuan sederhana yang kemudian tumbuh menjadi awal dari cerita luar biasa.”",
  story1Photo: "assets/gallery1.jpeg",
  story2Title: "The Journey (2024–2026)",
  story2Text: "Melangkah di Tempat yang Sama - “Dari langkah yang seirama, tumbuh rasa saling percaya yang semakin nyata.”",
  story2Photo: "assets/gallery2.jpeg",
  story3Title: "Beginning of Forever (2027)",
  story3Text: "Menuju Kehidupan Baru - “Hari ini bukan akhir dari perjalanan, melainkan awal dari kebersamaan selamanya.”",
  story3Photo: "assets/gallery3.jpeg",

  eventDay: "12",
  eventMonth: "12",
  eventYear: "2027",
  eventTime: "Minggu • Pukul 09:00 WIB",
  countdownTarget: "2027-12-12 09:00:00",
  eventPhoto: "assets/gallery4.jpeg",

  venueName: "The Grand Ballroom",
  venueHotel: "Hotel Mulia Senayan, Jakarta",
  venueAddress: "Jl. Asia Afrika, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, DKI Jakarta 10270",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Mulia+Senayan+Jakarta",
  venuePhoto: "assets/hotel-mewah.jpg",

  galleryPhoto1: "assets/gallery1.jpeg",
  galleryPhoto2: "assets/gallery3.jpeg",
  galleryPhoto3: "assets/gallery6.jpeg",
  galleryPhoto4: "assets/gallery2.jpeg",
  galleryPhoto5: "assets/gallery8.jpeg",
  galleryPhoto6: "assets/1.jpeg",
  galleryPhoto7: "assets/gallery7.jpeg",
  galleryPhoto8: "assets/gallery4.jpeg",

  videoSrc: "assets/Movie.mp4",
  musicSrc: "assets/music.mp3",

  cashlessText: "Doa restu Anda adalah karunia yang terindah bagi kami. Namun jika memberi merupakan ungkapan kasih, Anda dapat memberikan tanda kasih secara cashless melalui QRIS di atas.",
  qrPhoto: "assets/QR code.jpeg",
  bankName: "BCA",
  accountNumber: "1234567890",
  accountName: "Fazl El Hakeem"
};

const defaultGuests = [
  { id: 1, name: "Susilo Bambang Yudhoyono" },
  { id: 2, name: "Joko Widodo" },
  { id: 3, name: "Prabowo Subianto" },
  { id: 4, name: "NCT Dream" },
  { id: 5, name: "BTS" },
  { id: 6, name: "BABY MONSTER" },
  { id: 7, name: "HEARTS2HEARTS" },
  { id: 8, name: "AMBATUKAMBA" }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  loadFormData();
  loadGuests();
  loadWishes();

  const addGuestForm = document.getElementById("addGuestForm");
  if (addGuestForm) {
    addGuestForm.addEventListener("submit", handleAddGuest);
  }
});

// --- AUTHENTICATION ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === "admin" && pass === "123456") {
      localStorage.setItem("isAdminLoggedIn", "true");
      const errEl = document.getElementById("loginError");
      if (errEl) errEl.style.display = "none";
      checkAuth();
      showToast("Selamat datang di Executive Dashboard!");
    } else {
      const errEl = document.getElementById("loginError");
      if (errEl) errEl.style.display = "block";
    }
  });
}

function checkAuth() {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const loginView = document.getElementById("loginView");
  const dashboardView = document.getElementById("dashboardView");

  if (isLoggedIn) {
    if (loginView) loginView.style.display = "none";
    if (dashboardView) dashboardView.style.display = "flex";
  } else {
    if (loginView) loginView.style.display = "flex";
    if (dashboardView) dashboardView.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("isAdminLoggedIn");
  checkAuth();
}

// --- SWITCH TAB ---
function switchTab(tabName, btnEl) {
  document.querySelectorAll(".tab-content").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((el) => el.classList.remove("active"));

  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) targetTab.classList.add("active");

  const targetBtn = btnEl || document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
  if (targetBtn) targetBtn.classList.add("active");

  const autosaveHint = document.getElementById("autosaveHint");
  if (autosaveHint) {
    if (tabName === "tamu" || tabName === "ucapan") {
      autosaveHint.hidden = false;
    } else {
      autosaveHint.hidden = true;
    }
  }

  // Pada mobile, tutup drawer sidebar setelah user memilih menu
  if (window.innerWidth <= 900) {
    toggleSidebar(false);
  }

  const titles = {
    pengantin: "Mempelai & Informasi Utama",
    detail: "Detail Lengkap Kedua Mempelai",
    acara: "Waktu, Countdown & Lokasi Acara",
    story: "Love Story & Media Utama (Video / Musik)",
    galeri: "Galeri Dokumentasi Foto (8 Foto)",
    cashless: "Amplop Digital & QRIS Cashless",
    tamu: "Manajemen Tamu Undangan (ID Link)",
    ucapan: "Daftar Pesan & Doa Restu Tamu"
  };

  const titleEl = document.getElementById("pageTitle");
  if (titleEl && titles[tabName]) {
    titleEl.innerText = titles[tabName];
  }
}

// --- TOGGLE SIDEBAR (DESKTOP COLLAPSE & MOBILE DRAWER) ---
function toggleSidebar(force) {
  const container = document.getElementById("dashboardView");
  if (!container) return;

  if (window.innerWidth <= 900) {
    // Mode Mobile: Toggle Drawer
    if (typeof force === "boolean") {
      container.classList.toggle("sidebar-open", force);
    } else {
      container.classList.toggle("sidebar-open");
    }
  } else {
    // Mode Desktop: Toggle Collapse
    if (typeof force === "boolean") {
      container.classList.toggle("sidebar-collapsed", force);
    } else {
      container.classList.toggle("sidebar-collapsed");
    }
  }
}

// --- LOAD FORM DATA (API / LOCALSTORAGE) ---
async function loadFormData() {
  let loadedData = null;

  try {
    const res = await fetch("api.php?action=get_content");
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === "object" && Object.keys(json).length > 0) {
        loadedData = json;
      }
    }
  } catch (err) {
    console.warn("Koneksi API get_content tidak tersedia, menggunakan data lokal.");
  }

  if (!loadedData) {
    try {
      loadedData = JSON.parse(localStorage.getItem("weddingData"));
    } catch (e) {
      loadedData = null;
    }
  }

  const activeData = Object.assign({}, defaultData, loadedData || {});

  Object.keys(activeData).forEach((key) => {
    const input = document.getElementById(key);
    if (input) {
      input.value = activeData[key];
    }
    // Update live preview image if present
    const previewImg = document.getElementById(`preview-${key}`);
    if (previewImg && activeData[key]) {
      previewImg.src = activeData[key];
    }
  });

  // Khusus galeri foto preview
  for (let i = 1; i <= 8; i++) {
    const galKey = `galleryPhoto${i}`;
    const pImg = document.getElementById(`preview-gal${i}`);
    if (pImg && activeData[galKey]) {
      pImg.src = activeData[galKey];
    }
  }

  localStorage.setItem("weddingData", JSON.stringify(activeData));
}

// --- SIMPAN FORM DATA ---
const adminDataForm = document.getElementById("adminDataForm");
if (adminDataForm) {
  adminDataForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {};
    const inputs = document.querySelectorAll("#adminDataForm input, #adminDataForm textarea");

    inputs.forEach((input) => {
      if (input.name && input.type !== "file") {
        formData[input.name] = input.value;
      }
    });

    localStorage.setItem("weddingData", JSON.stringify(formData));

    // Kirim ke API PHP jika tersedia
    try {
      const res = await fetch("api.php?action=save_content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast("Semua konfigurasi berhasil disimpan ke server!");
          return;
        }
      }
    } catch (err) {
      console.warn("Gagal simpan ke server api.php, disimpan di localStorage.");
    }

    showToast("Perubahan data berhasil disimpan!");
  });
}

// --- HANDLE MEDIA UPLOAD ---
async function handleFileUpload(fileInput, targetFieldId, previewImgId) {
  if (!fileInput.files || fileInput.files.length === 0) return;
  const file = fileInput.files[0];

  // 1. Live preview via FileReader
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewEl = document.getElementById(previewImgId);
    if (previewEl) {
      previewEl.src = e.target.result;
      previewEl.style.display = "block";
    }
  };
  reader.readAsDataURL(file);

  // 2. Upload via API PHP
  const formData = new FormData();
  formData.append("file", file);

  try {
    showToast("Mengunggah file ke server...");
    const res = await fetch("api.php?action=upload_media", {
      method: "POST",
      body: formData
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.path) {
        const targetInput = document.getElementById(targetFieldId);
        if (targetInput) {
          targetInput.value = json.path;
        }
        showToast("File berhasil diunggah: " + json.path);
        return;
      }
    }
  } catch (err) {
    console.warn("Upload API gagal / offline:", err);
  }

  // Jika offline atau static server, simpan FileReader data ke input target
  const targetInput = document.getElementById(targetFieldId);
  if (targetInput && reader.result) {
    targetInput.value = reader.result;
  }
  showToast("File dipilih (pratinjau aktif). Klik 'Simpan Perubahan'!");
}

// --- MANAJEMEN TAMU (GUEST ID LINK) ---
async function loadGuests() {
  let guests = null;

  try {
    const res = await fetch("api.php?action=get_guests");
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        guests = json;
      }
    }
  } catch (err) {
    console.warn("Gagal load tamu dari API, pakai cache.");
  }

  if (!guests) {
    try {
      guests = JSON.parse(localStorage.getItem("weddingGuests"));
    } catch (e) {
      guests = null;
    }
  }

  if (!guests || guests.length === 0) {
    guests = defaultGuests;
  }

  localStorage.setItem("weddingGuests", JSON.stringify(guests));
  renderGuests(guests);
}

function renderGuests(guests) {
  const tbody = document.getElementById("guestsTableBody");
  const countBadge = document.getElementById("guestCountBadge");

  if (countBadge) {
    countBadge.innerText = `${guests.length} Tamu`;
  }

  if (!tbody) return;
  tbody.innerHTML = "";

  if (guests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 32px; color: var(--text-muted); font-size: 13.5px;">Belum ada tamu terdaftar. Silakan tambah tamu di atas.</td></tr>`;
    return;
  }

  // Generate current site base URL
  const baseUrl = window.location.href.split("?")[0].replace("dashboard.html", "");

  guests.forEach((guest) => {
    const guestLink = `${baseUrl}namaTamu.php?tamu=${guest.id}`;
    const displayLink = `namaTamu.php?tamu=${guest.id}`;
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><span class="badge-id">#${guest.id}</span></td>
      <td><strong style="color: var(--text-title);">${escapeHtml(guest.name)}</strong></td>
      <td>
        <div class="guest-link-cell" title="${guestLink}">${displayLink}</div>
      </td>
      <td style="text-align: right;">
        <button type="button" class="btn-copy-link" onclick="copyGuestLink(${guest.id}, '${escapeAttr(guest.name)}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Salin Link</span>
        </button>
        <button type="button" class="btn-del" onclick="deleteGuest(${guest.id})" style="margin-left: 6px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          <span>Hapus</span>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function handleAddGuest(e) {
  e.preventDefault();
  const input = document.getElementById("newGuestName");
  const name = input ? input.value.trim() : "";
  if (!name) return;

  try {
    const res = await fetch("api.php?action=add_guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        input.value = "";
        await loadGuests();
        showToast(`Tamu "${name}" berhasil ditambahkan!`);
        return;
      }
    }
  } catch (err) {
    console.warn("Gagal add_guest ke server, fallback ke localStorage.");
  }

  // LocalStorage Fallback
  let guests = JSON.parse(localStorage.getItem("weddingGuests")) || defaultGuests;
  const maxId = guests.reduce((max, g) => (g.id > max ? g.id : max), 0);
  const newGuest = { id: maxId + 1, name };
  guests.push(newGuest);
  localStorage.setItem("weddingGuests", JSON.stringify(guests));

  if (input) input.value = "";
  renderGuests(guests);
  showToast(`Tamu "${name}" berhasil ditambahkan!`);
}

async function deleteGuest(id) {
  if (!confirm("Hapus tamu undangan ini?")) return;

  try {
    const res = await fetch("api.php?action=delete_guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      await loadGuests();
      showToast("Tamu berhasil dihapus!");
      return;
    }
  } catch (err) {
    console.warn("Gagal delete_guest ke server, fallback ke localStorage.");
  }

  let guests = JSON.parse(localStorage.getItem("weddingGuests")) || defaultGuests;
  guests = guests.filter((g) => g.id !== id);
  localStorage.setItem("weddingGuests", JSON.stringify(guests));
  renderGuests(guests);
  showToast("Tamu berhasil dihapus!");
}

function copyGuestLink(id, name) {
  const baseUrl = window.location.href.split("?")[0].replace("dashboard.html", "");
  // Memberikan link utama yang ramah php maupun html
  const targetLink = `${baseUrl}namaTamu.php?tamu=${id}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(targetLink).then(() => {
      showToast(`Link undangan untuk "${name}" berhasil disalin!`);
    }).catch(() => {
      prompt("Salin link undangan berikut:", targetLink);
    });
  } else {
    prompt("Salin link undangan berikut:", targetLink);
  }
}

// --- MANAJEMEN UCAPAN / BUKU TAMU ---
async function loadWishes() {
  let wishes = null;

  try {
    const res = await fetch("api.php?action=get_wishes");
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json)) {
        wishes = json;
      }
    }
  } catch (err) {
    console.warn("Gagal load ucapan dari server, fallback ke localStorage.");
  }

  if (!wishes) {
    try {
      wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
    } catch (e) {
      wishes = [];
    }
  }

  localStorage.setItem("weddingWishes", JSON.stringify(wishes));
  renderWishes(wishes);
}

function renderWishes(wishes) {
  const tbody = document.getElementById("wishesTableBody");
  const countBadge = document.getElementById("wishCountBadge");

  if (countBadge) {
    countBadge.innerText = `${wishes.length} Pesan`;
  }

  if (!tbody) return;
  tbody.innerHTML = "";

  if (wishes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 35px 20px; color: var(--text-muted); font-size: 13.5px;">Belum ada ucapan atau doa restu dari tamu undangan.</td></tr>`;
    return;
  }

  wishes.forEach((item, index) => {
    const tr = document.createElement("tr");
    let timeStr = "-";
    if (item.time) {
      try {
        const d = new Date(item.time);
        timeStr = d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      } catch (e) {
        timeStr = item.time;
      }
    }

    const wishId = item.id !== undefined ? item.id : index;

    tr.innerHTML = `
      <td class="text-center font-mono">${index + 1}</td>
      <td><strong style="color: var(--text-title);">${escapeHtml(item.name)}</strong></td>
      <td class="wish-msg">${escapeHtml(item.message)}</td>
      <td style="font-size: 12px; color: var(--text-muted);">${timeStr}</td>
      <td class="text-right">
        <button type="button" class="btn-del" onclick="deleteWish('${wishId}', ${index})" title="Hapus pesan ini">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          <span>Hapus</span>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteWish(id, index) {
  if (!confirm("Hapus pesan ucapan ini?")) return;

  try {
    const res = await fetch("api.php?action=delete_wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, index })
    });
    if (res.ok) {
      await loadWishes();
      showToast("Pesan ucapan berhasil dihapus!");
      return;
    }
  } catch (err) {
    console.warn("Gagal hapus ucapan di server, pakai local.");
  }

  let wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
  wishes.splice(index, 1);
  localStorage.setItem("weddingWishes", JSON.stringify(wishes));
  renderWishes(wishes);
  showToast("Pesan ucapan berhasil dihapus!");
}

async function clearAllWishes() {
  const wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
  if (wishes.length === 0) {
    showToast("Daftar ucapan masih kosong.");
    return;
  }
  if (!confirm("Apakah Anda yakin ingin menghapus SELURUH pesan doa restu tamu?")) return;

  try {
    const res = await fetch("api.php?action=clear_wishes", {
      method: "POST"
    });
    if (res.ok) {
      await loadWishes();
      showToast("Semua ucapan berhasil dibersihkan!");
      return;
    }
  } catch (err) {
    console.warn("Gagal clear ucapan di server, pakai local.");
  }

  localStorage.removeItem("weddingWishes");
  renderWishes([]);
  showToast("Semua ucapan berhasil dibersihkan!");
}

// --- HELPER TOAST & UTILITIES ---
function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  if (toastMessage) {
    toastMessage.innerText = msg;
  } else if (toast) {
    toast.innerText = msg;
  }
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(text) {
  if (!text) return "";
  return String(text).replace(/'/g, "\\'").replace(/"/g, "&quot;");
}
