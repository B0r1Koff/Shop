import { $host } from "./index";

export const getAllProducts = async () => {
    const response = await $host.get('product/readAll')
    return response
}

export const getProductByCategoryId = async (id) => {
    const response = await $host.get('product/category/' + id)
    return response
}

export const getProductById = async (id) => {
    const response = await $host.get('product/getById/' + id)
    return response
}