import axios from 'axios';

// Base URL for your backend services
const BASE_URL = 'http://127.0.0.1:8000';

// Axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

// API methods
export const createUser = async (userData) => {
    const response = await api.post('/users/', userData);
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/users/');
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
};

export const getReviews = async (revieweeId) => {
    const response = await api.get(`/reviews/${revieweeId}`);
    return response.data;
};

// Add more methods as needed
