//email validation
const email = document.getElementById("email")
email.addEventListener("input", () => { validate(email) })
function validate(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("Invalid email");
        element.reportValidity();
    }
    else {
        element.setCustomValidity('');
    }
}

//dob validation between 18 and 55
const dob = document.getElementById("dob")
const today = new Date();

// Calculate the maximum and minimum allowable dates
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

console.log(maxDate.getFullYear())

dob.addEventListener("input", () => { dobvalidate(dob) })
function dobvalidate(dob) {
    let Date2 = dob.value.split("-");
    let year = Date2[0];
    let month = Date2[1];
    let date = Date2[2];
    let birthdate = new Date(year, month, date);
    if (birthdate < minDate || birthdate > maxDate) {
        dob.setCustomValidity("age must between 55 and 18");
        dob.reportValidity();
    } else {
        dob.setCustomValidity("");
    }
}
function ifdata() {
    let data = localStorage.getItem("data")
    if (data) {
        data = JSON.parse(data)
        return data
    } else {
        data = []
        return data
    }
}
let userdata = ifdata()
//local storage of data
const saveForm = (event) => {

    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptedTermsAndCondition = document.getElementById("acceptTerms").checked;
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndCondition
    };
    userdata.push(entry);
    localStorage.setItem("data", JSON.stringify(userdata));
    console.log(localStorage.getItem("data"))
    displaydata()
}
let form = document.getElementById("box")
form.addEventListener("submit", saveForm);


//table data
const displaydata = () => {
    let data = localStorage.getItem("data");
    if (data) {
        data = JSON.parse(data)
    }
    const tableEntries = data.map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td >${entry.dob}</td>`;
        const accept = `<td>${entry.acceptedTermsAndCondition}</td>`;
        const row = `<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
        return row;
    }).join("\n");

    const table = `<table border="2">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th >Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>
    ${tableEntries}</table>`;
    let details = document.getElementById("entries");
    details.innerHTML = table;
}

displaydata()
