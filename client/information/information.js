Template.informationField.helpers({
  lastStation:function(){
    let lastStation = this.getCurrentStation();
    if (lastStation) {
      return `${lastStation.DepotName}, ${lastStation.Country}`;      
    }
  }
});

Template.information.events({
  'submit #consigSearch': function(e,t){
    e.preventDefault();

    if(FlowRouter.getRouteName() === "home") {
      FlowRouter.go('/package/:consigKey',{consigKey: $('#consigKey').val()});
    }
    if (FlowRouter.getRouteName() === "package") {
      FlowRouter.setParams({consigKey: $('#consigKey').val()});
    }

  }
});

Template.chat.events({
  'submit #chatMessage': function(e,t){
    e.preventDefault();
    PackageGnome.Package.addMessage($('#message').val());
    $('#message').val("");
  }
});

Template.addToAccount.helpers({
  canAddPackage:function(){
    return Meteor.user() &&
    (Meteor.user().profile.packages.indexOf(Session.get('activePackage')) < 0);
  }
});
Template.addToAccount.events({
  'click #addToAccount':function(e,t){
    e.preventDefault();
    Meteor.user().addPackage(PackageGnome.Package._id);
  }
});
