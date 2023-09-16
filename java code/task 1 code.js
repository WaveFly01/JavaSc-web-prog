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
    const AddNoteButton = document.getElementById('add-data')
    const MyButton = document.getElementById('my-button')

    const UsersTable = document.getElementById("user-table");
    const UserNameText = document.getElementById("input-username");
    const UserEmailText = document.getElementById("input-email");
    const UserAdminCheck = document.getElementById("input-admin");
    const SubmitButton = document.getElementById("submit-data");
    const EmptyTableButton = document.getElementById("empty-table");
    const UploadButton = document.getElementById("upload");
    const FileInput = document.getElementById('input-image');
    window.isAdmin = '-'
    window.count = 0
    MyButton.addEventListener('click', function (){
        console.log('hello world');
        document.getElementById('h1t1').textContent = 'Moi maailma';
    });
    AddNoteButton.addEventListener('click', function () {
        const my_list = document.getElementById('my-list');
        const text_in = document.getElementById('text-input').value;
        const list_text = document.createElement('li');
        list_text.textContent = text_in;
        my_list.appendChild(list_text);
    });
    UserAdminCheck.addEventListener("change", function () {
        if (this.checked) {
            var isAdmin  = "X"
        } else {
            var isAdmin  = "-"
        }
        window.isAdmin = isAdmin
    })
    FileInput.addEventListener('change', function () {
        const file = FileInput.files[0];
        window.file = file
        window.count = 1
    })
    SubmitButton.addEventListener("click", function () {
        
        const username = document.getElementById("input-username").value;
        const email = document.getElementById("input-email").value;
        var Rows = UsersTable.rows;
        for (var i = 1; i <= (Rows.length-1); i++) {
            cell = UsersTable.rows[i].cells[0]
            celltext = cell.textContent
            if (celltext == username) {
                UsersTable.deleteRow(i);
                var rownumber = i
                break
            } else {
                var rownumber = -1
                
            }
        }
        var newRow = UsersTable.insertRow(rownumber)
        var usernameCell = newRow.insertCell(0);
        var emailCell = newRow.insertCell(1);
        var adminCell = newRow.insertCell(2);
        if (count == 1) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.width = 64;
            image.height = 64;
            const imageCell = newRow.insertCell(3);
            imageCell.style.width = '64px';
            imageCell.style.height = '64px';
            imageCell.appendChild(image)
            window.count = 0
        }
    

        usernameCell.innerHTML = username;
        emailCell.innerHTML = email;
        adminCell.innerHTML = isAdmin;
    });
    EmptyTableButton.addEventListener("click", function () {
        var Rows = UsersTable.rows;
        for (var i = Rows.length - 1; i > 0; i--) {
            UsersTable.deleteRow(i);
        }
        })
}
