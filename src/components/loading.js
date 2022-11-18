export function loading() {
    let div = document.createElement("div")
    let loading = document.createElement("div")
    // SET ATTRIBUTE    
    div.setAttribute("class" , "box-loading");
    loading.setAttribute("class" , "loading");
    // CSS 
    div.setAttribute("style" , "position:absolute;top:0;left:0;bottom:0;right:0;background:#f1f1f160;display:grid;place-items:center;z-index:999")
    loading.setAttribute("style" , "width:3rem;max-width:100%;height:3rem;max-height:100%;border:2px solid #028cc7;border-top:3px solid #74c7ff;border-bottom:3px solid #74c7ff;border-radius:50%;animation: loading .4s linear infinite;");
    // APPENDCHILDS
    div.appendChild(loading);

    function remove(container){
        var boxes_loading = [...container.querySelectorAll("div.box-loading")];
        !boxes_loading.length || boxes_loading.forEach(b => {
            if(b.parentNode == container)container.removeChild(b);
        });
    }

    function add(container){
        container.appendChild(div)
    }

    return {add , remove};
}