Template.signup.rendered = function() {

}

Template.signup.events({
	"submit .form-signup": function(event){
		var username = trimInput(event.target.username.value);
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var password2 = trimInput(event.target.password2.value);

		if(isNotEmpty(email) &&		//이메일이 빈칸이 아니어야함
			isNotEmpty(username) &&		//이름도 빈칸이 아니어야함
			isNotEmpty(password) &&		//비밀번호도 빈칸이 아니어야함
			isEmail(email) &&	//이메일 형식에 맞아야함
			areValidPasswords(password, password2)) {	//비밀번호 확인이 맞아야함

			Accounts.createUser({	//account패키지의 메소드 자동으로 양식에 맞게 디비를 생성해준다.
				username: username,
				email: email,
				password: password,
				profile: {
					laughScore: 0,
					frownScore: 0,
					pukeScore: 0,
					voted: [],
				}
			}, function(err){
				if(err){
					Bert.alert(err.reason, "danger", "growl-top-right");	//에러메시지 출력
				} else {
					Bert.alert("Account Created! You Are Now Logged In", "success", "growl-top-right");	//정상완료 메시지 출력
					Router.go("/jokes");	//링크로 이동

				}
			});
			
		}

		return false; // prevent submit

	}
});

// Validation Rules

// Trim Helper
var trimInput = function(val){		//쓸데없는 문자들을 공백으로 바꿔준다.
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

// Match Password
areValidPasswords = function(password, confirm) {
	if(!isValidPassword(password)) {
		return false;
	}
	if(password !== confirm) {
		Bert.alert("Passwords do not match", "danger", "growl-top-right");
		return false;
	}
	return true;
};











