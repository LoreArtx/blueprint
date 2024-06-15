package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type File struct {
	ID         primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FileName   string             `json:"fileName" bson:"fileName"`
	FilePath   string             `json:"filePath" bson:"filePath"`
	ProjectID  primitive.ObjectID `json:"projectId" bson:"projectId"`
	UploadedAt time.Time          `json:"uploadedAt" bson:"uploadedAt"`
}
