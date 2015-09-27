Template.account.events({
  "click .content": function(event, template){
    event.preventDefault();

    if(FlowRouter.getRouteName() === "home") {
      FlowRouter.go('/package/:consigKey',{consigKey: this});
    }
    if (FlowRouter.getRouteName() === "package") {
      FlowRouter.setParams({consigKey: this});
    }
  }
});
