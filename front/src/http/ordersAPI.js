import { $host } from "./index";

export const createOrder = async (cost, number, quantity, status, productId, userId) => {
    const response = await $host.post('orders/create', {cost, number, quantity, status, productId, userId})
    return response
}

export const updateOrder = async (id, cost, number, quantity, status, product, user) => {
    const response = await $host.post('orders/update', {id, cost, number, quantity, status, product, user})
    return response
}

export const getUsersOrder = async (userId) => {
    const response = await $host.get('orders/users/' + `${userId}`)
    return response
}

export const getAllOrders = async () => {
    const response = await $host.get('orders/getAll')
    return response
}

export const resetOrder = async(id)=>{
    const response = await $host.post('orders/delete/'+`${id}`)
    return response
}