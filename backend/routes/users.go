package routes

import (
	"blueprint/models"
	"context"
	"net/http"
	"os"
	"reflect"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
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

func UpdateUser(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData models.User
    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    id := reqData.ID

    reqData.ID = primitive.NilObjectID

    update := bson.M{}
    val := reflect.ValueOf(reqData)
    typ := reflect.TypeOf(reqData)
    for i := 0; i < val.NumField(); i++ {
        field := val.Field(i)
        fieldName := typ.Field(i).Tag.Get("bson")
        if fieldName == "" {
            fieldName = typ.Field(i).Name
        }
        if field.Kind() == reflect.Bool {
            update[fieldName] = field.Interface()
        } else if !field.IsZero() && fieldName != "_id" {
            update[fieldName] = field.Interface()
        }
    }

    if len(update) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
        return
    }


    _, err := UsersCollection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": update}, options.Update().SetUpsert(false))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": bson.M{"$set": update}})
}

func DeleteUser(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData models.User
    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    id := reqData.ID

    if reqData.ID.IsZero() {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    filter := bson.M{"_id": id}
    result, err := UsersCollection.DeleteOne(ctx, filter)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if result.DeletedCount == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
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
        if reqData.Password != "" {
            // User exists, verify the password
            if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(reqData.Password)); err != nil {
                c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
                return
            }
            // Password matches, return the existing user
            c.JSON(http.StatusOK, existingUser)
            return
        } else {
            // GitHub login, return the existing user
            c.JSON(http.StatusOK, existingUser)
            return
        }
    } else if err != mongo.ErrNoDocuments {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // User does not exist, create a new user
    if reqData.Password != "" && reqData.Name != "" {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(reqData.Password), bcrypt.DefaultCost)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        userData := models.User{
            Name:      reqData.Name,
            Email:     reqData.Email,
            Password:  string(hashedPassword),
            Image:     reqData.Image,
            CreatedAt: time.Now(),
        }

        _, err = UsersCollection.InsertOne(ctx, userData)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusCreated, userData)
    } else {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
    }
}
