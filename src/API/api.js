import axios from "axios";
import { getFullCurrentDate, notify } from "../util/toast";
import { data } from "autoprefixer";
const BASE_API = `https://67287e50270bd0b97555b5c6.mockapi.io/api/v1`;

// axios.interceptors.request.use((config) => {
//   config.metadata = { startTime: new Date() };
//   return config;
// });

// axios.interceptors.response.use((response) => {
//   const duration = new Date() - response.config.metadata.startTime;
//   console.log(`Request Duration: ${duration} ms`);
//   return response;
// });
const fetcher = axios.create({
  baseURL: BASE_API,
  headers: { "content-type": "application/json" },
});

export const checkEmail = async (email) => {
  try {
    const res = await fetcher.get("users/");
    if (res.status == 200) {
      if (res.data.length > 0) {
        const user = res.data.find((user) => user.email === email);
        if (user) {
          return true;
        }
        return false;
      }
      return false;
    }
    // throw new Error("خطای شبکه");
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = async (data) => {
  try {
    const response = await fetcher.post("/users", data);
    if (response.status == 201) {
      return response.data;
    } else {
      notify({ type: "error", msg: "خطایی در ثبت اطلاعات رخ داد" });
      throw new Error("خطای ثبت اطلاعات");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await fetcher.get("users");
    if (res.status == 200) {
      return res.data;
    }
    throw new Error("خطای شبکه");
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (user) => {
  try {
    const response = await fetcher.put(`/users/${user.id}`, {
      password: user.newPass,
      fullName: user.fullName,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      notify({ type: "error", msg: "خطایی در ویرایش اطلاعات رخ داد" });
      throw new Error("خطای ویرایش اطلاعات");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchTime = async () => {
  try {
    const response = await axios.get("https://api.keybit.ir/time/");
    return response.data;
  } catch (error) {
    console.error("Error fetching time:", error);
  }
};

// tasks

export const createNewTask = async (data, userId) => {
  data.tag = "uncompleted";
  const date = await getFullCurrentDate();
  data.createdAt = date;

  try {
    const response = await fetcher.post(`/users/${userId}/tasks`, data);
    if (response.status == 201) {
      return response.data;
    } else {
      notify({ type: "error", msg: "خطایی در ثبت اطلاعات رخ داد" });
      throw new Error("خطای ثبت اطلاعات");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllTasks = async (userId) => {
  try {
    const params = new URLSearchParams();
    // params.append("sortby", "id");
    // params.append("orderby", "createdAt");
    // console.log(params);

    const res = await fetcher.get(
      `/users/${userId}/tasks?order=desc&sortby=tag`
    );
    if (!res) {
       return [];
       
    }
    if (res.status == 404) {
      return [];
    }else{
      return res.data
    }

  } catch (error) {
    // console.log(error.message);
  }
};

export const removeTaskById = async (taskId, userId) => {
  try {
    const response = await fetcher.delete(`/users/${userId}/tasks/${taskId}`);
    // console.log(response);

    if (response.status == 200) {
      return response.data;
    } else {
      notify({ type: "error", msg: "خطایی در حذف اطلاعات رخ داد" });
      throw new Error("خطای حذف اطلاعات");
    }
  } catch (error) {
    // console.log(error.message);
  }
};

export const markTask = async (taskId, userId) => {
  try {
    const response = await fetcher.put(`/users/${userId}/tasks/${taskId}`, {
      tag: "completed",
    });
    // console.log(response);

    if (response.status == 200) {
      return response.data;
    } else {
      notify({ type: "error", msg: "خطایی در حذف اطلاعات رخ داد" });
      throw new Error("خطای حذف اطلاعات");
    }
  } catch (error) {
    // console.log(error.message);
  }
};

export const editTask = async (task) => {
  try {
    const response = await fetcher.put(
      `/users/${task.userId}/tasks/${task.id}`,
      {
        title: task.title,
      }
    );
    // console.log(response);

    if (response.status == 200) {
      return response.data;
    } else {
      notify({ type: "error", msg: "خطایی در حذف اطلاعات رخ داد" });
      throw new Error("خطای حذف اطلاعات");
    }
  } catch (error) {
    // console.log(error.message);
  }
};
