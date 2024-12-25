import joblib

def save_similarity_model(similarity_matrix, file_path):
    """Save the user similarity matrix."""
    joblib.dump(similarity_matrix, file_path)
    print("Similarity model saved!")
