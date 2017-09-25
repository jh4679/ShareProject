Template.patient.rendered = function() {
	$("#patient-link").addClass('selected');
	$("#board-link").removeClass('selected');
	$("#files-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#profile-link").removeClass('selected');

}

Template.patient.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
    //return Posts.find();
  }
  //posts: postsData //posts라는 헱퍼 생성
});

Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
 
});