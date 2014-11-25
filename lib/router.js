Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', 'login');
Router.route('/lobby', 'lobby');
Router.route('/room/:_id', function() {
  this.render('room', {
		data: function() {
	    return Rooms.findOne({_id: this.params._id});
    }
	})
}, {
  name: 'room'
});

// When you navigate away from /room/:_id
Router.onStop(function() {
  Rooms.update(this.params._id, {
    $pull: {
      users: {id: Session.get('user_id')}
    }
  });

  if (Rooms.findOne(this.params._id).users.length == 0) {
    Rooms.remove(this.params._id);
  }

},{
  only: ['room']
});