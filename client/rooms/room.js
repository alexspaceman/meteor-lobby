if (Meteor.isClient) {

  Session.set('user_name_saved', true);
  Session.set('room_name_saved', true);

	Template.room.helpers({
	  user_name: function() {
      return Session.get('user_name');
    }
  , room_name: function() {
      return this.name || this._id;
    }
  , user_name_saved: function() {
      return Session.get('user_name_saved');
    }
  , room_name_saved: function() {
      return Session.get('room_name_saved');
    }    
	});

  Template.room.events({
    'submit .new-message': function(event) {
      var message = event.target.message.value;
      Rooms.update(this._id, {
        $addToSet : {
          messages: {
            message: message
          , user: Session.get('user_name')
          , when: moment().format('h:mm a')
          }
        }
      });
      event.target.message.value = '';
      return false;
    }
  , 'click .edit-room': function(event) {
      Session.set('room_name_saved', false);
    }
  , 'click .edit-user': function(event) {
      Session.set('user_name_saved', false);
    }
  , 'submit .user-name': function(event) {
      var name = event.target.new_user_name.value;
      Session.set('user_name', name);
      Session.set('user_name_saved', true);
      return false;
    }   
  , 'submit .room-name': function(event) {
      var name = event.target.new_room_name.value;
      Rooms.update(this._id, {
        $set: {
          name: name
        }
      });
      Session.set('room_name_saved', true);
      return false;
    }
  });
}