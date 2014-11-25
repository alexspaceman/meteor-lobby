if (Meteor.isClient) {
	Template.room.helpers({
	  username: function() {
      return Session.get('username');
    }
	});

  Template.room.events({
    'submit .new-message': function(event) {
      var message = event.target.message.value;
      console.log(this._id + ' : ' + message);
      Rooms.update(this._id, {
        $addToSet : {
          messages: {
            message: message
          , user: Session.get('username')
          , when: moment().format('h:mm a')
          }
        }
      });
      event.target.message.value = '';
      return false;
    }
  });
}