import firebase from "./fb";
const db = firebase.firestore();

// all database functionality here
class DB {
    constructor(collection) {
        this.collection = collection;
    }

    reformat(doc) {
        // console.log("reformat", doc.id);
        return { id: doc.id, ...doc.data() };
    }

    findAll = async () => {
        const data = await db.collection(this.collection).get();
        return data.docs.map(this.reformat);
    };

    listenAll = (set) =>
        db.collection(this.collection).onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    findOne = async (id) => {
        const doc = await db.collection(this.collection).doc(id).get();
        return doc.exists ? this.reformat(doc) : undefined;
    };

    listenOne = (set, id) =>
        id === ""
            ? set(null)
            : db
                  .collection(this.collection)
                  .doc(id)
                  .onSnapshot((snap) => set(this.reformat(snap)));

    // item has no id
    create = async (item) => {
        const { id, ...rest } = item;
        return await db.collection(this.collection).add(rest);
    };

    // item has id
    update = async (item) => {
        const { id, ...rest } = item;
        await db.collection(this.collection).doc(id).set(rest);
    };

    remove = async (id) => {
        await db.collection(this.collection).doc(id).delete();
    };
}

class Sensors extends DB {
    constructor() {
        super("sensors");
        this.Readings = new Readings(this.collection);
        //Omar Sayed
        this.Queries = new Queries(this.collection);
    }

    listenByCategory = (set, categoryid) =>
        db
            .collection(this.collection)
            .where("categoryid", "==", categoryid)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    listenByUser = (set, userid) =>
        db
            .collection(this.collection)
            .where("userid", "==", userid)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    listenByUserAndCategory = (set, userid, categoryid) =>
        db
            .collection(this.collection)
            .where("userid", "==", userid)
            .where("categoryid", "==", categoryid)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    toggleMotionDetected = (sensor) =>
        db
            .collection(this.collection)
            .doc(sensor.id)
            .set({ motiondetected: !sensor.motiondetected }, { merge: true });

    setMotionDetected = (sensor, motiondetected) =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected }, { merge: true });

    toggleAlert = (sensor) =>
        db
            .collection(this.collection)
            .doc(sensor.id)
            .set({ alert: !sensor.alert }, { merge: true });
    //############
    // Omar Sayed
    //###########
    listenAllSamples = (set) =>
        db
            .collection(this.collection)
            .where("sample", "==", true)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Readings extends DB {
    constructor(containing) {
        super("readings");
        this.containing = containing;
    }

    createReading = (sensorId, reading) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).add(reading);

    listen2OrderByWhen = (set, sensorId) =>
        db
            .collection(this.containing)
            .doc(sensorId)
            .collection(this.collection)
            .orderBy("when", "desc")
            .limit(2)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    listenLatestOne = (set, sensorId) =>
        db
            .collection(this.containing)
            .doc(sensorId)
            .collection(this.collection)
            .orderBy("when", "desc")
            .limit(1)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)[0]));

    //Omar Sayed
    listenCarsInParkings = (set, sensorId) =>
        db
            .collection(this.containing)
            .doc(sensorId)
            .collection(this.collection)
            .where("out", "==", "")
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
    findAllCarsInParkings = async (sensorId) => {
        const data = await db
            .collection(this.containing)
            .doc(sensorId)
            .collection(this.collection)
            .where("out", "==", "")
            .get();
        return data.docs.map(this.reformat);
    };
    findByPlate = async (sensorId, carPlate) => {
        const data = await db
            .collection(this.containing)
            .doc(sensorId)
            .collection(this.collection)
            .where("out", "==", "")
            .where("carPlate", "==", carPlate)
            .get();
        return data.docs.map(this.reformat)[0];
    };
    updatePlate = async (sensorId, item) => {
        const { id, ...rest } = item;
        await db
            .collection(this.containing)
            .doc(sensorId)
            .collection(this.collection)
            .doc(id)
            .set(rest);
    };
}
//Omar Sayed
class Queries extends DB {
    constructor() {
        super("queries");
    }
    createQueries = async (inq) => await db.collection(this.collection).add(inq);
    listenAllForUser = (userId, set) =>
        db
            .collection(this.collection)
            .where("sender", "==", userId)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
    listenAllForCS = (userId, set) =>
        db
            .collection(this.collection)
            .where("reply", "==", "")
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}
class Suggestions extends DB {
    constructor() {
        super("suggestions");
        this.Votes = new Votes(this.collection);
    }
    listenAllByUser = (userId, set) =>
        db
            .collection(this.collection)
            .where("userId", "==", userId)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}
