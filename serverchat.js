var net = require('net');
var port = 3000;
var chalk = require('chalk')

var client = [];
var guest = 0;


var server = net.createServer(function(c){
	guest++

	c.name = "user" + guest;
	var member = c.name
	//c.write(chalk.blue(member) + " has joined the group\r\n")

	client.push(c);
	console.log(client)

	c.write("Welcome " + member + "\n");
	messages(chalk.green(member), chalk.yellow(member) + ' joined the group.\n')
  

	c.on('data', function(data){
		//console.log(data.toString().trim());
		var message = member + '> ' + data.toString();

		messages(member, message)


		console.log(message);
	})

	c.on('end', function(){
		client.splice(client.indexOf(c), 1)
		messages(member, + " has left the group")
		if(client.length === 0)
			c.write('Everyone left the chat.\n');
		// console.log(messages)
	})
});

server.listen(port, function(){
	console.log('listening on ' + port);
})

function messages(from, message) {

	client.forEach(function(c, index, array){
		// Dont send any messages to the sender
		if(c.name === from) return;
		
		c.write(message);
	
	});
	
};
