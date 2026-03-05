# CellXplore - Platform Pembelajaran Biologi Interaktif

Platform pembelajaran biologi yang menyenangkan dan interaktif untuk membantu peserta didik memahami konsep-konsep biologi dengan cara yang lebih engaging.

## 📋 Deskripsi

CellXplore adalah platform pembelajaran biologi yang menyediakan:
- 📚 Materi pembelajaran terstruktur
- 🎬 Video pembelajaran interaktif
- 📝 Lembar Kerja Peserta Didik (LKPD)
- ✅ Kuis dan evaluasi diri
- 📊 Tracking progress belajar

## ✨ Fitur Utama

- **Pembelajaran Interaktif**: Materi yang disajikan dengan cara yang menarik
- **Video Pembelajaran**: Konten video untuk pemahaman yang lebih baik
- **LKPD**: Lembar kerja untuk memperdalam pemahaman
- **Evaluasi Diri**: Soal-soal untuk menguji pemahaman
- **Refleksi**: Ruang untuk merefleksikan pembelajaran
- **Visualisasi Data**: Grafik untuk menampilkan progress

## 🏗️ Struktur Proyek

```
├── index.html          # Halaman utama aplikasi
├── script.js           # Logika JavaScript frontend
├── styles.css          # Styling aplikasi
├── app.py              # Backend Flask
├── api-integration.js  # Integrasi API
├── config.json         # Konfigurasi aplikasi
├── Image/              # Folder untuk gambar dan video
└── README.md           # Dokumentasi ini
```

## 🛠️ Teknologi yang Digunakan

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js untuk visualisasi data

### Backend
- Python Flask
- Flask-CORS
- JSON for data storage

## 📦 Instalasi

### Prerequisites
- Python 3.7+
- Browser modern (Chrome, Firefox, Safari, Edge)

### Setup Backend

1. Clone repository
```bash
git clone <repository-url>
cd Biologi-Sell
```

2. Buat virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Jalankan aplikasi
```bash
python app.py
```

Server akan berjalan di `http://localhost:5000`

5. Buka browser dan akses aplikasi
```
http://localhost:5000
```

## 📚 Materi Pembelajaran

Aplikasi mencakup:
- **Bab 1**: Sel - Unit Terkecil Kehidupan
- **Bab 2**: Jaringan - Kumpulan Sel Sejenis
- **Bab 3**: Organ - Kumpulan Jaringan

## 🎯 Penggunaan

1. **Mulai Aplikasi**: Klik tombol "Mulai Belajar" pada splash screen
2. **Baca Materi**: Pilih bab untuk membaca materi pembelajaran
3. **Tonton Video**: Saksikan video penjelasan untuk setiap topik
4. **Kerjakan LKPD**: Selesaikan lembar kerja yang disediakan
5. **Evaluasi**: Ikuti kuis untuk mengetahui pemahaman Anda

## ⚙️ Konfigurasi

File `config.json` berisi pengaturan aplikasi:

```json
{
  "platform": {
    "name": "Biologi Pintar",
    "version": "1.0.0"
  },
  "server": {
    "host": "localhost",
    "port": 5000
  }
}
```

**Catatan**: Untuk production, ubah `debug: false` di config.json

## 📝 Catatan untuk Development

- Pastikan folder `data/` ada untuk menyimpan data pengguna
- Video dan gambar disimpan di folder `Image/`
- Gunakan `config.json` untuk mengubah port atau settings lainnya

## 👨‍💻 Author

**Developer**: Dewi Aisyah Widiawati

## 📄 License

Proyek ini tersedia untuk tujuan pendidikan.

## 🤝 Kontribusi

Untuk berkontribusi:
1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📧 Support

Untuk pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Versi**: 1.0.0  
**Last Updated**: 2026
