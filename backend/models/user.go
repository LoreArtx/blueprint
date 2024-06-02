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
    GitHubID  string              `bson:"githubId,omitempty"`
    Image     string             `bson:"image,omitempty"`
    CreatedAt time.Time          `bson:"createdAt"`
}

type CreateUserRequestBody struct {
    ID              string `json:"id"`
    Name            string `json:"name"`
    Email           string `json:"email"`
    Image           string `json:"image"`
}