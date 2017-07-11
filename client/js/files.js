Template.files.rendered = function() {
    $("#files-link").addClass('selected');
    $("#jokes-link").removeClass('selected');
    $("#rankings-link").removeClass('selected');
    $("#search-link").removeClass('selected');
    $("#login-link").removeClass('selected');
    $("#profile-link").removeClass('selected');

}
Template.files.helpers({

    UserImages: function() {
        var username = Meteor.user().username;
        var userId = Meteor.userId();
        var URL = UserImages.findOne({ username: username }, { userId: userId });

        return URL;
    }

});

Template.files.events({
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

                    var fileLoc = '/cfs/files/ProfileImages/' + result._id;

                    UserImages.insert({
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        image: imageLoc,
                    });


                    Bert.alert("Profile Update Successful!", "success", "growl-top-right");

                }
            });


            //fsFile = new FS.File(file);
            //Meteor.call('fileUpload', "testfile", "testmsg", fsFile);
        } else {
            
            Bert.alert("something went wrong", "danger", "growl-top-right"); //이름이나 내용이 빈칸이면 에러 띄우기
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

        var myUserImagesId = UserFiles.findOne({ _id: this._id })._id; //현재 자신의 db정보를 불러와 변수에 저장

        if (isNotEmpty(file)) { 

            fsFile = new FS.File(file); //FS.File함수 안에 업로드한 file변수를 넣어서 fsFile 객체를 만들어준다.

            ProfileImages.insert(fsFile, function(err, result) { //ProfileImages collection에 insert해준다.	
                if (err) { //에러가 나면 에러 보여주고 throw
                    throw new Meteor.Error(err);
                } else { //정상 작동 했을시

                    var fileLoc = '/cfs/files/ProfileImages/' + result._id;
                    ///cfs/files/ProfileImages/8ez3fiSi9EBdnagdS
                    UserFiles.update({ _id: myUserImagesId }, //반드시 첫번째 인자에는 _id만 적어주어야 한다.
                        { $set: { file: fileLoc, } },
                        function(e, r) {
                            console.log(r);
                        }
                    );

                    Bert.alert("Profile Update Successful!", "success", "growl-top-right");
                    Router.go("/");

                }
            });

        } else {
            
            Bert.alert("something went wrong", "danger", "growl-top-right"); //이름이나 내용이 빈칸이면 에러 띄우기
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