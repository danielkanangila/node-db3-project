const db = require("../data/db-config");

class Scheme {
  query() {
    return db("schemes");
  }

  find() {
    return this.query();
  }

  findById(id) {
    return this.query().where({ id }).first();
  }

  findSteps(id) {
    return this.query()
      .join("steps", "schemes.id", "steps.scheme_id")
      .select(
        "steps.id",
        "schemes.scheme_name",
        "steps.step_number",
        "steps.instructions"
      )
      .orderBy("steps.id", "asc")
      .where("steps.scheme_id", id);
  }

  add(scheme) {
    const $this = this;
    return this.query()
      .insert(scheme)
      .then((ids) => {
        return $this.findById(ids[0]);
      });
  }

  update(changes, id) {
    const $this = this;
    return this.query()
      .where({ id })
      .update(changes)
      .then(() => $this.findById(id));
  }

  remove(id) {
    return this.query().where({ id }).del();
  }
}

module.exports = new Scheme();
