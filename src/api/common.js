import fly from '@/utils/request'
export default{
    adList:(data)=>{
        return fly.get('/ztpk-service/advert/list',data);
    },
    dict:(data)=>{
        return fly.get('/ztpk-service/cache/dict',data);
    },
    pkList:(data)=>{
        return fly.get('/ztpk-service/pkVideo/pkList',data);
    },
    pkVideo:(data)=>{
        return fly.get('/ztpk-service/pkVideo/getList',data);
    },
    pkDetails:(data)=>{
        return fly.get('/ztpk-service/pkVideo/pkDetails',data);
    },
    skillVideo:(data)=>{
        return fly.get('/ztpk-service/skillVideo/list',data);
    },
    lifeVideo:(data)=>{
        return fly.get('/ztpk-service/lifeVideo/list',data);
    },
    fireRankAll:(data)=>{
        return fly.get('/ztpk-service/pkVideo/list',data);
    },
    fireRankAll:(data)=>{
        return fly.get('/ztpk-service/pkVideo/list',data);
    },
    giftToKBList:(data)=>{
        return fly.get('/ztpk-service/gift/giftToKBList',data);
    },
    giftList:(data)=>{
        return fly.get('/ztpk-service/cache/giftList',data);
    },
    getToken:(data)=>{
        return fly.get('/ztpk-service/file/getToken',data);
    },
    wxGetPKList: (data) => {
        return fly.get('/ztpk-service/share/wx/getPKList', data);
    },
    getPKList: (data) => {
        return fly.get('/ztpk-service/pkVideo/getPKList', data);
    },
    wxGetPKOne: (data) => {
        return fly.get('/ztpk-service/share/wx/getList', data);
    },
    unRead: (data) => {
        return fly.get('/ztpk-service/message/unRead', data);
    },
    messageList: (data) => {
        return fly.get('/ztpk-service/message/list', data);
    },
    messageRead: (data) => {
        return fly.post('/ztpk-service/message/read', data);
    },
    getGiftInfo: (data) => {
        return fly.get('/ztpk-service/message/getGiftInfo', data);
    },
    kbList: (data) => {
        return fly.get('/ztpk-service/order/kbList', data);
    },
    giftDowry: (data) => {
        return fly.get('/ztpk-service/gift/dowry', data);
    },
    giftReceive: (data) => {
        return fly.get('/ztpk-service/gift/receive', data);
    },
    sendGift: (data) => {
        return fly.get('/ztpk-service/gift/sendGift', data);
    },
    sendDowry: (data) => {
        return fly.get('/ztpk-service/gift/sendDowry', data);
    },
    backDowry: (data) => {
        return fly.get('/ztpk-service/gift/backDowry', data);
    },
    bonusAdd: (data) => {
        return fly.post('/ztpk-service/bonus/add', data);
    },
    receiveList: (data) => {
        return fly.get('/ztpk-service/bonus/receiveList', data);
    },
    sendList: (data) => {
        return fly.get('/ztpk-service/bonus/sendList', data);
    },
    bonusDetail: (data) => {
        return fly.get('/ztpk-service/bonus/detail', data);
    },
    detailPrize: (data) => {
        return fly.get('/ztpk-service/bonus/detail/prize', data);
    },
    messageboard: (data) => {
        return fly.get('/ztpk-service/bonus/detail/messageboard', data);
    },
    addwish: (data) => {
        return fly.post('/ztpk-service/bonus/addwish', data);
    },
    likeCount: (data) => {
        return fly.get('/ztpk-service/bonus/likeCount', data);
    },
    cancelLike: (data) => {
        return fly.get('/ztpk-service/bonus/cancelLike', data);
    },
    lifeFind: (data) => {
        return fly.get('/ztpk-service/comment/life/find', data);
    },
    lifeAdd: (data) => {
        return fly.post('/ztpk-service/comment/life/add', data);
    },
    pkFind: (data) => {
        return fly.get('/ztpk-service/comment/pk/find', data);
    },
    pkAdd: (data) => {
        return fly.post('/ztpk-service/comment/pk/add', data);
    },
    getWaitList: (data) => {
        return fly.get('/ztpk-service/pkSing/getWaitList', data);
    },
    pkSingPkList: (data) => {
        return fly.get('/ztpk-service/pkSing/pkList', data);
    },
    getDetail: (data) => {
        return fly.get('/ztpk-service/pkSing/getDetail', data);
    },
    pkDetails2: (data) => {
        return fly.get('/ztpk-service/pkSing/pkDetails', data);
    },
    songLrc: (data) => {
        return fly.get('/ztpk-service/pkSing/songLrc', data);
    },
}