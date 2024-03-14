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

	api := router.Group("/api")

	if api != nil{
		users := api.Group("/users")
		users.GET("/", routes.GetAllUsers)
		users.POST("/create", routes.CreateUser)
	}

	router.Run(":"+port)
}