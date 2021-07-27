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

function load_pets() {
	let pets = ``;
	for (let i = 0; i < all_pets.length; i++) {
		pets += `<tr>`;
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

$(document).ready(function () {
	load_pets();

	$("#add-pet-form").submit(addPetAction);
});

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

		pet_name.val("");
		pet_type.val($("#pet-type option:first").val());
		load_pets();
	}
	return false;
}
