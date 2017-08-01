
if (Meteor.isServer) {

    Meteor.methods({
        // Method for adding jokes
        xmlRead: function(url){
       
            request(url, function(error, response, body) {
            parser.parseString(body, function(err, result) {

                console.log(result);            //xmlresult.Patient.name = Park                
                                                //result.Patient.birthDate[0].$.value = 1992-12-02
                                                //result.Patient.gender[0].$.value = male
            });
        });
            
        },

        addJokes: function(jokeName, jokePost) {
            if (!Meteor.userId()) { //로그인 된 상태여야만 메소드 실행가능
                throw new Meteor.Error('not authorized'); //로그인 안된상태니깐 권한없다고 에러 띄워줌
                return false;
            } else {
                var username = Meteor.user().username;
                var year = new Date().getFullYear();
                var month = new Date().getMonth() + 1;
                var day = new Date().getDate();
                var date = (month + "/" + day + "/" + year).toString(); //걍 date함수 이용해서 날짜 받은뒤 형식대로 저장

                Jokes.insert({
                    jokeName: jokeName, //불러온 jokename과 jokepost는 그대로 저장해줌
                    jokePost: jokePost,
                    author: username, //로그인한 사용자의 이름을 author에 저장
                    date: date, //아까 저장한 날짜형식 date에 저장
                    createdAt: new Date(), //이거 추가한 날짜및 시간
                    laughScore: 0,
                    frownScore: 0,
                    pukeScore: 0, //점수 변수들 만들어서 초기화
                    voted: [username], //투표한 사람 이름 저장
                    userId: Meteor.userId(), //현재 로그인한 유저의 id 저장
                });

            }
        },
        fileUpload: function(filename, filepost, fsfile) {
            if (!Meteor.userId()) { //로그인 된 상태여야만 메소드 실행가능

                throw new Meteor.Error('not authorized'); //로그인 안된상태니깐 권한없다고 에러 띄워줌
                return false;
            } else {

                var username = Meteor.user().username;
                var year = new Date().getFullYear();
                var month = new Date().getMonth() + 1;
                var day = new Date().getDate();
                var date = (month + "/" + day + "/" + year).toString(); //걍 date함수 이용해서 날짜 받은뒤 형식대로 저장
               
                FileStore.insert(fsfile, function(err, result) { //FileStore collection에 insert해준다.	
                    if (err) { //에러가 나면 에러 보여주고 throw
                        throw new Meteor.Error(err);
                    } else { //정상 작동 했을시

                        var fileLoc = '/cfs/files/FileStore/' + result._id;

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


                        Bert.alert("Profile Update Successful!", "success", "growl-top-right");
                        
                    }
                });

            }
        },
        removeJoke: function(jokesId) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Jokes.remove(jokesId);
            }
        },

        countVote: function(thisJoke, Name) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Jokes.update(thisJoke, { $addToSet: { voted: Name } });
            }
        },

        userPointLaugh: function(jokeAuthor) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Meteor.users.update(jokeAuthor, { $inc: { 'profile.laughScore': +1 } });
            }
        },

        laughVote: function(thisUser, thisJoke) {
            if (!thisUser) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                Jokes.update(thisJoke, { $inc: { laughScore: +1 } });
            }
        },

        userPointFrown: function(jokeAuthor) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Meteor.users.update(jokeAuthor, { $inc: { 'profile.frownScore': +1 } });
            }
        },

        frownVote: function(thisUser, thisJoke) {
            if (!thisUser) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                Jokes.update(thisJoke, { $inc: { frownScore: +1 } });
            }
        },

        userPointPuke: function(jokeAuthor) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Meteor.users.update(jokeAuthor, { $inc: { 'profile.pukeScore': +1 } });
            }
        },

        pukeVote: function(thisUser, thisJoke) {
            if (!thisUser) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                Jokes.update(thisJoke, { $inc: { pukeScore: +1 } });
            }
        },
              postInsert: function(postAttributes) {
                check(Meteor.userId(), String);
                check(postAttributes, {
                  description: String,
                  postname: String,
                  title: String
                });

                var user = Meteor.user();
                var post = _.extend(postAttributes, {
                  userId: user._id, 
                  author: user.username, 
                  submitted: new Date(),
                  commentsCount: 0
                });

                var postId = Posts.insert(post);
                return {
                  _id: postId
                };
              },

              commentInsert: function(commentAttributes) {
                    check(this.userId, String);
                    check(commentAttributes, {
                      postId: String,
                      body: String
                    });
                    var user = Meteor.user();
                    var post = Posts.findOne(commentAttributes.postId);
                    if (!post)
                      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
                    comment = _.extend(commentAttributes, {
                      userId: user._id,
                      author: user.username,
                      submitted: new Date(),
                    });

                     // update the post with the number of comments
                    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
     

                    return Comments.insert(comment);
                  },
    });

}
