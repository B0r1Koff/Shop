import { $host } from "./index";

export const getByUserId = async (id) => {
    const response = await $host.get('favorites/users/' + `${id}`)
    return response
}

export const unLike = async(id)=>{
    const response = await $host.post('favorites/delete/'+`${id}`)
    return response
}

export const like = async(productId, userId)=>{
    const response = await $host.post('favorites/create', {productId, userId})
    return response
}