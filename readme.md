# AI-Driven Product Recommendation Engine
A React- native app for recommendation engine that delivers personalized product suggestions in real-time for an e-commerce platform.
recommendation system that can be integrated into an e-commerce platform

### Stack:
- AI/ML: Python ( Scikit-learn, TensorFlow/Keras).
- Backend: Node.js with Express.js for APIs.
- 3RD-PARTY-API: https://axesso.developer.azure-api.net/ for amazon api access
- Frontend: React Native for a mobile app.

# Documentations
**Objective**
Collect or simulate a dataset containing user interactions and product details.
- Public Dataset: - Amazon Product Reviews Dataset from https://www.kaggle.com/datasets/saurav9786/amazon-product-reviews?resource=download

**Overview**
The recommendation engine is designed to provide personalized product recommendations to users based on their preferences and behavior. It employs machine learning techniques to analyze user interactions, patterns, and product data to generate relevant suggestions.

Key Components
- Data Preprocessing
Cleans and organizes raw input data for training the model.
Formats include user-item interactions such as product ratings,

- Recommendation Model
A collaborative filtering algorithm forms the basis of the recommendation engine.
It utilizes user-item interaction matrices to identify patterns and similarities between users and products.

- Model Training
The recommendation model is trained using historical user data.
Key techniques include:
Matrix Factorization (e.g., Singular Value Decomposition - SVD).

- Recommendation Retrieval
After training, the model can predict products of interest for each user.
Recommendations are sorted based on predicted relevance.



# Api Endpoints
### BUILD MODEL 
Trigger the process to build or train the recommendation model.

**Endpoint** GET /model/build

**Response**

200 OK (When the model is successfully built)

```json
{
  "message": "Recommendation model built successfully."
}
```


### GET USER RECOMMENDATION
Fetch personalized product recommendations for a specific user, including detailed product information from Amazon.

**Endpoint** GET api/recommendations/:userId

**Path Parameters**: userId (string): The ID of the user for whom recommendations are being fetched.

**Response**
```json
{
    "userId": "{amazon_userId}",
    "recommendations": [
        "{productId}",
        "{productId}",
        "..."
    ],
    "productDetails": {
        "id": "{product Id}",
        "name": "Product Title 1",
        "description": "Product description 1", 
        "image": "https://image-link-1.com",
        "price": 81.97, //example
        "rating": "4.2 out of 5 stars", //example
        "link": "{Product Link}" 
    },
    {
        "id": "{product Id}",
        "name": "Product Title 2",
        "description": "Product description 2", 
        "image": "https://image-link-2.com",
        "price": 29.97, //example
        "rating": "4.2 out of 5 stars", //example
        "link": "{Product Link}" 
    }
}
```



# Future Enhancements
- Hybrid Recommendations: Combine collaborative filtering with content-based filtering for improved accuracy.
- A/B Testing: Implement A/B testing to evaluate recommendation effectiveness.
- User Feedback Integration: Use explicit feedback (e.g., likes, dislikes) to refine recommendations.
- This documentation provides a simple guide to understand and utilize the recommendation engine effectively. Let me know if you'd like to include more technical details or workflows!


# App view
![alt text](https://github.com/fredcodee/TeamManagement/blob/main/AppImages/homepage.jpg)
![alt text](https://github.com/fredcodee/TeamManagement/blob/main/AppImages/homepage.jpg)