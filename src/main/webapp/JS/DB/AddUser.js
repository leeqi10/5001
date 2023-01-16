function addUser(formData){      //传递formdata参数
                                 //仓库名称，数据库名称，数据库版本
    let storeName = 'userS',dbName = 'userD', version = 2
 //将浏览器中的indexedDB数据库引入
    let indexedDB = window.indexedDB
    //数据库对象变量
    let db
    //创建或者连接数据库
    const request = indexedDB.open(dbName, version)
    //信息注册对象
    var newItem = [
        {
            "user_name":formData.get("user_name"),
            "user_email":formData.get("user_email"),
            "user_pwd":formData.get("user_pwd")
        }
    ];
    request.onsuccess = function(event) {
        db = event.target.result // 数据库对象
        console.log('数据库打开成功')
        var transaction = db.transaction([storeName], "readwrite");//事务的读写操作
        //数据库添加用户：
        let objectStore = transaction.objectStore(storeName);
        let obj=objectStore.get(formData.get("user_name"));
        obj.onsuccess=function (evt){
            var res=evt.target.result;
            if(res!=null){
                alert('该用户已经存在')
            }
            else {
                objectStore.add(newItem[0]);
              alert('注册成功'+newItem[0]);
            }
        }
    }
    request.onerror = function(event) {
        console.log('数据库打开报错')
    }
}

