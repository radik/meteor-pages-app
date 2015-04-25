var Employees = new Mongo.Collection('employees');
var Pages = new Meteor.Pagination(Employees, {
  templateName: 'employees',
  perPage: 20,
  table: {
    fields: ['name']
  }
});

if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var i=0
    if(Employees.find().count()<1){
      for(;i<1000;i++){
        Employees.insert({name: 'Employee #'+i});
      }
    }
  });
}
