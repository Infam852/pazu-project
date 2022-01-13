function checkPasswordMatch(){
    var pswd = document.getElementById('RegisterInputPassword')
    var pswdCheck = document.getElementById('RegisterInputPasswordConfirm')
    pswdCheck.setCustomValidity(pswdCheck.value != pswd.value ? "Hasła muszą się zgadzać" : '')
}


function logout(){
    console.log("[DEBUG] logout(): remove cookie login")
    sessionStorage.setItem("showLogoutToast", "1");
    Cookies.remove("login")
}


function login(){
    console.log("[DEBUG] login(): set cookie login=true")
    sessionStorage.setItem("showLoginToast", "1");
    Cookies.set('login', 'true');
}


function setNavbar(){
    if (Cookies.get('login') === "true"){
        $("#notif-opt").show();
        $("#login-opt").hide();
        $("#register-opt").hide();
        $("#logout-opt").show();
    } else {
        $("#notif-opt").hide();
        $("#login-opt").show();
        $("#register-opt").show();
        $("#logout-opt").hide();
    }
}

function monthToStr(month){
    switch (month) {
        case 0: return "ST"
        case 1: return "LUT"
        case 2: return "MRZ"
        case 3: return "KW"
        case 4: return "MAJ"
        case 5: return "CZ"
        case 6: return "LIP"
        case 7: return "SIER"
        case 8: return "WRZ"
        case 9: return "PAŹ"
        case 10: return "LIS"
        case 11: return "GR"
    }
}

function setNotifications() {
    // mock data
    const reminders = [{
        "date": new Date(2022, 0, 20),
        "header": "Złożenie dokumentu X",
        "description": "Urząd Y wymaga złożenia wniosku ze strony http://example.com",
        "checkId": "1",
        "isDone": Cookies.get('r1')
    }, {
        "date": new Date(2022, 3, 18),
        "header": "Opłacenie A",
        "description": "Należy opłacić Lorem ipsum",
        "checkId": "2",
        "isDone": Cookies.get('r2')
    }, {
        "date": new Date(2022, 5, 25),
        "header": "Opłacenie D",
        "description": "Należy opłacić Lorem ipsum",
        "checkId": "3",
        "isDone": Cookies.get('r3')
    }]

    var now = Date.now();
    for (const reminder of reminders){
        var eventDate = reminder["date"];
        timeToEvent =  Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
        var dateWarningColor = "";
        if (timeToEvent < 14){ dateWarningColor = "text-danger fw-bolder"; }
        var date_col = $("<div/>", { "class": "col-2 text-right" });
        date_col.append(
            $("<h4/>").append(
                $("<span/>", { "class": "badge bg-secondary", text: eventDate.getDate() })),
                $("<h5/>", { text: monthToStr(eventDate.getMonth()) }),
                $("<input/>", { "class": "form-check-input", "type": "checkbox", value: "", id: reminder["checkId"]})
        );
        description_col = $("<div/>", { "class": "col-10" }).append(
            $("<h5/>", { "class": "text-uppercase", text: reminder["header"] }),
            $("<p/>", { text: reminder["description"] }),
            $("<p/>", { "class": "mt-3 " + dateWarningColor, text: "Zostało " + timeToEvent + " dni" })
        );
        console.log(description_col)
        var row = $("<div/>", { "class": "row row-striped border-top border-secondary px-3 py-2" });
        row.append(date_col, description_col);
        row.appendTo("#calendar");
    }
}
