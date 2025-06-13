package service

import (
	"api/models"
	"api/repository"
)

type TagService struct {
	tagRepo *repository.TagRepository
}

func NewTagService(tagRepo *repository.TagRepository) *TagService {
	return &TagService{tagRepo: tagRepo}
}

func (s *TagService) GetAllTags() ([]models.Tag, error) {
	return s.tagRepo.GetAll()
}
