import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center"
    >
      <div className="mb-2">
        <input
          {...register("name", {
            required: "Name required",
          })}
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
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
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
          {...register("message", {
            required: "Message required",
            minLength: {
              value: 20,
              message: "Message too short",
            },
          })}
          type="text"
          name="message"
          placeholder="Message"
          rows="3"
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
        value="Send message ✉️"
        className="self-center h-10 px-5 font-semibold text-white transition-colors duration-150 bg-emerald-500 rounded-lg focus:shadow-outline hover:bg-emerald-600 hover:cursor-pointer"
      />
    </form>
  );
};

export default Form;
