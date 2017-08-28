import mongoose from 'mongoose';
import EventEmitter from 'events';
import Implementation from './implementation';
import schemas from './schemas'

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

class DB extends EventEmitter {
  constructor() {
    super();
    this.isConnected = false;
    this._conection = null;
  }

  connect(options) {
    const self = this;

    if (typeof options === 'object') {
      this._debug = !!options.debug;
    }

    if (typeof options.uri === 'undefined') {
      throw new Error('URI to the db.connect method');
    }

    if (this._debug) {
      mongoose.set('debug', true);
    }

    mongoose.connect(options.uri, {
      db: { native_parser: false }
    }).then(connected => {
      self.emit('connected', connected);
    }).catch(error => {

      self.emit('disconnect', error);
    })

    return this;
  }

  init() {
    const collectionNames = Object.keys(schemas);

    collectionNames.forEach(collectionName => {
      const name = collectionName.replace(/[A-Z]/g, (letter, position) => {
        if (position > 0) {
          return `_${letter.toLowerCase()}`;
        }

        return letter.toLowerCase();
      });

      const schema = schemas[collectionName];
      const collection = mongoose.model(name, new Schema(schema, { versionKey: false }));
      this[collectionName] = new Implementation(collection);
    });

    return this;
  }
}

const db = new DB();

module.exports = db;
