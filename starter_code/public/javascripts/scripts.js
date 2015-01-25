// $(function(){

	//click event on View Contacts
	$('button').on('click', function(event){
		var $id = $(event.target).parent().attr('id');
		getCategory($id);
	});

	// $submitButton.on('click') function(event){
	// 	var name = ('input[name="name"]').val();
	// 	var age = ('input[name="age"]').val();
	// 	var address = ('input[name="address"]').val();
	// 	var photo = ('input[name="photo"]').val();

	// }


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
		console.log(data);
		var $h2 = data.name;
		var $contactsDiv = $("<div class=contacts></div>");
		$('body').append($contactsDiv);
		var $ul = $("<ul></ul>");
		$contactsDiv.append($ul);
		$ul.empty();
		for (var i=0; i < data.contacts; i++){
			var $img = $("<img src=" + data.contacts[i].picture + ">");
			var $name = $("<li>" + data.contacts[i].name + "/li>");
			var $age = $("<li>" + data.contacts[i].age + "</li>");
			var $address = $("<li>" + data.contacts[i].address + "</li>");
			var $phone = $("<li>" + data.contact[i].phone_number + "</li>");
			$ul.append($img, $name, $age, $address, $phone);
		}
		var $h3 = $("<h3>Add New Contact</h3>");
		var $nameInput = $("<input type='text' name='name' placeholder='Name'><br>");
		var $ageInput = $("<input type='text' name='age' placeholder='Age'><br>");
		var $addressInput = $("<input type='text' name='address' placeholder='Address'><br>");
		var $phoneInput = $("<input type='text' name='phone' placeholder='Phone'><br>");
		var $picInput = $("<input type='text' name='phone' placeholder='Photo'><br>");
		var $newContact = $("<div class='new-contacts'></div>");
		var $submitButton = $("<button>Submit</button>");
		$('body').append($newContact);
		$newContact.append($h3, $nameInput, $ageInput, $addressInput, $phoneInput, $picInput, $submitButton);
	}


	//gets all contacts
	function getContacts(){
		$.ajax({
			url: '/contacts',
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			console.log(data);
		});
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
	function newContact(name, age, address, phone_number, picture, category_id){
		$.ajax({
			url: '/contacts',
			type: 'POST',
			dataType: 'json',
			data: {name: name, age: age, address: address, phone_number: phone_number, picture: picture, category_id: category_id}
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
