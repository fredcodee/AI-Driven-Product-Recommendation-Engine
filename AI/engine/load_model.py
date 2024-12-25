import joblib

def load_similarity_model(file_path):
    """Load the user similarity matrix."""
    similarity_matrix = joblib.load(file_path)
    print("Similarity model loaded!")
    return similarity_matrix
