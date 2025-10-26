import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(15),
});

type FormSubmission = z.infer<typeof formSchema>;

export default function Form() {
  const [apiError, setApiError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSubmission>({ resolver: zodResolver(formSchema) });
  const onSubmit = async (data: FormSubmission) => {
    if (apiError) setApiError(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const message = `Failed to submit form ${response.status}`;
      setApiError(message);
      throw new Error(message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center"
    >
      <div className="mb-2">
        <input
          {...register("name")}
          type="text"
          name="name"
          placeholder="Name"
          className="w-full h-10 px-3 text-base border-gray-400 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        />
        {errors.name && (
          <span className="text-xs text-red-700" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>
      <div className="mb-2">
        <input
          {...register("email")}
          type="text"
          name="email"
          placeholder="Email"
          className="w-full h-10 px-3 text-base border-gray-400 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        />
        {errors.email && (
          <span className="text-xs text-red-700" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="mb-2">
        <textarea
          {...register("message")}
          name="message"
          placeholder="Message"
          rows={3}
          className="w-full h-16 px-3 py-2 text-base border-gray-400 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        ></textarea>
        {errors.message && (
          <span className="text-xs text-red-700" role="alert">
            {errors.message.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        value={
          isSubmitting
            ? "Sending ..."
            : isSubmitSuccessful
            ? "Message sent ✅"
            : "Send message ✉️"
        }
        disabled={isSubmitting || isSubmitSuccessful}
        className={
          "self-center h-10 px-5 font-semibold text-white rounded-lg transition-colors " +
          (isSubmitting
            ? "bg-gray-500 cursor-progress"
            : isSubmitSuccessful
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black hover:bg-emerald-600 hover:cursor-pointer")
        }
      />
      {apiError && (
        <span className="self-center text-xs text-red-700" role="alert">
          Form submission failed, please try again!
        </span>
      )}
    </form>
  );
}
