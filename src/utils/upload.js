
import fly from '@/utils/request'

export async function uploadImg(file) {
    let params = new FormData(); //创建form对象
    params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
    let config = {
        headers: { "Content-Type": "multipart/form-data" }
    };

    fly.headers["Content-Type"]="multipart/form-data"
    return new Promise((resolve, reject) => {
        fly.post(
            'http://res4.koudaitiku.com/image/upload.htm',
            params
        ).then(res => {
            let url = "http://img.koudaitiku.com/" + res.key;
            resolve(url);
        });

    });
}