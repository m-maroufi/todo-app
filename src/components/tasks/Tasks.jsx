import React, { useEffect } from "react";
import TaskBox from "./TaskBox";
import { useTasks } from "../../hooks/useTasks";

const Tasks = ({
  deletedTaskHandler,
  completedTaskHandler,
  filterTask,
  editHandler,
}) => {
  const { tasks } = useTasks();

  if (tasks?.length <= 0) {
    return (
      <div className="flex items-center justify-center bg-slate-50/70 mt-4 rounded-md max-w-fit px-3 py-2 mx-auto">
        <h1 className="text-2xl py-3 font-bold ">یادداشتی وجود ندارد.</h1>
      </div>
    );
  }
  return (
    <div className="wrapper grid lg:grid-cols-2 gap-3 px-3 py-4 max-h-[500px] lg:max-h-[calc(100vh-48vh)] overflow-y-auto">
      {tasks?.map((item, index) => {
        if (filterTask == "All") {
          return (
            <TaskBox
              key={item.id}
              task={item}
              deletedTaskHandler={deletedTaskHandler}
              completedTaskHandler={completedTaskHandler}
              editHandler={editHandler}
            />
          );
        } else if (item.tag == filterTask) {
            return (
              <TaskBox
                key={item.id}
                task={item}
                deletedTaskHandler={deletedTaskHandler}
                completedTaskHandler={completedTaskHandler}
                editHandler={editHandler}
              />
            );
        }
      })}
      {/* <div className="box w-full flex flex-col-reverse gap-4 bg-[#F0D1A8] min-h-max rounded-md p-4">
        <div className="icons flex items-center justify-end  gap-2 border-t pt-1">
          <button className="ml-auto flex items-center justify-center text-[13px] text-gray-600 font-semibold">
            تاریخ شروع :
            <span className=" align-middle px-2 block mt-1">1402/02/22</span>
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
        <div className="w-full">
          <p className="text-[15px] font-bold text-gray-700">
            یک جلسه مهم با آقای احمدی مدیرعامل شرکت جبلوت
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Tasks;
