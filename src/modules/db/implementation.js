import DAO from './DAO';

class MongoDaoImpl extends DAO {
  constructor(collection) {
    super();

    this._collection = collection;
  }

  save(query) {
    const user = this._collection.create(query);
    return user;
  }

  update(query = {}, fields = {}, options = {}) {
    return this._collection.update(query, fields, options).exec();
  }

  remove(query = {}, params = {}) {
    return this._collection
      .remove(query, params, (err, entities) => err ? new Error(err) : entities)
      .exec();
  }

  find(query = {}, fields = {}, options = {}) {
    return this._collection
      .find(query, fields, options)
      .exec();
  }

  findOne(query = {}, fields = {}, options = {}) {
    return this._collection
      .findOne(query, fields, options)
      .exec();
  }

  findByIdAndUpdate(id, fields = {}, options = {}) {

    return this._collection
      .findByIdAndUpdate(id, fields, options)
      .exec();
  }
}

export default MongoDaoImpl;
