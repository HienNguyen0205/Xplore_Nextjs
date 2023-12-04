import axios from "axios";

export const getTourSlot = async (id: string) => {
    return axios.get(`/api/tour/get-tour-slot?id=${id}`)
    .then(res => res.data)
}

export const getAvatar = async () => {
    return axios.get(`/api/user/get-avatar`)
    .then(res => res.data)
}

export const getHistory = async (from: string, to: string) => {
    return axios.get(`/api/history?from=${from}&to=${to}`)
    .then(res => res.data)
}

export const getWishlist = async (showTour: boolean) => {
    return axios.get(`/api/tour/get-wishlist?showTour=${showTour}`)
    .then(res => res.data)
}

export const setWishlist = async (id: string) => {
    return axios.post('/api/tour/set-wishlist', { id })
    .then(res => res.data)
}

export const changeAvatar = async (path: string) => {
    return axios.post('/api/user/change-avatar', {avatar: path})
    .then(res => res.data)
}