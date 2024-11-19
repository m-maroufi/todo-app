import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { createNewTask, getAllTasks } from "../../API/api";
import { notify } from "../../util/toast";
import { useTasks } from "../../hooks/useTasks";

const CreateTask = () => {
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuth();
  const { tasks, setTasks } = useTasks();
  const {
    register,
    setError,
    getFieldState,
    watch,
    trigger,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setIsPending(true);
    const res = await createNewTask(data, user.user.id);
    if (res?.id) {
      notify({
        type: "success",
        msg: "یادداشت جدید افزوده شد .",
        timeAutoClose: 2000,
      });
      const newtasksList = await getAllTasks(user.user.id);
      setTasks(newtasksList);
      reset();
      setIsPending(false);
      return;
    }
    notify({
      type: "error",
      msg: "مشکلی در ایجاد یادداشت جدید به وجود آمد",
      timeAutoClose: 3000,
    });
    setError("task", {
      type: "validate",
      message: "متاسفم :( ، ایجاد یادداشت جدید با خطا مواجهه شد.",
    });
    setIsPending(false);
  };

  return (
    <div className="flex py-6 px-8 bg-gray-200/80 flex-col gap-2 rounded-[20px] items-center justify-center w-full">
      <h2 className="font-bold text-xl text-[#63605F]">
        {" "}
        کار جدیدی داری برای انجام دادن ؟
      </h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full flex items-center justify-center gap-4 flex-wrap md:flex-nowrap"
      >
        <textarea
          name="title"
          id="title"
          placeholder="کارتو  اینجا بنویس و ثبتش کن ..."
          className="min-h-14 border-none outline-none rounded-md px-4 py-2 block w-full shadow-md resize-y"
          {...register("title", {
            required: "لطفا ابتدا یادداشتی وارد کنید سپس روی ایجاد کلیک کنید .",
          })}
        ></textarea>

        <button
          disabled={isPending}
          className={`text-nowrap bg-blue-600 shadow-md active:shadow-none active:scale-95 text-white py-2 px-4 h-12 rounded-md flex-grow md:flex-grow-0 disabled:bg-blue-600/60`}
        >
          {isPending ? <span className="loader"></span> : "ایجاد یادداشت"}
        </button>
      </form>
      {errors?.task && (
        <div className="text-red-500 bg-red-50 w-full py-1 px-1 rounded-md text-sm">
          {errors.task?.message}
        </div>
      )}
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default CreateTask;
