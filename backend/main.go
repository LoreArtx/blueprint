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
	router.RemoveExtraSlash = true

	api := router.Group("api")

	if api != nil{
		users := api.Group("users")
		users.GET("", routes.GetAllUsers)
		users.POST("create", routes.CreateUser)
		// users.PUT("update", routes.UpdateUser)


		blueprints := api.Group("blueprints")
		blueprints.GET("", routes.GetAllBlueprints)
		blueprints.GET("user/:userId", routes.GetBlueprintsWithUser)
		blueprints.GET(":userId/:id", routes.GetOneBlueprint)
		blueprints.POST("create", routes.CreateBlueprints)
		blueprints.PUT("update", routes.UpdateBlueprint)
	}

	router.Run(":"+port)
}