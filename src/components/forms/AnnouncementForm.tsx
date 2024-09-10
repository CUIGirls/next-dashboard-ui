"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "../InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const AnnouncementForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [formVisible, setFormVisible] = useState(true);
  const [imgUrl, setImgUrl] = useState<string>("");

  const handleUpload = () => {
    (window as any).cloudinary.openUploadWidget(
      {
        cloud_name: "dru9v8is5",
        upload_preset: "schoolportal",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: false,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setImgUrl(result.info.secure_url); 
          console.log(result.info.secure_url);
        }
      }
    );
  };

  const onSubmit = async (data: Inputs) => {
    if (!data.description && !imgUrl) {
      console.error("At least one of description or image must be provided");
      return;
    }

    const formData = {
      img: imgUrl,
      description: data.description || "",
    };
    // Send formData to your API later

    setFormVisible(false);
    reset();
  };

  return (
    formVisible ? (
        <form
          className="flex flex-col gap-6 max-w-lg mx-auto p-6 border border-gray-200 h-[500px] rounded-lg shadow-sm overflow-y-auto scrollbar scrollbar-thumb-custom-green scrollbar-track-gray"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-semibold mb-4">
            {type === "create" ? "Add an Announcement" : "Update Announcement"}
          </h1>
  
          {/* Image/Document Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Upload a document</label>
            <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={handleUpload}>
              <span className="text-gray-500 text-sm">
                {imgUrl ? "Change Image/Document" : "Upload a File"}
              </span>
            </div>
            {imgUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-700 mb-2">Selected Document:</p>
                <img src={imgUrl} alt="Uploaded document" className="max-w-full h-auto rounded-md shadow-md" />
              </div>
            )}
          </div>
  
          {/* Description Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Announcement</label>
            <textarea
              {...register("description")}
              defaultValue={data?.description}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Add your announcement here"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#FAE27C] p-3 rounded-md mt-4 hover:bg-green-600"
          >
            {type === "create" ? "Submit Form" : "Update"}
          </button>
        </form>
      ) : (
        <div>
          <h2>Form submitted successfully!</h2>
        </div>
      )
    );
  };

export default AnnouncementForm;
