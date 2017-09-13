Template.profile.rendered = function() {
    $("#patient-link").removeClass('selected');
    $("#patient-link").removeClass('selected');
	$("#profile-link").addClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#files-link").removeClass('selected');
    $("#board-link").removeClass('selected');
}

Template.profile.helpers({
	email: function() {
		if(!Meteor.user()) {	//로그인하지 않았다면(meteor.user가 확인되지 않는다면) 
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");	//에러를 띄운다.
			return false;
		} else {
			return Meteor.user().emails[0].address;	//로그인한 상태라면 이메일정보를 가져와서 리턴해준다.
		}
	},

	username: function() {
		if(!Meteor.user()) {	//로그인하지 않았다면(meteor.user가 확인되지 않는다면) 
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");	//에러를 띄운다.
			return false;
		} else {
			return Meteor.user().username;	//로그인한 상태라면 유저이름을 가져와서 리턴해준다.
		}
	}, 

    hospital: function() {
        if(!Meteor.user()) {    //로그인하지 않았다면(meteor.user가 확인되지 않는다면) 
            Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");    //에러를 띄운다.
            return false;
        } else {
            return Meteor.user().hospital;  //로그인한 상태라면 유저이름을 가져와서 리턴해준다.
        }
    }, 

	userJokes: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var userJokes = Jokes.find({userId: userId}, {sort: {createdAt: -1}});	//현재 로그인한 유저의 아이디에 해당하는 jokes를 모두 보여줌
		return userJokes;	//html에서 {{#each Userjokes를 통해 모든 내용을 보여주게 된다.}}
	},

	userLaughScore: function() {
		return Meteor.user().profile.laughScore;	//현재 로그인한 유저의 db정보에서 laughScore를 리턴해준다.
	},

	userFrownScore: function() {
		return Meteor.user().profile.frownScore;	//현재 로그인한 유저의 db정보에서 frownScore를 리턴해준다.
	},

	userPukeScore: function() {
		return Meteor.user().profile.pukeScore;		//현재 로그인한 유저의 db정보에서 pukeScore를 리턴해준다.
	},

	UserImages: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var URL = UserImages.findOne({username: username}, {userId: userId});
		return URL;
	}

});

Template.profile.events({
	"click #delete-joke": function() {
        Meteor.call("removeJoke", this._id);
        Bert.alert("Your Joke Was Deleted", "success", "growl-top-right");
    },

    "submit .edit-profile": function(event) {
        var file = $('#profileImage').get(0).files[0]; //업로드된 이미지파일을 받아서 file변수로 저장해준다.

        if (isNotEmpty(file)) { 

            fsFile = new FS.File(file); //FS.File함수 안에 업로드한 file변수를 넣어서 fsFile 객체를 만들어준다.

            ProfileImages.insert(fsFile, function(err, result) { //FileStore collection에 insert해준다.	
                if (err) { //에러가 나면 에러 보여주고 throw
                    throw new Meteor.Error(err);
                } else { //정상 작동 했을시

                    var imageLoc = '/cfs/files/ProfileImages/' + result._id;

                    UserImages.insert({
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        image: imageLoc,
                    });


                    Bert.alert("Profile Update Successful!", "success", "growl-top-right");
                    Router.go("/");
                }
            });


            //fsFile = new FS.File(file);
            //Meteor.call('fileUpload', "testfile", "testmsg", fsFile);
        } else {
            
            Bert.alert("you have to choose ProfileImage.", "danger", "growl-top-right"); //이름이나 내용이 빈칸이면 에러 띄우기
        }

        return false // prevent submit
    },
    "click #test": function(event, temp) {

        console.log("click");;


    },
    "click #abc": function(event, temp) {

        console.log("click");;


    },
    "submit .change-profile": function(event) {
        var file = $('#ImageToChange').get(0).files[0]; //업로드된 이미지파일을 받아서 file변수로 저장해준다.

        var myUserImagesId = UserImages.findOne({ _id: this._id })._id; //현재 자신의 db정보를 불러와 변수에 저장

        if (isNotEmpty(file)) { 

            fsFile = new FS.File(file); //FS.File함수 안에 업로드한 file변수를 넣어서 fsFile 객체를 만들어준다.

            ProfileImages.insert(fsFile, function(err, result) { //ProfileImages collection에 insert해준다.	
                if (err) { //에러가 나면 에러 보여주고 throw
                    throw new Meteor.Error(err);
                } else { //정상 작동 했을시

                    var changeImageLoc = '/cfs/files/ProfileImages/' + result._id;
                    ///cfs/files/ProfileImages/8ez3fiSi9EBdnagdS
                    UserImages.update({ _id: myUserImagesId }, //반드시 첫번째 인자에는 _id만 적어주어야 한다.
                        { $set: { image: changeImageLoc, } },
                        function(e, r) {
                            console.log(r);
                        }
                    );

                    Bert.alert("Profile Update Successful!", "success", "growl-top-right");
                    Router.go("/");

                }
            });

        } else {
            
            Bert.alert("you have to choose ProfileImage.", "danger", "growl-top-right"); //이름이나 내용이 빈칸이면 에러 띄우기
        }


        return false // prevent submit
    }
});

var isNotEmpty = function(value) { //빈칸인지 아닌지 체크
    if (value && value !== '') {
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    return false;
};
































