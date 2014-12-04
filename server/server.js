if (Meteor.isServer) {
	console.log("hey terminal");

  Meteor.onConnection(function(connection) {
  	console.log("hello user!");

  	connection.onClose(function() {
  		// user disconnects logic
  		console.log("user left!");
  	})
  });
  
}