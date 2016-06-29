//https://developer.mozilla.org/en/docs/Web/API/Window/localStorage


if (window.Worker) { // Check if Browser supports the Worker api.
    // Requries script name as input
    var myWorker = new Worker("js/retrieveLogs.js");


    myWorker.onmessage = function(e) {
      $('#logs').append(e.data+'\n');
      console.log('Message received from worker');
    };
  }

$(document).ready(function(){
  if (localStorage['currentRun']){
    $('#selectFeature').prop('disabled', true);
    $('#selectFeature').val(localStorage['currentRun'].split(",")[0]);

    $('#seriesToAdd').prop('disabled', true);
    refreshListOfSeriesToAdd();
    $('#seriesToAdd').val(localStorage['currentRun'].split(",")[1]);
    $('#seriesToAdd').show('fast');  
 
    $('#stop').show('fast')


    $('#logs').show('fast');
  }


  $('#selectFeature').change(function(){
    $('#publish').hide();
    $('#seriesInfo').hide();
    if (this.value=="add"){
      refreshListOfSeriesToAdd();
      $('#seriesToAdd').show('fast');
      $('#seriesToRemove').hide();
    }else if (this.value=="remove"){
      $('#seriesToAdd').hide();
      $('#seriesToRemove').show('fast');
    }
  });


  $('#seriesToAdd').change(function(){
    $('#publish').hide();
    $('#seriesInfo').hide();
    if (isThereAlreadyLinksForThoseSeries(this.value)){
    	$('#seriesInfo').text('You can publish that series');
    	$('#seriesInfo').addClass('alert-info');
    	$('#seriesInfo').removeClass('alert-warning');

    	$('#publish').text('Publish')
    	$('#publish').addClass('btn-primary');
    	$('#publish').removeClass('btn-danger');
    }else {
    	$('#seriesInfo').text('ADM337 is already linked to ADM339 with that series: link_123456');
    	$('#seriesInfo').removeClass('alert-info');
    	$('#seriesInfo').addClass('alert-warning');

    	$('#publish').text('Force Publication')
    	$('#publish').addClass('btn-danger');
    	$('#publish').removeClass('btn-primary');
    }
    $('#publish').show('fast');
    $('#seriesInfo').show('fast');
  });

  $('#publish').click(function(){
    localStorage['currentRun'] = $('#selectFeature option:selected').val() + "," + $('#seriesToAdd option:selected').val();
    $('#seriesToAdd').prop('disabled', true);
    $('#selectFeature').prop('disabled', true);
    $('#seriesInfo').hide('fast')
    $('#publish').hide('fast')
    $('#stop').show('fast')
    $('#logs').show('fast');
    $('#logs').text("");
    myWorker.postMessage({'cmd': 'displayLogs'});
    // $('#logs').text(dataLinkerLogs);
  });

  $('#stop').click(function(){
    localStorage.removeItem('currentRun');
    $('#seriesToAdd').prop('disabled', false);
    $('#selectFeature').prop('disabled', false);
    $('#stop').hide('fast')
    $('#publish').show('fast')
    myWorker.postMessage({'cmd': 'stopDisplayingLogs'});
  });
});

function isThereAlreadyLinksForThoseSeries(collectionIndex){
  var availableLinkCollections = JSON.parse(getAvailableCollections);
  var sourceName = availableLinkCollections[collectionIndex]["source"]["name"];
  var targetName = availableLinkCollections[collectionIndex]["target"]["name"];

  if (sourceName.includes('ADM339')){
    return true;
  }
  return false
}

function refreshListOfSeriesToAdd(){
  var availableLinkCollections = JSON.parse(getAvailableCollections);
  
  var selectHtml="<option disabled selected>Select a collection of links to add</option>"

  for (var i = availableLinkCollections.length - 1; i >= 0; i--) {
    var sourceName = availableLinkCollections[i]["source"]["name"];
    var targetName = availableLinkCollections[i]["target"]["name"];
    selectHtml+=`<option value="`+ i +`">` + sourceName + " with " +targetName +`</option>`;
  }

  
  $('#seriesToAdd').html(selectHtml)
}

