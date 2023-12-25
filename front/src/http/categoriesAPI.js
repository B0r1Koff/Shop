import { $host } from "./index";

export const getAllCategories = async () => {
    const response = await $host.get('category/readAll')
    return response
}

export const addCategory = async (name) => {
    const response = await $host.post('category/create', {name})
    return response
}