class Api {
  constructor(entity) {
    this.entity = entity;
  }

  getAll = async () => {
    const r = await fetch(`/api/${this.entity}`);
    return await r.json();
  };

  findOne = async id => {
    const r = await fetch(`/api/${this.entity}/${id}`);
    return await r.json();
  };

  create = async entity => {
    const r = await fetch(
      `/api/${this.entity}`,
      this.getOptions(`post`, entity.values)
    );

    return await r.json();
  };

  update = async entity => {
    const r = await fetch(
      `/api/${this.entity}/${entity.id}`,
      this.getOptions(`put`, entity.values)
    );
    return await r.json();
  };

  delete = async entity => {
    const r = await fetch(
      `/api/${this.entity}/${entity.id}`,
      this.getOptions(`delete`)
    );
    return r.json();
  };

  getOptions = (method, body = null) => {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "content-type": `application/json`
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  };

  getComments = async id => {
    const r = await fetch(`http://localhost:4000/comments`);
    return await r.json();
  };

  createComment = async comment => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        noteId: comment.noteId,
        comment: comment.comment,
        id: comment.id
      })
    };

    const r = await fetch("http://localhost:4000/comments", options);
    return await r.json();
  };
}

export default Api;
