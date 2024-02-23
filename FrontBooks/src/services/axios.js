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

const buscarLibroNombreAutor=async(nombre)=>{
    try{
        const response = await axios.get(`${URL}/bookBynameOrautor/${nombre}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

const buscarLibroGenero=async(nombre)=>{
    try{
        const response = await axios.get(`${URL}/bookByGenero/${nombre}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

const buscarfechas = async(f1, f2)=>{
    try {
        const response = await axios.get(`${URL}/bookByFechas/${f1}&${f2}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const buscarFecha = async(f)=>{
    try {
        const response = await axios.get(`${URL}/bookByFecha/${f}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const postBooks = async (data) => {
    try{
        // console.log("azios_ ",data)
        const response = await axios.post(`${URL}/`,data);
        return response.data;
    }catch (error){
        throw error;
    }
}

export default {
    getAllBooks,
    getByIdBooks,
    postBooks,
    buscarLibroNombreAutor,
    buscarfechas,
    buscarLibroGenero,
    buscarFecha
}