const shortid = require('shortid')

const InitData = [
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
    CustomerAllQuery: () => InitData
  }
}

module.exports = { Query }
