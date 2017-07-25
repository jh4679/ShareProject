Template.jokes.rendered = function() {
	$("#jokes-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#files-link").removeClass('selected');
}

Template.jokes.helpers({
	jokes: function() {
		var jokes = Jokes.find({}, {sort: {createdAt: -1}});	//createdAt을 비교해서 최신순으로 정렬해서 디비내용을 리턴.
		return jokes; //home.html에서 {{#each jokes}} 반복문을 이용해서 모든 jokes를 다 보여주게 된다.
	}
});

Template.jokes.events({
	"click #laugh": function() {
		var thisUser = Meteor.userId();	//현재 로그인한 사용자의 userId를 찾아 저장해준다.
		var thisJoke = Jokes.findOne({_id: this._id})._id;	//눌린 객체의 id를 찾아 변수에 저장한다.
		var jokeAuthor = Jokes.findOne({_id: this._id}).userId;		//눌린 객체의 userId(작성자Id) 를 찾아 변수에 저장한다.
		var Name = Meteor.user().username;	//현재 로그인한 사용자의 username을 저장해준다.
		var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted; //클릭한 객체의 db변수중에 voted를 검사해 Name이 있는지 없는지 찾는다.

		if (thisJokesVotes.indexOf(Name) > -1) { //thisJokesVotes에서 Name을 찾는데 결과값이 -1보다 크다면 이미 이름이 있는것이므로 에러메시지를 띄운다.
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisJoke, Name);
			Meteor.call("userPointLaugh", jokeAuthor);
			Meteor.call("laughVote", thisUser, thisJoke);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisJokesVotes) { //jokes를 생성할때 본인이름이 객체의 Voted안에 삽입되므로 본인이 투표할수는 없다.
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}
	},

	"click #frown": function() {
		var thisUser = Meteor.userId();
		var thisJoke = Jokes.findOne({_id: this._id})._id;
		var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisJokesVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisJoke, Name);
			Meteor.call("userPointFrown", jokeAuthor);
			Meteor.call("frownVote", thisUser, thisJoke);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisJokesVotes) {
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}
	},

	"click #puke": function() {
		var thisUser = Meteor.userId();
		var thisJoke = Jokes.findOne({_id: this._id})._id;
		var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisJokesVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisJoke, Name);
			Meteor.call("userPointPuke", jokeAuthor);
			Meteor.call("pukeVote", thisUser, thisJoke);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisJokesVotes) {
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}	
	},

});