// ================================================================
// FRONTEND SCRIPT - FAZL & NADYA WEDDING INVITATION
// Support Real-Time Data Sync, ID-based Guest URL & Continuous Animations
// ================================================================

let countdownTargetTime = new Date("December 12, 2027 09:00:00").getTime();

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Sinkronisasi Data Landing Page (API / LocalStorage)
  await syncLandingPageContent();

  // 2. Lookup Nama Tamu berdasarkan ID link (?tamu=ID atau ?to=ID)
  await resolveGuestName();

  // 3. Inisialisasi Fitur Interaktif & Animasi
  initScrollReveal();
  initScrollSpy();
  initParticles();
  initCountdown();
});

// --- SINKRONISASI KONTEN DINAMIS DARI DASHBOARD ---
async function syncLandingPageContent() {
  let data = null;

  try {
    const res = await fetch("api.php?action=get_content");
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === "object" && Object.keys(json).length > 0) {
        data = json;
      }
    }
  } catch (err) {
    // API offline/static mode
  }

  if (!data) {
    try {
      data = JSON.parse(localStorage.getItem("weddingData"));
    } catch (e) {
      data = null;
    }
  }

  if (!data) return;

  // 1. Nama Singkat Mempelai di Berbagai Section
  if (data.groomShort && data.brideShort) {
    document.querySelectorAll(".cover-name").forEach((el) => {
      el.innerHTML = `<span>${escapeHtml(data.groomShort)} &</span><span>${escapeHtml(data.brideShort)}</span>`;
    });

    document.querySelectorAll(
      ".top-name, .story-name, .couple-name, .gallery-name, .wish-couple-name, .thank-right-name"
    ).forEach((el) => {
      el.innerHTML = `${escapeHtml(data.groomShort)} &amp;<br>${escapeHtml(data.brideShort)}`;
    });

    const movieTitle = document.querySelector(".movie-title");
    if (movieTitle) {
      movieTitle.innerHTML = `${escapeHtml(data.groomShort)} &amp; ${escapeHtml(data.brideShort)}<span>WEDDING MOVIE</span>`;
    }
  }

  // 2. Cover Section
  const coverTag = document.getElementById("displayCoverTag");
  if (coverTag && data.coverTag) coverTag.textContent = data.coverTag;

  const coverSub = document.getElementById("displayCoverSub");
  if (coverSub && data.coverSub) coverSub.textContent = data.coverSub;

  if (data.coverBg) {
    const page1 = document.getElementById("page1");
    if (page1) page1.style.backgroundImage = `url("${data.coverBg}")`;
  }

  // 3. Greeting & Sacred Verse (Page 2)
  const greetingTitle = document.getElementById("displayGreetingTitle");
  if (greetingTitle && data.greetingTitle) greetingTitle.textContent = data.greetingTitle;

  const greetingVerse = document.getElementById("displayGreetingVerse");
  if (greetingVerse && data.greetingVerse) greetingVerse.textContent = data.greetingVerse;

  const greetingText1 = document.getElementById("displayGreetingText1");
  if (greetingText1 && data.greetingText1) greetingText1.textContent = data.greetingText1;

  const greetingText2 = document.getElementById("displayGreetingText2");
  if (greetingText2 && data.greetingText2) greetingText2.textContent = data.greetingText2;

  // 4. Groom Profile (Page 3)
  const groomPhoto = document.getElementById("displayGroomPhoto");
  if (groomPhoto && data.groomPhoto) groomPhoto.src = data.groomPhoto;

  const groomFull = document.getElementById("displayGroomFull");
  if (groomFull && data.groomFull) groomFull.textContent = data.groomFull;

  const groomBirth = document.getElementById("displayGroomBirth");
  if (groomBirth && data.groomBirth) {
    groomBirth.innerHTML = `<strong>Lahir :</strong> ${escapeHtml(data.groomBirth.replace(/^Lahir\s*:\s*/i, ""))}`;
  }

  const groomParents = document.getElementById("displayGroomParents");
  if (groomParents && data.groomParents) groomParents.textContent = data.groomParents;

  const groomQuote = document.getElementById("displayGroomQuote");
  if (groomQuote && data.groomQuote) groomQuote.textContent = data.groomQuote;

  // 5. Bride Profile (Page 4)
  const bridePhoto = document.getElementById("displayBridePhoto");
  if (bridePhoto && data.bridePhoto) bridePhoto.src = data.bridePhoto;

  const brideFull = document.getElementById("displayBrideFull");
  if (brideFull && data.brideFull) brideFull.textContent = data.brideFull;

  const brideBirth = document.getElementById("displayBrideBirth");
  if (brideBirth && data.brideBirth) {
    brideBirth.innerHTML = `<strong>Lahir :</strong> ${escapeHtml(data.brideBirth.replace(/^Lahir\s*:\s*/i, ""))}`;
  }

  const brideParents = document.getElementById("displayBrideParents");
  if (brideParents && data.brideParents) brideParents.textContent = data.brideParents;

  const brideQuote = document.getElementById("displayBrideQuote");
  if (brideQuote && data.brideQuote) brideQuote.textContent = data.brideQuote;

  // 6. Love Stories (Page 5)
  if (data.story1Photo) setSrc("displayStory1Photo", data.story1Photo);
  if (data.story1Title) setText("displayStory1Title", data.story1Title);
  if (data.story1Text) setText("displayStory1Text", data.story1Text);

  if (data.story2Photo) setSrc("displayStory2Photo", data.story2Photo);
  if (data.story2Title) setText("displayStory2Title", data.story2Title);
  if (data.story2Text) setText("displayStory2Text", data.story2Text);

  if (data.story3Photo) setSrc("displayStory3Photo", data.story3Photo);
  if (data.story3Title) setText("displayStory3Title", data.story3Title);
  if (data.story3Text) setText("displayStory3Text", data.story3Text);

  // 7. Waktu Acara & Countdown (Page 6)
  if (data.eventDay) setText("displayEventDay", data.eventDay);
  if (data.eventMonth) setText("displayEventMonth", data.eventMonth);
  if (data.eventYear) setText("displayEventYear", data.eventYear);
  if (data.eventTime) setText("displayEventTime", data.eventTime);
  if (data.eventPhoto) setSrc("displayEventPhoto", data.eventPhoto);

  if (data.countdownTarget) {
    const parsed = new Date(data.countdownTarget).getTime();
    if (!isNaN(parsed)) {
      countdownTargetTime = parsed;
    }
  }

  // 8. Lokasi Acara (Page 7)
  if (data.venuePhoto) setSrc("displayVenuePhoto", data.venuePhoto);
  if (data.venueName) setText("displayVenueName", data.venueName);
  if (data.venueHotel) setText("displayVenueHotel", data.venueHotel);
  if (data.venueAddress) setText("displayVenueAddress", data.venueAddress);
  if (data.mapsUrl) {
    const mapBtn = document.getElementById("displayMapsUrl");
    if (mapBtn) mapBtn.href = data.mapsUrl;
  }

  // 9. Galeri 8 Foto (Page 8)
  for (let i = 1; i <= 8; i++) {
    const photoUrl = data[`galleryPhoto${i}`];
    if (photoUrl) {
      setSrc(`displayGal${i}`, photoUrl);
    }
  }

  // 10. Video & Musik
  if (data.videoSrc) {
    const videoSource = document.getElementById("displayVideoSrc");
    const videoEl = document.getElementById("displayVideo");
    if (videoSource && videoEl && videoSource.src !== data.videoSrc) {
      videoSource.src = data.videoSrc;
      videoEl.load();
    }
  }

  if (data.musicSrc) {
    const audioEl = document.getElementById("music");
    if (audioEl) {
      const source = audioEl.querySelector("source");
      if (source && source.src !== data.musicSrc) {
        source.src = data.musicSrc;
        audioEl.load();
      }
    }
  }

  // 11. Amplop Digital & QRIS (Page 10)
  if (data.qrPhoto) setSrc("displayQrPhoto", data.qrPhoto);
  if (data.cashlessText) setText("displayCashlessText", data.cashlessText);
  if (data.bankName) setText("displayBankName", data.bankName);
  if (data.accountNumber) setText("displayAccountNumber", data.accountNumber);
  if (data.accountName) {
    const formattedName = data.accountName.toLowerCase().startsWith("a.n")
      ? data.accountName
      : `a.n ${data.accountName}`;
    setText("displayAccountName", formattedName);
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setSrc(id, src) {
  const el = document.getElementById(id);
  if (el && src) el.src = src;
}

// --- RESOLVE NAMA TAMU BERDASARKAN ID LINK ---
async function resolveGuestName() {
  const guestNameEl = document.querySelector(".guest-name");
  if (!guestNameEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("tamu") || urlParams.get("to");

  if (!guestParam) {
    // Jika tidak ada parameter dan teks masih placeholder PHP
    if (guestNameEl.textContent.includes("<?php") || !guestNameEl.textContent.trim()) {
      guestNameEl.textContent = "Tamu Undangan";
    }
    return;
  }

  // Jika parameter berupa angka (ID Tamu)
  if (/^\d+$/.test(guestParam)) {
    const targetId = parseInt(guestParam, 10);
    let guestFound = null;

    // 1. Coba dari API get_guests
    try {
      const res = await fetch("api.php?action=get_guests");
      if (res.ok) {
        const guests = await res.json();
        if (Array.isArray(guests)) {
          guestFound = guests.find((g) => parseInt(g.id, 10) === targetId);
        }
      }
    } catch (e) {}

    // 2. Coba dari data/guests.json langsung jika static fetch
    if (!guestFound) {
      try {
        const res = await fetch("data/guests.json");
        if (res.ok) {
          const guests = await res.json();
          if (Array.isArray(guests)) {
            guestFound = guests.find((g) => parseInt(g.id, 10) === targetId);
          }
        }
      } catch (e) {}
    }

    // 3. Coba dari localStorage
    if (!guestFound) {
      try {
        const localGuests = JSON.parse(localStorage.getItem("weddingGuests"));
        if (Array.isArray(localGuests)) {
          guestFound = localGuests.find((g) => parseInt(g.id, 10) === targetId);
        }
      } catch (e) {}
    }

    if (guestFound && guestFound.name) {
      guestNameEl.textContent = guestFound.name;
      return;
    }
  }

  // Jika parameter berupa string nama langsung (?to=Nama%20Tamu)
  if (isNaN(guestParam)) {
    guestNameEl.textContent = guestParam;
  }
}

// --- FORM UCAPAN / RSVP TAMU ---
const wishForm = document.getElementById("wishForm");
if (wishForm) {
  wishForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("guestName");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !message) {
      alert("Harap isi nama dan ucapan Anda.");
      return;
    }

    // 1. Simpan ke Server via API PHP
    try {
      const res = await fetch("api.php?action=add_wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          alert("Terima kasih atas ucapan dan doa restunya!");
          wishForm.reset();
          return;
        }
      }
    } catch (err) {
      console.warn("Gagal mengirim ucapan ke api.php, disimpan lokal.");
    }

    // 2. Simpan ke LocalStorage jika offline
    const wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
    wishes.unshift({
      id: Date.now(),
      name,
      message,
      time: new Date().toISOString()
    });
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));

    alert("Terima kasih atas ucapan dan doa restunya!");
    wishForm.reset();
  });
}

