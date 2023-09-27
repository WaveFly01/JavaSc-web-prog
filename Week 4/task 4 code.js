if(document.readyState !== "loading") {
    console.log("Document is ready!");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        initializeCode();
    })
}
function initializeCode() {
    InputShow = document.getElementById("input-show")
    SubmitButton = document.getElementById("submit-data")
    body = document.getElementById("body")
    divcont = document.getElementById("div")

    SubmitButton.addEventListener("click", async function () {
        const q = InputShow.value
        const url =  "https://api.tvmaze.com/search/shows?q="+q
        const dataPromise = await fetch(url);
        const data = await dataPromise.json();

        data.forEach(element => {
           let div1 = document.createElement("div")
           div1.setAttribute("class", "show-id")
           try {
            let img1 = document.createElement("img")
            img1.setAttribute("src", element["show"]["image"]["medium"])

            let div2 = document.createElement("div")
            div2.setAttribute("class", "show-info")

            let h1 = document.createElement("h1")
            h1.textContent = element["show"]["name"]

            div2.appendChild(h1)
            div2.innerHTML += element["show"]["summary"]


            div1.appendChild(img1)
            div1.appendChild(div2)


           } catch (error) {
                console.log("There is no info for that show");
           }
           
           divcont.appendChild(div1)
            
            
        });


    })
    

}