import { Meteor } from 'meteor/meteor';
import Future from 'fibers/future';
import childProcess from 'child_process';

Meteor.startup(() => {

  Meteor.methods({
    'command.pwd'() {
      this.unblock();
      const future = new Future();
      const command = 'pwd';
      childProcess.exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          throw new Meteor.Error(500, `${command} failed`)
        }
        future.return(stdout.toString());
      });
      return future.wait();
    },
  });

});
