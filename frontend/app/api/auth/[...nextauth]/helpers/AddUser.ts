

async function AddUser(user:any){

    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL + "/users/create", {
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