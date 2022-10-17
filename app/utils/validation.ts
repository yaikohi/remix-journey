import { json } from "@remix-run/node"

export function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 3) {
        return `Usernames must be at least 3 characters long.`
    }
}

export function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
        return `Usernames must be at least 6 characters long.`
    }
}

export function validateUrl(url: any) {
    console.log(url)
    let urls = ["/"]

    if (urls.includes(url)) {
        return url
    }
    
    return "/"
}

export const badRequest = (data: any) =>
    json(data, { status: 400 }
);