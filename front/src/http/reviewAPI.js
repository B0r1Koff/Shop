import { $host } from "./index";

export const getAllReviews = async (id) => {
    const response = await $host.get('review/product/' + id)
    return response
}

export const createReview = async (grade, text, productId, userId) => {
    const response = await $host.post('review/create', {grade, text, productId, userId})
    return response
}

export const deleteReview = async (id) => {
    const response = await $host.post('review/delete/' + id)
    return response
}