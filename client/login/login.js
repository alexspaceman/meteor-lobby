if (Meteor.isClient) {
  
  Session.set("logging", false);
  Session.set("login", false);

  Template.login.helpers({
    logging: function() {
      return Session.get('logging');
    }
  , login: function() {
      return Session.get('login');
    }
  });

  Template.login.events({
    'click button.login': function(event) {
      Session.set('logging', true);
      Session.set("login", true);
    }
  , 'click button.sign-up': function(event) {
      Session.set('logging', true);
      Session.set("login", false);
    }
  , 'submit form.login': function(event){
      var name = event.target.name.value;
      console.log(name);
      return false;
    }
  , 'click button.guest': function(event) {
      var name = 'guest' + Math.floor(Math.random() * 10000);
      Session.set('user_name', name);
      Session.set('user_id', Guests.insert({name: name}));
      Router.go('lobby');
    }
  })
};