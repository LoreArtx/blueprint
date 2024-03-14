package routes

import (
	"blueprint/models"
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var UsersCollection *mongo.Collection = OpenCollection(Client, os.Getenv("USERS_COLLECTION_NAME"))

func GetAllUsers(c *gin.Context){
	var ctx, cancel = context.WithTimeout(context.Background(),DefaultTimeout)
	var users []models.User

	cursor, err := UsersCollection.Find(ctx, bson.M{})
	if err != nil{
		defer cancel()
		c.JSON(http.StatusInternalServerError, gin.H{"error":err.Error()})
		return
	}

	if err:= cursor.All(ctx, &users);err!=nil{
		defer cancel()
		c.JSON(http.StatusInternalServerError, gin.H{"error":err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK,users)
}

func CreateUser(c *gin.Context){
	var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
	var user models.User
	defer cancel()
	c.JSON(http.StatusOK, user)
}