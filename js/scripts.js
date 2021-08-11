$(document).ready(function () {
	load_pets();
	$("body")
			.on("click", ".details_pet_open_modal", showPetDetailsModal)
			.on("click", ".edit_pet_open_modal", editPetDetailsModal)
			.on("submit","#add_pet_form",addPetAction)
			.on("submit","#edit_pet_form",updatePetAction);
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
 *   DOCU: Load the pet list in to the DOM
 *   Last updated at: July 27, 2021
 *   @author Ivan Christian Jay
 */
function load_pets() {
	let pets = ``;
	for (let i = 0; i < all_pets.length; i++) {
		pets += `<tr data-pet-id="${all_pets[i].id}">`;
		pets += `   <td class="pet_name">${all_pets[i].pet_name}</td>`;
		pets += `   <td class="pet_type">${all_pets[i].pet_type}</td>`;
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
 *   DOCU: Add pet to the pet list array
 *   Triggered by #add-pet-form on submit
 *   Last updated at: July 27, 2021
 *   @author Ivan Christian Jay
 */
function addPetAction(e) {
	let pet_name = $("#pet_name");
	let pet_type = $("#pet_type");
	if (pet_name.val() == "") {
		pet_name.addClass("form_shake");
		pet_name.css("border", "2px solid red");
		setTimeout(function () {
			pet_name.removeClass("form_shake");
		}, 1000);
	} else {
		pet_name.css("border", "none");
		$("#add_pet_to_shelter_modal").modal("hide");

		all_pets.unshift({
			id: all_pets.length + 1,
			pet_name: pet_name.val(),
			pet_type: pet_type.val(),
		});

		$(".toast").toast("show");
		$(".added_pet_name").html(pet_name.val());

		load_pets();
		pet_name.val("");
		pet_type.val($("#pet_type option:first").val());
	}
	return false;
}

/**
 *   DOCU: Show pet details when the user click details on a specific pet
 *   Triggered by details button (has a class of details-pet-open-modal)
 *   Last updated at: July 27, 2021
 *   @author Ivan Christian Jay
 */
function showPetDetailsModal(e) {
	e.preventDefault();
	let pet_id = $(this).parent().parent().data("petId");
	let selected_pet = all_pets.filter((pet) => pet.id == pet_id);
	let pet_name = $(".details_pet_modal").find(".pet_name");
	let pet_type = $(".details_pet_modal").find(".pet_type");
	pet_name.text(`${selected_pet[0].pet_name}`);
	pet_type.text(`${selected_pet[0].pet_type}`);
}

/**
 *   DOCU: Show pet details when the user click details on a specific pet
 *   Triggered by details button (has a class of details-pet-open-modal)
 *   Last updated at: July 27, 2021
 *   @author Ivan Christian Jay
 */
function editPetDetailsModal(e) {
	e.preventDefault();
	let pet_id = $(this).parent().parent().data("petId");
	let selected_pet = all_pets.filter((pet) => pet.id == pet_id);
	let pet_name = $(".edit_pet_modal").find(".pet_name");
	let pet_id_input = $(".edit_pet_modal").find(".pet_id");
	pet_name.text(`${selected_pet[0].pet_name}`);
	pet_id_input.val(selected_pet[0].id);
	$(`.edit_pet_modal`)
						.find(`.pet_type option:contains("${$(this).parent().siblings()[1].innerHTML}")`)
						.prop("selected", true);
}

/**
 *   DOCU: Update pet to the pet list array
 *   Triggered by #edit-pet-form on submit
 *   Last updated at: July 27, 2021
 *   @author Ivan Christian Jay
 */
function updatePetAction(e) {
	let pet_id_input_value = $(".pet_id").val();
	let pet_to_update = all_pets.findIndex((pet) => pet.id === parseInt(pet_id_input_value));
	let pet_type = $("#pet_type_edit").val();
	all_pets[pet_to_update].pet_type = pet_type;
	$(".edit_pet_modal").modal("hide");
	load_pets();
	return false;
}
