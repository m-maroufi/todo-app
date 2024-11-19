import React from "react";
import { useForm } from "react-hook-form";
import { editUser } from "../../API/api";
import { replace, useNavigate } from "react-router-dom";
import { notify } from "../../util/toast";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTasks";
const EditUser = ({ editUserModal, setEditUserModal }) => {
  const { logout } = useAuth();
  const { isPendingTask, setIsPendingTask } = useTasks();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      fullName: editUserModal.user.fullName,
    },
  });
  const navigate = useNavigate();

  const onsubmitHandler = async (data) => {
    let newData;
    if (data.newPass.trim() !== "") {
      if (data.newPass.trim().length <= 5) {
        setError("newPass", {
          type: "validate",
          message: "کلمه عبور بیشتر از 5 کارکتر باید باشد",
        });
        return false;
      }
      newData = { ...editUserModal.user, ...data };
      setIsPendingTask(true);
      const res = await editUser(newData);
      if (res) {
        notify({ type: "success", msg: "طلاعات با موفقیت ویرایش شد" });
        setTimeout(() => {
          logout();
          navigate("/login", { replace: true });
          setEditUserModal({
            isOpen: false,
            user: null,
          });
          setIsPendingTask(false);
        }, 3000);
      }

      return;
    }
    delete data.newPass;
    newData = { ...editUserModal.user, ...data };
    setIsPendingTask(true);
    const res = await editUser(newData);

    if (res) {
      notify({
        type: "success",
        msg: "اطلاعات با موفقیت ویرایش شد",
        timeAutoClose: 1500,
      });
      setTimeout(() => {
        logout();
        navigate("/login", { replace: true });
        setEditUserModal({
          isOpen: false,
          user: null,
        });
        setIsPendingTask(false);
      }, 3000);
      return;
    }
  };

  return (
    <div
      className={`bg-slate-900/20 backdrop-blur-sm fixed top-0 left-0 p-6 flex items-center justify-center w-full h-full ${
        editUserModal.isOpen
          ? "z-50 opacity-100 visible self-auto"
          : "-z-40 invisible opacity-0 select-none "
      }`}
    >
      <div className="contentwrapper max-w-sm w-full p-5 bg-white rounded-md">
        <h1 className="mb-3 font-semibold text-xl text-center">
          ویرایش اطلاعات
        </h1>
        <p className="bg-red-50 text-red-500 font-bold text-sm px-2 rounded-sm py-2 text-center">
          پس از ویرایش اطلاعات فعلی به صفحه ورود هدایت میشوید تا اطلاعات جدید را
          وارد کنید
        </p>
        <hr className="mt-3" />
        <form
          action=""
          className="w-full mt-3 space-y-3"
          onSubmit={handleSubmit(onsubmitHandler)}
        >
          <div className="form-control ">
            <label htmlFor="fullName" className="text-sm ">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full h-10 border rounded-md bg-slate-50 outline-none px-3 focus:bg-white"
              {...register("fullName", {
                required: "نام و نام خانوادگی الزامیست",
                minLength: {
                  value: 4,
                  message: "نام و نام خانوادگی حداقل 4 کارکتر دارد.",
                },
              })}
            />
            {errors?.fullName?.message && (
              <div className="error my-1 text-sm text-red-600 px-3">
                {errors?.fullName?.message}
              </div>
            )}
          </div>
          <div className="form-control ">
            <label htmlFor="newPassword" className="text-sm ">
              کلمه عبور جدید
            </label>
            <input
              type="text"
              id="newPassword"
              className="w-full h-10 border rounded-md bg-slate-50 outline-none px-3 focus:bg-white"
              {...register("newPass")}
            />
            {errors?.newPass?.message && (
              <div className="error my-1 text-sm text-red-600 px-3">
                {errors?.newPass?.message}
              </div>
            )}
          </div>

          <div className="btn mt-4 flex items-center justify-around gap-4 mx-auto">
            <button
              type="submit"
              disabled={isPendingTask}
              className="px-6 py-3 bg-green-600 rounded-md text-white  shadow-md shadow-green-700/40 active:shadow-none flex items-center justify-center"
            >
              {!isPendingTask ? "تائید" : <span className="loader"></span>}
            </button>
            <button
              type="button"
              disabled={isPendingTask}
              onClick={() => {
                setEditUserModal({
                  isOpen: false,
                  user: null,
                });
                reset();
              }}
              className="px-6 py-3 bg-gray-100 rounded-md text-gray-900  shadow-md shadow-gray-700/10 active:shadow-none"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
