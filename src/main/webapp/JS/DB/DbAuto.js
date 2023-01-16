function DbInit(){
    let storeName = 'userS',dbName = 'userD', version = 2
    let indexedDB = window.indexedDB
    let db
    const request = indexedDB.open(dbName, version)
    request.onsuccess = function(event) {
        db = event.target.result // 数据库对象
        console.log('数据库打开成功')
    }
    request.onerror = function(event) {
        console.log('数据库打开报错')
    }
    request.onupgradeneeded = function(event) {
        // 数据库创建或升级的时候会触发
        console.log('onupgradeneeded')
        db = event.target.result // 数据库对象
        let objectStore
        if (!db.objectStoreNames.contains(storeName)) {
            objectStore = db.createObjectStore(storeName, { keyPath: 'user_name' } ) // 创建表
            //objectStore.createIndex('user_name', 'user_name', { unique: false })
        }
    }
}