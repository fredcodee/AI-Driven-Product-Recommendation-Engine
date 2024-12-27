const axios = require('axios');

const getProductDetails = async(productId) =>{
    try {
        const apiKey = process.env.AXESSO_AMAZON_API_KEY;
        if (!apiKey) {
            throw new Error('API key is not set in the environment variables.');
        }
        //amazon api via axesso
        const response = await axios.get(`https://api.axesso.de/amz/amazon-lookup-product?url=https:%2F%2Fwww.amazon.com%2Fdp%2F${productId}%3Fpsc=1`, {
            headers: {
                'Cache-Control': 'no-cache',
                'axesso-api-key': apiKey
            }
        });
        let productDetails = response.data
        productDetails={
            id: productDetails.asin,
            name: productDetails.productTitle,
            description: productDetails.productDescription,
            image: productDetails.imageUrlList[0], //just using the first image
            price: productDetails.price,
            rating: productDetails.productRating, // "4.5 out of 5 stars"
            link:`https://www.amazon.com/dp/${productId}?psc=1`
        }
        return productDetails
        
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch product details for product ID ${productId}, error: ${error.message}`);
    }
}

module.exports= {
    getProductDetails
}