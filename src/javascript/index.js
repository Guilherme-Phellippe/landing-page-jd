import { getProducts } from "./api.js";
import { transformArrayMySql } from "./global.js";


(async function init() {
    await createHalfListProductHome();
    scrollingTwoPage();
    redirectForTopPage();
    fillListProductsOffen();
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

function scrollingTwoPage(){
    const page1 = document.querySelector(".container-page-one");
    const page2 = document.querySelector(".container-page-two");

    page1.addEventListener("wheel" , (e)=>{
        goPage2();
    })
    
    function goPage2(){
        
        const contentText = document.querySelector("div.content-text")
        const contentImage = document.querySelector("div.content-image")

        contentText.classList.add("scroll")
        contentImage.classList.add("scroll")


        setTimeout(() => {
            page2.scrollIntoView({behavior:"smooth"});
            contentText.classList.remove("scroll")
            contentImage.classList.remove("scroll")
            contentText.querySelector(".half-products").style.display = "none"
        }, 1000);
    }
}

function redirectForTopPage(){
    const contentText = document.querySelector("div.content-text")
    const page1 = document.querySelector(".container-page-one");
    const button  = document.querySelector("button#top-page");

    button.addEventListener("click" , () => {
        contentText.querySelector(".half-products").style.display = "block"
        page1.scrollIntoView({behavior:"smooth"})
    })
}


async function fillListProductsOffen(){
    const { data } = await getProducts();
    if (data.length) {
        const container = document.querySelector('div.content-all-products');
        if (container) {
            let div_product = document.createElement('div');
            div_product.setAttribute('class', "content-product");
            for (let n = 0; n < data.length; n++) {
                let div_img = document.createElement('div');
                let img_product = document.createElement('img');

                div_img.setAttribute('class', "box-product");
                img_product.src = transformArrayMySql(data[n].images)[0]

                div_img.appendChild(img_product)
                div_product.appendChild(div_img)
            }
            container.appendChild(div_product)

        }
    } else console.error("Not have products for show")
}