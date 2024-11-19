import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser, checkEmail } from "../../API/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { notify } from "../../util/toast";
function Register() {
  const { user, login } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

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
    const checkEmailExist = await checkEmail(data.email);
    if (checkEmailExist) {
      notify({ type: "error", msg: "ایمیل وارد شده تکراری است" ,timeAutoClose:3000});
      setError("root", {
        type: "server",
        message: "ایمیل وارد شده تکراری است",
      });
      setIsPending(false);
      return;
    }
    const res = await createNewUser(data);
    if (res) {
      login(res);
      notify({ type: "success", msg: "ثبت نام با موقیت انجام شد." ,timeAutoClose:2000});
      setTimeout(() => {
        setIsPending(false);
        navigate("/login", { replace: true });
      }, 3000);
      return;
    }
    notify({
      type: "error",
      msg: "مشکلی پیش امده لطفا اتصال اینترنت خود را بررسی کنید!",
    });
    setIsPending(false);
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      return navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen relative overflow-hidden">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain object-right-bottom"
          src={import.meta.env.BASE_URL + "assets/images/login.png"}
          alt=""
        />

        <div className="container mx-auto p-6 h-full flex items-center justify-center">
          <div className="wrapper mx-auto md:mr-auto lg:ml-20 bg-gradient-to-b from-sky-50/50 to-emerald-100/70 backdrop-blur-sm min-h-[25rem] border rounded-lg max-w-sm w-full">
            <div className="header py-5 px-4 flex items-center justify-center flex-col gap-4 border-b border-r-sky-50">
              <h2 className="font-bold text-2xl text-sky-700">
                برنامک وظایف من
              </h2>
              <p className="text-sm text-sky-600">ثبت نام خود را تکمیل کنید</p>
            </div>
            <form
              noValidate
              action=""
              className="px-4 py-3"
              onSubmit={handleSubmit(onsubmitHandler)}
            >
              <div className="form-control flex items-center rounded-2xl shadow-sm overflow-hidden mb-4">
                <label
                  htmlFor="first_name"
                  className="h-10 w-12 bg-sky-100 flex items-center justify-center"
                >
                  <FaRegUser className="text-lg text-sky-700" />
                </label>
                <input
                  type="text"
                  className="h-10 w-full outline-none border-none px-4 placeholder: text-sm placeholder:font-light font-semibold text-sky-700"
                  id="first_name"
                  placeholder="نام و نام خانوادگی"
                  {...register("fullName", {
                    required: " نام و نام خانوادگی الزامیست",
                    minLength: {
                      value: 4,
                      message: "حداقل 4 کاراکتر",
                    },
                  })}
                />
              </div>
              {errors.fullName?.message && (
                <div className="error text-pink-800 px-5 mb-4 text-[13px] bg-red-100 py-2 rounded-2xl">
                  {errors.fullName?.message}
                </div>
              )}

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
                  {isPending ? <span className="loader"></span> : "ثـبـت نـام"}
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
                <span className="text-xs">حساب کاربری دارید ؟ </span>
                <Link
                  to={"/login"}
                  className="text-sm text-blue-700 font-semibold"
                >
                  وارد شوید
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
