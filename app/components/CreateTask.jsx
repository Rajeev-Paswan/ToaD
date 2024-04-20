import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function CreateTaskModal({ onClose }) {
  const { currentUser } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();

  const userId = currentUser._id;

  const submitHandler = async (data) => {
    try {
      const newTask = { ...data, userId }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
          // credentials: 'include',
        }
      );

      // const responseData = await response.json();

      if (response.ok) {
        toast.success("Created task successfully");
        onClose()
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err)
      toast.error("Can't connect to server!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg z-10">
        <div className="flex mb-4 justify-between">
          <h2 className="text-xl font-bold text-center">Create Task</h2>
          <button className=" bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
        {/* Task creation form goes here */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-white text-black border rounded-xl p-6 flex flex-col w-[28rem]"
        >
          {/* <p className="font-medium text-2xl text-center mb-6">Sign In</p> */}
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            autoComplete="off"
            className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-4"
          />
          <input
            {...register("description", { required: true })}
            type="text"
            placeholder="Description"
            autoComplete="off"
            className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-4"
          />
          <select
            {...register("status")}
            name="status"
            id="todoStatus" className="bg-black/10 px-4 py-1.5 mb-4">
            <option value="todo">Todo</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
          <button
            type="submit"
            // disabled={loading}
            className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b]"
          >
            {"Create"}
          </button>
        </form>
        {/* Task creation form goes here */}
      </div>
    </div>
  );
}
