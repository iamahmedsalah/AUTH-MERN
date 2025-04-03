import {create} from 'zustand';
import axios from 'axios';



const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/auth':'/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    isAuthenticated:false,
    error: null,
    isLoaded:false,
    isCheckingAuth:true,
    message: null,


    signup: async (name, email, password) => {
        set({ error: null, isLoaded: true });
        try {
            const response = await axios.post(`${API_URL}/signup`,{ name, email, password });
            set({ user: response.data.newUser, isAuthenticated: true, isLoaded: false });
        } catch (error) {
            set({ error: error.response.data.msg , isLoaded: false });
            throw error;
        }
    },
    login: async ( email, password) => {
        set({ error: null, isLoaded: true });
        try {
            const response = await axios.post(`${API_URL}/login`,{ email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoaded: false });
        } catch (error) {
            set({ error: error.response?.data?.msg , isLoaded: false });
            throw error;
        }
    },
    logout: async ( ) => {
        set({ error: null, isLoaded: true });
        try {
            const response = await axios.get(`${API_URL}/logout`);
            set({ user:null, isAuthenticated: false, isLoaded: false });
        } catch (error) {
            set({ error: error.response?.data?.msg , isLoaded: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ error: null, isLoaded: true });
        try {
            const response = await axios.post(`${API_URL}/verified`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoaded: false });
            return response.data.user;
        } catch (error) {
            set({ error: error.response.data.msg , isLoaded: false });
            throw error;
        }
    },
	checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: error.response.data.msg, isCheckingAuth: false, isAuthenticated: false });
		}
	},
    forgetPassword: async (email) => {
        set({ error: null, isLoaded: true });
        try {
            const response = await axios.post(`${API_URL}/forget-password`, { email });
            set({ message: response.data.msg, isAuthenticated: false, isLoaded: false });
        } catch (error) {
            set({ error: error.response.data.msg ||'Error sending reset password email'  , isLoaded: false });
            throw error;
        }
    },
    resetPassword: async (password, token) => {
        set({ error: null, isLoaded: true });
        try {
            const response = await axios.put(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.msg, isAuthenticated: false, isLoaded: false });
        } catch (error) {
            set({ error: error.response.data.msg ||'Error resetting password' , isLoaded: false });
            throw error;
        }
    }
}));
