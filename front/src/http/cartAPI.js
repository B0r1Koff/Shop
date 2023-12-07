import { $host } from "./index";

export const getCart = async (id) => {
    const response = await $host.get('cart/users/' + `${id}`)
    return response
}