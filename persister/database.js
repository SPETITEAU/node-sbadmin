var mongoose = require('mongoose');

// @ TODO remove for production level.
//mongoose.set('debug', true);

var db = function() {
  var initFlag = false;
  return {

    config: function(addr, dbname, opts, callback) {
      if( !initFlag ){
        var connectUrl = 'mongodb://ugv7gni9zwixma1:MfHNJK6EpxQv7XOg7h72@bxkxm7fry9cngt3-mongodb.services.clever-cloud.com:27017/bxkxm7fry9cngt3' ;
        mongoose.connect(connectUrl, (opts ? opts : {}));
        //mongoose.createConnection(connectUrl, (opts ? opts : {}));

        var db = mongoose.connection;

        db.on('error', function(err) {
          // Connection Error
          console.log('Mongodb error encountered [' + err + ']');

          if (callback) {
            callback('ERR-MONGODB', 'mongodb - '+err.message);
          }
        });

        db.once('open', function() {
          initFlag = true;
          if (callback) callback(null);
        });
      } else {
        if (callback) callback(null);
      }
    }
  };
};

module.exports = db();