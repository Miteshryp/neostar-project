const dotenv = require("dotenv").config();
if(dotenv.error) {
   logger.error("DotENV failed to initialise");
   logger.warn(dotenv.error)
}


const mongoose = require("mongoose");

const DB_CREDS = {
   DB_NAME: process.env.DB_NAME,
   URL: process.env.DB_URL, 
   DEBUG: process.env.DB_DEBUG
}

const logger = require("node-color-log");

const m_models = {};


class DBModel {
   constructor(options){
      this.name = options.name;

      this.schema = new mongoose.Schema(options.schema);
      // this.schema.plugin(encrypt, {secret: process.env.DB_ENCRYPTION_SECRET, encryptedFields: encrypted_field});

      this.model = mongoose.model(this.name, this.schema);

      // Setting Default Error Handlers
      this.insertion_err = options.insertion_error !== undefined ? option.insertion_error : insertion_err;
      this.deletion_err = options.deletion_error !== undefined ? options.deletion_error : deletion_err;
      this.modification_err = options.modification_error !== undefined ? options.modification_error : modification_err;
      this.updation_err = options.updation_error !== undefined ? options.updation_error : updation_err;
      this.search_err = options.search_error !== undefined ? options.search_error : search_err;
   }


   changeParams(options) {
      this.name = options.name;
      
      this.schema = new mongoose.Schema(options.schema);
      // this.schema.plugin(encrypt, {secret: process.env.DB_ENCRYPTION_SECRET, encryptedFields: encrypted_field});

      this.model = mongoose.model(this.name, this.schema);

      // Setting the error handlers in the options
      this.insertion_err = options.insertion_error !== undefined ? option.insertion_error : this.insertion_err;
      this.deletion_err = options.deletion_error !== undefined ? options.deletion_error : this.deletion_err;
      this.modification_err = options.modification_error !== undefined ? options.modification_error : this.modification_err;
      this.updation_err = options.updation_error !== undefined ? options.updation_error : this.updation_err;
      this.search_err = options.search_error !== undefined ? options.search_error : this.search_err;
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





// options - 
// name
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

   m_models[options.name] = new DBModel(options);
   return m_models[options.name];
}





exports.initDB = async function() {
   // @TODO: import the credentials from a seperate file.
   let URL = getDBURL();
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
      console.error("Database Module failed to connect. ")
      console.log(err);
      return;
   }
   else {
      console.log("Successfully connected to database: " + db_name);
   }
}



const insertion_err = (err) => {
   if(err) {
      console.error("ERROR: Unable to insert the requested data entry.");
      console.error(err);
   }
   else {
      console.log("Entry successfully inserted. ");
   }
}
const deletion_err = (err) => {
   if(err) {
      console.error("ERROR: Unable to delete the requested data entry.");
      console.error(err);
   }
   else {
      console.log("Entry successfully deleted. ");
   }
}
const updation_err = (err) => {
   if(err) {
      console.error("ERROR: Unable to update the requested data entry.");
      console.error(err);
   }
   else {
      console.log("Entry successfully updated. ");
   }

}
const modification_err = (err, results) => {
   if(err) {
      console.error("ERROR: Unable to modify the requested query. ");
      console.error(err);
   }
   else {
      console.debug("Entry successfully modified. ");
   }
}
const search_err = (err) => {
   if(err) {
      console.error("Failed to search the given query");
      console.error(err);
      return false;
   }
   else {
      console.log("Query successfully processed");
      return true;
   }
}

