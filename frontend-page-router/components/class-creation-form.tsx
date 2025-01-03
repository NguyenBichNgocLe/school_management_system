import { AuthContext } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

export default function ClassCreationForm() {
  const { role } = useContext(AuthContext);
  const [className, setClassName] = useState("");
  const router = useRouter();

  const submitClassCreationForm = useCallback(async () => {
    const res = await fetch("http://localhost:3000/class", {
      method: "POST",
      headers: [
        ["Authorization", `Bearer ${role}`],
        ["Content-Type", "application/json"],
      ],
      body: JSON.stringify({
        className,
      }),
    });

    const resContent = await res.json();
    if (res.ok) {
      router.replace(`/class?role=${role}`);
      return;
    }

    alert(resContent.devMessage);
  }, [role, className, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="flex justify-center text-2xl font-bold mb-4">
        Create A New Class
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitClassCreationForm();
        }}
      >
        <label htmlFor="form--class-name">Class name</label>
        <input
          id="form--class-name"
          className="block w-full border-2 border-black rounded px-2 py-1 mb-2"
          name="className"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        <input
          type="submit"
          value="Create Class"
          className="flex justify-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
        />
      </form>
    </div>
  );
}
