$(function(){

	//click event on 'View Contacts' Button
	$('.categories-button').on('click', function(event){
		var $id = $(event.target).parent().attr('id');
		getCategory($id);
	});

	//on submit on form, gets the user inputs and image from randomuser
	$('form').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: 'http://api.randomuser.me//',
			type: 'GET'
		}).done(function(data){
			console.log(data);
			var $photo = data.results[0].user.picture.thumbnail;
			var $name = $('form').find('input[name="name"]').val();
			var $age = parseInt($('form').find('input[name="age"]').val());
			var $address = $('form').find('input[name="address"]').val();
			var $phone = $('form').find('input[name="phone"]').val();
			var $cat_id = parseInt($('form').find('option:selected').attr('id'));
			newContact( {name: $name, age: $age, address: $address, phone_number: $phone, picture: $photo, category_id: $cat_id} );
			$('form')[0].reset();
		});
	});

	$('ul').on('click', 'button.delete', function(event){
		var $id = $(this).parent().attr('id');
		deleteContact($id);
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
			// var $ul = $("<ul></ul>");
			var $img = $("<li><img src=" + data.contacts[i].picture + "></li>");
			var $name = $("<li>" + data.contacts[i].name + "</li>");
			var $age = $("<li>" + data.contacts[i].age + "</li>");
			var $address = $("<li>" + data.contacts[i].address + "</li>");
			var $phone = $("<li>" + data.contacts[i].phone_number + "</li>");
			var $editButton = $("<button class='edit'>Edit</button>");
			var $deleteButton = $("<button class='delete'>Delete</delete>");
			$('.contacts').append($contacts);
			// $contacts.append($ul);
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
		});
	}


	//update contact
	function editContact(id){
		$.ajax({
			url: '/contacts/' + id,
			type: 'PUT',
			dataType: 'json',
			data: {id: id}
		}).done(function(data){
			console.log(data);
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

});
