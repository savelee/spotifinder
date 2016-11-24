<?php
//Return response as JavaScript
header('Content-Type: application/javascript');

//Retrieve the callbackKey from Ext.data.JsonP.request()
$callbackkey = filter_input(INPUT_GET, 'callback', FILTER_SANITIZE_ENCODED);
$method = filter_input(INPUT_GET, 'method', FILTER_SANITIZE_ENCODED);
$user = filter_input(INPUT_GET, 'user', FILTER_SANITIZE_ENCODED);
$period = filter_input(INPUT_GET, 'period', FILTER_SANITIZE_ENCODED);
$apiKey = filter_input(INPUT_GET, 'api_key', FILTER_SANITIZE_ENCODED);
$start = filter_input(INPUT_GET, 'start', FILTER_SANITIZE_ENCODED);
$page = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_ENCODED);
$limit = filter_input(INPUT_GET, 'limit', FILTER_SANITIZE_ENCODED);
$secure = filter_input(INPUT_GET, 'secure', FILTER_SANITIZE_ENCODED);

//if($secure == "1") {
    $protocol = "https://";
//} else {
//    $protocol = "http://";
//}

$url =  $protocol . 'ws.audioscrobbler.com/2.0/?user='. $user . '&method=' . $method
. '&period=' . $period . '&api_key=' . $apiKey . '&start=' . $start . '&page=' . $page
. '&limit=' . $limit . '&format=json';

//https://ws.audioscrobbler.com/2.0/?user=savelee&start=0&page=1&limit=100&period=overall&method=user.getTopArtists&api_key=14662b3ba219b6332f9620776067a8e5&callback=jsonp14761983102280&format=json

$LASTFM_FILE_NAME = "caches/lastfm-" . $user . "-" . $method . "-" . $page . ".js";
//$CACHEDTIME = ',{ "cached": '. time() . "}";

$results = get_content($LASTFM_FILE_NAME,$url,$user);

$output = json_encode($results);
//Wrap it in the callback key
if($callbackkey) {
  echo $callbackkey . '(' . $results . ');';
}else{
  echo $results;
}

function get_content($file,$url,$user,$hours = 24,$fn = '',$fn_args = '') {
    //vars
    $current_time = time();
    $expire_time = $hours * 60 * 60;
    //decisions, decisions
    if(file_exists($file)){
        $file_time = filemtime($file);
    }

    if(file_exists($file) && ($current_time - $expire_time < $file_time)) {
        //echo 'returning from cached file';
        $cached = file_get_contents($file);
        $array = (array) json_decode($cached);
        $member = '@attr';
        
        $array = reset($array);
        $username = $array->$member->user;

        if($username == $user) {
            return $cached;
        } else {
            $content = get_url($url);
            if($fn) { $content = $fn($content,$fn_args); }
            $CACHEDTIME = '{ "cached": '. time() . "}";
            file_put_contents($file,$content);
            //echo 'retrieved fresh from '.$url.':: '.$content;
            return $content;          
        }
    } else {
		$content = get_url($url);
		if($fn) { $content = $fn($content,$fn_args); }
		$CACHEDTIME = '{ "cached": '. time() . "}";
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
