export type StudentType = {
    id: number
    name: string
    email: string
}

export type ActionResult = {
    success? : boolean
    errors?: {
        name?: string[]
        email?: string[]
     }
}