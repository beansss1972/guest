if (Meteor.isClient) {
  Template.body.helpers({
  comments: function () {
    return [{
      name: 'Bob',
      text: 'Bacon ipsum dolor amet leberkas tongue ham hock cow brisket capicola fatback corned beef tail ground round drumstick pig. Short ribs beef ribs shankle spare ribs jowl andouille pork doner sausage ball tip strip steak. Kielbasa jowl meatball bacon strip steak porchetta, beef chuck tongue andouille sausage filet mignon tail.',
      createdAt: new Date()
    }, {
      name: 'Billy',
      text: 'A much shorter message.',
      createdAt: new Date()
    }, {
      name: 'Bernie',
      text: 'Bacon ipsum dolor amet leberkas tongue ham hock cow brisket capicola fatback corned beef tail ground round drumstick pig. Short ribs beef ribs shankle spare ribs jowl andouille pork doner sausage ball tip strip steak. Kielbasa jowl meatball bacon strip steak porchetta, beef chuck tongue andouille sausage filet mignon tail.',
      createdAt: new Date()
    }];
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
