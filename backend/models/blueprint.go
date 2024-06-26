package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Criteria struct {
    ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Title       string `json:"title" bson:"title"`
    Description string `json:"description" bson:"description"`
    CreatorEmail      string `json:"creatorEmail" bson:"creatorEmail"`
    StudentEmail string `json:"studentEmail" bson:"studentEmail"`
    Value       int    `json:"value" bson:"value"`
    IsFinished  bool   `json:"isFinished" bson:"isFinished"`
    Comments    []Comment `json:"comments" bson:"comments"`
}

type Comment struct {
    ID    primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Body  string `json:"body" bson:"body"`
    UserID string `json:"userId" bson:"userId"`
}

type Blueprint struct {
    ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Title       string             `json:"title" bson:"title"`
    Deadline    time.Time          `json:"deadline" bson:"deadline"`
    Description string             `json:"description" bson:"description"`
    Criterias   []Criteria         `json:"criterias" bson:"criterias"`
    Privacy     string             `json:"privacy" bson:"privacy" validate:"oneof=public private"`
    CreatorEmail string           `json:"creatorEmail" bson:"creatorEmail"`
    IsFinished  bool               `json:"isFinished" bson:"isFinished"`
    Users       []string           `json:"users" bson:"users"`
    CreatedAt   time.Time          `json:"createdAt" bson:"createdAt"`
    FinishedAt  time.Time          `json:"finishedAt" bson:"finishedAt"`
}
