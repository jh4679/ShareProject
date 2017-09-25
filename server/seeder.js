Meteor.startup(function() {
   if (Meteor.users.find().count() === 0) {
        // create a date string
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var date = (month + "/" + day + "/" + year).toString();

        Accounts.createUser({
            username: 'Super User',
            email: 'Super@user.com',
            password: 'password',
            profile: {
                hospital:'SuperHospital'
            }
        });
  
}
});
