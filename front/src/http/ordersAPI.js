import { $host } from "./index";

export const createOrder = async (cost, number, quantity, status, productId, userId) => {
    const response = await $host.post('orders/create', {cost, number, quantity, status, productId, userId})
    return response
}

export const getUsersOrder = async (userId) => {
    const response = await $host.get('orders/users/' + `${userId}`)
    return response
}