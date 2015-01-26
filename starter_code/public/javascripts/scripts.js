// $(function(){

	//click event on 'View Contacts' Button
	$('.categories-button').on('click', function(event){
		var $id = $(event.target).parent().attr('id');
		getCategory($id);
	});

	$('form').on('submit', function(e){
		e.preventDefault();
		var $name = $(this).find('input[name="name"]').val();
		var $age = parseInt($(this).find('input[name="age"]').val());
		var $address = $(this).find('input[name="address"]').val();
		var $phone = $(this).find('input[name="phone"]').val();
		var $photo = $(this).find('input[name="photo"]').val();
		var $cat_id = parseInt($(this).find('option:selected').attr('id'));
		debugger
		newContact( {name: $name, age: $age, address: $address, phone_number: $phone, picture: $photo, category_id: $cat_id} );
		this.reset();
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
		$('.contacts-div').empty();
		var $h2 = $("<h2>" + data.name + "</h2>");
		$('.contacts-div').append($h2);
		for (var i=0; i<data.contacts.length; i++){
			var $contacts = $("<div class='contacts' id=" + data.contacts[i].id + "></div>");
			var $ul = $("<ul></ul>");
			var $img = $("<li><img src=" + data.contacts[i].picture + "></li>");
			var $name = $("<li>" + data.contacts[i].name + "</li>");
			var $age = $("<li>" + data.contacts[i].age + "</li>");
			var $address = $("<li>" + data.contacts[i].address + "</li>");
			var $phone = $("<li>" + data.contacts[i].phone_number + "</li>");
			var $editButton = $("<button>Edit</button>");
			var $deleteButton = $("<button>Delete</delete>");
			$('.contacts-div').append($contacts);
			$contacts.append($ul);
			$ul.append($img, $name, $age, $address, $phone, $editButton, $deleteButton);
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
	//connecting to random user and getting info
	function randomUser(){
		$.ajax({
			url: 'http://api.randomuser.me//',
			type: 'GET'
		}).done(function(data){
			console.log(data);
			var $photo = data.results[0].user.picture.medium;
		});
	}

	randomUser();

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
		});
	}

// });
