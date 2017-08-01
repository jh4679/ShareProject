var xml2js = require('xml2js');
var request = require('request');
var parser = new xml2js.Parser();


Template.filestest.rendered = function() {
	$("#files-link").addClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#profile-link").removeClass('selected');
    $("#board-link").removeClass('selected');
}

Template.filestest.helpers({
	UserFiles: function() {
		var files = UserFiles.find({}, {sort: {createdAt: -1}});	//createdAt을 비교해서 최신순으로 정렬해서 디비내용을 리턴.
		return files; //home.html에서 {{#each jokes}} 반복문을 이용해서 모든 jokes를 다 보여주게 된다.
	}
});
Template.filestest.events({
	"click #patient": function(){

       var userId = UserFiles.findOne({ _id: this._id })._id;
       var url = 'http://localhost:3000' + UserFiles.findOne({ _id: this._id }).file;
       console.log(url);
	}

});

function parseXml(url,userid){

    //var url = 'http://localhost:3000/cfs/files/FileStore/FcmJMSGfLg72DxDsp';

    request(url, function(error, response, body) {
    	console.log(body);
            parser.parseString(body, function(err, result) {
                if (err) { //에러가 나면 에러 보여주고 throw
                    throw new Meteor.Error(err);
                } 
                else{

                UserFiles.update({ _id: userid }, //반드시 첫번째 인자에는 _id만 적어주어야 한다.
                    { $set: { patientname: result.Patient.name[0] ,
                        patientgender: result.Patient.gender[0].$.value,
                        patientbirthdate: result.Patient.birthDate[0].$.value } },
                    function(e, r) {
                        //console.log(r);
                    }
                );
                //console.log(result);            //xmlresult.Patient.name = Park                
                                                //result.Patient.birthDate[0].$.value = 1992-12-02
                                                //result.Patient.gender[0].$.value = male
                }
            });
        });

}