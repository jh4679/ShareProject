Jokes = new Mongo.Collection('Jokes');

ProfileImages = new FS.Collection("ProfileImages", {
	stores: [new FS.Store.GridFS("ProfileImages")]
});

ProfileImages.allow({
	insert: function(userId, doc){
		return true;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	download: function(){
		return true;
	}
});

//this is comment2
//this is comment
FileStore = new FS.Collection("FileStore", {
	stores: [new FS.Store.GridFS("FileStore")]
});
FileStore.allow({
	insert: function(userId, doc){
		return true;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	download: function(){
		return true;
	}
});

UserImages = new Mongo.Collection("UserImages");

UserImages.allow({
	insert: function(){
		return true;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	}
});
UserFiles = new Mongo.Collection("UserFiles");

UserFiles.allow({
	insert: function(){
		return true;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	}
});


FileIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB({
		sort: function() {
			return { createdAt: -1 };
		},
		selector: function(searchObject, options, aggregation) {
			let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
			categoryFilter = options.search.props.categoryFilter;

			if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
				selector.category = categoryFilter;
			}

			return selector;
		}
	}), 
	collection: UserFiles,
	fields: ['patientname','patientgender','fileName'],
	defaultSearchOptions: {
		limit: 8
	},
	permission: () => {
		return true;
	}
});

//board db
Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

// For Easy Search
///////////////////
/*

JokesIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB({
		sort: function() {
			return { createdAt: -1 };
		},
		selector: function(searchObject, options, aggregation) {
			let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
			categoryFilter = options.search.props.categoryFilter;

			if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
				selector.category = categoryFilter;
			}

			return selector;
		}
	}), 
	collection: Jokes,
	fields: ['jokeName'],
	defaultSearchOptions: {
		limit: 8
	},
	permission: () => {
		return true;
	}
});

*/





















