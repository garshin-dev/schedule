package repository

import (
	"api/models"
	"database/sql"
)

type TagRepository struct {
	db *sql.DB
}

func NewTagRepository(db *sql.DB) *TagRepository {
	return &TagRepository{db: db}
}

func (r *TagRepository) GetAll() ([]models.Tag, error) {
	rows, err := r.db.Query("SELECT id, name, description, color FROM tags")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tags []models.Tag

	for rows.Next() {
		var tag models.Tag
		if err := rows.Scan(&tag.ID, &tag.Name, &tag.Description, &tag.Color); err != nil {
			return nil, err
		}
		tags = append(tags, tag)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tags, nil
}
