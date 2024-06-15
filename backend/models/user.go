package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Name      string             `json:"name" bson:"name"`
    Email     string             `json:"email" bson:"email"`
    Password  string             `json:"password" bson:"password,omitempty"`
    GitHubID  string             `json:"githubId" bson:"githubId,omitempty"`
    Image     string             `json:"image" bson:"image,omitempty"`
    CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

type CreateUserRequestBody struct {
    ID              string `json:"id"`
    Name            string `json:"name"`
    Email           string `json:"email"`
    Image           string `json:"image"`
}

type PublicUser struct {
    ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Name      string             `json:"name" bson:"name"`
    Email     string             `json:"email" bson:"email"`
    GitHubID  string             `json:"githubId,omitempty" bson:"githubId,omitempty"`
    Image     string             `json:"image,omitempty" bson:"image,omitempty"`
    CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}