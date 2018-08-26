const is = (function () {
    const ua = window.navigator.userAgent.toLowerCase();

    return {
        //设备
        iOS: /(iPhone|iPad|iPod|iOS)/gi.test(ua),
        Android: /android|adr/gi.test(ua),
        Mobile: /(iPhone|iPad|iPod|iOS|Android|adr|Windows Phone|SymbianOS)/gi.test(ua),
        Weibo: /(weibo)/gi.test(ua),
        WeChat: ua.match(/MicroMessenger/gi) == 'micromessenger' ? true : false,
        QQ: /qq\//gi.test(ua),
        Qzone: ua.indexOf('qzone/') !== -1,
        Meitu: /(com.meitu)/gi.test(ua),
        Meipai: /meipaimv|meipai|com.meitu.mtmv/ig.test(ua),
        Meipu: /com.meitu.meipu/ig.test(ua),
        Xiuxiu: /(com.meitu.mtxx)/gi.test(ua),
        // ios: com.meitu.myxj, android: com.meitu.meiyancamera
        Meiyan: /(com.meitu.myxj|com.meitu.meiyancamera)/gi.test(ua),
        Makeup: /com.meitu.makeup/ig.test(ua),
        Selfilecity: /com.meitu.wheelcam/ig.test(ua),
        Beautyme: /com.meitu.zhi.beauty/ig.test(ua),
        Shanliao: /(com.meitu.shanliao|com.meitu.testwheetalk)/ig.test(ua),
        Twitter: /Twitter/ig.test(ua),
        Facebook: /fbav/ig.test(ua),
    };
})();

export default class Is {
    static install(Vue) {
        // eslint-disable-next-line
        Vue.prototype.$is = is
    }
}
