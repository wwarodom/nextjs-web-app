'use client'

import { deleteStudent } from "@/app/actions/deleteStudent"
import saveStudent from "@/app/actions/saveStudent"
import { ActionResult, StudentType } from "@/lib/type"
import { useActionState, useState } from "react"

1
export default function StudentListComponent({ students }: { students: StudentType[] }) {

    const [editId, setEditId] = useState(0)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [state, action, isPending] = useActionState(
        async (prev: ActionResult, formData: FormData) => {
            const result = await saveStudent(prev, formData)
            if (result.success)
                resetForm()
            return result
        }
        , {} as ActionResult)

    console.log(state)

    const resetForm = () => {
        setName("")
        setEmail("")
        setEditId(0)
    }

    const handleEdit = (student: StudentType) => {
        setName(student.name)
        setEmail(student.email)
        setEditId(student.id)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure to delete this student?")) return;
        await deleteStudent(id)
    }

    return <div className="p-8">
        <h1>Student</h1>

        <form action={action}>
            <div>
                {(editId !== 0) && <input type="hidden" name="id" value={editId} />}
                <input
                    className="border p-2 w-full mb-2 rounded-lg"
                    type="text" name="name" placeholder="name" maxLength={20}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {state.errors?.name && (<p className="text-red-600 text-sm mb-2">
                    {state.errors.name[0]}</p>)}
            </div>
            <div>
                <input
                    className="border p-2 w-full mb-2 rounded-lg"
                    type="text" name="email" placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {state.errors?.email && (<p className="text-red-600 text-sm mb-2">
                    {state.errors.email[0]}</p>)}

            </div>
            <div>
                <button className="border p-2 rounded-lg mb-2"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : editId ? "Update": "Add" }
                </button>
            </div>
        </form>

        <div>
            <table className="w-full border-zinc-400 border text-sm text-left">
                <thead className="bg-zinc-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-600">
                    {
                        students.map((item, index) => <tr key={index}>
                            <td className="px-4 py-2">{item.id}</td>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.email}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 px-2"
                                    onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
}