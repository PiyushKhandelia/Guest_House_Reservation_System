# feedback_analyzer.py
import pickle
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

class FeedbackAnalyzer:
    def __init__(self):
        self.sia = SentimentIntensityAnalyzer()
        self.categories_keywords = {
            "House Keeping": ["cleaning", "room", "washroom"],
            "Catering": ["food", "kitchen", "quality", "quantity"],
            "Maintenance": ["electricity", "water", "ac", "fridge", "geyser", "tv"]
        }

    def analyze_feedback(self, feedback):
        sentiment = self.sia.polarity_scores(feedback)
        categories = [
            category
            for category, keywords in self.categories_keywords.items()
            if any(keyword in feedback.lower() for keyword in keywords)
        ]

        if sentiment['compound'] > 0.5:
            sentiment_response = "Thank you for your positive feedback!"
        elif sentiment['compound'] < -0.5:
            sentiment_response = "We apologize for the negative experience. We'll work to improve."
        else:
            sentiment_response = "Thank you for your feedback. We'll investigate the issues you raised."

        category_responses = []
        if "House Keeping" in categories:
            category_responses.append("We'll address the housekeeping concerns, including cleaning and room-related issues.")
        if "Catering" in categories:
            category_responses.append("We'll look into the food quality and catering-related concerns.")
        if "Maintenance" in categories:
            category_responses.append("We'll address the maintenance issues, including electricity, water, and appliance problems.")

        full_response = " ".join(category_responses) if category_responses else sentiment_response
        return categories, full_response
