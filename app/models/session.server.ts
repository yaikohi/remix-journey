import bcrypt from "bcryptjs"
import { createCookieSessionStorage, redirect } from "@remix-run/node"
import { prisma } from "./prisma.server"

type LoginForm = {
    username: string
    password: string
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set")
}

export const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        cookie: {
            name: "__poke_remix_session",
            // normally you want this to be `secure: true`
            // but that doesn't work on localhost for Safari
            // https://web.dev/when-to-use-local-https/
            secure: process.env.NODE_ENV === "production",
            secrets: [sessionSecret],
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true
        }
    })

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await getSession()
    session.set("userId", userId)
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
}

/**
 * Simple helper function that gets the session-cookie from the `request.header` object.
 * @param request
 * @returns
 */
function getUserSession(request: Request) {
    return getSession(request.headers.get("Cookie"))
}

/**
 * 1. Gets the session from the `request`.
 * 2. finds the userId from this session
 * 3. Returns the userId if it exists, null if it doesn't.
 * @param request
 * @returns
 */
export async function getUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get("userId")
    if (!userId || typeof userId !== "string") return null
    return userId
}

/**
 * 1. Gets the userId and then either:
 * - Fetches the user from the database
 *
 * OR
 *
 * - throws an error and calls `logout`.
 *
 *
 * @param request
 * @returns
 */
export async function getUser(request: Request) {
    const userId = await getUserId(request)
    if (typeof userId !== "string") {
        return null
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, username: true }
        })
        return user
    } catch {
        throw logout(request)
    }
}

/**
 * Registers a new user to the database.
 *
 * 1. Hashes password
 * 2. Creates new user with hashed password to database, and returns the user object.
 * 3. Finally: returns the `user.id` and `username`
 * @param param0
 * @returns
 */
export async function register({ username, password }: LoginForm) {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: { username, passwordHash }
    })
    return { id: user.id, username }
}

/**
 * 1. Looks for existing user in db
 * 2. If not found, return null, if password doesn't match, return null as well. If found:
 * 3. Returns `user.id` and `username` from db.
 * @param LoginForm
 * @returns
 */
export async function login({ username, password }: LoginForm) {
    const user = await prisma.user.findUnique({
        where: { username }
    })
    if (!user) return null
    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isCorrectPassword) return null
    return { id: user.id, username }
}

/**
 * 1. Get the `userSession`
 * 2. redirect user to `/login` page and destroy the current session of the user.
 * @param request
 * @returns
 */
export async function logout(request: Request) {
    const session = await getUserSession(request)
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session)
        }
    })
}
