# Panduan Deployment & Perbaikan Image Loading

## 🔧 Masalah yang Diperbaiki

### 1. **Image Loading Issue di Hosting**

Gambar tidak tampil saat di-hosting karena:

- **Path Case Sensitivity**: Server Linux/hosting memiliki sistem file yang case-sensitive, berbeda dengan Windows
- **Konfigurasi Flask**: Static files perlu dikonfigurasi dengan benar

### 2. **Solusi yang Diterapkan**

#### A. Konfigurasi Flask Static Files (app.py)

```python
app = Flask(__name__,
            static_folder='.',
            static_url_path='',
            template_folder='.')
```

Ini memastikan:

- Static files (CSS, JS, gambar) dapat diakses langsung dari root folder
- Template HTML dapat di-serve dengan benar

#### B. Memperbaiki File Name Case

```
Sebelum:                    Sesudah:
Image/logo.png        →  Image/Logo.png
Image/PetaKonsep.png  →  Image/Petakonsep.png
Image/dewi.jpeg       →  Image/Dewi.jpeg
Image/sel.jpeg        →  Image/Sel.jpeg
```

Nama file sekarang match dengan nama asli di folder.

## 📝 File Structure yang Benar

```
Biologi-Sell/
├── app.py                  # Flask app dengan config static files
├── index.html              # Main page
├── script.js               # Frontend JS
├── styles.css              # Stylesheet
├── api-integration.js      # API layer
├── config.json             # Config
├── requirements.txt        # Python deps
├── Image/                  # Media folder
│   ├── Logo.png           # (Case-sensitive!)
│   ├── Petakonsep.png     # (Case-sensitive!)
│   ├── Dewi.jpeg          # (Case-sensitive!)
│   ├── Sel.jpeg           # (Case-sensitive!)
│   ├── UM1.webp
│   ├── UM2.jpeg
│   └── VideoSel.mp4
└── data/                   # Data storage
    ├── users.json
    ├── reflections.json
    ├── lkpd.json
    └── scores.json
```

## 🚀 Deployment Instructions

### Local Development

```bash
# 1. Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run Flask app
python app.py

# 4. Access at http://localhost:5000
```

### Hosting di Heroku

1. **Tambahkan Procfile** (di root folder):

```
web: python app.py
```

2. **Update app.py untuk production**:

```python
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=os.environ.get('PORT', 5000))
```

3. **Deploy**:

```bash
heroku create biologi-sell
git push heroku main
```

### Hosting di PythonAnywhere

1. Upload files ke akun Anda
2. Configure web app:
   - Source code: /home/username/Biologi-Sell
   - Working directory: /home/username/Biologi-Sell
   - WSGI configuration: setup untuk Flask

3. Pastikan static files di-serve dengan benar

### Hosting di Linode/VPS

1. **Setup venv dan install deps**:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn  # WSGI server
```

2. **Run dengan Gunicorn**:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

3. **Setup Nginx** sebagai reverse proxy

## ✅ Testing Checklist Sebelum Deploy

- [ ] Semua gambar tampil di localhost
- [ ] Video loading dengan baik
- [ ] CSS styling benar
- [ ] API endpoints response dengan benar
- [ ] User data dapat disimpan (check data/ folder)
- [ ] No console errors di browser DevTools

## 🔍 Troubleshooting

### Images Masih Tidak Tampil

1. **Check file names** - pastikan case-sensitive benar:

   ```bash
   # Windows (PowerShell)
   Get-ChildItem -Path ".\Image" -Name

   # Linux/macOS
   ls -la Image/
   ```

2. **Check path di HTML/CSS**:

   ```html
   <!-- Correct -->
   <img src="Image/Logo.png" />

   <!-- Wrong -->
   <img src="Image/logo.png" />
   <img src="image/Logo.png" />
   ```

3. **Check Flask logs** saat running:
   ```
   GET /Image/Logo.png HTTP/1.1 - 200 OK
   ```

   - Status 200 = berhasil
   - Status 404 = file tidak ditemukan

### Video Tidak Play

- Pastikan format MP4 compatible dengan browser
- Check browser console untuk error messages
- Upload video dengan bitrate yang reasonable

### CSS/JS Tidak Load

- Clear browser cache (Ctrl+Shift+Delete)
- Check media type di console
- Pastikan path benar

## 📚 Best Practices untuk Production

1. **Security**:
   - Set `debug=False` di app.py
   - Use environment variables untuk sensitive data
   - Implement proper CORS policy

2. **Performance**:
   - Optimize image sizes
   - Use CDN untuk static files (optional)
   - Enable gzip compression

3. **Monitoring**:
   - Setup logging
   - Monitor error rates
   - Track user activity

## 🎯 Checklist untuk Deployment Sukses

Sebelum push ke production:

- [ ] app.py memiliki Flask config untuk static files
- [ ] Semua image paths case-sensitive benar
- [ ] requirements.txt updated dengan semua dependencies
- [ ] No hardcoded localhost/development URLs
- [ ] Error handling implemented
- [ ] CORS configuration tepat
- [ ] Database/file storage properly configured
- [ ] Environment variables setup
- [ ] SSL certificate ready (jika HTTPS)
- [ ] Backup data structure ada

---

**Note**: Untuk hosting jangka panjang, pertimbangkan menggunakan database (PostgreSQL, MongoDB) daripada JSON files untuk better scalability.
