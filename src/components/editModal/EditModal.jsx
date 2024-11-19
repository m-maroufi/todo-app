import React from "react";
import { useForm } from "react-hook-form";
import { editTask } from "../../API/api";
import { useTasks } from "../../hooks/useTasks";
import { notify } from "../../util/toast";
const EditModal = ({ editModal, closeEditForm }) => {
  const { task, setChangeTask, setIsPendingTask, isPendingTask } = useTasks();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: editModal.task.title,
    },
  });
  const onSubmitEditForm = async (data) => {
    setIsPendingTask(true);
    const newData = { ...editModal.task, ...data };
    const res = await editTask(newData);
    setChangeTask(true);
    setIsPendingTask(false);
    notify({ type: "success", msg: "یادداشت با موفقیت ویرایش شد" ,timeAutoClose:1500});
    reset();
    closeEditForm();
  };
  return (
    <div
      className={`alert bg-gray-50/30 backdrop-blur-[3px] w-full h-full fixed top-0 left-0 flex items-center justify-center transition-all px-4 ${
        editModal?.isOpen
          ? "z-50 opacity-100 select-auto visible"
          : "-z-40 opacity-0 select-none invisible"
      }`}
    >
      <div className="alert-content bg-white border px-4 py-5 max-w-sm w-full text-center rounded-md shadow-sm">
        <h1 className="font-bold text-2xl mb-4">ویرایش تسک</h1>
        <form
          action=""
          className="w-full"
          onSubmit={handleSubmit(onSubmitEditForm)}
        >
          <div className="form-control w-full mb-4">
            <textarea
              name="title"
              id="task"
              className="w-full min-h-14 resize-y px-3 py-3 rounded-md border bg-gray-50 outline-none"
              //   defaultValue={editModal?.task?.title}
              {...register("title", {
                required: "عنوان یادداشت نمی تواند خالی باشد",
              })}
            ></textarea>
            <div className="error py-1 px-2 text-red-600 text-[13px]">
              {errors?.title?.message}
            </div>
            <div className="btn mt-4 flex items-center justify-around gap-4 mx-auto">
              <button
                type="submit"
                disabled={isPendingTask}
                className="px-6 py-3 bg-green-600 rounded-md text-white  shadow-md shadow-green-700/40 active:shadow-none flex items-center justify-center"
              >
                {!isPendingTask ? " ویرایش" : <span className="loader"></span>}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  closeEditForm();
                }}
                className="px-6 py-3 bg-gray-100 rounded-md text-gray-900  shadow-md shadow-gray-700/10 active:shadow-none"
              >
                انصراف
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
