package routes

import (
	"context"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"blueprint/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var FilesCollection *mongo.Collection = OpenCollection(Client, os.Getenv("FILES_COLLECTION_NAME"))

func UploadFile(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	projectID := c.Param("projectId")
	projectObjID, err := primitive.ObjectIDFromHex(projectID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Project ID"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file is received"})
		return
	}

	// Ensure the 'uploads' directory exists
	os.MkdirAll("./uploads", os.ModePerm)

	// Save the file
	filePath := filepath.Join("uploads", file.Filename)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Create a file record
	fileRecord := models.File{
		ID:         primitive.NewObjectID(),
		FileName:   file.Filename,
		FilePath:   filePath,
		ProjectID:  projectObjID,
		UploadedAt: time.Now(),
	}

	_, err = FilesCollection.InsertOne(ctx, fileRecord)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully", "file": fileRecord})
}

func GetFiles(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	projectID := c.Param("projectId")
	projectObjID, err := primitive.ObjectIDFromHex(projectID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Project ID"})
		return
	}

	filter := bson.M{"projectId": projectObjID}
	cursor, err := FilesCollection.Find(ctx, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(ctx)

	var files []models.File
	if err = cursor.All(ctx, &files); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, files)
}

func DownloadFile(c *gin.Context) {
    filePath := c.Param("filepath")
    completePath := filepath.Join("./backend/uploads", filePath)

    c.Header("Content-Description", "File Transfer")
    c.Header("Content-Transfer-Encoding", "binary")
    c.Header("Content-Disposition", "attachment; filename="+filepath.Base(completePath))
    c.Header("Content-Type", "application/octet-stream")
    c.File(completePath)
}
