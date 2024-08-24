class BookCategory {
  constructor(id, name) {
    this.id = Number(id);
    this.name = name;
  }

  setId(id) {
    this.id = Number(id);
    return this;
  }
  
  setName(name) {
    this.name = name;
    return this;
  }
}

module.exports = BookCategory;