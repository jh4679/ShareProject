if (Meteor.isClient) {
	Meteor.subscribe('Jokes');
	Meteor.subscribe('Users');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
	Meteor.subscribe('FileStore');
	Meteor.subscribe('UserFiles');
	Meteor.subscribe('posts');
	Meteor.subscribe('comments');
}