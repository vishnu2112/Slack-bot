var Slackbot = require('slackbots');
var axios = require('axios');
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'xoxp-460393878769-461197645605-462805419681-026a7ce32c7fa35a207e91d0b8ea88c1';
var slack = new Slack(SLACK_TOKEN);
var bot = new Slackbot({
	token: 'xoxb-460393878769-460404125937-p7v3ahWWNbo1vtffnjU01cKc',
	name: 'funbot'
} );
//xoxp-460393878769-461197645605-464806386358-6923e07c2faf3f86d2d781d3be154b7b
//xoxp-460393878769-461197645605-462805419681-026a7ce32c7fa35a207e91d0b8ea88c1
//var slackPost = require('slackPost');
//var myNewPost = slackPost.post('https://hooks.slack.com/services/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', 'Message');
//myNewPost.setIconEmoji('punch');
//myNewPost.setChannel(#fun);

var SlackWebhook = require('slack-webhook');
var slackfun = new SlackWebhook('https://hooks.slack.com/services/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');
slackfun.send({
  text:'hey How r u?',
  //username: 'Vishnu Priya'
  icon_emoji: ':smiley:',
  channel:'#fun'
});



bot.on('start', function(){''
	const params = {
		icon_emoji: ':smiley:'
	};
	bot.postMessageToChannel('general', 'Lets have fun .....', params);
	
});
bot.on('error', function(err){
	console.log(err)
});
bot.on('message', function(data){
	if(data.type !== 'message'){
		return;
	}
	handleMessage(data.text);
});

var form = {
  file: fs.createReadStream('me.txt'),
  filename: 'me.txt',
  fileType: 'post',
  title: 'About my app in funbot...',
  channels: 'general'
};

slack.fileUpload(form)
.then(function(response){
  if(!response || !response.ok){
    return Promise.reject(new Error('Something wrong happened during upload'));

  }
  console.log('uploaded succesfully:', response);
  return Promise.resolve(response);
})
.catch(function(err){
  return err;
});

//getChannelHistory(data)
//then(function(response){
  //if(!response || !response.ok){
    //return Promise.reject(new Error('Something wrong happened during uploading history'));

  //}
  ////console.log('uploaded succesfully:', response);
  //return Promise.resolve(response);
//})
//.catch(function(err){
  //return err;
//});


function handleMessage(message) {
	if(message.includes(' chucknorris')){
		Joke();

	}
	else if (message.includes(' placekitten')){
		Kitten();
	}
	else if (message.includes(' quotes')){
		Quotes();

	}
	else if (message.includes(' random')){
		Random();
	}
	else if (message.includes(' helpme')){
		Help();

	 }
}


function Joke() {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
    const jokes = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Chuck Norris: ${jokes}`, params);
  });
}

function Kitten() {
  axios.get('http://placekitten.com/200/300').then(res => {
    const kittens= res.data.image.kitten;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `PlaceKitten: ${kittens}`, params);
  });
}

function Quotes() {
  axios.get('https://talaikis.com/api/quotes/random/').then(res => {
    const quotes = res.data.quote;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Quotes: ${quotes}`, params);
  });
}

function random(){
	
	const rand = Math.floor(Math.random() * 2) + 1;
	if ( rand == 1){
		Joke();
	}else if (rand == 2){
		quotes();
	}else if ( rand == 3){
		kitten();
	}

}



function Help() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'placekitten' or 'quotes' to get a joke`, params);
    
}
