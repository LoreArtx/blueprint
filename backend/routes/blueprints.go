package routes

import (
	"context"
	"net/http"
	"os"
	"time"

	"blueprint/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var BlueprintsCollection *mongo.Collection = OpenCollection(Client, os.Getenv("BLUEPRINTS_COLLECTION_NAME"))

func GetAllBlueprints(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()
    filter := bson.M{"privacy": "public"}

    cursor, err := BlueprintsCollection.Find(ctx, filter)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer cursor.Close(ctx)

    var blueprints []models.Blueprint
    if err := cursor.All(ctx, &blueprints); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, blueprints)
}

func GetBlueprintsWithUser(c *gin.Context) {
 var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    userID := c.Param("userId")

    filter := bson.M{
        "$or": []bson.M{
            {"creatorId": userID},
            {"teachers": userID},
        },
    }

    cursor, err := BlueprintsCollection.Find(ctx, filter)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer cursor.Close(ctx)

    var blueprints []models.Blueprint
    if err := cursor.All(ctx, &blueprints); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, blueprints)
}

func CreateBlueprints(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData models.Blueprint
    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    reqData.CreatedAt = time.Now()

    _, err := BlueprintsCollection.InsertOne(ctx, reqData)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Blueprint created successfully"})
}

func GetOneBlueprint(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    blueprintID := c.Param("id")
    userID := c.Param("userId")

    objBlueprintID, err := primitive.ObjectIDFromHex(blueprintID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Blueprint ID"})
        return
    }

    var blueprint models.Blueprint

    err = BlueprintsCollection.FindOne(ctx, bson.M{"_id": objBlueprintID}).Decode(&blueprint)
    if err != nil {
        if err == mongo.ErrNoDocuments {
            c.JSON(http.StatusNotFound, gin.H{"error": "Blueprint not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if blueprint.Privacy == "public" {
        c.JSON(http.StatusOK, blueprint)
        return
    }

    filter := bson.M{
        "_id": objBlueprintID,
        "$or": []bson.M{
            {"creatorId": userID},
            {"users": userID},
        },
    }

    err = BlueprintsCollection.FindOne(ctx, filter).Decode(&blueprint)
    if err != nil {
        if err == mongo.ErrNoDocuments {
            c.JSON(http.StatusNotFound, gin.H{"error": "Blueprint not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, blueprint)
}


func UpdateBlueprint(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData models.Blueprint
    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    id := reqData.ID

    _, err := BlueprintsCollection.UpdateOne(ctx, bson.M{"id": id}, bson.M{"$set": reqData})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Blueprint updated successfully"})
}
