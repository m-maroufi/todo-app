import axios from "axios";
import React, { useEffect, useState } from "react";

const Holiday = () => {
  const [lastRunDate, setLastRunDate] = useState(new Date().toDateString());
  const [events, setEvents] = useState();

  const eventFetcher = async () => {
    // دریافت تاریخ امروز
    const today = new Date();

    // فرمت تاریخ به صورت YYYY/MM/DD
    const formattedDate =
      today.getFullYear() +
      "/" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(today.getDate()).padStart(2, "0");

    axios
      .get(`https://holidayapi.ir/gregorian/${formattedDate}`)
      .then((res) => setEvents(res.data.events));
  };
  useEffect(() => {
    const checkDate = () => {
      const currentDate = new Date().toDateString();
      if (currentDate !== lastRunDate) {
        eventFetcher();
        setLastRunDate(currentDate);
      }
    };
    const intervalId = setInterval(checkDate, 1000 * 60 * 60); // هر ساعت چک می‌کند
    return () => clearInterval(intervalId);
  }, [lastRunDate]);

  useEffect(() => {
    eventFetcher();
  }, []);

  return (
    <>
      <div className="px-2 py-4 bg-white/80 rounded-md">
        <h2 className="font-medium text-md px-2 text-slate-900">
          رویداد های امروز ایران و جهان{" "}
        </h2>
        <ul className="bg-transparent mt-2 px-8 space-y-3">
          {events?.length <= 0 ? (
            <>
              <h3 className="text-[12px] font-normal">
                برای امروز رویدادی وجود ندارد
              </h3>
            </>
          ) : (
            events?.map((event, index) => {
              return (
                <li
                  className={`bg-white/90 py-2 px-3 rounded-md shadow-md`}
                  key={index}
                >
                  <h3 className="flex items-center gap-2 text-sm font-bold">
                    <span
                      className={`w-3 h-3 rounded-full inline-block pr-3 ${
                        event.is_holiday ? " bg-red-400" : "bg-blue-500"
                      }`}
                    ></span>
                    <span
                      className={`${event.is_holiday ? "text-red-600" : ""}`}
                    >
                      {event.description}
                    </span>
                  </h3>
                  {event.additional_description && (
                    <p className="py-2 text-[12px] font-light px-5">
                      {event.additional_description}
                    </p>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default Holiday;
