const all_pets = [
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
		pets += `   <td class="pet-name">${all_pets[i].pet_name}</td>`;
		pets += `   <td class="pet-type">${all_pets[i].pet_type}</td>`;
		pets += `   <td class="actions">`;
		pets += `    <a href="#" role="button" class="details-pet-open-modal" data-toggle="modal" data-target=".details-pet-modal"><i class="far fa-list-alt"></i> Details</a>`;
		pets += `    <a href="#" role="button" data-toggle="modal" class="edit-pet-open-modal" data-target=".edit-pet-modal"
        ><i class="fas fa-pen-square"></i> Edit</a
    >`;
		pets += `</td>`;
		pets += `</tr>`;
	}
	$("#pet-lists").html(pets);
}

/**
 *   DOCU: Add pet to the pet list array
 *   Triggered by #add-pet-form on submit
 *   Last updated at: July 27, 2021
 *   @author Ivan Christian Jay
 */
function addPetAction(e) {
	let pet_name = $("#pet-name");
	let pet_type = $("#pet-type");
	if (pet_name.val() == "") {
		pet_name.addClass("form-shake");
		pet_name.css("border", "2px solid red");
		setTimeout(function () {
			pet_name.removeClass("form-shake");
		}, 1000);
	} else {
		pet_name.css("border", "none");
		$("#add-pet-to-shelter-modal").modal("hide");

		all_pets.unshift({
			id: all_pets.length + 1,
			pet_name: pet_name.val(),
			pet_type: pet_type.val(),
		});

		$(".toast").toast("show");
		$(".added-pet-name").html(pet_name.val());

		load_pets();
		pet_name.val("");
		pet_type.val($("#pet-type option:first").val());
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
	let pet_name = $(".details-pet-modal").find(".pet-name");
	let pet_type = $(".details-pet-modal").find(".pet-type");
	pet_name.text(`${selected_pet[0].pet_name}`);
	pet_type.text(`${selected_pet[0].pet_type}`);
}

$(document).ready(function () {
	load_pets();
	$("#add-pet-form").submit(addPetAction);
	$(document).on("click", ".details-pet-open-modal", showPetDetailsModal);
});
