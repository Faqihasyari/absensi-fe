import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        userRole: (state) => state.user?.role || null,
    },

    actions:{
        // login
        async login (nama, nim){
            try {
                const response = await api.post('/auth/login', { nama, nim });

            const {token, user} = response.data;

            this.token = token;
            this.user = user;

            // simpan ke localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // set token ke header axios
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            return true;
            } catch (error) {
                throw error.response?.data || {message: "Login gagal"};
            }
            
        },

        // logout
        logout (){
            this.token = null;
            this.user = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            delete api.defaults.headers.common["Authorization"];
        },

        // init auth buat refresh page
        initAuth (){
            if (this.token) {
                api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
            }
        }
    }
})