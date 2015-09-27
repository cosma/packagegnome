if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user){
     let profile = {packages:[]};
     options.profile = profile;

     user.profile = options.profile;
    return user;
  });
}
