import firebase from './fb'
import fetch from 'node-fetch'
const db = firebase.firestore()

// const a = async () => {
//     const response = await fetch('https://10.0.2.2:8080',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
//     console.log(response.ok)
// }
// a()

// all database functionality here
class DB {

    constructor(collection) {
        this.collection = collection
    }

    reformat(doc) {
        console.log('reformat', doc.id)
        return { id: doc.id, ...doc.data() }
    }

    findAll = async () => {
        const data = await db.collection(this.collection).get()
        return data.docs.map(this.reformat)
    }

    listenAll = set =>
        db.collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    findOne = async id => {
        const doc = await db.collection(this.collection).doc(id).get()
        return doc.exists ? this.reformat(doc) : undefined
    }

    listenOne = (set, id) =>
        id === ""
            ?
            set(null)
            :
            db.collection(this.collection).doc(id).onSnapshot(snap => set(this.reformat(snap)))

    // item has no id
    create = async item => {
        const { id, ...rest } = item
        return await db.collection(this.collection).add(rest)
    }

    // item has id
    update = async item => {
        const { id, ...rest } = item
        await db.collection(this.collection).doc(id).set(rest)
    }

    remove = async id => {
        await db.collection(this.collection).doc(id).delete()
    }
}


class Sensors extends DB {

    constructor() {
        super('sensors')
        this.Readings = new Readings(this.collection)
    }

    listenByCategory = (set, categoryid) =>
        db.collection(this.collection).where("categoryid", "==", categoryid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenByUser = (set, userid) =>
        db.collection(this.collection).where("userid", "==", userid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenByUserAndCategory = (set, userid, categoryid) =>
        db.collection(this.collection).where("userid", "==", userid).where("categoryid", "==", categoryid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    toggleMotionDetected = sensor =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected: !sensor.motiondetected }, { merge: true })

    setMotionDetected = (sensor, motiondetected) =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected }, { merge: true })

    toggleAlert = sensor =>
        db.collection(this.collection).doc(sensor.id).set({ alert: !sensor.alert }, { merge: true })

    //Addalin Start
    toggleLightAlert = sensor => {
        const alertArray = ["high", "equal", "low"]
        const randomNum = Math.floor(Math.random() * Math.floor(3))
        db.collection(this.collection).doc(sensor.id).set({ alert: alertArray[randomNum] }, { merge: true })
    }

    listenItemsForWishlist = (set, catId, modelId) => {
        db.collection(this.collection).where('categoryid', '==', catId).where('modelId', '==', modelId).where('userid', '==', "").onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }
    //Addalin End
}

class Readings extends DB {

    constructor(containing) {
        super('readings')
        this.containing = containing
    }

    createReading = (sensorId, reading) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).add(reading)

    listen2OrderByWhen = (set, sensorId) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).orderBy("when", "desc").limit(2).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenLatestOne = (set, sensorId) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).orderBy("when", "desc").limit(1).onSnapshot(snap => set(snap.docs.map(this.reformat)[0]))

}

class Users extends DB {

    constructor() {
        super('users')
        //Addalin Start
        this.Favorite = new Favorite(this.collection)
        this.Wishlist = new Wishlist(this.collection)
        //Addalin End
    }

}

class Categories extends DB {

    constructor() {
        super('categories')
        //Addalin Start
        this.Models = new Models(this.collection)
        //Addalin End
    }

    // max 10
    listenInIds = (set, ids) =>
        db.collection(this.collection).where(db.FieldPath.documentId(), "in", ids).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    //Addalin Start
    listenOneByName = (set, name) => {
        db.collection(this.collection).where('name', '==', name).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }
    //Addalin End

}

//Addalin Start

class Models extends DB {

    constructor(containing) {
        super('models')
        this.containing = containing
    }

    updateLuminence = async (sensor, value) => {
        const { id, ...rest } = sensor
        await db.collection(this.containing).doc(sensor.categoryid).collection(this.collection).doc(sensor.modelId).set({ ...rest, luminence: value })
    }

    listenOneById = (set, catId, modelId) => db.collection(this.containing).doc(catId).collection(this.collection).doc(modelId).onSnapshot(snap => set(this.reformat(snap)))