// --- BUKA UNDANGAN & AUDIO PLAY ---
function openInvitation() {
  document.body.classList.add("invitation-open");
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");

  if (music) {
    music.play().then(() => {
      if (musicBtn) musicBtn.classList.add("playing");
    }).catch((error) => {
      console.log("Audio auto-play policy prevented playback:", error);
    });
  }

  setTimeout(() => {
    initScrollReveal();
  }, 100);

  const page2 = document.getElementById("page2");
  if (page2) {
    page2.scrollIntoView({ behavior: "smooth" });
  }
}

// Kontrol Musik Play / Pause
const musicBtn = document.getElementById("musicBtn");
if (musicBtn) {
  musicBtn.addEventListener("click", function () {
    const music = document.getElementById("music");
    if (!music) return;
    if (music.paused) {
      music.play();
      this.classList.add("playing");
    } else {
      music.pause();
      this.classList.remove("playing");
    }
  });
}

// --- COUNTDOWN (HARI, JAM, MENIT, DETIK) ---
function initCountdown() {
  function update() {
    const sekarang = new Date().getTime();
    const selisih = countdownTargetTime - sekarang;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!hoursEl || !minutesEl || !secondsEl) return;

    if (selisih <= 0) {
      if (daysEl) daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const hours = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((selisih / (1000 * 60)) % 60);
    const seconds = Math.floor((selisih / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// --- SALIN NOMOR REKENING ---
function copyBankAccount() {
  const accEl = document.getElementById("displayAccountNumber");
  const accNum = accEl ? accEl.textContent.trim() : "1234567890";

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(accNum).then(() => {
      alert(`Nomor rekening ${accNum} berhasil disalin!`);
    }).catch(() => {
      prompt("Salin nomor rekening:", accNum);
    });
  } else {
    prompt("Salin nomor rekening:", accNum);
  }
}

// --- SCROLL REVEAL ANIMATION ---
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal:not(.revealed)");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

// --- SCROLLSPY UNTUK BOTTOM NAV ---
function initScrollSpy() {
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");
  const navMap = [
    { navKey: "page3", sectionIds: ["page3", "page4", "page5"] },
    { navKey: "page6", sectionIds: ["page6"] },
    { navKey: "page7", sectionIds: ["page7"] },
    { navKey: "page8", sectionIds: ["page8", "page9"] },
    { navKey: "page10", sectionIds: ["page10", "page11"] }
  ];

  navItems.forEach((item) => {
    const targetId = item.getAttribute("data-nav") || item.getAttribute("href").replace("#", "");
    item.addEventListener("click", (e) => {
      e.preventDefault();
      navItems.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      let activeNavKey = null;
      for (const group of navMap) {
        for (const sId of group.sectionIds) {
          const sec = document.getElementById(sId);
          if (sec) {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              activeNavKey = group.navKey;
              break;
            }
          }
        }
        if (activeNavKey) break;
      }

      if (activeNavKey) {
        navItems.forEach((btn) => {
          if (btn.getAttribute("data-nav") === activeNavKey) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }
    },
    { passive: true }
  );
}

// --- LIGHTBOX PREVIEW ---
function openLightbox(el) {
  const img = el.querySelector("img");
  const modal = document.getElementById("imageLightbox");
  const modalImg = document.getElementById("lightboxImg");
  if (img && modal && modalImg) {
    modalImg.src = img.src;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox(e) {
  if (e.target.id === "lightboxImg") return;
  const modal = document.getElementById("imageLightbox");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// --- PARTIKEL AMBIENT EMAS (KILAUAN MEWAH MELAYANG) ---
function initParticles() {
  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 36 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2.2 + 0.8,
    speedY: Math.random() * 0.35 + 0.12,
    speedX: (Math.random() - 0.5) * 0.22,
    alpha: Math.random() * 0.5 + 0.2,
    fade: Math.random() * 0.007 + 0.003
  }));

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += p.fade;
      if (p.alpha <= 0.15 || p.alpha >= 0.7) p.fade = -p.fade;

      if (p.y < 0) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 201, 130, ${Math.max(0, p.alpha)})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(197, 160, 89, 0.5)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
