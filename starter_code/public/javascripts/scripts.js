// $(function(){

	//gets all categories
	function getCategories(){
		$.ajax({
			url: '/categories',
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			console.log(data);
		});
	}


	//get one specific category by ID
	function getCategory(id){
		$.ajax({
			url: '/categories/' + id,
			type: 'GET',
			dataType: 'json'
		}).done(function(data){
			console.log(data);
		});
	}


	//create new category
	function newCategory(name){
		$.ajax({
			url: '/categories',
			type: 'POST',
			dataType: 'json',
			data: {name: name}
		}).done(function(data){
			console.log(data);
		});
	}


	//update category
	function editCategory(id){
		$.ajax({
			url: '/categories/' + id,
			type: 'PUT',
			dataType: 'json',
			data: {id: id}
		}).done(function(data){
			console.log(data);
		});
	}


	//delete category
	function deleteCategory(id){
		$.ajax({
			url: '/categories/' + id,
			type: 'DELETE',
			data: {id: id}
		}).done(function(data){
			console.log('category destroyed');
		});
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

	getCategories();

	getContacts();

// });
