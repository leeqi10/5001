function login(formData) {
    let storeName = 'userS', dbName = 'userD', version = 2
    let indexedDB = window.indexedDB
    let db
    const request = indexedDB.open(dbName, version)
    request.onsuccess = function (event) {
        db = event.target.result // 数据库对象
        console.log('数据库打开成功')
        var transaction = db.transaction([storeName], "readwrite");
        //数据库添加用户：
        var objectStore = transaction.objectStore(storeName);
        let obj = objectStore.get(formData.get("user_name"))
        obj.onsuccess = function (evt) {
            var res = evt.target.result;
            if (res == null) {

                alert("用户不存在")
            }
            else if(res.user_pwd!==formData.get("user_pwd")){

                alert("密码错误")
            }
            else {
                window.location.href = "5001index.html";//
            }
        }
    }
}
function send(){
    let formData=new FormData(document.logForm);
    login(formData);
}





