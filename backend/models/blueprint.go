package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Criteria struct {
    ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Title       string `json:"title" bson:"title"`
    Description string `json:"description" bson:"description"`
    TeacherID   string `json:"teacherId" bson:"teacherId"`
    Value       int    `json:"value" bson:"value"`
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
    Progress    int                `json:"progress" bson:"progress"`
    Deadline    time.Time          `json:"deadline" bson:"deadline"`
    Description string             `json:"description" bson:"description"`
    Criterias   []Criteria         `json:"criterias" bson:"criterias"`
    Privacy     string             `json:"privacy" bson:"privacy" validate:"oneof=public private"`
    CreatorID   primitive.ObjectID `json:"creatorId" bson:"creatorId"`
    IsFinished  bool               `json:"isFinished" bson:"isFinished"`
    Users    []primitive.ObjectID  `json:"users" bson:"users"`
    CreatedAt   time.Time          `json:"createdAt" bson:"createdAt"`
    FinishedAt  *time.Time         `json:"finishedAt,omitempty" bson:"finishedAt,omitempty"`
}
