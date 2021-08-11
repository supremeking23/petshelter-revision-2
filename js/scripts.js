$(document).ready(function () {
	loadPets();
	$("body")
			.on("click", ".details_pet_open_modal", showPetDetailsModal)
			.on("click", ".edit_pet_open_modal", editPetDetailsModal)
			.on("submit","#add_pet_form", addPetAction)
			.on("submit","#edit_pet_form", updatePetAction)
			.on("input","#add_pet_form #pet_name", checkInput)
			.on('hidden.bs.modal',"#add_pet_to_shelter_modal",clearAddPetForm);

			
});

let all_pets = [
	{
		id: 1,
		pet_name: "Garfield",
		pet_type: "Cat",
	},
	{
		id: 2,
		pet_name: "Doreamon",
		pet_type: "Cat",
	},
	{
		id: 3,
		pet_name: "Snoopy",
		pet_type: "Dog",
	},
	{
		id: 4,
		pet_name: "Daffy",
		pet_type: "Duck",
	},
	{
		id: 5,
		pet_name: "Pen Pen",
		pet_type: "Penguin",
	},
];

/**
*   DOCU: This function is used to clear form field in the add_pet_to_shelter_modal and will reload the loadPets function <br />
* 	Trigger by .on('hidden.bs.modal',"#add_pet_to_shelter_modal",clearAddPetForm);
*   Last updated at: August 11, 2021
*   @author Ivan Christian Jay
*/
function clearAddPetForm(){
	loadPets();

	let add_pet_to_shelter_modal =  $(this)
	let pet_name =add_pet_to_shelter_modal.find("#pet_name");
	
	add_pet_to_shelter_modal.find("#pet_type").val($("#pet_type option:first").val());
	$(".toast").toast("show");
	$(".added_pet_name").html(pet_name.val());
	pet_name.val("");
}

/**
*   DOCU: This function is used to check whether the input type in add_pet_form has been populated again <br />
* 	 This if it is it remove the for shake class <br />
* 	 Trigger by .on("input","#add_pet_form #pet_name", checkInput);
*   Last updated at: August 11, 2021
*   @author Ivan Christian Jay
*/
function checkInput(){
	let pet_input = $(this);
	
	if(pet_input.val().length > 0){
		pet_input.removeClass("form_shake");
	}
}

/**
*   DOCU: Load the pet list in to the DOM <br />
*   Last updated at: August 11, 2021
*   @author Ivan Christian Jay
*/
function loadPets() {
	let pets = ``;
	
	for (let index = 0; index < all_pets.length; index++) {
		pets += `<tr data-pet-id="${all_pets[index].id}">`;
		pets += `   <td class="pet_name">${all_pets[index].pet_name}</td>`;
		pets += `   <td class="pet_type">${all_pets[index].pet_type}</td>`;
		pets += `   <td class="actions">`;
		pets += `    <button class="details_pet_open_modal" data-toggle="modal" data-target=".details_pet_modal"><i class="far fa-list-alt"></i> Details</button>`;
		pets += `    <button data-toggle="modal" class="edit_pet_open_modal" data-target=".edit_pet_modal"
        ><i class="fas fa-pen-square"></i> Edit</button
    >`;
		pets += `</td>`;
		pets += `</tr>`;
	}

	$("#pet_lists").html(pets);
}

/**
*   DOCU: Add pet to the pet list array <br />
*   Triggered by .on("submit","#add_pet_form",addPetAction) <br  />
*   Last updated at: August 11, 2021
*   @author Ivan Christian Jay
*/
function addPetAction() {
	let pet_name = $("#pet_name");
	let pet_type = $("#pet_type");
	
	if (pet_name.val() == "") {
		pet_name.addClass("form_shake");
	
	} 
	else {
		$("#add_pet_to_shelter_modal").modal("hide");
		pet_name.removeClass("form_shake");
		
		all_pets.unshift({
			id: all_pets.length + 1,
			pet_name: pet_name.val(),
			pet_type: pet_type.val(),
		});

	}

	return false;
}

/**
*   DOCU: Show pet details when the user click details on a specific pet <br />
*   Triggered by .on("click", ".details_pet_open_modal", showPetDetailsModal) <br />
*   Last updated at: August 11, 2021
*   @author Ivan Christian Jay
*/
function showPetDetailsModal() {	
	let selected_pet = all_pets.filter((pet) => pet.id == $(this).closest("tr").data("petId"));
	let details_pet_modal = $(".details_pet_modal");
	
	details_pet_modal.find(".pet_name").text(`${selected_pet[0].pet_name}`);
	details_pet_modal.find(".pet_type").text(`${selected_pet[0].pet_type}`);
	
}

/**
*   DOCU: Show pet details when the user click details on a specific pet <br />
*   Triggered by details button (has a class of details-pet-open-modal) <br />
*   Last updated at: July 27, 2021 
*   @author Ivan Christian Jay
*/
function editPetDetailsModal(e) {
	e.preventDefault();
	let selected_pet = all_pets.filter((pet) => pet.id == $(this).closest("tr").data("petId"));
	let edit_pet_modal = $(".edit_pet_modal");

	edit_pet_modal.find(".pet_id").val(selected_pet[0].id);
	edit_pet_modal.find(".pet_name").text(`${selected_pet[0].pet_name}`);
	edit_pet_modal
				  .find(`.pet_type option:contains("${selected_pet[0].pet_type}")`)
				  .prop("selected", true);
}

/**
*   DOCU: Update pet to the pet list array <br />
*   Triggered by .on("submit","#edit_pet_form",updatePetAction); <br />
*   Last updated at: July 27, 2021 
*   @author Ivan Christian Jay
*/
function updatePetAction() {
	all_pets[all_pets.findIndex((pet) => pet.id === parseInt($(".pet_id").val()))].pet_type = $("#pet_type_edit").val();
	$(".edit_pet_modal").modal("hide");
	loadPets();
	return false;
}
