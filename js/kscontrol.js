let hostname = window.location.origin
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

    // Signup Request
    $("#sigunp-form").submit(function (event) {
        var formJqObj = $("#sigunp-form");
        var formDataObj = {};
        (function () {
            formJqObj.find(":input").not("[type='submit']").not("[type='reset']").each(function () {
                var thisInput = $(this);
                formDataObj[thisInput.attr("name")] = thisInput.val();
            });
        })();

        $.ajax({
            type: "POST",
            url: hostname + '/ks-api/v1/cafes',
            data: JSON.stringify(formDataObj),
            contentType: "application/json"
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("Ajax completed: " + data);
                window.location.href = 'success.html';
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Ajax problem: " + textStatus + ". " + errorThrown);
            });
        event.preventDefault();
    });


    // Login Request
    $("#login-form").submit(function (event) {
        var formJqObj = $("#login-form");
        var formDataObj = {};
        (function () {
            formJqObj.find(":input").not("[type='submit']").not("[type='reset']").each(function () {
                var thisInput = $(this);
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

    var filedata = "";

    $(function(){
        $("#degreefileUpload").change(showPreviewImage_click);
    })

    $(function(){
        $("#residence_lga").change(fillWards);
    })

    function fillWards(e) {
        var selected = $("#residence_lga").val()
        console.log(selected)
        var lga = {
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
        var $input = $(this);
        var inputFiles = this.files;
        if(inputFiles == undefined || inputFiles.length == 0) return;
        var inputFile = inputFiles[0];

        var reader = new FileReader();
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