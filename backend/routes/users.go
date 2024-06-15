package routes

import (
	"blueprint/models"
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var UsersCollection *mongo.Collection = OpenCollection(Client, os.Getenv("USERS_COLLECTION_NAME"))

func GetAllUsers(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var users []models.User
    cursor, err := UsersCollection.Find(ctx, bson.M{})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if err := cursor.All(ctx, &users); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    publicUsers := make([]models.PublicUser, len(users))
    for i, user := range users {
        publicUsers[i] = models.PublicUser{
            ID:        user.ID,
            Name:      user.Name,
            Email:     user.Email,
            GitHubID:  user.GitHubID,
            Image:     user.Image,
            CreatedAt: user.CreatedAt,
        }
    }

    c.JSON(http.StatusOK, publicUsers)
}

// func GetUserByEmail(c *gin.Context) {
//     var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
//     defer cancel()

//     email := c.Param("email")
//     var user models.User
//     err := UsersCollection.FindOne(ctx, bson.D{{Key: "email", Value: email}}).Decode(&user)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, user)
// }


func CreateUser(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData models.CreateUserRequestBody
    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }    
    var existingUser models.User
    err := UsersCollection.FindOne(ctx, bson.D{{Key: "email", Value: reqData.Email}}).Decode(&existingUser)
    if err == nil {
        fmt.Println("exists") // Додано для логування отриманих даних
        c.JSON(http.StatusConflict, existingUser)
        return
    } else if err != mongo.ErrNoDocuments {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    fmt.Println("dont") // Додано для логування отриманих даних

    userData := models.User{
        Name:      reqData.Name,
        Email:     reqData.Email,
        Image:     reqData.Image,
        GitHubID:  reqData.ID,
        CreatedAt: time.Now(),
    }

    _, err = UsersCollection.InsertOne(ctx, userData)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, userData)
}
