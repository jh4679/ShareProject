if (Meteor.isClient) {
	Meteor.subscribe('Jokes');
	Meteor.subscribe('Users');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
<<<<<<< HEAD
=======
	Meteor.subscribe('FileStore');
	Meteor.subscribe('UserFiles');
	Meteor.subscribe('posts');
>>>>>>> origin/master
}