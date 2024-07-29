//<iframe width="100%" id="intervention_frame" height="800"></iframe>
//<script>
//var q_code = Math.floor(100000 + Math.random() * 900000);;
//Qualtrics.SurveyEngine.setEmbeddedData( 'Qualtrics_code', q_code);
//var url = "https://futureyoufulloption.patthai.repl.co/?"+q_code;
//document.getElementById("intervention_frame").src = url;
//</script>

function get_qualtrics_variable() {
  const URL = window.location.href.toString();
  const URL_trim = URL.substring(URL.indexOf('?') + 1);
  console.log("URL : " + URL_trim);
  qualtrics_code = URL_trim;
  console.log(qualtrics_code);
}

get_qualtrics_variable();