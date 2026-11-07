// Membaca data dinamis dari Dashboard/localStorage
document.addEventListener("DOMContentLoaded", () => {
  // Fallback nama tamu bila dibuka langsung sebagai file HTML static tanpa server PHP
  const guestNameEl = document.querySelector(".guest-name");
  if (guestNameEl && (guestNameEl.textContent.includes("<?php") || !guestNameEl.textContent.trim())) {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to") || urlParams.get("tamu") || "Tamu Undangan";
    guestNameEl.textContent = guestParam;
  }

  const data = JSON.parse(localStorage.getItem("weddingData"));
  if (data) {
    // 1. Update Nama Singkat Pasangan
    document
      .querySelectorAll(
        ".cover-name, .top-name, .story-name, .couple-name, .gallery-name, .wish-couple-name, .thank-right-name",
      )
      .forEach((el) => {
        if (el.classList.contains("cover-name")) {
          el.innerHTML = `<span>${data.groomShort} &</span><span>${data.brideShort}</span>`;
        } else {
          el.innerHTML = `${data.groomShort} &amp;<br>${data.brideShort}`;
        }
      });

    // 2. Update Detail Groom (Fazl)
    const groomTitle = document.querySelector("#page3 .profile-info h1");
    if (groomTitle) groomTitle.innerText = data.groomFull;

    // 3. Update Detail Bride (Nadya)
    const brideTitle = document.querySelector("#page4 .profile-info h1");
    if (brideTitle) brideTitle.innerText = data.brideFull;

    // 4. Update Tanggal Acara
    const dateSpans = document.querySelectorAll(".date-stack span");
    if (dateSpans.length === 3) {
      dateSpans[0].innerText = data.eventDay;
      dateSpans[1].innerText = data.eventMonth;
      dateSpans[2].innerText = data.eventYear;
    }

    // 5. Update Link Google Maps jika diubah dari Dashboard
    if (data.mapsUrl) {
      const mapBtn = document.querySelector(".luxury-map-btn");
      if (mapBtn) mapBtn.href = data.mapsUrl;
    }
  }

  // Inisialisasi Scroll Reveal Animation
  initScrollReveal();

  // Inisialisasi ScrollSpy untuk Floating Navbar
  initScrollSpy();

  // Inisialisasi Partikel Ambient Emas Melayang
  initParticles();
});

// Menangkap Form Ucapan dari Landing Page & Memasukkan ke Dashboard
const wishForm = document.getElementById("wishForm");
if (wishForm) {
  wishForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName").value;
    const message = document.getElementById("message").value;

    const wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
    wishes.unshift({ name, message, time: new Date().toISOString() });
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));

    alert("Terima kasih atas ucapan dan doa restunya!");
    wishForm.reset();
  });
}

document.body.classList.remove("invitation-open");

function openInvitation() {
  document.body.classList.add("invitation-open");
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  if (music) {
    music.play().then(() => {
      if (musicBtn) musicBtn.classList.add("playing");
    }).catch(function (error) {
      console.log("Audio auto-play policy prevented playback: ", error);
    });
  }
  
  // Re-observe reveal elements setelah undangan dibuka
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

// Countdown Acara Pernikahan
const tanggalAcara = new Date("December 12, 2027 09:00:00").getTime();
function updateCountdown() {
  const sekarang = new Date().getTime();
  const selisih = tanggalAcara - sekarang;

  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  if (selisih <= 0) {
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const hours = Math.floor(selisih / (1000 * 60 * 60));
  const minutes = Math.floor((selisih / (1000 * 60)) % 60);
  const seconds = Math.floor((selisih / 1000) % 60);

  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll Reveal Animation dengan IntersectionObserver
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
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  reveals.forEach((el) => observer.observe(el));
}

// ScrollSpy untuk Floating Bottom Nav Bar
function initScrollSpy() {
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");
  const navMap = [
    { navKey: "page3", sectionIds: ["page3", "page4", "page5"] }, // Mempelai & Kisah
    { navKey: "page6", sectionIds: ["page6"] },                  // Acara
    { navKey: "page7", sectionIds: ["page7"] },                  // Lokasi
    { navKey: "page8", sectionIds: ["page8", "page9"] },          // Galeri & Movie
    { navKey: "page10", sectionIds: ["page10", "page11"] },       // Ucapan & Penutup
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
    { passive: true },
  );
}

// Lightbox Modal Preview untuk Foto Galeri
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

// Efek Partikel Ambient Emas Halus (Melayang Elegan)
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

  const particles = Array.from({ length: 32 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2 + 0.8,
    speedY: Math.random() * 0.4 + 0.15,
    speedX: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.5 + 0.2,
    fade: Math.random() * 0.008 + 0.003,
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
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(197, 160, 89, 0.4)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
