import { $host } from "./index";

export const getProductsCharacteristics = async (id) => {
    const response = await $host.get('characteristic/product/' + id)
    return response
}

export const createCharacteristic = async (name, value, productId) => {
    const response = await $host.post('characteristic/create', {name, value, productId})
    return response
}