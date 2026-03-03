import StudentList from "@/components/StudentList"
import { prisma } from "@/lib/prisma" 
export default async function StudentPage() {

    const students = await prisma.student.findMany({
        orderBy: { id: "asc" }
    })

    console.log("student: ", students)


    return  <StudentList students={students} />
}