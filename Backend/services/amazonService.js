//amazon api via axesso
const axios = require('axios');

const getProductDetails = async(productId) =>{
    try {
        const response = await axios.get(`https://api.axesso.de/amz/amazon-lookup-product?url=https:%2F%2Fwww.amazon.com%2Fdp%2F${productId}%3Fpsc=1`, {
            headers: {
                'Cache-Control': 'no-cache',
                'axesso-api-key': process.env.AXESS0-AMAZON-API-KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports= {
    getProductDetails
}