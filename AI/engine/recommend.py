def recommend_products(user_id, interaction_matrix, user_similarity_df, top_n=5):
    """Recommend products for a given user."""
    similar_users = user_similarity_df[user_id].sort_values(ascending=False).index[1:]  # Exclude the user
    recommendations = {}

    for sim_user in similar_users:
        sim_user_ratings = interaction_matrix.loc[sim_user]
        for product, rating in sim_user_ratings.items():
            if interaction_matrix.loc[user_id, product] == 0:  # User hasn't rated the product
                recommendations[product] = recommendations.get(product, 0) + rating

        if len(recommendations) >= top_n:
            break

    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    return [product for product, _ in sorted_recommendations[:top_n]]
