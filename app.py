import os
import uuid
from flask import Flask, abort, render_template, request, redirect, send_from_directory, url_for
from werkzeug.utils import secure_filename
import sqlite3

app = Flask(__name__)

ASSET_FOLDER = os.path.join(app.root_path, 'assets')
DATABASE_PATH = os.path.join(app.root_path, 'database.db')
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
PORTFOLIO_TYPES = {'thumbnails', 'logos', 'banners', 'posters'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

with get_db_connection() as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS portfolio (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        category TEXT NOT NULL,
                        type TEXT NOT NULL,
                        filename TEXT,
                        image_url TEXT)''')
    conn.commit()

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/assets/<path:filename>')
def assets(filename):
    return send_from_directory(ASSET_FOLDER, filename)

@app.route('/')
def index():
    conn = get_db_connection()
    items = conn.execute(
        'SELECT type, category, filename, image_url FROM portfolio ORDER BY id'
    ).fetchall()
    conn.close()
    uploaded_items = {item_type: [] for item_type in PORTFOLIO_TYPES}
    for item in items:
        if item['type'] not in uploaded_items:
            continue
        uploaded_items[item['type']].append({
            'src': (
                url_for('static', filename='uploads/' + item['filename'])
                if item['filename'] else item['image_url']
            ),
            'alt': f"{item['category']} design"
        })
    return render_template('index.html', uploaded_items=uploaded_items)

@app.route('/index.html')
def index_page():
    return redirect(url_for('index'))

@app.route('/<category>.html')
def portfolio_page(category):
    if category not in PORTFOLIO_TYPES:
        abort(404)
    conn = get_db_connection()
    items = conn.execute(
        'SELECT category, filename, image_url FROM portfolio WHERE type = ? ORDER BY id',
        (category,)
    ).fetchall()
    conn.close()
    uploaded_items = [
        {
            'src': (
                url_for('static', filename='uploads/' + item['filename'])
                if item['filename'] else item['image_url']
            ),
            'alt': f"{item['category']} design"
        }
        for item in items
    ]
    return render_template(f'{category}.html', uploaded_items=uploaded_items)

@app.route('/manage', methods=['GET', 'POST'])
def manage():
    if request.method == 'POST':
        category = request.form.get('category', 'general')
        item_type = request.form.get('type', 'thumbnails')
        image_link = request.form.get('image_link', '').strip()
        if item_type not in PORTFOLIO_TYPES:
            abort(400, description='Please select a valid portfolio type.')

        files = request.files.getlist('photos')
        files = [file for file in files if file and file.filename]
        if not files and not image_link:
            abort(400, description='Choose at least one image file or provide an image URL.')
        if any(not allowed_file(file.filename) for file in files):
            abort(400, description='Allowed image formats are PNG, JPG, JPEG, and WEBP.')

        conn = get_db_connection()
        try:
            for file in files:
                extension = os.path.splitext(secure_filename(file.filename))[1].lower()
                filename = f'{uuid.uuid4().hex}{extension}'
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                conn.execute(
                    'INSERT INTO portfolio (category, type, filename, image_url) VALUES (?, ?, ?, ?)',
                    (category, item_type, filename, None)
                )

            if image_link:
                conn.execute(
                    'INSERT INTO portfolio (category, type, filename, image_url) VALUES (?, ?, ?, ?)',
                    (category, item_type, None, image_link)
                )
                
            conn.commit()
        finally:
            conn.close()
        return redirect(url_for('manage'))

    conn = get_db_connection()
    items = conn.execute('SELECT * FROM portfolio').fetchall()
    conn.close()
    return render_template('manage.html', items=items)

@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT * FROM portfolio WHERE id = ?', (item_id,)).fetchone()
    
    if item:
        if item['filename']:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], item['filename'])
            if os.path.exists(file_path):
                os.remove(file_path)
                
        conn.execute('DELETE FROM portfolio WHERE id = ?', (item_id,))
        conn.commit()
        
    conn.close()
    return redirect(url_for('manage'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)