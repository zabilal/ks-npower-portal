let hostname = 'http://n-sipkano.com'
// let hostname = 'http://localhost:8080'
console.log("hostname :: " + hostname);

$(document).ready(function () {


    // Login Request

    $("#login-form").submit(function (event) {
        let formJqObj = $("#login-form");
        let formDataObj = {};
        (function () {
            formJqObj.find(":input").not("[type='submit']").not("[type='reset']").each(function () {
                let thisInput = $(this);
                formDataObj[thisInput.attr("name")] = thisInput.val();
            });
        })();

        $.ajax({
            type: "POST",
            url: hostname + '/ks-api/v1/cafes/login',
            data: JSON.stringify(formDataObj),
            contentType: "application/json"
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("Ajax completed: " + data + " ===== " + textStatus);
                if (textStatus != "success") {
                    $('#login_error').html(data);
                } else {
                    cafe = data;
                    // $("#dynamic_text").data('', data['cafeName']);

                    localStorage.setItem('cafeId', data['id']);
                    localStorage.setItem('cafeName', data['cafeName']);
                    localStorage.setItem('cafeLga', data['cafeLga']);
                    localStorage.setItem('cafeContactPerson', data['cafeContactPerson']);
                    localStorage.setItem('cafeEmail', data['cafeEmailAddress']);
                    localStorage.setItem('cafePhone', data['cafePhoneNumber']);
                    localStorage.setItem('cafePassCode', data['cafePassCode']);

                    // cafeId = data['id'];
                    // console.log(localStorage.getItem("cafe"));

                    location.href = hostname + '/pages/register.html';
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Ajax problem: " + textStatus + " . " + errorThrown);
                if (textStatus == "error") {
                    alert("Invalid  Email/Password.......Please ...try   Again!!")
                    $('#login_error').html(errorThrown);
                }
            });
        event.preventDefault();
    });


});