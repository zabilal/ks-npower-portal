let hostname = 'http://n-sipkano.com'
console.log(hostname);


document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
    window.node = node

    const status = node.isOnline() ? 'online' : 'offline'
    //
    console.log(`Node status: ${status}`)
    // document.getElementById('status').innerHTML = `Node status: ${status}`

    // You can write more code here to use it. Use methods like
    // node.add, node.get. See the API docs here:
    // https://github.com/ipfs/js-ipfs/tree/master/packages/interface-ipfs-core


});


$(document).ready(function () {
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
                beforeSend:function(){
                    $('#submit').attr('disabled','disabled');
                    $('.loader_container').show();
                },
                complete:function(){
                    $('#submit').attr('disabled',null);
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

        }else {
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

        $.ajax({
            type: "POST",
            url: hostname + '/ks-api/v1//candidate',
            data: JSON.stringify(formDataObj),
            contentType: "application/json",
            beforeSend:function(){
                $('#confirm_btn').attr('disabled','disabled');
                $('.loader_container').show();
            },
            complete:function(){
                $('#confirm_btn').attr('disabled',null);
                $('.loader_container').hide();
            }
        })

            .done(function (data, textStatus, jqXHR) {
                console.log("Ajax completed: " + data);
                // window.location.href = 'success.html';
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
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
        for(item in formDataObj){
            output += `<p><strong>${item}</strong>: <span>${formDataObj[item]}</span></p>`;
        }
        $('.review').html(output);

    });


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
                if(textStatus != "success"){
                    $('#login_error').html(data);
                }else{
                    location.href = hostname + '/pages/register.html';
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Ajax problem: " + textStatus + " . " + errorThrown);
                if(textStatus == "error"){
                    alert("Invalid    Email/Password.......Please ...try   Again!!")
                    $('#login_error').html(errorThrown);
                }else{
                    location.href = hostname + '/pages/register.html';
                }
            });
        event.preventDefault();
    });

    let filedata = "";

    $(function(){
        $("#degreefileUpload").change(showPreviewImage_click);
    })



    // Changing the dropdown content request ----- for type of institution

    $(function(){
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
            url: hostname + '/ks-api/v1//candidate/drop',
            data: JSON.stringify(data),
            contentType: "application/json"
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("Ajax completed: " + data);
                    $('.institution_attended').html('');
                data.forEach(function(option) {
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

    $(function(){
        $("#residence_lga").change(fillWards);
    })

    function fillWards(e) {
        let selected = $("#residence_lga").val()
        console.log(selected)
        let lga = {
            cafeLga: selected
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
                data.forEach(function(option) {
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

    function showPreviewImage_click(e) {
        let $input = $(this);
        let inputFiles = this.files;
        if(inputFiles == undefined || inputFiles.length == 0) return;
        let inputFile = inputFiles[0];

        let reader = new FileReader();
        reader.onload = function(event) {
            // console.log(event.target.result);
            filedata = event.target.result;
            sendFile(event.target.result).then((result)=>{
                console.log("Login from Call ::: " + result);
            });
        };
        reader.onerror = function(event) {
            alert("I AM ERROR: " + event.target.error.code);
        };
        reader.readAsDataURL(inputFile);
    }

    async function sendFile(fileData) {
        console.log(fileData)

        //Remove base64 prefix
        const endOfPrefix = fileData.indexOf(",");
        const cleanStrData = fileData.slice(endOfPrefix+1);

        for await (const { cid } of node.add(cleanStrData)) {
            console.log('successfully stored', cid)
        }
    }

    // $("#submit").click(function() {
    //     // disable button
    //     $(this).prop("disabled", true);
    //     // add spinner to button
    //     $(this).html(
    //         `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
    //     );
    // });
});