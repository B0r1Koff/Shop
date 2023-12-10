import { $host } from "./index";

export const getProductsCharacteristics = async (id) => {
    const response = await $host.get('characteristic/product/' + id)
    return response
}