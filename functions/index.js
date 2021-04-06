// must use older 'require' syntax for import
//Addalin
const fetch = require("node-fetch");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.findAuthUser = functions.https.onCall(async (uid, context) => {
    functions.logger.info("uid", { uid });

    const authUser = await admin.auth().getUser(uid);
    functions.logger.info("authUser", { authUser });

    return authUser;
});

const db = admin.firestore();
const reformat = (doc) => ({ id: doc.id, ...doc.data() });
const findAll = async (collection) => (await db.collection(collection).get()).docs.map(reformat);
const findOneSubAll = async (collection, id, subcollection) =>
    (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat);
const removeOneSubOne = async (collection, id, subcollection, subId) =>
    await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete();
const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete();
let spots = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

exports.createSampleData = functions.https.onCall(async (data, context) => {
    // comment the following out to reset auth db every time
    if ((await db.collection("users").get()).docs.length > 0) {
        functions.logger.info("already have data", {});
        return;
    }

    const sensors = await findAll("sensors");
    await Promise.all(
        sensors.map(async (sensor) => {
            const readings = await findOneSubAll("sensors", sensor.id, "readings");
            await Promise.all(
                readings.map(
                    async (reading) =>
                        await removeOneSubOne("sensors", sensor.id, "readings", reading.id)
                )
            );
            await removeOne("sensors", sensor.id);
        })
    );

    const categories = await findAll("categories");
    await Promise.all(
        categories.map(async (category) => await removeOne("categories", category.id))
    );

    const existingUsers = await findAll("users");
    await Promise.all(existingUsers.map(async (user) => await removeOne("users", user.id)));

    const authUsers = (await admin.auth().listUsers()).users;
    await Promise.all(authUsers.map(async (user) => await admin.auth().deleteUser(user.uid)));

    // auth and db should be completely empty now

    const { uid: authId1 } = await admin
        .auth()
        .createUser({ email: "joe@joe.com", password: "joejoe" });
    functions.logger.info("authId1", { authId1 });

    const { uid: authId2 } = await admin
        .auth()
        .createUser({ email: "ann@ann.com", password: "annann" });
    functions.logger.info("authId2", { authId2 });

    const { uid: authId3 } = await admin
        .auth()
        .createUser({ email: "admin@admin.com", password: "adminadmin" });
    functions.logger.info("authId3", { authId3 });

    const { uid: authId4 } = await admin
        .auth()
        .createUser({ email: "fred@fred.com", password: "fredfred" });
    functions.logger.info("authId4", { authId4 });

    const result1 = await db
        .collection("users")
        .doc(authId1)
        .set({ name: "Joe", role: "Customer" });
    functions.logger.info("result1", { result1 });
    await db.collection('carts').add({ userid: authId1, checkOut: false })

    const result2 = await db
        .collection("users")
        .doc(authId2)
        .set({ name: "Ann", role: "Customer" });
    functions.logger.info("result2", { result2 });
    await db.collection('carts').add({ userid: authId2, checkOut: false })

    const result3 = await db.collection("users").doc(authId3).set({ name: "Admin", role: "Admin" });
    functions.logger.info("result3", { result3 });

    const result4 = await db
        .collection("users")
        .doc(authId4)
        .set({ name: "Fred", role: "Support" });
    functions.logger.info("result4", { result4 });

    const { id: categoryId1 } = await db.collection("categories").add({ name: "Motion" });
    functions.logger.info("categoryId1", { categoryId1 });

    const { id: categoryId2 } = await db.collection("categories").add({ name: "Temperature" });
    functions.logger.info("categoryId2", { categoryId2 });

    const { id: sensorId1 } = await db.collection("sensors").add({
        userid: authId1,
        categoryid: categoryId1,
        location: "front door",
        motiondetected: false,
    });
    functions.logger.info("sensorId1", { sensorId1 });

    const { id: sensorId2 } = await db.collection("sensors").add({
        userid: authId2,
        categoryid: categoryId2,
        location: "lab",
        min: 0,
        max: 100,
        alert: false,
    });
    functions.logger.info("sensorId2", { sensorId2 });

    // Asmar Start
    const { uid: authId5 } = await admin
        .auth()
        .createUser({ email: "mark@mark.com", password: "markmark" });
    functions.logger.info("authId5", { authId5 });

    const result5 = await db
        .collection("users")
        .doc(authId5)
        .set({ name: "Mark", role: "Marketer" });
    functions.logger.info("result5", { result5 });

    const gift1 = await db
        .collection("users")
        .doc(authId1)
        .collection("gifts")
        .add({
            name: "Welcome Gift: Get QAR 100 off on any sensor of your choice!",
            value: 100,
            expiry: new Date(Date.now() + 604800000), //604800000 is the number of milliseconds in one week
            isUsed: false,
        });
    const gift2 = await db
        .collection("users")
        .doc(authId1)
        .collection("gifts")
        .add({
            name: "Lucky Gift: Get QAR 200 off on motion sensors!",
            categoryIds: [categoryId1],
            value: 200,
            expiry: new Date(Date.now() + 604800000), //604800000 is the number of milliseconds in one week
            isUsed: false,
        });
    const gift3 = await db
        .collection("users")
        .doc(authId1)
        .collection("gifts")
        .add({
            name: "Amazing Gift: Get QAR 500 off on any Motion or Temperature sensor!",
            value: 500,
            categoryIds: [categoryId1, categoryId2],
            expiry: new Date(Date.now() + 604800000), //604800000 is the number of milliseconds in one week
            isUsed: false,
        });

    const { id: categoryId3 } = await db.collection("categories").add({ name: "Gate" });
    functions.logger.info("categoryId3", { categoryId3 });

    const { id: sensorId7 } = await db.collection("sensors").add({
        userid: authId1,
        categoryid: categoryId3,
        location: "entrance",
        accesses: 0,
        status: "closed",
        mode: "auto",
    });
    functions.logger.info("sensorId7", { sensorId7 });
    // Asmar End

    //Omar Sayed

    const { uid: authId6 } = await admin
        .auth()
        .createUser({ email: "cs@cs.com", password: "123456" });
    // functions.logger.info("authId4", { authId4 })

    const result6 = await db
        .collection("users")
        .doc(authId6)
        .set({ name: "CS", role: "customerservice" });
    // functions.logger.info("result4", { result4 })

    const { id: categoryId4 } = await db.collection("categories").add({ name: "Ultrasonic" });
    // functions.logger.info("categoryId2", { categoryId2 })

    const { id: sensorId3 } = await db.collection("sensors").add({
        name: "Sns 1",
        categoryid: categoryId2,
        sample: true,
        url: "https://www.techprate.com/wp-content/uploads/2020/01/internet-of-things.jpg",
        description:
            "Imagine waking up, not by an alarm blaring from your phone, but to the smell of coffee, light coming in your window from a curtain being drawn back, and a gentle stirring massage or vibration from your mattress. You wake up rested because a sleep sensor has made sure not to rouse you during a round of REM sleep.",
    });
    await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
       
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
        await db
        .collection("sensors")
        .doc(sensorId2)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
       
       
    const { id: sensorId4 } = await db.collection("sensors").add({
        name: "Sns 2",
        categoryid: categoryId1,
        sample: true,
        url:
            "https://circuitdigest.com/sites/default/files/inlineimages/Nest-Learning_thermostate.jpg",
        description:
            'With face recognition technology you won\'t need a key to enter and exit your home, a face scan will let you in and lock up behind you. When you leave the house, a sensor communicates to a thermostat, the temperature resets to the desired "inactive" state and the lights shut off automatically to conserve energy. You live in a smart home, filled with smart appliances. Some of these IoT technologies are already widely adopted, some are still in the design phase, but it will all be a reality in the future.',
    });
    const { id: sensorId5 } = await db.collection("sensors").add({
        name: "Sns 3",
        categoryid: categoryId1,
        sample: true,
        url: "https://www.scnsoft.com/blog-pictures/internet-of-things/cover_.png",
        description:
            "You've run out of milk for your cereal, but your smart fridge has already sent an electronic order for milk to an online grocery store who automatically charge a card on file for the food they deliver by drone to your front door. You can turn on the lights, turn up or lower the temperature of your home and ensure the door is locked all through voice instructions given to your connected home.",
    });
    // functions.logger.info("sensorId2", { sensorId2 })
    const { id: sensorId6 } = await db.collection("sensors").add({
        userid: authId1,
        categoryid: categoryId4,
        spots,
        location: "Front Parkings",
        currentCars: 0,
        open: false,
    });

    //Omar end

    //Addalin Start
    const { id: categoryId5 } = await db.collection("categories").add({ name: "Light" });
    functions.logger.info("categoryId5", { categoryId5 });

    const { id: modelId } = await db
        .collection("categories")
        .doc(categoryId2)
        .collection("models")
        .add({
            active: true,
            contact: false,
            material: "Ceramics",
            techUsed: "IR",
            quantity:20,
            luminence: 100,
            price:200
        });
    functions.logger.info("modelId", { modelId });

    const { id: modelId2 } = await db
        .collection("categories")
        .doc(categoryId5)
        .collection("models")
        .add({ active: true, contact: false, material: "Ceramics", techUsed: "IR", luminence: 5 });
    functions.logger.info("modelId2", { modelId2 });

    const { id: sensorId8 } = await db.collection("sensors").add({
        userid: authId2,
        categoryid: categoryId5,
        modelId: modelId2,
        location: "lab",
        alert: "none",
    });
    functions.logger.info("sensorId8", { sensorId8 });
    //Addalin end

    const { id: categoryId6 } = await db.collection("categories").add({ name: "Weight" });
    functions.logger.info("categoryId6", { categoryId6 });
    db.collection("categories").doc(categoryId6).collection("models").add({
        active: true,
        contact: false,
        material: "glass",
        techUsed: "hydraulic ",
        quantity: 20,
        price: 1000,
    });


    const { id: sensorId9 } = await db
        .collection("sensors")
        .add({ userid: authId2, categoryid: categoryId6, location: "lab", min: 0, max: 100 });
    functions.logger.info("sensorId9", { sensorId9 });
    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
 .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });

    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });

    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
        .add({ when: new Date(), current: Math.floor(Math.random() * 30) });

    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
 .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
 .add({ when: new Date(), current: Math.floor(Math.random() * 30) });

    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
 .add({ when: new Date(), current: Math.floor(Math.random() * 30) });
    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
 .add({ when: new Date(), current: Math.floor(Math.random() * 30) });

    await db
        .collection("sensors")
        .doc(sensorId9)
        .collection("readings")
 .add({ when: new Date(), current: Math.floor(Math.random() * 30) });


