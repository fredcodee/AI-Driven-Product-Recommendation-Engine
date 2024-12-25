from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def compute_similarity(interaction_matrix):
    """Compute user-user similarity matrix."""
    similarity = cosine_similarity(interaction_matrix)
    similarity_df = pd.DataFrame(similarity, index=interaction_matrix.index, columns=interaction_matrix.index)
    print("User similarity matrix computed!")
    return similarity_df
