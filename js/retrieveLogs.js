//https://github.com/mdn/simple-web-worker
var count=0;
var displayLogsInterval;
onmessage = function(e) {
  console.log('Message received from main script');
   var data = e.data;
  switch (data.cmd) {
    case 'displayLogs':
      displayLogsInterval = setInterval(displayLogs, 1000);
      break;
    case 'stopDisplayingLogs':
      clearInterval(displayLogsInterval);
    break;
    default:
    break;
  }
  var workerResult = e.data;
}

function displayLogs(){ 
  var workerResult = dataLinkerLogs[count];
  count++;
  if(count > 5){
    count=0;
  }
  var millisecondsToWait = 500;
  sleep(1);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}

function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

 const dataLinkerLogs = 
[`2016-06-09 12:39:40 INFO  PublisherServiceImpl:142 - saving 1 links from collection link_Integ_test_SERIESA__SERIESB_ above score 5`,
`2016-06-09 12:39:41 INFO  PublisherServiceImpl:161 - processed 100 % : page 1 out of 1`,
`2016-06-09 12:39:42 INFO  PublisherServiceImpl:142 - saving 1 links from collection link_Integ_test_SERIESA__SERIESC_ above score 5`,
`2016-06-09 12:39:43 INFO  PublisherServiceImpl:161 - processed 100 % : page 1 out of 1`,
`2016-06-09 12:39:44 INFO  PublisherServiceImpl:275 - removing links from collection link_Integ_test_SERIESA__SERIESB_`,
`2016-06-09 12:39:45 INFO  PublisherServiceImpl:275 - processed 100 % : page 1 out of 1`]