class Votes extends DB {
    constructor(containing) {
        super("votes");
        this.containing = containing;
    }
    listenAllBySugg = (suggId, set) =>
        db
            .collection(this.containing)
            .doc(suggId)
            .collection(this.collection)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
    findAllBySugg = async (suggId) => {
        const data = await db
            .collection(this.containing)
            .doc(suggId)
            .collection(this.collection)
            .get();
        return data.docs.map(this.reformat);
    };
    findByUser = (suggId, userId) => {
        const doc = db
            .collection(this.containing)
            .doc(suggId)
            .collection(this.collection)
            .where("userId", "==", userId)
            .get();
        return doc.exists ? this.reformat(doc) : undefined;
    };
    addUserComment = (suggId, item) =>
        db.collection(this.containing).doc(suggId).collection(this.collection).add(item);

    listenAll = (set) =>
        db.collectionGroup(this.collection).onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    getVotes = async (suggs, set) => {
        let arr = [];
        await Promise.all(
            suggs.map(async (u) => {
                let d = await this.findAllBySugg(u.id);
                arr.push({ ...u, v: d });
            })
        );
        set(arr);
    };
}
class Reports extends DB {
    constructor() {
        super("reports");
        this.FollowUpForm = new FollowUpForm(this.collection);
    }
    listenAllByUser = (userId, set) =>
        db
            .collection(this.collection)
            .where("userId", "==", userId)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    listenAllForCS = (userId, set) =>
        db.collection(this.collection).onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}
class FollowUpForm extends DB {
    constructor(containing) {
        super("followUpForm");
        this.containing = containing;
    }
    listenAllByRepo = (repoId, set) =>
        db
            .collection(this.containing)
            .doc(repoId)
            .collection(this.collection)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));

    newFollowUpForm = (repoId, item) =>
        db.collection(this.containing).doc(repoId).collection(this.collection).add(item);
}
class Users extends DB {
    constructor() {
        super("users");
        this.Notifications = new Notifications(this.collection);
        this.Gifts = new Gifts(this.collection);
    }
}

class Categories extends DB {
    constructor() {
        super("categories");
    }

    // max 10
    listenInIds = (set, ids) =>
        db
            .collection(this.collection)
            .where(db.FieldPath.documentId(), "in", ids)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

//Asmar Start

class Notifications extends DB {
    constructor(containing) {
        super("notifications");
        this.containing = containing;
    }

    send = async (userId, title, body, link, sensorId = undefined) => {
        const obj = {
            title,
            body,
            link,
            isRead: false,
            timestamp: new Date(),
            // ...(sensorId && { sensorId }),
        };
        return await db
            .collection(this.containing)
            .doc(userId)
            .collection(this.collection)
            .add(obj);
    };

    listenAll = (set, userId) =>
        db
            .collection(this.containing)
            .doc(userId)
            .collection(this.collection)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Advertisements extends DB {
    constructor() {
        super("advertisements");
    }

    reformat(doc) {
        return {
            ...super.reformat(doc),
            startDate: doc.data().startDate.toDate(),
            endDate: doc.data().endDate.toDate(),
        };
    }

    update = async (id, fields) => {
        await db.collection(this.collection).doc(id).update(fields);
    };

    listenAll = (set) =>
        db
            .collection(this.collection)
            .onSnapshot((snap) =>
                set(
                    snap.docs
                        .map(this.reformat)
                        .filter((doc) => doc.startDate <= new Date() && doc.endDate >= new Date())
                )
            );
}

class Gifts extends DB {
    constructor(containing) {
        super("gifts");
        this.containing = containing;
    }

    create = async (userId, item) => {
        return await db
            .collection(this.containing)
            .doc(userId)
            .collection(this.collection)
            .add(item);
    };

    listenAll = (set, userId) =>
        db
            .collection(this.containing)
            .doc(userId)
            .collection(this.collection)
            .onSnapshot((snap) => set(snap.docs.map(this.reformat)));
}

class Promotions extends DB {
    constructor() {
        super("promotions");
    }
}
//Asmar End

export default {
    Categories: new Categories(),
    Sensors: new Sensors(),
    Users: new Users(),

    //Asmar Start
    Advertisements: new Advertisements(),
    Promotions: new Promotions(),
    //Asmar End
    //Omar Sayed
    Queries: new Queries(),
    Suggestions: new Suggestions(),
    Reports: new Reports(),
};
