Tracker.autorun(function(){
	if(Meteor.userId()){
		Router.go("/");
	}
});	

Template.login.rendered = function() {
	$("#patient-link").removeClass('selected');
	$("#login-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#files-link").removeClass('selected');
	$("#board-link").removeClass('selected');
}

Template.login.events({
	"submit .form-signin": function(event){
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);

		if(isNotEmpty(email) &&		//이메일이 비어있지않고 
			isNotEmpty(hospital) &&
			isNotEmpty(password) &&		//비밀번호도 비어있지않고 
			isEmail(email) &&		//이메일형식에 맞고
			isValidPassword(password)){		//맞는 비밀번호라면

			Meteor.loginWithPassword(email, password, function(err){	//이함수를 실행하는데 
				if(err) {	//에러가 났을시에는
					Bert.alert(err.reason, "danger", "growl-top-right");	//에러의 이유와 에러를 띄우고
					return false;											//err.reason은 accounts-password의 메소드, 자동으로 어떤오류인지 오류를 알려줌
				} else {	//정상동작했다면 
					Router.go("/jokes");	//링크로 이동하고
					Bert.alert("You are now logged in", "success", "growl-top-right");	//완료메시지 띄운다.
				}
			});

		}

		return false // Prevent Submit
	}

});

// Validation Rules

// Trim Helper
var trimInput = function(val){	//쓸데없는 기호같은거 공백으로 바꿔줌
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