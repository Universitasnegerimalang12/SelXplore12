# CellXplore - Setup Lokal

Panduan setup proyek CellXplore secara lokal untuk development.

## Prasyarat

- **Python 3.7 atau lebih tinggi**: Download dari [python.org](https://www.python.org/)
- **Git**: Download dari [git-scm.com](https://git-scm.com/)
- **Browser Modern**: Chrome, Firefox, Safari, atau Edge
- **Text Editor/IDE**: VS Code, PyCharm, atau editor favorit Anda

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/username/Biologi-Sell.git
cd Biologi-Sell
```

### 2. Setup Virtual Environment

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Jalankan Aplikasi

```bash
python app.py
```

Output akan menunjukkan:

```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### 5. Akses Aplikasi

Buka browser dan pergi ke:

```
http://localhost:5000
```

## Struktur Folder

```
Biologi-Sell/
├── app.py                 # Main Flask application
├── api-integration.js     # API integration layer
├── config.json           # Configuration file
├── index.html            # Main HTML file
├── script.js             # Frontend JavaScript
├── styles.css            # Stylesheet
├── requirements.txt      # Python dependencies
├── README.md             # Project documentation
├── CONTRIBUTING.md       # Contribution guidelines
├── Image/                # Media files (images, videos)
├── data/                 # User data (JSON files)
└── .github/
    └── workflows/        # GitHub Actions workflows
```

## Development Workflow

### Struktur Kode Frontend

1. **index.html**: Main structure
2. **styles.css**: Styling dan responsive design
3. **script.js**: DOM manipulation dan event handling
4. **api-integration.js**: Communication dengan backend

### Struktur Kode Backend

1. **app.py**:
   - Routes definitions
   - Data management
   - API endpoints

2. **Data Storage**:
   - `data/users.json` - User information
   - `data/reflections.json` - Student reflections
   - `data/lkpd.json` - LKPD submissions
   - `data/scores.json` - Quiz scores

## Configuration

Edit `config.json` untuk:

- Port server: `"port": 5000`
- Debug mode: `"debug": true` (ubah ke false untuk production)
- Bahasa: `"language": "id"`

## Common Commands

```bash
# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Deactivate virtual environment
deactivate

# Install new package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt

# Run Flask app
python app.py

# Run with specific port
FLASK_ENV=development FLASK_APP=app.py flask run --port 8000
```

## Troubleshooting

### Port Already in Use

```bash
# Ubah port di config.json atau gunakan:
flask run --port 8001
```

### Import Error

```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### CORS Issues

- Pastikan Flask-CORS sudah terinstall
- Check konfigurasi CORS di app.py

### Lokal Styles Tidak Load

- Pastikan path relatif aplikasi benar
- Check browser console untuk errors

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Next Steps

1. Baca [README.md](./README.md) untuk overview
2. Cek [CONTRIBUTING.md](./CONTRIBUTING.md) untuk kontribusi
3. Buka issue untuk bugs atau feature requests
4. Diskusi di GitHub Discussions

---

Happy Development! 🚀