const getAvailableCollections=`
[{"id":"57585c3718a15e6d6cfd1a2d","source":{"name":"ADM339_sample_25Feb2016","iaid":"C15486","timestamp":1465408491664,"count":12103},"target":{"name":"ADM337_sample_25Feb2016","iaid":"C15126","timestamp":1465408512777,"count":13016},"timestamp":1465408567612,"optimizer":{"optimiserConfiguration":{"partitioningAndCandidateGeneratorCombinations":[{"partitioningMethod":"metaphone","candidateGenerator":"Jaro-Winkler","candidateGeneratorThreshold":0.85,"attribute":"familyname"}],"joiningMethod":"intersection"},"optimizerCollectionName":"opti_201606080655_ADM339__ADM337_","count":228736},"linker":{"linkerCollectionName":"link_201606080655_ADM339__ADM337_","linkerConfiguration":{"serviceReferenceComparator":{"algorithmicMethod":{"methodName":"Damerau-Levenstein"},"replaceCost":"2","swapCost":"2","insertCost":"1","deleteCost":"1","disagreementProbability":-3.0},"nameComparator":{"algorithmicMethod":{"methodName":"Jaro-Winkler"},"replaceCost":"1","swapCost":"1","insertCost":"1","deleteCost":"1","familyNameComparator":4,"foreNameComparator":3,"familyNameDisagreementProbability":-5.0,"foreNameDisagreementProbability":-4.0},"dateComparator":{"algorithmicMethod":{"methodName":"default"},"yearComparator":true,"monthComparator":true,"dayComparator":true},"minimumScoreForALinkToBeSaved":0},"count":15283}},{"id":"5758633118a15e79f8c63da6","source":{"name":"ADM339_sample_25Feb2016","iaid":"C15486","timestamp":1465410263835,"count":12103},"target":{"name":"ADM337_sample_25Feb2016","iaid":"C15126","timestamp":1465410287732,"count":13016},"timestamp":1465410353243,"optimizer":{"optimiserConfiguration":{"partitioningAndCandidateGeneratorCombinations":[{"partitioningMethod":"metaphone","candidateGenerator":"Jaro-Winkler","candidateGeneratorThreshold":0.85,"attribute":"familyname"}],"joiningMethod":"intersection"},"optimizerCollectionName":"opti_201606080725_ADM339__ADM337_","count":228736},"linker":{"linkerCollectionName":"link_201606080725_ADM339__ADM337_","linkerConfiguration":{"serviceReferenceComparator":{"algorithmicMethod":{"methodName":"Damerau-Levenstein"},"replaceCost":"2","swapCost":"2","insertCost":"1","deleteCost":"1","disagreementProbability":-3.0},"nameComparator":{"algorithmicMethod":{"methodName":"Jaro-Winkler"},"replaceCost":"1","swapCost":"1","insertCost":"1","deleteCost":"1","familyNameComparator":4,"foreNameComparator":3,"familyNameDisagreementProbability":-5.0,"foreNameDisagreementProbability":-4.0},"dateComparator":{"algorithmicMethod":{"methodName":"default"},"yearComparator":true,"monthComparator":true,"dayComparator":true},"minimumScoreForALinkToBeSaved":0},"count":12689}},{"id":"5759557a922496f520514966","source":{"name":"ASERIES_Integ_test","iaid":"ASERIES","timestamp":1456518522844,"count":28178},"target":{"name":"BSERIES_Integ_test","iaid":"BSERIES","timestamp":1456518597059,"count":66201},"timestamp":1456518926966,"optimizer":{"optimiserConfiguration":{"partitioningAndCandidateGeneratorCombinations":[{"partitioningMethod":"metaphone","candidateGenerator":"Jaro-Winkler","candidateGeneratorThreshold":0.85,"attribute":"familyname"}],"joiningMethod":"intersection"},"optimizerCollectionName":"opti_201602260831_ADM240__ADM196_","count":1882813},"linker":{"linkerCollectionName":"link_Integ_test_SERIESA__SERIESB_","linkerConfiguration":{"nameComparator":{"algorithmicMethod":{"methodName":"Jaro-Winkler"},"replaceCost":"1","swapCost":"1","insertCost":"1","deleteCost":"1","familyNameComparator":4,"foreNameComparator":3,"familyNameDisagreementProbability":-5.0,"foreNameDisagreementProbability":-4.0},"dateComparator":{"algorithmicMethod":{"methodName":"default"}}},"count":57802}},{"id":"5759557a922496f520514967","source":{"name":"CSERIES_Integ_test","iaid":"CSERIES","timestamp":1456515862300,"count":5948},"target":{"name":"ASERIES_Integ_test","iaid":"ASERIES","timestamp":1456515884077,"count":28178},"timestamp":1456515976231,"optimizer":{"optimiserConfiguration":{"partitioningAndCandidateGeneratorCombinations":[{"partitioningMethod":"metaphone","candidateGenerator":"Jaro-Winkler","candidateGeneratorThreshold":0.85,"attribute":"familyname"}],"joiningMethod":"intersection"},"optimizerCollectionName":"opti_201602260745_ADM340__ADM240_","count":227893},"linker":{"linkerCollectionName":"link_Integ_test_SERIESA__SERIESC_","linkerConfiguration":{"nameComparator":{"algorithmicMethod":{"methodName":"Jaro-Winkler"},"replaceCost":"1","swapCost":"1","insertCost":"1","deleteCost":"1","familyNameComparator":4,"foreNameComparator":3,"familyNameDisagreementProbability":-5.0,"foreNameDisagreementProbability":-4.0},"dateComparator":{"algorithmicMethod":{"methodName":"default"}}},"count":15173}}]
`
const getCurrentlyPublishedLinkedSeries=`
[{"iaid":"C2133","linkedToSeries":[{"sourceName":"AIR79_26Feb2016","targetIaid":"C1897","targetName":"ADM188_RNAS_25Feb2016","linksCollectionName":"link_201604121259_ADM188__AIR79_2"},{"sourceName":"AIR79_26Feb2016","targetIaid":"C2133","targetName":"AIR79_26Feb2016","linksCollectionName":"link_201604121100_AIR79_2_AIR79_2"},{"sourceName":"AIR79_26Feb2016","targetIaid":"C2133","targetName":"AIR79_26Feb2016","linksCollectionName":"link_201604121100_AIR79_2_AIR79_2"},{"sourceName":"AIR79_26Feb2016","targetIaid":"C2130","targetName":"AIR76_25Feb2016","linksCollectionName":"link_201604120509_AIR76_2_AIR79_2"},{"sourceName":"AIR79_26Feb2016","targetIaid":"C1981","targetName":"ADM273_25Feb2016","linksCollectionName":"link_201604110636_ADM273__AIR79_2"},{"sourceName":"AIR79_RN_26Feb2016","targetIaid":"C1897","targetName":"ADM188_26Feb2016","linksCollectionName":"link_201604110606_AIR79_R_ADM188_"}]},{"iaid":"C14731481","linkedToSeries":[{"sourceName":"ADM363_25Feb2016","targetIaid":"C1897","targetName":"ADM188_26Feb2016","linksCollectionName":"link_201604120742_ADM363__ADM188_"},{"sourceName":"ADM363_25Feb2016","targetIaid":"C14731481","targetName":"ADM363_25Feb2016","linksCollectionName":"link_201604120616_ADM363__ADM363_"},{"sourceName":"ADM363_25Feb2016","targetIaid":"C14731481","targetName":"ADM363_25Feb2016","linksCollectionName":"link_201604120616_ADM363__ADM363_"},{"sourceName":"ADM363_25Feb2016","targetIaid":"C3387","targetName":"BT351_26Feb2016","linksCollectionName":"link_201604120543_ADM363__BT351_2"},{"sourceName":"ADM363_25Feb2016","targetIaid":"C15126","targetName":"ADM337_25Feb2016","linksCollectionName":"link_201604120118_ADM337__ADM363_"},{"sourceName":"ADM363_25Feb2016","targetIaid":"C14731480","targetName":"ADM362_25Feb2016","linksCollectionName":"link_201604110751_ADM362__ADM363_"}]},{"iaid":"C10913680","linkedToSeries":[{"sourceName":"BT377_26Feb2016","targetIaid":"C10913680","targetName":"BT377_26Feb2016","linksCollectionName":"link_201604120721_BT377_2_BT377_2"},{"sourceName":"BT377_26Feb2016","targetIaid":"C10913680","targetName":"BT377_26Feb2016","linksCollectionName":"link_201604120721_BT377_2_BT377_2"},{"sourceName":"BT377_26Feb2016","targetIaid":"C1897","targetName":"ADM188_B_26Feb2016","linksCollectionName":"link_201604120533_BT377_2_ADM188_"},{"sourceName":"BT377_26Feb2016","targetIaid":"C15126","targetName":"ADM337_25Feb2016","linksCollectionName":"link_201604120138_ADM337__BT377_2"},{"sourceName":"BT377_26Feb2016","targetIaid":"C3202","targetName":"BT164_25Feb2016","linksCollectionName":"link_201604110701_BT164_2_BT377_2"},{"sourceName":"BT377_26Feb2016","targetIaid":"C1897","targetName":"ADM188_A_26Feb2016","linksCollectionName":"link_201604120411_BT377_2_ADM188_"}]},{"iaid":"C2130","linkedToSeries":[{"sourceName":"AIR76_25Feb2016","targetIaid":"C2130","targetName":"AIR76_25Feb2016","linksCollectionName":"link_201604120637_AIR76_2_AIR76_2"},{"sourceName":"AIR76_25Feb2016","targetIaid":"C2130","targetName":"AIR76_25Feb2016","linksCollectionName":"link_201604120637_AIR76_2_AIR76_2"},{"sourceName":"AIR76_25Feb2016","targetIaid":"C2133","targetName":"AIR79_26Feb2016","linksCollectionName":"link_201604120509_AIR76_2_AIR79_2"},{"sourceName":"AIR76_25Feb2016","targetIaid":"C14543","targetName":"WO339_25Feb2016","linksCollectionName":"link_201604120410_AIR76_2_WO339_2"},{"sourceName":"AIR76_25Feb2016","targetIaid":"C1981","targetName":"ADM273_25Feb2016","linksCollectionName":"link_201604110617_ADM273__AIR76_2"}]},{"iaid":"C14543","linkedToSeries":[{"sourceName":"WO339_25Feb2016","targetIaid":"C2130","targetName":"AIR76_25Feb2016","linksCollectionName":"link_201604120410_AIR76_2_WO339_2"},{"sourceName":"WO339_25Feb2016","targetIaid":"C14578","targetName":"WO374_25Feb2016","linksCollectionName":"link_201604110813_WO374_2_WO339_2"},{"sourceName":"WO339_25Feb2016","targetIaid":"C14284","targetName":"WO76_25Feb2016","linksCollectionName":"link_201604110719_WO76_25_WO339_2"},{"sourceName":"WO339_25Feb2016","targetIaid":"C14543","targetName":"WO339_25Feb2016","linksCollectionName":"link_201605161233_WO339_2_WO339_2"},{"sourceName":"WO339_25Feb2016","targetIaid":"C14543","targetName":"WO339_25Feb2016","linksCollectionName":"link_201605161233_WO339_2_WO339_2"}]},{"iaid":"C1868","linkedToSeries":[{"sourceName":"ADM159_26Feb2016","targetIaid":"C1868","targetName":"ADM159_26Feb2016","linksCollectionName":"link_201604120652_ADM159__ADM159_"},{"sourceName":"ADM159_26Feb2016","targetIaid":"C1868","targetName":"ADM159_26Feb2016","linksCollectionName":"link_201604120652_ADM159__ADM159_"},{"sourceName":"ADM159_26Feb2016","targetIaid":"C1897","targetName":"ADM188_26Feb2016","linksCollectionName":"link_201604120226_ADM159__ADM188_"},{"sourceName":"ADM159_26Feb2016","targetIaid":"C1905","targetName":"ADM196_25Feb2016","linksCollectionName":"link_201604111025_ADM196__ADM159_"}]},{"iaid":"C15486","linkedToSeries":[{"sourceName":"ADM339_25Feb2016","targetIaid":"C15486","targetName":"ADM339_25Feb2016","linksCollectionName":"link_201604120555_ADM339__ADM339_"},{"sourceName":"ADM339_25Feb2016","targetIaid":"C15486","targetName":"ADM339_25Feb2016","linksCollectionName":"link_201604120555_ADM339__ADM339_"},{"sourceName":"ADM339_25Feb2016","targetIaid":"C1897","targetName":"ADM188_26Feb2016","linksCollectionName":"link_201604111001_ADM339__ADM188_"},{"sourceName":"ADM339_25Feb2016","targetIaid":"C3387","targetName":"BT351_26Feb2016","linksCollectionName":"link_201604110845_ADM339__BT351_2"},{"sourceName":"ADM339_25Feb2016","targetIaid":"C15126","targetName":"ADM337_25Feb2016","linksCollectionName":"link_201604110826_ADM339__ADM337_"}]},{"iaid":"C3387","linkedToSeries":[{"sourceName":"BT351_26Feb2016","targetIaid":"C1897","targetName":"ADM188_B_26Feb2016","linksCollectionName":"link_201604121055_BT351_2_ADM188_"},{"sourceName":"BT351_26Feb2016","targetIaid":"C3387","targetName":"BT351_26Feb2016","linksCollectionName":"link_201604120807_BT351_2_BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C3387","targetName":"BT351_26Feb2016","linksCollectionName":"link_201604120807_BT351_2_BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C14731481","targetName":"ADM363_25Feb2016","linksCollectionName":"link_201604120543_ADM363__BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C15126","targetName":"ADM337_25Feb2016","linksCollectionName":"link_201604120202_ADM337__BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C1905","targetName":"ADM196_25Feb2016","linksCollectionName":"link_201604111046_ADM196__BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C15486","targetName":"ADM339_25Feb2016","linksCollectionName":"link_201604110845_ADM339__BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C1948","targetName":"ADM240_25Feb2016","linksCollectionName":"link_201604110742_ADM240__BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C16062","targetName":"ADM340_25Feb2016","linksCollectionName":"link_201604110652_ADM340__BT351_2"},{"sourceName":"BT351_26Feb2016","targetIaid":"C1897","targetName":"ADM188_A_26Feb2016","linksCollectionName":"link_201604120926_BT351_2_ADM188_"}]},{"iaid":"C15126","linkedToSeries":[{"sourceName":"ADM337_25Feb2016","targetIaid":"C15126","targetName":"ADM337_25Feb2016","linksCollectionName":"link_201604120601_ADM337__ADM337_"},{"sourceName":"ADM337_25Feb2016","targetIaid":"C15126","targetName":"ADM337_25Feb2016","linksCollectionName":"link_201604120601_ADM337__ADM337_"},{"sourceName":"ADM337_25Feb2016","targetIaid":"C1897","targetName":"ADM188_26Feb2016","linksCollectionName":"link_201604120335_ADM337__ADM188_"},{"sourceName":"ADM337_25Feb2016","targetIaid":"C3387","targetName":"BT351_26Feb2016","linksCollectionName":"link_201604120202_ADM337__BT351_2"},{"sourceName":"ADM337_25Feb2016","targetIaid":"C10913680","targetName":"BT377_26Feb2016","linksCollectionName":"link_201604120138_ADM337__BT377_2"},{"sourceName":"ADM337_25Feb2016","targetIaid":"C14731481","targetName":"ADM363_25Feb2016","linksCollectionName":"link_201604120118_ADM337__ADM363_"},{"sourceName":"ADM337_25Feb2016","targetIaid":"C15486","targetName":"ADM339_25Feb2016","linksCollectionName":"link_201604110826_ADM339__ADM337_"}]},{"iaid":"C14578","linkedToSeries":[{"sourceName":"WO374_25Feb2016","targetIaid":"C14543","targetName":"WO339_25Feb2016","linksCollectionName":"link_201604110813_WO374_2_WO339_2"},{"sourceName":"WO374_25Feb2016","targetIaid":"C14284","targetName":"WO76_25Feb2016","linksCollectionName":"link_201604110708_WO76_25_WO374_2"},{"sourceName":"WO374_25Feb2016","targetIaid":"C14578","targetName":"WO374_25Feb2016","linksCollectionName":"link_201605161205_WO374_2_WO374_2"},{"sourceName":"WO374_25Feb2016","targetIaid":"C14578","targetName":"WO374_25Feb2016","linksCollectionName":"link_201605161205_WO374_2_WO374_2"}]}]
`



