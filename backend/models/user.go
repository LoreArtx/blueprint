package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID        primitive.ObjectID `bson:"_id,omitempty"`
    Name      string             `bson:"name"`
    Email     string             `bson:"email"`
    Password  string             `bson:"password,omitempty"`
    // GitHubID  int64              `bson:"githubId,omitempty"`
    Image     string             `bson:"image,omitempty"`
    CreatedAt time.Time          `bson:"createdAt"`
    UpdatedAt time.Time          `bson:"updatedAt"`
}