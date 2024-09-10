"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import ReactSelect from "react-select";
import Select from "react-select";

const listOptions = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
  { value: "4", label: "Class 4" },
];

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  teacherId: z.string().min(1, { message: "Teacher ID is required!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  classes: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "At least one class must be selected!" }),
  sections: z.string().min(1, { message: "Section is required!" }),
  subjects: z.string().min(1, { message: "Subjects are required!" }),
  classIncharge: z.string().min(1, { message: "Class Incharge is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

// Usage in form handling
const onSubmit = (data: any) => {
  const parsedData = schema.parse(data); // Validate form data
  console.log(parsedData); // Handle the validated data
};
const handleMultiSelectChange = (
  name: string,
  selectedOptions: { value: string; label: string }[]
) => {
  const values = selectedOptions.map((option) => option.value);
  
  
};
const handleSelectChange = (
  selectedOption: { value: string; label: string } | null
) => {
  if (selectedOption) {
    console.log(selectedOption.value);
  }
};


type Inputs = z.infer<typeof schema>;

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


  function setValue(arg0: string, selectedOptions: { value: string; label: string; }[]) {
    throw new Error("Function not implemented.");
  }

  return (
    <form className="flex flex-col gap-8 h-[600px] p-7 overflow-y-auto scrollbar scrollbar-thumb-custom-green scrollbar-track-gray" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Teacher ID"
          name="teacherId"
          defaultValue={data?.teacherId}
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
      Teacher Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
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
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="w-full">
        <label className="text-xs text-gray-500">Classes</label>
        <ReactSelect
                  isMulti
                  name='classes'
                  options={listOptions}
                  className="basic-multi-select custom-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(
                      "classes",
                      selectedOptions as { value: string; label: string }[]
                    )
                  }
                />
                </div>
                <div className="w-full">
        <label className="text-xs text-gray-500">Sections</label>
        <ReactSelect
                  isMulti
                  name='sections'
                  options={listOptions}
                  className="basic-multi-select custom-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(
                      "sections",
                      selectedOptions as { value: string; label: string }[]
                    )
                  }
                />
                </div>
                <div className="w-full">
        <label className="text-xs text-gray-500">Subjects</label>
        <ReactSelect
                  isMulti
                  name='subjects'
                  options={listOptions}
                  className="basic-multi-select custom-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(
                      "subjects",
                      selectedOptions as { value: string; label: string }[]
                    )
                  }
                />
                </div>
                <div className="w-full">
      <label className="text-xs text-gray-500">Class Incharge</label>
      <Select
        options={listOptions}
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption as { value: string; label: string } | null)
        }
        placeholder="Select..."
        className="w-full"
      />
    </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
        
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-[#FAE27C] p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
