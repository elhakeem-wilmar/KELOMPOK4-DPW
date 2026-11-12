<?php
$guests_file = __DIR__ . '/data/guests.json';
$data_tamu = [];
if (file_exists($guests_file)) {
    $raw = file_get_contents($guests_file);
    $arr = json_decode($raw, true);
    if (is_array($arr)) {
        foreach ($arr as $g) {
            if (isset($g['id']) && isset($g['name'])) {
                $data_tamu[(int)$g['id']] = $g['name'];
            }
        }
    }
}
if (empty($data_tamu)) {
    $data_tamu = [
        1 => 'Susilo Bambang Yudhoyono',
        2 => 'Joko Widodo',
        3 => 'Prabowo Subianto',
        4 => 'NCT Dream', 
        5 => 'BTS',
        6 => 'BABY MONSTER',
        7 => 'HEARTS2HEARTS',
        8 => 'AMBATUKAMBA'
    ];
}

$id_tamu = isset($_GET['tamu']) ? (int)$_GET['tamu'] : (isset($_GET['to']) && is_numeric($_GET['to']) ? (int)$_GET['to'] : null);

$nama_tamu_tampil = 'Tamu Undangan'; 
if ($id_tamu !== null && array_key_exists($id_tamu, $data_tamu)) {
    $nama_tamu_tampil = htmlspecialchars($data_tamu[$id_tamu]); 
} elseif (isset($_GET['to']) && !empty(trim($_GET['to']))) {
    $nama_tamu_tampil = htmlspecialchars(trim($_GET['to']));
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Fazl & Nadya - Wedding Invitation</title>

    <link rel="preconnect"
        href="https://fonts.googleapis.com">

    <link rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&family=Special+Elite&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="style.css">
</head>

<body>

<audio id="music" loop>
    <source src="assets/music.mp3" type="audio/mpeg">
</audio>

<button class="music-btn" id="musicBtn" aria-label="Toggle Music">
    <span class="music-icon-playing">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eighth-notes"><path d="M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"/><circle cx="18" cy="16" r="3"/><circle cx="6" cy="19" r="3"/></svg>
    </span>
    <span class="music-icon-paused">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x"><path d="M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"/><path d="m16.5 14.5 5-5"/><path d="m16.5 9.5 5 5"/></svg>
    </span>
</button>

<section class="page cover-page" id="page1">
    <div class="dark-overlay"></div>
    <div class="batik-bg-pattern"></div>
    
    <div class="cover-content">
        <div class="wedding-tag" id="displayCoverTag">THE WEDDING OF</div>
        <div class="cover-name">
            <span>Fazl &</span>
            <span>Nadya</span>
        </div>
        
        <div class="guest-section">
            <p class="guest-label">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <h3 class="guest-name">
            <?php echo $nama_tamu_tampil; ?>
            </h3>
            <span class="guest-sub" id="displayCoverSub">Kami mengundang Anda untuk hadir di momen bahagia kami</span>
        </div>
        
        <button class="open-btn pulse-glow" onclick="openInvitation()">
            BUKA UNDANGAN
        </button>

        <div class="bottom-ornament float-sway">
            <img src="assets/ornamen2.png" alt="Ornamen Batik">
        </div>
    </div>
</section>


<section class="page greeting-page" id="page2">
    <div class="dark-overlay"></div>
    <div class="batik-bg-pattern"></div>

    <div class="top-name reveal">
        Fazl &<br>
        Nadya
    </div>

    <div class="glass-box greeting-box reveal delay-1">
        <h2 id="displayGreetingTitle">Salam Hangat,</h2>
        <div class="batik-divider">
            <span></span>
            <div class="batik-motif">✦ ꕥ ✦</div>
            <span></span>
        </div>

        <div class="sacred-verse-card">
            <p class="verse-quote" id="displayGreetingVerse">
                “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.” (QS. Ar-Rum: 21)
            </p>
        </div>

        <p id="displayGreetingText1">
            Dengan penuh rasa syukur dan sukacita ke hadirat Tuhan Yang Maha Esa,
            kami bermaksud membagikan kabar bahagia ini bersama Anda. Kami mengundang
            Bapak/Ibu/Saudara/i untuk menjadi bagian dan saksi dari hari istimewa pernikahan kami.
        </p>

        <p id="displayGreetingText2">
            Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami
            apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu
            bagi langkah awal perjalanan hidup baru kami.
        </p>
    </div>
</section>


<section class="page profile-page" id="page3">
    <div class="blur-background"></div>
    <div class="batik-bg-pattern"></div>

    <div class="profile-card reveal">
        <div class="profile-photo">
            <img id="displayGroomPhoto" src="assets/fazl.jpeg" alt="Fazl">
            <div class="photo-frame-accent"></div>
        </div>

        <div class="profile-info">
            <span class="profile-role">THE GROOM</span>
            <h1 id="displayGroomFull">Fazl El Hakeem, S.T</h1>
            <p class="profile-detail" id="displayGroomBirth">
                <strong>Lahir :</strong> 01 Januari 2007
            </p>
            <p class="profile-detail" id="displayGroomParents">
                Putra tercinta dari Bapak Andy Weir &amp; Ibu Windy Floren
            </p>

            <blockquote class="profile-quote" id="displayGroomQuote">
                “Bagi saya, dia bukan hanya pasangan hidup,
                tetapi juga rumah tempat saya selalu ingin pulang.”
            </blockquote>
        </div>
    </div>
    <div class="ornament top-ornament float-sway">
        <center><img src="assets/ornamen1.png" width="760" alt="Ornamen"></center>
    </div>
</section>


<section class="page profile-page bride-page" id="page4">
    <div class="blur-background"></div>
    <div class="batik-bg-pattern"></div>

    <div class="profile-card reverse reveal">
        <div class="profile-photo-nad">
            <img id="displayBridePhoto" src="assets/nadya.jpeg" alt="Nadya">
            <div class="photo-frame-accent"></div>
        </div>

        <div class="profile-info">
            <span class="profile-role">THE BRIDE</span>
            <h1 id="displayBrideFull">Nadya Sulfa, S.T</h1>

            <p class="profile-detail" style="text-align: right;" id="displayBrideBirth">
                <strong>Lahir :</strong> 31 Desember 2007
            </p>

            <p class="profile-detail" style="text-align: right;" id="displayBrideParents">
                Putri tercinta dari Bapak Ander Terzt &amp; Ibu Diana Lisen
            </p>

            <blockquote class="profile-quote right" id="displayBrideQuote">
                “Dia adalah alasan saya percaya
                bahwa setiap doa baik selalu menemukan jalannya di waktu yang paling tepat.”
            </blockquote>
        </div>

    </div>
    <div class="ornament top-ornament float-sway">
        <center><img src="assets/ornamen1.png" width="760" alt="Ornamen"></center>
    </div>
</section>


<section class="page story-page" id="page5">
    <div class="dark-overlay"></div>
    <div class="batik-bg-pattern"></div>

    <div class="story-title reveal">
        <div class="story-name">
            Fazl &amp;<br>
            Nadya
        </div>
        <div class="story-label">
            • LOVE STORY •
        </div>
        <div class="batik-divider">
            <span></span>
            <div class="batik-motif">✦ ꕥ ✦</div>
            <span></span>
        </div>
    </div>

    <div class="story-container">
        <!-- STORY 1 -->
        <div class="story-card card-one reveal delay-1">
            <div class="paperclip">📎︎</div>
            <img id="displayStory1Photo" src="assets/gallery1.jpeg" alt="First Met">
            <div class="story-text">
                <strong id="displayStory1Title">First Met (2020)</strong>
                <span>
                    <p id="displayStory1Text">Pertemuan di Kampus - “Pertemuan sederhana yang kemudian tumbuh menjadi awal dari cerita luar biasa.”</p>
                </span>
            </div>
        </div>

        <!-- STORY 2 -->
        <div class="story-card card-two reveal delay-2">
            <div class="paperclip">📎︎</div>
            <img id="displayStory2Photo" src="assets/gallery2.jpeg" alt="The Journey">
            <div class="story-text">
                <strong id="displayStory2Title">The Journey (2024–2026)</strong>
                <span>
                    <p id="displayStory2Text">Melangkah di Tempat yang Sama - “Dari langkah yang seirama, tumbuh rasa saling percaya yang semakin nyata.”</p>
                </span>
            </div>
        </div>

        <!-- STORY 3 -->
        <div class="story-card card-three reveal delay-3">
            <div class="paperclip">📎︎</div>
            <img id="displayStory3Photo" src="assets/gallery3.jpeg" alt="Beginning of Forever">
            <div class="story-text">
                <strong id="displayStory3Title">Beginning of Forever (2027)</strong>
                <span>
                    <p id="displayStory3Text">Menuju Kehidupan Baru - “Hari ini bukan akhir dari perjalanan, melainkan awal dari kebersamaan selamanya.”</p>
                </span>
            </div>
        </div>
    </div>
</section>


<section class="page event-page" id="page6">
  <div class="dark-overlay"></div>
  <div class="batik-bg-pattern"></div>

  <div class="event-wrapper reveal">

    <!-- 1. KIRI: WAKTU ACARA -->
    <div class="event-box event-left reveal delay-1">
      <h3 class="event-title">WAKTU ACARA</h3>
      <div class="batik-divider" style="margin: 8px auto;">
          <span></span>
          <div class="batik-motif">✦</div>
          <span></span>
      </div>
      <div class="date-stack">
        <span id="displayEventDay">12</span>
        <span id="displayEventMonth">12</span>
        <span id="displayEventYear">2027</span>
      </div>
      <p class="event-day-info" id="displayEventTime">Minggu, Pukul 09:00 WIB</p>
    </div>

    <!-- 2. TENGAH: FOTO + TULISAN NAMA PASANGAN -->
    <div class="event-middle reveal">
      <div class="photo-container">
        <h2 class="couple-name">Fazl &amp;<br>Nadya</h2>
        <img id="displayEventPhoto" src="assets/gallery4.jpeg" alt="Fazl & Nadya" class="event-img">
      </div>
    </div>

    <!-- 3. KANAN: COUNTDOWN ACARA (HARI, JAM, MENIT, DETIK) -->
    <div class="event-box event-right reveal delay-2">
      <h3 class="event-title">HITUNG MUNDUR</h3>
      <div class="batik-divider" style="margin: 8px auto;">
          <span></span>
          <div class="batik-motif">✦</div>
          <span></span>
      </div>
      <div class="countdown-row">
        <div class="time-card">
          <span id="days">00</span>
          <small>HARI</small>
        </div>
        <span class="colon">:</span>
        <div class="time-card">
          <span id="hours">00</span>
          <small>JAM</small>
        </div>
        <span class="colon">:</span>
        <div class="time-card">
          <span id="minutes">00</span>
          <small>MENIT</small>
        </div>
        <span class="colon">:</span>
        <div class="time-card">
          <span id="seconds">00</span>
          <small>DETIK</small>
        </div>
      </div>
      <button class="remind-btn pulse-glow" onclick="alert('Tanggal acara pernikahan telah dicatat: 12 Desember 2027!')">
          INGATKAN SAYA
      </button>
    </div>

  </div>
</section>


<section class="page location-page" id="page7">
    <div class="dark-overlay"></div>
    <div class="batik-bg-pattern"></div>

    <div class="location-wrapper reveal">
        <div class="location-header">
            <h2 class="location-title">Lokasi Acara Pernikahan</h2>
            <div class="batik-divider">
                <span></span>
                <div class="batik-motif">✦ ꕥ ✦</div>
                <span></span>
            </div>
            <p class="location-subtitle">Dengan penuh rasa hormat, kami menanti kehadiran Bapak/Ibu/Saudara/i di venue istimewa ini</p>
        </div>

        <div class="location-grid">
            <!-- SISI KIRI: VENUE SHOWCASE (FOTO HOTEL MEWAH HD) -->
            <div class="venue-card reveal delay-1">
                <div class="venue-image-box">
                    <img id="displayVenuePhoto" src="assets/hotel-mewah.jpg" alt="Grand Ballroom Hotel Mulia Senayan" class="venue-img">
                </div>
                <div class="venue-details">
                    <h3 class="venue-name" id="displayVenueName">The Grand Ballroom</h3>
                    <h4 class="venue-hotel" id="displayVenueHotel">Hotel Mulia Senayan, Jakarta</h4>
                    <p class="venue-address" id="displayVenueAddress">
                        Jl. Asia Afrika, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, DKI Jakarta 10270
                    </p>
                </div>
            </div>

            <!-- SISI KANAN: MAP & PETUNJUK ARAH -->
            <div class="map-card reveal delay-2">
                <div class="map-header">
                    <h4>Peta Lokasi &amp; Panduan Navigasi</h4>
                    <p>Klik tombol di bawah untuk melihat rute via Google Maps</p>
                </div>
                
                <div class="map-frame-box">
                    <iframe 
                        src="https://maps.google.com/maps?q=Hotel%20Mulia%20Senayan%20Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                        width="100%" 
                        height="240" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Peta Hotel Mulia Senayan">
                    </iframe>
                </div>

                <div class="map-actions">
                    <a id="displayMapsUrl"
                       href="https://www.google.com/maps/search/?api=1&query=Hotel+Mulia+Senayan+Jakarta" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="luxury-map-btn pulse-glow">
                        <div class="btn-text">
                            <strong>BUKA DI GOOGLE MAPS</strong>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="page page-gallery" id="page8">
    <div class="gallery-wrapper reveal">
    
        <div class="gallery-item foto1" onclick="openLightbox(this)">
            <img id="displayGal1" src="assets/gallery1.jpeg" alt="Foto 1">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-item foto2" onclick="openLightbox(this)">
            <img id="displayGal2" src="assets/gallery3.jpeg" alt="Foto 2">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-item foto3" onclick="openLightbox(this)">
            <img id="displayGal3" src="assets/gallery6.jpeg" alt="Foto 3">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-item foto4" onclick="openLightbox(this)">
            <img id="displayGal4" src="assets/gallery2.jpeg" alt="Foto 4">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-center">
            <div class="gallery-name">
                Fazl &amp;<br>
                Nadya
            </div>

            <div class="gallery-subtitle">
                WEDDING GALLERY
            </div>
            <div class="batik-divider" style="margin: 8px auto;">
                <span></span>
                <div class="batik-motif">✦ ꕥ ✦</div>
                <span></span>
            </div>
        </div>

        <div class="gallery-item foto5" onclick="openLightbox(this)">
            <img id="displayGal5" src="assets/gallery8.jpeg" alt="Foto 5">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-item foto6" onclick="openLightbox(this)">
            <img id="displayGal6" src="assets/1.jpeg" alt="Foto 6">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-item foto7" onclick="openLightbox(this)">
            <img id="displayGal7" src="assets/gallery7.jpeg" alt="Foto 7">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>

        <div class="gallery-item foto8" onclick="openLightbox(this)">
            <img id="displayGal8" src="assets/gallery4.jpeg" alt="Foto 8">
            <div class="gallery-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
        </div>
    </div>
</section>


<section class="page movie-page" id="page9">
    <div class="dark-overlay"></div>
    <div class="batik-bg-pattern"></div>

    <div class="movie-content reveal">
        <div class="movie-title">
            Fazl &amp; Nadya
            <span>WEDDING MOVIE</span>
        </div>
        <div class="batik-divider">
            <span></span>
            <div class="batik-motif">✦ ꕥ ✦</div>
            <span></span>
        </div>

        <div class="movie-box">
            <video id="displayVideo" controls poster="assets/bg.jpg">
                <source id="displayVideoSrc" src="assets/Movie.mp4" type="video/mp4">
                Browser Anda tidak mendukung video.
            </video>
        </div>
    </div>
</section>


<section class="page wish-page" id="page10">
  <div class="dark-overlay"></div>
  <div class="batik-bg-pattern"></div>

  <div class="wish-container reveal">

    <!-- 1. KARTU UCAPAN GLASSMORPHISM -->
    <div class="wish-glass-card">
      <h3 class="wish-card-title">Kirim Doa Restu &amp; Ucapan</h3>
      <div class="batik-divider" style="margin: 10px auto 20px auto;">
          <span></span>
          <div class="batik-motif">✦</div>
          <span></span>
      </div>

      <form id="wishForm">
        <div class="wish-input-group">
          <label for="guestName">Nama Anda :</label>
          <input type="text" id="guestName" placeholder="Tuliskan nama lengkap Anda" required>
        </div>

        <div class="wish-input-group">
          <label for="message">Pesan &amp; Doa Restu :</label>
          <textarea id="message" rows="3" placeholder="Tuliskan doa serta ucapan selamat untuk kedua mempelai..." required></textarea>
        </div>

        <div class="wish-btn-container">
          <button type="submit" class="wish-submit-btn pulse-glow">
              KIRIM UCAPAN
          </button>
        </div>
      </form>

      <!-- FOOTER QR CODE & CASHLESS TEXT + BANK TRANSFER CARD -->
      <div class="wish-cashless-footer">
        <div class="qr-box">
            <img id="displayQrPhoto" src="assets/QR code.jpeg" alt="QR Code Amplop Digital" class="qr-img">
        </div>
        <div class="cashless-info">
            <strong>Tanda Kasih Digital (Cashless)</strong>
            <p class="gift-text" id="displayCashlessText">
              Doa restu Anda adalah karunia yang terindah bagi kami. Namun jika memberi merupakan ungkapan kasih, Anda dapat memberikan tanda kasih secara cashless melalui QRIS di atas.
            </p>
            <div class="bank-card-luxury">
                <div class="bank-badge-gold" id="displayBankName">BCA</div>
                <div class="bank-details-wrap">
                    <span class="bank-acc-num" id="displayAccountNumber">1234567890</span>
                    <small class="bank-acc-name" id="displayAccountName">a.n Fazl El Hakeem</small>
                </div>
                <button type="button" class="btn-copy-acc" onclick="copyBankAccount()" title="Salin Nomor Rekening">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    <span>Salin</span>
                </button>
            </div>
        </div>
      </div>
    </div>

    <!-- 2. TULISAN NAMA PASANGAN -->
    <div class="wish-couple-name">
      Fazl &amp;<br>
      Nadya
    </div>

  </div>
</section>


<section class="page thank-page" id="page11">
    <div class="dark-overlay"></div>
    <div class="batik-bg-pattern"></div>
    
    <div class="thank-container reveal">
        <!-- 1. TULISAN THANK YOU -->
        <div class="thank-left">
            <h1>Terima Kasih</h1>
            <div class="batik-divider">
                <span></span>
                <div class="batik-motif">✦ ꕥ ✦</div>
                <span></span>
            </div>
            <p>
                Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi lembaran baru kehidupan kami.<br>
                Sampai jumpa di hari bahagia kami!
            </p>
        </div>

        <!-- 2. NAMA PASANGAN -->
        <div class="thank-right-name">
            Fazl &amp;<br>
            Nadya
        </div>
    </div>
</section>

<!-- LIGHTBOX PREVIEW MODAL -->
<div id="imageLightbox" class="lightbox-modal" onclick="closeLightbox(event)">
    <button class="lightbox-close" aria-label="Tutup Pratinjau">&times;</button>
    <img class="lightbox-content" id="lightboxImg" alt="Foto Galeri Pernikahan">
</div>

<!-- FLOATING BOTTOM NAVIGATION BAR -->
<nav class="bottom-nav" id="bottomNav" aria-label="Navigasi Section Undangan">
    <a href="#page3" class="nav-item active" data-nav="page3" aria-label="Mempelai" title="Mempelai">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
    </a>
    <a href="#page6" class="nav-item" data-nav="page6" aria-label="Acara" title="Acara">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
    </a>
    <a href="#page7" class="nav-item" data-nav="page7" aria-label="Lokasi" title="Lokasi">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 01-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0112 0"/><path d="M4.474 15h-.197a1 1 0 00-.969.753l-1.097 4.35a1.5 1.5 0 001.444 1.898L20.344 22a1.5 1.5 0 001.446-1.897l-1.098-4.35a1 1 0 00-.969-.753h-.197"/><circle cx="12" cy="8" r="2"/></svg>
    </a>
    <a href="#page8" class="nav-item" data-nav="page8" aria-label="Galeri" title="Galeri">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-images"><path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/></svg>
    </a>
    <a href="#page10" class="nav-item" data-nav="page10" aria-label="Ucapan" title="Ucapan">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
    </a>
</nav>

<script src="script.js"></script>

</body>
</html>