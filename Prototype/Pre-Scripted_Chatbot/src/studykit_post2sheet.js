//makesure to include  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

var temp = '';

let formDataStore = {
	question_number: -1,
	question: '',
	user_text: ''
};

function updateQuestionNumber(questionNumber) {
	formDataStore.question_number = questionNumber;
}

function updateQuestion(question) {
	formDataStore.question = question;
}

function updateUserText(userText) {
	formDataStore.user_text = userText;
}

function clearFormData() {
	formDataStore.question_number = -1;
	formDataStore.question = '';
	formDataStore.user_text = ''
}

//Example
function send_dinsaur() {
	console.log("send_dinsaur");

	get_qualtrics_variable();
	
	var formData = new FormData();
	var condition = "Static"
	
	formData.append('qualtrics_code', qualtrics_code);
	formData.append('condition', condition);
	formData.append('question_number', formDataStore.question_number);
	formData.append('question', formDataStore.question);
	formData.append('user_text', formDataStore.user_text);
	
	//Temporary Testing
	console.log("Condition: " + condition);
	console.log(qualtrics_code);
	
	// Display the key/value pairs
	post_sheet(formData);

	clearFormData();

}

//Function
function post_sheet(formData) {
  console.log(serialize_form_data(formData));
  // abort any pending request
  var request;
  if (request) {
    request.abort();
  }
  var serializedData = serialize_form_data(formData)
  //console.log(serializedData);

  // let's disable the inputs for the duration of the ajax request
  // Note: we disable elements AFTER the form data has been serialized.
  // Disabled form elements will not be serialized.

  //REPLACE THIS!
  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbx-UCuaYoLqoZV16BVtpQKa4os2MoVi5_fldSe0TBR7XJCSXoUdww9-AUftlPCG4DeHQw/exec",
    type: "post",
    data: serializedData
  });

  // callback handler that will be called on success
  request.done(function(response, textStatus, jqXHR) {
    // log a message to the console

  });

  // callback handler that will be called on failure
  request.fail(function(jqXHR, textStatus, errorThrown) {
    // log the error to the console
    console.error(
      "The following error occured: " +
      textStatus, errorThrown
    );
  });



}

function form_data_length(formData) {
  count = 0;
  for (var pair of formData.entries()) {
    count = count + 1;
  }
  return (count);
}

function serialize_form_data(formData) {
  var serialized_string = ""
  var length = form_data_length(formData);
  count = 0;
  for (var pair of formData.entries()) {
    var key = pair[0];
    var input_value = pair[1];
    input_value = input_value.replace('&', ' AND ');
    input_value = input_value.replace('=', ' EQUAL ');
    key = key.replace('&', ' AND ');
    key = key.replace('=', ' EQUAL ');

    //Appending to final string
    serialized_string = serialized_string + key + "=" + input_value;
    //Add add
    if (count < length - 1) {
      serialized_string = serialized_string + "&"
    }
    count = count + 1;
  }
  return (serialized_string);
}

