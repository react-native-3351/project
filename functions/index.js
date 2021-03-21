// must use older 'require' syntax for import
//Addalin
const fetch = require("node-fetch")
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.findAuthUser = functions.https.onCall(
  async (uid, context) => {
    functions.logger.info("uid", { uid })

    const authUser = await admin.auth().getUser(uid)
    functions.logger.info("authUser", { authUser })

    return authUser
  }
)

const db = admin.firestore()
const reformat = doc => ({ id: doc.id, ...doc.data() })
const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()

exports.createSampleData = functions.https.onCall(
  async (data, context) => {

    // comment the following out to reset auth db every time
    // const users = await db.collection('users').get()
    // if (users.docs.length > 0) {
    //   functions.logger.info("already have data", {})
    //   return
    // }

    const sensors = await findAll('sensors')
    await Promise.all(
      sensors.map(
        async sensor => {
          const readings = await findOneSubAll('sensors', sensor.id, 'readings')
          await Promise.all(
            readings.map(
              async reading =>
                await removeOneSubOne('sensors', sensor.id, 'readings', reading.id))
          )
          await removeOne('sensors', sensor.id)
        }
      )
    )

    const categories = await findAll('categories')
    await Promise.all(
      categories.map(
        async category =>
          await removeOne('categories', category.id)
      )
    )

    const users = await findAll('users')
    await Promise.all(
      users.map(
        async user =>
          await removeOne('users', user.id)
      )
    )

    const authUsers = (await admin.auth().listUsers()).users
    await Promise.all(
      authUsers.map(
        async user => await admin.auth().deleteUser(user.uid)
      )
    )

    // auth and db should be completely empty now

    const { uid: authId1 } = await admin.auth().createUser({ email: "joe@joe.com", password: "joejoe" })
    functions.logger.info("authId1", { authId1 })

    const { uid: authId2 } = await admin.auth().createUser({ email: "ann@ann.com", password: "annann" })
    functions.logger.info("authId2", { authId2 })

    const { uid: authId3 } = await admin.auth().createUser({ email: "admin@admin.com", password: "adminadmin" })
    functions.logger.info("authId3", { authId3 })

    const { uid: authId4 } = await admin.auth().createUser({ email: "fred@fred.com", password: "fredfred" })
    functions.logger.info("authId4", { authId4 })

    const result1 = await db.collection('users').doc(authId1).set({ name: "Joe", role: "Customer" })
    functions.logger.info("result1", { result1 })

    const result2 = await db.collection('users').doc(authId2).set({ name: "Ann", role: "Customer" })
    functions.logger.info("result2", { result2 })

    const result3 = await db.collection('users').doc(authId3).set({ name: "Admin", role: "Admin" })
    functions.logger.info("result3", { result3 })

    const result4 = await db.collection('users').doc(authId4).set({ name: "Fred", role: "Support" })
    functions.logger.info("result4", { result4 })

    const { id: categoryId1 } = await db.collection('categories').add({ name: "Motion" })
    functions.logger.info("categoryId1", { categoryId1 })

    const { id: categoryId2 } = await db.collection('categories').add({ name: "Temperature" })
    functions.logger.info("categoryId2", { categoryId2 })

    const { id: categoryId3 } = await db.collection('categories').add({ name: "Light" })
    functions.logger.info("categoryId3", { categoryId3 })

    const { id: modelId } = await db.collection('categories').doc(categoryId2).collection('models').add({ active: true, contact: false, material: "Ceramics", techUsed: "IR", min: 0, max: 100 })
    functions.logger.info("modelId", { modelId })

    const { id: modelId2 } = await db.collection('categories').doc(categoryId3).collection('models').add({ active: true, contact: false, material: "Ceramics", techUsed: "IR", luminence: 5 })
    functions.logger.info("modelId2", { modelId2 })

    const { id: sensorId1 } = await db.collection('sensors').add({ userid: authId1, categoryid: categoryId1, location: "front door", motiondetected: false })
    functions.logger.info("sensorId1", { sensorId1 })

    const { id: sensorId2 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId2, location: "lab", min: 0, max: 100, alert: false })
    functions.logger.info("sensorId2", { sensorId2 })

    const { id: sensorId3 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId3, modelId: modelId2, location: "lab", alert: "none" })
    functions.logger.info("sensorId3", { sensorId3 })
  }
)

