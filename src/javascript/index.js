import { getProducts } from "./api.js";
import { transformArrayMySql } from "./global.js";


(async function init() {
    await createHalfListProductHome();
})();


async function createHalfListProductHome() {
    const { data } = await getProducts();
    if (data.length) {
        const container = document.querySelector('div.half-products');
        if (container) {

            let div_product = document.createElement('div');
            div_product.setAttribute('class', "content-half-product");
            for (let n = 0; n < 3; n++) {
                let div_img = document.createElement('div');
                let img_product = document.createElement('img');

                div_img.setAttribute('class', "box-half-product");
                img_product.src = transformArrayMySql(data[n].images)[0]

                div_img.appendChild(img_product)
                div_product.appendChild(div_img)
            }
            container.appendChild(div_product)

        }
    } else console.error("Not have products for show")
}