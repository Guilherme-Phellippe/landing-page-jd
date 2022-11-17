import { getProducts } from "./api.js";
import { formatTextLong, transformArrayMySql } from "./global.js";


const global = {};


(async function init() {
    await createHalfListProductHome();
    scrollingTwoPage();
    redirectForTopPage();
    fillListProductsOffen();
    giveGift();
    saveCupom();
    showListProducts();
    redirectForProductPage();
    scrollProducts();
    openMobileMenu();
})();


async function createHalfListProductHome() {
    const products = await getProducts();
    global.products = products;

    if (products.data.length) {
        const container = document.querySelector('div.half-products');
        if (container) {

            let div_product = document.createElement('div');
            div_product.setAttribute('class', "content-half-product");

            const newProduct = products.data.filter(ob => { return ob.price <= 9.99 })

            for (let n = 0; n < 3; n++) {
                if (newProduct[n]) {
                    let div_img = document.createElement('div');
                    let img_product = document.createElement('img');

                    div_img.setAttribute('class', "box-half-product");
                    img_product.src = transformArrayMySql(newProduct[n].images)[0]

                    div_img.appendChild(img_product)
                    div_product.appendChild(div_img)
                }
            }
            container.appendChild(div_product)

        }
    } else console.error("Not have products for show")
}

function scrollingTwoPage() {
    const page1 = document.querySelector(".container-page-one");
    const page2 = document.querySelector(".container-page-two");
    const header = document.querySelector(".container-page-one header");

    page1.addEventListener("wheel", goPage2)

    function goPage2() {
        header.classList.add("fixed")

        const contentText = document.querySelector("div.content-text")
        const contentImage = document.querySelector("div.content-image")

        contentText.classList.add("scroll")
        contentImage.classList.add("scroll")


        setTimeout(() => {
            page2.scrollIntoView({ behavior: "smooth" });
            contentText.classList.remove("scroll")
            contentImage.classList.remove("scroll")
        }, 600);
    }
}

function redirectForTopPage() {
    const contentText = document.querySelector("div.content-text")
    const page1 = document.querySelector(".container-page-one");
    const button = document.querySelector("button#top-page");
    const header = document.querySelector(".container-page-one header");

    button.addEventListener("click", () => {
        header.classList.remove("fixed")
        contentText.querySelector(".half-products").style.display = "block"
        page1.scrollIntoView({ behavior: "smooth" })
    })
}

async function fillListProductsOffen() {
    const products = global.products ?? await getProducts();

    if (products.data.length) {
        const container = document.querySelector('div.content-all-products');
        if (container) {
            const contentProduct = document.createElement("div");
            const buttonLeft = document.createElement("button");
            const buttonRight = document.createElement("button");

            const newProduct = products.data.filter(ob => {
                return ob.price <= 9.99
            });

            buttonLeft.setAttribute("class", "button-left")
            contentProduct.setAttribute("class", "box-all-products");
            buttonRight.setAttribute("class", "button-right")

            buttonLeft.innerHTML = '<i class="fa-sharp fa-solid fa-caret-left"></i>'
            buttonRight.innerHTML = '<i class="fa-solid fa-caret-right"></i>'


            for (let product of newProduct) {
                let div_product = document.createElement('div');
                let div_img = document.createElement('div');
                let img_product = document.createElement('img');
                let black_just = document.createElement("p");
                let black_just2 = document.createElement("p");
                let h2 = document.createElement("h2");
                let h3_old_price = document.createElement("h3");
                let h3_new_price = document.createElement("h3");

                div_product.setAttribute('class', "box-product");
                div_product.setAttribute('id', product.id);

                div_img.setAttribute('class', "box-img");
                black_just.setAttribute("class", "black-just-text")
                black_just2.setAttribute("class", "black-just-text two")
                h3_old_price.setAttribute('class', "old-price")


                img_product.src = transformArrayMySql(product.images)[0];
                black_just.textContent = "É Black Friday Just"
                black_just2.textContent = "É Black Friday"
                h2.textContent = formatTextLong(product.name_product, 25)
                h3_old_price.textContent = "de R$" + product.old_price.toFixed(2).replace(".", ",")
                h3_new_price.textContent = "por apenas R$" + product.price.toFixed(2).replace(".", ",")


                div_img.appendChild(img_product)
                div_product.appendChild(div_img)
                div_product.appendChild(black_just)
                div_product.appendChild(black_just2)
                div_product.appendChild(h3_old_price)
                div_product.appendChild(h3_new_price)
                div_product.appendChild(h2)
                contentProduct.appendChild(div_product);
            }
            container.appendChild(buttonLeft)
            container.appendChild(contentProduct);
            container.appendChild(buttonRight)

        }
    } else console.error("Not have products for show")
}


function giveGift() {
    const gifts = document.querySelectorAll("div.box-gift");
    const modal = document.querySelector("section.gifts .modal-gift")
    const hasGift = localStorage.getItem("__connectiongift");

    if (!hasGift) {
        gifts.forEach(gift => gift.addEventListener("click", () => {
            localStorage.setItem("__connectiongift", gift.id)
            gift.classList.add('active')
            setTimeout(() => {
                gift.classList.add('boom')
                setTimeout(() => {
                    modal.style.display = "flex"
                }, 300)
            }, 1500);
        }))
    } else {
        gifts.forEach(g => {
            g.style.opacity = .3
            g.style.cursor = "not-allowed"
        })

        gifts[hasGift].style.opacity = 1
        gifts[hasGift].style.cursor = "pointer"
        gifts[hasGift].addEventListener("click", () => modal.style.display = "flex");
        gifts[hasGift].querySelector(".body-gift h3").textContent = "Presente já aberto!"
        gifts[hasGift].querySelector(".head-gift").style.transform = "rotate(-30deg) translate(-30px, -10px)"
    }
}

