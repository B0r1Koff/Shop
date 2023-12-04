import { $host } from "./index";

export const getAllProducts = async () => {
    const response = await $host.get('product/readAll')
    return response
}