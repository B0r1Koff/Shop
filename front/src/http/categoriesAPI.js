import { $host } from "./index";

export const getAllCategories = async () => {
    const response = await $host.get('category/readAll')
    return response
}