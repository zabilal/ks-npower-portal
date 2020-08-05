    $(document).ready(function(){
       var section =  $('.form_wrapper section');
       var counter = 0;
       reset();
       function reset(){
        for (var i = 0; i < section.length; i++) {
            section[i].style.display = 'none';
            
        }
        section[counter].style.display = 'block';
       }
       function next(){
        counter++;
        section[counter].style.display = 'block';
        if (counter > section.length) {
            counter = section.length - 1;
        }
        reset();
       }
        function previous(){
        counter--;
        section[counter].style.display = 'block';
        if (counter < 0) {
            counter = 0;
        }
        reset();
       }
       $('.next_btn').click(function(e){
         
            e.preventDefault();
            next();
       });
       $('.previous_btn').click(function(e){
        e.preventDefault();
        previous();
       });



       // VALIDATION FUNCTIONS


       // FUNCTION TO VALIDATE USER IDENTITY

       $('#validate_id').click(function(e){
        e.preventDefault();
        // alert('click');
            $('.dob_text').text('');
            $('.bvn_text').text('');
            $('.form_serial').text('');
            $('#bvn_number').removeClass('error_border');
            $('.dob').removeClass('error_border');
            $('.form_serial').removeClass('error_border');
        let bvn_number = $('#bvn_number').val();
        let dob = $('.dob').val();
        let form_serial = $('.form_serial').val();
        if (bvn_number !== '' && dob !== '' && form_serial !== '') {
            next();
        }else {
            // alert('failed');
            $('.dob_text').text('Please choose Date of Birth').css('color','#dc3545');
            $('.bvn_text').text('Please Input BVN Number').css('color','#dc3545');
            $('#bvn_number').addClass('error_border');
            $('.dob').addClass('error_border');
            $('.form_serial').addClass('error_border');
        }
       });

       // END OF IDENTITY FUNCTION


       // FUNCTION TO VALIDATE BIO-DATA

       $('#bio_data_validate').click(function(e){
        e.preventDefault();
        let first_name = $('.first_name').val();
        let middle_name = $('.middle_name').val();
        let last_name = $('.last_name').val();
        let email = $('.email').val();
        let bio_dob = $('.bio_dob').val();
        let gender = $('.gender').val();
        let phone_number = $('.phone_number').val();
        let state_of_residence = $('.state_of_residence').val();
        let lga_of_residence = $('.lga_of_residence').val();
        let electoral_ward = $('.electoral_ward').val();
        let state_of_origin = $('.state_of_origin').val();
        let lga_of_origin = $('.lga_of_origin').val();
        let residential_address = $('.residential_address').val();
        if (first_name !== "" && 
          middle_name !== "" && last_name !== "" && 
          email !== "" && bio_dob !== "" &&
          gender !== "" &&
          phone_number !== "" &&
          state_of_residence !== "" &&
          lga_of_residence !== "" &&
          electoral_ward !== "" &&
          state_of_origin !== "" &&
          lga_of_origin !== "" &&
          residential_address !== "") {
          next();
        }else {
          $('.bio_error').text('Please Fill in all fields').css('color','#dc3545');
          $('.first_name').addClass('error_border');
          $('.middle_name').addClass('error_border');
          $('.last_name').addClass('error_border');
          $('.email').addClass('error_border');
          $('.bio_dob').addClass('error_border');
          $('.gender').addClass('error_border');
          $('.phone_number').addClass('error_border');
          $('.state_of_residence').addClass('error_border');
          $('.lga_of_residence').addClass('error_border');
          $('.electoral_ward').addClass('error_border');
          $('.state_of_origin').addClass('error_border');
          $('.lga_of_origin').addClass('error_border');
          $('.residential_address').addClass('error_border');           
        }

       });
       // END OF FUNCTION TO VALIDATE BIO-DATA




       $('#education_validate').click(function(){
        let education_level = $('.education_level').val();
        let year_attended = $('.year_attended').val();
        let type_of_institution = $('.type_of_institution').val();
        let institution_attended = $('.institution_attended').val();
        let course_studied = $('.course_studied').val();
        let certificate = $('.certificate').val();
        
        if (education_level !== '' && 
          year_attended !== '' && 
          type_of_institution !== '' && 
          course_studied !== '' &&
          certificate !== '') {
          next();
        }else {
          $('.edu_error').text('Please Fill in all fields').css('color','#dc3545');
          $('.education_level').addClass('error_border');
          $('.year_attended').addClass('error_border');
          $('.type_of_institution').addClass('error_border');
          $('.institution_attended').addClass('error_border');
          $('.course_studied').addClass('error_border');
          $('.certificate').addClass('error_border');
        }


       });



$('.hidden_disability').hide();

$('.disability_yes').change(function(){
$('.hidden_disability').show();
});


$('.disability_no').change(function(){
$('.hidden_disability').hide();

});
// EDUCATION SECTION CODE TO TOGGLE CERTAIN INPUT FIELDS

$('table.table').hide();

$('#confirm_school_no').change(function(){

$('.hidden_confirm').hide();
$('.edu_error').text('');
$('#education_validate').click(function(){
next();  
})
  
})


$('#confirm_school_yes').change(function(){
    $('.hidden_confirm').show();

})

var qualification;
$('.education_level').change(function(e){
let options = $('.education_level option');

for(var i=0; i < options.length; i++){
  qualification = e.target.value;
}
var hidden_sec = $('.hidden_for_sec');
if (qualification == 'Secondary') {
$('table.table').show(); 

for (var i = 0; i < hidden_sec.length; i++) {
  hidden_sec[i].style.display = 'none';
}
// $('.hidden_for_sec').hide();

}else {
$('table.table').hide();  
for (var i = 0; i < hidden_sec.length; i++) {
  hidden_sec[i].style.display = 'block';
}

}

});

$('.employment_no').change(function(){
  $('.earning').hide();
})
$('.employment_yes').change(function(){
  $('.earning').show();  
});

    });