import Config from '../service/config'

const bgSoundMger = wx.getBackgroundAudioManager()
let timeout = ''
let interval = ''
let playtime = 0
let _params = {}
let playIndex = 0
let total = 1
/**
 * 初始化
 *
 * @param {Object} data
 *  music:音频数组
 *  music[i].url:音频地址(网络地址)
 *  music[i].time:音频时长(秒)
    music[i].start:开始播放位置(秒,默认0)

	playnow:立即播放(true,false,默认true)
	loop:是否循环(true,false,默认true)
	* @returns {Promise}
	*/
const init = params => {
	_params = params
	if (_params.playnow == undefined)
		_params.playnow = true
	if (_params.loop == undefined)
		_params.loop = true
	_params.music.map(item => {
		item.start == undefined ? item.start = 0 : ''
		return item
	})
	console.info(_params)
	_params.isPause = false
	_params.title = 'bgmusic'
	total = _params.music.length
	// 立即播放
	if (_params.playnow) {
		play()
	}
}
// （继续）播放
const play = () => {
	if (_params.isPause) {
		let _session = getSession()
		console.info(_session)
		playtime = (_session.pauseTime - _session.startTime) / 1000
		playtime > _params.music[playIndex].time ? playtime = _params.music[playIndex].time : ''
		let _continue_time = playtime + _params.music[playIndex].start
		_continue_time >= _params.music[playIndex].time ? _continue_time = 0 : ''
		console.info(_params.isPause, _continue_time)
		_play(_continue_time)
		timeout = setTimeout(() => {
			playIndex++
			playIndex >= total ? playIndex = 0 : ''
			if (!_params.loop && playIndex == 0) {
				_params.isPause = true
				return
			}
			play()
		}, (_params.music[playIndex].time - _continue_time) * 1000)
	} else {
		_play(_params.music[playIndex].start)
		timeout = setTimeout(() => {
			playIndex++
			playIndex >= total ? playIndex = 0 : ''
			if (!_params.loop && playIndex == 0) {
				_params.isPause = true
				return
			}
			play()
		}, (_params.music[playIndex].time - _params.music[playIndex].start) * 1000)
	}
}
// 微信播放
const _play = (start) => {
	let _session = getSession()
	_session == '' ? _session = {} : ''
	if (start == 0) {
		_session.startTime = new Date().getTime()
		_session.pauseTime = new Date().getTime()
	} else {
		_session.startTime = new Date().getTime() - playtime * 1000
		_session.pauseTime = new Date().getTime() - playtime * 1000
	}
	wx.seekBackgroundAudio({
		position: start
	})
	wx.playBackgroundAudio({
		dataUrl: _params.music[playIndex].url,
		title: _params.title,
		success: res => {
			setSession(_session)
		},
		fail: res => {
			console.info(res)
		}
	})
	_params.isPause = false
}
// 停止
const stop = () => {
	wx.stopBackgroundAudio()
	let _session = getSession()
	_session == '' ? _session = {} : ''
	_session.stopTime = new Date().getTime()
	setSession(_session)
	_params.isPause = false
	playtime = 0
	clearTimeout(timeout)
	clearInterval(interval)
}
// 暂停
const pause = () => {
	wx.pauseBackgroundAudio()
	let _session = getSession()
	_session == '' ? _session = {} : ''
	_session.pauseTime = new Date().getTime()
	setSession(_session)
	_params.isPause = true
	clearTimeout(timeout)
	clearInterval(interval)
}
const setSession = session => {
	wx.setStorageSync(Config.SESSION_KEY + 'music', session)
}
const getSession = () => {
	try {
		return wx.getStorageSync(Config.SESSION_KEY + 'music')
	} catch (e) {
		return null
	}
}
const getParams = () => {
	return _params
}
export default {
	init: init,
	stop: stop,
	pause: pause,
	play: play,
	getParams: getParams
}