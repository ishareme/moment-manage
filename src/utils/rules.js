const rules = {
    /**
     * 必填验证
     * @param {String} field - 必填项的label名，如“姓名”
     * @param {String} type - 数据类型，默认为string
     * @param {String} trigger - 触发类型，默认为blur
     */
    required: (field, type = 'string', trigger = 'blur') => ({
        type,
        required: true,
        message: `${field}不能为空`,
        trigger,
    }),

    /**
     * 长度验证
     * @param {Number} min - 最小长度
     * @param {Number} max - 最大长度
     */
    length: (min, max) => ({
        min,
        max,
        message: `字符长度应在${min}到${max}之间`,
        trigger: 'blur',
    }),

    min: min => ({
        min,
        message: `至少输入${min}个以上字符`,
        trigger: 'blur',
    }),

    max: max => ({
        max,
        message: `只能输入最多${max}个字符`,
        trigger: 'blur',
    }),

    // 有效数字验证（可以为0，但不能为0开头的数字比如012）
    int: {
        pattern: /^(0|[1-9][0-9]*)$/,
        message: '请输入有效数字',
        trigger: 'blur',
    },

    // 匹配正浮点数
    float: {
        pattern: /^(?:[1-9][0-9]*\.[0-9]+|0\.(?!0+$)[0-9]+)$/,
        message: '请输入有效的浮点数',
        trigger: 'blur',
    },

    // 价格验证(小数点后最多两位，不能以01开头，小数点后必须要有数字)
    price: {
        pattern: /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/,
        message: '请输入正确的价格',
        trigger: 'blur',
    },

    // 手机号码验证
    mobile: {
        // pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/,
        pattern: /^1[3|4|5|7|8]\d{9}$/,
        message: '手机号码格式不正确',
        trigger: 'blur',
    },

    // 身份证验证
    idcard: {
        pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
        message: '身份证格式不正确',
        trigger: 'blur',
    },

    // 邮箱验证
    email: {
        type: 'email',
        message: '邮箱地址格式不正确',
        trigger: 'blur',
    },

    // 汉字验证
    chinese: {
        pattern: /^[\u4e00-\u9fa5]{0,}$/,
        message: '请输入汉字',
        trigger: 'blur',
    },

    // 淘宝链接
    taobao: {
        pattern: /^.*taobao.com|tmall.com.*$/,
        message: '请输入正确的淘宝店铺链接',
        trigger: 'blur',
    },

    // 微博链接
    weibo: {
        pattern: /^.*weibo.com.*$/,
        message: '请输入正确的微博主页链接',
        trigger: 'blur',
    },

    // 网址
    url: {
        // eslint-disable-next-line
        pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
        message: '请输入完整的网址链接(需包含http或者https)',
        trigger: 'blur',

    },

    // 姓名验证（中文包含少数民族如：买买提·陈奕迅·阿凡提，英文名支持由空格和·分隔开）
    name: {
        pattern: /^([\u4e00-\u9fa5]+|[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*|([a-zA-Z]+\s?)+|[a-zA-Z]+(·[a-zA-Z]+)*)$/,
        message: '姓名格式不正确',
        trigger: 'blur',
    },
};

export default class Rules {
    static install(Vue) {
    // eslint-disable-next-line
    Vue.prototype.$rules = rules
    }
}
