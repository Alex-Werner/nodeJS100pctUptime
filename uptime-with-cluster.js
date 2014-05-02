var cluster = require('cluster');
var App = {
	run: function(){
		console.log('Run !');
	}
};


if(cluster.isMaster){
    cluster.fork();
	
    cluster.on('exit', function(worker){
        console.log('Worker ' + worker.id + ' died..');
		
        setTimeout( function () {
            cluster.fork();
        }, 1000 );
    });
}
else
{
    try{
        App.run();
    }
    catch(e)
    {
        console.log(e);
        process.exit(1);
    }
    process.on('uncaughtException', function(err){
        console.log(err);
        process.exit(1);
    });
    process.on( 'SIGINT', function () {
        //Kill worker
        cluster.disconnect();
        // Sortie
        process.exit(1);
    });
}
