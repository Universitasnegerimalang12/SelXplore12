# Media Files Fix - Video & Background Image

## 🔧 Masalah yang Diperbaiki

### 1. **Video di Splash Screen Hilang saat Hosting**

Problem: `<source src="Image/VideoSel.mp4">` tidak dimuat di hosting

### 2. **Background Image Hero Section Tidak Muncul**

Problem: `background: url("Image/sel.jpeg")` tidak muncul dengan case-sensitive pada Linux

## ✅ Solusi yang Diterapkan

### A. **Path Case Sensitivity** ✓

```css
/* Diperbaiki dari: */
background: url("Image/sel.jpeg")

/* Menjadi: */
background: url("Image/Sel.jpeg")
```

Nama file sekarang match 100% dengan file asli di folder Image/.

### B. **Flask Media Server Configuration** ✓

`app.py` sudah ditambahi middleware `@app.after_request` untuk:

1. **Set Proper MIME Types**

   ```python
   if request.path.endswith('.mp4'):
       response.headers['Content-Type'] = 'video/mp4'
   ```

2. **Enable CORS untuk Media Files**

   ```python
   response.headers['Access-Control-Allow-Origin'] = '*'
   ```

3. **Optimasi Cache**
   - Development: `no-cache` (reload setiap kali)
   - Production: `max-age=31536000` (cache 1 tahun)

## 📋 Checklist Media Files

| File           | Location             | Status     |
| -------------- | -------------------- | ---------- |
| VideoSel.mp4   | Image/VideoSel.mp4   | ✅ Correct |
| Logo.png       | Image/Logo.png       | ✅ Correct |
| Petakonsep.png | Image/Petakonsep.png | ✅ Correct |
| Dewi.jpeg      | Image/Dewi.jpeg      | ✅ Correct |
| Sel.jpeg       | Image/Sel.jpeg       | ✅ Fixed   |
| UM1.webp       | Image/UM1.webp       | ✅ Correct |
| UM2.jpeg       | Image/UM2.jpeg       | ✅ Correct |

## 🧪 Testing Lokal

### 1. Jalankan Flask

```bash
venv\Scripts\activate  # Windows
python app.py
```

### 2. Buka http://localhost:5000

### 3. Check Elements

- ✅ Video splash screen harus **autoplay**
- ✅ Background image hero section harus **visible**
- ✅ Semua images harus **load**
- ✅ Browser console: **NO 404 errors**

### 4. Developer Tools Check

```
F12 → Network tab
- Image/VideoSel.mp4: 200 OK, video/mp4
- Image/Sel.jpeg: 200 OK, image/jpeg
- Image/*.png: 200 OK, image/png
```

## 🌐 Hosting Deployment

### Before Deploy

- [ ] Semua media files ada di folder Image/
- [ ] Nama files: **CASE-SENSITIVE CORRECT**
- [ ] app.py sudah ada middleware media handler
- [ ] Tidak ada hardcoded localhost paths

### Deploy pada Heroku

```bash
git add .
git commit -m "Fix: Video and background image paths"
git push heroku main
```

### Deploy pada PythonAnywhere

1. Upload Image/ folder entirely
2. Ensure Flask app config matches app.py
3. Reload web app

### Deploy pada VPS dengan Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Nginx akan serve static files, Flask akan handle media dengan proper headers.

## 🔍 Troubleshooting

### Video Tidak Play

**Gejala**: 404 error di console untuk VideoSel.mp4

**Solusi**:

```bash
# Verify file exists
ls -la Image/VideoSel.mp4

# Check path - EXACT CASE
# Should be: Image/VideoSel.mp4 (NOT image/ atau videsel/)
```

### Background Image Tidak Muncul

**Gejala**: Hero section solid color, tidak ada background

**Solusi**:

1. Check Network tab di DevTools
2. Cari request ke Image/Sel.jpeg
3. Ensure response headers: `Content-Type: image/jpeg`

### 404 pada Media Files

**Gejala**: Network shows 404 untuk media files

**Solusi**:

1. Verify Flask middleware di app.py:

   ```python
   @app.after_request
   def after_request(response):
   ```

   Ini harus ada!

2. Check file names - EXACT CASE MATCH

3. Browser cache - clear cache
   ```
   Ctrl+Shift+Delete
   ```

## ⚙️ Production Optimization

### Untuk Better Performance

1. **Compress Video**

   ```bash
   ffmpeg -i VideoSel.mp4 -c:v libx264 -crf 23 VideoSel_compressed.mp4
   ```

2. **Optimize Images**

   ```bash
   # Convert to WebP
   cwebp Sel.jpeg -o Sel.webp

   # Use WebP with fallback
   <picture>
     <source srcset="Image/Sel.webp" type="image/webp">
     <img src="Image/Sel.jpeg" alt="Sel">
   </picture>
   ```

3. **CDN untuk Media** (Optional)
   - Upload Image/ to Cloudinary
   - Update paths to CDN URLs
   - Faster delivery globally

## 📊 Performance Impact

| Action        | Before           | After     |
| ------------- | ---------------- | --------- |
| Media loads   | ❌ 404 Not Found | ✅ 200 OK |
| MIME types    | ❌ Incorrect     | ✅ Proper |
| Browser cache | ❌ Reloaded      | ✅ Cached |

---

**Last Updated**: March 6, 2026
**Status**: ✅ All Media Files Fixed & Ready for Hosting
