import joblib
import sys

def load_similarity_model(file_path):
    """Load the user similarity matrix."""
    similarity_matrix = joblib.load(file_path)
    print("Similarity model loaded!", file=sys.stderr)
    return similarity_matrix
