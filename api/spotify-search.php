<?php
//Return response as JavaScript

header('Content-Type: application/javascript');

//Retrieve the callbackKey from Ext.data.JsonP.request()
$callbackkey = filter_input(INPUT_GET, 'callback', FILTER_SANITIZE_ENCODED);
$query = filter_input(INPUT_GET, 'q', FILTER_SANITIZE_ENCODED);
$isMock = filter_input(INPUT_GET, 'isMock', FILTER_SANITIZE_ENCODED);
$cType = filter_input(INPUT_GET, 'cType', FILTER_SANITIZE_ENCODED);
$secure = filter_input(INPUT_GET, 'secure', FILTER_SANITIZE_ENCODED);

if($secure == "1") {
    $protocol = "https://";
} else {
    $protocol = "http://";
}

$url =  $protocol . 'api.spotify.com/v1/search?q='. $query .'&type=' .$cType;

if($isMock == "true"){
    if($query == "Guano%20Apes"){
        $url = $url. '../api/mocks/spotify-results.json';
    } else if ($query == "Guans"){
        $url = $url. '../api/mocks/spotify-result.json';
    } else if ($query == "Nielson & Miss Montreal"){
        $url = $url. '../api/mocks/spotify-characters.json';
    } else {
        $url = $url. '../api/mocks/spotify-noresult.json';
    }
}

$SPOTIFY_FILE_NAME = "caches/spotify-" . $query . ".js";
//$CACHEDTIME = '{ "cached": '. time() . "}";

$results = get_content($SPOTIFY_FILE_NAME, $url);
//print $results;

$output = json_encode($results);
//print $output;

//Wrap it in the callback key
if($callbackkey) {
  echo $callbackkey . '(' . $results . ');';
}else{
  echo $results;
}

function get_content($file,$url,$hours = 24,$fn = '',$fn_args = '') {
	//vars
	$current_time = time();
    $expire_time = $hours * 60 * 60;
	//decisions, decisions
    if(file_exists($file)){
        $file_time = filemtime($file);
    }
    if(file_exists($file) && ($current_time - $expire_time < $file_time)) {
        //echo 'returning from cached file';
        return file_get_contents($file);
    }
	else {
        $content = get_url($url);
		if($fn) { $content = $fn($content,$fn_args); }
		file_put_contents($file,$content);
		//echo 'retrieved fresh from '.$url.':: '.$content;
		return $content;
	}
}

function get_url($URL) {
    $result = file_get_contents($URL);
    return $result;
}
?>
