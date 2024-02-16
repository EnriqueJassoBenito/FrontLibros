import axios from 'axios';

let URL = 'http://localhost:8080/api/book'

const getAllBooks = async () => {
    try{
        const response = await axios.get(`${URL}/`);
        // console.log('Respuesta de la solicitud GET a', URL, ':', response);
        return response.data;
    }catch (error){
        console.error('Error en la solicitud GET a', URL, ':', error);
        throw error;
    }
}

const getByIdBooks = async (id) => {
    try{
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    }catch (error){
        throw error;
    }
}

const postBooks = async (data) => {
    try{
        const response = await axios.post(`${URL}/`,data);
        return response.data;
    }catch (error){
        throw error;
    }
}

export default {
    getAllBooks,
    getByIdBooks,
    postBooks
}