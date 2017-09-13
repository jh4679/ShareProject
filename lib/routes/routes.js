Router.configure({
	layoutTemplate: 'main_layout',

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

	// Patient(board)
	this.route('patient', {
		path: '/patient',
		template: 'patient'
	});

	//treat_submit
	this.route('treatSubmit', {
		path: '/treatSubmit',
		template: 'treatSubmit'
	});
});

Router.route('/posts/:_id', {
    name: 'treat',
    data: function() { return Posts.findOne(this.params._id); } //사용자가 이 route로 접속할 때마다, 그에 대응하는 post를 찾아 이를 템플릿에 전달한다
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
});