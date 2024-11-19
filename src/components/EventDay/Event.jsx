import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm, Controller } from "react-hook-form";
import { data } from "autoprefixer";
const Event = () => {
  const [submittedDate, setSubmittedDate] = useState();
  const {
    register,
    reset,
    setError,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmitHandler = (data) => {
    const date = data.date.toDate().getTime();
    const dataEvent = {
      date: date,
      title: data.title,
    };
    console.log(dataEvent);
  };
  return (
    <>
      <div className=" rounded-md overflow-hidden">
        <div className="flex flex-col gap-4 p-4 bg-gray-100">
          <h2>رویداد های مهمت رو بنویس تا بهت یاداوری کنم</h2>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input
              type="text"
              className="px-3 py-2 h-10 rounded-md outline-none border w-full"
              placeholder="عنوان رویداد - مثلا : تولد پدر"
              {...register("title", {
                required: "عنوان رویداد الزامیست.",
              })}
            />
            <div>
              {errors && errors?.title?.message && (
                //if you want to show an error message
                <span className="error text-[12px] py-1 px-1 text-red-400">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* className="" */}
            <div className="flex gap-2 mt-2">
              <Controller
                control={control}
                name="date"
                rules={{ required: true }} //optional
                render={({
                  field: { onChange, name, value },
                  fieldState: { invalid, isDirty }, //optional
                  formState: { errors }, //optional, but necessary if you want to show an error message
                }) => (
                  <>
                    <DatePicker
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      //   format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      render={<CustomInputDatePiker />}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                    />
                  </>
                )}
              />

              {/* <DatePicker
                render={<CustomInputDatePiker />}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              /> */}
              <button className="bg-blue-600 text-nowrap  text-white px-3 py-2 h-10 rounded-md">
                ثبت رویداد
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4">
        <ul className=" space-y-3 overflow-y-auto max-h-[calc(100vh-44vh)] h-fit">
          <li className="px-2 py-3 bg-green-50 odd:bg-green-50/90 rounded-md">
            <h4 className="font-bold py-2 text-pretty text-green-600">
              تولد مهدی معروفی
            </h4>
            <div className="icons flex items-center justify-end  gap-2 border-t pt-1">
              <button className="ml-auto flex items-center justify-center text-[13px] text-gray-600 font-semibold">
                تاریخ رویداد :
                <span className=" align-middle px-2 block mt-1">
                  1402/02/22
                </span>
              </button>

              <button className="h-8 w-8  flex items-center justify-center group">
                <IoMdCheckmarkCircleOutline
                  size={24}
                  className="text-gray-700 group-hover:text-green-500"
                />
              </button>
              <button className="h-8 w-8  flex items-center justify-center group">
                <BsTrash
                  size={24}
                  className="text-gray-700 group-hover:text-red-500"
                />
              </button>
              <button className="h-8 w-8  flex items-center justify-center group">
                <TbEdit
                  size={24}
                  className="text-gray-700 group-hover:text-yellow-500"
                />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Event;

export function CustomInputDatePiker({ onFocus, value, onChange }) {
  return (
    <input
      className="px-3 py-2 h-10 rounded-md outline-none border w-full bg-white placeholder:text-[14px]"
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      placeholder="تاریخ رویداد- مانند 1402/02/22"
    />
  );
}
