// $(function(){

	$(document).ready(function(){
		$('#edit-form').hide();
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
			console.log(data);
			var $photo = data.results[0].user.picture.thumbnail;
			var $name = $('form.new').find('input[name="name"]').val();
			var $age = parseInt($('form.new').find('input[name="age"]').val());
			var $address = $('form.new').find('input[name="address"]').val();
			var $phone = $('form.new').find('input[name="phone"]').val();
			var $cat_id = parseInt($('form.new').find('option:selected').attr('id'));
			newContact( {name: $name, age: $age, address: $address, phone_number: $phone, picture: $photo, category_id: $cat_id} );
			$('form.new')[0].reset();
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
			console.log(data);
			renderCategory(data);
		});
	}

	//render the specific category to the DOM
	function renderCategory(data){
		$('.contacts').empty();
		var $h2 = $("<h2>" + data.name + "</h2>");
		$('.contacts').append($h2);
		for (var i=0; i<data.contacts.length; i++){
			var $contacts = $("<ul id=" + data.contacts[i].id + "></ul>");
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


	// gets one specific contact by ID
	function getContact(id){
		$.ajax({
			url: '/contacts/' + id,
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			console.log(data);
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
				$('form.edit')[0].reset();
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
			console.log(data);
			getCategory(data.category_id)
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
			console.log(data);
			getCategory(data.category_id)
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
