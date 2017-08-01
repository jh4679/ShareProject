Template.board.rendered = function() {
	$("#board-link").addClass('selected');
	$("#files-link").removeClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#profile-link").removeClass('selected');

}

Template.board.helpers({
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
  /*domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },*/
 
});