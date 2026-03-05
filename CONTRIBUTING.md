# Panduan Kontribusi

Terima kasih telah tertarik untuk berkontribusi pada CellXplore!

## Cara Berkontribusi

### 1. Fork Repository

Klik tombol "Fork" di halaman repository untuk membuat salinan di akun Anda.

### 2. Clone Repository

```bash
git clone https://github.com/username/Biologi-Sell.git
cd Biologi-Sell
```

### 3. Buat Branch Baru

```bash
git checkout -b feature/nama-fitur-anda
```

Gunakan nama branch yang deskriptif:

- `feature/tambah-materi-sel` untuk fitur baru
- `fix/perbaiki-bug-video` untuk bug fixes
- `docs/update-readme` untuk dokumentasi

### 4. Buat Perubahan

- Lakukan perubahan pada file yang diperlukan
- Pastikan kode mengikuti best practices
- Tambahkan komentar untuk kode yang kompleks

### 5. Commit Perubahan

```bash
git add .
git commit -m "Deskripsi singkat perubahan"
```

Gunakan pesan commit yang jelas dan deskriptif.

### 6. Push ke Repository

```bash
git push origin feature/nama-fitur-anda
```

### 7. Buat Pull Request

- Buka repository asli di GitHub
- Klik tombol "New Pull Request"
- Bandingkan fork Anda dengan branch `main`
- Jelaskan perubahan Anda secara detail
- Submit pull request

## Standar Kode

### Frontend (JavaScript)

- Gunakan variable names yang deskriptif
- Tambahkan comments untuk fungsi kompleks
- Ikuti konvensi naming camelCase

### Backend (Python)

- Ikuti PEP 8 style guide
- Tambahkan docstrings pada fungsi
- Gunakan type hints jika memungkinkan

### HTML/CSS

- Gunakan semantic HTML
- Organize CSS dengan comments dan sections
- Mobile-first responsive design

## Testing

Sebelum submit pull request:

1. Test aplikasi secara lokal
2. Pastikan tidak ada console errors
3. Test di berbagai browser
4. Verifikasi functionality

## Reporting Bugs

Jika menemukan bug:

1. Cek issue yang sudah ada
2. Buat issue baru dengan detail:
   - Deskripsi bug
   - Steps untuk mereproduksi
   - Expected behavior
   - Actual behavior
   - Browser dan OS

## Saran Fitur

Untuk saran fitur:

1. Cek feature requests yang ada
2. Buat issue baru dengan label "enhancement"
3. Jelaskan use case dan benefits

## Pertanyaan?

- Baca README.md terlebih dahulu
- Cek discussions di repository
- Buat issue untuk pertanyaan teknis

Tim kami akan membantu secepat mungkin!

---

Terima kasih atas kontribusi Anda! 🙏
