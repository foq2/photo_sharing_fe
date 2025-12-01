const api = "http://localhost:8080/api";

export async function get(url) {
  const res = await fetch(api + url, {
    method: "GET",
    headers: createHeader(),
  });
  return await res.json();
}

export async function post(url, payload) {
  const res = await fetch(api + url, {
    method: "POST",
    headers: createHeader(),
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function postFile(url, payload) {
  const header = createHeader();
  header.delete("Content-Type");
  const res = await fetch(api + url, {
    method: "POST",
    headers: header,
    body: payload,
  });
  return await res.json();
}

function createHeader() {
  let Header = new Headers();
  Header.set("Authorization", "Bearer " + localStorage.getItem("token"));
  Header.set("Content-Type", "application/json");
  return Header;
}
