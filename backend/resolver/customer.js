const shortid = require('shortid')

let initData = [
  {
    _id: '1',
    name: 'name1',
    tel: 'tel1',
    cellphone: 'cellphone1',
    memo: 'memo1'
  },
  {
    _id: '2',
    name: 'name2',
    tel: 'tel1',
    cellphone: 'cellphone2',
    memo: 'memo2'
  },
  {
    _id: '3',
    name: 'name3',
    tel: 'tel1',
    cellphone: 'cellphone3',
    memo: 'memo3'
  }
]

const Query = {
  Query: {
    customerAllQuery: () => initData
  }
}

const Mutation = {
  Mutation: {
    customerCreate: (_, { name, tel, cellphone, memo }) => {
      const _id = shortid.generate()
      const newRecord = { _id, name, tel, cellphone, memo }
      initData = [...initData, newRecord]
      return newRecord
    },
    customerUpdate: (_, { _id, name, tel, cellphone, memo }) => {
      const item = initData.find(e => e._id === _id)
      item.name = name
      item.tel = tel
      item.cellphone = cellphone
      item.memo = memo
      return _id
    },
    customerDelete: (_, { _id }) => {
      const result = initData.findIndex(item => item._id === _id)
      if (result !== undefined) {
        initData.splice(result, 1)
        return {
          _id
        }
      } else {
        return {}
      }
    }
  }
}

module.exports = { Query, Mutation }
