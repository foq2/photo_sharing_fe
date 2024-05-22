const api = "https://mjw7g2-8080.csb.app/api";

export async function get(url) {
  const res = await fetch(api + url, {
    method: "GET",
    headers: header(),
  });
  return await res.json();
}
export async function post(url, payload) {
  const res = await fetch(api + url, {
    method: "POST",
    headers: header(),
    body: JSON.stringify(payload),
  });
  return await res.json();
}
export async function postFile(url, payload) {
  const header = header();
  header.delete("Content-Type");
  const res = await fetch(api + url, {
    method: "POST",
    headers: header(),
    body: payload,
  });
  return await res.json();
}
function header() {
  let header = new Headers();
  header.set("Authorization", "Bearer " + localStorage.getItem("token"));
  header.set("Content-Type", "application/json");
  return header;
}
