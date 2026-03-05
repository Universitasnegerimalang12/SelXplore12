"""
Biology Learning Platform Backend
Flask aplikasi untuk mengelola data pembelajaran biologi
"""

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
from datetime import datetime
from pathlib import Path

# Konfigurasi Flask untuk static files
app = Flask(__name__, 
            static_folder='.',
            static_url_path='',
            template_folder='.')
CORS(app)

# Konfigurasi
DATA_DIR = Path(__file__).parent / 'data'
DATA_DIR.mkdir(exist_ok=True)

USERS_FILE = DATA_DIR / 'users.json'
REFLECTIONS_FILE = DATA_DIR / 'reflections.json'
LKPD_FILE = DATA_DIR / 'lkpd.json'
SCORES_FILE = DATA_DIR / 'scores.json'

# ==================== UTILITY FUNCTIONS ====================

def load_json(filepath):
    """Load data from JSON file"""
    if filepath.exists():
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_json(filepath, data):
    """Save data to JSON file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def get_user_data(user_id):
    """Get user data"""
    users = load_json(USERS_FILE)
    return users.get(user_id, {})

def save_user_data(user_id, data):
    """Save user data"""
    users = load_json(USERS_FILE)
    users[user_id] = data
    save_json(USERS_FILE, users)

# ==================== MIDDLEWARE ====================

@app.after_request
def after_request(response):
    """Add headers untuk media files"""
    # Set proper MIME types
    if request.path.endswith('.mp4'):
        response.headers['Content-Type'] = 'video/mp4'
    elif request.path.endswith('.webp'):
        response.headers['Content-Type'] = 'image/webp'
    elif request.path.endswith('.jpeg') or request.path.endswith('.jpg'):
        response.headers['Content-Type'] = 'image/jpeg'
    elif request.path.endswith('.png'):
        response.headers['Content-Type'] = 'image/png'
    
    # Allow CORS untuk media files
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    
    # Cache control - adjust based on environment
    if app.debug:
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    else:
        response.headers['Cache-Control'] = 'public, max-age=31536000'  # 1 year
    
    return response

# ==================== ROUTES ====================

@app.route('/', methods=['GET'])
def home():
    """Home route - serve index.html"""
    return render_template('index.html')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

# ==================== USER ROUTES ====================

@app.route('/api/users', methods=['POST'])
def create_user():
    """Create new user"""
    data = request.get_json()
    
    if not data or 'user_id' not in data:
        return jsonify({'error': 'user_id required'}), 400
    
    user_id = data['user_id']
    user_data = {
        'user_id': user_id,
        'name': data.get('name', 'Anonymous'),
        'created_at': datetime.now().isoformat(),
        'completed_materials': [],
        'watched_videos': [],
        'quiz_scores': [],
        'total_score': 0
    }
    
    save_user_data(user_id, user_data)
    return jsonify(user_data), 201

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get user profile"""
    user = get_user_data(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user)

@app.route('/api/users/<user_id>/profile', methods=['GET'])
def get_user_profile(user_id):
    """Get user profile with statistics"""
    user = get_user_data(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    reflections = load_json(REFLECTIONS_FILE)
    user_reflections = [r for r in reflections.values() if r.get('user_id') == user_id]
    
    scores = load_json(SCORES_FILE)
    user_scores = [s for s in scores.values() if s.get('user_id') == user_id]
    
    profile = {
        'user_id': user_id,
        'name': user.get('name'),
        'created_at': user.get('created_at'),
        'materials_completed': len(user.get('completed_materials', [])),
        'videos_watched': len(user.get('watched_videos', [])),
        'reflections_count': len(user_reflections),
        'quizzes_taken': len(user_scores),
        'average_score': sum([s.get('score', 0) for s in user_scores]) / len(user_scores) if user_scores else 0,
        'total_score': user.get('total_score', 0)
    }
    
    return jsonify(profile)

# ==================== REFLECTION ROUTES ====================

@app.route('/api/reflections', methods=['POST'])
def save_reflection():
    """Save user reflection"""
    data = request.get_json()
    
    if not data or 'user_id' not in data:
        return jsonify({'error': 'user_id required'}), 400
    
    reflection_id = f"{data['user_id']}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    reflection = {
        'reflection_id': reflection_id,
        'user_id': data['user_id'],
        'easy_concept': data.get('easy_concept', ''),
        'difficult_concept': data.get('difficult_concept', ''),
        'application': data.get('application', ''),
        'understanding_level': data.get('understanding_level', 0),
        'created_at': datetime.now().isoformat()
    }
    
    reflections = load_json(REFLECTIONS_FILE)
    reflections[reflection_id] = reflection
    save_json(REFLECTIONS_FILE, reflections)
    
    return jsonify(reflection), 201

@app.route('/api/reflections/<user_id>', methods=['GET'])
def get_user_reflections(user_id):
    """Get all reflections for a user"""
    reflections = load_json(REFLECTIONS_FILE)
    user_reflections = [r for r in reflections.values() if r.get('user_id') == user_id]
    return jsonify(user_reflections)

# ==================== LKPD ROUTES ====================

@app.route('/api/lkpd', methods=['POST'])
def submit_lkpd():
    """Submit LKPD"""
    data = request.get_json()
    
    if not data or 'user_id' not in data:
        return jsonify({'error': 'user_id required'}), 400
    
    lkpd_id = f"{data['user_id']}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    lkpd_data = {
        'lkpd_id': lkpd_id,
        'user_id': data['user_id'],
        'name': data.get('name', ''),
        'answers': data.get('answers', {}),
        'submitted_at': datetime.now().isoformat(),
        'status': 'submitted'
    }
    
    lkpds = load_json(LKPD_FILE)
    lkpds[lkpd_id] = lkpd_data
    save_json(LKPD_FILE, lkpds)
    
    return jsonify(lkpd_data), 201

