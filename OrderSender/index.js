const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log('JavaScript is running late!');
  }

  const message = {
    orderId: uuidv4(),
  };

  context.log(JSON.stringify(message));
  context.bindings.outputSbQueue = message;
  context.log('JavaScript timer trigger function ran!', timeStamp);
  context.done();
};
