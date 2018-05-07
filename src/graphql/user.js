import gql from 'graphql-tag'


export const UserOneQuery = gql`
      query UserOneQuery($userId:String){
            UserOneQuery(userId:$userId) {
                        userId
                        name
                        tel 
                        nickName
                        }
      }
`


export const UserAllQuery = gql`
      query UserAllQuery{
            UserAllQuery  {
                        userId
                        name
                        tel 
                        nickName
                        }
      }
`

export const UserUpdate = gql`
      mutation UserUpdate($name:String,$tel:String,$nickName:String,$userId:String) {
            UserUpdate(name:$name,tel:$tel,nickName:$nickName,userId:$userId) 
                     {
                        userId
                        name
                        tel 
                        nickName
                        }
      }      
`

export const UserDelete = gql`
      mutation UserDelete($userId:String) {
            UserDelete(userId:$userId) 
                     {
                        userId
                        name
                        tel 
                        nickName
                        }
      }      
`

export const UserAdd = gql`
      mutation UserAdd($name:String,$tel:String,$nickName:String) {
            UserAdd(name:$name,tel:$tel,nickName:$nickName) 
                     {
                        userId
                        name
                        tel 
                        nickName
                        }
      }      
`