@app.route('/api/lkpd/<user_id>', methods=['GET'])
def get_user_lkpd(user_id):
    """Get all LKPD submissions for a user"""
    lkpds = load_json(LKPD_FILE)
    user_lkpds = [l for l in lkpds.values() if l.get('user_id') == user_id]
    return jsonify(user_lkpds)

# ==================== SCORE ROUTES ====================

@app.route('/api/scores', methods=['POST'])
def save_score():
    """Save quiz/game score"""
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'score' not in data:
        return jsonify({'error': 'user_id and score required'}), 400
    
    score_id = f"{data['user_id']}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    score_data = {
        'score_id': score_id,
        'user_id': data['user_id'],
        'score': data['score'],
        'total_questions': data.get('total_questions', 0),
        'percentage': (data['score'] / data.get('total_questions', 1)) * 100,
        'quiz_type': data.get('quiz_type', 'general'),
        'created_at': datetime.now().isoformat()
    }
    
    scores = load_json(SCORES_FILE)
    scores[score_id] = score_data
    save_json(SCORES_FILE, scores)
    
    # Update user total score
    user = get_user_data(data['user_id'])
    user['total_score'] = user.get('total_score', 0) + data['score']
    user['quiz_scores'] = user.get('quiz_scores', []) + [score_id]
    save_user_data(data['user_id'], user)
    
    return jsonify(score_data), 201

@app.route('/api/scores/<user_id>', methods=['GET'])
def get_user_scores(user_id):
    """Get all scores for a user"""
    scores = load_json(SCORES_FILE)
    user_scores = [s for s in scores.values() if s.get('user_id') == user_id]
    
    if not user_scores:
        return jsonify([])
    
    # Calculate statistics
    total_quizzes = len(user_scores)
    average_score = sum([s['score'] for s in user_scores]) / total_quizzes
    average_percentage = sum([s['percentage'] for s in user_scores]) / total_quizzes
    highest_score = max([s['score'] for s in user_scores])
    
    return jsonify({
        'scores': user_scores,
        'statistics': {
            'total_quizzes': total_quizzes,
            'average_score': average_score,
            'average_percentage': average_percentage,
            'highest_score': highest_score
        }
    })

# ==================== MATERIAL TRACKING ====================

@app.route('/api/materials/<user_id>/complete/<material_id>', methods=['POST'])
def complete_material(user_id, material_id):
    """Mark material as completed"""
    user = get_user_data(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    if material_id not in user.get('completed_materials', []):
        user.setdefault('completed_materials', []).append(material_id)
        save_user_data(user_id, user)
    
    return jsonify({'message': 'Material marked as completed', 'user': user})

@app.route('/api/videos/<user_id>/watched/<video_id>', methods=['POST'])
def mark_video_watched(user_id, video_id):
    """Mark video as watched"""
    user = get_user_data(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    if video_id not in user.get('watched_videos', []):
        user.setdefault('watched_videos', []).append(video_id)
        save_user_data(user_id, user)
    
    return jsonify({'message': 'Video marked as watched', 'user': user})

# ==================== EXPORT DATA ====================

@app.route('/api/export/<user_id>', methods=['GET'])
def export_user_data(user_id):
    """Export all user data"""
    user = get_user_data(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    reflections = load_json(REFLECTIONS_FILE)
    user_reflections = [r for r in reflections.values() if r.get('user_id') == user_id]
    
    lkpds = load_json(LKPD_FILE)
    user_lkpds = [l for l in lkpds.values() if l.get('user_id') == user_id]
    
    scores = load_json(SCORES_FILE)
    user_scores = [s for s in scores.values() if s.get('user_id') == user_id]
    
    export_data = {
        'user_profile': user,
        'reflections': user_reflections,
        'lkpd_submissions': user_lkpds,
        'quiz_scores': user_scores,
        'export_timestamp': datetime.now().isoformat()
    }
    
    return jsonify(export_data)

# ==================== STATISTICS ====================

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """Get overall platform statistics"""
    users = load_json(USERS_FILE)
    reflections = load_json(REFLECTIONS_FILE)
    lkpds = load_json(LKPD_FILE)
    scores = load_json(SCORES_FILE)
    
    stats = {
        'total_users': len(users),
        'total_reflections': len(reflections),
        'total_lkpd_submissions': len(lkpds),
        'total_quiz_attempts': len(scores),
        'average_score': sum([s.get('score', 0) for s in scores.values()]) / len(scores) if scores else 0,
        'platform_created': datetime.now().isoformat()
    }
    
    return jsonify(stats)

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not found',
        'message': str(error)
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'error': 'Internal server error',
        'message': str(error)
    }), 500

# ==================== MAIN ====================

if __name__ == '__main__':
    print("""
    ╔═══════════════════════════════════════════════════════╗
    ║   Biology Learning Platform - Backend Server          ║
    ║   API running on http://localhost:5000                ║
    ╚═══════════════════════════════════════════════════════╝
    """)
    
    # Create initial data files if they don't exist
    for filepath in [USERS_FILE, REFLECTIONS_FILE, LKPD_FILE, SCORES_FILE]:
        if not filepath.exists():
            save_json(filepath, {})
    
    app.run(debug=True, host='localhost', port=5000)
