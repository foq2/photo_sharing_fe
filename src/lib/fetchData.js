const api = "https://mjw7g2-8080.csb.app/api";

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
    headers: createHeader(),
    body: payload,
  });
  return await res.json();
}
function createHeader() {
  let createHeader = new Headers();
  createHeader.set("Authorization", "Bearer " + localStorage.getItem("token"));
  createHeader.set("Content-Type", "application/json");
  return createHeader;
}
