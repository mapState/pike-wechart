import fly from '@/utils/request'

export default {
    loginApi: (data) => {
        return fly.post('/ztpk-service/login/wx/callback', data);
    },
    getWatchList: (data) => {
        return fly.get('/ztpk-service/cache/getWatchList', data);
    },
    cancelIt: (data) => {
        return fly.post('/ztpk-service/watch/cancelIt', data);
    },
    likeDoIt: (data) => {
        return fly.post('/ztpk-service/like/doIt', data);
    },
    likeCancelIt: (data) => {
        return fly.post('/ztpk-service/like/cancelIt', data);
    },
    doIt: (data) => {
        return fly.post('/ztpk-service/watch/doIt', data);
    },
    newList: (data) => {
        return fly.get('/ztpk-service/pkVideo/newList', data);
    },
    nearList: (data) => {
        return fly.get('/ztpk-service/pkVideo/nearList', data);
    },
    monthList: (data) => {
        return fly.get('/ztpk-service/pkVideo/monthList', data);
    },
    weekList: (data) => {
        return fly.get('/ztpk-service/pkVideo/weekList', data);
    },
    person: (data) => {
        return fly.get('/ztpk-service/user/person', data);
    },
    kbPay: (data) => {
        return fly.post('/ztpk-service/order/kbPay', data);
    },
    fans: (data) => {
        return fly.get('/ztpk-service/watch/fans', data);
    },
    watch: (data) => {
        return fly.get('/ztpk-service/watch/list', data);
    },
    userGet: (data) => {
        return fly.get('/ztpk-service/user/get', data);
    },
    cacheUser: (data) => {
        return fly.get('/ztpk-service/cache/user', data);
    },
    userUpdate: (data) => {
        return fly.post('/ztpk-service/user/update', data);
    },
    joinByKB: (data) => {
        return fly.post('/ztpk-service/guess/joinByKB', data);
    },
    getGiftListByUser: (data) => {
        return fly.get('/ztpk-service/gift/getGiftListByUser', data);
    },
    getDowryListByUser: (data) => {
        return fly.get('/ztpk-service/gift/getDowryListByUser', data);
    },
    
}
