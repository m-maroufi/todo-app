import React, { useState } from "react";

const FilterTask = ({
  fitlerTask,
  filterTasksHandler,
  search,
  searchHandler,
}) => {
  const [optFitler, setOptFilter] = useState([
    { id: 1, name: "All", text: "همه یادداشت ها" },
    { id: 2, name: "completed", text: "انجام شده" },
    { id: 3, name: "uncompleted", text: "انجام نشده" },
  ]);
  return (
    <div className="filter flex items-center justify-between py-2 px-8 bg-gray-200/80 gap-4 rounded-[10px] w-full flex-wrap">
      <input
        type="text"
        placeholder="جستوجو کن ... "
        onChange={(e) => searchHandler(e.target.value)}
        className="h-12 border-none outline-none rounded-md px-4 py-2 block  shadow-md flex-grow flex-auto"
      />
      <div className="">
        <select
          name="filter"
          //   defaultValue={"Incompleted"}
          value={fitlerTask}
          onChange={(e) => filterTasksHandler(e.target.value)}
          className="h-12 border-none outline-none rounded-md px-4 py-2 block shadow-md  bg-white w-fit"
        >
          {optFitler?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {" "}
                {item.text}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterTask;
