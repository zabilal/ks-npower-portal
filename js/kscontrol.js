// let hostname = window.location.host
let hostname = 'http://n-sipkano.com'
// let hostname = 'http://localhost:8080'
// console.log("hostname :: " + hostname);

$(document).ready(function () {

    var cert_1 = "";
    var cert_2 = "";
    var gov_id = "";
    var pasport = "";

    var cafe = localStorage.getItem('cafeName');

    var cafeId = localStorage.getItem('cafeId');

    $("#dynamic_text").html(cafe);

    // clear form ---- in case if a user navigate back to the signup page

    $('.cafeName').val('');
    $('.cafeContactPerson').val('');
    $('.cafeEmailAddress').val('');
    $('.cafePhoneNumber').val('');
    $('.cafePassCode').val('');
    $('.cafeAddress').val('');
    $('.cafeLga').val('');


    // Signup Request

    $("#submit").click(function (event) {
        event.preventDefault();
        let formJqObj = $("#sigunp-form");
        let formDataObj = {};
        (function () {
            formJqObj.find(":input").not("[type='submit']").not("[type='reset']").each(function () {
                let thisInput = $(this);
                formDataObj[thisInput.attr("name")] = thisInput.val();
            });
        })();

        $('.error_text_container').text('');
        $('input[name="cafeName"]').removeClass('error_border');
        $('input[name="cafeContactPerson"]').removeClass('error_border');
        $('input[name="cafeEmailAddress"]').removeClass('error_border');
        $('input[name="cafePhoneNumber"]').removeClass('error_border');
        $('input[name="cafePassCode"]').removeClass('error_border');
        $('input[name="cafeAddress"]').removeClass('error_border');
        $('input[name="cafeLga"]').removeClass('error_border');

        let cafeName = $('.cafeName').val().trim();
        let cafeContactPerson = $('.cafeContactPerson').val().trim();
        let cafeEmailAddress = $('.cafeEmailAddress').val().trim();
        let cafePhoneNumber = $('.cafePhoneNumber').val().trim();
        let cafePassCode = $('.cafePassCode').val().trim();
        let cafeAddress = $('.cafeAddress').val().trim();
        let cafeLga = $('.cafeLga').val().trim();

        if (cafeName !== '' &&
            cafeContactPerson !== '' &&
            cafeEmailAddress !== '' &&
            cafePhoneNumber !== '' &&
            cafePassCode !== '' &&
            cafeLga !== '') {


            $.ajax({
                type: "POST",
                url: hostname + '/ks-api/v1/cafes',
                data: JSON.stringify(formDataObj),
                contentType: "application/json",
                beforeSend: function () {
                    $('#submit').attr('disabled', 'disabled');
                    $('.loader_container').show();
                },
                complete: function () {
                    $('#submit').attr('disabled', null);
                    $('.loader_container').hide();
                }
            })

                .done(function (data, textStatus, jqXHR) {
                    console.log("Ajax completed: " + data);
                    window.location.href = 'success.html';
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("Ajax problem: " + textStatus + ". " + errorThrown);
                });
            event.preventDefault();

        } else {
            $('.error_text_container').text('Please Fill all fields').css('color', '#dc3545');
            $('.cafeName').addClass('error_border');
            $('.cafeContactPerson').addClass('error_border');
            $('.cafeEmailAddress').addClass('error_border');
            $('.cafePhoneNumber').addClass('error_border');
            $('.cafePassCode').addClass('error_border');
            $('.cafeAddress').addClass('error_border');
            $('.cafeLga').addClass('error_border');
        }


    });

    //logout
    $(".logout_btn").click(function (event) {
        event.preventDefault();
        location.href = hostname + '/pages/login.html';
    })


    // Confirm submission for Register

    $('#confirm_btn').click(function (event) {
        let formJqObj = $("#wizard");
        let formDataObj = {};
        (function () {
            formJqObj.find(":input").not("[type='submit']").not("[type='reset']").each(function () {
                let thisInput = $(this);
                formDataObj[thisInput.attr("name")] = thisInput.val();
            });
        })();

        formDataObj["cafe_id"] = cafeId;
        formDataObj["degree_upload"] = cert_1;
        formDataObj["additional_degree_upload"] = cert_2;
        formDataObj["id_upload"] = gov_id;
        formDataObj["passport_upload"] = pasport;

        $.ajax({
            type: "POST",
            url: hostname + '/ks-api/v1/candidate',
            data: JSON.stringify(formDataObj),
            contentType: "application/json",
            beforeSend: function () {
                $('#confirm_btn').attr('disabled', 'disabled');
                $('.loader_container').show();
            },
            complete: function () {
                $('#confirm_btn').attr('disabled', null);
                $('.loader_container').hide();
            },

            success: function (data, textStatus, jqXHR) {
                console.log("Response :: " + data);
                // cert_1 = data['fileDownloadUri'];
                if (jqXHR.status == 201){
                    window.location.href = 'candidate_success.html';
                }
            }
        })
            .done(function (data, textStatus, jqXHR) {

                console.log("Ajax completed: " + data);
                console.log("Ajax completed: " + textStatus);
                console.log("Ajax completed: " + jqXHR.status);
                // if (jqXHR.status == 201){
                //     window.location.href = 'candidate_success.html';
                // }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 409){
                    alert("BVN Number has Been Used !!!")
                }
                if (jqXHR.status == 101){
                    alert("FORM SERIAL Number has Been Used !!!")
                }
                console.log("Ajax problem: " + textStatus + ". " + errorThrown);
            });
        event.preventDefault();
    });


    // Preview Data script

    $("#btn_review").click(function (event) {
        event.preventDefault();
        let formJqObj = $("#wizard");
        let formDataObj = {};
        (function () {
            formJqObj.find(":input").not("[type='submit']").not("[type='reset']").each(function () {
                let thisInput = $(this);
                formDataObj[thisInput.attr("name")] = thisInput.val();
            });
        })();
        let output;
        for (item in formDataObj) {
            if (formDataObj[item]) {
            output += `<p><strong>${item}</strong>: <span>${formDataObj[item]}</span></p>`;
        }
        }
        $('.review').html(output);
        document.querySelector('.review').childNodes[0].textContent = '';




    });



    // Changing the dropdown content request ----- for type of institution

    $(function () {
        $(".type_of_institution").change(getData);
    })

    function getData(e) {
        let selected = $(".type_of_institution").val()
        console.log(selected)
        let data = {
            option: selected
        }

        $.ajax({
            type: "POST",
            url: hostname + '/ks-api/v1/candidate/drop',
            data: JSON.stringify(data),
            contentType: "application/json"
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("Ajax completed: " + data);
                $('.institution_attended').html('');
                data.forEach(function (option) {
                    console.log(option);

                    $(".institution_attended").append(option);
                });
                //
                // window.location.href = 'success.html';
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Ajax problem: " + textStatus + ". " + errorThrown);
            });
    }

    $(function () {
        $("#dob").change(function (e) {
            console.log($("#dob").val())
        });
    })

    $(function () {
        // document.getElementById("wards").options.length = 0;

        $("#residence_lga").change(fillWards);
    })

    function fillWards(e) {
        $('#wards').empty();
            // .find('option')
            // .remove()
            // .end();

        let selected = $("#residence_lga").val()
        console.log(selected)
        let lga = {
            cafeLga: selected.trim()
        }

        $.ajax({
            type: "POST",
            url: hostname + '/ks-api/v1/cafes/wards',
            data: JSON.stringify(lga),
            contentType: "application/json"
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("Ajax completed: " + data);
                // $("#wards").cleanData();
                data.forEach(function (option) {
                    console.log(option);

                    $("#wards").append(option);
                });
                //
                // window.location.href = 'success.html';
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Ajax problem: " + textStatus + ". " + errorThrown);
            });
    }

    $("#cert_1").on("change", function (e) {
        var file = $(this)[0].files[0];
        // var name = file.name.split(".");
        // console.log(name[0]);

        var formData = new FormData();
        formData.append('file', file);
        formData.append('type', "degree");
        formData.append('bvnParam', $("#bvn_number").val());

        $.ajax({
            url: hostname + '/ks-api/v1/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
                cert_1 = data['fileDownloadUri'];
            }
        });
    });

    $("#cert_2").on("change", function (e) {
        var file = $(this)[0].files[0];

        var formData = new FormData();
        formData.append('file', file);
        formData.append('type', "addition");
        formData.append('bvnParam', $("#bvn_number").val());

        $.ajax({
            url: hostname + '/ks-api/v1/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
                cert_2 = data['fileDownloadUri'];
                // alert(data);
            }
        });
    });

    $("#gov_id").on("change", function (e) {
        var file = $(this)[0].files[0];

        var formData = new FormData();
        formData.append('file', file);
        formData.append('type', "id");
        formData.append('bvnParam', $("#bvn_number").val());

        $.ajax({
            url: hostname + '/ks-api/v1/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
                gov_id = data['fileDownloadUri'];
                // alert(data);
            }
        });
    });

    $("#passport").on("change", function (e) {
        var file = $(this)[0].files[0];

        var formData = new FormData();
        formData.append('file', file);
        formData.append('type', "passport");
        formData.append('bvnParam', $("#bvn_number").val());

        $.ajax({
            url: hostname + '/ks-api/v1/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
                pasport = data['fileDownloadUri'];
                // alert(data);

            }
        });
    });

    $("#primary_cert").on("change", function (e) {
        var file = $(this)[0].files[0];

        var formData = new FormData();
        formData.append('file', file);
        formData.append('type', "primary");
        formData.append('bvnParam', $("#bvn_number").val());

        $.ajax({
            url: hostname + '/ks-api/v1/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
                pasport = data['fileDownloadUri'];
                // alert(data);

            }
        });
    });

    $("#nysc").on("change", function (e) {
        var file = $(this)[0].files[0];

        var formData = new FormData();
        formData.append('file', file);
        formData.append('type', "nysc");
        formData.append('bvnParam', $("#bvn_number").val());

        $.ajax({
            url: hostname + '/ks-api/v1/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                // console.log(data);
                pasport = data['fileDownloadUri'];
                // alert(pasport);

            }
        });
    });


});