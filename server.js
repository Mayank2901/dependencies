var express=require('express'),
	request = require('request'),
	bodyParser=require('body-parser'),
	fs=require('fs');

var myJSON = require("JSON");	
var app=express();

var url;
var score;
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
	res.sendFile(__dirname+"/input.html");   //Page to input the query.Query is inputted to textbox in the page.
});
app.post('/scrap',function(req,res){
	var str=[];
	str=req.body.query;
	console.log('string=='+str);
	console.log(str.length);
	console.log(req.body.query);
	url='http://api.artt.in/?q='+(req.body.query);
	request(url, function(error, response, html){

	console.log(html);
	myJSON=html;							    			
	var data=JSON.parse(myJSON);
	console.log(html.length);
	var i=0;
	var d='';
	for(i=0;i<1000;i++)
{
	if(data.dependencies[0].dep[i]==undefined)
	break;	

	if((data.dependencies[0].dep[i].$.type)!=undefined)
	{
		
		console.log(data.dependencies[0].dep[i].$.type+'('+data.dependencies[0].dep[i].governor._+'-'+data.dependencies[0].dep[i].governor.$.idx+','+data.dependencies[0].dep[i].dependent._+'-'+data.dependencies[0].dep[i].dependent.$.idx+')');
		console.log('\n');
		
		d=d+data.dependencies[0].dep[i].$.type+'('+data.dependencies[0].dep[i].governor._+'-'+data.dependencies[0].dep[i].governor.$.idx+','+data.dependencies[0].dep[i].dependent._+'-'+data.dependencies[0].dep[i].dependent.$.idx+')'+' , ';
		d=d+'\t';
		console.log('d=='+d);
	}	
	
}
	res.send(d);
});
});
app.listen(4000);