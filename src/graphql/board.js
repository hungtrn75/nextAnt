import gql from 'graphql-tag'
export const BoardAllQuery = gql` 
             query  BoardAllQuery{
              BoardAllQuery{
                Title
                Content
              }
  }
 
`
export const BoardOneQuery = gql`
      query BoardOneQuery($boradId:String){
            BoardOneQuery(boradId:$boradId) {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }
`


export const BoardUpdate = gql`
      mutation BoardUpdate($name:String,$tel:String,$nickName:String,$boradId:String) {
            BoardUpdate(name:$name,tel:$tel,nickName:$nickName,boradId:$boradId) 
                     {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }      
`

export const BoardDelete = gql`
      mutation BoardDelete($boradId:String) {
            BoardDelete(boradId:$boradId) 
                     {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }      
`

export const BoardAdd = gql`
      mutation BoardAdd($name:String,$tel:String,$nickName:String) {
            BoardAdd(name:$name,tel:$tel,nickName:$nickName) 
                     {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }      
`