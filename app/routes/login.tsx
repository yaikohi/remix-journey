import { createUserSession, login, register } from "~/models/session.server"
import type { ActionFunction } from "@remix-run/node"
import {
    badRequest,
    validatePassword,
    validateUrl,
    validateUsername
} from "~/utils/validation"
import { prisma } from "~/models/prisma.server"
import { useActionData, useSearchParams } from "@remix-run/react"

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const loginType = form.get("loginType")
    const username = form.get("username")
    const password = form.get("password")
    const redirectTo = validateUrl(form.get("redirectTo") || "/")

    if (
        typeof loginType !== "string" ||
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof redirectTo !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`
        })
    }

    const fields = { loginType, username, password }
    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password)
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors, fields })
    }

    // used with a 'fieldset' html element to check for what login form should be displayed
    switch (loginType) {
        case "login": {
            const user = await login({ username, password })

            console.log({ user })

            if (!user) {
                return badRequest({
                    fields,
                    formError: `Username/Password combination is incorrect`
                })
            }

            return createUserSession(user.id, redirectTo)
        }
        case "register": {
            const userExists = await prisma.user.findFirst({
                where: { username }
            })

            if (userExists) {
                return badRequest({
                    fields,
                    formError: `User with username ${username} already exists`
                })
            }

            const user = await register({ username, password })

            if (!user) {
                return badRequest({
                    fields,
                    formError: `Something went wrong trying to create a new user.`
                })
            }

            return createUserSession(user.id, redirectTo)
        }
        default: {
            return badRequest({
                fields,
                formError: `Login type invalid`
            })
        }
    }
}

export default function LoginRoute() {
    const actionData = useActionData()
    const [searchParams] = useSearchParams()

    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <h1 className="text-7xl">Login</h1>
            </div>
            <form
                method="post"
                className="max-w-sm p-4 bg-ctp-surface0 rounded-xl"
            >
                <fieldset className="flex flex-row max-w-sm gap-2 rounded-lg bg-ctp-base min-w-min">
                    <label className="flex flex-row gap-2 p-6 text-lg">
                        <input
                            type="radio"
                            value="login"
                            name="loginType"
                            defaultChecked={
                                !actionData?.fields?.loginType ||
                                actionData?.fields?.loginType === "login"
                            }
                        />
                        Login
                    </label>
                    <label className="flex flex-row gap-2 p-6 text-lg">
                        <input
                            type="radio"
                            name="loginType"
                            value="register"
                            defaultChecked={
                                actionData?.fields?.loginType === "register"
                            }
                        />
                        Register
                    </label>
                </fieldset>
                <input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get("redirectTo") ?? undefined}
                />

                <label className="text-lg leading-7">
                    Username:
                    <input
                        type="text"
                        className={
                            "w-full rounded border border-ctp-overlay1 px-2 py-1 text-lg  bg-ctp-crust outline-ctp-overlay2 "
                        }
                        name="username"
                        required
                        minLength={3}
                        defaultValue={actionData?.fields?.username}
                        aria-invalid={Boolean(
                            actionData?.fieldErrors?.username
                        )}
                        aria-errormessage={
                            actionData?.fieldErrors?.username
                                ? "username-error"
                                : undefined
                        }
                    />
                    {actionData?.fieldErrors?.username ? (
                        <p
                            className="text-ctp-red"
                            role="alert"
                            id="username-error"
                        >
                            {actionData.fieldErrors.username}
                        </p>
                    ) : null}
                </label>

                <label className="text-lg leading-7">
                    Password
                    <input
                        name="password"
                        className={
                            "w-full bg-ctp-crust rounded border border-ctp-overlay1 px-2 py-1 text-lg  outline-ctp-overlay2 "
                        }
                        required
                        defaultValue={actionData?.fields?.password}
                        type="password"
                        aria-invalid={
                            Boolean(actionData?.fieldErrors?.password) ||
                            undefined
                        }
                        aria-errormessage={
                            actionData?.fieldErrors?.password
                                ? "password-error"
                                : undefined
                        }
                    />
                    {actionData?.fieldErrors?.password ? (
                        <p
                            className="text-ctp-red"
                            role="alert"
                            id="password-error"
                        >
                            {actionData.fieldErrors.password}
                        </p>
                    ) : null}
                </label>

                <div id="form-error-message">
                    {actionData?.formError ? (
                        <p className="text-ctp-red" role="alert">
                            {actionData.formError}
                        </p>
                    ) : null}
                </div>

                <button
                    className="py-2 my-4 font-bold border-2 rounded-lg border-ctp-overlay2 px-7 hover:scale-105"
                    type="submit"
                >
                    Login or register
                </button>
            </form>
        </>
    )
}
