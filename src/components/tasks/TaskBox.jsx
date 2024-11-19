import React from "react";
import { BsTrash } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { dateConvertor } from "../../util/dateConvertor";

const TaskBox = ({
  task,
  deletedTaskHandler,
  completedTaskHandler,
  editHandler,
}) => {
  return (
    <div
      className={`box w-full flex flex-col-reverse gap-4 bg-[#F0D1A8] min-h-max rounded-md p-4
         ${task.tag == "completed" ? "bg-green-100 scale-[.9]" : ""}`}
    >
      <div className="icons flex items-center justify-end  gap-2 border-t pt-1">
        <button className="ml-auto flex items-center justify-center text-[13px] text-gray-600 font-semibold">
          تاریخ شروع :
          <span className=" align-middle px-2 block mt-1">
            {dateConvertor(task.createdAt).shamsi_fa}
          </span>
        </button>

        {task.tag == "completed" ? (
          <></>
        ) : (
          <button
            onClick={() => completedTaskHandler(task)}
            className="h-8 w-8  flex items-center justify-center group"
          >
            <IoMdCheckmarkCircleOutline
              size={24}
              className={`text-gray-700 group-hover:text-green-500 ${
                task.tag == "completed" ? "text-green-600" : ""
              }`}
            />
          </button>
        )}
        <button
          onClick={() => deletedTaskHandler(task)}
          className="h-8 w-8  flex items-center justify-center group"
        >
          <BsTrash
            size={24}
            className="text-gray-700 group-hover:text-red-500"
          />
        </button>
        {task.tag == "completed" ? (
          <></>
        ) : (
          <button
            onClick={() => editHandler(task)}
            className="h-8 w-8  flex items-center justify-center group"
          >
            <TbEdit
              size={24}
              className="text-gray-700 group-hover:text-yellow-500"
            />
          </button>
        )}
      </div>
      <div className="w-full">
        <p className="text-[15px] font-bold text-gray-700">{task?.title}</p>
      </div>
    </div>
  );
};

export default TaskBox;