    listenModelByWishList = (set, catId, wishlist) => {

        console.log("Model", wishlist)
        let query = db.collection(this.containing).doc(catId).collection(this.collection)

        if (wishlist.material !== "") {
            query = query.where('material', '==', wishlist.material)
        }
        if (wishlist.techUsed !== "") {
            query = query.where('techUsed', '==', wishlist.techUsed)
        }
        if (wishlist.active !== "") {
            query = query.where('active', '==', wishlist.active)
        }
        if (wishlist.contact !== "") {
            query = query.where('contact', '==', wishlist.contact)
        }
        if (wishlist.min !== "") {
            query = query.where('min', '==', wishlist.min * 1)
        }
        if (wishlist.max !== "") {
            query = query.where('max', '==', wishlist.max * 1)
        }
        if (wishlist.radius !== "") {
            query = query.where('radius', '==', wishlist.radius)
        }
        if (wishlist.luminence !== "") {
            query = query.where('luminence', '==', wishlist.luminence)
        }

        query.onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }
}

class LiveChat extends DB {
    constructor() {
        super('livechat')
    }

    listenOnlyMessages = async (chatArray, set) => {
        await Promise.all(chatArray.map(async chat => {
            db.collection(this.collection).doc(chat.id).collection('messages').orderBy("messageDate", "asc").onSnapshot(snap =>
                set(snap.docs.map(this.reformat)))
        })
        )
    }

    listenChat = async (set, userId) => db.collection('livechat').where('userId', '==', userId).where('chatStatus', '==', 'open').onSnapshot(snap => this.listenOnlyMessages(snap.docs.map(this.reformat), set))

    listenChatOnly = (set, userId) => db.collection(this.collection).where('userId', '==', userId).where('chatStatus', '==', 'open').onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenNewChatAdmin = (set, userId) => {
        db.collection(this.collection).where('supportId', 'in', [userId, ""]).where('chatStatus', '==', 'open').where('messageStatus', '==', 'unread').onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    selectUser = async (livechat, userId) => {
        const { id, ...rest } = livechat
        await db.collection(this.collection).doc(id).set({ ...rest, supportId: userId })
    }

    listenMessagesAdmin = (set, docId) => {
        db.collection(this.collection).doc(docId).collection('messages').orderBy('messageDate', 'asc').onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    updateStatus = async (livechat) => {
        const { id, ...rest } = livechat
        await db.collection(this.collection).doc(id).set({ ...rest, messageStatus: "read" })
    }

    updateChatStatus = async (livechat) => {
        const { id, ...rest } = livechat
        return await db.collection(this.collection).doc(id).set({ ...rest, chatStatus: "close" })
    }

    createMessageUser = async (message, livechat) => {
        const { id, ...rest } = livechat
        await db.collection(this.collection).doc(id).collection('messages').add(message)
        await db.collection(this.collection).doc(id).set({ ...rest, messageStatus: 'unread' })
    }

    createLivechat = async (message, userId) => {
        await db.collection(this.collection).add({ supportId: "", userId, messageStatus: "unread", chatStatus: "open" }).then(async doc => {
            await db.collection(this.collection).doc(doc.id).collection('messages').add(message)
        })
    }

    createMessageAdmin = async (livechatId, message) => {
        await db.collection(this.collection).doc(livechatId).collection('messages').add(message)
    }

}

class Favorite extends DB {
    constructor(containing) {
        super('favorite')
        this.containing = containing
    }

    listenToUsersFavorite = (set, userId) => db.collection(this.containing).doc(userId).collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    deleteFavorite = async (userId, favId) =>
        await db.collection(this.containing).doc(userId).collection(this.collection).doc(favId).delete()

    deleteFavoriteBySensorId = async (userId, favId) =>
        await db.collection(this.containing).doc(userId).collection(this.collection).where('sensorId', '==', favId).delete()

    saveFavorite = async (sensorId, userId) =>
        await db.collection(this.containing).doc(userId).collection(this.collection).add({ sensorId, date: new Date() })

}

class Wishlist extends DB {
    constructor(containing) {
        super('wishlist')
        this.containing = containing
    }

    listenAllWishlists = (set, userId) => {
        db.collection(this.containing).doc(userId).collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    deleteWishlist = async (userId, listId) => {
        await db.collection(this.containing).doc(userId).collection(this.collection).doc(listId).delete()
    }

    createWishlist = async (item, userId) => {
        await db.collection(this.containing).doc(userId).collection(this.collection).add(item)
    }
}

export default {
    Categories: new Categories(),
    Sensors: new Sensors(),
    Users: new Users(),
    //Addalin 
    LiveChat: new LiveChat()
    //
}