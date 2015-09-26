Template.application.onRendered(function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "/mapjs-core.js" ;

  document.head.appendChild(script);

  var script2 = document.createElement('script');
  script2.type = 'text/javascript';
  script2.src = "/mapjs-service.js"  ;

  Meteor.setTimeout(function() {
    document.head.appendChild(script2);
  },50);
});
