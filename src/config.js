import path from 'path';

function Config() {
  function DB() {
    this.connectionUrl = process.env.MONGOURL;
    this.develop = Boolean(process.env.MONGODEVELOP);
  }

  function App() {
    this.port = process.env.PORT || 3000;
    this.static_path = path.resolve('../Frontend');
  }

  this.db = new DB();
  this.app = new App()
};

const config = new Config();


export default config;