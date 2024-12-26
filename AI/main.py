import sys
import os
from engine.preprocess import load_data, preprocess_data
from engine.similarity import compute_similarity
from engine.recommend import recommend_products
from engine.save_model import save_similarity_model
from engine.load_model import load_similarity_model
import pickle
import json

def build_and_save_model(data_path, similarity_model_path):
    """Complete workflow for building the recommendation engine."""
    # Load and preprocess the data
    data = load_data(data_path)
    interaction_matrix = preprocess_data(data)

    # Compute similarity
    user_similarity_df = compute_similarity(interaction_matrix)

    # Save the similarity matrix
    save_similarity_model(user_similarity_df, similarity_model_path)
    print("Model built and saved successfully.")
    return interaction_matrix, user_similarity_df

def generate_recommendations(user_id, interaction_matrix, similarity_model_path, top_n=5):
    """Generate recommendations for a given user."""
    # Load precomputed similarity matrix
    user_similarity_df = load_similarity_model(similarity_model_path)

    # Get recommendations
    return recommend_products(user_id, interaction_matrix, user_similarity_df, top_n)

if __name__ == "__main__":
    mode = sys.argv[1]  # "build" or "recommend"

    if mode == "build":
        # Full build workflow
        data_path = os.path.abspath('./Datasets/amazonProductReviews.csv')
        similarity_model_path = "user_similarity.pkl"
        interaction_matrix, _ = build_and_save_model(data_path, similarity_model_path)

        # Save interaction_matrix for later use (if needed)
        with open('interaction_matrix.pkl', 'wb') as f:
            pickle.dump(interaction_matrix, f)

    elif mode == "recommend":
        # Generate recommendations
        user_id = sys.argv[2]  # Pass user ID as a command-line argument
        similarity_model_path = "user_similarity.pkl"
        with open('interaction_matrix.pkl', 'rb') as f:
            interaction_matrix = pickle.load(f)

        recommendations = generate_recommendations(user_id, interaction_matrix, similarity_model_path)
        print(json.dumps(recommendations)) 

    else:
        print("Invalid mode. Use 'build' to train the model or 'recommend' to get recommendations.")
