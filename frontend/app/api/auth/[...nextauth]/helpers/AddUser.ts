import { Account, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

async function AddUser(user: AdapterUser|User, account:Account|null){
    await fetch("http://localhost:5555/api/users/create", {
        method:"POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...user,...account})
      })
}

export default AddUser