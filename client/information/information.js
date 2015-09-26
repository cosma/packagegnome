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
