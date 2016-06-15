$(document).ready(function(){
  $('#feature').change(function(){
    if (this.value=="add"){
      $('#seriesToAdd').show();
      $('#seriesToRemove').hide();
    }else if (this.value=="remove"){
      $('#seriesToAdd').hide();
      $('#seriesToRemove').show();
    }
  });


  $('#seriesToAdd').change(function(){
    $('#publish').hide();
    $('#seriesInfo').hide();
    if (this.value=="1"){
    	$('#seriesInfo').text('You can publish that series');
    	$('#seriesInfo').addClass('alert-info');
    	$('#seriesInfo').removeClass('alert-warning');

    	$('#publish').text('Publish')
    	$('#publish').addClass('btn-primary');
    	$('#publish').removeClass('btn-danger');
    }else if (this.value=="2"){
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
    $('#logs').show('fast');
    var text = `
2016-06-10 10:34:02 INFO  TTTService:75 - start TTT Process
2016-06-10 10:34:02 INFO  TTTService:77 - Initialise Data
2016-06-10 10:34:02 INFO  TTTService:158 - use External statistics on names
2016-06-10 10:34:02 INFO  TTTService:89 - Process inputs
2016-06-10 10:34:02 INFO  ProcessInputService:81 - collection ADM240_25Feb2016 already exists in database. We do not process input file
2016-06-10 10:34:02 INFO  TTTService:92 - running the linker on a single file, do not process inputs for "second file"
2016-06-10 10:34:02 INFO  TTTService:109 - Start Optimisation
2016-06-10 10:34:02 INFO  OptimisationService:55 - processOptimisation
2016-06-10 10:34:02 INFO  OptimisationService:73 - optimising on 'familyname' using 'metaphone' partitioning optimiserConfiguration and 'Jaro-Winkler' candidate generator
2016-06-10 10:34:02 INFO  OptimisationService:147 - partition collections
2016-06-10 10:34:03 INFO  PartitioningTool:41 - size of multi value map = 3197
2016-06-10 10:34:03 INFO  OptimisationService:154 - generate candidates
2016-06-10 10:34:20 INFO  OptimisationService:94 - create indexes
2016-06-10 10:34:30 INFO  OptimisationService:100 - intersect optimisation results
2016-06-10 10:34:33 INFO  OptimisationService:206 - optimiser table 'opti_201606101034_ADM240__ADM240_' has 529846 entries
2016-06-10 10:34:33 INFO  TTTService:125 - Start Linker
2016-06-10 10:34:33 INFO  LinkerService:95 - Entering link Method
2016-06-10 10:34:33 INFO  LinkerService:100 - people will be linked on forenames and firstnames
2016-06-10 10:34:33 INFO  LinkerService:104 - people will be linked on dob
2016-06-10 10:34:45 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14614262 and TTT-C1948_C14614449
2016-06-10 10:34:49 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14626223 and TTT-C1948_C14618785
2016-06-10 10:34:55 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14614300 and TTT-C1948_C14614471
2016-06-10 10:34:55 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14614300 and TTT-C1948_C14638744
2016-06-10 10:34:55 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14614300 and TTT-C1948_C14641470
2016-06-10 10:34:55 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14614471 and TTT-C1948_C14638744
2016-06-10 10:34:55 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14614471 and TTT-C1948_C14641470
2016-06-10 10:34:55 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14641470 and TTT-C1948_C14638744
2016-06-10 10:35:01 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14625349 and TTT-C1948_C14635457
2016-06-10 10:35:01 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14625349 and TTT-C1948_C14635843
2016-06-10 10:35:01 WARN  LinkerService:177 - a link already exists on TTT-C1948_C14623102 and TTT-C1948_C14625349
2016-06-10 10:35:01 INFO  LinkerService:118 - create index on linker collection
2016-06-10 10:35:01 INFO  LinkerService:121 - finished link process, see collection: link_201606101034_ADM240__ADM240_
2016-06-10 10:35:01 INFO  TTTService:136 - Log and Audit
2016-06-10 10:35:01 INFO  TTTService:141 - clean Optimisation collections
2016-06-10 10:35:01 INFO  TTTService:145 - process completed`
    $('#logs').text(text);
  });
});