import { User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

async function AddUser(user: AdapterUser|User){
    const res = await fetch("http://localhost:5555/api/users/create", {
        method:"POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: user.name,
            Email: user.email,
            Image: user.image,
            ID: user.id
        })
      })
    const dbUser = await res.json()
    return dbUser;

}

export default AddUser