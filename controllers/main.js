const getTodos = (req, res, db) => {
  db.select('*').from('todo')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTodos = (req, res, db) => {
  const { content } = req.body
  const added = new Date()
  db('todo').insert({
    content,
    done: false,
    added
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({dbError: 'db error'})
    })
}

const putTodos = (req, res, db) => {
  const { id } = req.params
  const { content, done } = req.body
  db('todo').where({id}).update({
    content,
    done,
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTodos = (req, res, db) => {
  const { id } = req.params
  db('todo').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTodos,
  postTodos,
  putTodos,
  deleteTodos
}