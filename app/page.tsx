import Image from "next/image";
import { Resend } from "resend";
import { EmailTemplate } from "./components/teplate";
import { db } from "@/lib/db";
import { forms } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  async function sendEmail(formData: FormData) {
    "use server";
    const resend = new Resend(process.env.RESEND_API_KEY);

    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      person: formData.get("person"),
    };

    console.log(rawFormData);

    // Vlozenie dat do databazy
    const dbData = await db.insert(forms).values({
      name: `${rawFormData.name}`,
      email: `${rawFormData.email}`,
      message: `${rawFormData.message}`,
      person: `${rawFormData.person}`,
      phone: `${rawFormData.phone}`,
    });

    console.log(dbData);

    // Poslanie emailu
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["adamdemian1@gmail.com"],
      subject: "Your form",
      react: EmailTemplate({
        firstName: rawFormData.name?.toString()!,
        message: rawFormData.message?.toString()!,
        email: rawFormData.email?.toString()!,
        phone: rawFormData.phone?.toString()!,
        person: rawFormData.person?.toString()!,
      }),
      text: "This is the plain text version of the message.",
    });

    console.log(data);

    revalidatePath("/");
  }

  // Ziskanie dat z databazy
  const formData = await db.query.forms.findMany();

  return (
    <main className="flex justify-evenly">
      <form
        action={sendEmail}
        className="flex flex-col p-10 justify-center items-center"
      >
        <h1 className="text-2xl font-bold">Form</h1>
        <label htmlFor="name" className="w-[300px] mt-5 mb-1">
          Your name
        </label>
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className="w-[300px] py-3 rounded-md px-2 border"
        />
        <label htmlFor="email" className="w-[300px] mt-5 mb-1">
          Your email
        </label>
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          className="w-[300px] py-3 rounded-md px-2 border"
        />
        <label htmlFor="number" className="w-[300px] mt-5 mb-1">
          Phone number
        </label>
        <input
          type="text"
          required
          name="phone"
          placeholder="Phone"
          className="w-[300px] py-3 rounded-md px-2 border"
        />
        <label htmlFor="message" className="w-[300px] mt-5 mb-1">
          Message
        </label>
        <textarea
          required
          name="message"
          placeholder="Message"
          className="w-[300px] py-3 rounded-md px-2 border"
        />
        <label htmlFor="person" className="w-[300px] mt-5 mb-1">
          Are you a person?
        </label>
        <select
          required
          name="person"
          className="w-[300px] py-3 border rounded-md"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button
          type="submit"
          className="py-3 w-[300px] bg-black text-white hover:bg-white hover:text-black duration-150 border border-black rounded-md mt-5"
        >
          Send
        </button>
      </form>
      <div className="flex items-center flex-col justify-center">
        <h1 className="italic">Data from database:</h1>
        <div className="grid grid-cols-3 p-5 justify-center bg-gray-700 text-white font-mono max-w-5xl rounded-md">
          {formData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-fit p-5"
            >
              <p className="text-sm">Id: {data.id}</p>
              <p className="text-sm">Name: {data.name}</p>
              <p className="text-sm">Email: {data.email}</p>
              <p className="text-sm">Phone: {data.phone}</p>
              <p className="text-sm">Message: {data.message}</p>
              <p className="text-sm">Person: {data.person}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
