import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, checkEmail } from "../../API/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { notify } from "../../util/toast";
function Register(props) {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);

  const form = useForm();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = form;

  const onsubmitHandler = async (data) => {
    data.email = data.email.toLowerCase();
    setIsPending(true);
    const users = await getAllUsers();
    if (users) {
      const user = users.filter((item) => item.email === data.email);
      if (!user[0]) {
        setError("email", {
          type: "custom",
          message: "ایمیل وارد شده ثبت نام نشده است!",
        });
        setIsPending(false);
        return;
      }
      if (user[0].email === data.email) {
        if (user[0].password === data.password) {
          notify({
            type: "success",
            msg: "ورود موفقیت امیز بود",
            timeAutoClose: 2000,
          });
          setTimeout(() => {
            setIsPending(false);
            navigate("/home", { replace: true });
            login(user[0]);
          }, 3000);
          return;
        }
        setError("root", {
          type: "custom",
          message: "رمز عبور یا ایمیل وارد شده اشتباه است!",
        });
        setIsPending(false);
        return;
      }
      setError("root", {
        type: "custom",
        message: "رمز عبور یا ایمیل وارد شده اشتباه است!",
      });
      setIsPending(false);
      return;
    }
    notify({
      type: "error",
      msg: "مشکلی پیش امده لطفا اتصال اینترنت خود را بررسی کنید!",
    });
    setIsPending(false);
    return;
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      return navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="w-full h-screen relative overflow-hidden">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain object-right-bottom opacity-70"
          src={import.meta.env.BASE_URL + "assets/images/task.png"}
          alt=""
        />

        <div className="container mx-auto p-6 h-full flex items-center justify-center">
          <div className="wrapper lg:mr-56 bg-gradient-to-b from-sky-50/50 to-emerald-100/70 backdrop-blur-sm h-auto border rounded-lg max-w-sm w-full">
            <div className="header py-5 px-4 flex items-center justify-center flex-col gap-4 border-b border-r-sky-50">
              <h2 className="font-bold text-2xl text-sky-700">
                برنامک وظایف من
              </h2>
              <p className="text-sm text-sky-600">
                برای ورود به برنامک اطلاعات خود را وارد کنید
              </p>
            </div>
            <form
              noValidate
              action=""
              className="px-4 py-3"
              onSubmit={handleSubmit(onsubmitHandler)}
            >
              <div className="form-control flex items-center rounded-2xl shadow-sm overflow-hidden mb-4">
                <label
                  htmlFor="email"
                  className="h-10 w-12 bg-sky-100 flex items-center justify-center"
                >
                  <IoMailOutline className="text-lg text-sky-700" />
                </label>
                <input
                  type="text"
                  className="h-10 w-full outline-none border-none px-4 placeholder: text-sm placeholder:font-light font-semibold text-sky-700"
                  id="email"
                  placeholder="پست الکترونیکی"
                  {...register("email", {
                    required: "پست الکترونیکی الزامیست",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "ایمیل نامعتبر ، لطفا ایمیل صحیح وارد کنید",
                    },
                  })}
                />
              </div>
              {errors.email?.message && (
                <div className="error text-pink-800 px-5 mb-4 text-[13px] bg-red-100 py-2 rounded-2xl">
                  {errors.email?.message}
                </div>
              )}

              <div className="form-control flex items-center rounded-2xl shadow-sm overflow-hidden mb-4">
                <label
                  htmlFor="password"
                  className="h-10 w-12 bg-sky-100 flex items-center justify-center"
                >
                  <MdLockOutline className="text-lg text-sky-700" />
                </label>
                <input
                  type="password"
                  className="h-10 w-full outline-none border-none px-4 placeholder: text-sm placeholder:font-light font-semibold text-sky-700"
                  id="password"
                  placeholder="کلمه عبور"
                  {...register("password", {
                    required: " کلمه عبور الزامیست",
                    pattern: {
                      value: /^(?=.{6,}).*$/,
                      message: "کلمه عبور شامل حداقل 6 کارکتر باشد",
                    },
                  })}
                />
              </div>
              {errors.password?.message && (
                <div className="error text-pink-800 px-5 mb-4 text-[13px] bg-red-100 py-2 rounded-2xl">
                  {errors.password?.message}
                </div>
              )}

              <div className="form-control flex items-center mb-4 justify-center">
                <button
                  disabled={isPending}
                  className="bg-cyan-500 flex items-center justify-center px-8 py-3 rounded-3xl text-white font-bold disabled:bg-cyan-800/40"
                >
                  {isPending ? (
                    <span className="loader"></span>
                  ) : (
                    "ورود به برنامک"
                  )}
                </button>
              </div>
              {errors.root?.message && (
                <div className="error text-pink-800 px-5 mb-4 text-[13px] bg-red-100 py-2 rounded-2xl">
                  {errors.root?.message}
                </div>
              )}
            </form>
            {/* set up the dev tool */}
            <div className="header py-5 px-4 flex items-center gap-4 border-t border-r-sky-50">
              <p>
                <span className="text-xs">حساب کاربری ندارید ؟ </span>
                <Link
                  to={"/register"}
                  className="text-sm text-blue-700 font-semibold"
                >
                  ثبت نام کنید
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <DevTool control={control} /> */}
    </>
  );
}

export default Register;
