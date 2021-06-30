const logger = require("node-color-log");

const mongoose = require("mongoose");
const passport = require("passport");
const { ThisMonthList } = require("twilio/lib/rest/api/v2010/account/usage/record/thisMonth");


const DB_CREDS = {
   DB_NAME: process.env.DB_NAME,
   URL: process.env.DB_URL, 
   DEBUG: process.env.DB_DEBUG
}
const m_models = {};


class DBModel {

   constructor(options){

      // Preventing Code duplication
      this.changeParams(options);
   }


   changeParams(options) {
      this.name = options.name;
      
      this.schema = new mongoose.Schema(options.schema);
      logger.debug("Model Created");

      options.plugins.forEach(element => {
         this.schema.plugin(element);
      });

      this.model = new mongoose.model(this.name, this.schema);

      // Setting the error handlers in the options
      this.insertion_err = options.insertion_error !== undefined ? options.insertion_error : insertion_err;
      this.deletion_err = options.deletion_error !== undefined ? options.deletion_error : deletion_err;
      this.modification_err = options.modification_error !== undefined ? options.modification_error : modification_err;
      this.updation_err = options.updation_error !== undefined ? options.updation_error : updation_err;
      this.search_err = options.search_error !== undefined ? options.search_error : search_err;
   }


   async insert(json_obj) {

      let entry = new this.model(json_obj);
      await entry.save(this.insertion_err);
   }


   async find(query) {
      let entry = null;

      await this.model.find(query, async (err, results) => {
         if(this.search_err(err)) {
            entry = results[0];
         }
      });

      return entry;
   }

   async findById(id) {
      let entry = null;

      await this.model.find(id, (err, res) => {
         if(this.insertion_err(err)){
            entry = res;
         }
      });
      return entry;
   }

   async remove(query) {
      await this.model.deleteOne(query, this.deletion_err);
   }

   async update(filter_json, update_json) {
      let query = await this.model.update(filter_json, update_json, {overwrite: true}, this.modification_err);
      return query;
   }

   async update_patch(filter_json, update_json) {
      let query = await this.model.update(filter_json, update_json, this.modification_err);
      return query;
   }
}













class DBAuthModel extends DBModel {
   constructor(params) {
      super(params);

      passport.use(this.model.createStrategy());

      passport.serializeUser(this.model.serializeUser());
      passport.deserializeUser(this.model.deserializeUser());

      logger.debug("Client setup completed")
   }

   async insert(user) {

      logger.debug("Model")
      logger.debug(this.model)

      let ret = undefined;

      let password = user.password;
      delete user.password;

      logger.debug("PASSWORD - ")
      logger.debug(password);

      await this.model.register(user, password, async (err, userData) => {
         if(err)  {
            this.registerError(err);
            ret = undefined;
         }
         else {
            ret = userData;
         }
      })

      return ret;
   }

   getModelInstance(user) {
      return new this.model(user);
   }

   getRawModel() { 
      return this.model;
   }



   registerError(err) {
      logger.error("The Account could not be registered");
      logger.error(err);

      return err;
   }
}



// options - 
// name
// auth
// schema
// insertion_error
// deletion_error
// modification_error
// updation_error
// search_error

exports.getModel = (options) => {
   if(m_models[options.name] !== undefined) {
      // Already created the client
      return m_models[options.name];
   }

   // auth field is defined for the collections storing credentials.
   if(options.auth) m_models[options.name] = new DBAuthModel(options);
   else m_models[options.name] = new DBModel(options);
   
   return m_models[options.name];
}





exports.initDB = async function() {
   // @TODO: import the credentials from a seperate file.
   let URL = getDBURL();
   
   mongoose.set("useCreateIndex", true);
   await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
           .then( () => {
               console.log("Successfully connected to MongoDB server") 
           },
           (err) => {
               console.error("Failed to connect to server: ");
               console.error(err);
           })
           .catch( (err) => {
               console.error("ERROR: Could not connect to MongoDB server.")
               console.error(err);
           });
}



const getDBURL = function() {
   if(DB_CREDS.DEBUG !== undefined) {
      // localhost database link
      return DB_CREDS.URL + DB_CREDS.DB_NAME;
   }
   
   // return the acutal database link
   else return null;
}




















// // // // // // // // //
//
// Default Error Handlers
//
// // // // // // // // //


const initiation_err = (err) => {
   if(err) {
      logger.error("Database Module failed to connect. ")
      logger.error(err);
      return false;
   }
   else {
      logger.info("Successfully connected to database: " + db_name);
      return true;
   }
}



const insertion_err = (err) => {
   if(err) {
      logger.error("Unable to insert the requested data entry.");
      logger.error(err);
      return false;
   }
   else {
      logger.debug("Entry successfully inserted. ");
      return true;
   }
}
const deletion_err = (err) => {
   if(err) {
      logger.error("Unable to delete the requested data entry.");
      logger.error(err);
      return false;
   }
   else {
      logger.debug("Entry successfully deleted. ");
      return true;
   }
}
const updation_err = (err) => {
   if(err) {
      logger.error("ERROR: Unable to update the requested data entry.");
      logger.error(err);
      return false;
   }
   else {
      logger.log("Entry successfully updated. ");
      return true;
   }

}
const modification_err = (err, results) => {
   if(err) {
      logger.error("ERROR: Unable to modify the requested query. ");
      logger.error(err);
      return false;
   }
   else {
      logger.debug("Entry successfully modified. ");
      return true;
   }
}
const search_err = (err) => {
   if(err) {
      logger.error("Failed to search the given query");
      logger.error(err);
      return false;
   }
   else {
      logger.debug("Query successfully processed");
      return true;
   }
}