exports.onNewReading = functions.firestore.document('sensors/{sensorid}/readings/{readingid}').onCreate(

  async (snap, context) => {
    const reading = snap.data();
    functions.logger.info("reading", { reading })

    const { sensorid, readingid } = context.params
    functions.logger.info("sensorid", { sensorid })
    functions.logger.info("readingid", { readingid })

    const sensorDoc = await db.collection('sensors').doc(sensorid).get()
    const sensor = { id: sensorDoc.id, ...sensorDoc.data() }

    const modelDoc = await db.collection('categories').doc(sensor.categoryid).collection('models').doc(sensor.modelId)
    const model = { id: modelDoc.id, ...modelDoc.data() }

    functions.logger.info("sensor object", { sensor })
    const categoryDoc = await db.collection('categories').doc(sensor.categoryid).get()
    const category = { id: categoryDoc.id, ...categoryDoc.data() }
    functions.logger.info("category", { category })

    if (category.name === "Motion") {
      const readingData = await db.collection('sensors').doc(sensor.id).collection('readings').orderBy("when", "desc").limit(2).get()
      const readings = readingData.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      functions.logger.info("readings.length", { readingslength: readings.length })
      functions.logger.info("readings", { readings })

      if (readings.length >= 2) {
        const latestImageURL = readings[0].url
        const previousImageURL = readings[1].url

        // 1 -- get the blobs from fb storage
        //   -- change the blobs to base64 strings
        // 2 -- compare the strings
        // 3 -- update db with true/false (motiondetected field)
        functions.logger.info("checkMotion", { sensor, previousImageURL, latestImageURL })

        const response1 = await fetch(latestImageURL)
        const buffer1 = await response1.buffer()
        const base64_1 = buffer1.toString('base64')

        const response2 = await fetch(previousImageURL)
        const buffer2 = await response2.buffer()
        const base64_2 = buffer2.toString('base64')

        functions.logger.info("motion detected", { sensor, motiondetected: base64_1 != base64_2 });

        await db.collection('sensors').doc(sensor.id).set({ motiondetected: base64_1 != base64_2 }, { merge: true })
      }
    }
    else if (category.name = "Temperature") {
      await db.collection('sensors').doc(sensor.id).set({ alert: reading.current > sensor.max || reading.current < sensor.min }, { merge: true })
      functions.logger.info("temp alert update", { alert: reading.current > sensor.max || reading.current < sensor.min });
    }
    else if (category.name = "Light") {
      await db.collection('sensors').doc(sensor.id).set({ alert: reading.current == model.luminence ? "equal" : reading.current > model.luminence ? "high" : "low" }, { merge: true })
      functions.logger.info("light alert update", { alert: reading.current == model.luminence ? "equal" : reading.current > model.luminence ? "high" : "low" });
    }
    else {
      functions.logger.info("No such category", { category });
    }

  })

//Addalin Start
exports.onNewSensor = functions.firestore.document('sensors/{sensorid}').onCreate(
  async (snap, context) => {
    functions.logger.info("VIEWING WISHLIST");
    const sensor = snap.data()
    functions.logger.info("sensor", { sensor });

    const catId = sensor.categoryid
    const modelId = sensor.modelId

    const category = await db.collection('categories').doc(catId).get()
    const model = await db.collection('categories').doc(catId).collection('models').doc(modelId).get()

    const allUsers = await db.collection('users').get()

    Promise.all(
      allUsers.map(async user => {
        const wishlist = await db.collection('users').doc(user.id).collection('wishlist').get()
        await matchWishlist(wishlist, model, category, user.id)
      })
    )

    matchWishlist = async (wishlist, item, category, userId) => {
      Promise.all(
        wishlist.map(async list =>
          this.matchingList(list, item, category) ?
            await db.collection('notification').add({ userId, sensorId: sensor.id, timestamp: new Date(), title: "Wishlist has something new", body: "Your wishlist has a new sensor !", link: "", isRead: false })
            :
            null
        )
      )
    }

    matchingList = (wishlist, item, category) => {

      let result = false

      if (wishlist.category !== "") {
        result = wishlist.category === category.name
      }
      if (wishlist.material !== "") {
        result = wishlist.material === item.material
      }
      if (wishlist.techUsed !== "") {
        result = wishlist.techUsed === item.techUsed
      }
      if (wishlist.active !== "") {
        result = wishlist.active === item.active
      }
      if (wishlist.contact !== "") {
        result = wishlist.contact === item.contact
      }
      if (wishlist.min !== "") {
        result = wishlist.min === item.min
      }
      if (wishlist.max !== "") {
        result = wishlist.max === item.max
      }
      if (wishlist.radius !== "") {
        result = wishlist.radius === item.radius
      }
      if (wishlist.luminence !== "") {
        result = wishlist.luminence === item.luminence
      }
      return result
    }
  }
)
//Addalin End