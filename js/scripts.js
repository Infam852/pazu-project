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

function remove_account(){
    sessionStorage.setItem("showLogoutToast", "0");
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
        $("#account-opt").show();
    } else {
        $("#notif-opt").hide();
        $("#login-opt").show();
        $("#register-opt").show();
        $("#logout-opt").hide();
        $("#account-opt").hide();
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


//KALKULATOR 
function save_answear() {
    
    // Get the output text
    var section = document.getElementById('question');
    section.style.display = 'none';
    
    if(document.getElementById('kredyt_nie').checked && document.getElementById('rynek_p').checked) {
      document.getElementById('form_n_p').style.display = 'block';
          }
    if(document.getElementById('kredyt_nie').checked && document.getElementById('rynek_w').checked){
        document.getElementById('form_n_w').style.display = 'block';
    }
    if(document.getElementById('kredyt_tak').checked && document.getElementById('rynek_w').checked){
      document.getElementById('form_t_w').style.display = 'block';
    }
    if(document.getElementById('kredyt_tak').checked && document.getElementById('rynek_p').checked){
      document.getElementById('form_t_p').style.display = 'block';
    }
    
  }


    // Show Error
    function showError(error) {
      // Hide results
      document.querySelector('#results').style.display = 'none';
      // Hide loader
      document.querySelector('#loading').style.display = 'none';
      // Create a div
      const errorDiv = document.createElement('div');
      // Get elements
      const card = document.querySelector('.content-container');
      const heading = document.querySelector('.hd');
      // Add class
      errorDiv.className = 'alert alert-danger';
      // Create text node and append to div
      errorDiv.appendChild(document.createTextNode(error));
      // Insert error above heading
      card.insertBefore(errorDiv, heading);
      // Clear error after 3 seconds
      setTimeout(clearError, 3000);
    }

  document.getElementById('form_n_w').addEventListener('submit', function(e) {
    e.preventDefault();
    // Hide results
    document.querySelector('#results_n_w').style.display = 'none';
    // Show loader
    document.querySelector('#loading_n_w').style.display = 'block';
    // Set timer
    setTimeout(calculateResults_n_w, 500);
  });

    function calculateResults_n_w(e) {
    // UI Vars
    const notary = document.getElementById('notarycosts_n_w');
    const sad = document.getElementById('kosztysad_n_w');
    const podatek = document.getElementById('podatek_n_w');
    const wartosc_nieruchomosci = document.getElementById('wartosc_nieruchomosci_n_w');
    const taksa_field = document.getElementById('taksa_n_w');
    const sum_field = document.getElementById('summ_n_w');
    const wielkosc_field = document.getElementById('wielkosc_nieruchomosci_n_w')
    const wykonczenie_field = document.getElementById('wykonczenie_n_w')
    const nieruchomosc_field = document.getElementById('nieruchomosc_n_w')
   
    const wartosc = parseFloat(wartosc_nieruchomosci.value);
    
    
    // Compute monthly payments
    const pcc = (wartosc * 0.02);
    const taksa = (wartosc - 60000)* 0.004 + 1010 ;
    const koszt = parseFloat(wielkosc_field.value)*890+14000+15000;
    if (isFinite(pcc)) {
      nieruchomosc_field.value = wartosc
      notary.value = parseFloat(document.getElementById('notary_n_w').value);
      sad.value = parseFloat(document.getElementById('sad_n_w').value);
      taksa_field.value = taksa;
      podatek.value = pcc;
      wykonczenie_field.value = koszt;
      sum_field.value = parseFloat(notary.value) + parseFloat(sad.value)  + taksa + pcc + koszt + wartosc;
      document.querySelector('#results_n_w').style.display = 'block';
      document.querySelector('#loading_n_w').style.display = 'none';
    } else {
      showError('Błędne dane spróbuj ponownie.');
    }
  }

  document.getElementById('form_n_p').addEventListener('submit', function(e) {
    e.preventDefault();
    // Hide results
    document.querySelector('#results_n_p').style.display = 'none';
    // Show loader
    document.querySelector('#loading_n_p').style.display = 'block';
    // Set timer
    setTimeout(calculateResults_n_p, 500);
  });

    function calculateResults_n_p(e) {
    // UI Vars
    const wartosc_nieruchomosci = document.getElementById('wartosc_nieruchomosci_n_p');
    const sad = document.getElementById('kosztysad_n_p');
    const ksiega_field = document.getElementById('ksiegar_n_p')

    const taksa_field = document.getElementById('taksa_n_p');
    const sum_field = document.getElementById('summ_n_p');
    const wielkosc_field = document.getElementById('wielkosc_nieruchomosci_n_p')
    const wykonczenie_field = document.getElementById('wykonczenie_n_p')
    const nieruchomosc_field = document.getElementById('nieruchomosc_n_p')
   
    const wartosc = parseFloat(wartosc_nieruchomosci.value);
    
    
    // Compute monthly payments
    
    const taksa = (wartosc - 60000)* 0.004 + 1010 ;
    const koszt = parseFloat(wielkosc_field.value)*890+14000+15000;
    
    if (isFinite(taksa)) {
      nieruchomosc_field.value = wartosc
      sad.value = parseFloat(document.getElementById('sad_n_p').value);
      ksiega_field.value = parseFloat(document.getElementById('ksiega_n_p').value);
      taksa_field.value = taksa;
      wykonczenie_field.value = koszt;

      sum_field.value =  parseFloat(sad.value)  + taksa +  koszt + wartosc + parseFloat(ksiega_field.value) ;
      document.querySelector('#results_n_p').style.display = 'block';
      document.querySelector('#loading_n_p').style.display = 'none';
    } else {
      showError('Błędne dane spróbuj ponownie.');
    }
  }

  document.getElementById('form_t_w').addEventListener('submit', function(e) {
    e.preventDefault();
    // Hide results
    document.querySelector('#results_t_w').style.display = 'none';
    // Show loader
    document.querySelector('#loading_t_w').style.display = 'block';
    // Set timer
    setTimeout(calculateResults_t_w, 500);
  });

    function calculateResults_t_w(e) {
    // UI Vars
    const sad = document.getElementById('kosztysad_t_w');
    const podatekH_field = document.getElementById('podatekHR_t_w');
    const prowizja_field = document.getElementById('prowizjaR_t_w');
    const wartosc_nieruchomosci = document.getElementById('wartosc_nieruchomosci_t_w');
    const podatek = document.getElementById('podatek_t_w');
    const taksa_field = document.getElementById('taksa_t_w');
    const wykonczenie_field = document.getElementById('wykonczenie_t_w');
    const wklad_field = document.getElementById('wkladr_t_w');
    const rata_field = document.getElementById('rata_t_w');
    const odsetki_field = document.getElementById('odsetki_t_w');
    const kosztkredytu_field = document.getElementById('kredytkoszt_t_w');
    
    
    const sum_field = document.getElementById('summ_t_w');
    const wielkosc_field = document.getElementById('wielkosc_nieruchomosci_n_w');
    
    const wartosc = parseFloat(wartosc_nieruchomosci.value);
    const principal = wartosc - parseFloat(document.getElementById('wklad_t_w').value);
    const calculatedInterest = parseFloat(document.getElementById('oprocentowanie_t_w').value) / 100 / 12;
    const calculatedPayments = parseFloat(document.getElementById('okres_t_w').value) * 12;
    // // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    const pcc = (wartosc * 0.02);
    const taksa = (wartosc - 60000)* 0.004 + 1010 ;
    const koszt = parseFloat(wielkosc_field.value)*890+14000+15000;
    if (isFinite(monthly)) {
      wklad_field.value = parseFloat(document.getElementById('wklad_t_w').value);
      sad.value = parseFloat(document.getElementById('sad_t_w').value);
      podatekH_field.value = parseFloat(document.getElementById('podatekH_t_w').value);
      prowizja_field.value = (parseFloat(document.getElementById('prowizja_t_w').value)/100)*wartosc;
      podatek.value = pcc;
      taksa_field.value = taksa;
      wykonczenie_field.value = koszt;
      rata_field.value = monthly.toFixed(2);
      kosztkredytu_field.value = (monthly * calculatedPayments).toFixed(2);
      odsetki_field.value = ((monthly * calculatedPayments) - principal).toFixed(2);

      sum_field.value =  parseFloat(wklad_field.value) + parseFloat(sad.value) + parseFloat(podatekH_field.value) + parseFloat(prowizja_field.value) + taksa + pcc + koszt;
      document.querySelector('#results_t_w').style.display = 'block'; 
      document.querySelector('#loading_t_w').style.display = 'none';
    } else {
      showError('Błędne dane spróbuj ponownie.');
    }
  }

  document.getElementById('form_t_p').addEventListener('submit', function(e) {
    e.preventDefault();
    // Hide results
    document.querySelector('#results_t_p').style.display = 'none';
    // Show loader
    document.querySelector('#loading_t_p').style.display = 'block';
    // Set timer
    setTimeout(calculateResults_t_p, 500);
  });

    function calculateResults_t_p(e) {
    // UI Vars
    const sad = document.getElementById('kosztysad_t_p');
    const podatekH_field = document.getElementById('podatekHR_t_p');
    const wartosc_nieruchomosci = document.getElementById('wartosc_nieruchomosci_t_p');
    const taksa_field = document.getElementById('taksa_t_p');
    const wykonczenie_field = document.getElementById('wykonczenie_t_p');
    const wklad_field = document.getElementById('wkladr_t_p');
    const rata_field = document.getElementById('rata_t_p');
    const odsetki_field = document.getElementById('odsetki_t_p');
    const kosztkredytu_field = document.getElementById('kredytkoszt_t_p');
    const ksiega_field = document.getElementById('ksiegaR_t_p');
    
    const sum_field = document.getElementById('summ_t_p');
    const wielkosc_field = document.getElementById('wielkosc_nieruchomosci_n_p');
    
    const wartosc = parseFloat(wartosc_nieruchomosci.value);
    const principal = wartosc - parseFloat(document.getElementById('wklad_t_p').value);
    const calculatedInterest = parseFloat(document.getElementById('oprocentowanie_t_p').value) / 100 / 12;
    const calculatedPayments = parseFloat(document.getElementById('okres_t_p').value) * 12;
    // // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    const taksa = (wartosc - 60000)* 0.004 + 1010 ;
    const koszt = parseFloat(wielkosc_field.value)*890+14000+15000;
    if (isFinite(monthly)) {
      wklad_field.value = parseFloat(document.getElementById('wklad_t_p').value);
      sad.value = parseFloat(document.getElementById('sad_t_p').value);
      podatekH_field.value = parseFloat(document.getElementById('podatekH_t_p').value);
      taksa_field.value = taksa;
      wykonczenie_field.value = koszt;
      rata_field.value = monthly.toFixed(2);
      kosztkredytu_field.value = (monthly * calculatedPayments).toFixed(2);
      odsetki_field.value = ((monthly * calculatedPayments) - principal).toFixed(2);
      ksiega_field.value = parseFloat(document.getElementById('ksiega_t_p').value);
      sum_field.value =  parseFloat(wklad_field.value) + parseFloat(sad.value) + parseFloat(podatekH_field.value) + taksa + koszt;
      document.querySelector('#results_t_p').style.display = 'block'; 
      document.querySelector('#loading_t_p').style.display = 'none';
    } else {
      showError('Błędne dane spróbuj ponownie.');
    }
  }
