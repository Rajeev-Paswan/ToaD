import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import useTaskStore from "../../store/taskStore";

export default function EditTaskModal({ onClose, task }) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const loading = useTaskStore((state) => state.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const submitHandler = async (data) => {
    try {
      await updateTask(task._id, data, task.status);
      toast.success("Task updated successfully");
      onClose();
    } catch (err) {
      console.error("Error in EditTaskModal:", err);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-zinc-900 p-3 rounded-md shadow-lg z-10 text-sm">
        <div className="flex mb-4 items-center justify-between">
          <h2 className="text-lg text-center">Edit Task</h2>
          <button
            className="bg-zinc-800 text-lg text-white p-1 text-center rounded-full hover:bg-zinc-700"
            onClick={onClose}
          >
            <IoIosClose />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-zinc-800 rounded p-4 max-sm:p-2 flex flex-col w-[24rem] max-md:w-[80vw]"
        >
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Title"
            autoComplete="off"
            className="px-4 py-2 w-full bg-black/10 outline-none rounded mb-4"
          />
          {errors.title && (
            <p className="text-red-500 mb-2">{errors.title.message}</p>
          )}
          <input
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            placeholder="Description"
            autoComplete="off"
            className="px-4 py-2 w-full bg-black/10 outline-none rounded mb-4"
          />
          {errors.description && (
            <p className="text-red-500 mb-2">{errors.description.message}</p>
          )}
          <select
            {...register("status")}
            className="bg-black/10 px-4 py-1.5 mb-4 rounded"
          >
            <option value="todo">Todo</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b]"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