await db
  .collection("advertisements")
.add({ startDate: new Date(),
    endDate:new Date(),
    link:"https://en.wikipedia.org/wiki/Family_in_advertising#/media/File:7_Up_-_You_like_it,_it_likes_you,_1948.jpg"});
   
    await db
    .collection("promotions")
  .add({ 
    modelId:234,
    code:562,
    expiry:new Date(),
    discount: 10})
});

exports.onNewReading = functions.firestore
    .document("sensors/{sensorid}/readings/{readingid}")
    .onCreate(async (snap, context) => {
        const reading = snap.data();
        functions.logger.info("reading", { reading });

        const { sensorid, readingid } = context.params;
        functions.logger.info("sensorid", { sensorid });
        functions.logger.info("readingid", { readingid });

        const sensorDoc = await db.collection("sensors").doc(sensorid).get();
        const sensor = { id: sensorDoc.id, ...sensorDoc.data() };

        functions.logger.info("sensor object", { sensor });
        const categoryDoc = await db.collection("categories").doc(sensor.categoryid).get();
        const category = { id: categoryDoc.id, ...categoryDoc.data() };
        functions.logger.info("category", { category });

        if (category.name === "Motion") {
            const readingData = await db
                .collection("sensors")
                .doc(sensor.id)
                .collection("readings")
                .orderBy("when", "desc")
                .limit(2)
                .get();
            const readings = readingData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            functions.logger.info("readings.length", { readingslength: readings.length });
            functions.logger.info("readings", { readings });

            if (readings.length >= 2) {
                const latestImageURL = readings[0].url;
                const previousImageURL = readings[1].url;

                // 1 -- get the blobs from fb storage
                //   -- change the blobs to base64 strings
                // 2 -- compare the strings
                // 3 -- update db with true/false (motiondetected field)
                functions.logger.info("checkMotion", { sensor, previousImageURL, latestImageURL });

                const response1 = await fetch(latestImageURL);
                const buffer1 = await response1.buffer();
                const base64_1 = buffer1.toString("base64");

                const response2 = await fetch(previousImageURL);
                const buffer2 = await response2.buffer();
                const base64_2 = buffer2.toString("base64");

                functions.logger.info("motion detected", {
                    sensor,
                    motiondetected: base64_1 != base64_2,
                });

                await db
                    .collection("sensors")
                    .doc(sensor.id)
                    .set({ motiondetected: base64_1 != base64_2 }, { merge: true });
            }
        } else if (category.name === "Temperature") {
            await db
                .collection("sensors")
                .doc(sensor.id)
                .set(
                    { alert: reading.current > sensor.max || reading.current < sensor.min },
                    { merge: true }
                );
            functions.logger.info("temp alert update", {
                alert: reading.current > sensor.max || reading.current < sensor.min,
            });
        } else if (category.name === "Gate") {
            const gateSensor = (await db.collection("sensors").doc(sensor.id).get()).data();
            var status = gateSensor.status;
            functions.logger.info("Gate Reading Received", {
                ...reading,
                gateStatus: status,
            });
            const isAccessed = reading.spots.includes(true);
            const numAccesses = reading.spots.reduce(
                (sum, isTriggered) => (isTriggered ? sum + 1 : sum),
                gateSensor.accesses
            );
            if (gateSensor.mode == "Closed") status = "Closed";
            else if (gateSensor.mode == "Opened") status = "Open";
            else {
                switch (status) {
                    case "Open":
                        status = isAccessed ? "Open" : "Closing";
                        break;
                    case "Opening":
                        status = "Open";
                        break;
                    case "Closing":
                        status = isAccessed ? "Opening" : "Closed";
                        break;
                    case "Closed":
                        status = isAccessed ? "Opening" : "Closed";
                        break;
                }
            }
            await db.collection("sensors").doc(sensor.id).set(
                {
                    status: status,
                    accesses: numAccesses,
                },
                { merge: true }
            );
            functions.logger.info("Gate Reading End", {
                ...gateSensor,
                status: status,
                access: numAccesses,
            });
        } //Addalin Start
        else if (category.name == "Light") {
            const modelDoc = await db
                .collection("categories")
                .doc(sensor.categoryid)
                .collection("models")
                .doc(sensor.modelId)
                .get();
            functions.logger.info("MODLES", { modelDoc });
            const model = { id: modelDoc.id, ...modelDoc.data() };
            await db
                .collection("sensors")
                .doc(sensor.id)
                .set(
                    {
                        alert:
                            reading.current == model.luminence
                                ? "equal"
                                : reading.current > model.luminence
                                    ? "high"
                                    : "low",
                    },
                    { merge: true }
                );
            functions.logger.info("light alert update", {
                alert: reading.current == model.luminence * 1 ? "equal" : "nope",
            });
        }
        //Addalin end
        else {
            functions.logger.info("No such category", { category });
        }
    });

