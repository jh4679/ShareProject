Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      patientname: $(e.target).find('[name=patientname]').val(),
      description: $(e.target).find('[name=description]').val(),
      medicine: $(e.target).find('[name=medicine]').val(),
    };

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('treat', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('patient');
    }
  }
});