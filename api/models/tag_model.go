package models

import "database/sql"

type Tag struct {
	ID          int            `json:"id"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Color       string         `json:"color"`
}
