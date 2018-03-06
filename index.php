<?php
// 酌情考虑该参数是否开启，如果遇到CC请关闭此参数，默认关闭，有特殊需求再开启
ignore_user_abort(true);

if (! isset($_SERVER["REQUEST_TIME_FLOAT"]))
    $_SERVER["REQUEST_TIME_FLOAT"] = microtime(true);
    
    // 计算脚本的执行时间与CPU使用时间，仅限linux系统使用
if (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN') {
    $systemInfo = getrusage();
    defined('PHP_CPU_RUSAGE') || define('PHP_CPU_RUSAGE', $systemInfo["ru_utime.tv_sec"] + $systemInfo["ru_utime.tv_usec"] / 1e6);
}

if (isset($_SERVER['HTTP_HOST']) && ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === '127.0.0.1')) {
    $_SERVER['GEARMAN_SERVER'] = '192.168.5.41:4730';
    $_SERVER['ICC_MEMCACHED_SERVER'] = '127.0.0.1:11211';
    $_SERVER['ICC_REDIS_MASTERS'] = '127.0.0.1:6379';
    $_SERVER['ICC_MONGOS_ICC'] = '127.0.0.1:27017';
}

defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));
// [production(demo和生产环境)|testing(27环境)|development(本地开发环境)]
defined('APPLICATION_ENV') || define('APPLICATION_ENV', isset($_SERVER['APPLICATION_ENV']) ? $_SERVER['APPLICATION_ENV'] : 'development');

if (APPLICATION_ENV === 'production' || APPLICATION_ENV === 'testing') {
    require 'iWebsite2/define.php';
    require 'iWebsite2/vendor/autoload.php';
} else {
    require APPLICATION_PATH . '/configs/constant.php';
    require APPLICATION_PATH . '/../vendor/autoload.php';
}

try {
    require 'Zend/Application.php';
    $application = new Zend_Application(APPLICATION_ENV, APPLICATION_PATH . '/configs/application.ini');
    $application->bootstrap()->run();
} catch (Zend_Controller_Exception $e) {
    die($e->getMessage());
    header("HTTP/1.1 404 Not Found");
    fb($e, 'LOG');
    exit();
} catch (Exception $e) {
    var_dump($e);
}
