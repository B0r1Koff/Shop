import { $host } from "./index";

export const registration = async (email, password, role) => {
    const response = await $host.post('users/create', {email, password, role: "user"})
    return response
}

export const getAllUsers = async () => {
    const response = await $host.get('users/readAll')
    return response
}

export const checkLogin = async (email) => {
    const response = await $host.get('users/checkLogin/' + `${email}`)
    return response
}