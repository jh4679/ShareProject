Tracker.autorun(function(){
	if(Meteor.userId()){
		Router.go("/");
	}
});

Template.login.rendered = function() {
	$("#patient-link").removeClass('selected');
	$("#login-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#patient-link").removeClass('selected');
}

Template.login.events({
	"submit .form-signin": function(event){
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);

<<<<<<< HEAD
		if(isNotEmpty(email) &&
			isNotEmpty(password) &&
			isEmail(email) &&
			isValidPassword(password)){
=======
		if(isNotEmpty(email) &&		//이메일이 비어있지않고 
			isNotEmpty(hospital) &&
			isNotEmpty(password) &&		//비밀번호도 비어있지않고 
			isEmail(email) &&		//이메일형식에 맞고
			isValidPassword(password)){		//맞는 비밀번호라면
>>>>>>> origin/master

			Meteor.loginWithPassword(email, password, function(err){
				if(err) {
					Bert.alert(err.reason, "danger", "growl-top-right");
					return false;
				} else {
					Router.go("/");
					Bert.alert("You are now logged in", "success", "growl-top-right");
				}
			});

		}

		return false // Prevent Submit
	}

});

// Validation Rules

// Trim Helper
var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};

// Validate Email
isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please use a valid email address", "danger", "growl-top-right");
	return false;
};

// Check Password Field
isValidPassword = function(password){
	if(password.length <6) {
		Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
};