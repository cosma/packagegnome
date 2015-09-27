Meteor.users.helpers({
  addPackage:function(package){
    Meteor.users.update({_id:Meteor.userId()},{$addToSet:{
      "profile.packages":package
    }});
  },

  hasPackagesSaved:function(){
    return Meteor.user().profile.packages.length > 0;
  }
});
