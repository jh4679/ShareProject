Template.fileuploadForm.rendered = function() {

}

Template.fileuploadForm.events({

    "submit .file-post": function(event) {
  
        var fileName = event.target.fileName.value;
        var filePost = event.target.filePost.value;

        var postedfile = $('#fileUpload').get(0).files[0]; //업로드된 이미지파일을 받아서 file변수로 저장해준다.
        var postedfilename = $('#fileUpload').get(0).files[0].name;//확장자명이 포함된 파일의 이름을 저장해준다.
        var myFileStoreId;
        var fileLoc;



        if (isNotEmpty(fileName) &&
            isNotEmpty(filePost) &&
            isNotEmpty(postedfile)) { //이름과 내용과 파일이 비어있지 않다면

            fsFile = new FS.File(postedfile); //FS.File함수 안에 업로드한 file변수를 넣어서 fsFile 객체를 만들어준다.

            var username = Meteor.user().username;
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();
            var date = (month + "/" + day + "/" + year).toString(); //걍 date함수 이용해서 날짜 받은뒤 형식대로 저장


            FileStore.insert(fsFile, function(err, result) { //FileStore collection에 insert해준다. 
                if (err) { //에러가 나면 에러 보여주고 throw
                    console.log(errorerror);
                    throw new Meteor.Error(err);
                } else { //정상 작동 했을시
                    myFileStoreId = result._id;
                    fileLoc = '/cfs/files/FileStore/' + result._id;

                    UserFiles.insert({
                        fileName: fileName, //불러온 jokename과 jokepost는 그대로 저장해줌
                        filePost: filePost,
                        file: fileLoc,
                        author: username, //로그인한 사용자의 이름을 author에 저장
                        date: date, //아까 저장한 날짜형식 date에 저장
                        createdAt: new Date(), //이거 추가한 날짜및 시간
                        good: 0,
                        bad: 0, //점수 변수들 만들어서 초기화
                        voted: [username], //투표한 사람 이름 저장
                        userId: Meteor.userId(), //현재 로그인한 유저의 id 저장
                    });

                    
                }
            });
            
            
            //Meteor.call('fileUpload', fileName, filePost, fsfile);	//디비에 추가해주고

            Bert.alert("Your File Was Uploaded!", "success", "growl-top-right"); //성공알림 띄우기 

        } else {

            Bert.alert("something went wrong", "danger", "growl-top-right"); //이름이나 내용이 빈칸이면 에러 띄우기
        }

        return false; // prevent submit
    },
    "click #reset": function() {
        $('#fileName').val("");
        $('#filePost').val("");
        $('#fileUpload').val("");
        $('#selectedfile').text("선택파일없음");

    },
    "click #updatetest": function(event, temp) {

    FileStore.update({ _id: 'iuBJccTH78EENzrrL' }, //반드시 첫번째 인자에는 _id만 적어주어야 한다.
                        { $set: { _id: 'iuBJccTH78EENzrrL_1-3장 복습파일.xlsx' } },
                        function(e, r) {
                            console.log(r);
                        }
                    );

    },

});

// Validation Rules

var isNotEmpty = function(value) { //빈칸인지 아닌지 체크
    if (value && value !== '') {
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    return false;
};
