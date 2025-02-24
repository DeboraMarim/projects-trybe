from django.urls import path
from news.views import home, details, categories, form


urlpatterns = [
    path("", home, name="home-page"),
    path("news/<int:new_id>", details, name="news-details-page"),
    path("categories", categories, name="categories-form"),
    path("news", form, name="news-form")
]
