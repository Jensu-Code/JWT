const URL = "http://localhost:1234/api/task";

export const createTask = async (task) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(task),
    credentials: "include",
  };
  const response = await fetch(URL, requestOptions);
  const data = await response.json();
  return data;
};

export const updateTask = async (id, task) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(task),
    credentials: "include",
  };
  const response = await fetch(URL+`/${id}`, requestOptions);
  const data = await response.json();
  return data;
};

export const getAllTask = async () => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(URL, requestOptions);
  const data = await response.json();
  return data;
};

export const deleteTask = async (id) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    credentials: "include",
  };
  const response = await fetch(URL + `/${id}`, requestOptions);
  return response;
};

export const getTask = async (id) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(URL + `/${id}`, requestOptions);
  const data = response.json();
  return data;
};
