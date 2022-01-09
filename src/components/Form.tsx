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
      <input
        {...register("name")}
        type="text"
        name="name"
        placeholder="Name"
        className="m-1 w-full h-10 px-3 mb-2 text-base border-gray-400 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
      <input
        {...register("email")}
        type="text"
        name="email"
        placeholder="Email"
        className="m-1 w-full h-10 px-3 mb-2 text-base border-gray-400 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
      <textarea
        {...register("message")}
        type="text"
        name="message"
        placeholder="Message"
        rows="3"
        className="m-1 w-full h-16 px-3 py-2 text-base border-gray-400 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
      ></textarea>
      <input
        type="submit"
        value="Send message ✉️"
        className="m-2 self-center h-10 px-5 font-semibold text-white transition-colors duration-150 bg-emerald-500 rounded-lg focus:shadow-outline hover:bg-emerald-600 hover:cursor-pointer"
      />
    </form>
  );
};

export default Form;
