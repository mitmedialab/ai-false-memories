var total_dialogue = 0;
var convo_num = 0;
var allow_to_send = 0;
var audio = 0;

//Save Variable
var qualtrics_code = "0";
var user_text;
var AI_text;

var conversation_history = [{
	"role": "system",
	"content": "As a police AI, your role is to provide information regarding the crime scene.The crime scene involved a robbery that took place in a convenience store. The report was made to the police at approximately 9pm on a Friday. The actual crime occurred sometime before the report was made.  You will follow the instruction provided by [System memory]"
}]; // create a global variable to store the conversation history




function add_instruction(input_message) {
	conversation_history.push({ role: "user", content: input_message });

}



//Add user text to chat flow
function add_user_bubble(input_message) {
	let bubble_temp = document.getElementById("user_template");
	//clone template
	let bubble_new = bubble_temp.cloneNode(true);
	//change ID
	convo_num = convo_num + 1;
	var current_convo = "bubble_" + convo_num;
	bubble_new.id = current_convo;
	//change statement
	bubble_new.querySelector("#display_message").innerHTML = input_message;
	//change color
	//bubble_new.querySelector("#chatbox").style.backgroundColor = color;
	//insert to chatframe
	var chat_flow = document.getElementById("ChatFlow");
	//make the chat visible
	bubble_new.style.display = "flex";
	chat_flow.innerHTML = chat_flow.innerHTML + bubble_new.outerHTML;
	//scrow to view
	document.getElementById(current_convo).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	conversation_history.push({ role: "user", content: input_message });
	conversation_control();

}

//Add other text to chat flow
function add_other_bubble(input_message) {
	let bubble_temp = document.getElementById("other_template");
	//clone template
	let bubble_new = bubble_temp.cloneNode(true);
	//change ID
	convo_num = convo_num + 1;
	var current_convo = "bubble_" + convo_num;
	// console.log("CONVO_NUM: " + convo_num)
	bubble_new.id = current_convo;
	//change color
	//bubble_new.querySelector("#chatbox").style.backgroundColor = color;
	//insert to chatframe
	var chat_flow = document.getElementById("ChatFlow");
	//make the chat visible
	bubble_new.style.display = "flex";
	chat_flow.innerHTML = chat_flow.innerHTML + bubble_new.outerHTML;
	//scrow to view
	document.getElementById(current_convo).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

	setTimeout(function() {
		//console.log("Executed after 3 second");
		//change statement
		bubble_select = document.getElementById(current_convo);
		bubble_select.querySelector("#display_message").innerHTML = input_message;
		bubble_select.querySelector("#display_message").style.display = "block";
		bubble_select.querySelector("#loading_dots").style.display = "none";
		document.getElementById(current_convo).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

	}, 1000);

	conversation_history.push({ role: "system", content: input_message });
	// console.log(conversation_history);

}


function call_GPT3(following_phrase) {
	// add new input text to conversation history

	var pre_data_obj = {
		model: "gpt-4",
		messages: conversation_history,
		temperature: 0,
		max_tokens: 126,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	};


	var url = "https://api.openai.com/v1/chat/completions";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url);

	var auth = 0 //set OPENAI key here
	var org = 0 //set OPENAI org here (if applicable)

	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", auth);
	xhr.setRequestHeader("OpenAI-Organization", org);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {

			let parsedxhr;
			try {
				parsedxhr = JSON.parse(xhr.responseText);
			} catch (error) {
				// console.log('Parsing error: ', error);
			}

			var stringObj = parsedxhr.choices[0].message.content;

			// add the AI response to the history

			add_other_bubble(stringObj);
			if (following_phrase != null) {
				setTimeout(function() {
					add_other_bubble(following_phrase);

				}, 2500);

			}

		}
	};

	xhr.send(JSON.stringify(pre_data_obj));
}




//Getting Keyboard Input
function user_type() {
	user_input_text = document.getElementById("UserInput_Textarea").value;
	if (user_input_text != "") {
		add_user_bubble(user_input_text);
		// console.log("User Input Text: " + user_input_text);
	}
	// console.log("click");
	updateUserText(user_input_text);
	if (total_dialogue > 3 && qualtrics_code !== '') {
		send_dinsaur();
	}
}

//When the user presses enter
document.getElementById("UserInput_Textarea").onkeypress = function(e) {
	if (!e) e = window.event;
	var keyCode = e.code || e.key;
	if (keyCode == "Enter") {
		user_type();
		document.getElementById("UserInput_Textarea").value = "";
		return false;
	}
};





function trimPrompt(txt) {
	txt_array = txt.split(" ");
	if (txt_array.length > 1000) {
		// console.log("trimming Prompt");
		prompt_start = txt_array.splice(0, 141).join(' ');
		prompt_end = txt_array.splice(-200).join(' ');
		return prompt_start + prompt_end
	}
	else {
		return txt
	}

}

