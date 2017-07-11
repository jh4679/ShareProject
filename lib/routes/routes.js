Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	// Jokes
	this.route('index', {
		path: '/',
		template: 'index'
	});

	this.route('jokes', {
		path: '/jokes',
		template: 'jokes'
	});

	this.route('files', {
		path: '/files',
		template: 'filestest'
	});

	// Login
	this.route('login', {
		path: '/login',
		template: 'login'
	});

	// Signup
	this.route('signup', {
		path: '/signup',
		template: 'signup'
	});

	// Profile
	this.route('profile', {
		path: '/profile',
		template: 'profile'
	});

	// Rankings
	this.route('rankings', {
		path: '/rankings',
		template: 'rankings'
	});

	// Search
	this.route('search', {
		path: '/search',
		template: 'search'
	});
});