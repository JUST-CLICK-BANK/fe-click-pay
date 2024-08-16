
import axios from 'axios';

export const createCardProduct = async (formData) => {
    try {
        const res = await axios.post('http://localhost:8080/api/v1/card-products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error in createCardProduct', error);
        throw error;
    }
};


