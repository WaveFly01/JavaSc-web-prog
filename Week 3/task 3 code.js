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
    TableButton = document.getElementById("button")
    UserTable = document.getElementById("user-table")

    TableButton.addEventListener('click', getDataset)

    async function getDataset() {
        const url1 = 'https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff';
        const data1Promise = await fetch(url1);
        const data1 = await data1Promise.json();
        const dataset1 = data1.dataset;

        const url2 = 'https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065';
        const data2Promise = await fetch(url2);
        const data2 = await data2Promise.json();
        const dataset2 = data2.dataset;

        i = 0

        for (const key in dataset1.dimension.Alue.category.index) {
            const label = dataset1.dimension.Alue.category.label[key];
            const value = dataset1.value[i];
            const employment = dataset2.value[i]
            procent = (employment/value * 100).toFixed(2)

            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");    
            td1.innerText = label;
            td2.innerText = value;
            td3.innerText = employment;
            td4.innerText = procent+'%';
            if (procent > 45) {
                tr.style.backgroundColor = "#abffbd";
            } else if (procent < 25) {
                tr.style.backgroundColor = "#ff9e9e";
            }
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4)

            UserTable.appendChild(tr);
            i++
        }
    }
}




