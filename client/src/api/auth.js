const URL = "http://localhost:1234/api";

export async function registerRequest(user) {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Verificar si el estado de la respuesta no es exitoso
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors);
  }
  const data = await response.json();
  return data;
}

export async function loginRequest(user) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
  };
  const request = await fetch(URL + "/login", requestOptions);
  console.log("reques:", request);
  const response = await request.json();
  console.log("respuesta del servidor:", response);
  if (!request.ok) {
    throw new Error(response.errors);
  }
  return response;
}

export async function validateCredentials() {
  const request = await fetch(URL + "/verify", {
    method: "GET",
    credentials: "include", // Asegura que se envíen las cookies
  });
  const data = await request.json();
  if (!request.ok) {
    throw new Error(data.errors);
  }
  return data;
}
