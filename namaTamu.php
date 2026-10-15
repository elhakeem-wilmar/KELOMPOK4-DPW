<?php
$data_tamu = [
    1 => "Susilo Bambang Yudhoyono",
    2 => "Joko Widodo",
    3 => "Prabowo Subianto",
    4 => "NCT Dream", 
    5 => "BTS",
    6 => "BABY MONSTER",
    7 => "HEARTS2HEARTS",
    8 => "AMBATUKAMBA"
];

$id_tamu = isset($_GET['tamu']) ? $_GET['tamu'] : null;

$nama_tamu_tampil = "Tamu Undangan"; 
if ($id_tamu != null && array_key_exists($id_tamu, $data_tamu)) {
    $nama_tamu_tampil = $data_tamu[$id_tamu]; 
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fazl & Nadya - Wedding Invitation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Special+Elite&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body >

<audio id="music" loop>
    <source src="assets/music.mp3" type="audio/mpeg">
</audio>

<button class="music-btn" id="musicBtn">♫</button>

<section class="page cover-page" id="page1">
    <div class="dark-overlay"></div>
    
    <div class="cover-content">
        <div class="cover-name">
            <span>Fazl &</span>
            <span>Nadya</span>
        </div>
        
        <div class="guest-section" style="position: relative; z-index: 3; text-align: center; color: white; margin-top: -20px; font-family: 'Special Elite', cursive;">
            <p style="font-size: 16px; margin-bottom: 5px; color: #eee9dd;">Kepada Yth. Bapak/Ibu/Saudara/i,</p>
            <h3 style="font-size: 26px; color: #c94e2c; text-shadow: 2px 2px 5px rgba(0,0,0,0.8);">
                <?php echo $nama_tamu_tampil; ?>
            </h3>
        </div>
        
        <button class="open-btn" onclick="openInvitation()">OPEN INVITATION</button>

        <div class="bottom-ornament">
            <img src="assets/ornamen2.png" alt="Ornamen">
        </div>
    </div>
</section>

<section class="page greeting-page" id="page2">
    <div class="dark-overlay"></div>
    <div class="top-name">Fazl &<br>Nadya</div>

    <div class="glass-box greeting-box">
        <h2>SALAM HANGAT,</h2>
        <p>
            DENGAN PENUH RASA SYUKUR DAN SUKACITA, KAMI BERNIAT MEMBAGIKAN MOMEN BAHAGIA INI BERSAMA ANDA. KAMI MENGUNDANG BAPAK/IBU/SAUDARA/I UNTUK MENJADI BAGIAN DARI HARI ISTIMEWA PERNIKAHAN KAMI.
        </p>
        <p>
            MERUPAKAN SUATU KEHORMATAN DAN KEBAHAGIAAN BAGI KAMI APABILA BAPAK/IBU/SAUDARA/I BERKENAN HADIR SERTA MEMBERIKAN DOA RESTU BAGI LANGKAH BARU PERJALANAN KAMI.
        </p>
    </div>
</section>

<section class="page profile-page" id="page3">
    <div class="blur-background"></div>
    <div class="profile-card">
        <div class="profile-photo">
            <img src="assets/fazl.jpeg" alt="Fazl">
        </div>
        <div class="profile-info">
            <h1>Fazl El Hakeem, S.T</h1>
            <p>LAHIR : 01 JANUARI 2007</p>
            <p>PUTRA DARI BAPAK ANDY WEIR &amp; IBU WINDY FLOREN</p>
            <blockquote>“BAGI SAYA, DIA BUKAN HANYA PASANGAN, TAPI JUGA RUMAH TEMPAT SAYA SELALU INGIN PULANG.”</blockquote>
        </div>
    </div>
    <div class="ornament top-ornament">
        <center><img src="assets/ornamen1.png" width="760"></center>
    </div>
</section>

<section class="page profile-page bride-page" id="page4">
    <div class="blur-background"></div>
    <div class="profile-card reverse">
        <div class="profile-photo-nad">
            <img src="assets/nadya.jpeg" alt="Nadya">
        </div>
        <div class="profile-info">
            <h1>Nadya Sulfa, S.T</h1>
            <p style="text-align: right;">LAHIR : 31 DESEMBER 2007</p>
            <p style="text-align: right;">PUTRI DARI BAPAK ANDER TERZT &amp; IBU DIANA LISEN</p>
            <blockquote class="right">“DIA ADALAH ALASAN SAYA PERCAYA BAHWA DOA-DOA BAIK SELALU MENEMUKAN JALANNYA DI WAKTU YANG TEPAT.”</blockquote>
        </div>
    </div>
    <div class="ornament top-ornament">
        <center><img src="assets/ornamen1.png" width="760"></center>
    </div>
</section>

<section class="page story-page" id="page5">
    <div class="dark-overlay"></div>
    <div class="story-title">
        <div class="story-name">Fazl &<br>Nadya</div>
        <div class="story-label">LOVE STORY &lt;3</div>
    </div>

    <div class="story-container">
        <div class="story-card card-one">
            <div class="paperclip">📎︎</div>
            <img src="assets/gallery1.jpeg" alt="First Met">
            <div class="story-text">
                <strong>FIRST MET (2020)</strong>
                <span>KAMI BERTEMU DI KAMPUS<p> “Pertemuan sederhana yang menjadi awal dari cerita luar biasa.”</p></span>
            </div>
        </div>

        <div class="story-card card-two">
            <div class="paperclip">📎︎</div>
            <img src="assets/gallery2.jpeg" alt="The Journey">
            <div class="story-text">
                <strong>THE JOURNEY (2024-2026)</strong>
                <span>KAMI BEKERJA DI TEMPAT YANG SAMA<p>“Dari langkah yang sama, tumbuh rasa yang semakin nyata.”</p></span>
            </div>
        </div>

        <div class="story-card card-three">
            <div class="paperclip">📎︎</div>
            <img src="assets/gallery3.jpeg" alt="Beginning of Forever">
            <div class="story-text">
                <strong>THE BEGINNING OF FOREVER (2027)</strong>
                <span>KAMI MELANGKAH BERSAMA KE KEHIDUPAN BARU<p>“Hari ini bukan akhir dari perjalanan, melainkan awal dari selamanya.”</p></span>
            </div>
        </div>
    </div>
</section>

<section class="page event-page" id="page6">
  <div class="dark-overlay"></div>
  <div class="event-wrapper">
    <div class="event-box event-left">
      <h3 class="event-title">WAKTU ACARA</h3>
      <div class="date-stack">
        <span>12</span><span>12</span><span>2027</span>
      </div>
    </div>
    <div class="event-middle">
      <div class="photo-container">
        <h2 class="couple-name">Fazl &amp;<br>Nadya</h2>
        <img src="assets/gallery4.jpeg" alt="Fazl & Nadya" class="event-img">
      </div>
    </div>
    <div class="event-box event-right">
      <h3 class="event-title">COUNTDOWN ACARA</h3>
      <div class="countdown-row">
        <div class="time-card"><span id="hours">57</span><small>JAM</small></div>
        <span class="colon">:</span>
        <div class="time-card"><span id="minutes">32</span><small>MENIT</small></div>
        <span class="colon">:</span>
        <div class="time-card"><span id="seconds">21</span><small>DETIK</small></div>
      </div>
      <button class="remind-btn">REMIND ME !</button>
    </div>
  </div>
</section>

<section class="page location-page" id="page7">
     <div class="location-photo">
        <img src="assets/gallery7.jpeg" alt="Fazl dan Nadya">
        <div class="couple-name">Fazl &amp; Nadya</div>
        <div class="location-button">
            <span class="pin">📍</span>
            <div>
                <a href="https://www.google.com/maps/place/Sopo+GABEMA/@1.2635352,101.1785192,17z/data=!3m1!4b1!4m6!3m5!1s0x31d37ca0f109d8c3:0xfc9c06eb8255b87f!8m2!3d1.2635298!4d101.1810941!16s%2Fg%2F11cm0d62lz?entry=ttu&g_ep=EgoyMDI2MDkyOC4wIKXMDSoASAFQAw%3D%3D" target="_blank"><small>LOKASI GEDUNG</small>
                <strong>PERNIKAHAN</strong></a>
            </div>
        </div>
    </div>
    <div class="location-map">
        <div class="map-image">
            <img src="assets/lokasi.png" alt="Map">
            <div class="map-pin">📍</div>
        </div>
    </div>
</section>

<section class="page page-gallery" id="page8">
    <div class="gallery-wrapper">
        <div class="gallery-item foto1"><img src="assets/gallery1.jpeg" alt="Foto 1"></div>
        <div class="gallery-item foto2"><img src="assets/gallery3.jpeg" alt="Foto 2"></div>
        <div class="gallery-item foto3"><img src="assets/gallery6.jpeg" alt="Foto 3"></div>
        <div class="gallery-item foto4"><img src="assets/gallery2.jpeg" alt="Foto 4"></div>
        <div class="gallery-item foto5"><img src="assets/gallery8.jpeg" alt="Foto 5"></div>
        <div class="gallery-item foto6"><img src="assets/01.jpeg" alt="Foto 6"></div>
        <div class="gallery-item foto7"><img src="assets/gallery7.jpeg" alt="Foto 7"></div>
        <div class="gallery-item foto8"><img src="assets/gallery4.jpeg" alt="Foto 8"></div>
        <div class="gallery-center">
            <div class="gallery-name">Fazl &<br>Nadya</div>
            <div class="gallery-subtitle">WEDDING GALLERY</div>
        </div>
    </div>
</section>

<section class="page movie-page" id="page9">
    <div class="dark-overlay"></div>
    <div class="movie-content">
        <div class="movie-title">
            Fazl & Nadya
            <span>WEDDING MOVIE</span>
        </div>
        <div class="movie-box">
            <video controls poster="assets/bg.jpg">
                <source src="assets/Movie.mp4" type="video/mp4">
                Browser Anda tidak mendukung video.
            </video>
        </div>
    </div>
</section>

<section class="page wish-page" id="page10">
  <div class="wish-container">
    <div class="wish-glass-card">
      <h3 class="wish-card-title">KIRIM UCAPAN DI SINI :</h3>
      <form id="wishForm">
        <div class="wish-input-group">
          <label>NAMA :</label>
          <input type="text" id="guestName" required>
        </div>
        <div class="wish-input-group">
          <label>PESAN/UCAPAN :</label>
          <textarea id="message" rows="3" required></textarea>
        </div>
        <div class="wish-btn-container">
          <button type="submit" class="wish-submit-btn">KIRIM</button>
        </div>
      </form>
      <div class="wish-cashless-footer">
        <img src="assets/QR code.jpeg" alt="QR Code" class="qr-img">
        <p class="gift-text">
          JIKA MEMBERI MERUPAKAN UNGKAPAN TANDA KASIH, BAPAK/IBU/SAUDARA/I DAPAT MEMBERI HADIAH SECARA CASHLESS. TERIMA KASIH.
        </p>
      </div>
    </div>
    <div class="wish-couple-name">Fazl &amp;<br>Nadya</div>
  </div>
</section>

<section class="page thank-page" id="page11">
    <div class="dark-overlay"></div>
    <div class="thank-container">
        <div class="thank-left">
            <h1>THANK YOU</h1>
            <p>WE WOULD LOVE IF YOU COME <br>TO OUR WEDDING :)</p>
        </div>
        <div class="thank-right-name">Fazl &amp;<br>Nadya</div>
    </div>
</section>

<script src="script.js"></script>

</body>
</html>