
Template.search.rendered = function() {
	$("#search-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#files-link").removeClass('selected');
	$("#board-link").removeClass('selected');
}

Template.search.helpers({
	inputAttributes: function() {
		return { 'class': 'easy-search-input', 'placeholder': 'Start Searching' };
	},
	players: function() {
		return UserFiles.find({}, { sort: { createdAt: -1 } });
	},
	selectedName: function() {
		var file = FileIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedfile") });
		return file && file.patientname;
	},
	index: function () {
		return FileIndex;
	},
	resultsCount: function() {
		return FileIndex.getComponentDict().get('count');
	},
	showMore: function() {
		return false;
	},

	renderTmpl: () => Template.renderTemplate

});

Template.User.helpers({
	selected: function() {
		return Session.equals("selectedfile", this.__originalId) ? "selected" : '';
	},
});

Template.User.events({
	'click': function() {
		if(Session.equals("selectedfile",this.__originalId)){
			Session.set("selectedfile",'');
		}
		else
		Session.set("selectedfile", this.__originalId);

	}
});
Template.search.events({
	'change .sorting': (e) => {
    FileIndex.getComponentMethods().addProps('sortBy', $(e.target).val());
    console.log($(e.target).val());
   	}

})