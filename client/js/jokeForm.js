Template.jokeForm.rendered = function() {

}

Template.jokeForm.events({
	"submit .joke-post": function() {
		var jokeName = event.target.jokeName.value;
		var jokePost = event.target.jokePost.value;

		if (isNotEmpty(jokeName) &&
			isNotEmpty(jokePost)) {		//이름과 내용이 비어있지 않다면

			Meteor.call('addJokes', jokeName, jokePost);	//디비에 추가해주고

			event.target.jokeName.value = "";
			event.target.jokePost.value = "";	//빈칸으로 초기화시켜준다.

			Bert.alert("Your Joke Was Posted!", "success", "growl-top-right");	//성공알림 띄우기 

		} else {
			
			Bert.alert("something went wrong", "danger", "growl-top-right");	//이름이나 내용이 빈칸이면 에러 띄우기
		}

		return false; // prevent submit
	}
});

// Validation Rules

var isNotEmpty = function(value){	//빈칸인지 아닌지 체크
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};