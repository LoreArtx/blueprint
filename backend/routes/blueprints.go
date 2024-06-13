package routes

import (
	"context"
	"net/http"
	"os"
	"reflect"
	"time"

	"blueprint/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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


    _, err := BlueprintsCollection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": update}, options.Update().SetUpsert(false))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": bson.M{"$set": update}})
}

func AddCriteria(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData struct {
        ID          primitive.ObjectID  `json:"ID"`
        Title       string              `json:"Title"`
        Description string              `json:"Description"`
        Value       int                 `json:"Value"`
        TeacherID   string              `json:"CreatorId"`
        IsFinished  bool                `json:"IsFinished"`
    }

    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

        newCriteria := models.Criteria{
        ID:          primitive.NewObjectID(),
        Title:       reqData.Title,
        Description: reqData.Description,
        TeacherID:   reqData.TeacherID,
        Value:       reqData.Value,
        IsFinished:  reqData.IsFinished,
    }

    update := bson.M{
        "$push": bson.M{"criterias": newCriteria},
    }

    _, err := BlueprintsCollection.UpdateOne(ctx, bson.M{"_id": reqData.ID}, update)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Successfully added criteria"})
}

func RemoveCriteria(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData struct {
        BlueprintID primitive.ObjectID `json:"BlueprintID"`
        CriteriaID  primitive.ObjectID `json:"CriteriaID"`
    }

    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    update := bson.M{
        "$pull": bson.M{"criterias": bson.M{"_id": reqData.CriteriaID}},
    }

    result, err := BlueprintsCollection.UpdateOne(ctx, bson.M{"_id": reqData.BlueprintID}, update)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if result.MatchedCount == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Blueprint not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Criteria removed successfully"})
}

func UpdateCriteria(c *gin.Context) {
    var ctx, cancel = context.WithTimeout(context.Background(), DefaultTimeout)
    defer cancel()

    var reqData struct {
        BlueprintID string `json:"BlueprintID"`
        CriteriaID  string `json:"CriteriaID"`
        IsFinished  bool   `json:"isFinished,omitempty"`
    }

    if err := c.ShouldBindJSON(&reqData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    blueprintObjID, err := primitive.ObjectIDFromHex(reqData.BlueprintID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Blueprint ID"})
        return
    }

    criteriaObjID, err := primitive.ObjectIDFromHex(reqData.CriteriaID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Criteria ID"})
        return
    }

    // Build the update document dynamically based on the provided fields
    updateFields := bson.M{}
    updateFields["criterias.$.isFinished"] = reqData.IsFinished

    update := bson.M{
        "$set": updateFields,
    }

    filter := bson.M{
        "_id":           blueprintObjID,
        "criterias._id": criteriaObjID,
    }

    result, err := BlueprintsCollection.UpdateOne(ctx, filter, update)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if result.MatchedCount == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Blueprint or Criteria not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Criteria updated successfully"})
}

