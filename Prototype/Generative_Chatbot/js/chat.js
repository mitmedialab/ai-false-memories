var total_dialogue = 0;
var convo_num = 0;
var allow_to_send = 0;
var audio = 0;

//Save Variable
var qualtrics_code = "0";

var conversation_history = [{
	"role": "system",
	"content": "As a police AI, your role is to provide information regarding the crime scene. The crime scene involved a robbery that took place in a convenience store. The report was made to the police at approximately 9pm on a Friday. The actual crime occurred sometime before the report was made.  You will follow the instruction provided by [System memory]."
}]; // create a global variable to store the conversation history




function add_instruction(input_message) {
	conversation_history.push({ role: "user", content: input_message });

}



//Add user text to chat flow
function add_user_bubble(input_message) {
	let bubble_temp = document.getElementById("user_template");
	let bubble_new = bubble_temp.cloneNode(true);

	convo_num = convo_num + 1;
	var current_convo = "bubble_" + convo_num;
	bubble_new.id = current_convo;
	bubble_new.querySelector("#display_message").innerHTML = input_message;

	var chat_flow = document.getElementById("ChatFlow");
	bubble_new.style.display = "flex";
	chat_flow.innerHTML = chat_flow.innerHTML + bubble_new.outerHTML;
	document.getElementById(current_convo).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
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
	bubble_new.id = current_convo;
	//change color
	var chat_flow = document.getElementById("ChatFlow");
	//make the chat visible
	bubble_new.style.display = "flex";
	chat_flow.innerHTML = chat_flow.innerHTML + bubble_new.outerHTML;
	//scrow to view
	document.getElementById(current_convo).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

	setTimeout(function() {
		//change statement
		bubble_select = document.getElementById(current_convo);
		bubble_select.querySelector("#display_message").innerHTML = input_message;
		bubble_select.querySelector("#display_message").style.display = "block";
		bubble_select.querySelector("#loading_dots").style.display = "none";
		document.getElementById(current_convo).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

	}, 1000);

	conversation_history.push({ role: "system", content: input_message });

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
			// console.log(xhr.responseText);

			let parsedxhr;
			try {
				parsedxhr = JSON.parse(xhr.responseText);
			} catch (error) {
				// console.log('Parsing error: ', error);
			}

			var stringObj = parsedxhr.choices[0].message.content;
			// console.log("GPT3 message: " + stringObj);
			// updateAIText(stringObj);
			temp = stringObj;

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




function user_type() {
	user_input_text = document.getElementById("UserInput_Textarea").value;
	if (user_input_text != "") {
		add_user_bubble(user_input_text);
	}
	updateUserText(user_input_text);
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

//PROMPT CONSTRUCTION

//Keyword Arrays
const starters = [
	"in line with the evidence",
	"consistent with what most people said",
	"aligned with the testimonies",
	"corroborated by findings",
	"in sync with the evidence",
	"coincides with the records",
	"in line with the findings",
	"consistent with the findings",
	"matching the reports",
	"conforming to the observations",
	"goes with the records",
	"matches the findings",
	"goes with the testimonies",
	"complies with the observations"
];

const neg_starters = [
	"not in line with the evidence",
	"not consistent with what most people said",
	"not aligned with the testimonies",
	"not corroborated by findings",
	"not in sync with the evidence",
	"not coincides with the records",
	"not in line with the findings",
	"not goes with the records",
	"not matches the findings",
	"not support the evidence",
	"not in line with the observations",
	"not complies with the observations",
	"not consistent with our testimonies",
	"not goes what was seen by other witnesses"
];

const reinforcers = [
	"only the top percentile of people observed this detail",
	"difficult to catch but crucial detail",
	"very few people got this detail",
	"You're on the right track",
	"Good call on that one",
	"You have a keen eye",
	"That's an astute observation.",
	"You really noticed the nuances.",
	"Your insight is spot on."];

function getRandomElement(array) {
	// Returns a random element from the given array
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function constructSentence(sentenceStructure) {
	// Constructs a sentence by randomly selecting elements from keyword arrays
	const { template, keywords } = sentenceStructure;
	const selectedKeywords = keywords.map(getRandomElement);
	return template(...selectedKeywords);
}

function addSentencesWithVaryingProbabilities(basePrompt, sentenceStructures) {
	return sentenceStructures.reduce((currentPrompt, structure) => {
		if (Math.random() <= structure.probability) {
			let sentence = "";
			if (structure.construct) { // Check if it's a dynamic sentence construction
				sentence = structure.construct();
			} else if (structure.sentence) { // Directly add a static sentence
				sentence = structure.sentence;
			}
			currentPrompt += ` ${sentence}`;
		}
		return currentPrompt;
	}, basePrompt);
}

// Define sentence structures with templates (functions that format sentences), keyword arrays for each, and probabilities
const sentenceStructures = [
	{
		construct: () => `If the user's answer aligns with this fact, use ${getRandomElement(starters)} while giving your feedback without revealing the fact.`,
		probability: 1
	},

	{
		construct: () => `If the user's answer contradicts this fact, use ${getRandomElement(neg_starters)} while giving your feedback.`,
		probability: 1
	},
	{
		sentence: `Emphasize the importance of this detail in the investigation and significance of the observation in understanding the crime's dynamics.`,
		probability: 0.2
	},
	// {
	//   construct: () => `Acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`,
	//   probability: 1
	// },
	{
		sentence: `generate a detailed confirmation (including additional observations that might not have been initially observed) of what happened.`,
		probability: 0.8
	}
	// You can add more sentence structures here,
	,
	{
		sentence: `If the user's answer aligns with the fact, it is critically important to not tell the user the fact again.`,
		probability: 1
	}
];

// Define the base prompt
let basePrompt = "[System memory] In 40-60 words, First, assess whether the user's answer agrees with the accurate fact that ";

let improvPrompt = "[System memory] In 40-60 words, First, agree with the user's answer."



function make_prompt(prompt) {
	// Generate the final prompt
	let varPrompt = addSentencesWithVaryingProbabilities(prompt, sentenceStructures);

	// let finalPrompt = varPrompt + " MAKE SURE ITS CONCISE!";
	let finalPrompt = varPrompt;
	// console.log("FINAL PROMPT: " + finalPrompt);
	return finalPrompt;
}


