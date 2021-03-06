Template.treatSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      patientname: $(e.target).find('[name=patientname]').val(),
      description: $(e.target).find('[name=description]').val(),
      medicine: $(e.target).find('[name=medicine]').val(),
    };

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('patient', {_id: result._id});  
    }); // call 하니까 insertpost찾을수 없음 
    //post._id = Posts.insert(post);
    //Router.go('postPage', post);
  }
});