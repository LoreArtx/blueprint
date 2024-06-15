package main

import (
	"os"

	"blueprint/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == ""{
		port = "8080"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())
	router.Static("/uploads", "./backend/uploads")
	router.RemoveExtraSlash = true

	api := router.Group("api")

	if api != nil{
		// users
		users := api.Group("users")
		//GET
		users.GET("", routes.GetAllUsers)
		//POST
		users.POST("create", routes.CreateUser)
		//PATCH
		users.PATCH("update", routes.UpdateUser)
		//DELETE
		users.DELETE("delete", routes.DeleteUser)


		// blueprints
		blueprints := api.Group("blueprints")
		//GET
		blueprints.GET("", routes.GetAllBlueprints)
		blueprints.GET("user/:userEmail", routes.GetBlueprintsWithUser)
		blueprints.GET(":userEmail/:id", routes.GetOneBlueprint)
		//POST
		blueprints.POST("create", routes.CreateBlueprints)
		//PATCH
		blueprints.PATCH("update", routes.UpdateBlueprint)
		blueprints.PATCH("add/criteria", routes.AddCriteria)
		blueprints.PATCH("remove/criteria", routes.RemoveCriteria)
		blueprints.PATCH("update/criteria", routes.UpdateCriteria)
		//DELETE
		blueprints.DELETE("delete", routes.DeleteBlueprint)



		//files
		files := api.Group("files")
		//GET
		files.GET(":projectId", routes.GetFiles)
		files.GET("download/:filepath", routes.DownloadFile)

		//POST
		files.POST("upload/:projectId", routes.UploadFile)
	}

	router.Run(":"+port)
}