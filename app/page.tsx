'use client'

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [num, setNum] = useState(0)

  return (
    <div>
      <nav className="flex justify-between border my-2 p-4">
        <div>
          <Link href="/about">About</Link>
        </div>
        <div>
          <Link href="/foo">Foo</Link>
        </div>
      </nav>
      <main>
        <h1 className="font-bold text-red-600">
          Hello world!!
        </h1>
        <div>
          <div>
            {num}
          </div>
          <button
            className="border text-xl font-bold p-2 mr-2 rounded-xl"
            onClick={() => {
              setNum(num+1)
              console.log("num: ", num)
            }}>
            +
          </button>
          <button
            className="border text-xl font-bold p-2 rounded-xl"
            onClick={() => {
              setNum(num-1)
              console.log("num: ", num)
            }}>
            -
          </button>
        </div>
      </main>

    </div>
  )
}
