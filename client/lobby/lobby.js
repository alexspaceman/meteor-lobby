if (Meteor.isClient) {

  Session.set('user_name_saved', true);
  Session.set('room_name_saved', true);

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
  , user_name_saved: function() {
      return Session.get('user_name_saved');
    }
  });

  Template.lobby.events({

    'click .edit-user': function(event) {
      Session.set('user_name_saved', false);
    }
  , 'submit .user-name': function(event) {
      var name = event.target.new_user_name.value;
      Session.set('user_name', name);
      Session.set('user_name_saved', true);
      return false;
    } 

  , 'click .create': function() {

      var users = [];
      users.push({
        name: Session.get('user_name')
      , id: Session.get('user_id')
      });

      var _id = Rooms.insert({
        users: users
      , messages: []
      });

      Guests.update(Session.get('user_id'), {
        $set: {
          room_id: _id
        , creator: true
        }
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

      Rooms.update(_id, {
        $addToSet: {
          users: {
            name: Session.get('user_name')
          , id: Session.get('user_id')
          }
        }
      });

      Router.go('/room/' + _id);
    }
  });
}