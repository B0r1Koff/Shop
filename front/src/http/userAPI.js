import { $host } from "./index";

export const registration = async (email, password, role) => {
    const response = await $host.post('users/create', {email, password, role: "user"})
    return response
}

export const getAllUsers = async () => {
    const response = await $host.get('users/readAll')
    return response
}