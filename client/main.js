import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.actions.onCreated(function actionsOnCreated() {
  this.pwdResult = new ReactiveVar();
})


Template.actions.helpers({
  'pwdResult'() {
    return Template.instance().pwdResult.get();
  },
});


Template.actions.events({

  'click .js-launch-pwd'(event, instance) {
    Meteor.call('command.pwd', (err, res) => {
      if (err) {
        // console.log(err);
        instance.pwdResult.set(`Erreur lors de la requête : ${err}`);
      } else {
        // console.log(res);
        $('.js-result-pwd').css('display', 'block');
        instance.pwdResult.set(res);
      }
    });
  },

});
