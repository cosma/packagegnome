Template.registerHelper("exactMoment", function(date){
  return moment(new Date(date)).format("dddd, MMMM Do YYYY");
});

Template.registerHelper("roughMoment", function(date){
  return moment().from(new Date(date));
});

Template.registerHelper("package", function(){
  return PackageGnome.Packages.findOne({_id:Session.get('activePackage')});
});