//Addalin Start
exports.onNewSensor = functions.firestore
    .document("sensors/{sensorid}")
    .onCreate(async (snap, context) => {
        functions.logger.info("VIEWING WISHLIST");
        const sensor = snap.data();
        functions.logger.info("sensor on new", { sensor });

        const categoryDoc = await db.collection("categories").doc(sensor.categoryid).get();
        const category = { id: categoryDoc.id, ...categoryDoc.data() };

        const modelDoc = await db
            .collection("categories")
            .doc(sensor.categoryid)
            .collection("models")
            .doc(sensor.modelId)
            .get();
        functions.logger.info("MODLES", { modelDoc });
        const model = { id: modelDoc.id, ...modelDoc.data() };

        const allUsersDoc = await db.collection("users").get();
        const allUsers = await allUsersDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        Promise.all(
            allUsers.map(async (user) => {
                const wishlistDoc = await db
                    .collection("users")
                    .doc(user.id)
                    .collection("wishlist")
                    .get();
                const wishlist = wishlistDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                await matchWishlist(wishlist, model, category, user.id);
            })
        );

        matchWishlist = async (wishlist, item, category, userId) => {
            Promise.all(
                wishlist.map(async (list) =>
                    this.matchingList(list, item, category)
                        ? await db.collection("notification").add({
                            userId,
                            sensorId: sensor.id,
                            timestamp: new Date(),
                            title: "Wishlist has something new",
                            body: "Your wishlist has a new sensor !",
                            link: "",
                            isRead: false,
                        })
                        : null
                )
            );
        };

        matchingList = (wishlist, item, category) => {
            let result = false;

            if (wishlist.category !== "") {
                result = wishlist.category === category.name;
            }
            if (wishlist.material !== "") {
                result = wishlist.material === item.material;
            }
            if (wishlist.techUsed !== "") {
                result = wishlist.techUsed === item.techUsed;
            }
            if (wishlist.active !== "") {
                result = wishlist.active === item.active;
            }
            if (wishlist.contact !== "") {
                result = wishlist.contact === item.contact;
            }
            if (wishlist.min !== "") {
                result = wishlist.min === item.min;
            }
            if (wishlist.max !== "") {
                result = wishlist.max === item.max;
            }
            if (wishlist.radius !== "") {
                result = wishlist.radius === item.radius;
            }
            if (wishlist.luminence !== "") {
                result = wishlist.luminence === item.luminence;
            }
            return result;
        };
    });
//Addalin End
