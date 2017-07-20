var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var parser = new xml2js.Parser();

Template.fileuploadForm.rendered = function() {

}
Template.fileuploadForm.events({
    "submit .file-post": function(event) {
        var flag = false;
        var fileName = event.target.fileName.value;
        var filePost = event.target.filePost.value;
        var fileLoc;
        var url;
        var postedfile = $('#fileUpload').get(0).files[0]; //업로드된 이미지파일을 받아서 file변수로 저장해준다.
        var postedfilename = $('#fileUpload').get(0).files[0].name; //확장자명이 포함된 파일의 이름을 저장해준다.
        
        
        if (isNotEmpty(fileName) &&
            isNotEmpty(filePost) &&
            isNotEmpty(postedfile)) { //이름과 내용과 파일이 비어있지 않다면

            fsFile = new FS.File(postedfile); //FS.File함수 안에 업로드한 file변수를 넣어서 fsFile 객체를 만들어준다.
  

            var username = Meteor.user().username;
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();
            var date = (month + "/" + day + "/" + year).toString(); //걍 date함수 이용해서 날짜 받은뒤 형식대로 저장


            var filesavefunc = function () {
                return new Promise(function (resolve, reject) {
                    var url,fileLoc;
                    FileStore.insert(fsFile, function(err, result) { //FileStore collection에 insert해준다. 
                        if (err) { //에러가 나면 에러 보여주고 throw

                            throw new Meteor.Error(err);
                        } else { //정상 작동 했을시
                            fileLoc = '/cfs/files/FileStore/' + result._id ;
                            url = 'http://localhost:3000/cfs/files/FileStore/' + result._id;

                            resolve({fileLoc:fileLoc,url:url});
                        }
                    });

                });
            };

            var Parsefunc = function (val) {
                var fileLoc = val.fileLoc;
                var url = val.url;
                return new Promise(function (resolve, reject) {
                    
                    request(url, function(error, response, body) {
                        console.log(body);
                        parser.parseString(body, function(err, result) {
                            if (err) { //에러가 나면 에러 보여주고 throw
                                reject({msg:"실패ㅠ"})
                            } 
                            else{
                                UserFiles.insert({
                                fileName: fileName, //불러온 jokename과 jokepost는 그대로 저장해줌
                                filePost: filePost,
                                file: fileLoc,
                                author: username, //로그인한 사용자의 이름을 author에 저장
                                date: date, //아까 저장한 날짜형식 date에 저장
                                createdAt: new Date(), //이거 추가한 날짜및 시간
                                voted: [username], //투표한 사람 이름 저장
                                userId: Meteor.userId(), //현재 로그인한 유저의 id 저장
                                patientname: result.Patient.name[0],
                                patientbirthdate: result.Patient.birthDate[0].$.value,
                                patientgender: result.Patient.gender[0].$.value

                                });
                            //console.log(result);            //xmlresult.Patient.name[0] = Park                
                                                            //result.Patient.birthDate[0].$.value = 1992-12-02
                                                            //result.Patient.gender[0].$.value = male
                                resolve({msg:"파싱성공!!"});
                            }
                        });
                    });
                });
            };
            var timeout = function (time, val) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(val);
                    }, (time*1000) );
                });
            };

            filesavefunc().then(function(result){
                console.log(result.fileLoc);
                console.log(result.url);

                return timeout(0.3,result);     //파일 업로드에 시간이 좀 걸리기 때문에 잠깐의 타임아웃 텀을 두어야 한다.
            }).then(function(result){
                console.log(result);

                return Parsefunc(result);
            }).then(function(result){
                console.log(result.msg);
            })
            /*
            promisefunc(true,"filesave")
            .then(function(){
               
            
                console.log("hihihi3");

                FileStore.insert(fsFile, function(err, result) { //FileStore collection에 insert해준다. 
                    if (err) { //에러가 나면 에러 보여주고 throw
                        throw new Meteor.Error(err);
                    } else { //정상 작동 했을시
                        fileLoc = '/cfs/files/FileStore/' + result._id ;
                        url = 'http://localhost:3000' + fileLoc;
                    }
                });
                console.log(fileLoc +" AAAA " + url);
                return promisefunc(true,"parseXml");
            }).then(function(){

                console.log(fileLoc +" BBBB " + url);
                request(url, function(error, response, body) {
                        console.log(body);
                        parser.parseString(body, function(err, result) {
                            if (err) { //에러가 나면 에러 보여주고 throw
                                console.log("error!!")
                                throw new Meteor.Error(err);
                            } 
                            else{
                                UserFiles.insert({
                                fileName: fileName, //불러온 jokename과 jokepost는 그대로 저장해줌
                                filePost: filePost,
                                file: fileLoc,
                                author: username, //로그인한 사용자의 이름을 author에 저장
                                date: date, //아까 저장한 날짜형식 date에 저장
                                createdAt: new Date(), //이거 추가한 날짜및 시간
                                voted: [username], //투표한 사람 이름 저장
                                userId: Meteor.userId(), //현재 로그인한 유저의 id 저장
                                patientname: result.Patient.name[0],
                                patientbirthdate: result.Patient.birthDate[0].$.value,
                                patientgender: result.Patient.gender[0].$.value
                            });
                            //console.log(result);            //xmlresult.Patient.name[0] = Park                
                                                            //result.Patient.birthDate[0].$.value = 1992-12-02
                                                            //result.Patient.gender[0].$.value = male
                            }
                        });
                    });
            });
*/
            /*
            var FileStore.insert(fsFile, function(err, result) { //FileStore collection에 insert해준다. 
                if (err) { //에러가 나면 에러 보여주고 throw
                    throw new Meteor.Error(err);
                } else { //정상 작동 했을시
                    myFileStoreId = result._id;
                    fileLoc = '/cfs/files/FileStore/' + result._id ;
                    url = 'http://localhost:3000' + fileLoc;
 //////////////////////////////////////////////////////////////////////////////////////////
                    request(url, function(error, response, body) {
                        console.log(body);
                        parser.parseString(body, function(err, result) {
                            if (err) { //에러가 나면 에러 보여주고 throw
                                console.log("error!!")
                                throw new Meteor.Error(err);
                            } 
                            else{
                                UserFiles.insert({
                                fileName: fileName, //불러온 jokename과 jokepost는 그대로 저장해줌
                                filePost: filePost,
                                file: fileLoc,
                                author: username, //로그인한 사용자의 이름을 author에 저장
                                date: date, //아까 저장한 날짜형식 date에 저장
                                createdAt: new Date(), //이거 추가한 날짜및 시간
                                voted: [username], //투표한 사람 이름 저장
                                userId: Meteor.userId(), //현재 로그인한 유저의 id 저장
                                patientname: result.Patient.name[0],
                                patientbirthdate: result.Patient.birthDate[0].$.value,
                                patientgender: result.Patient.gender[0].$.value
                            });
                            //console.log(result);            //xmlresult.Patient.name[0] = Park                
                                                            //result.Patient.birthDate[0].$.value = 1992-12-02
                                                            //result.Patient.gender[0].$.value = male
                            }
                        });
                    });
//////////////////////////////////////////////////////////////////////////////////
                    
                }
            });
            
            //Meteor.call('fileUpload', fileName, filePost, fsfile);    //디비에 추가해주고
            */
            resetfile();
            //parseXml(url);
            Bert.alert("Your File Was Uploaded!", "success", "growl-top-right"); //성공알림 띄우기 

        } else {
            resetfile();
            Bert.alert("something went wrong", "danger", "growl-top-right"); //이름이나 내용이 빈칸이면 에러 띄우기
        }

        return false; // prevent submit
    },
    "click #reset": function() {
        resetfile();
        
    },
    "click #test": function() {
    var url = 'http://localhost:3000/cfs/files/FileStore/FcmJMSGfLg72DxDsp';

       parseXml(url);
       console.log(info.name + info.birthDate + info.gender) ;
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
function promisefunc(flag,val){
    return new Promise(function(resolve,reject){
        if(flag){
            resolve(val);
        }
        else{
            reject("실패");
        }
    })
}
var isNotEmpty = function(value) { //빈칸인지 아닌지 체크
    if (value && value !== '') {
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    return false;
};
function resetfile(){
    $('#fileName').val("");
    $('#filePost').val("");
    $('#fileUpload').val("");
    $('#selectedfile').text("선택파일없음");
}

function print(){
    console.log("dujdjdjdjdjdjdj");
}
function parseXml(url){

    //var url = 'http://localhost:3000/cfs/files/FileStore/FcmJMSGfLg72DxDsp';

    request(url, function(error, response, body) {
            parser.parseString(body, function(err, result) {
                if (err) { //에러가 나면 에러 보여주고 throw
                    console.log(errorerror);
                    throw new Meteor.Error(err);
                } 
                else{

                UserFiles.update({ _id: '5v4M8pftHbqyyubrh' }, //반드시 첫번째 인자에는 _id만 적어주어야 한다.
                    { $set: { patientname: result.Patient.name[0] ,
                        patientgender: result.Patient.gender[0].$.value,
                        patientbirthdate: result.Patient.birthDate[0].$.value } },
                    function(e, r) {
                        console.log(r);
                    }
                );
                console.log(result.Patient.name[0]);
                console.log(result.Patient.birthDate[0].$.value);
                console.log(result.Patient.gender[0].$.value);
                //console.log(result);            //xmlresult.Patient.name = Park                
                                                //result.Patient.birthDate[0].$.value = 1992-12-02
                                                //result.Patient.gender[0].$.value = male
                }
            });
        });

}