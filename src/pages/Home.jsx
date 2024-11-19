import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { fetchTime, removeTaskById, markTask } from "../API/api";
import { BsClock } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import Tasks from "../components/tasks/Tasks";
import CreateTask from "../components/createTask/CreateTask";
import { notify } from "../util/toast";
import { useTasks } from "../hooks/useTasks";
import FilterTask from "../components/filter/FilterTask";
import Event from "../components/EventDay/Event";
import Holiday from "../components/Holiday/Holiday";
import EditModal from "../components/editModal/EditModal";
import EditUser from "../components/editModal/EditUser";
const intialAlertMsgState = {
  alertName: "",
  title: "",
  msg: "",
  isOpen: false,
  isOk: false,
  task: null,
};
const Home = ({}) => {
  const toggleMenuBtnRef = useRef(null);
  const { user, logout } = useAuth();
  const { tasks, setChangeTask, setTasks } = useTasks();
  const [filterTask, setFilterTask] = useState("uncompleted");
  const [search, setSearch] = useState("");
  const [alertMsg, setAlertMsg] = useState(intialAlertMsgState);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    task: null,
  });
  const [editUserModal, setEditUserModal] = useState({
    isOpen: false,
    user: user.user,
  });
  const [openToggleMenu, setOpenToggleMenu] = useState(false);
  const [date, setDate] = useState({
    year: null,
    month: null,
    day: null,
    weekday: null,
  });
  const [time, setTime] = useState(null);

    const handleClickOutside = (event) => {
      if (
        toggleMenuBtnRef.current &&
        !toggleMenuBtnRef.current.contains(event.target)
      ) {
        setOpenToggleMenu(false);
      }
    };

  const toggleMenuHandler = (event) => {
    setOpenToggleMenu(!openToggleMenu);
  };

  // edit task
  const editHandler = (task) => {
    if (task) {
      setEditModal({ task: task, isOpen: true });
    }
  };
  const closeEditForm = () => {
    setEditModal({ task: null, isOpen: false });
  };
  // edit task end

  // deleting task

  const deletedTaskHandler = (task) => {
    if (task) {
      setAlertMsg((prevState) => ({
        ...prevState,
        alertName: "del",
        title: "حذف یادداشت",
        isOpen: true,
        msg: "آیا میخواهید یادداشت  مورد نظر حذف شود ؟",
        task: task,
        isPending: false,
      }));
    }
  };

  const completedTaskHandler = (task) => {
    if (task) {
      setAlertMsg((prevState) => ({
        ...prevState,
        alertName: "mark",
        title: "تکمیل یادداشت",
        isOpen: true,
        msg: "افزودن یادداشت به انجام شدها ؟",
        task: task,
        isPending: false,
      }));
    }
  };

  const okAlert = async (task) => {
    setAlertMsg((prevState) => ({ ...prevState, isPending: true }));

    switch (alertMsg.alertName) {
      case "del":
        const resDal = await removeTaskById(task.id, user.user.id);
        if (resDal.id) {
          notify({ type: "success", msg: "یادداشت با موفقیت حذف شد ." });
          setChangeTask(true);
          setAlertMsg(intialAlertMsgState);
        }
        break;
      case "mark":
        const resMark = await markTask(task.id, user.user.id);
        if (resMark.id) {
          notify({ type: "info", msg: "یادداشت با موفقیت علامت گذاری شد ." });
          setChangeTask(true);
          setAlertMsg(intialAlertMsgState);
        }
        break;
      default:
        break;
    }
  };

  const closeAlert = () => {
    setAlertMsg(intialAlertMsgState);
  };

  const openEditUserModalHandler = () => {
    setEditUserModal({
      isOpen: true,
      user: user.user,
    });
  };

  // filtering
  const filterTasksHandler = (filter) => {
    setFilterTask(filter);
  };
  const searchHandler = (txt) => {
    setSearch(txt);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
      setTasks(filteredTasks);
    } else {
      setChangeTask(true);
    }
  }, [search]);

  useEffect(() => {
    const fetcherDataTime = async () => {
      const { date, time24 } = await fetchTime();

      setDate({
        year: date.year.number.fa,
        month: date.month.name,
        day: date.day.number.fa,
        weekday: date.weekday.name,
      });
      setTime(time24.full.fa);
    };
    fetcherDataTime();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="h-full w-full relative">
        <img
          className=" absolute top-0 left-0 w-full h-full opacity-95 z-10 object-cover"
          src={import.meta.env.BASE_URL + "assets/images/banner-1.webp "}
          alt=""
        />
        <header className="header fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto">
            <div className="h-14 backdrop-blur-sm bg-gray-100/80 rounded-b-2xl flex items-center justify-between p-4">
              <div className="left relative" ref={toggleMenuBtnRef}>
                <button
                  className="bg-gray-50 p-3 rounded-lg"
                  onClick={(e) => toggleMenuHandler(e)}
                >
                  <FaRegUser size={20} className="text-gray-400" />
                </button>
                <div
                  className={`toggleMenu  bg-gray-100/90 rounded-md absolute right-2 top-full w-60 min-h-fit mt-1 text-[13px] px-4 py-2 transition-transform origin-top-right duration-200 ${
                    openToggleMenu
                      ? "opacity-100 translate-y-0 select-none visible scale-100"
                      : "opacity-0 -translate-y-4 select-auto invisible scale-0"
                  } `}
                >
                  <div className=" text-gray-500 border-b py-2">
                    {`سلام ${user.user.fullName}`}
                  </div>
                  <div className="links mt-3 text-sm ">
                    <button
                      onClick={() => openEditUserModalHandler()}
                      className="text-gray-700 hover:text-white hover:bg-blue-600 flex items-center gap-2 w-full py-2 px-2 rounded-md transition-colors"
                    >
                      <LiaUserEditSolid size={20} />
                      <span>ویرایش اطلاعات</span>
                    </button>
                    <button
                      onClick={() => logout()}
                      className="text-gray-700 hover:text-white hover:bg-red-400 flex items-center gap-2 w-full py-2 px-2 rounded-md transition-colors"
                    >
                      <RiLogoutCircleLine size={20} />
                      <span>خروج</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="right flex items-center justify-center border gap-4">
                <button className=" flex items-center gap-2 text-gray-700 text-[14px] font-light py-2 px-2 rounded-md bg-white">
                  {date?.weekday ? (
                    <>
                      <span>{date.weekday}</span>
                      <span>{date.day}</span>
                      <span>{date.month}</span>
                      <span>{date.year}</span>
                    </>
                  ) : (
                    ""
                  )}
                </button>
                {/* <button className=" flex items-center text-gray-700 text-[14px] font-light py-2 px-2 rounded-md ">
								{time ? (
									<>
										<span>
											<BsClock size={20} />
										</span>
										<span className="w-[60px]">{time}</span>
									</>
								) : (
									""
								)}
							</button> */}
              </div>
            </div>
          </div>
        </header>
        <div className="banner min-h-screen relative">
          <div className="relative z-30 container mx-auto px-2 md:px-8 grid grid-cols-1 gap-5 lg:grid-cols-9">
            <div className="col-span-1 mt-16 lg:col-span-6">
              {/* create New Task */}
              <CreateTask />
              {/* create New Task */}
              <div className="mt-3 overflow-hidden">
                {/* fitler task component */}
                <FilterTask
                  fitlerTask={filterTask}
                  filterTasksHandler={filterTasksHandler}
                  search={search}
                  searchHandler={searchHandler}
                />
                {/* fitler task component */}

                {/* import tasks  */}
                <Tasks
                  deletedTaskHandler={deletedTaskHandler}
                  completedTaskHandler={completedTaskHandler}
                  filterTask={filterTask}
                  editHandler={editHandler}
                />
                {/* end  tasks section */}
              </div>
            </div>
            <div className="col-span-1 bg-gray-200/40 rounded-md mt-5 md:mt-16 h-fit lg:col-span-3">
              {/* <Event /> */}
              <Holiday />
            </div>
          </div>

          <div className="liner absolute bottom-0 right-0 left-0 bg-gradient-to-t from-slate-950/80 to-slate-50/5 w-full h-[50%] z-20"></div>
        </div>
      </div>

      {/* alert confirm  */}
      <div
        className={`alert bg-gray-50/30 backdrop-blur-[3px] w-full h-full fixed top-0 left-0 flex items-center justify-center transition-all px-4 ${
          alertMsg?.isOpen
            ? "z-50 opacity-100 select-auto visible"
            : "-z-40 opacity-0 select-none invisible"
        }`}
      >
        <div className="alert-content bg-white border px-4 py-5 max-w-sm w-full text-center rounded-md shadow-sm">
          <h1 className="font-bold text-2xl mb-4">{alertMsg?.title}</h1>
          <p className="mb-8">{alertMsg?.msg}</p>
          {alertMsg?.isPending ? (
            <>
              <div className="w-1/2 rounded-lg mx-auto flex items-center gap-4 justify-center bg-orange-400 px-3 py-2 text-white text-sm font-bold">
                <span>لطفا صبر کنید ...</span>
                <span className="loader"></span>
              </div>
            </>
          ) : (
            <div className="btns flex items-center justify-evenly">
              <button
                onClick={() => okAlert(alertMsg.task)}
                className="btn px-5 py-2 rounded-md bg-green-600 text-white shadow-sm shadow-green-600/50 active:shadow-none"
              >
                تائید
              </button>
              <button
                onClick={() => closeAlert()}
                className="btn border px-5 py-2 rounded-md "
              >
                انصراف
              </button>
            </div>
          )}
        </div>
      </div>
      {/* alert confirm  */}

      {editModal.isOpen && (
        <EditModal editModal={editModal} closeEditForm={closeEditForm} />
      )}

      {editUserModal.isOpen && (
        <EditUser
          editUserModal={editUserModal}
          setEditUserModal={setEditUserModal}
        />
      )}
    </>
  );
};

export default Home;
