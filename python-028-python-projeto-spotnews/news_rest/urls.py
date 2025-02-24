from django.urls import path, include
from rest_framework.routers import DefaultRouter
from news_rest.views.category_view import CategoryViewSet
from news_rest.views.user_view import UserViewSet
from news_rest.views.news_view import NewsViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'users', UserViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
