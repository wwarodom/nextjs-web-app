'use client'

import Image from 'next/image'
import { useState } from 'react'

const URL = "https://api.github.com/users"

type GithubUser = {
    login: string
    id: string
    avatar_url: string
}

export default function FetchUser({ initData }: { initData: GithubUser }) {

    const [login, setLogin] = useState('wwarodom')
    const [data, setData] = useState<GithubUser>(initData)

    async function fetchGithubUser() {
        const response = await fetch(`${URL}/${login}`)
        const data2 = await response.json()
        setData(data2)
    }

    return (
        <div>
            <h1 className='text-xl font-bold m-2'>Fetch</h1>
            <div className='flex border-2 m-2  p-2 rounded w-fit'>
                <div className='mr-6'>
                    <div>
                        Login: {data?.login}
                    </div>
                    <div>
                        id: {data?.id}
                    </div>
                </div>
                <div>
                    <Image
                        className='w-16 h-auto'
                        src={data?.avatar_url ?? "/next.svg"} loading="eager" width={50} height={50} alt="profile" />
                </div>
            </div>

            <div>
                <input
                    className='border p-2 m-2 rounded'
                    type="text" name="login" placeholder='login'
                    onChange={(e) => setLogin(e.target.value)}
                />
                <button className='border p-2 m-2 rounded'
                    onClick={fetchGithubUser}

                >
                    Submit
                </button>
            </div>
        </div>
    )
}
