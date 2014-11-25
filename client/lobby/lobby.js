if (Meteor.isClient) {

  Template.lobby.helpers({
    user_name: function() {
      return Session.get('user_name');
    }
  , rooms: function() {
      return Rooms.find({});
    }
  , room_name: function() {
      return Rooms.findOne(this._id).name || this._id;
  }
  });

  Template.lobby.events({
  	'click .create': function() {
      var users = [];
      users.push({name:Session.get('user_name')});
      var _id = Rooms.insert({
        creator: Session.get('user_name')
      , users: users
      , messages: []
      });
      Router.go('/room/' + _id);
  	}
  , 'click .join': function(events) {
      var _id = events.target.id;
      Guests.update(Session.get('user_id'), {
        $set: {
          room_id: _id
        }
      });
      Router.go('/room/' + _id)
    }
  });
}