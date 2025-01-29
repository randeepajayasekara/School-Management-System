"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import toast from "react-hot-toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  username: z.string().min(1, { message: "Username is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.string().min(1, { message: "Birthday is required!" }),
  gender: z.enum(["male", "female", "non-binary"], { message: "Gender is required!" }),
  img: z.string().url({ message: "Image URL is required and must be a valid URL!" }),
  subjects: z.array(z.string()).min(1, { message: "At least one subject is required!" }),
  classes: z.array(z.string()).min(1, { message: "At least one class is required!" }),
});

type Inputs = z.infer<typeof schema>;

const predefinedSubjects = ["Math", "Science", "History", "English"];
const predefinedClasses = ["Class 1", "Class 2", "Class 3", "Class 4"];

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      const CreateuserCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const createuser = CreateuserCredential.user;

      await setDoc(doc(db, "users", createuser.uid), {
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
        bloodType: formData.bloodType,
        birthday: formData.birthday,
        gender: formData.gender,
        profilePicture: formData.img,
        role: "teacher",
        nameRole: "Teacher",
        subjects: formData.subjects,
        classes: formData.classes,
      });

      console.log("Teacher account created successfully");
      toast.success("Teacher account created successfully, Account Switched for testing...");
    } catch (error) {
      toast.error(`Error creating teacher account: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update teacher"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Image URL"
          name="img"
          defaultValue={data?.img}
          register={register}
          error={errors.img}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjects")}
            multiple
            defaultValue={data?.subjects}
          >
            {predefinedSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subjects?.[0]?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects[0].message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Classes</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classes")}
            multiple
            defaultValue={data?.classes}
          >
            {predefinedClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          {errors.classes?.[0]?.message && (
            <p className="text-xs text-red-400">
              {errors.classes[0].message.toString()}
            </p>
          )}
        </div>
      </div>
      <button
        className="bg-transparent text-gray-700 border-2 border-gray-200 p-2 rounded-md hover:bg-gray-100 duration-200"
        disabled={loading}
      >
        {loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
