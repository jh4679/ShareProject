Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	// Home
	this.route('home', {
		path: '/',
		template: 'home'
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

	// patient
	this.route('patient', {
		path: '/patient',
		template: 'patient'
	});
	//
	this.route('ether', {
		path: '/ether',
		template: 'ether'
	});

});