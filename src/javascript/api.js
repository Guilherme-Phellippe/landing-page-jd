const url = "https://jd.justdream.com.br/products";

export async function getProducts(){
    const resp = await axios.get(`${url}/offen`).catch(error => console.error(error))
    return resp
}