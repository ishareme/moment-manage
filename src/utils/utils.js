export default {
    isEmail(str){
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str)
    },
    isPhone(str){
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
    }
}