import api from './api';

// login kirim nama dan nim ke be
export const login = async (payload) => {
    const response = await api.post('/auth/login', payload);
    
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
}

//logout dengan cara menghapus token dan user dari localstorage
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

// mengambil kembali token
export const getToken = () => {
    return localStorage.getItem("token");
}

//  ambil user
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}