if (Meteor.isClient) {

  Template.lobby.helpers({
    username: function() {
      return Session.get('username');
    }
  , rooms: function() {
      return Rooms.find({});
    }
  });

  Template.lobby.events({
  	'click .create': function() {
      var users = [];
      users.push({name:Session.get('username')});
      var _id = Rooms.insert({
        creator: Session.get('username')
      , users: users
      , messages: []
      });
      Router.go('/room/' + _id);
  	}
  , 'click .join': function(events) {
      var _id = events.target.id;
      Rooms.update(_id, {
          $addToSet: {
            users: {
            name: Session.get('username')
          }
        }
      });
      Router.go('/room/' + _id)
    }
  });
}