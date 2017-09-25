if (Meteor.isServer) {
	
	Meteor.publish('Jokes', function() {
		if(!this.userId){
			return false;
			throw new Meteor.Error('not authorized');
		} else {
			return Jokes.find();
		}
	});

	Meteor.publish('Users', function() {
		if(!this.userId){
			return false;
			throw new Meteor.Error('not authorized');
		} else {
			return Meteor.users.find();
		}
	});

	Meteor.publish("ProfileImages", function(){
		return ProfileImages.find();
	});

	Meteor.publish("UserImages", function(){
		return UserImages.find();
	});

<<<<<<< HEAD
=======
	Meteor.publish("FileStore", function(){
		return FileStore.find();
	});

	Meteor.publish("UserFiles", function(){
		
		return UserFiles.find();
		
	});

	Meteor.publish('posts', function() {
	 	 return Posts.find();
	});


>>>>>>> origin/master
}