function saveCupom() {
    const button = document.querySelector("button#btn-copy");
    const cpm = localStorage.getItem("__cpm");

    if (!cpm) {
        button.addEventListener("click", () => {
            button.textContent = "Copiado!"
            localStorage.setItem("__cpm", JSON.stringify(["win50", 0]))
        })
    } else {
        button.textContent = "Copiado!"
    }

}

function showListProducts() {
    const button = document.querySelector("button#show-list");
    const ball = document.querySelector("div.content-img .ball")

    button.addEventListener("click", () => {
        const cpm = localStorage.getItem("__cpm");

        if (!cpm) {
            alert("Você ainda não pegou seu cupom!")
        } else {
            const container = ball.querySelector(".products-ball-list")
            ball.classList.add("active")
            showListProducts();

            if (container) {

                container.style.display = "flex"

                const newProduct = global.products.data.filter(ob => { return ob.price > 9.90 })

                const boxListProducts = document.createElement("div");
                const h2_title = document.querySelector("h2");


                boxListProducts.setAttribute("class", "list-products");

                h2_title.textContent = "Use seu presente em qualquer produto"

                for (let product of newProduct) {
                    let div_product = document.createElement('div');
                    let div_img = document.createElement('div');
                    let img_product = document.createElement('img');
                    let black_just = document.createElement("p")
                    let black_just2 = document.createElement("p")
                    let h2 = document.createElement("h2");
                    let h3_old_price = document.createElement("h3");
                    let h3_new_price = document.createElement("h3");

                    div_product.setAttribute('class', "box-product");
                    div_product.setAttribute('id', product.id);

                    div_img.setAttribute('class', "box-img");
                    black_just.setAttribute("class", "black-just-text")
                    black_just2.setAttribute("class", "black-just-text two")
                    h3_old_price.setAttribute('class', "old-price")


                    img_product.src = transformArrayMySql(product.images)[0];
                    black_just.textContent = "É Black Friday Just Dream"
                    black_just2.textContent = "É Black Friday"
                    h2.textContent = formatTextLong(product.name_product, 25)
                    h3_old_price.textContent = "de R$" + product.old_price.toFixed(2).replace(".", ",")
                    h3_new_price.textContent = "por apenas R$" + product.price.toFixed(2).replace(".", ",")


                    div_img.appendChild(img_product)
                    div_product.appendChild(div_img)
                    div_product.appendChild(black_just)
                    div_product.appendChild(black_just2)
                    div_product.appendChild(h3_old_price)
                    div_product.appendChild(h3_new_price)
                    div_product.appendChild(h2)
                    boxListProducts.appendChild(div_product)
                };

                container.appendChild(h2_title)
                container.appendChild(boxListProducts)
            }

        };


        // chama a função para redirecionar os produtos da container ball para pagina de produtos jd
        redirectBallForProductPage();
    })

}

function redirectForProductPage() {
    const boxProducts = document.querySelectorAll(".content-all-products .box-product");

    boxProducts.forEach(p => p.addEventListener("click", () =>
        window.location.href = `https://justdream.com.br/product.html?p=${p.querySelector("h2").textContent}&id=${p.id}`
    ));
}

function redirectBallForProductPage(){
    const boxBallProducts = document.querySelectorAll(".list-products .box-product")

    boxBallProducts.forEach(p => p.addEventListener("click", () =>
    window.location.href = `http://localhost:5501/product.html?p=${p.querySelector("h2").textContent}&id=${p.id}&cpm=available&cpmid=3`
));
}

function scrollProducts(){
    const container = document.querySelector("div.box-all-products")
    const buttonLeft = document.querySelectorAll("button.button-left");
    const buttonRight = document.querySelectorAll("button.button-right");


    buttonLeft.forEach(btn => btn.addEventListener("click", () =>{
        container.scroll(-300, 0);
        if(container.scrollLeft == 0) buttonLeft.forEach(btn => btn.style.display = 'none');

    }))
    buttonRight.forEach(btn => btn.addEventListener("click", () =>{
        container.scroll(300, 0);

    }))
}

function openMobileMenu(){
    const menu = document.querySelector("nav ul");
    const btnMenu = document.querySelector("nav .menu-mobile");
    const header = document.querySelector(".container-page-one header");
    const aLinks = document.querySelectorAll(".assets nav ul a");

    document.addEventListener("wheel" , () =>{
        if(window.scrollY > 200) header.classList.add("fixed");
    })

    btnMenu.addEventListener("click", ()=>{
        header.classList.toggle("fixed");
        menu.classList.toggle('open');
        btnMenu.classList.toggle("close")
    });

    aLinks.forEach(a => a.addEventListener("click" , () => {
        header.classList.toggle("fixed")
        menu.classList.toggle('open');
        btnMenu.classList.toggle("close")
    }));

}