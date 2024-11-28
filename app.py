from flask import Flask, render_template, request, jsonify
import pickle
import os
from flask_cors import CORS
from feedback_analyzer import FeedbackAnalyzer  # Ensure this is correctly implemented

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Path to the pickle file (local file path)
pickle_file_path = os.path.join(os.path.dirname(__file__), 'models', 'feedback_analyzer.pkl')

# Load the model from the pickle file
try:
    with open(pickle_file_path, 'rb') as f:
        feedback_analyzer = pickle.load(f)
except Exception as e:
    print(f"Error loading the pickle file: {e}")
    feedback_analyzer = None

# Handle feedback analysis
@app.route('/add_feedback', methods=['POST'])
def add_feedback():
    feedback_text = request.form.get('feedback')  # Get feedback from the form

    if not feedback_text:
        return jsonify({'error': 'No feedback provided'}), 400

    if feedback_analyzer is None:
        return jsonify({'error': 'Feedback analyzer model is not loaded properly'}), 500

    try:
        # Use the FeedbackAnalyzer to analyze the feedback
        categories, result = feedback_analyzer.analyze_feedback(feedback_text)
        response = {
            'categories': categories,
            'result': result
        }
        return jsonify(response)  # Send back the result as JSON
    except Exception as e:
        return jsonify({'error': f'Error analyzing feedback: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
