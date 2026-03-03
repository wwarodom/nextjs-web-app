import FetchUser from "./FetchUser"

const URL = "https://api.github.com/users/wwarodom"

type GithubUser = {
    login: string
    id: string
    avatar_url: string
}

export default async function FetchPage() {

    const response = await fetch(`${URL}`)
    const data = await response.json()

    return (
        <FetchUser initData={data} />
    )
}
