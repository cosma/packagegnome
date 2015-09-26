Meteor.users.helpers({
  addPackage:function(package){
    Meteor.users.update({_id:Meteor.userId()},{$addToSet:{
      "profile.packages":package
    }});
  }
});
