FlowRouter.route('/', {
    action: function(params, queryParams) {
    },
    name:"home"
});
FlowRouter.route('/package/:consigKey', {
    action: function(params, queryParams) {
        Session.set('activePackage',params.consigKey);
    },
    name:"package"
});
