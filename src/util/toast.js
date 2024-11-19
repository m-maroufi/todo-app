import { toast, Bounce } from "react-toastify";

export const notify = async ({ type, msg, timeAutoClose = 2000 }) => {
  switch (type) {
    case "success":
      return toast.success(msg, {
        position: "top-right",
        autoClose: timeAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    case "error":
      return toast.error(msg, {
        position: "top-right",
        autoClose: timeAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    case "warning":
      return toast.warn(msg, {
        position: "top-right",
        autoClose: timeAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    case "info":
      return toast.info(msg, {
        position: "top-right",
        autoClose: timeAutoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    default:
      break;
  }
};
export const getFullCurrentDate = async () => {
  const date = new Date().getTime();
  return date;
};
