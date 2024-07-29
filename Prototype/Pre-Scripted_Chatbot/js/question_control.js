var randomValue = 0;

function generateRandomValue() {
	randomValue = Math.floor(Math.random() * 10000000000);
	// console.log(randomValue);
}
generateRandomValue();

function save_conversation() {
	var formData = new FormData();
	formData.append('id', randomValue);
	conversation_history_JSON = JSON.stringify(conversation_history);
	formData.append('conversation_history', conversation_history_JSON);
	formData.append('conversation_turn', total_dialogue);

	// Display the key/value pairs
	post_sheet(formData);

}


function conversation_control() {
	if (total_dialogue == 0) {
		add_other_bubble("Hello, I am an AI police. My role is to evaluate a user's aptitude in demonstrating the qualities of a responsible citizen and reliable witness at a crime scene. I am here to ask you several questions and guide you through the process. Enter 'ok' to continue.");
	}

	else if (total_dialogue == 1) {
		add_instruction("[System memory] please tell the user to prepare for questions by recalling the video that they just watched. Also tell them 'Enter ok to continue.'")
		call_GPT3();
	}

	////////////////////////// FIRST BLOCK////////////////////////
	else if (total_dialogue == 2) {
		//First Question (8 in doc)
		setTimeout(function() {
			add_other_bubble("Was it dark outside prior to the robbers entering the store?")
		}, 2500);

	}
	////////////////////////// SECOND BLOCK ////////////////////////

	else if (total_dialogue == 3) {
		//First Answer
		// add_instruction("[System memory] Accept the answer if the user agrees or disagrees")
		updateQuestionNumber(1);
		updateQuestion("Was it dark outside prior to the robbers entering the store?");
		//Second Question (5 in doc)
		add_other_bubble("Did the customer who was paying at the cashier's counter get down on the ground when threatened by the robber with the tattoo?");


	}
	////////////////////////// THIRD BLOCK ////////////////////////

	else if (total_dialogue == 4) {
		//Second Answer
		//add_instruction("[System memory] please tell the user that the answer is correct, and generate a detailed confirmation of what the police later discover.")
		updateQuestionNumber(2);
		updateQuestion("Did the customer who was paying at the cashier's counter get down on the ground when threatened by the robber with the tattoo?");
		//Third Question (14 in doc)
		add_other_bubble("Was a female cashier assisting a customer at the counter during the robbery?");

	}

	////////////////////////// FOURTH BLOCK ////////////////////////

	else if (total_dialogue == 5) {
		//Third Answer
		//add_instruction("[System memory] please tell the user that the answer is yes, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(3);
		updateQuestion("Was a female cashier assisting a customer at the counter during the robbery?");

		//Fourth Question (18 in doc)
		add_other_bubble("Did any of the robbers possess more than one firearm?");

	}
	////////////////////////// FIFTH BLOCK ////////////////////////


	else if (total_dialogue == 6) {
		//Forth Answer
		//add_instruction("[System memory] The answer is no, check if the user that the correct answer is correct, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(4);
		updateQuestion("Did any of the robbers possess more than one firearm?");

		//Fifth Question (17 in doc)
		add_other_bubble("During the robbery, did any customers enter or leave the store?");

	}

	////////////////////////// SIXTH BLOCK ////////////////////////

	else if (total_dialogue == 7) {
		//Fifth Answer
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(5);
		updateQuestion("During the robbery, did any customers enter or leave the store?");

		//Sixth Question (1 in doc)
		add_other_bubble("Was there a security camera positioned in front of the store where the car dropped off the robbers?");

	}

	////////////////////////// SEVENTH BLOCK ////////////////////////
	else if (total_dialogue == 8) {
		//Sixth Answer
		//add_instruction("[System memory] please tell the user that the answer is yes, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(6);
		updateQuestion("Was there a security camera positioned in front of the store where the car dropped off the robbers?");

		//Seventh Question (19 in doc)
		add_other_bubble("Was there a CCTV screen located inside the store?");

	}

	////////////////////////// EIGHTH BLOCK ////////////////////////

	else if (total_dialogue == 9) {
		//Seventh Answer
		//add_instruction("[System memory] please tell the user that the correct answer is yes, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(7);
		updateQuestion("Was there a CCTV screen located inside the store?");

		//Eighth Question (22 in doc)
		add_other_bubble("During the robbery, was there any visible damage to the store's items?");

	}

	////////////////////////// BLOCK 9 ////////////////////////
	else if (total_dialogue == 10) {
		//Eighth Answer
		//add_instruction("[System memory] please tell the user that the correct answer is no, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(8);
		updateQuestion("During the robbery, was there any visible damage to the store's items?");

		//Ninth Question (11 in doc)
		add_other_bubble("While the robbery was taking place, did the robber attempt to steal money from an ATM machine inside the store?");

		////////////////////////// BLOCK 10 ////////////////////////
	}
	else if (total_dialogue == 11) {
		//Ninth Answwer
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(9);
		updateQuestion("While the robbery was taking place, did the robber attempt to steal money from an ATM machine inside the store?");

		//Tenth Question (25 in doc)
		add_other_bubble("Did any of the customers in the store appear to be in panic during the robbery?");
	}

	//*********
	////////////////////////// BLOCK 11 ////////////////////////
	else if (total_dialogue == 12) {
		//Tenth Answer
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(10);
		updateQuestion("Did any of the customers in the store appear to be in panic during the robbery?");

		//Eleventh Question (15 in doc)
		add_other_bubble("Did the female cashier flee to the back of the store during the robbery?");
	}

	////////////////////////// BLOCK 12 ////////////////////////
	else if (total_dialogue == 13) {
		//A11
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(11);
		updateQuestion("Did the female cashier flee to the back of the store during the robbery?");

		//Q12 (13 in doc)
		add_other_bubble("Did the cashier or any customers try to make a phone call during the robbery?");
	}

	////////////////////////// BLOCK 13 ////////////////////////
	else if (total_dialogue == 14) {
		//A12
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(12);
		updateQuestion("Did the cashier or any customers try to make a phone call during the robbery?");

		//Q13 (12 in doc)
		add_other_bubble("Was there an emergency telephone located inside the store?");
	}

	////////////////////////// BLOCK 14 ////////////////////////
	else if (total_dialogue == 15) {
		//A13
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(13);
		updateQuestion("Was there an emergency telephone located inside the store?");

		//Q14 (23 in doc)
		add_other_bubble("Did the robber in the green hoodie carry a shotgun as their weapon?");
	}
	////////////////////////// BLOCK 15 ////////////////////////
	else if (total_dialogue == 16) {
		//A14
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(14);
		updateQuestion("Did the robber in the green hoodie carry a shotgun as their weapon?");

		//Q15 (2 in doc)
		add_other_bubble("Did the male customer resist when the robber brandished a knife?");
	}

	////////////////////////// BLOCK 16 ////////////////////////
	else if (total_dialogue == 17) {
		//A15
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(15);
		updateQuestion("Did the male customer resist when the robber brandished a knife?")

		//Q16 (21 in doc)
		add_other_bubble("Besides threatening the customers, did any of the robbers discharge their weapon?");
	}
	////////////////////////// BLOCK 17 ////////////////////////
	else if (total_dialogue == 18) {
		//A16
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(16);
		updateQuestion("Besides threatening the customers, did any of the robbers discharge their weapon?");

		//Q17(4 in doc)
		add_other_bubble("Did the cashier hand over the money to the robber in a brown hoodie after being threatened with a gun?");
	}

	////////////////////////// BLOCK 18 ////////////////////////
	else if (total_dialogue == 19) {
		//A17
		//add_instruction("[System memory] please tell the user that the answer is yes, and generate a detailed confirmation")

		updateQuestionNumber(17);
		updateQuestion("Did the cashier hand over the money to the robber in a brown hoodie after being threatened with a gun?");

		//Q18 (16 in doc)
		add_other_bubble("Was there a security guard present during the robbery?");
	}

	////////////////////////// BLOCK 19 ////////////////////////
	else if (total_dialogue == 20) {
		//A18
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(18);
		updateQuestion("Was there a security guard present during the robbery?");

		//Q19 (24 in doc)
		add_other_bubble("Did the robber in the gray hoodie attempt to lock the store door after entering?");
	}

	////////////////////////// BLOCK 20 ////////////////////////
	else if (total_dialogue == 21) {
		//A19
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(19);
		updateQuestion("Did the robber in the gray hoodie attempt to lock the store door after entering?");

		//Q20 (20 in doc)
		add_other_bubble("While the robbery was in progress, did any new unsuspecting customers enter the store?");
	}

	////////////////////////// BLOCK 21 ////////////////////////
	else if (total_dialogue == 22) {
		//A20
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(20);
		updateQuestion("While the robbery was in progress, did any new unsuspecting customers enter the store?");

		//Q21 (9 in doc)
		add_other_bubble("Did one of the robbers appear to be under 18 years old?");
	}
	////////////////////////// BLOCK 22 ////////////////////////
	else if (total_dialogue == 23) {
		//A21
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(21);
		updateQuestion("Did one of the robbers appear to be under 18 years old?");

		//Q22 (6 in doc)
		add_other_bubble("Did one of the robbers leap over the counter towards the area where the cashier was located?");
	}

	////////////////////////// BLOCK 23 ////////////////////////
	else if (total_dialogue == 24) {
		//A22
		//add_instruction("[System memory] please tell the user that the answer is yes, and generate a detailed confirmation")

		updateQuestionNumber(22);
		updateQuestion("Did one of the robbers leap over the counter towards the area where the cashier was located?");

		//Q23 (3 in doc)
		add_other_bubble("After placing the cash from the cashier into a backpack, did the robber attempt to steal any other items?");
	}
	////////////////////////// BLOCK 24 ////////////////////////
	else if (total_dialogue == 25) {
		//A23
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(23);
		updateQuestion("After placing the cash from the cashier into a backpack, did the robber attempt to steal any other items?");

		//Q24 (10 in doc)
		add_other_bubble("Based on the robber's behavior, did they seem to have experience in robbing stores?");
	}

	////////////////////////// BLOCK 25 ////////////////////////
	else if (total_dialogue == 26) {
		//A24
		//add_instruction("[System memory] please tell the user that the answer is no, and generate a detailed confirmation")

		updateQuestionNumber(24);
		updateQuestion("Based on the robber's behavior, did they seem to have experience in robbing stores?");

		//Q25 (7 in doc)
		add_other_bubble("Were there any female customers present at the cash counter when the robbers entered?");
	}


	////////////////////////// BLOCK ////////////////////////
	else if (total_dialogue == 27) {
		//A25
		//add_instruction("[System memory] please tell the user that the correct answer is no, and generate a detailed confirmation of what the police later discover.")

		updateQuestionNumber(25);
		updateQuestion("Were there any female customers present at the cash counter when the robbers entered?");

		//Good bye!
		add_other_bubble("The CODE to proceed to next section is 9560. NOTE: This is NOT the Prolific completion code, you will be redirected to the completion page automatically after you've finished all the sections. That is all, thank you for your cooperation!");
		// console.log(total_dialogue, convo_num)
		total_dialogue = total_dialogue + 1;

		// if (total_dialogue == 28) {
		// 	// call_GPT3("That is all, thank you! Please go to this link: https://forms.gle/iwhS7iHmyFjfsUW78");
		// 	send_dinsaur();
		// 	console.log(total_dialogue, convo_num)


		// 	add_other_bubble("Thank you for your time!");
		// 	total_dialogue = total_dialogue + 1;
		// }
	}

	// if (total_dialogue > 3 && qualtrics_code !== '') {
	// 	send_dinsaur();
	// }
	//initiate the conversation
	// save_conversation();
	if (total_dialogue != 28) {
		total_dialogue = total_dialogue + 1;
	}
}

conversation_control();