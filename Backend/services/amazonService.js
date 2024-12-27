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
            name: trimText(productDetails.productTitle, 50),
            description: trimText(productDetails.productDescription, 100),
            image: productDetails.imageUrlList[0], //just using the first image
            price: productDetails.price,
            rating: productDetails.productRating,
            link:`https://www.amazon.com/dp/${productId}?psc=1`
        }
        return productDetails
        
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch product details for product ID ${productId}, error: ${error.message}`);
    }
}

const trimText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

module.exports= {
    getProductDetails
}