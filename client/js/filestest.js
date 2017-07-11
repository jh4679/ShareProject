Template.filestest.rendered = function() {
	$("#files-link").addClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#profile-link").removeClass('selected');

}

Template.filestest.helpers({
	UserFiles: function() {
		var files = UserFiles.find({}, {sort: {createdAt: -1}});	//createdAt을 비교해서 최신순으로 정렬해서 디비내용을 리턴.
		return files; //home.html에서 {{#each jokes}} 반복문을 이용해서 모든 jokes를 다 보여주게 된다.
	}
});
Template.filestest.events({
	
       

});