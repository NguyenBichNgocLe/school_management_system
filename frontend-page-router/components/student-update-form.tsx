import { AuthContext } from "@/contexts/auth.context";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";

export default function StudentUpdateForm() {
  const { role } = useContext(AuthContext);
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const router = useRouter();

  const id = router.query["id"];

  const submitStudentUpdateForm = useCallback(async () => {
    const res = await fetch(`http://localhost:3000/student/${id}`, {
      method: "PATCH",
      headers: [
        ["Authorization", `Bearer ${role}`],
        ["Content-Type", "application/json"],
      ],
      body: JSON.stringify({
        studentName: studentName === "" ? undefined : studentName,
        className: className === "" ? undefined : className,
      }),
    });

    const resContent = await res.json();
    if (res.ok) {
      router.replace(`/student?role=${role}`);
      return;
    }

    alert(resContent.devMessage);
  }, [id, studentName, className, role, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="flex justify-center text-2xl font-bold mb-4">
        Update Student Information
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitStudentUpdateForm();
        }}
      >
        <label htmlFor="form--student-name">Student name</label>
        <input
          id="form--student-name"
          name="studentName"
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="block w-full border-2 border-black rounded px-2 py-1 mb-2"
        />
        <label htmlFor="form--class-name">Class name</label>
        <input
          id="form--class-name"
          className="block w-full border-2 border-black rounded px-2 py-1 mb-3"
          name="className"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="submit"
          value="Update Student"
          className="flex justify-end bg-green-500 text-white px-4 py-2 rounded hover:bg-green-900"
        />
      </form>
    </div>
  );
}