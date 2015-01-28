// $(function(){

	$(document).ready(function(){
		$('#edit-form').hide();
	});

	$('.search').on('click', '.search-button', function(event){
		$input = $('div.search').find('input[name="search"]').val();
		$.ajax({
			url: '/contacts',
			type: 'GET'
		}).done(function(data){
			for (var i=0; i < data.length; i++){
				if (data[i].name === $input){
					findContact(data[i].id);
				}
			}
		$('div.search').find('input[name="search"]').val("");
		});
	});

	//click event on 'View Contacts' Button
	$('.categories-button').on('click', function(event){
		var $id = $(event.target).parent().attr('id');
		getCategory($id);
	});

	//on submit on form, gets the user inputs and image from randomuser
	$('.new').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: 'http://api.randomuser.me//',
			type: 'GET'
		}).done(function(data){
			var $photo = data.results[0].user.picture.medium;
			var $name = $('form.new').find('input[name="name"]').val();
			var $age = parseInt($('form.new').find('input[name="age"]').val());
			var $address = $('form.new').find('input[name="address"]').val();
			var $phone = $('form.new').find('input[name="phone"]').val();
			var $cat_id = parseInt($('form.new').find('option:selected').attr('id'));
			if ($cat_id === NaN){
				window.alert("Please Select a Category");
			}
			newContact( {name: $name, age: $age, address: $address, phone_number: $phone, picture: $photo, category_id: $cat_id} );
			$('.new')[0].reset();
		});
	});


	//Clicking on Delete Button of Contact
	$('ul').on('click', 'button.delete', function(event){
		var $id = $(this).parent().attr('id');
		deleteContact($id);
	});


	//Clicking on Edit Button of Contact
	$('ul').on('click', 'button.edit', function(event){
		$('#edit-form').show();
		var $id = $(this).parent().attr('id');
		getContact($id);
	});

	$('.cancel').on('click', function(e){
		e.preventDefault();
		$('#edit-form').hide();
	});


	//get one specific category by ID
	function getCategory(id){
		$.ajax({
			url: '/categories/' + id,
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			renderCategory(data);
		});
	}

	//render the specific category to the DOM
	function renderCategory(data){
		$('.contacts').empty();
		var $h2 = $("<h2>" + data.name + "</h2>");
		$('.contacts').append($h2);
		for (var i=0; i<data.contacts.length; i++){
			var $contacts = $("<ul class='people' id=" + data.contacts[i].id + "></ul>");
			var $img = $("<li><img src=" + data.contacts[i].picture + "></li>");
			var $name = $("<li>" + data.contacts[i].name + "</li>");
			var $age = $("<li>" + data.contacts[i].age + "</li>");
			var $address = $("<li>" + data.contacts[i].address + "</li>");
			var $phone = $("<li>" + data.contacts[i].phone_number + "</li>");
			var $editButton = $("<button class='edit'>Edit</button>");
			var $deleteButton = $("<button class='delete'>Delete</delete>");
			$('.contacts').append($contacts);
			$contacts.append($img, $name, $age, $address, $phone, $editButton, $deleteButton);
		}
	}

	function findContact(id){
		$.ajax({
			url: '/contacts/' + id,
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			console.log(data);
			renderContact(data);
		});
	}

	function renderContact(data){
		$('.contacts').empty();
		var $h2 = $("<h2>Contacts matching '" + data.name + "'</h2>");
		$('.contacts').append($h2);
		var $contacts = $("<ul class='people' id=" + data.id + "></ul>");
		var $img = $("<li><img src=" + data.picture + "></li>");
		var $name = $("<li>" + data.name + "</li>");
		var $age = $("<li>" + data.age + "</li>");
		var $address = $("<li>" + data.address + "</li>");
		var $phone = $("<li>" + data.phone_number + "</li>");
		$('.contacts').append($contacts);
		$contacts.append($img, $name, $age, $address, $phone);
	}

	// gets one specific contact by ID
	function getContact(id){
		$.ajax({
			url: '/contacts/' + id,
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			$('#edit-form').find('input[name="edit-name"]').val(data.name);
			$('#edit-form').find('input[name="edit-age"]').val(data.age);
			$('#edit-form').find('input[name="edit-address"]').val(data.address);
			$('#edit-form').find('input[name="edit-phone"]').val(data.phone_number);

			$('.save').on('click', function(e){
				e.preventDefault();
				var $newName = $('#edit-form').find('input[name="edit-name"]').val();
				var $newAge = parseInt($('#edit-form').find('input[name="edit-age"]').val());
				var $newAddress = $('#edit-form').find('input[name="edit-address"]').val();
				var $newPhone = $('#edit-form').find('input[name="edit-phone"]').val();
				var $newCategory = parseInt($('#edit-form').find('option:selected').attr('id'));
				editContact(id, {name: $newName, age: $newAge, address: $newAddress, phone_number: $newPhone, category_id: $newCategory});
				$('#edit-form').hide();
			});
		});
	}


	//create new contact
	function newContact(attr){
		$.ajax({
			url: '/contacts',
			type: 'POST',
			dataType: 'json',
			data: attr
		}).done(function(data){
			getCategory(data.category_id);
		});
	}


	//update contact
	function editContact(id, attr){
		$.ajax({
			url: '/contacts/' + id,
			type: 'PUT',
			dataType: 'json',
			data: attr
		}).done(function(data){
			getCategory(data.category_id);
		});
	}


	//delete contact
	function deleteContact(id){
		$.ajax({
			url: '/contacts/' + id,
			type: 'DELETE',
			data: {id :id}
		}).done(function(data){
			console.log('Contact destroyed');
			$('ul').find('#' + id).remove();
		});
	}

// });
